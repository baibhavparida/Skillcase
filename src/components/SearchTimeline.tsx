import React, { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  AirplaneIcon as Airplane,
  CheckIcon as Check,
  FileTextIcon as FileText,
  FirstAidIcon as FirstAid,
  ChatsIcon as Chats,
  TranslateIcon as Translate,
  UserCircleCheckIcon as UserCircleCheck,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";

type StepId = "profile" | "jobs" | "prepare" | "visa";

type Step = {
  id: StepId;
  num: string;
  label: string;
  short: string;
  summary: string;
  status: string;
  icon: Icon;
};

const steps: Step[] = [
  {
    id: "profile",
    num: "01",
    label: "Create your profile",
    short: "Profile",
    summary: "Education, experience, German level and the cities or roles you want.",
    status: "Profile builder",
    icon: UserCircleCheck,
  },
  {
    id: "jobs",
    num: "02",
    label: "Get matched to roles",
    short: "Match",
    summary: "Skillcase shortlists eligible Germany roles for your level and qualification.",
    status: "Eligible matches",
    icon: FirstAid,
  },
  {
    id: "prepare",
    num: "03",
    label: "Prepare for interviews",
    short: "Prep",
    summary: "CV polish, mock interviews in German and English, and recruiter-style practice.",
    status: "Coach-led prep",
    icon: Chats,
  },
  {
    id: "visa",
    num: "04",
    label: "Documents, visa, move",
    short: "Move",
    summary: "Anerkennung, embassy, family relocation and the first 30 days in Germany.",
    status: "End-to-end support",
    icon: FileText,
  },
];

const AUTO_ADVANCE_MS = 5200;

function meter(value: string): CSSProperties {
  return { "--value": value } as CSSProperties;
}

function MiniAsset({ id }: { id: StepId }) {
  switch (id) {
    case "profile":
      return (
        <div className="sc-tl-asset" aria-hidden="true">
          <div className="sc-tl-asset-row">
            <span className="sc-tl-asset-label">Candidate file</span>
            <span className="sc-tl-asset-tag">72%</span>
          </div>
          <div className="sc-tl-bar"><i style={meter("72%")} /></div>
          <ul className="sc-tl-stack">
            <li className="is-done"><Check size={10} weight="bold" />Qualification<em>BSc</em></li>
            <li className="is-done"><Check size={10} weight="bold" />Experience<em>3 yrs</em></li>
            <li className="is-next"><Check size={10} weight="bold" />Language<em>A2</em></li>
          </ul>
        </div>
      );
    case "jobs":
      return (
        <div className="sc-tl-asset" aria-hidden="true">
          <div className="sc-tl-asset-row">
            <span className="sc-tl-asset-label">Shortlist</span>
            <span className="sc-tl-asset-tag is-cyan">5 fits</span>
          </div>
          <ul className="sc-tl-match">
            <li>
              <strong>Hamburg Care</strong>
              <span><i style={meter("96%")} /></span>
              <b>96</b>
            </li>
            <li>
              <strong>Aachen City</strong>
              <span><i style={meter("91%")} /></span>
              <b>91</b>
            </li>
            <li>
              <strong>Berlin Elder Care</strong>
              <span><i style={meter("84%")} /></span>
              <b>84</b>
            </li>
          </ul>
        </div>
      );
    case "prepare":
      return (
        <div className="sc-tl-asset" aria-hidden="true">
          <div className="sc-tl-asset-row">
            <span className="sc-tl-asset-label">This week</span>
            <span className="sc-tl-asset-tag is-gold">Fri 6:30</span>
          </div>
          <div className="sc-tl-prep">
            <span className="sc-tl-prep-icon"><Chats size={14} weight="fill" /></span>
            <div>
              <strong>Mock interview</strong>
              <small>Hamburg Care · 30 min</small>
            </div>
          </div>
          <ul className="sc-tl-stack">
            <li className="is-done"><Check size={10} weight="bold" />CV review<em>Done</em></li>
            <li className="is-next"><Translate size={10} weight="bold" />B1 drill<em>Active</em></li>
          </ul>
        </div>
      );
    case "visa":
      return (
        <div className="sc-tl-asset" aria-hidden="true">
          <div className="sc-tl-asset-row">
            <span className="sc-tl-asset-label">Relocation</span>
            <span className="sc-tl-asset-tag">In motion</span>
          </div>
          <div className="sc-tl-route">
            <span>Kochi</span>
            <i aria-hidden="true"><Airplane size={11} weight="fill" /></i>
            <span>Aachen</span>
          </div>
          <ul className="sc-tl-stack">
            <li className="is-done"><Check size={10} weight="bold" />Anerkennung<em>24 May</em></li>
            <li className="is-next"><Check size={10} weight="bold" />Visa appt<em>12 Jun</em></li>
          </ul>
        </div>
      );
  }
}

export default function SearchTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<StepId>("profile");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px", threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) setActiveId(steps[0].id);
  }, [isVisible]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!isVisible) return;
    const timer = window.setTimeout(() => {
      setActiveId((current) => {
        const i = steps.findIndex((s) => s.id === current);
        return steps[(i + 1) % steps.length].id;
      });
    }, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [activeId, isVisible]);

  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else {
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      next = (index + direction + steps.length) % steps.length;
    }
    setActiveId(steps[next].id);
  };

  const activeIndex = steps.findIndex((s) => s.id === activeId);
  const progressScale = activeIndex / Math.max(1, steps.length - 1);
  const railFill: CSSProperties = {
    "--rail-progress": `${progressScale * 100}%`,
    "--rail-progress-scale": progressScale,
  } as CSSProperties;

  return (
    <div className="sc-tl" ref={containerRef}>
      <div className="sc-tl-rail" style={railFill} aria-hidden="true">
        <span className="sc-tl-rail-line" />
        <span className="sc-tl-rail-fill" />
        {steps.map((step, index) => (
          <span
            key={step.id}
            className={`sc-tl-rail-node ${index <= activeIndex ? "is-done" : ""} ${index === activeIndex ? "is-current" : ""}`}
          >
            {index < activeIndex ? <Check size={11} weight="bold" /> : <i>{step.num}</i>}
          </span>
        ))}
      </div>

      <ol className="sc-tl-cards" aria-label="Skillcase pathway">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === activeId;
          const isPast = index < activeIndex;
          return (
            <li
              className={`sc-tl-card-wrap ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`}
              key={step.id}
            >
              <button
                type="button"
                className="sc-tl-card"
                aria-current={isActive ? "step" : undefined}
                style={{
                  "--sc-tl-card-progress-duration": isActive && isVisible ? `${AUTO_ADVANCE_MS}ms` : "0ms",
                } as CSSProperties}
                onMouseEnter={() => setActiveId(step.id)}
                onFocus={() => setActiveId(step.id)}
                onClick={() => setActiveId(step.id)}
                onKeyDown={(event) => handleKey(event, index)}
              >
                <header className="sc-tl-card-head">
                  <span className="sc-tl-card-num">{step.num}</span>
                  <span className="sc-tl-card-status">
                    <Icon size={12} weight="bold" aria-hidden="true" />
                    {step.status}
                  </span>
                </header>
                <h3>{step.label}</h3>
                <p>{step.summary}</p>
                <MiniAsset id={step.id} />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
