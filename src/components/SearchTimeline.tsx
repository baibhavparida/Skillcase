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

const steps = [
  {
    id: "profile",
    label: "Create Profile",
    summary: "Add education, experience, language files, and preferred pathway.",
    status: "Profile builder active",
    accent: "#05a3e5",
    icon: UserCircleCheck,
  },
  {
    id: "jobs",
    label: "Apply for eligible jobs",
    summary: "Shortlist eligible roles and apply with an employer-ready profile.",
    status: "Eligible matches ready",
    accent: "#05a3e5",
    icon: FirstAid,
  },
  {
    id: "prepare",
    label: "Prepare for interviews",
    summary: "Review your CV, practice B1 answers, and rehearse with role context.",
    status: "Interview prep scheduled",
    accent: "#05a3e5",
    icon: Chats,
  },
  {
    id: "visa",
    label: "Complete VISA documents",
    summary: "Organize visa files, travel tasks, and relocation support.",
    status: "Visa checklist in review",
    accent: "#05a3e5",
    icon: FileText,
  },
] as const;

const AUTO_ADVANCE_MS = 4500;

type StepId = (typeof steps)[number]["id"];

function meter(value: string): CSSProperties {
  return { "--value": value } as CSSProperties;
}

function accent(value: string): CSSProperties {
  return { "--step-accent": value } as CSSProperties;
}

function getNextStepId(currentId: StepId): StepId {
  const currentIndex = steps.findIndex((step) => step.id === currentId);
  const nextIndex = ((currentIndex >= 0 ? currentIndex : 0) + 1) % steps.length;
  return steps[nextIndex].id;
}

function renderAsset(id: StepId) {
  switch (id) {
    case "profile":
      return (
        <div className="timeline-asset timeline-asset-profile" aria-hidden="true">
          <div className="asset-ui-head">
            <span>Candidate file</span>
            <b>72%</b>
          </div>
          <div className="asset-readiness-track">
            <i style={meter("72%")} />
          </div>
          <div className="asset-status-grid">
            <span><Check size={13} weight="bold" />Education<b>Mapped</b></span>
            <span><Check size={13} weight="bold" />Experience<b>Added</b></span>
            <span className="asset-is-next"><Check size={13} weight="bold" />Language<b>Queued</b></span>
          </div>
          <div className="asset-file-strip">
            <span>CV</span>
            <span>Certs</span>
            <span className="asset-is-next">B1 file</span>
          </div>
        </div>
      );
    case "jobs":
      return (
        <div className="timeline-asset timeline-asset-jobs" aria-hidden="true">
          <div className="asset-ui-head">
            <span>Role shortlist</span>
            <b>Fit</b>
          </div>
          <div className="asset-match-table">
            <span className="asset-match-row">
              <strong>Registered Nurse<small>Clinical route</small></strong>
              <b>96%</b>
              <i style={meter("96%")} />
            </span>
            <span className="asset-match-row">
              <strong>Care Facility<small>Employer ready</small></strong>
              <b>91%</b>
              <i style={meter("91%")} />
            </span>
            <span className="asset-match-row">
              <strong>Ausbildung<small>Training route</small></strong>
              <b>86%</b>
              <i style={meter("86%")} />
            </span>
          </div>
          <p className="asset-note">Screening keeps the shortlist focused.</p>
        </div>
      );
    case "prepare":
      return (
        <div className="timeline-asset timeline-asset-prepare" aria-hidden="true">
          <div className="asset-ui-head">
            <span>Prep schedule</span>
            <b>Fri</b>
          </div>
          <div className="asset-session-strip">
            <span>6:30 PM</span>
            <strong>Mock interview</strong>
          </div>
          <div className="asset-prep-list">
            <span><FileText size={14} weight="bold" />CV review<b>Done</b></span>
            <span className="asset-is-next"><Translate size={14} weight="bold" />B1 practice<b>Active</b></span>
            <span>Role notes<b>Ready</b></span>
          </div>
          <p className="asset-note">Prep stays in sequence.</p>
        </div>
      );
    case "visa":
      return (
        <div className="timeline-asset timeline-asset-visa" aria-hidden="true">
          <div className="asset-ui-head">
            <span>Relocation file</span>
            <b>Review</b>
          </div>
          <div className="asset-route-minimal">
            <span>India</span>
            <i><Airplane size={13} weight="fill" /></i>
            <span>Germany</span>
          </div>
          <ul className="asset-doc-list-modern">
            <li><Check size={13} weight="bold" />Visa documents<b>Reviewed</b></li>
            <li><Check size={13} weight="bold" />Offer file<b>Verified</b></li>
            <li className="asset-is-next"><Check size={13} weight="bold" />Travel plan<b>Next</b></li>
          </ul>
        </div>
      );
  }
}

export default function SearchTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<StepId>("profile");
  const [isVisible, setIsVisible] = useState(false);
  const activeIndex = steps.findIndex((step) => step.id === activeId);
  const progressStyle = { "--timeline-progress": `${((activeIndex + 1) / steps.length) * 100}%` } as CSSProperties;

  useEffect(() => {
    const timeline = timelineRef.current;

    if (!timeline) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.24 },
    );

    observer.observe(timeline);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      setActiveId(steps[0].id);
    }
  }, [isVisible]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!isVisible) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveId((currentId) => getNextStepId(currentId));
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeId, isVisible]);

  const activateByKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
    const nextStep = steps[(index + direction + steps.length) % steps.length];
    setActiveId(nextStep.id);
  };

  return (
    <div className="job-timeline-shell" ref={timelineRef}>
      <span className="timeline-rail" aria-hidden="true"><i style={progressStyle} /></span>
      <ol className="job-timeline-steps" aria-label="International job search process">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeId === step.id;
          return (
            <li className="job-timeline-item" key={step.id}>
              <button
                className={`job-timeline-step${isActive ? " is-active" : ""}`}
                style={accent(step.accent)}
                type="button"
                aria-current={isActive ? "step" : undefined}
                aria-label={`${step.label}: ${step.summary}`}
                onMouseEnter={() => setActiveId(step.id)}
                onFocus={() => setActiveId(step.id)}
                onClick={() => setActiveId(step.id)}
                onKeyDown={(event) => activateByKeyboard(event, index)}
              >
                <span className="timeline-node"><Icon size={18} weight="bold" aria-hidden="true" /></span>
                <span className="timeline-copy">
                  <small>Step {String(index + 1).padStart(2, "0")} · {step.status}</small>
                  <strong>{step.label}</strong>
                  <em>{step.summary}</em>
                </span>
                {renderAsset(step.id)}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
