import { useEffect, useRef, useState } from "react";
import { indiaMap } from "../../data/indiaMap.js";
import { mapLearners } from "../../data/startNow.js";

// The Learner Stories hero picture: a map of India, whole from the start;
// pins pop in on each learner's home state, then it visits them in turn.
// At each stop the state lights up, the map leans in a little, and a round
// "lens" with the learner's photo grows out of the pin, with their name,
// state and course. It is only a picture: nothing in it can be pressed.
//
// DataMeet's state data (CC BY 4.0) is credited in the page's footer.
// (A globe version, LearnerGlobe, was tried and dropped at the owner's
// request: just India.)
//
// The server renders the map and pins with no stop open. The pins' entry
// (pure CSS) plays from first paint; the tour starts when the last has landed,
// pauses while the map is off screen or the tab is hidden, and only fades
// under Reduce Motion (start-now-next.css).

const PAD = 60; // room for the camera's lean-in, in map units
const VIEW = [-PAD, -PAD, indiaMap.width + PAD * 2, indiaMap.height + PAD * 2];
const LENS = 250; // lens diameter, in map units
const LEAN = 1.06; // camera zoom at each stop
const STOP_MS = 4000;

const byId = Object.fromEntries(indiaMap.states.map((state) => [state.id, state]));
const homeStates = [...new Set(mapLearners.map((learner) => learner.state))];

// Map units to a percentage of the frame.
const fx = (x) => ((x - VIEW[0]) / VIEW[2]) * 100;
const fy = (y) => ((y - VIEW[1]) / VIEW[3]) * 100;
const pct = (value) => `${value.toFixed(2)}%`;

function camera(stop) {
  if (stop < 0) return undefined;
  const [x, y] = byId[mapLearners[stop].state].pin;
  // Zoom about the pin, so it stays put while the rest leans in.
  return `translate(${pct(fx(x) * (1 - LEAN))}, ${pct(fy(y) * (1 - LEAN))}) scale(${LEAN})`;
}

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
      >
        <svg className="sx-map-land" viewBox={VIEW.join(" ")} style={{ transform: camera(stop) }}>
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

        <svg className="sx-map-lines" viewBox={VIEW.join(" ")}>
          {mapLearners.map((learner, index) => {
            const [x, y] = byId[learner.state].pin;
            return (
              <path
                key={learner.name}
                className={index === stop ? "is-on" : undefined}
                d={`M${x} ${y}L${learner.lens[0]} ${learner.lens[1]}`}
                pathLength="1"
              />
            );
          })}
        </svg>

        {mapLearners.map((learner, index) => {
          const [x, y] = byId[learner.state].pin;
          const [lx, ly] = learner.lens;
          return (
            <div
              key={learner.name}
              className={`sx-lens${index === stop ? " is-on" : ""}`}
              style={{
                left: pct(fx(lx)),
                top: pct(fy(ly)),
                width: pct((LENS / VIEW[2]) * 100),
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
