import { useEffect, useRef, useState } from "react";
import { indiaMap } from "../../data/indiaMap.js";
import { mapLearners } from "../../data/startNow.js";

// The Learner Stories hero picture: a map of India lying back in 3D, a thin
// slab that sways slowly and never stops (the team found a still map that
// jumped to each stop "static + movement"). Pins stand on learners' home
// states and pop in within a second; then it visits them in turn: the state
// lights up and a round "lens" with the learner's photo grows out of the pin,
// with their name, state and course, tethered to the pin by a line that
// follows it as the map sways. It is only a picture: nothing in it can be
// pressed.
//
// DataMeet's state data (CC BY 4.0) is credited in the page's footer.
// (A globe version, LearnerGlobe, was tried and dropped at the owner's
// request: just India.)
//
// The map's layers (a grid floor, as in the team's reference video, the
// slab's underside and the states) are flat SVGs in boxes turned by CSS 3D
// transforms (boxes, not the SVGs: Safari turns an <svg> about its corner). Pins, lines and lenses sit flat on top, placed
// with the same sums (`project`), so pins stay upright. The server renders the
// map at rest with no stop open. The pins' entry (pure CSS) plays from first
// paint; the sway starts on load and the tour when the last pin has landed;
// both pause while the map is off screen or the tab is hidden. Reduce Motion
// keeps the map still and only fades the stops (start-now-next.css).

const { width: MW, height: MH } = indiaMap;
const TILT = 38; // how far the map lies back, in degrees
const TURN = -8; // and how far it is turned (anticlockwise)
const DEPTH = 2200; // the viewer's distance (CSS perspective), in map units
const SLAB = 22; // the map's thickness, in map units
const FLOOR = 280; // how far the grid floor reaches past the map, in map units
const GRID = 70; // the floor's grid spacing, in map units
// The part of the map's plane the frame shows, in map units: the tilted map
// at every point of its sway, the north's lens above it and room below for
// the captions and their shadows.
const FRAME = [-30, 60, 1200, 1100];
const LENS = 250; // lens diameter, in map units
const STOP_MS = 4000;
const rad = Math.PI / 180;

// The sway: tilt and turn drift on two sines with unrelated periods, so the
// map is never quite still.
const pose = (ms) => ({
  tilt: TILT + 2 * Math.sin((ms / 17000) * 2 * Math.PI),
  turn: TURN + 5 * Math.sin((ms / 26000) * 2 * Math.PI),
});
const REST = pose(0);

// Where a point of the map, `z` map units above it, lands in the frame, and
// how much it is magnified: the layers' CSS transform, worked out by hand
// (perspective, rotateX, rotateZ and translateZ about the map's centre).
function project([x, y], z, { tilt, turn }) {
  const dx = x - MW / 2;
  const dy = y - MH / 2;
  const x1 = dx * Math.cos(turn * rad) - dy * Math.sin(turn * rad);
  const y1 = dx * Math.sin(turn * rad) + dy * Math.cos(turn * rad);
  const w = 1 - (y1 * Math.sin(tilt * rad) + z * Math.cos(tilt * rad)) / DEPTH;
  return [MW / 2 + x1 / w, MH / 2 + (y1 * Math.cos(tilt * rad) - z * Math.sin(tilt * rad)) / w, 1 / w];
}

// Map units as a share of the frame's width (the frame is a size container),
// so the 3D layers scale with it like everything else.
const cqw = (units) => `${((units / FRAME[2]) * 100).toFixed(3)}cqw`;
const layer = ({ tilt, turn }, z) =>
  `perspective(${cqw(DEPTH)}) rotateX(${tilt.toFixed(3)}deg) rotateZ(${turn.toFixed(3)}deg) translateZ(${cqw(z)})`;

// Map units to a percentage of the frame.
const fx = (x) => ((x - FRAME[0]) / FRAME[2]) * 100;
const fy = (y) => ((y - FRAME[1]) / FRAME[3]) * 100;
const pct = (value) => `${value.toFixed(2)}%`;
// A layer's box: the map's, grown by `margin` all round (so its centre, the
// transforms' origin, stays the map's).
const layerBox = (margin) => ({
  left: pct(fx(-margin)),
  top: pct(fy(-margin)),
  width: pct(((MW + margin * 2) / FRAME[2]) * 100),
  height: pct(((MH + margin * 2) / FRAME[3]) * 100),
});

const byId = Object.fromEntries(indiaMap.states.map((state) => [state.id, state]));
// Drawn north to south, so nearer pins stand in front.
const homeStates = [...new Set(mapLearners.map((learner) => learner.state))].sort((a, b) => byId[a].pin[1] - byId[b].pin[1]);
const outline = indiaMap.states.map((state) => state.d).join("");

