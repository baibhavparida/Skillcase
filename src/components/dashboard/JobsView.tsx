import React, { useState } from "react";
import {
  ArrowRightIcon as ArrowRight,
  BriefcaseIcon as Briefcase,
  CaretRightIcon as CaretRight,
  CheckIcon as Check,
  LockKeyIcon as LockKey,
  MapPinIcon as MapPin,
  ShieldCheckIcon as ShieldCheck,
  StethoscopeIcon as Stethoscope,
  TrainIcon as Train,
  UsersThreeIcon as UsersThree,
} from "@phosphor-icons/react/ssr";
import { CITIES } from "../../data/cities";
import { rankAtLeast, upsertApplication, readApplications } from "../../data/dashboardStorage";
import { GermanFlag, type DashboardContext } from "./shared";
import type { GermanLevel } from "../../data/dashboardTypes";

type JobRecord = {
  id: string;
  title: string;
  organization: string;
  city: string;
  citySlug: string;
  salary: string;
  requiredLevel: GermanLevel;
  fit: string;
  type: "Hospital" | "Senior care" | "Clinic";
  shift: string;
  contractLength: string;
  premium?: boolean;
  about: string;
  placedNurse?: { name: string; quote: string };
};

const JOBS: JobRecord[] = [
  {
    id: "hamburg-rn",
    title: "Registered Nurse",
    organization: "Hamburg Care Network",
    city: "Hamburg",
    citySlug: "hamburg",
    salary: "€3.3k–€3.7k",
    requiredLevel: "b1_completed",
    fit: "Strong fit after B1",
    type: "Hospital",
    shift: "Rotating · 3 shifts",
    contractLength: "Permanent · 3-month probation",
    about: "Network of 4 mid-size hospitals on the Elbe waterfront. Strong Indian nurse cohort (12 placed via Skillcase).",
    placedNurse: { name: "Sneha Pillai", quote: "The HR team speaks slow German with me. My ward has 3 other Indians." },
  },
  {
    id: "aachen-nurse",
    title: "Clinical Nurse",
    organization: "Aachen City Hospital",
    city: "Aachen",
    citySlug: "aachen",
    salary: "€3.2k–€3.6k",
    requiredLevel: "b1_completed",
    fit: "Best for fresh graduates",
    type: "Hospital",
    shift: "Day + rotating night",
    contractLength: "2-year initial · auto renewal",
    about: "Quiet university town near Belgian border. Lower rent, walkable. Ideal first posting for fresher nurses.",
    placedNurse: { name: "Rohan Mathew", quote: "Cost of living is lower than Bengaluru. I sent home ₹70k my first month." },
  },
  {
    id: "berlin-care",
    title: "Senior Care Nurse",
    organization: "Berlin Elder Care Group",
    city: "Berlin",
    citySlug: "berlin",
    salary: "€3.0k–€3.45k",
    requiredLevel: "b1_completed",
    fit: "Strong fit for 2+ yrs experience",
    type: "Senior care",
    shift: "Day shifts only",
    contractLength: "Permanent",
    about: "Large Indian community in Neukölln. Senior-care roles, slower-paced, predictable schedule.",
    placedNurse: { name: "Anjali Verma", quote: "I came with my 5-year-old. She goes to a free kita 10 minutes away." },
  },
  {
    id: "munich-icu",
    title: "ICU Nurse",
    organization: "Munich University Klinikum",
    city: "Munich",
    citySlug: "munich",
    salary: "€3.9k–€4.4k",
    requiredLevel: "b2_in_progress",
    fit: "Premium · B2 preferred",
    type: "Hospital",
    shift: "Rotating",
    contractLength: "Permanent",
    premium: true,
    about: "Tier-1 teaching hospital. Premium pay, structured residency, specialty progression.",
  },
  {
    id: "frankfurt-or",
    title: "OR Specialist Nurse",
    organization: "Frankfurt Cardio Centre",
    city: "Frankfurt",
    citySlug: "frankfurt",
    salary: "€4.0k–€4.6k",
    requiredLevel: "b2_in_progress",
    fit: "Premium · cardiac / OR",
    type: "Hospital",
    shift: "Surgical hours",
    contractLength: "Permanent",
    premium: true,
    about: "Cardiac surgery centre with direct India flight access. Premium pay band, specialty leadership pipeline.",
  },
];

export function JobsView(ctx: DashboardContext) {
  const visibleJobs = JOBS.filter((j) => {
    if (j.premium && !ctx.cohort.showPremiumJobs) return false;
    return true;
  });

  const lockReason = !ctx.canApply ? lockReasonFor(ctx) : null;

  return (
    <div className="sc-dash-tab-space">
      <section className="sc-dash-jobs-hero">
        <div>
          <p className="sc-dash-eyebrow"><Briefcase size={11} weight="bold" /> Germany jobs</p>
          <h2>{ctx.canApply ? `${visibleJobs.length} matched roles` : `${visibleJobs.length} roles waiting`}</h2>
          <p>
            {ctx.canApply
              ? "Apply with your Skillcase profile. Hospital recruiters reply within 5 working days."
              : "Preview salary, city, contract before you apply. Applications open after B1 verification."}
          </p>
        </div>
        <div className="sc-dash-jobs-stats">
          <span><strong>{ctx.level.shortLabel}</strong><small>your level</small></span>
          <span><strong>{ctx.canApply ? "Open" : "B1 →"}</strong><small>application status</small></span>
          <span><strong>{ctx.applications.length}</strong><small>{ctx.applications.length === 1 ? "in motion" : "applications"}</small></span>
        </div>
      </section>

      {lockReason && (
        <div className="sc-dash-lock-note" role="status">
          <LockKey size={15} weight="bold" />
          <span>{lockReason}</span>
        </div>
      )}

      <div className="sc-dash-job-grid">
        {visibleJobs.map((job) => <JobCard key={job.id} job={job} ctx={ctx} />)}
      </div>
    </div>
  );
}

