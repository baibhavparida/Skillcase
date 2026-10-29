// Builds src/data/indiaGlobe.js, the Learner Stories hero's globe: India's
// states drawn solid on part of a globe, the rest of the world as faint dots
// that fade away from India, with the horizon curving across the top.
//
// Sources, in one folder: DataMeet's state boundaries (the five
// States/Admin2.* files from https://github.com/datameet/maps/tree/master/States,
// CC BY 4.0, following the Survey of India's official boundary) and Natural
// Earth's 1:50m land (ne_50m_land.geojson from
// https://github.com/nvkelso/natural-earth-vector, public domain). Run:
// node scripts/india-globe.js <folder>
//
// India comes only from DataMeet, so the official boundary is what shows;
// land dots inside it are skipped.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { groupStates, inside, openRings, pathData, pinFor, readDbf, readShp, round, simplifyRings, stateId } from "./map-tools.js";

const folder = process.argv[2] || ".";
const WIDTH = 1000;
const TOLERANCE = 2; // map units
const MIN_AREA = 6;

// The view: a globe looked at from above the Indian Ocean, south of India,
// so India sits on its upper half and the horizon curves across the top.
export const VIEW = { lon0: 78, lat0: -18, radius: 1450, cx: 473, cy: 1592 };

const rad = Math.PI / 180;
const sin0 = Math.sin(VIEW.lat0 * rad);
const cos0 = Math.cos(VIEW.lat0 * rad);
// Orthographic projection to map units; `depth` is 1 facing us, 0 at the horizon.
function project([lon, lat]) {
  const phi = lat * rad;
  const lambda = (lon - VIEW.lon0) * rad;
  const depth = sin0 * Math.sin(phi) + cos0 * Math.cos(phi) * Math.cos(lambda);
  return {
    x: VIEW.cx + VIEW.radius * Math.cos(phi) * Math.sin(lambda),
    y: VIEW.cy - VIEW.radius * (cos0 * Math.sin(phi) - sin0 * Math.cos(phi) * Math.cos(lambda)),
    depth,
  };
}
const toMap = (point) => {
  const { x, y } = project(point);
  return [x, y];
};

// ---- India's states ----
const statesSource = path.join(folder, "Admin2");
const rows = readDbf(`${statesSource}.dbf`);
const rings = openRings(readShp(`${statesSource}.shp`));
const { byState, islands } = groupStates(rows, simplifyRings(rings, toMap, TOLERANCE), MIN_AREA);
const india = byState.flat();
const states = rows
  .map((row, i) => ({ name: row.ST_NM.replace(/ & /g, " and "), polygons: byState[i] }))
  .filter((state) => state.polygons.length)
  .map(({ name, polygons }) => ({ id: stateId(name), name, pin: pinFor(polygons), d: pathData(polygons) }))
  .sort((a, b) => a.pin[1] - b.pin[1]); // north to south

// India's middle, for fading the world's dots with distance from it.
let [ix0, iy0, ix1, iy1] = [Infinity, Infinity, -Infinity, -Infinity];
for (const [x, y] of india.flat()) [ix0, iy0, ix1, iy1] = [Math.min(ix0, x), Math.min(iy0, y), Math.max(ix1, x), Math.max(iy1, y)];
const indiaMid = [(ix0 + ix1) / 2, (iy0 + iy1) / 2];
// The picture stops just below India's southernmost islands: no globe under it.
const HEIGHT = Math.ceil(iy1) + 30;

// ---- The world's land as dots ----
const land = JSON.parse(readFileSync(path.join(folder, "ne_50m_land.geojson"), "utf8"));
const polygons = land.features.flatMap((feature) =>
  feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates,
);
const boxes = polygons.map((polygon) => {
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [x, y] of polygon[0]) [x0, y0, x1, y1] = [Math.min(x0, x), Math.min(y0, y), Math.max(x1, x), Math.max(y1, y)];
  return [x0, y0, x1, y1];
});
const onLand = (lon, lat) =>
  polygons.some((polygon, i) => {
    const [x0, y0, x1, y1] = boxes[i];
    return lon >= x0 && lon <= x1 && lat >= y0 && lat <= y1 && inside([lon, lat], polygon);
  });

// Dots about equally spaced on the sphere; three weights by how far from
// India and how near the horizon, each drawn as one path.
const STEP = 0.9; // degrees
const MARGIN = 30;
const buckets = [[], [], []];
for (let lat = -60; lat <= 82; lat += STEP) {
  const lonStep = STEP / Math.max(0.2, Math.cos(lat * rad));
  for (let lon = VIEW.lon0 - 100; lon <= VIEW.lon0 + 100; lon += lonStep) {
    const { x, y, depth } = project([lon, lat]);
    if (depth < 0.03 || x < -MARGIN || x > WIDTH + MARGIN || y < -MARGIN || y > HEIGHT + MARGIN) continue;
    if (!onLand(lon, lat) || inside([x, y], india)) continue;
    const away = Math.hypot(x - indiaMid[0], y - indiaMid[1]) / 700;
    const weight = Math.max(0, 1 - away) * Math.min(1, depth * 2.2);
    buckets[weight > 0.55 ? 0 : weight > 0.25 ? 1 : 2].push([round(x), round(y)]);
  }
}
const dotPath = (dots) => {
  let d = "";
  let last = null;
  for (const [x, y] of dots.sort((a, b) => a[1] - b[1] || a[0] - b[0])) {
    d += last ? `m${x - last[0]} ${y - last[1]}h0` : `M${x} ${y}h0`;
    last = [x, y];
  }
  return d;
};

// ---- Graticule: every 15°, only the side facing us ----
function line(points) {
  let d = "";
  let drawing = false;
  for (const point of points) {
    const { x, y, depth } = project(point);
    const show = depth > 0 && x > -200 && x < WIDTH + 200 && y > -200 && y < HEIGHT + 200;
    if (!show) {
      drawing = false;
      continue;
    }
    d += `${drawing ? "L" : "M"}${round(x)} ${round(y)}`;
    drawing = true;
  }
  return d;
}
let graticule = "";
for (let lon = -180; lon < 180; lon += 15) {
  graticule += line(Array.from({ length: 81 }, (_, i) => [lon, -80 + i * 2]));
}
for (let lat = -75; lat <= 75; lat += 15) {
  graticule += line(Array.from({ length: 181 }, (_, i) => [-180 + i * 2, lat]));
}

const data = {
  width: WIDTH,
  height: HEIGHT,
  view: VIEW,
  states,
  islands,
  dots: buckets.map(dotPath),
  graticule,
};
const banner = `// Generated by scripts/india-globe.js from DataMeet's state boundaries
// (https://github.com/datameet/maps, CC BY 4.0, credited on the map), which
// follow the Survey of India's official boundary, and Natural Earth's land
// (public domain). Don't edit by hand: rerun the script. \`view\` is the
// orthographic projection (degrees, map units), for placing things by
// longitude and latitude; \`dots\` are three paths, nearest India first.
`;
const body = `export const indiaGlobe = ${JSON.stringify(data)};\n`;
writeFileSync("src/data/indiaGlobe.js", banner + body);
console.log(
  `${states.length} states, ${buckets.map((b) => b.length).join("/")} dots, India ${round(ix1 - ix0)}×${round(iy1 - iy0)} at ${indiaMid.map(round)}, ${(body.length / 1024).toFixed(1)} KB`,
);
