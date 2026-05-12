import React, { useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  PlaneTakeoff,
  Stethoscope,
  TicketCheck,
  Video,
} from "lucide-react";

const steps = [
  {
    id: "profile",
    label: "Profile & Assessment",
    summary: "Readiness map, documents, pathway fit",
    status: "Profile readiness in progress",
    icon: ClipboardCheck,
  },
  {
    id: "matching",
    label: "Job Matching",
    summary: "Shortlisted roles around your profile",
    status: "Employer matching in progress",
    icon: HeartHandshake,
  },
  {
    id: "training",
    label: "Training & Preparation",
    summary: "Language, CV, and interview support",
    status: "Training plan being prepared",
    icon: GraduationCap,
  },
  {
    id: "relocation",
    label: "Immigration & Relocation",
    summary: "Visa, travel, and settlement planning",
    status: "Relocation file getting organized",
    icon: PlaneTakeoff,
  },
] as const;

type StepId = (typeof steps)[number]["id"];

function meter(value: string): CSSProperties {
  return { "--value": value } as CSSProperties;
}

export default function ProcessWorkspace() {
  const [activeId, setActiveId] = useState<StepId>("profile");
  const activeIndex = steps.findIndex((step) => step.id === activeId);
  const activeStep = steps[activeIndex] ?? steps[0];

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
    <div className="process-workspace">
      <div className="journey-topbar">
        <div className="journey-logo-lockup">
          <img alt="Skillcase" src="/assets/images/SKILLCASE_logo.svg" />
          <span>Career pathway workspace</span>
        </div>
        <div className="journey-progress-wrap" aria-hidden="true">
          <span>{activeStep.status}</span>
          <div className="journey-progress">
            <i style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
        <a className="journey-cta" href="#jobs">
          Get started
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>

      <div className="journey-body">
        <div className="journey-nav" role="tablist" aria-label="Skillcase guided process">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === activeId;
            return (
              <button
                className={`journey-step${isActive ? " is-active" : ""}`}
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onMouseEnter={() => setActiveId(step.id)}
                onFocus={() => setActiveId(step.id)}
                onClick={() => setActiveId(step.id)}
                onKeyDown={(event) => activateByKeyboard(event, index)}
              >
                <span className="journey-index">
                  <Icon size={16} aria-hidden="true" />
                </span>
                <strong>{step.label}</strong>
                <small>{step.summary}</small>
              </button>
            );
          })}
        </div>

        <div className="journey-preview">
          <section className={`journey-asset${activeId === "profile" ? " is-active" : ""}`} aria-label="Profile and assessment preview">
            <div className="asset-rail">
              <span>Documents</span>
              <strong>8/10</strong>
              <small>Ready for review</small>
            </div>
            <div className="asset-panel asset-panel-main">
              <div className="asset-panel-header">
                <span>Skillcase profile</span>
                <strong>92%</strong>
              </div>
              <div className="asset-profile-row">
                <span className="asset-avatar">RN</span>
                <div>
                  <strong>Nursing Jobs</strong>
                  <small>Germany pathway</small>
                </div>
              </div>
              <div className="asset-meter"><i style={meter("92%")} /></div>
              <ul className="asset-checklist">
                <li><Check size={13} aria-hidden="true" />Education mapped</li>
                <li><Check size={13} aria-hidden="true" />Experience verified</li>
                <li><Check size={13} aria-hidden="true" />Profile gaps highlighted</li>
              </ul>
            </div>
            <div className="asset-mini-card asset-mini-card-top">
              <BadgeCheck size={16} aria-hidden="true" />
              <strong>Assessment complete</strong>
              <small>Clear action plan</small>
            </div>
          </section>

          <section className={`journey-asset${activeId === "matching" ? " is-active" : ""}`} aria-label="Job matching preview">
            <div className="asset-match-stack">
              <article>
                <span><Stethoscope size={14} aria-hidden="true" /></span>
                <div>
                  <strong>Registered Nurse</strong>
                  <small>Hamburg · Hospital network</small>
                </div>
                <b>96%</b>
              </article>
              <article>
                <span><Building2 size={14} aria-hidden="true" /></span>
                <div>
                  <strong>Care Specialist</strong>
                  <small>Berlin · Senior care</small>
                </div>
                <b>91%</b>
              </article>
              <article>
                <span><GraduationCap size={14} aria-hidden="true" /></span>
                <div>
                  <strong>Ausbildung Track</strong>
                  <small>Munich · Training partner</small>
                </div>
                <b>86%</b>
              </article>
            </div>
            <div className="asset-panel asset-match-panel">
              <div className="asset-panel-header">
                <span>Employer fit</span>
                <strong>High</strong>
              </div>
              <div className="asset-match-orbit" aria-hidden="true">
                <span>Profile</span>
                <i />
                <b>Role</b>
              </div>
              <p>Relevant roles are shortlisted around your profile, preferred pathway, and employer requirements.</p>
            </div>
          </section>

          <section className={`journey-asset${activeId === "training" ? " is-active" : ""}`} aria-label="Training and preparation preview">
            <div className="asset-panel asset-training-panel">
              <div className="asset-panel-header">
                <span>Preparation plan</span>
                <strong>A2 → B1</strong>
              </div>
              <div className="asset-calendar" aria-hidden="true">
                <span>M</span><span>T</span><span className="is-booked">W</span><span>T</span><span className="is-live">F</span>
              </div>
              <div className="asset-bars">
                <label>Language milestones<i style={meter("68%")} /></label>
                <label>CV guidance<i style={meter("82%")} /></label>
                <label>Interview practice<i style={meter("58%")} /></label>
              </div>
            </div>
            <div className="asset-mini-card asset-training-note">
              <Video size={16} aria-hidden="true" />
              <strong>Mock interview</strong>
              <small>Friday · 6:30 PM</small>
            </div>
            <div className="asset-mini-card asset-word-card">
              <span>B1</span>
              <strong>Workplace German</strong>
              <small>Healthcare vocabulary</small>
            </div>
          </section>

          <section className={`journey-asset${activeId === "relocation" ? " is-active" : ""}`} aria-label="Immigration and relocation preview">
            <div className="asset-route-card">
              <div className="asset-route-map" aria-hidden="true">
                <span className="route-dot route-dot-india">India</span>
                <span className="route-dot route-dot-germany">Germany</span>
                <i />
              </div>
              <div className="asset-panel-header">
                <span>Relocation file</span>
                <strong>On track</strong>
              </div>
            </div>
            <div className="asset-panel asset-visa-panel">
              <ul className="asset-checklist">
                <li><Check size={13} aria-hidden="true" />Visa documentation</li>
                <li><Check size={13} aria-hidden="true" />Travel planning</li>
                <li><Check size={13} aria-hidden="true" />Family support checklist</li>
              </ul>
              <div className="asset-ticket">
                <TicketCheck size={17} aria-hidden="true" />
                <div>
                  <strong>Offer to arrival</strong>
                  <small>Structured by Skillcase</small>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
