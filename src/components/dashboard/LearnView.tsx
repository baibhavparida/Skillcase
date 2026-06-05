import React from "react";
import {
  ArrowRightIcon as ArrowRight,
  CalendarCheckIcon as CalendarCheck,
  CheckIcon as Check,
  GraduationCapIcon as GraduationCap,
  PhoneCallIcon as PhoneCall,
  WhatsappLogoIcon as WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import { getUpcomingClasses, formatClassDate, type ClassSession } from "../../data/classSchedule";
import type { DashboardContext } from "./shared";

export function LearnView(ctx: DashboardContext) {
  const sessions = getUpcomingClasses(ctx.profile.germanLevel, new Date(), 5);
  const milestones = getLanguageMilestones(ctx.level.rank);

  return (
    <div className="sc-dash-tab-space">
      <section className="sc-dash-learn-hero">
        <div className="sc-dash-learn-copy">
          <p className="sc-dash-eyebrow"><GraduationCap size={11} weight="bold" /> German plan</p>
          <h2>{learnTitle(ctx.cohort.learnEmphasis)}</h2>
          <p>{learnCopy(ctx.cohort.learnEmphasis)}</p>
          <div className="sc-dash-learn-actions">
            <a className="sc-dash-btn sc-dash-btn-gold" href={`tel:${ctx.coach.phone}`}>
              <PhoneCall size={14} weight="bold" />
              {learnCta(ctx.cohort.learnEmphasis)}
            </a>
            <a className="sc-dash-btn sc-dash-btn-ghost" href={`https://wa.me/${ctx.coach.whatsApp}`} target="_blank" rel="noreferrer">
              <WhatsappLogo size={15} weight="bold" />
              Message {ctx.coach.name.split(" ")[0]}
            </a>
          </div>
        </div>
        <div className="sc-dash-learn-visual" aria-hidden="true">
          <img src="/assets/images/webinar-nurses.webp" alt="" />
          <span className="sc-dash-learn-chip is-tl">{durationHint(ctx.cohort.learnEmphasis)}</span>
          <span className="sc-dash-learn-chip is-br">{contextHint(ctx.cohort.learnEmphasis)}</span>
        </div>
      </section>

      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow">Milestones</p>
            <h2>Your German path</h2>
          </div>
          <span className="sc-dash-level-pill">{ctx.level.label}</span>
        </div>
        <div className="sc-dash-lang-path">
          {milestones.map((m) => (
            <div key={m.label} className={`sc-dash-lang-step is-${m.state}`}>
              <span className="sc-dash-lang-dot">
                {m.state === "complete" ? <Check size={11} weight="bold" /> : null}
              </span>
              <strong>{m.label}</strong>
              <small>{m.helper}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><CalendarCheck size={11} weight="bold" /> Upcoming classes</p>
            <h2>{sessions.length === 0 ? "Talk to your coach to join a batch" : `${sessions.length} sessions this week`}</h2>
          </div>
        </div>
        {sessions.length === 0 ? (
          <p className="sc-dash-empty-copy">No live classes scheduled for your current level. Your coach will assign you to a batch within 24 hours.</p>
        ) : (
          <div className="sc-dash-class-list">
            {sessions.map((s) => <ClassRow key={s.id} session={s} />)}
          </div>
        )}
      </section>

      <section className="sc-dash-coach-band">
        <img alt="" src={ctx.coach.photo} />
        <div>
          <p className="sc-dash-eyebrow">Your German coach</p>
          <h3>{ctx.coach.name}</h3>
          <p>{ctx.coach.sampleMessage}</p>
          <div className="sc-dash-coach-meta">
            <span>{ctx.coach.languages.join(" · ")}</span>
            <span>Replies in {formatSla(ctx.coach.responseSlaMin)}</span>
          </div>
        </div>
        <div className="sc-dash-coach-actions">
          <a className="sc-dash-btn sc-dash-btn-navy" href={`https://wa.me/${ctx.coach.whatsApp}`} target="_blank" rel="noreferrer">
            <WhatsappLogo size={15} weight="bold" />
            WhatsApp {ctx.coach.name.split(" ")[0]}
          </a>
          <a className="sc-dash-btn sc-dash-btn-ghost" href={`tel:${ctx.coach.phone}`}>
            <PhoneCall size={14} weight="bold" />
            Call
          </a>
        </div>
      </section>
    </div>
  );
}

function ClassRow({ session }: { session: ClassSession }) {
  const when = formatClassDate(session.startsAt);
  return (
    <a className="sc-dash-class-row" href={session.zoomLink} target="_blank" rel="noreferrer">
      <div className="sc-dash-class-when">
        <strong>{when.relative}</strong>
        <small>{when.absolute}</small>
      </div>
      <div className="sc-dash-class-meta">
        <h3>{session.title}</h3>
        <p>
          <img alt="" src={session.teacherPhoto} /> {session.teacher} · {session.durationMin} min · {session.batch}
        </p>
      </div>
      <span className="sc-dash-class-go" aria-hidden="true">
        <ArrowRight size={14} weight="bold" />
      </span>
    </a>
  );
}

function getLanguageMilestones(rank: number) {
  return [
    { label: "Start", helper: rank === 0 ? "You're here" : "Done", state: rank === 0 ? "current" : "complete" },
    { label: "A1", helper: rank >= 1 ? "Done" : rank === 0 ? "Next" : "Locked", state: rank >= 1 ? "complete" : rank === 0 ? "current" : "locked" },
    { label: "A2", helper: rank >= 2 ? "Done" : rank === 1 ? "Next" : "Locked", state: rank >= 2 ? "complete" : rank === 1 ? "current" : "locked" },
    { label: "B1", helper: rank >= 4 ? "Done" : rank >= 2 ? "Current" : "Locked", state: rank >= 4 ? "complete" : rank >= 2 ? "current" : "locked" },
    { label: "B2", helper: rank === 6 ? "Done" : rank === 5 ? "Current" : "Optional", state: rank === 6 ? "complete" : rank === 5 ? "current" : "locked" },
  ] as const;
}

function learnTitle(emphasis: string): string {
  if (emphasis === "demo") return "Start German with a free demo class";
  if (emphasis === "weekly") return "Keep your weekly rhythm";
  if (emphasis === "b1_prep") return "Focused B1 preparation";
  if (emphasis === "interview") return "Move from language-ready to employer-ready";
  return "Specialty conversations and leadership vocabulary";
}

function learnCopy(emphasis: string): string {
  if (emphasis === "demo") return "Nurse-friendly plan from A1 to B1. Live online classes taught by Indian-origin German teachers.";
  if (emphasis === "weekly") return "Two live classes per week, daily 5-minute WhatsApp drills, and one mock speaking session every Friday.";
  if (emphasis === "b1_prep") return "Listening, speaking, reading, writing. Mock papers each Saturday. Your coach builds you a personal weak-area plan.";
  if (emphasis === "interview") return "Practice German hospital interviews, recruiter calls, and your patient handover monologue.";
  return "Specialty modules: ICU vocabulary, OR teamwork phrases, paediatric care. Leadership conversation practice.";
}

function learnCta(emphasis: string): string {
  if (emphasis === "demo") return "Book free class";
  if (emphasis === "weekly") return "View this week's classes";
  if (emphasis === "b1_prep") return "Book a coach review";
  if (emphasis === "interview") return "Book mock interview";
  return "Talk to specialty coach";
}

function durationHint(emphasis: string): string {
  if (emphasis === "demo") return "30 min demo";
  if (emphasis === "interview") return "30 min mock";
  return "75 min live class";
}

function contextHint(emphasis: string): string {
  if (emphasis === "interview") return "German recruiter style";
  if (emphasis === "specialty") return "Specialty modules";
  return "Hospital vocabulary";
}

function formatSla(min: number): string {
  if (min < 60) return `${min} min`;
  return `~${Math.round(min / 60)} hr`;
}
