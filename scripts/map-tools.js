// Used by scripts/india-globe.js (and any later map of India): reading
// DataMeet's state shapefile, simplifying borders so neighbours stay
// matched, placing pins and writing compact SVG paths.
import { readFileSync } from "node:fs";

export function readDbf(file) {
  const b = readFileSync(file);
  const count = b.readUInt32LE(4);
  const headLength = b.readUInt16LE(8);
  const recordLength = b.readUInt16LE(10);
  const fields = [];
  for (let o = 32; b[o] !== 0x0d; o += 32) {
    fields.push({ name: b.toString("latin1", o, o + 11).replace(/\0.*$/, ""), length: b[o + 16] });
  }
  return Array.from({ length: count }, (_, i) => {
    let o = headLength + i * recordLength + 1;
    const row = {};
    for (const field of fields) {
      row[field.name] = b.toString("utf8", o, o + field.length).trim();
      o += field.length;
    }
    return row;
  });
}

// Polygon records only: each shape is a list of rings of [lon, lat].
export function readShp(file) {
  const b = readFileSync(file);
  const end = b.readInt32BE(24) * 2;
  const shapes = [];
  for (let o = 100; o < end; ) {
    const length = b.readInt32BE(o + 4) * 2;
    const c = o + 8;
    const parts = b.readInt32LE(c + 36);
    const points = b.readInt32LE(c + 40);
    const starts = Array.from({ length: parts }, (_, i) => b.readInt32LE(c + 44 + 4 * i));
    const p0 = c + 44 + 4 * parts;
    shapes.push(
      starts.map((start, i) => {
        const stop = i + 1 < parts ? starts[i + 1] : points;
        const ring = [];
        for (let k = start; k < stop; k++) ring.push([b.readDoubleLE(p0 + 16 * k), b.readDoubleLE(p0 + 16 * k + 8)]);
        return ring;
      }),
    );
    o = c + length;
  }
  return shapes;
}