const pinAt = (id, now) => {
  const [x, y, s] = project(byId[id].pin, 0, now);
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})`;
};
const lineAt = (learner, now) => {
  const [x, y] = project(byId[learner.state].pin, 0, now);
  return `M${x.toFixed(1)} ${y.toFixed(1)}L${learner.lens[0]} ${learner.lens[1]}`;
};

export default function LearnerMap() {
  const root = useRef(null);
  const [stop, setStop] = useState(-1);
  const [landed, setLanded] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Wait for the pins' drop animation, however late the page painted.
  useEffect(() => {
    const drops = root.current.querySelectorAll(".sx-map-pin-drop");
    const running = drops[drops.length - 1]?.getAnimations?.() ?? [];
    let cancelled = false;
    Promise.all(running.map((animation) => animation.finished))
      .catch(() => {})
      .then(() => !cancelled && setLanded(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let inView = false;
    const update = () => setPlaying(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.2 });
    observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // The sway, a frame at a time; its clock only runs while it plays, so it
  // picks up where it paused. Pins and lines are moved here, outside React.
  const clock = useRef(0);
  useEffect(() => {
    if (!playing || matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const [floor, slab, land] = root.current.querySelectorAll(".sx-map-floor, .sx-map-slab, .sx-map-land");
    const pins = [...root.current.querySelectorAll(".sx-map-pin")];
    const lines = [...root.current.querySelectorAll(".sx-map-line")];
    let frame;
    let last = performance.now();
    const tick = (time) => {
      clock.current += Math.min(time - last, 100);
      last = time;
      const now = pose(clock.current);
      floor.style.transform = layer(now, -SLAB);
      slab.style.transform = layer(now, -SLAB);
      land.style.transform = layer(now, 0);
      pins.forEach((pin, index) => pin.setAttribute("transform", pinAt(homeStates[index], now)));
      lines.forEach((line, index) => line.setAttribute("d", lineAt(mapLearners[index], now)));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  useEffect(() => {
    if (!landed || !playing) return undefined;
    const timer = setTimeout(() => setStop((current) => (current + 1) % mapLearners.length), stop < 0 ? 0 : STOP_MS);
    return () => clearTimeout(timer);
  }, [landed, playing, stop]);

  const activeState = stop >= 0 ? mapLearners[stop].state : null;
  const states = homeStates.map((id) => byId[id].name);

  return (
    <div className="sx-map" ref={root}>
      <div
        className="sx-map-frame"
        role="img"
        aria-label={`Map of India with the home states of Skillcase learners: ${states.slice(0, -1).join(", ")} and ${states.at(-1)}`}
        style={{ aspectRatio: `${FRAME[2]} / ${FRAME[3]}` }}
      >
        <div className="sx-map-floor" style={{ ...layerBox(FLOOR), transform: layer(REST, -SLAB) }}>
          <svg viewBox={`${-FLOOR} ${-FLOOR} ${MW + FLOOR * 2} ${MH + FLOOR * 2}`}>
            <defs>
              <pattern id="sx-map-grid" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
                <path d={`M0 ${GRID / 2}H${GRID}M${GRID / 2} 0V${GRID}`} />
                <circle cx={GRID / 2} cy={GRID / 2} r="3.5" />
              </pattern>
            </defs>
            <rect x={-FLOOR} y={-FLOOR} width={MW + FLOOR * 2} height={MH + FLOOR * 2} fill="url(#sx-map-grid)" />
          </svg>
        </div>
        <div className="sx-map-slab" style={{ ...layerBox(0), transform: layer(REST, -SLAB) }}>
          <svg viewBox={`0 0 ${MW} ${MH}`}>
            <path d={outline} />
          </svg>
        </div>
        <div className="sx-map-land" style={{ ...layerBox(0), transform: layer(REST, 0) }}>
          <svg viewBox={`0 0 ${MW} ${MH}`}>
            <g className="sx-map-states">
              {indiaMap.states.map((state) => (
                <path
                  key={state.id}
                  d={state.d}
                  className={[
                    homeStates.includes(state.id) && "is-home",
                    state.id === activeState && "is-on",
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined}
                />
              ))}
              {indiaMap.islands.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
              ))}
            </g>
          </svg>
        </div>

        <svg className="sx-map-marks" viewBox={FRAME.join(" ")}>
          {homeStates.map((id, index) => (
            <g
              key={id}
              className={`sx-map-pin${id === activeState ? " is-on" : ""}`}
              transform={pinAt(id, REST)}
              style={{ "--i": index }}
            >
              <ellipse className="sx-map-pulse" rx="30" ry={(30 * Math.cos(TILT * rad)).toFixed(1)} />
              <g className="sx-map-pin-drop">
                <g className="sx-map-pin-body">
                  <path d="M0 0C-4-12-21-24-21-39a21 21 0 1 1 42 0C21-24 4-12 0 0Z" />
                  <circle cy="-39" r="7.5" />
                </g>
              </g>
            </g>
          ))}
          {mapLearners.map((learner, index) => (
            <path
              key={learner.name}
              className={`sx-map-line${index === stop ? " is-on" : ""}`}
              d={lineAt(learner, REST)}
              pathLength="1"
            />
          ))}
        </svg>

        {mapLearners.map((learner, index) => {
          const [x, y] = project(byId[learner.state].pin, 0, REST);
          const [lx, ly] = learner.lens;
          return (
            <div
              key={learner.name}
              className={`sx-lens${index === stop ? " is-on" : ""}`}
              style={{
                left: pct(fx(lx)),
                top: pct(fy(ly)),
                width: pct((LENS / FRAME[2]) * 100),
                // From the pin: where the lens starts as it grows out.
                "--from-x": pct(((x - lx) / LENS) * 100),
                "--from-y": pct(((y - ly) / LENS) * 100),
              }}
            >
              <div className="sx-lens-photo">
                <img src={learner.image} alt="" decoding="async" />
              </div>
              <div className="sx-lens-label">
                <strong>{learner.name}</strong>
                <span>
                  {byId[learner.state].name} · {learner.course}
                </span>
                {learner.done ? <em>{learner.done}</em> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
