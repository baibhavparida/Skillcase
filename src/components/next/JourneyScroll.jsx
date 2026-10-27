import { useEffect, useRef, useState } from "react";
import Icon from "../healthcare/Icon.jsx";
import { steps as liveSteps } from "../HowItWorks.jsx";
import { GermanScene, MoveScene, OfferScene, ProfileScene } from "./StepScenes.jsx";
import { Heading } from "./shared.jsx";

// "How it works" as a scroll story, with the same four steps and captions as
// the live homepage and an animated UI scene for each (StepScenes.jsx) that
// plays when its step becomes active.
// - Desktop: steps scroll past a sticky stage whose scene and tint follow the
//   step in view; click a step to bring it into view.
// - Phones and tablets: an open timeline (dot, rail, text, then the scene on
//   the page, no boxes around it); tap a step to replay its scene.
// A single call to action follows the steps.

function useActiveStep(count) {
  const refs = useRef([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.slice(0, count).forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, [count]);
  return [refs, active];
}

// 0 -> 1 as the timeline passes the middle of the screen.
function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const box = element.getBoundingClientRect();
      const middle = window.innerHeight * 0.55;
      setProgress(Math.min(1, Math.max(0, (middle - box.top) / Math.max(1, box.height))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return [ref, progress];
}

// Same titles and captions as the live homepage's steps; animated scenes.
const scenes = [ProfileScene, GermanScene, OfferScene, MoveScene];
const steps = liveSteps.map((step, index) => ({ ...step, Scene: scenes[index] }));

export default function JourneyScroll() {
  const [stepRefs, active] = useActiveStep(steps.length);
  const [railRef, progress] = useScrollProgress();
  // Bumped each time a step becomes active (or is tapped), which remounts
  // that step's scene so it plays from the start.
  const [run, setRun] = useState(0);
  useEffect(() => setRun((current) => current + 1), [active]);

  const pick = (index) => {
    const element = stepRefs.current[index];
    if (index === active) setRun((current) => current + 1);
    if (element && window.matchMedia("(min-width: 1000px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      element.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <section className="section nx-journey" id="journey" aria-labelledby="nx-journey-title">
      <Heading
        id="nx-journey-title"
        eyebrow="How it works"
        title="4 steps to your job in Germany"
      />

      <div className="nx-journey-layout">
        <ol className="nx-steps" ref={railRef} style={{ "--nx-progress": progress }}>
          {steps.map(({ title, copy, Scene }, index) => (
            <li
              key={title}
              className={`nx-step${index <= active ? " is-reached" : ""}${index === active ? " is-active" : ""}`}
              data-step={index}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              onClick={() => pick(index)}
            >
              <span className="nx-step-dot" aria-hidden="true">
                {index < active ? <Icon name="check" size={13} /> : index + 1}
              </span>
              <div className="nx-step-text">
                <p className="nx-step-count">Step {index + 1} of {steps.length}</p>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <div className="nx-step-visual">
                <Scene play={index === active} key={index === active ? `run-${run}` : "idle"} />
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop: the scene for the step in view, on a sticky stage whose
            tint follows the step. */}
        <div className="nx-stage" aria-hidden="true">
          <div className="nx-stage-card" data-step={active}>
            <span className="nx-stage-count">
              {String(active + 1).padStart(2, "0")}
              <small>/ {String(steps.length).padStart(2, "0")}</small>
            </span>
            <span className="nx-stage-title">{steps[active].title}</span>
            {steps.map(({ title, Scene }, index) => (
              <div key={title} className={`nx-stage-visual${index === active ? " is-active" : ""}`}>
                <Scene play={index === active} key={index === active ? `run-${run}` : "idle"} />
              </div>
            ))}
            <span className="nx-stage-bar">
              <i style={{ width: `${((active + 1) / steps.length) * 100}%` }} />
            </span>
          </div>
        </div>
      </div>

      <div className="nx-journey-cta">
        <a className="btn btn-gold" href="/signup/">
          Create your profile
          <Icon name="arrow-right" size={15} />
        </a>
      </div>
    </section>
  );
}
