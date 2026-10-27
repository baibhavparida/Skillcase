import { useRef, useState } from "react";
import "../styles/how-it-works.css";
import Icon from "./healthcare/Icon.jsx";
import { formatLakhRange } from "../data/placements.js";
import { roles } from "../data/roles.js";

// Four steps from sign-up to starting work. Each step shows a small piece of
// product-style UI built in code (profile, German level, job offer, boarding
// pass), so the process reads at a glance. The mock UI is decorative; the
// step titles and captions carry the meaning for screen readers.

const nursePay = formatLakhRange(roles.find((role) => role.key === "nurse").salary);

export function ProfileMock() {
  return (
    <div className="hm-card">
      <div className="hm-head">
        <span className="hm-avatar">
          <Icon name="user" size={14} />
        </span>
        <strong>Your profile</strong>
      </div>
      <div className="hm-chips">
        <span className="is-on">
          <Icon name="check-circle" size={12} weight="fill" />
          Nurse
        </span>
        <span>Doctor</span>
        <span>Physio</span>
      </div>
      <div className="hm-status">
        <Icon name="seal-check" size={13} weight="fill" />
        Advisor matched 3 roles
      </div>
    </div>
  );
}

export function GermanMock() {
  return (
    <div className="hm-card">
      <div className="hm-head hm-between">
        <strong>German level</strong>
        <span className="hm-tag">B1</span>
      </div>
      <ol className="hm-levels">
        <li className="is-done">A1</li>
        <li className="is-done">A2</li>
        <li className="is-now">B1</li>
        <li>B2</li>
      </ol>
      <div className="hm-live">
        <span className="hm-dot" />
        Live class · 7:00 PM
      </div>
    </div>
  );
}

export function OfferMock() {
  return (
    <div className="hm-card">
      <div className="hm-head">
        <span className="hm-icon">
          <Icon name="hospital" size={15} />
        </span>
        <span className="hm-title">
          <strong>Job offer</strong>
          <small>University hospital · Hamburg</small>
        </span>
      </div>
      <div className="hm-offer">
        <span className="hm-pay">{nursePay}/month</span>
        <span className="hm-btn">Accept</span>
      </div>
    </div>
  );
}

export function MoveMock() {
  return (
    <div className="hm-card hm-pass">
      <div className="hm-route">
        <span className="hm-city">
          <strong>BLR</strong>
          <small>Bengaluru</small>
        </span>
        <span className="hm-flight">
          <Icon name="airplane" size={14} weight="fill" />
        </span>
        <span className="hm-city hm-city-end">
          <strong>FRA</strong>
          <small>Frankfurt</small>
        </span>
      </div>
      <div className="hm-checks">
        <span>
          <Icon name="check" size={11} />
          Visa
        </span>
        <span>
          <Icon name="check" size={11} />
          Housing
        </span>
        <span>
          <Icon name="check" size={11} />
          Family
        </span>
      </div>
    </div>
  );
}

export const steps = [
  { title: "Create your profile", copy: "An advisor matches you to roles.", Visual: ProfileMock },
  { title: "Learn German", copy: "Live classes from A1 to B2.", Visual: GermanMock },
  { title: "Get your job offer", copy: "Interview prep and employer matching.", Visual: OfferMock },
  { title: "Move to Germany", copy: "Visa, relocation and family support.", Visual: MoveMock },
];

export default function HowItWorks() {
  // On phones the steps are a swipeable row; the dots show and set the step.
  const listRef = useRef(null);
  const [active, setActive] = useState(0);

  const stepWidth = (list) => {
    const card = list.firstElementChild;
    return card.getBoundingClientRect().width + (Number.parseFloat(getComputedStyle(list).columnGap) || 0);
  };

  const handleScroll = () => {
    const list = listRef.current;
    if (!list?.firstElementChild) return;
    setActive(Math.min(steps.length - 1, Math.round(list.scrollLeft / stepWidth(list))));
  };

  const goTo = (index) => {
    const list = listRef.current;
    if (!list?.firstElementChild) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: index * stepWidth(list), behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section className="section hiw-section" aria-labelledby="hiw-title">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2 id="hiw-title">4 steps to your job in Germany</h2>
      </div>
      <ol
        className="hiw-steps"
        ref={listRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label="Steps to your job in Germany"
      >
        {steps.map(({ title, copy, Visual }, index) => (
          <li className="hiw-card" key={title}>
            <div className="hiw-visual" aria-hidden="true">
              <Visual />
            </div>
            <div className="hiw-body">
              <span className="hiw-number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="hiw-dots">
        {steps.map(({ title }, index) => (
          <button
            key={title}
            type="button"
            className={index === active ? "is-active" : undefined}
            aria-label={`Show step ${index + 1}: ${title}`}
            aria-current={index === active ? "step" : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
      <div className="hiw-actions">
        <a className="btn btn-gold" href="/signup/">
          Create your profile
          <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
        </a>
        <span className="hiw-note">
          <span data-icon="check-circle-2" data-size="14" aria-hidden="true"></span>
          No recruitment fees
        </span>
      </div>
    </section>
  );
}
