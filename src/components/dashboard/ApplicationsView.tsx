import React, { useState } from "react";
import {
  BriefcaseIcon as Briefcase,
  CalendarCheckIcon as CalendarCheck,
  CheckIcon as Check,
  ChatCircleTextIcon as ChatCircleText,
  ClockIcon as Clock,
  EnvelopeSimpleIcon as Envelope,
  HandshakeIcon as Handshake,
  StethoscopeIcon as Stethoscope,
  TrayArrowDownIcon as TrayArrowDown,
  WhatsappLogoIcon as WhatsappLogo,
  XCircleIcon as XCircle,
} from "@phosphor-icons/react/ssr";
import { addApplicationEvent } from "../../data/dashboardStorage";
import type { ApplicationStatus } from "../../data/dashboardTypes";
import { APPLICATION_STATUS_LABEL, APPLICATION_STATUS_TONE, GermanFlag, type DashboardContext } from "./shared";

const JOB_DETAILS: Record<string, { title: string; org: string; city: string; salary: string }> = {
  "hamburg-rn": { title: "Registered Nurse", org: "Hamburg Care Network", city: "Hamburg", salary: "€3.3k–€3.7k" },
  "aachen-nurse": { title: "Clinical Nurse", org: "Aachen City Hospital", city: "Aachen", salary: "€3.2k–€3.6k" },
  "berlin-care": { title: "Senior Care Nurse", org: "Berlin Elder Care Group", city: "Berlin", salary: "€3.0k–€3.45k" },
  "munich-icu": { title: "ICU Nurse", org: "Munich University Klinikum", city: "Munich", salary: "€3.9k–€4.4k" },
  "frankfurt-or": { title: "OR Specialist Nurse", org: "Frankfurt Cardio Centre", city: "Frankfurt", salary: "€4.0k–€4.6k" },
};

const PIPELINE: ApplicationStatus[] = ["submitted", "reviewing", "interview_scheduled", "offer"];

const STATUS_ICON: Record<ApplicationStatus, React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" }>> = {
  submitted: TrayArrowDown,
  reviewing: Clock,
  interview_scheduled: CalendarCheck,
  offer: Handshake,
  rejected: XCircle,
  withdrawn: XCircle,
};

