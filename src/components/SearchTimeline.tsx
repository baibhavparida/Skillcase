import React, { useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  BriefcaseMedical,
  Check,
  CloudUpload,
  FileCheck2,
  FileText,
  GraduationCap,
  Hospital,
  Languages,
  MessagesSquare,
  Plane,
  Plus,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
  Video,
} from "lucide-react";

const steps = [
  {
    id: "profile",
    label: "Create Profile",
    summary: "Build your Skillcase profile with education, experience, and preferred pathway.",
    status: "Profile builder active",
    icon: UserRoundCheck,
  },
  {
    id: "jobs",
    label: "Apply for eligible jobs",
    summary: "Shortlist the right openings and apply with a profile that is ready for employers.",
    status: "Eligible job matches ready",
    icon: BriefcaseMedical,
  },
  {
    id: "prepare",
    label: "Prepare for interviews",
    summary: "Use CV guidance, mock sessions, and role context before you meet recruiters.",
    status: "Interview preparation scheduled",
    icon: MessagesSquare,
  },
  {
    id: "visa",
    label: "Complete VISA & documentation",
    summary: "Keep documents, visa tasks, travel planning, and settlement support organized.",
    status: "Visa file and relocation checklist in review",
    icon: FileCheck2,
  },
] as const;

type StepId = (typeof steps)[number]["id"];

function meter(value: string): CSSProperties {
  return { "--value": value } as CSSProperties;
}

export default function SearchTimeline() {
  const [activeId, setActiveId] = useState<StepId>("profile");
  const activeIndex = steps.findIndex((step) => step.id === activeId);
  const activeStep = steps[activeIndex] ?? steps[0];
  const progressStyle = { "--timeline-progress": `${((activeIndex + 1) / steps.length) * 100}%` } as CSSProperties;

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
    <div className="job-timeline-shell">
      <div className="job-timeline-steps" role="tablist" aria-label="International job search process">
        <span className="timeline-rail" aria-hidden="true"><i style={progressStyle} /></span>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeId === step.id;
          return (
            <button
              className={`job-timeline-step${isActive ? " is-active" : ""}`}
              key={step.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onMouseEnter={() => setActiveId(step.id)}
              onFocus={() => setActiveId(step.id)}
              onClick={() => setActiveId(step.id)}
              onKeyDown={(event) => activateByKeyboard(event, index)}
            >
              <span className="timeline-node"><Icon size={17} aria-hidden="true" /></span>
              <span className="timeline-copy">
                <small>Step {String(index + 1).padStart(2, "0")}</small>
                <strong>{step.label}</strong>
                <em>{step.summary}</em>
              </span>
            </button>
          );
        })}
      </div>

      <div className="job-timeline-preview">
        <div className="timeline-preview-bar">
          <div>
            <span>Skillcase pathway</span>
            <strong>{activeStep.status}</strong>
          </div>
          <div className="timeline-live">
            <i />
            Live guidance
          </div>
        </div>

        <div className="timeline-preview-stage">
          <section className={`timeline-panel${activeId === "profile" ? " is-active" : ""}`} aria-label="Create profile UI preview">
            <div className="profile-builder-card">
              <div className="mini-window-header">
                <span />
                <strong>Profile builder</strong>
                <small>72%</small>
              </div>
              <div className="builder-grid">
                <span className="builder-avatar">SC</span>
                <div>
                  <strong>Candidate profile</strong>
                  <small>Nursing Jobs · Germany</small>
                </div>
              </div>
              <div className="timeline-meter"><i style={meter("72%")} /></div>
              <ul className="timeline-checks">
                <li><Check size={13} aria-hidden="true" />Education details added</li>
                <li><Check size={13} aria-hidden="true" />Work experience mapped</li>
                <li><Plus size={13} aria-hidden="true" />Language level pending</li>
              </ul>
            </div>
            <div className="upload-drop-card">
              <CloudUpload size={20} aria-hidden="true" />
              <strong>Upload documents</strong>
              <small>Passport, certificates, resume</small>
              <div className="upload-dots" aria-hidden="true"><i /><i /><i /></div>
            </div>
          </section>

          <section className={`timeline-panel${activeId === "jobs" ? " is-active" : ""}`} aria-label="Apply for eligible jobs UI preview">
            <div className="job-match-board">
              <article>
                <span><Stethoscope size={15} aria-hidden="true" /></span>
                <div>
                  <strong>Registered Nurse</strong>
                  <small>Hamburg · Full-time</small>
                </div>
                <b>96%</b>
              </article>
              <article>
                <span><Hospital size={15} aria-hidden="true" /></span>
                <div>
                  <strong>Care Facility Nurse</strong>
                  <small>Berlin · Relocation support</small>
                </div>
                <b>91%</b>
              </article>
              <article>
                <span><GraduationCap size={15} aria-hidden="true" /></span>
                <div>
                  <strong>Ausbildung pathway</strong>
                  <small>Munich · Training route</small>
                </div>
                <b>86%</b>
              </article>
            </div>
            <div className="application-card">
              <div className="application-orbit" aria-hidden="true">
                <span>Profile</span>
                <i />
                <b>Employer</b>
              </div>
              <strong>Eligibility filter</strong>
              <small>Only roles that match your profile and pathway are surfaced first.</small>
            </div>
          </section>

          <section className={`timeline-panel${activeId === "prepare" ? " is-active" : ""}`} aria-label="Interview preparation UI preview">
            <div className="interview-card">
              <div className="mini-window-header">
                <span />
                <strong>Mock interview</strong>
                <small>Fri</small>
              </div>
              <div className="video-frame">
                <Video size={20} aria-hidden="true" />
                <i />
              </div>
              <div className="timeline-transcript">
                <span /><span /><span />
              </div>
            </div>
            <div className="prep-stack">
              <article>
                <span><Languages size={15} aria-hidden="true" /></span>
                <strong>German practice</strong>
                <small>B1 workplace vocabulary</small>
              </article>
              <article>
                <span><FileText size={15} aria-hidden="true" /></span>
                <strong>CV polish</strong>
                <small>Employer-ready structure</small>
              </article>
            </div>
          </section>

          <section className={`timeline-panel${activeId === "visa" ? " is-active" : ""}`} aria-label="Visa and documentation UI preview">
            <div className="visa-track-card">
              <div className="visa-route" aria-hidden="true">
                <span className="visa-pin visa-pin-india">India</span>
                <span className="visa-pin visa-pin-germany">Germany</span>
                <i />
              </div>
              <div className="visa-status">
                <strong>Document file</strong>
                <span>Review in progress</span>
              </div>
            </div>
            <div className="visa-list-card">
              <ul className="timeline-checks">
                <li><Check size={13} aria-hidden="true" />Visa documents reviewed</li>
                <li><Check size={13} aria-hidden="true" />Offer letter attached</li>
                <li><Plane size={13} aria-hidden="true" />Travel planning next</li>
              </ul>
              <div className="stamp-chip">
                <ShieldCheck size={15} aria-hidden="true" />
                Skillcase verified
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
