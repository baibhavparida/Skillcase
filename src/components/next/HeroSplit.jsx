import { useEffect, useRef, useState } from "react";
import "../../styles/placed-hero.css";
import ResponsiveImage from "../ResponsiveImage.jsx";
import Icon from "../healthcare/Icon.jsx";
import { formatLakhRange, placements } from "../../data/placements.js";
import { useInView } from "./shared.jsx";

// The homepage hero for the variant. Same copy and buttons as the live hero
// (PlacedHero.jsx; keep the copy in sync).
// - Desktop: copy on the left; on the right one featured role card with the
//   other roles' faces orbiting it on two slow rings (after Framer's orbit
//   and Lovart's single featured card). Hover or click a face to feature it.
// - Phones and tablets: a wheel of role cards under the buttons, each tilted
//   along the circle (after the owner's radial reference). Only the top arc
//   shows, so the headline and buttons stay clear. Each card carries its city;
//   the wheel turns slowly, and the card at the top stands upright with its
//   role and pay beneath it. Swipe to spin it, or tap a card to bring it to the top.

const byKey = Object.fromEntries(placements.map((item) => [item.key, item]));

// Rings: angles spread evenly; neighbours never share a designation.
const rings = [
  {
    name: "inner",
    keys: ["nurse-hamburg", "doctor-munich", "physio-cologne", "nurse-frankfurt", "ottech-heidelberg", "radiographer-freiburg"],
  },
  {
    name: "outer",
    keys: [
      "labtech-stuttgart",
      "nurse-leipzig",
      "doctor-dusseldorf",
      "physio-hannover",
      "trainee-nuremberg",
      "nurse-aachen",
      "anaesthesia-dresden",
      "doctor-berlin",
    ],
  },
];

// The selection travels face by face: round the inner ring, then the outer.
const sequence = rings.flatMap((ring) => ring.keys);