function lockReasonFor(ctx: DashboardContext): string {
  if (!rankAtLeast(ctx.profile.germanLevel, "b1_completed")) {
    return "Complete German B1 first. You can preview every role and prepare documents now.";
  }
  if (ctx.documentReadiness < 100) {
    return `Documents ${ctx.documentReadiness}% ready. Recruiters review the full profile, so finish documents before submitting.`;
  }
  return "Upload your B1 certificate so a Skillcase coach can verify it. Applications open after verification.";
}

function JobCard({ job, ctx }: { job: JobRecord; ctx: DashboardContext }) {
  const [expanded, setExpanded] = useState(false);
  const [applied, setApplied] = useState(() => ctx.applications.some((a) => a.jobId === job.id));
  const city = CITIES.find((c) => c.slug === job.citySlug);
  const eligible = rankAtLeast(ctx.profile.germanLevel, job.requiredLevel) && ctx.canApply;

  const handleApply = () => {
    if (!eligible) return;
    if (applied) return;
    upsertApplication({
      jobId: job.id,
      status: "submitted",
      submittedAt: new Date().toISOString(),
      events: [{ at: new Date().toISOString(), label: "Submitted via Skillcase profile" }],
    });
    setApplied(true);
    // Best-effort: trigger a state refresh by no-oping the readApplications call
    readApplications();
  };

  return (
    <article className={`sc-dash-job ${eligible ? "is-eligible" : "is-locked"} ${job.premium ? "is-premium" : ""}`}>
      <div className="sc-dash-job-head">
        <span className="sc-dash-job-loc"><GermanFlag size={12} /> {job.city}</span>
        {job.premium && <span className="sc-dash-job-premium">Premium · B2</span>}
        {eligible ? (
          <span className="sc-dash-job-state is-open">Open</span>
        ) : (
          <span className="sc-dash-job-state is-locked"><LockKey size={10} weight="bold" /> {job.requiredLevel === "b2_in_progress" ? "B2" : "B1"}</span>
        )}
      </div>

      <div className="sc-dash-job-body">
        <span className="sc-dash-job-icon"><Stethoscope size={18} weight="bold" /></span>
        <div>
          <h3>{job.title}</h3>
          <p>{job.organization}</p>
        </div>
      </div>

      <dl className="sc-dash-job-facts">
        <div><dt>Pay</dt><dd>{job.salary}</dd></div>
        <div><dt>Shift</dt><dd>{job.shift}</dd></div>
        <div><dt>Contract</dt><dd>{job.contractLength}</dd></div>
      </dl>

      <p className="sc-dash-job-fit">{job.fit}</p>

      {expanded && (
        <div className="sc-dash-job-detail">
          <div className="sc-dash-job-about">
            <p className="sc-dash-eyebrow">About the employer</p>
            <p>{job.about}</p>
          </div>

          {city && (
            <div className="sc-dash-job-city">
              <p className="sc-dash-eyebrow"><MapPin size={11} weight="bold" /> {city.name}</p>
              <ul>
                <li><Train size={12} weight="bold" /> {city.transport} public transport</li>
                <li><UsersThree size={12} weight="bold" /> {city.indianCommunity} Indian community</li>
                <li><ShieldCheck size={12} weight="bold" /> Rent ≈ {city.monthlyRent}/mo</li>
              </ul>
              <p className="sc-dash-job-city-vibe">{city.vibe}</p>
            </div>
          )}

          {job.placedNurse && (
            <div className="sc-dash-job-testimonial">
              <p className="sc-dash-eyebrow"><Check size={11} weight="bold" /> Placed nurse</p>
              <blockquote>"{job.placedNurse.quote}"</blockquote>
              <cite>{job.placedNurse.name}, currently at {job.organization}</cite>
            </div>
          )}
        </div>
      )}

      <div className="sc-dash-job-actions">
        <button type="button" className="sc-dash-text-link" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Less" : "More about role"} <CaretRight size={12} weight="bold" style={{ transform: expanded ? "rotate(90deg)" : undefined }} />
        </button>
        <button
          type="button"
          className={`sc-dash-btn ${applied ? "sc-dash-btn-navy is-applied" : eligible ? "sc-dash-btn-gold" : "sc-dash-btn-locked"}`}
          disabled={!eligible || applied}
          onClick={handleApply}
        >
          {applied ? (
            <>
              <Check size={14} weight="bold" />
              Application submitted
            </>
          ) : eligible ? (
            <>
              Apply with profile
              <ArrowRight size={14} weight="bold" />
            </>
          ) : (
            <>
              <LockKey size={14} weight="bold" />
              {job.premium ? "Unlocks at B2" : "Unlocks at B1"}
            </>
          )}
        </button>
      </div>
    </article>
  );
}
