import React from "react";
import {
  BriefcaseIcon as Briefcase,
  CheckIcon as Check,
  FileTextIcon as FileText,
  GraduationCapIcon as GraduationCap,
  IdentificationCardIcon as Passport,
  SealCheckIcon as SealCheck,
  ShieldCheckIcon as ShieldCheck,
  ChatCircleTextIcon as ChatCircleText,
} from "@phosphor-icons/react/ssr";
import { rankAtLeast } from "../../data/dashboardStorage";
import { ProgressRing, TaskList, type DashboardContext } from "./shared";

export function ProgressView(ctx: DashboardContext) {
  const milestones = buildJourney(ctx);

  return (
    <div className="sc-dash-tab-space">
      <section className="sc-dash-card-flat sc-dash-progress-hero">
        <div className="sc-dash-progress-hero-copy">
          <p className="sc-dash-eyebrow"><SealCheck size={11} weight="bold" /> Your progress</p>
          <h2>{ctx.journeyScore}% of the Germany pathway</h2>
          <p>Language, profile, documents, interviews, visa. Every step Skillcase tracks lives here.</p>
        </div>
        <ProgressRing value={ctx.journeyScore} size={120} stroke={10} segmented />
      </section>

      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow">Readiness</p>
            <h2>Task checklist</h2>
          </div>
          <span className="sc-dash-level-pill">{ctx.level.label}</span>
        </div>
        <TaskList tasks={ctx.readinessTasks} onSelect={ctx.setActiveTab} />
      </section>

      <section className="sc-dash-timeline" aria-label="Full journey timeline">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          return (
            <article key={m.label} className={`is-${m.state}`}>
              <span aria-hidden="true">
                {m.state === "done" ? <Check size={12} weight="bold" /> : <Icon size={14} weight="bold" />}
              </span>
              <strong>{m.label}</strong>
              <small>{m.detail}</small>
              {m.eta && <em>{m.eta}</em>}
              <i>{String(i + 1).padStart(2, "0")}</i>
            </article>
          );
        })}
      </section>

      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><FileText size={11} weight="bold" /> Documents</p>
            <h2>{ctx.documentReadiness}% ready</h2>
          </div>
          <button className="sc-dash-text-link" type="button" onClick={() => ctx.setActiveTab("documents")}>
            Open
          </button>
        </div>
        <div className="sc-dash-doc-bar">
          <span style={{ width: `${ctx.documentReadiness}%` }} className="is-approved" />
        </div>
      </section>
    </div>
  );
}

function buildJourney(ctx: DashboardContext) {
  const rank = ctx.level.rank;
  const jobsOpen = rankAtLeast(ctx.profile.germanLevel, "b1_completed");
  return [
    { label: "Profile saved", detail: `${ctx.profileCompleteness}% complete`, state: ctx.profileCompleteness >= 80 ? "done" : "current", icon: SealCheck, eta: "Today" },
    { label: "German A1 → A2", detail: rank >= 2 ? "Cleared" : "Live online classes for nurses", state: rank >= 2 ? "done" : rank >= 1 ? "current" : "next", icon: GraduationCap, eta: rank >= 2 ? undefined : "≈3 months" },
    { label: "German B1", detail: rank >= 4 ? "Cleared · jobs unlocked" : "13+ jobs unlock here", state: rank >= 4 ? "done" : rank >= 2 ? "current" : "locked", icon: GraduationCap, eta: rank >= 4 ? undefined : "≈3 months" },
    { label: "Documents & recognition", detail: `${ctx.documentReadiness}% ready · Anerkennung in progress`, state: ctx.documentReadiness >= 80 ? "done" : rank >= 2 ? "current" : "locked", icon: Passport, eta: rank >= 2 ? "≈2 months parallel" : "Starts at A2" },
    { label: "Interview & offer", detail: jobsOpen ? `${ctx.applications.length} application${ctx.applications.length === 1 ? "" : "s"} in motion` : "After B1", state: ctx.applications.some((a) => a.status === "offer") ? "done" : jobsOpen ? "current" : "locked", icon: ChatCircleText, eta: jobsOpen ? "≈1–2 months" : undefined },
    { label: "Visa & flight", detail: "Embassy paperwork + travel", state: "locked", icon: ShieldCheck, eta: "≈3 months after offer" },
    { label: "First day in Germany", detail: "Skillcase supports your first 30 days", state: "locked", icon: Briefcase, eta: "≈12–14 months total" },
  ] as const;
}