function HeroOrbit() {
  const [ref, inView] = useInView({ threshold: 0.2, once: false });
  const [step, setStep] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [interval, setIntervalMs] = useState(3600);
  const featuredKey = sequence[step];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setIntervalMs(6000);
  }, []);

  // Select the next face every few seconds while the hero is on screen and
  // the pointer isn't on the orbit. Reduce Motion: slower, never stopped.
  useEffect(() => {
    if (!inView || hovering) return undefined;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % sequence.length), interval);
    return () => window.clearInterval(timer);
  }, [inView, hovering, interval]);

  const feature = (key) => setStep(sequence.indexOf(key));

  return (
    <div
      className={`nx-orbit${hovering ? " is-hovering" : ""}`}
      ref={ref}
      role="group"
      aria-label="Healthcare roles in Germany with typical monthly pay"
      style={{ "--nx-select": `${interval}ms` }}
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      {rings.map((ring) => (
        <div className={`nx-ring nx-ring-${ring.name}`} key={ring.name} aria-hidden="true">
          {ring.keys.map((key, index) => {
            const angle = (index / ring.keys.length) * Math.PI * 2 - Math.PI / 2;
            const selected = featuredKey === key;
            return (
              <button
                type="button"
                tabIndex={-1}
                key={key}
                className={`nx-face${selected ? " is-active" : ""}`}
                style={{ "--x": Math.cos(angle).toFixed(4), "--y": Math.sin(angle).toFixed(4) }}
                onPointerEnter={() => feature(key)}
                onClick={() => feature(key)}
              >
                <span className="nx-face-inner">
                  <ResponsiveImage src={byKey[key].image} alt="" sizes="64px" />
                </span>
                {/* Countdown to the next selection; restarts on each one. */}
                {selected && (
                  <svg className="nx-face-timer" viewBox="0 0 100 100" key={step}>
                    <circle cx="50" cy="50" r="47" pathLength="100" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      ))}

      {/* The featured role: all cards stacked, the active one shown, so
          changes cross-fade instead of flashing. */}
      <div className="nx-orbit-card" aria-live="off">
        {placements.map((item, index) => (
          <div
            className={`ph-card nx-orbit-slide${item.key === featuredKey ? " is-active" : ""}`}
            key={item.key}
            aria-hidden={item.key !== featuredKey}
          >
            <ResponsiveImage
              src={item.image}
              alt={item.key === featuredKey ? item.alt : ""}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="240px"
            />
            <span className="ph-city">
              <Icon name="map-pin" size={12} weight="fill" />
              {item.city}
            </span>
            <div className="ph-info">
              <p className="ph-role">{item.role}</p>
              <p className="ph-pay">
                <strong>{formatLakhRange(item.salary)}</strong>
                <span>/month</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEP = 360 / placements.length;

// Normalise an angle to -180..180.
const wrap = (angle) => ((((angle + 180) % 360) + 360) % 360) - 180;

function HeroWheel() {
  const wheelRef = useRef(null);
  const motion = useRef({ angle: 0, target: null, resumeAt: 0, drag: null });
  const [inViewRef, inView] = useInView({ threshold: 0.05, once: false });
  const [active, setActive] = useState(0);
  const featured = placements[active];

  // One requestAnimationFrame loop turns the wheel while it is on screen:
  // a slow drift, an eased turn after a tap, or the finger during a swipe.
  useEffect(() => {
    if (!inView) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = 360 / (reduce ? 150000 : 95000); // degrees per ms
    const state = motion.current;
    let last = performance.now();
    let frame = 0;
    let shown = -1;
    const tick = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      if (!state.drag) {
        if (state.target !== null) {
          state.angle += (state.target - state.angle) * Math.min(1, dt / 180);
          if (Math.abs(state.target - state.angle) < 0.05) {
            state.angle = state.target;
            state.target = null;
            state.resumeAt = now + 2500;
          }
        } else if (now >= state.resumeAt) {
          state.angle += dt * speed;
        }
      }
      if (wheelRef.current) wheelRef.current.style.transform = `rotate(${state.angle.toFixed(3)}deg)`;
      const index = (((Math.round(-state.angle / STEP)) % placements.length) + placements.length) % placements.length;
      if (index !== shown) {
        shown = index;
        setActive(index);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  // Bring card `index` to the top by the shortest way round.
  const bringToTop = (index) => {
    const state = motion.current;
    state.target = state.angle - wrap(index * STEP + state.angle);
  };

  // Swipe sideways to spin; vertical scrolling still works (touch-action).
  const onPointerDown = (event) => {
    motion.current.drag = { x: event.clientX, angle: motion.current.angle, moved: false };
    motion.current.target = null;
  };
  const onPointerMove = (event) => {
    const drag = motion.current.drag;
    if (!drag) return;
    const dx = event.clientX - drag.x;
    if (Math.abs(dx) > 6) drag.moved = true;
    if (drag.moved) motion.current.angle = drag.angle + dx * 0.3;
  };
  const onPointerUp = () => {
    const drag = motion.current.drag;
    motion.current.drag = null;
    if (drag?.moved) motion.current.resumeAt = performance.now() + 2500;
  };

  return (
    <div
      className="nx-wheel"
      ref={inViewRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div className="nx-wheel-clip" aria-hidden="true">
        <div className="nx-wheel-ring" ref={wheelRef}>
          {placements.map((item, index) => (
            <button
              type="button"
              tabIndex={-1}
              key={item.key}
              className={`nx-wheel-card${index === active ? " is-active" : ""}`}
              style={{ "--a": `${(index * STEP).toFixed(3)}deg` }}
              onClick={() => {
                if (!motion.current.drag?.moved) bringToTop(index);
              }}
            >
              <ResponsiveImage src={item.image} alt="" loading={index < 3 || index > 11 ? "eager" : "lazy"} sizes="140px" />
              <span className="nx-wheel-city">
                <Icon name="map-pin" size={10} weight="fill" />
                {item.city}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="nx-wheel-caption" aria-hidden="true">
        <span key={featured.key}>
          <strong>{featured.role}</strong>
          <b>
            {formatLakhRange(featured.salary)}
            <em>/month</em>
          </b>
        </span>
      </p>

      {/* For screen readers: every role, with its typical pay. */}
      <ul className="sn-visually-hidden" aria-label="Healthcare roles in Germany with typical monthly pay">
        {placements.map((item) => (
          <li key={item.key}>
            {item.role} in {item.city}: {formatLakhRange(item.salary)} a month
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HeroSplit() {
  return (
    <section className="ph-hero nx-hero" id="top" aria-labelledby="ph-title">
      <div className="nx-hero-grid">
        <div className="ph-copy nx-hero-copy">
          {/* The webinar as a quiet eyebrow link (after Wise and Evernote),
              so it reads as a label, not a third button. */}
          <a className="nx-hero-news" href="https://learner.skillcase.in/events/7cdknjvd">
            <span className="nx-hero-news-kicker">Free live webinar</span>
            <span className="nx-hero-news-text">Nursing jobs in Germany</span>
            <Icon name="arrow-right" size={12} />
          </a>
          <h1 id="ph-title">Land your healthcare job in Germany</h1>
          <p className="nx-hero-lede">Explore healthcare jobs in Germany with expert support at every step.</p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#jobs">
              See Jobs
              <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
            </a>
            <a
              className="btn btn-outline hero-app-cta"
              href="https://play.google.com/store/apps/details?id=com.skillcase.app&hl=en_IN"
              rel="noreferrer"
              target="_blank"
            >
              <img src="/assets/images/google-play-mark.svg" alt="" aria-hidden="true" />
              Download App
            </a>
          </div>
        </div>

        {/* Desktop: the orbit. */}
        <HeroOrbit />
      </div>

      {/* Phones and tablets: the wheel. */}
      <HeroWheel />
    </section>
  );
}
