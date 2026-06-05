import React from "react";
import {
  ArrowRightIcon as ArrowRight,
  BriefcaseIcon as Briefcase,
  CheckIcon as Check,
  GraduationCapIcon as GraduationCap,
  ShieldWarningIcon as ShieldWarning,
  StethoscopeIcon as Stethoscope,
  UploadSimpleIcon as Upload,
  UserCircleIcon as UserCircle,
  UsersThreeIcon as UsersThree,
  WhatsappLogoIcon as WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import { CITIES } from "../../data/cities";
import { rankAtLeast } from "../../data/dashboardStorage";
import type { GermanLevel } from "../../data/dashboardTypes";
import { GERMAN_LEVELS } from "../../data/dashboardCohort";
import type { DashboardContext } from "./shared";

const QUALIFICATIONS = ["GNM Nursing", "BSc Nursing", "Post Basic BSc Nursing", "MSc Nursing", "ANM Nursing"];
const EXPERIENCE = ["Fresher", "Less than 1 year", "1-2 years", "2-3 years", "3-5 years", "5-10 years", "10+ years"];
const SPECIALTIES = ["General ward", "ICU / critical care", "OR / theatre", "Paediatrics", "Geriatric / elder care", "Oncology", "Cardiac", "Emergency"];

export function ProfileView(ctx: DashboardContext) {
  const claimsB1 = rankAtLeast(ctx.profile.germanLevel, "b1_completed");
  const certVerified = ctx.documents.b1_certificate?.state === "verified";
  const showB1Gate = claimsB1 && !certVerified;

  return (
    <div className="sc-dash-tab-space">
      {showB1Gate && (
        <section className="sc-dash-b1-gate">
          <div className="sc-dash-b1-gate-icon"><ShieldWarning size={20} weight="fill" /></div>
          <div>
            <p className="sc-dash-eyebrow">Verification needed</p>
            <h2>Upload your B1 certificate to apply</h2>
            <p>You selected B1 or higher. Hospitals only see your application after a Skillcase coach verifies your certificate. Until then, "Apply" saves drafts only.</p>
            <button className="sc-dash-btn sc-dash-btn-gold" type="button" onClick={() => ctx.setActiveTab("documents")}>
              <Upload size={14} weight="bold" />
              Upload B1 certificate
            </button>
          </div>
        </section>
      )}

      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><UserCircle size={11} weight="bold" /> Basic profile</p>
            <h2>What employers see first</h2>
          </div>
          <span className="sc-dash-level-pill">{ctx.profileCompleteness}% complete</span>
        </div>
        <div className="sc-dash-form">
          <label className="sc-dash-field">
            <span>Full name</span>
            <input
              value={ctx.profile.fullName === "Skillcase Nurse" ? "" : ctx.profile.fullName}
              placeholder="Sanjukta Rout"
              onChange={(e) => ctx.updateProfile("fullName", e.target.value || "Skillcase Nurse")}
            />
          </label>
          <label className="sc-dash-field">
            <span>Email</span>
            <input type="email" value={ctx.profile.email} placeholder="you@example.com" onChange={(e) => ctx.updateProfile("email", e.target.value)} />
          </label>
          <label className="sc-dash-field">
            <span>Phone (+91)</span>
            <input
              inputMode="numeric"
              value={ctx.profile.phone}
              placeholder="98765 43210"
              onChange={(e) => ctx.updateProfile("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </label>
          <label className="sc-dash-field">
            <span>City in India</span>
            <input value={ctx.profile.city} placeholder="Kochi, Bengaluru…" onChange={(e) => ctx.updateProfile("city", e.target.value)} />
          </label>
        </div>
      </section>

      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><GraduationCap size={11} weight="bold" /> Education & language</p>
            <h2>Your nursing background</h2>
          </div>
        </div>
        <div className="sc-dash-form">
          <label className="sc-dash-field">
            <span>Qualification</span>
            <select value={ctx.profile.qualification} onChange={(e) => ctx.updateProfile("qualification", e.target.value)}>
              <option value="">Select qualification</option>
              {QUALIFICATIONS.map((q) => <option key={q} value={q}>{q}</option>)}
            </select>
          </label>
          <label className="sc-dash-field">
            <span>Work experience</span>
            <select value={ctx.profile.experience} onChange={(e) => ctx.updateProfile("experience", e.target.value)}>
              <option value="">Select experience</option>
              {EXPERIENCE.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </label>
          <label className="sc-dash-field">
            <span>German level</span>
            <select value={ctx.profile.germanLevel} onChange={(e) => ctx.updateProfile("germanLevel", e.target.value as GermanLevel)}>
              {GERMAN_LEVELS.map((lvl) => <option key={lvl.value} value={lvl.value}>{lvl.label}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><Briefcase size={11} weight="bold" /> What recruiters need next</p>
            <h2>Move ready details</h2>
          </div>
        </div>
        <div className="sc-dash-form">
          <label className="sc-dash-field">
            <span>Passport status</span>
            <select value={ctx.profile.passportStatus ?? ""} onChange={(e) => ctx.updateProfile("passportStatus", (e.target.value || undefined) as ProfileFieldFor<"passportStatus">)}>
              <option value="">Select</option>
              <option value="have">I have a valid passport</option>
              <option value="applied">I've applied / appointment booked</option>
              <option value="none">Not started yet</option>
            </select>
          </label>
          <label className="sc-dash-field">
            <span>Passport expiry</span>
            <input
              type="date"
              value={ctx.profile.passportExpiry ?? ""}
              onChange={(e) => ctx.updateProfile("passportExpiry", e.target.value || undefined)}
            />
          </label>
          <label className="sc-dash-field">
            <span>Earliest start date in Germany</span>
            <input
              type="date"
              value={ctx.profile.earliestStart ?? ""}
              onChange={(e) => ctx.updateProfile("earliestStart", e.target.value || undefined)}
            />
          </label>
          <label className="sc-dash-field">
            <span>Preferred German city</span>
            <select value={ctx.profile.preferredCity ?? ""} onChange={(e) => ctx.updateProfile("preferredCity", e.target.value || undefined)}>
              <option value="">Open to anywhere</option>
              {CITIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </label>
          <label className="sc-dash-field">
            <span>Relocate with family?</span>
            <select value={ctx.profile.relocateFamily ?? ""} onChange={(e) => ctx.updateProfile("relocateFamily", (e.target.value || undefined) as ProfileFieldFor<"relocateFamily">)}>
              <option value="">Choose</option>
              <option value="yes">Yes, with spouse / children</option>
              <option value="later">Later, after I settle</option>
              <option value="no">No, moving alone</option>
            </select>
          </label>
        </div>
      </section>

      <section className="sc-dash-card-flat">
        <div className="sc-dash-section-head">
          <div>
            <p className="sc-dash-eyebrow"><Stethoscope size={11} weight="bold" /> Specialties</p>
            <h2>Pick areas you've worked in</h2>
          </div>
          <small className="sc-dash-help-text">Helps match ICU, OR, paeds and specialty roles</small>
        </div>
        <div className="sc-dash-chip-grid" role="group" aria-label="Clinical specialties">
          {SPECIALTIES.map((s) => {
            const selected = (ctx.profile.specialties ?? []).includes(s);
            return (
              <button
                key={s}
                type="button"
                className={`sc-dash-chip ${selected ? "is-selected" : ""}`}
                onClick={() => {
                  const current = ctx.profile.specialties ?? [];
                  const next = selected ? current.filter((x) => x !== s) : [...current, s];
                  ctx.updateProfile("specialties", next);
                }}
              >
                {selected && <Check size={12} weight="bold" />}
                {s}
              </button>
            );
          })}
        </div>
      </section>

      <section className="sc-dash-impact" role="status">
        <span className="sc-dash-impact-icon" aria-hidden="true">
          {ctx.canApply ? <Briefcase size={18} weight="bold" /> : <GraduationCap size={18} weight="bold" />}
        </span>
        <div>
          <strong>{ctx.canApply ? "You can apply with this profile" : "Profile saves automatically"}</strong>
          <small>
            {ctx.canApply
              ? `Recruiters see this exact profile when you apply. ${ctx.documentReadiness}% of documents are ready.`
              : ctx.level.rank >= 4
                ? "B1 selected but certificate not yet verified. Upload it to enable applications."
                : "Jobs open at B1. Keep building your profile in the meantime."}
          </small>
        </div>
        <button type="button" onClick={() => ctx.setActiveTab(ctx.cohort.todayFocus.ctaTab)}>
          <ArrowRight size={14} weight="bold" />
        </button>
      </section>

      <section className="sc-dash-coach-band">
        <img alt="" src={ctx.coach.photo} />
        <div>
          <p className="sc-dash-eyebrow">Your coach</p>
          <h3>{ctx.coach.name}</h3>
          <p>{ctx.coach.sampleMessage}</p>
          <div className="sc-dash-coach-meta">
            <span>{ctx.coach.languages.join(" · ")}</span>
            <span>Replies in ~{Math.round(ctx.coach.responseSlaMin / 60)} hr</span>
          </div>
        </div>
        <div className="sc-dash-coach-actions">
          <a className="sc-dash-btn sc-dash-btn-navy" href={`https://wa.me/${ctx.coach.whatsApp}`} target="_blank" rel="noreferrer">
            <WhatsappLogo size={15} weight="bold" />
            WhatsApp {ctx.coach.name.split(" ")[0]}
          </a>
        </div>
      </section>

      <div className="sc-dash-form-foot">
        <button type="button" className="sc-dash-btn sc-dash-btn-gold" onClick={ctx.saveProfile}>
          Save profile
          <Check size={14} weight="bold" />
        </button>
        <small className="sc-dash-form-foot-note">Changes save automatically. This button confirms the snapshot recruiters see.</small>
      </div>

      <FamilyHint ctx={ctx} />
    </div>
  );
}

function FamilyHint({ ctx }: { ctx: DashboardContext }) {
  if (!ctx.cohort.showFamily) return null;
  return (
    <section className="sc-dash-card-flat sc-dash-family">
      <div className="sc-dash-section-head">
        <div>
          <p className="sc-dash-eyebrow"><UsersThree size={11} weight="bold" /> Family</p>
          <h2>Spouse and children relocate with you</h2>
        </div>
      </div>
      <ul className="sc-dash-family-list">
        <li><Check size={12} weight="bold" /> Spouse work permit issued alongside your visa</li>
        <li><Check size={12} weight="bold" /> Free German public schools</li>
        <li><Check size={12} weight="bold" /> Health insurance covers your dependants</li>
        <li><Check size={12} weight="bold" /> Coach handles family Schengen + relocation</li>
      </ul>
    </section>
  );
}

type ProfileFieldFor<K extends keyof DashboardContext["profile"]> = DashboardContext["profile"][K];
