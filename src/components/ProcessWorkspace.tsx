import React, { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import {
  AirplaneTakeoffIcon as AirplaneTakeoff,
  ArrowUpRightIcon as ArrowUpRight,
  BuildingsIcon as Buildings,
  CheckIcon as Check,
  ClipboardTextIcon as ClipboardText,
  GraduationCapIcon as GraduationCap,
  HandshakeIcon as Handshake,
  SealCheckIcon as SealCheck,
  StethoscopeIcon as Stethoscope,
  TicketIcon as Ticket,
  VideoCameraIcon as VideoCamera,
} from "@phosphor-icons/react/ssr";

const steps = [
  {
    id: "profile",
    label: "Profile Builder",
    summary: "Readiness map, document review, pathway fit",
    icon: ClipboardText,
  },
  {
    id: "matching",
    label: "Job Matching",
    summary: "Shortlisted roles around your profile",
    icon: Handshake,
  },
  {
    id: "training",
    label: "Training & Prep",
    summary: "Language, CV, and interview support",
    icon: GraduationCap,
  },
  {
    id: "relocation",
    label: "Relocation",
    summary: "Visa, travel, and settlement planning",
    icon: AirplaneTakeoff,
  },
] as const;

type StepId = (typeof steps)[number]["id"];
const AUTO_ROTATE_DELAY = 4800;

function meter(value: string): CSSProperties {
  return { "--value": value } as CSSProperties;
}

function getNextStepId(currentId: StepId): StepId {
  const currentIndex = steps.findIndex((step) => step.id === currentId);
  const nextIndex = ((currentIndex >= 0 ? currentIndex : 0) + 1) % steps.length;
  return steps[nextIndex].id;
}

export default function ProcessWorkspace() {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<StepId>("profile");
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [isFocusInside, setIsFocusInside] = useState(false);
  const activeIndex = steps.findIndex((step) => step.id === activeId);
  const isAutoPaused = isPointerInside || isFocusInside;

  useEffect(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return undefined;
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -18% 0px", threshold: 0.24 },
    );
    observer.observe(workspace);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) setActiveId(steps[0].id);
  }, [isVisible]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !isVisible || isAutoPaused || steps.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveId((currentId) => getNextStepId(currentId));
    }, AUTO_ROTATE_DELAY);
    return () => window.clearInterval(timer);
  }, [isAutoPaused, isVisible]);

  const activateByKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
    const nextStep = steps[(index + direction + steps.length) % steps.length];
    setActiveId(nextStep.id);
  };

  return (
    <div
      className="workspace-shell"
      ref={workspaceRef}
      onMouseEnter={() => setIsPointerInside(true)}
      onMouseLeave={() => setIsPointerInside(false)}
      onFocus={() => setIsFocusInside(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsFocusInside(false);
        }
      }}
    >
      <header className="workspace-topbar">
        <div className="workspace-brand">
          <img alt="Skillcase" src="/assets/images/SKILLCASE_logo.svg" />
          <span className="workspace-divider" aria-hidden="true" />
          <span className="workspace-brand-label">Workspace preview</span>
        </div>
        <div className="workspace-status" aria-hidden="true">
          <span className="workspace-dot" />
          Live
        </div>
        <a className="workspace-cta" href="#jobs">
          Get started
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </a>
      </header>

      <div className="workspace-body">
        <nav className="workspace-tabs" role="tablist" aria-label="Skillcase features">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === activeId;
            return (
              <button
                aria-selected={isActive}
                className={`workspace-tab${isActive ? " is-active" : ""}`}
                key={step.id}
                onClick={() => setActiveId(step.id)}
                onFocus={() => setActiveId(step.id)}
                onKeyDown={(event) => activateByKeyboard(event, index)}
                onMouseEnter={() => setActiveId(step.id)}
                role="tab"
                type="button"
              >
                <span className="workspace-tab-icon" aria-hidden="true">
                  <Icon size={18} weight="bold" />
                </span>
                <span className="workspace-tab-body">
                  <strong>{step.label}</strong>
                  <small>{step.summary}</small>
                </span>
                <span className="workspace-tab-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="workspace-stage">
          <section
            aria-hidden={activeId !== "profile"}
            aria-label="Profile builder preview"
            className={`workspace-asset${activeId === "profile" ? " is-active" : ""}`}
          >
            <article className="workspace-panel">
              <header className="workspace-panel-head">
                <span>Skillcase profile</span>
                <strong>92%</strong>
              </header>
              <div className="workspace-profile-row">
                <span className="workspace-avatar">PR</span>
                <div>
                  <strong>Priya R.</strong>
                  <small>Registered Nurse · Kerala</small>
                </div>
              </div>
              <label className="workspace-meter-label">
                Profile readiness
                <span className="workspace-meter"><i style={meter("92%")} /></span>
              </label>
              <ul className="workspace-checklist">
                <li><Check size={14} weight="bold" aria-hidden="true" />Education mapped</li>
                <li><Check size={14} weight="bold" aria-hidden="true" />Experience verified</li>
                <li><Check size={14} weight="bold" aria-hidden="true" />Documents uploaded</li>
              </ul>
            </article>
            <aside className="workspace-badge">
              <SealCheck size={18} weight="fill" aria-hidden="true" />
              <div>
                <strong>Verified profile</strong>
                <small>Ready for review</small>
              </div>
            </aside>
          </section>

          <section
            aria-hidden={activeId !== "matching"}
            aria-label="Job matching preview"
            className={`workspace-asset${activeId === "matching" ? " is-active" : ""}`}
          >
            <article className="workspace-panel">
              <header className="workspace-panel-head">
                <span>Recommended roles</span>
                <strong>3 matches</strong>
              </header>
              <ul className="workspace-roles">
                <li>
                  <span className="workspace-role-icon"><Stethoscope size={16} weight="bold" aria-hidden="true" /></span>
                  <div>
                    <strong>Registered Nurse</strong>
                    <small>Hamburg · Hospital network</small>
                  </div>
                  <b>96%</b>
                </li>
                <li>
                  <span className="workspace-role-icon"><Buildings size={16} weight="bold" aria-hidden="true" /></span>
                  <div>
                    <strong>Care Specialist</strong>
                    <small>Berlin · Senior care</small>
                  </div>
                  <b>91%</b>
                </li>
                <li>
                  <span className="workspace-role-icon"><GraduationCap size={16} weight="bold" aria-hidden="true" /></span>
                  <div>
                    <strong>Ausbildung Track</strong>
                    <small>Munich · Training partner</small>
                  </div>
                  <b>86%</b>
                </li>
              </ul>
            </article>
            <aside className="workspace-badge">
              <Handshake size={18} weight="fill" aria-hidden="true" />
              <div>
                <strong>Strong employer fit</strong>
                <small>Profile-led matches</small>
              </div>
            </aside>
          </section>

          <section
            aria-hidden={activeId !== "training"}
            aria-label="Training and preparation preview"
            className={`workspace-asset${activeId === "training" ? " is-active" : ""}`}
          >
            <article className="workspace-panel">
              <header className="workspace-panel-head">
                <span>Preparation plan</span>
                <strong>A2 → B1</strong>
              </header>
              <div className="workspace-week" aria-hidden="true">
                <span>M</span><span>T</span><span className="is-booked">W</span><span>T</span><span className="is-live">F</span>
              </div>
              <div className="workspace-bars">
                <label>Language milestones<i style={meter("68%")} /></label>
                <label>CV guidance<i style={meter("82%")} /></label>
                <label>Interview practice<i style={meter("58%")} /></label>
              </div>
            </article>
            <aside className="workspace-badge">
              <VideoCamera size={18} weight="bold" aria-hidden="true" />
              <div>
                <strong>Mock interview</strong>
                <small>Friday · 6:30 PM</small>
              </div>
            </aside>
          </section>

          <section
            aria-hidden={activeId !== "relocation"}
            aria-label="Immigration and relocation preview"
            className={`workspace-asset${activeId === "relocation" ? " is-active" : ""}`}
          >
            <article className="workspace-panel">
              <header className="workspace-panel-head">
                <span>Relocation file</span>
                <strong>On track</strong>
              </header>
              <div className="workspace-route" aria-hidden="true">
                <span className="workspace-route-dot is-india">India</span>
                <span className="workspace-route-line" />
                <AirplaneTakeoff className="workspace-route-plane" size={14} weight="fill" aria-hidden="true" />
                <span className="workspace-route-dot is-germany">Germany</span>
              </div>
              <ul className="workspace-checklist">
                <li><Check size={14} weight="bold" aria-hidden="true" />Visa documentation</li>
                <li><Check size={14} weight="bold" aria-hidden="true" />Travel planning</li>
                <li><Check size={14} weight="bold" aria-hidden="true" />Family support checklist</li>
              </ul>
            </article>
            <aside className="workspace-badge">
              <Ticket size={18} weight="bold" aria-hidden="true" />
              <div>
                <strong>Offer to arrival</strong>
                <small>Structured by Skillcase</small>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </div>
  );
}