export function ApplicationsView(ctx: DashboardContext) {
  const [tick, setTick] = useState(0);
  void tick;
  const refresh = () => setTick((t) => t + 1);

  if (ctx.applications.length === 0) {
    return (
      <div className="sc-dash-tab-space">
        <section className="sc-dash-card-flat sc-dash-empty">
          <div className="sc-dash-empty-icon"><Briefcase size={24} weight="bold" /></div>
          <h2>No applications yet</h2>
          <p>When you apply with your Skillcase profile, the recruiter pipeline appears here. We coordinate every step with the hospital HR team.</p>
          <button className="sc-dash-btn sc-dash-btn-gold" type="button" onClick={() => ctx.setActiveTab("jobs")}>
            Browse matched jobs
          </button>
        </section>

        <section className="sc-dash-card-flat">
          <div className="sc-dash-section-head">
            <div>
              <p className="sc-dash-eyebrow">How applications work</p>
              <h2>What to expect after you submit</h2>
            </div>
          </div>
          <ol className="sc-dash-app-walkthrough">
            <li><span><TrayArrowDown size={14} weight="bold" /></span><strong>Submitted</strong><small>Your profile reaches the recruiter same day.</small></li>
            <li><span><Clock size={14} weight="bold" /></span><strong>Reviewing</strong><small>Recruiter reviews and signals interest in 3–5 days.</small></li>
            <li><span><CalendarCheck size={14} weight="bold" /></span><strong>Interview</strong><small>30-minute video interview, German + English. Skillcase preps you.</small></li>
            <li><span><Handshake size={14} weight="bold" /></span><strong>Offer</strong><small>Contract signed. Visa starts within a week.</small></li>
          </ol>
        </section>
      </div>
    );
  }

  return (
    <div className="sc-dash-tab-space">
      <section className="sc-dash-jobs-hero">
        <div>
          <p className="sc-dash-eyebrow"><Briefcase size={11} weight="bold" /> Applications</p>
          <h2>{ctx.applications.length} {ctx.applications.length === 1 ? "application" : "applications"} in motion</h2>
          <p>Skillcase coordinates with every recruiter. You'll be notified on WhatsApp before any next step.</p>
        </div>
        <div className="sc-dash-jobs-stats">
          <span><strong>{ctx.applications.filter((a) => a.status === "interview_scheduled").length}</strong><small>interviews</small></span>
          <span><strong>{ctx.applications.filter((a) => a.status === "offer").length}</strong><small>offers</small></span>
          <span><strong>{ctx.applications.filter((a) => a.status === "rejected" || a.status === "withdrawn").length}</strong><small>closed</small></span>
        </div>
      </section>

      <div className="sc-dash-app-list">
        {ctx.applications.map((app) => {
          const job = JOB_DETAILS[app.jobId] ?? { title: app.jobId, org: "Unknown employer", city: "TBD", salary: "TBD" };
          const stepIndex = PIPELINE.indexOf(app.status);
          const isClosed = app.status === "rejected" || app.status === "withdrawn";

          return (
            <article key={app.jobId} className={`sc-dash-app-card is-${APPLICATION_STATUS_TONE[app.status]}`}>
              <div className="sc-dash-app-card-head">
                <div className="sc-dash-app-card-job">
                  <span className="sc-dash-job-icon"><Stethoscope size={18} weight="bold" /></span>
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.org} · <GermanFlag size={11} /> {job.city} · {job.salary}/mo</p>
                  </div>
                </div>
                <span className="sc-dash-app-status-pill">
                  {APPLICATION_STATUS_LABEL[app.status]}
                </span>
              </div>

              {!isClosed ? (
                <ol className="sc-dash-app-pipeline">
                  {PIPELINE.map((step, i) => {
                    const StatusIcon = STATUS_ICON[step];
                    const isDone = i < stepIndex;
                    const isCurrent = i === stepIndex;
                    return (
                      <li key={step} className={isDone ? "is-done" : isCurrent ? "is-current" : "is-locked"}>
                        <span><StatusIcon size={12} weight="bold" /></span>
                        <strong>{APPLICATION_STATUS_LABEL[step]}</strong>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="sc-dash-app-closed">This application is closed. Keep applying to other matched roles.</p>
              )}

              {app.events.length > 0 && (
                <details className="sc-dash-app-timeline">
                  <summary>Timeline · {app.events.length} {app.events.length === 1 ? "event" : "events"}</summary>
                  <ul>
                    {app.events.map((event, i) => (
                      <li key={i}>
                        <span>{formatEventDate(event.at)}</span>
                        <strong>{event.label}</strong>
                        {event.note && <small>{event.note}</small>}
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="sc-dash-app-actions">
                <a className="sc-dash-btn sc-dash-btn-ghost sc-dash-btn-sm" href={`https://wa.me/${ctx.coach.whatsApp}`} target="_blank" rel="noreferrer">
                  <WhatsappLogo size={13} weight="bold" />
                  Ask coach
                </a>
                {app.status === "interview_scheduled" && (
                  <button type="button" className="sc-dash-btn sc-dash-btn-navy sc-dash-btn-sm" onClick={() => { addApplicationEvent(app.jobId, "offer", "Interview cleared"); refresh(); }}>
                    <Check size={13} weight="bold" />
                    Mark interview cleared
                  </button>
                )}
                {app.status === "submitted" && (
                  <button type="button" className="sc-dash-btn sc-dash-btn-ghost sc-dash-btn-sm" onClick={() => { addApplicationEvent(app.jobId, "withdrawn", "Withdrew application"); refresh(); }}>
                    Withdraw
                  </button>
                )}
                <a className="sc-dash-btn sc-dash-btn-ghost sc-dash-btn-sm" href="mailto:placement@skillcase.in">
                  <Envelope size={13} weight="bold" />
                  Email
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <section className="sc-dash-coach-band">
        <img alt="" src={ctx.coach.photo} />
        <div>
          <p className="sc-dash-eyebrow">Placement coach</p>
          <h3>{ctx.coach.name}</h3>
          <p>{ctx.coach.sampleMessage}</p>
        </div>
        <div className="sc-dash-coach-actions">
          <a className="sc-dash-btn sc-dash-btn-navy" href={`https://wa.me/${ctx.coach.whatsApp}`} target="_blank" rel="noreferrer">
            <ChatCircleText size={15} weight="bold" />
            Chat about applications
          </a>
        </div>
      </section>
    </div>
  );
}

function formatEventDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
