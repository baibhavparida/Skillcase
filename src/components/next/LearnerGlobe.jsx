import { useEffect, useRef, useState } from "react";
import { indiaGlobe } from "../../data/indiaGlobe.js";
import { mapLearners } from "../../data/startNow.js";

// The Learner Stories hero picture: part of a globe seen from above the
// Indian Ocean, with India's states drawn solid, the rest of the world as
// faint dots fading away from India and the horizon curving across the top.
// India assembles north to south, a pin drops on each learner's home state,
// then the tour visits them in turn: the state lights up, the globe leans in
// a little, and a round "lens" with the learner's photo grows out of the pin,
// with their name, state and course. It is only a picture: nothing in it can
// be pressed.
//
// DataMeet's state data (CC BY 4.0) is credited in the page's footer.
//
// The server renders the globe and pins with no stop open. The entry (pure
// CSS) plays from first paint; the tour starts when the last pin has landed,
// pauses while the globe is off screen or the tab is hidden, and only fades
// under Reduce Motion (start-now-next.css).

const { width: W, height: H, view } = indiaGlobe;
const VIEW = `0 0 ${W} ${H}`;
const LENS = 250; // lens diameter, in map units
const LEAN = 1.07; // camera zoom at each stop
const STOP_MS = 4000;
const AIR = 46; // the atmosphere's glow beyond the horizon, in map units

const byId = Object.fromEntries(indiaGlobe.states.map((state) => [state.id, state]));
const homeStates = [...new Set(mapLearners.map((learner) => learner.state))];

// Longitude and latitude to map units (the globe's orthographic view).
const rad = Math.PI / 180;
const sin0 = Math.sin(view.lat0 * rad);
const cos0 = Math.cos(view.lat0 * rad);
function place([lon, lat]) {
  const phi = lat * rad;
  const lambda = (lon - view.lon0) * rad;
  return [
    Math.round(view.cx + view.radius * Math.cos(phi) * Math.sin(lambda)),
    Math.round(view.cy - view.radius * (cos0 * Math.sin(phi) - sin0 * Math.cos(phi) * Math.cos(lambda))),
  ];
}

// Map units to a percentage of the frame.
const pct = (value) => `${value.toFixed(2)}%`;
const fx = (x) => (x / W) * 100;
const fy = (y) => (y / H) * 100;

function camera(stop) {
  if (stop < 0) return undefined;
  const [x, y] = byId[mapLearners[stop].state].pin;
  // Zoom about the pin, so it stays put while the rest leans in.
  return `translate(${pct(fx(x) * (1 - LEAN))}, ${pct(fy(y) * (1 - LEAN))}) scale(${LEAN})`;
}

export default function LearnerGlobe() {
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

  useEffect(() => {
    if (!landed || !playing) return undefined;
    const timer = setTimeout(() => setStop((current) => (current + 1) % mapLearners.length), stop < 0 ? 300 : STOP_MS);
    return () => clearTimeout(timer);
  }, [landed, playing, stop]);

  const activeState = stop >= 0 ? mapLearners[stop].state : null;
  const states = homeStates.map((id) => byId[id].name);

  return (
    <div className="sx-map sx-globe" ref={root}>
      <div
        className="sx-map-frame"
        style={{ aspectRatio: `${W} / ${H}` }}
        role="img"
        aria-label={`Globe showing India and the home states of Skillcase learners: ${states.slice(0, -1).join(", ")} and ${states.at(-1)}`}
      >
        <div className="sx-globe-view">
          <svg className="sx-map-land" viewBox={VIEW} style={{ transform: camera(stop) }}>
            <defs>
              <radialGradient
                id="sx-globe-air"
                gradientUnits="userSpaceOnUse"
                cx={view.cx}
                cy={view.cy}
                r={view.radius + AIR}
              >
                <stop offset={view.radius / (view.radius + AIR)} stopColor="#05a3e5" stopOpacity="0.2" />
                <stop offset="1" stopColor="#05a3e5" stopOpacity="0" />
              </radialGradient>
              {/* Lit from above India, darker towards the horizon. */}
              <radialGradient
                id="sx-globe-sea"
                gradientUnits="userSpaceOnUse"
                cx={view.cx + 60}
                cy={view.cy - view.radius * 0.55}
                r={view.radius * 1.1}
              >
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.55" stopColor="#f1f7fc" />
                <stop offset="1" stopColor="#dcebf7" />
              </radialGradient>
            </defs>
            <circle cx={view.cx} cy={view.cy} r={view.radius + AIR} fill="url(#sx-globe-air)" />
            <circle className="sx-globe-sea" cx={view.cx} cy={view.cy} r={view.radius} fill="url(#sx-globe-sea)" />
            <path className="sx-globe-grid" d={indiaGlobe.graticule} />
            <g className="sx-globe-dots">
              {indiaGlobe.dots.map((d, index) => (
                <path key={index} className={`is-${index}`} d={d} />
              ))}
            </g>
            <g className="sx-map-states">
              {indiaGlobe.states.map((state, index) => (
                <path
                  key={state.id}
                  d={state.d}
                  className={state.id === activeState ? "is-on" : undefined}
                  style={{ "--i": index }}
                />
              ))}
              {indiaGlobe.islands.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />
              ))}
            </g>
            {homeStates.map((id, index) => {
              const [x, y] = byId[id].pin;
              return (
                <g
                  key={id}
                  className={`sx-map-pin${id === activeState ? " is-on" : ""}`}
                  transform={`translate(${x} ${y})`}
                  style={{ "--i": index }}
                >
                  <ellipse className="sx-map-pulse" rx="30" ry="11" />
                  <g className="sx-map-pin-drop">
                    <g className="sx-map-pin-body">
                      <path d="M0 0C-4-12-21-24-21-39a21 21 0 1 1 42 0C21-24 4-12 0 0Z" />
                      <circle cy="-39" r="7.5" />
                    </g>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        <svg className="sx-map-lines" viewBox={VIEW}>
          {mapLearners.map((learner, index) => {
            const [x, y] = byId[learner.state].pin;
            const [lx, ly] = place(learner.at);
            return (
              <path
                key={learner.name}
                className={index === stop ? "is-on" : undefined}
                d={`M${x} ${y}L${lx} ${ly}`}
                pathLength="1"
              />
            );
          })}
        </svg>

        {mapLearners.map((learner, index) => {
          const [x, y] = byId[learner.state].pin;
          const [lx, ly] = place(learner.at);
          return (
            <div
              key={learner.name}
              className={`sx-lens${index === stop ? " is-on" : ""}`}
              style={{
                left: pct(fx(lx)),
                top: pct(fy(ly)),
                width: pct((LENS / W) * 100),
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