function simplify(points, tolerance) {
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, z] = stack.pop();
    const [ax, ay] = points[a];
    const [zx, zy] = points[z];
    const dx = zx - ax;
    const dy = zy - ay;
    const length = Math.hypot(dx, dy);
    let worst = 0;
    let index = -1;
    for (let i = a + 1; i < z; i++) {
      const [px, py] = points[i];
      const d = length ? Math.abs(dy * px - dx * py + zx * ay - zy * ax) / length : Math.hypot(px - ax, py - ay);
      if (d > worst) [worst, index] = [d, i];
    }
    if (worst > tolerance) {
      keep[index] = 1;
      stack.push([a, index], [index, z]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

export const area = (ring) => {
  let sum = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) sum += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  return sum / 2;
};

const key = ([lon, lat]) => `${Math.round(lon * 1e5)},${Math.round(lat * 1e5)}`;

// Open rings (closing and repeated points dropped) with each point's key.
export function openRings(shapes) {
  const rings = [];
  shapes.forEach((shape, state) => {
    for (const ring of shape) {
      const points = ring.filter((p, i) => i === 0 || key(p) !== key(ring[i - 1]));
      const open = key(points[0]) === key(points.at(-1)) ? points.slice(0, -1) : points;
      rings.push({ state, points: open, keys: open.map(key) });
    }
  });
  return rings;
}

// Simplify every ring in map units (`toMap` turns [lon, lat] into them).
// A point is a junction where the rings passing through it stop agreeing
// on their neighbours: the ends of each shared border. Each border between
// junctions is simplified once, in one direction, so both sides match.
export function simplifyRings(rings, toMap, tolerance) {
  const seen = new Map();
  for (const ring of rings) {
    const { keys } = ring;
    keys.forEach((k, i) => {
      const pair = [keys[(i - 1 + keys.length) % keys.length], keys[(i + 1) % keys.length]].sort().join("|");
      const entry = seen.get(k);
      if (!entry) seen.set(k, { pair, junction: false });
      else if (entry.pair !== pair) entry.junction = true;
    });
  }
  return rings.map((ring) => {
    const { keys } = ring;
    const xy = ring.points.map(toMap);
    let fixed = keys.map((k, i) => (seen.get(k).junction ? i : -1)).filter((i) => i >= 0);
    if (fixed.length < 2) {
      // An island or a ring with one junction: pin its first and farthest points.
      const first = fixed[0] ?? 0;
      let far = first;
      const gap = (i) => Math.hypot(xy[i][0] - xy[first][0], xy[i][1] - xy[first][1]);
      xy.forEach((_, i) => {
        if (gap(i) > gap(far)) far = i;
      });
      fixed = [...new Set([first, far])].sort((a, b) => a - b);
    }
    const out = [];
    fixed.forEach((start, f) => {
      const stop = fixed[(f + 1) % fixed.length];
      const indices = [];
      for (let i = start; ; i = (i + 1) % xy.length) {
        indices.push(i);
        if (i === stop && indices.length > 1) break;
      }
      const forward = keys[indices[0]] < keys[indices.at(-1)];
      const arc = (forward ? indices : [...indices].reverse()).map((i) => xy[i]);
      const kept = simplify(arc, tolerance);
      out.push(...(forward ? kept : kept.reverse()).slice(0, -1));
    });
    return { state: ring.state, xy: out };
  });
}

// Whole map units: the maps are never shown more than about 540px wide.
export const round = (v) => Math.round(v) || 0;

// Rounded rings grouped by state; specks dropped, but every state keeps its
// largest ring (so Chandigarh stays); Lakshadweep's specks become dots.
export function groupStates(rows, simplified, minArea) {
  const islands = [];
  const byState = rows.map(() => []);
  const largest = rows.map(() => null);
  for (const ring of simplified) {
    const points = ring.xy
      .map(([x, y]) => [round(x), round(y)])
      .filter((p, i, all) => i === 0 || p.join() !== all[i - 1].join());
    const size = points.length >= 3 ? Math.abs(area(points)) : 0;
    if (size > (largest[ring.state]?.size ?? 0)) largest[ring.state] = { size, points };
    if (size >= minArea) byState[ring.state].push(points);
    else if (rows[ring.state].ST_NM === "Lakshadweep" && points.length) {
      const [cx, cy] = points.reduce(([sx, sy], [x, y]) => [sx + x / points.length, sy + y / points.length], [0, 0]);
      if (!islands.some(([x, y]) => Math.hypot(x - cx, y - cy) < 7)) islands.push([round(cx), round(cy)]);
    }
  }
  rows.forEach((row, i) => {
    if (!byState[i].length && largest[i] && row.ST_NM !== "Lakshadweep") byState[i].push(largest[i].points);
  });
  return { byState, islands };
}

const num = (v) => String(round(v));
export function pathData(polygons) {
  return polygons
    .map((ring) => {
      let d = `M${num(ring[0][0])} ${num(ring[0][1])}l`;
      for (let i = 1; i < ring.length; i++) {
        const dx = num(ring[i][0] - ring[i - 1][0]);
        const dy = num(ring[i][1] - ring[i - 1][1]);
        d += `${i > 1 && !dx.startsWith("-") ? " " : ""}${dx}${dy.startsWith("-") ? "" : " "}${dy}`;
      }
      return `${d}z`;
    })
    .join("");
}

export function inside([x, y], polygons) {
  let hit = false;
  for (const ring of polygons) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
  }
  return hit;
}

function edgeDistance([x, y], polygons) {
  let best = Infinity;
  for (const ring of polygons) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [ax, ay] = ring[j];
      const [bx, by] = ring[i];
      const dx = bx - ax;
      const dy = by - ay;
      const u = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
      best = Math.min(best, Math.hypot(x - ax - u * dx, y - ay - u * dy));
    }
  }
  return best;
}

// Where a state's pin goes: the point inside it farthest from its border.
export function pinFor(polygons) {
  const main = polygons.reduce((a, b) => (Math.abs(area(b)) > Math.abs(area(a)) ? b : a));
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [x, y] of main) [x0, y0, x1, y1] = [Math.min(x0, x), Math.min(y0, y), Math.max(x1, x), Math.max(y1, y)];
  let best = { d: -1, p: [(x0 + x1) / 2, (y0 + y1) / 2] };
  let step = Math.max(x1 - x0, y1 - y0) / 40;
  for (let pass = 0; pass < 3; pass++) {
    const [cx, cy] = best.p;
    const span = pass === 0 ? Infinity : step * 20;
    for (let x = Math.max(x0, cx - span); x <= Math.min(x1, cx + span); x += step) {
      for (let y = Math.max(y0, cy - span); y <= Math.min(y1, cy + span); y += step) {
        if (!inside([x, y], polygons)) continue;
        const d = edgeDistance([x, y], polygons);
        if (d > best.d) best = { d, p: [x, y] };
      }
    }
    step /= 8;
  }
  return best.p.map(Math.round);
}

export const stateId = (name) => name.toLowerCase().replace(/[^a-z]+/g, "-");
