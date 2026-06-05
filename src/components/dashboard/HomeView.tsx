import React from "react";
import {
  ArrowRightIcon as ArrowRight,
  BriefcaseIcon as Briefcase,
  CalendarCheckIcon as CalendarCheck,
  CaretRightIcon as CaretRight,
  ChatCircleTextIcon as ChatCircleText,
  CheckIcon as Check,
  ConfettiIcon as Confetti,
  DeviceMobileIcon as DeviceMobile,
  FireIcon as Fire,
  GraduationCapIcon as GraduationCap,
  LockKeyIcon as LockKey,
  MedalIcon as Medal,
  PhoneCallIcon as PhoneCall,
  SealCheckIcon as SealCheck,
  UserCircleIcon as UserCircle,
  ShieldCheckIcon as ShieldCheck,
  SparkleIcon as Sparkle,
  StethoscopeIcon as Stethoscope,
  TranslateIcon as Translate,
  UsersThreeIcon as UsersThree,
  VideoCameraIcon as VideoCamera,
  WhatsappLogoIcon as WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import type { HomeBlockKey, GermanLevel } from "../../data/dashboardTypes";
import { CITIES } from "../../data/cities";
import { getUpcomingClasses, formatClassDate, type ClassSession } from "../../data/classSchedule";
import { DOCUMENT_CATALOG } from "../../data/documents";
import { TaskList, GermanFlag, QUICK_WIN_ICONS, type DashboardContext } from "./shared";

const JOBS_PREVIEW = [
  { id: "hamburg-rn", title: "Registered Nurse", org: "Hamburg Care Network", city: "Hamburg", citySlug: "hamburg", salary: "€3.3k–€3.7k", required: "b1_completed" as GermanLevel, type: "Hospital" },
  { id: "aachen-nurse", title: "Clinical Nurse", org: "Aachen City Hospital", city: "Aachen", citySlug: "aachen", salary: "€3.2k–€3.6k", required: "b1_completed" as GermanLevel, type: "Hospital" },
  { id: "berlin-care", title: "Senior Care Nurse", org: "Berlin Elder Care", city: "Berlin", citySlug: "berlin", salary: "€3.0k–€3.45k", required: "b1_completed" as GermanLevel, type: "Senior care" },
];

export function HomeView(ctx: DashboardContext) {
  const renderers: Record<HomeBlockKey, () => React.ReactNode> = {
    this_week: () => <ThisWeek ctx={ctx} />,
    today_focus: () => <TodayFocus ctx={ctx} />,
    progress_pathway: () => <ProgressPathway ctx={ctx} />,
    quick_wins: () => <QuickWinsGrid ctx={ctx} />,
    documents_status: () => <DocumentsStatus ctx={ctx} />,
    applications_status: () => <ApplicationsStatus ctx={ctx} />,
    matched_jobs: () => <MatchedJobsRow ctx={ctx} />,
    story_class: () => <StoryClassPair ctx={ctx} />,
    salary_calc: () => <SalaryCalc ctx={ctx} />,
    checklist: () => <ChecklistBlock ctx={ctx} />,
    batch_streak: () => <BatchStreakTile ctx={ctx} />,
    why_germany: () => <WhyGermany ctx={ctx} />,
    exam_plan: () => <ExamPlanCard ctx={ctx} />,
    family: () => <FamilyPlanning ctx={ctx} />,
    premium_track: () => <PremiumTrack ctx={ctx} />,
    free_webinar: () => <FreeWebinar ctx={ctx} />,
    quad_actions: () => <ActionQuad ctx={ctx} />,
    testimonials_marquee: () => <TestimonialsMarquee />,
    guided_free_app: () => <GuidedFreeApp ctx={ctx} />,
    join_course: () => <JoinCourse ctx={ctx} />,
    interview_practice: () => <InterviewPractice ctx={ctx} />,
    profile_docs: () => <ProfileDocs ctx={ctx} />,
    guidance: () => <Guidance ctx={ctx} />,
  };

  return (
    <div className="sc-dash-tab-space">
      {ctx.cohort.homeBlocks.map((key) => (
        <div className="sc-dash-block" data-block={key} key={key}>
          {renderers[key]()}
        </div>
      ))}
    </div>
  );
}

/* ---------- Blocks ---------- */

function ThisWeek({ ctx }: { ctx: DashboardContext }) {
  const sessions = getUpcomingClasses(ctx.profile.germanLevel, new Date(), 3);
  if (sessions.length === 0) return null;
  return (
    <section className="sc-dash-this-week">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><CalendarCheck size={11} weight="bold" /> This week</p>
          <h2>Your next {sessions.length === 1 ? "class" : "classes"}</h2>
        </div>
        <button type="button" className="sc-dash-text-link" onClick={() => ctx.setActiveTab("learn")}>
          See schedule <CaretRight size={13} weight="bold" />
        </button>
      </div>
      <div className="sc-dash-this-week-list">
        {sessions.map((s, i) => <ClassRow key={s.id} session={s} highlight={i === 0} />)}
      </div>
    </section>
  );
}

function ClassRow({ session, highlight }: { session: ClassSession; highlight: boolean }) {
  const when = formatClassDate(session.startsAt);
  return (
    <a
      className={`sc-dash-class-row ${highlight ? "is-next" : ""}`}
      href={session.zoomLink}
      target="_blank"
      rel="noreferrer"
    >
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

function TodayFocus({ ctx }: { ctx: DashboardContext }) {
  const { cohort } = ctx;
  const t = cohort.todayFocus;
  return (
    <section className={`sc-dash-today sc-dash-today-${t.tone}`}>
      <div className="sc-dash-today-inner">
        <div className="sc-dash-today-head">
          <span className="sc-dash-today-meta">
            {t.meta.split("·").map((m, i) => (
              <span key={i} className="sc-dash-today-chip">{m.trim()}</span>
            ))}
          </span>
        </div>
        <h2>{t.title}</h2>
        <p>{t.copy}</p>
        <div className="sc-dash-today-actions">
          <button className="sc-dash-btn sc-dash-btn-gold" type="button" onClick={() => ctx.setActiveTab(t.ctaTab)}>
            {t.cta}
            <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      </div>
      <div className="sc-dash-today-media" aria-hidden="true">
        <img alt="" src="/assets/images/webinar-nurses.webp" />
      </div>
    </section>
  );
}

function ProgressPathway({ ctx }: { ctx: DashboardContext }) {
  const rank = ctx.level.rank;
  // The journey mirrors the three user types: getting started, learning German
  // (A1–A2), and job-ready (B1–B2), heading to a German nursing job.
  const steps = [
    { label: "Start", icon: Sparkle, helper: rank > 0 ? "Done" : "You're here", state: rank > 0 ? "complete" : "current" },
    { label: "A1–A2", icon: GraduationCap, helper: rank >= 3 ? "Done" : rank >= 1 ? ctx.level.shortLabel : "Next", state: rank >= 3 ? "complete" : rank >= 1 ? "current" : "locked" },
    { label: "B1–B2", icon: Medal, helper: rank >= 6 ? "Done" : rank >= 3 ? ctx.level.shortLabel : "Goal", state: rank >= 6 ? "complete" : rank >= 3 ? "current" : "locked" },
    { label: "Jobs", icon: Briefcase, helper: ctx.canApply ? "Open" : "After B1", state: ctx.canApply ? "current" : "locked" },
  ] as const;

  return (
    <section className="sc-dash-progress-card sc-dash-pathway-top">
      <div className="sc-dash-pathway" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((s) => {
          const StepIcon = s.icon;
          return (
          <div key={s.label} className={`sc-dash-pathway-step is-${s.state}`}>
            <span className="sc-dash-pathway-dot">
              {s.state === "complete" ? <Check size={13} weight="bold" /> : <StepIcon size={14} weight={s.state === "current" ? "fill" : "bold"} />}
            </span>
            <strong>{s.label}</strong>
            <small>{s.helper}</small>
          </div>
          );
        })}
      </div>
    </section>
  );
}

function QuickWinsGrid({ ctx }: { ctx: DashboardContext }) {
  return (
    <section className="sc-dash-quick-grid" aria-label="Quick actions">
      {ctx.cohort.quickWins.map((qw, i) => {
        const Icon = QUICK_WIN_ICONS[qw.iconKey];
        const featured = i === 0;
        const onClick = () => {
          if (qw.action.kind === "tab") ctx.setActiveTab(qw.action.tab);
          else window.open(qw.action.url, qw.action.external ? "_blank" : "_self");
        };
        return (
          <button key={qw.label} className={`sc-dash-quick ${featured ? "is-featured" : ""}`} type="button" onClick={onClick}>
            <span className="sc-dash-quick-icon"><Icon size={18} weight="bold" /></span>
            <strong>{qw.label}</strong>
            <small>{qw.detail}</small>
          </button>
        );
      })}
    </section>
  );
}

function DocumentsStatus({ ctx }: { ctx: DashboardContext }) {
  const visible = DOCUMENT_CATALOG.filter((d) => ctx.level.rank >= d.unlocksAtRank);
  const approved = visible.filter((d) => ctx.documents[d.id]?.state === "verified").length;
  const inReview = visible.filter((d) => ctx.documents[d.id]?.state === "under_review").length;
  const uploaded = visible.filter((d) => ctx.documents[d.id]?.state === "uploaded").length;
  const missing = visible.length - approved - inReview - uploaded;

  return (
    <section className="sc-dash-card-flat">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><SealCheck size={11} weight="bold" /> Documents</p>
          <h2>{ctx.documentReadiness}% ready · {approved} of {visible.length} verified</h2>
        </div>
        <button type="button" className="sc-dash-text-link" onClick={() => ctx.setActiveTab("documents")}>
          Open <CaretRight size={13} weight="bold" />
        </button>
      </div>
      <div className="sc-dash-doc-summary">
        <div className="sc-dash-doc-bar">
          <span style={{ width: `${visible.length ? (approved / visible.length) * 100 : 0}%` }} className="is-approved" />
          <span style={{ width: `${visible.length ? (inReview / visible.length) * 100 : 0}%` }} className="is-review" />
          <span style={{ width: `${visible.length ? (uploaded / visible.length) * 100 : 0}%` }} className="is-uploaded" />
        </div>
        <ul>
          <li><i className="is-approved" /> {approved} verified</li>
          <li><i className="is-review" /> {inReview} under review</li>
          <li><i className="is-uploaded" /> {uploaded} uploaded</li>
          <li><i className="is-missing" /> {missing} missing</li>
        </ul>
      </div>
    </section>
  );
}

function ApplicationsStatus({ ctx }: { ctx: DashboardContext }) {
  if (ctx.applications.length === 0) {
    return (
      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><Briefcase size={11} weight="bold" /> Applications</p>
            <h2>You haven't applied yet</h2>
          </div>
          <button type="button" className="sc-dash-text-link" onClick={() => ctx.setActiveTab("jobs")}>
            Browse jobs <CaretRight size={13} weight="bold" />
          </button>
        </div>
        <p className="sc-dash-empty-copy">When you apply to a hospital, the status shows up here: Submitted → Reviewing → Interview → Offer. Skillcase coordinates with the recruiter.</p>
      </section>
    );
  }
  return (
    <section className="sc-dash-card-flat">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><Briefcase size={11} weight="bold" /> Applications</p>
          <h2>{ctx.applications.length} in motion</h2>
        </div>
        <button type="button" className="sc-dash-text-link" onClick={() => ctx.setActiveTab("applications")}>
          Open tracker <CaretRight size={13} weight="bold" />
        </button>
      </div>
      <div className="sc-dash-app-mini-list">
        {ctx.applications.slice(0, 3).map((a) => {
          const job = JOBS_PREVIEW.find((j) => j.id === a.jobId);
          return (
            <div key={a.jobId} className="sc-dash-app-mini">
              <span className={`sc-dash-app-dot is-${a.status}`} />
              <strong>{job?.title ?? a.jobId}</strong>
              <small>{job?.org}</small>
              <em>{a.status.replace(/_/g, " ")}</em>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MatchedJobsRow({ ctx }: { ctx: DashboardContext }) {
  const heading = ctx.canApply
    ? "Apply to your matched roles"
    : ctx.level.rank >= 2
      ? "Roles waiting at B1"
      : "Where you're heading";
  return (
    <section className="sc-dash-card-flat">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><Briefcase size={11} weight="bold" /> {ctx.canApply ? "Matched jobs" : "Preview"}</p>
          <h2>{heading}</h2>
        </div>
        <button type="button" className="sc-dash-text-link" onClick={() => ctx.setActiveTab("jobs")}>
          View all <CaretRight size={13} weight="bold" />
        </button>
      </div>
      <div className="sc-dash-matched-row">
        {JOBS_PREVIEW.map((job) => {
          const city = CITIES.find((c) => c.slug === job.citySlug);
          return (
            <article key={job.id} className="sc-dash-matched-card">
              <div className="sc-dash-matched-top">
                <span className="sc-dash-job-loc"><GermanFlag size={12} /> {job.city}</span>
                {ctx.canApply ? <span className="sc-dash-job-state is-open">Open</span> : <span className="sc-dash-job-state is-locked"><LockKey size={10} weight="bold" /> B1</span>}
              </div>
              <h3>{job.title}</h3>
              <p>{job.org}</p>
              <dl className="sc-dash-matched-facts">
                <div><dt>Pay</dt><dd>{job.salary}/mo</dd></div>
                <div><dt>City</dt><dd>{city ? `${city.indianCommunity.toLowerCase()} Indian community` : job.city}</dd></div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function StoryClassPair({ ctx }: { ctx: DashboardContext }) {
  return (
    <section className="sc-dash-pair">
      <article className="sc-dash-story">
        <img alt="" src="/assets/images/testimonial-anjali.webp" />
        <div>
          <p className="sc-dash-eyebrow"><Confetti size={11} weight="bold" /> From the community</p>
          <h3>Anjana started at A1. Today she works in Aachen.</h3>
          <p>€3,100/mo, BSc Nursing, finished her batch in 11 months. WhatsApp coach throughout.</p>
        </div>
      </article>
      <article className="sc-dash-class">
        <div className="sc-dash-class-media" aria-hidden="true">
          <img alt="" src="/assets/images/webinar-nurses.webp" />
          <span className="sc-dash-class-badge"><CalendarCheck size={12} weight="bold" /> Today 7 PM IST</span>
        </div>
        <p className="sc-dash-eyebrow">Recommended class</p>
        <h3>Free demo class for nurses</h3>
        <p>30 minute, beginner-friendly: greetings, hospital vocab, and how the B1 path works.</p>
        <button type="button" className="sc-dash-btn sc-dash-btn-navy" onClick={() => ctx.setActiveTab("learn")}>
          Book a seat
        </button>
      </article>
    </section>
  );
}

function SalaryCalc({ ctx }: { ctx: DashboardContext }) {
  const monthlyEur = ctx.level.rank >= 5 ? 4100 : ctx.level.rank >= 4 ? 3500 : 3300;
  const inrPerMonth = Math.round((monthlyEur * 92) / 1000);
  const fiveYearLakhs = Math.round((monthlyEur * 92 * 60) / 100000);
  return (
    <section className="sc-dash-card-flat sc-dash-salary">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><Sparkle size={11} weight="bold" /> Why this matters</p>
          <h2>Your projected German salary at {ctx.level.shortLabel}</h2>
        </div>
      </div>
      <div className="sc-dash-salary-grid">
        <div>
          <strong>€{monthlyEur.toLocaleString()}</strong>
          <small>monthly gross in Germany</small>
        </div>
        <div>
          <strong>₹{inrPerMonth}k</strong>
          <small>roughly per month in INR</small>
        </div>
        <div>
          <strong>₹{fiveYearLakhs} lakh</strong>
          <small>5-year cumulative earnings</small>
        </div>
      </div>
      <p className="sc-dash-salary-note">Average Indian RN earns ₹35k–₹60k/mo. Germany also gives 30 paid leave days, free healthcare, and pension contributions.</p>
    </section>
  );
}

function ChecklistBlock({ ctx }: { ctx: DashboardContext }) {
  return (
    <section className="sc-dash-card-flat">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow">Readiness</p>
          <h2>What Skillcase is tracking</h2>
        </div>
        <button type="button" className="sc-dash-text-link" onClick={() => ctx.setActiveTab("progress")}>
          See all <CaretRight size={13} weight="bold" />
        </button>
      </div>
      <TaskList tasks={ctx.readinessTasks} onSelect={ctx.setActiveTab} />
    </section>
  );
}

function BatchStreakTile({ ctx }: { ctx: DashboardContext }) {
  const batch = "Batch 24-Mumbai";
  const cohortSize = 18;
  return (
    <section className="sc-dash-card-flat sc-dash-batch">
      <div className="sc-dash-batch-row">
        <div className="sc-dash-batch-streak">
          <span className="sc-dash-batch-streak-icon"><Fire size={18} weight="fill" /></span>
          <div>
            <strong>{ctx.streak.daysActive || 1} day streak</strong>
            <small>Open today's drill to keep it</small>
          </div>
        </div>
        <div className="sc-dash-batch-info">
          <span className="sc-dash-batch-icon"><UsersThree size={18} weight="bold" /></span>
          <div>
            <strong>{batch}</strong>
            <small>{cohortSize} nurses · 7 already at B1</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyGermany({ ctx: _ctx }: { ctx: DashboardContext }) {
  const reasons = [
    { icon: <Sparkle size={16} weight="bold" />, headline: "€3.3k+ monthly", detail: "Roughly 4× Indian RN salary, with pension + 30 paid leave days." },
    { icon: <ShieldCheck size={16} weight="bold" />, headline: "PR in 3 years", detail: "Permanent residency window opens after 33 months of skilled work." },
    { icon: <UsersThree size={16} weight="bold" />, headline: "Family relocates", detail: "Spouse work visa and free German public schools for children." },
    { icon: <Stethoscope size={16} weight="bold" />, headline: "Real recognition", detail: "GNM and BSc both eligible. Anerkennung handled by your coach." },
  ];
  return (
    <section className="sc-dash-card-flat sc-dash-why">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><GermanFlag size={11} /> Why Germany, why now</p>
          <h2>What you're actually working toward</h2>
        </div>
      </div>
      <div className="sc-dash-why-grid">
        {reasons.map((r) => (
          <div key={r.headline} className="sc-dash-why-item">
            <span className="sc-dash-why-icon">{r.icon}</span>
            <strong>{r.headline}</strong>
            <small>{r.detail}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExamPlanCard({ ctx }: { ctx: DashboardContext }) {
  return (
    <section className="sc-dash-card-flat sc-dash-exam">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><GraduationCap size={11} weight="bold" /> B1 exam plan</p>
          <h2>Pick a date with your coach</h2>
        </div>
        <a className="sc-dash-text-link" href={`https://wa.me/${ctx.coach.whatsApp}`} target="_blank" rel="noreferrer">
          Ask coach <CaretRight size={13} weight="bold" />
        </a>
      </div>
      <dl className="sc-dash-exam-grid">
        <div><dt>Recommended</dt><dd>telc B1 Pflege · Bengaluru centre</dd></div>
        <div><dt>Next slot</dt><dd>Approx. 4 weeks out</dd></div>
        <div><dt>Fee</dt><dd>₹14,500 · Skillcase reimburses on pass</dd></div>
      </dl>
      <p className="sc-dash-exam-note">Coach Anu books your slot. We pair you with a peer to practice the speaking part for the two weeks before.</p>
    </section>
  );
}

function FamilyPlanning({ ctx }: { ctx: DashboardContext }) {
  return (
    <section className="sc-dash-card-flat sc-dash-family">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><UsersThree size={11} weight="bold" /> Family</p>
          <h2>Spouse and children relocate with you</h2>
        </div>
        <button type="button" className="sc-dash-text-link" onClick={() => ctx.setActiveTab("profile")}>
          Add details <CaretRight size={13} weight="bold" />
        </button>
      </div>
      <ul className="sc-dash-family-list">
        <li><Check size={12} weight="bold" /> Spouse work permit issued alongside your visa</li>
        <li><Check size={12} weight="bold" /> Children attend free German public schools</li>
        <li><Check size={12} weight="bold" /> Health insurance covers your dependants too</li>
        <li><Check size={12} weight="bold" /> Coach handles family Schengen + relocation</li>
      </ul>
    </section>
  );
}

function PremiumTrack({ ctx }: { ctx: DashboardContext }) {
  return (
    <section className="sc-dash-card-flat sc-dash-premium">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><Sparkle size={11} weight="fill" /> Premium track</p>
          <h2>B2 opens specialty roles and €400+/mo uplift</h2>
        </div>
        <button type="button" className="sc-dash-text-link" onClick={() => ctx.setActiveTab("jobs")}>
          See premium <CaretRight size={13} weight="bold" />
        </button>
      </div>
      <div className="sc-dash-premium-grid">
        <div><strong>€4,100</strong><small>monthly at B2</small></div>
        <div><strong>+€480</strong><small>vs B1 nurse</small></div>
        <div><strong>ICU / OR</strong><small>specialty access</small></div>
      </div>
    </section>
  );
}

/* ---------- Intent-bucket blocks (freemium ladder + job-readiness) ---------- */

// TODO: replace with the real app-store link once published. For now the coach
// shares the app via WhatsApp, which matches the WhatsApp-first support model.
const APP_DOWNLOAD_URL = "https://wa.me/919731462667";
const COACH_WHATSAPP = "919731462667";

function ActionQuad({ ctx }: { ctx: DashboardContext }) {
  const items = [
    { title: "Practice your German", sub: "Daily 5-minute drills", tag: "Free", icon: Translate, img: "/assets/images/card-practice-german.jpg", onClick: () => window.open(APP_DOWNLOAD_URL, "_blank") },
    { title: "Free mock interview", sub: "Rehearse with a coach", tag: "Free", icon: VideoCamera, img: "/assets/images/card-mock-interview.jpg", onClick: () => ctx.setActiveTab("learn") },
    { title: "Free guided German", sub: "Learn on the app", tag: "Free", icon: DeviceMobile, img: "/assets/images/app-guided-german.jpg", onClick: () => window.open(APP_DOWNLOAD_URL, "_blank") },
    { title: "Structured German course", sub: "Live classes, A1 to B1", tag: "Paid", icon: GraduationCap, img: "/assets/images/card-structured-course.jpg", onClick: () => ctx.setActiveTab("learn") },
  ] as const;
  return (
    <section className="sc-dash-quad" aria-label="Ways to learn and practice">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <button key={it.title} type="button" className="sc-dash-quad-card" onClick={it.onClick}>
            <span className="sc-dash-quad-media" aria-hidden="true" style={{ backgroundImage: `url(${it.img})` }} />
            <span className="sc-dash-quad-icon"><Icon size={19} weight="bold" /></span>
            <span className={`sc-dash-quad-tag ${it.tag === "Paid" ? "is-paid" : "is-free"}`}>{it.tag}</span>
            <strong>{it.title}</strong>
            <small>{it.sub}</small>
            <span className="sc-dash-quad-go" aria-hidden="true"><ArrowRight size={13} weight="bold" /></span>
          </button>
        );
      })}
    </section>
  );
}

const TESTIMONIALS = [
  { name: "Anjali", role: "Nurse, Aachen", photo: "/assets/images/testimonial-anjali.webp", quote: "I started at A1 in Kochi. Eleven months later I was working in a German hospital." },
  { name: "Meera", role: "Nurse, Munich", photo: "/assets/images/testimonial-meera.webp", quote: "The classes were built for nurses. The hospital vocab made my interview feel easy." },
  { name: "Nikhil", role: "Nurse, Berlin", photo: "/assets/images/testimonial-nikhil.webp", quote: "My coach handled the Anerkennung paperwork. I just focused on my German." },
  { name: "Priya", role: "Nurse, Hamburg", photo: "/assets/images/testimonial-priya.webp", quote: "From a GNM in Pune to a German hospital, and my family relocated with me." },
  { name: "Ravi", role: "Nurse, Frankfurt", photo: "/assets/images/testimonial-ravi.webp", quote: "The free demo class hooked me. Best decision I made for my nursing career." },
];

function TestimonialsMarquee() {
  // Duplicated once so the track can loop seamlessly; the clone is hidden from a11y.
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="sc-dash-marquee" aria-label="Nurses Skillcase has placed in Germany">
      <div className="sc-dash-marquee-track">
        {loop.map((t, i) => (
          <article className="sc-dash-tcard" key={i} aria-hidden={i >= TESTIMONIALS.length}>
            <p>“{t.quote}”</p>
            <div className="sc-dash-tcard-by">
              <img alt="" src={t.photo} loading="lazy" />
              <span>
                <strong>{t.name}</strong>
                <small><GermanFlag size={11} /> {t.role}</small>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FreeWebinar({ ctx }: { ctx: DashboardContext }) {
  // Same structure as the blue today_focus hero, light color variant.
  return (
    <section className="sc-dash-today sc-dash-today-light">
      <div className="sc-dash-today-inner">
        <div className="sc-dash-today-head">
          <span className="sc-dash-today-meta">
            <span className="sc-dash-today-chip"><CalendarCheck size={12} weight="bold" /> Live · Today 7 PM IST</span>
          </span>
          <p className="sc-dash-eyebrow"><VideoCamera size={11} weight="bold" /> Free webinar</p>
        </div>
        <h2>How nursing in Germany actually works</h2>
        <p>45 minutes, live. Salary, the B1 path, visa and costs, with time for your questions. No commitment.</p>
        <div className="sc-dash-today-actions">
          <button type="button" className="sc-dash-btn sc-dash-btn-navy" onClick={() => ctx.setActiveTab("learn")}>
            Reserve a seat <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      </div>
      <div className="sc-dash-today-media">
        <img alt="" src="/assets/images/hero.webp" />
      </div>
    </section>
  );
}

function GuidedFreeApp({ ctx: _ctx }: { ctx: DashboardContext }) {
  return (
    <section className="sc-dash-card-flat sc-dash-freetier">
      <span className="sc-dash-freetier-tile" aria-hidden="true"><DeviceMobile size={30} weight="fill" /></span>
      <div className="sc-dash-freetier-body">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><Sparkle size={11} weight="fill" /> Free to start</p>
            <h2>Guided German learning, free</h2>
          </div>
          <span className="sc-dash-tag is-free">Free</span>
        </div>
        <p className="sc-dash-block-copy">Get the Skillcase app for daily 5-minute drills, hospital vocabulary and your first A1 lessons, at no cost.</p>
        <div className="sc-dash-block-actions">
          <a className="sc-dash-btn sc-dash-btn-navy" href={APP_DOWNLOAD_URL} target="_blank" rel="noreferrer">
            <DeviceMobile size={15} weight="bold" /> Get the app
          </a>
        </div>
      </div>
    </section>
  );
}

function JoinCourse({ ctx }: { ctx: DashboardContext }) {
  const resume = ctx.level.rank >= 3;
  return (
    <section className="sc-dash-card-flat sc-dash-mediacard sc-dash-course">
      <div className="sc-dash-card-media">
        <img alt="" src="/assets/images/about-indian-teacher-guidance.webp" />
        <span className="sc-dash-card-media-chip is-paid">Paid · Live classes</span>
      </div>
      <div className="sc-dash-card-body">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><GraduationCap size={11} weight="bold" /> Structured course</p>
            <h2>{resume ? "Resume your German course" : "Join the German course"}</h2>
          </div>
        </div>
        <p className="sc-dash-block-copy">Live classes built for nurses, A1 to B1, with a coach, batchmates and a clear exam timeline. The fastest route to job-ready German.</p>
        <ul className="sc-dash-course-points">
          <li><Check size={12} weight="bold" /> Live classes on a fixed weekly schedule</li>
          <li><Check size={12} weight="bold" /> Hospital vocabulary and B1 exam prep</li>
          <li><Check size={12} weight="bold" /> A coach and batch to keep you on track</li>
        </ul>
        <div className="sc-dash-block-actions">
          <button type="button" className="sc-dash-btn sc-dash-btn-gold" onClick={() => ctx.setActiveTab("learn")}>
            {resume ? "Resume course" : "See the course"} <ArrowRight size={14} weight="bold" />
          </button>
          <a className="sc-dash-btn sc-dash-btn-outline" href={`https://wa.me/${COACH_WHATSAPP}`} target="_blank" rel="noreferrer">Talk to a coach</a>
        </div>
      </div>
    </section>
  );
}

function InterviewPractice({ ctx }: { ctx: DashboardContext }) {
  return (
    <section className="sc-dash-card-flat sc-dash-mediacard">
      <div className="sc-dash-card-media">
        <img alt="" src="/assets/images/blog-training.webp" />
      </div>
      <div className="sc-dash-card-body">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><ChatCircleText size={11} weight="bold" /> Interview practice</p>
            <h2>Rehearse your hospital interview</h2>
          </div>
        </div>
        <p className="sc-dash-block-copy">Mock interviews with Skillcase coaches, German and clinical scenarios, so the real one feels familiar.</p>
        <div className="sc-dash-block-actions">
          <button type="button" className="sc-dash-btn sc-dash-btn-navy" onClick={() => ctx.setActiveTab("learn")}>
            Book a mock <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProfileDocs({ ctx }: { ctx: DashboardContext }) {
  if (ctx.profileCompleteness >= 100 && ctx.documentReadiness >= 100) return null;
  return (
    <section className="sc-dash-card-flat">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><SealCheck size={11} weight="bold" /> Get application-ready</p>
          <h2>Finish your profile and documents</h2>
        </div>
      </div>
      <div className="sc-dash-readyrows">
        <button type="button" className="sc-dash-readyrow" onClick={() => ctx.setActiveTab("profile")}>
          <span className="sc-dash-readyrow-label"><strong>Profile</strong><small>{ctx.profileCompleteness}% complete</small></span>
          <span className="sc-dash-readyrow-bar"><i style={{ width: `${ctx.profileCompleteness}%` }} /></span>
          <CaretRight size={14} weight="bold" aria-hidden="true" />
        </button>
        <button type="button" className="sc-dash-readyrow" onClick={() => ctx.setActiveTab("documents")}>
          <span className="sc-dash-readyrow-label"><strong>Documents</strong><small>{ctx.documentReadiness}% ready</small></span>
          <span className="sc-dash-readyrow-bar"><i style={{ width: `${ctx.documentReadiness}%` }} /></span>
          <CaretRight size={14} weight="bold" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function Guidance({ ctx }: { ctx: DashboardContext }) {
  const { coach } = ctx;
  return (
    <section className="sc-dash-card-flat sc-dash-guidance">
      <img className="sc-dash-guidance-photo" alt="" src={coach.photo} />
      <div className="sc-dash-guidance-body">
        <p className="sc-dash-eyebrow"><WhatsappLogo size={11} weight="bold" /> Guidance</p>
        <h2>{coach.name}, your placement coach</h2>
        <p className="sc-dash-block-copy">{coach.role} · replies in ~{Math.round(coach.responseSlaMin / 60)} hr. Ask anything about jobs, visa or documents.</p>
        <div className="sc-dash-block-actions">
          <a className="sc-dash-btn sc-dash-btn-navy" href={`https://wa.me/${coach.whatsApp}`} target="_blank" rel="noreferrer">
            <WhatsappLogo size={15} weight="bold" /> WhatsApp
          </a>
          <a className="sc-dash-btn sc-dash-btn-outline" href={`tel:${coach.phone}`}>
            <PhoneCall size={15} weight="bold" /> Call
          </a>
        </div>
      </div>
    </section>
  );
}

/* Helper used elsewhere */
export function helperNeverUnused(): GermanLevel {
  return "not_started";
}
