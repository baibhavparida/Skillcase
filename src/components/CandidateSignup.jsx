import ResponsiveImage from "./ResponsiveImage.jsx";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  CheckIcon as Check,
  ChatCircleTextIcon as ChatCircleText,
  ClockIcon as Clock,
  GlobeIcon as Globe,
  PhoneCallIcon as PhoneCall,
  SealCheckIcon as SealCheck,
  ShieldCheckIcon as ShieldCheck,
  SparkleIcon as Sparkle,
  WhatsappLogoIcon as WhatsappLogo,
} from "@phosphor-icons/react/ssr";
const STORAGE_KEY = "skillcase_candidate_profile";
const defaultProfile = {
  fullName: "",
  email: "",
  city: "",
  phone: "",
  qualification: "",
  germanLevel: "not_started",
  experience: "",
};
const onboardingSteps = [
  "phone",
  "otp",
  "name",
  "qualification",
  "experience",
  "german",
];
const stepTitles = {
  welcome: "Welcome",
  phone: "Phone",
  otp: "Verify",
  name: "About you",
  qualification: "Qualification",
  experience: "Experience",
  german: "German",
  roadmap: "Roadmap",
};
const qualificationOptions = [
  {
    value: "BSc Nursing",
    label: "BSc Nursing",
    detail: "4 years · strong hospital fit",
    tag: "Popular",
  },
  {
    value: "GNM Nursing",
    label: "GNM Nursing",
    detail: "3 years · accepted path",
  },
  {
    value: "MSc Nursing",
    label: "MSc Nursing",
    detail: "2 years · senior pathway",
  },
  {
    value: "Post Basic BSc Nursing",
    label: "Post Basic BSc",
    detail: "After GNM · eligible route",
  },
  {
    value: "ANM Nursing",
    label: "ANM Nursing",
    detail: "1.5 years · Germany route check",
  },
];
const experienceOptions = [
  { value: "Fresher", label: "Fresher", detail: "No clinical work yet" },
  {
    value: "Less than 1 year",
    label: "Under 1 year",
    detail: "Early clinical exposure",
  },
  {
    value: "1-2 years",
    label: "1–2 years",
    detail: "Building ward confidence",
  },
  {
    value: "2-3 years",
    label: "2–3 years",
    detail: "Strong fit for many roles",
    tag: "Most picked",
  },
  {
    value: "3-5 years",
    label: "3–5 years",
    detail: "Experienced clinical profile",
  },
  {
    value: "5-10 years",
    label: "5–10 years",
    detail: "Senior-care and hospital fit",
  },
  { value: "10+ years", label: "10+ years", detail: "Senior pathway review" },
];
const germanLevelOptions = [
  {
    value: "not_started",
    label: "Not started",
    detail: "Perfect. Most nurses begin here.",
  },
  {
    value: "a1_completed",
    label: "A1 completed",
    detail: "Basics down. Next stop: A2.",
  },
  {
    value: "a2_completed",
    label: "A2 completed",
    detail: "Halfway to B1.",
    tag: "Halfway",
  },
  {
    value: "b1_in_progress",
    label: "B1 in progress",
    detail: "Almost job-ready.",
  },
  {
    value: "b1_completed",
    label: "B1 completed",
    detail: "You can apply for matched jobs.",
    tag: "Jobs unlock",
  },
  {
    value: "b2_in_progress",
    label: "B2 in progress",
    detail: "Premium hospitals open up.",
  },
  {
    value: "b2_completed",
    label: "B2 completed",
    detail: "Strong language profile.",
  },
];
function readStoredProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProfile, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}
function writeStoredProfile(profile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // The signup flow remains usable when browser storage is unavailable.
  }
}
function onlyDigits(value, max = 10) {
  return value.replace(/\D/g, "").slice(0, max);
}
function getFirstName(name) {
  return name.trim().split(" ")[0] || "there";
}
function getGermanLabel(level) {
  return (
    germanLevelOptions.find((option) => option.value === level)?.label ??
    "Not started"
  );
}
export default function CandidateSignup() {
  // Users arrive here straight from the homepage CTA, already sold. Start them
  // on the first real step (phone) instead of behind a redundant welcome gate.
  const [step, setStep] = useState("phone");
  const [profile, setProfile] = useState(defaultProfile);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [errors, setErrors] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const otpRefs = useRef([]);
  const panelRef = useRef(null);
  useEffect(() => {
    if (step === "phone") return;
    const heading = panelRef.current?.querySelector("h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      if (window.scrollY > 80) window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [step]);
  useEffect(() => {
    const stored = readStoredProfile();
    if (stored) setProfile(stored);
    setHasLoaded(true);
  }, []);
  useEffect(() => {
    if (step === "otp") {
      const t = window.setTimeout(() => otpRefs.current[0]?.focus(), 80);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [step]);
  const stepIndex =
    step === "roadmap"
      ? onboardingSteps.length
      : onboardingSteps.includes(step)
        ? onboardingSteps.indexOf(step) + 1
        : 0;
  const updateProfile = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));
    setErrors((e) => {
      const { [field]: _, ...rest } = e;
      return rest;
    });
  };
  const goBack = () => {
    const i = onboardingSteps.indexOf(step);
    // First step has no prior screen, so Back returns to the marketing site.
    if (step === "phone") {
      window.location.assign("/");
      return;
    }
    if (i > 0) setStep(onboardingSteps[i - 1]);
  };
  const submitPhone = (event) => {
    event.preventDefault();
    const phone = onlyDigits(profile.phone);
    if (phone.length !== 10) {
      setErrors({ phone: "Indian mobile numbers are 10 digits." });
      return;
    }
    setErrors({});
    setProfile((p) => ({ ...p, phone }));
    setStep("otp");
  };
  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtpError("");
    setOtpDigits((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };
  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };
  const handleOtpPaste = (event) => {
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    event.preventDefault();
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((d, i) => {
      next[i] = d;
    });
    setOtpDigits(next);
    const focusIndex = Math.min(pasted.length, 5);
    otpRefs.current[focusIndex]?.focus();
  };
  const submitOtp = (event) => {
    event.preventDefault();
    if (otpDigits.join("").length !== 6) {
      setOtpError("Enter the 6-digit code. Any 6 digits work for now.");
      return;
    }
    setOtpError("");
    setStep("name");
  };
  const submitName = (event) => {
    event.preventDefault();
    const next = {};
    if (!profile.fullName.trim())
      next.fullName = "Add the name your coach should use.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim()))
      next.email = "Add a valid email for class links.";
    if (Object.keys(next).length) return setErrors(next);
    setProfile((p) => ({
      ...p,
      fullName: p.fullName.trim(),
      email: p.email.trim(),
      city: p.city.trim(),
    }));
    setErrors({});
    setStep("qualification");
  };
  const submitChoice = (field, nextStep) => {
    const value = profile[field];
    if (!value) {
      setErrors({ [field]: "Choose one option to continue." });
      return;
    }
    const clean = {
      ...profile,
      fullName: profile.fullName.trim(),
      email: profile.email.trim(),
      city: profile.city.trim(),
      phone: onlyDigits(profile.phone),
    };
    setProfile(clean);
    setErrors({});
    setStep(nextStep);
  };
  // Save this device's progress and show the next step with an advisor.
  const finishOnboarding = () => {
    const clean = {
      ...profile,
      fullName: profile.fullName.trim(),
      email: profile.email.trim(),
      city: profile.city.trim(),
      phone: onlyDigits(profile.phone),
    };
    writeStoredProfile(clean);
    setProfile(clean);
    setStep("roadmap");
  };
  return (
    <div className="sc-onb">
      <header className="sc-onb-bar" data-step={step}>
        <a className="sc-onb-brand" href="/" aria-label="Skillcase home">
          <ResponsiveImage
            alt="Skillcase"
            src="/assets/images/SKILLCASE_logo.svg"
          />
        </a>
        <div className="sc-onb-bar-tools">
          <span className="sc-onb-trust-pill" aria-hidden="true">
            <ShieldCheck size={14} weight="bold" /> Free, zero recruitment cost
          </span>
          <a
            className="sc-onb-call"
            href="tel:+919731462667"
            aria-label="Call Skillcase"
          >
            <PhoneCall size={16} weight="bold" aria-hidden="true" />
            <span>Call</span>
          </a>
        </div>
      </header>

      <main className="sc-onb-flow" aria-live="polite">
        <div className="sc-onb-main">
          <div
            className="sc-onb-flow-rail"
            aria-label={`Step ${stepIndex} of ${onboardingSteps.length}`}
          >
            <button
              className="sc-onb-back"
              type="button"
              onClick={goBack}
              disabled={step === "roadmap"}
            >
              <ArrowLeft size={16} weight="bold" aria-hidden="true" />
              <span>Back</span>
            </button>
            <div className="sc-onb-stepper">
              {onboardingSteps.map((item, index) => {
                const isDone = index + 1 < stepIndex;
                const isCurrent = index + 1 === stepIndex;
                return (
                  <span
                    key={item}
                    className={`sc-onb-stepper-dot ${isDone ? "is-done" : isCurrent ? "is-current" : ""}`}
                    aria-label={stepTitles[item]}
                  />
                );
              })}
            </div>
            <strong className="sc-onb-step-count">
              <span>{stepIndex}</span>
              <em>of {onboardingSteps.length}</em>
            </strong>
          </div>

          <div className="sc-onb-canvas">
            <section className="sc-onb-panel" ref={panelRef}>
              {step === "phone" && (
                <form className="sc-onb-form" onSubmit={submitPhone} noValidate>
                  <Eyebrow icon={<WhatsappLogo size={13} weight="bold" />}>
                    WhatsApp OTP
                  </Eyebrow>
                  <h1>Let’s start with your number</h1>
                  <p className="sc-onb-lede">
                    We’ll send a quick code on WhatsApp. Your coach uses this
                    number for class reminders and job alerts.
                  </p>

                  <label className="sc-onb-field">
                    <span className="sc-onb-field-label">Mobile number</span>
                    <div
                      className={`sc-onb-phone ${errors.phone ? "is-error" : ""}`}
                    >
                      <span className="sc-onb-phone-flag" aria-hidden="true">
                        +91
                      </span>
                      <input
                        inputMode="numeric"
                        autoComplete="tel-national"
                        aria-describedby={
                          errors.phone ? "phone-error" : undefined
                        }
                        aria-invalid={Boolean(errors.phone)}
                        placeholder="98765 43210"
                        value={profile.phone}
                        onChange={(event) =>
                          updateProfile("phone", onlyDigits(event.target.value))
                        }
                      />
                    </div>
                    {errors.phone && (
                      <small id="phone-error" className="sc-onb-error">
                        {errors.phone}
                      </small>
                    )}
                  </label>

                  <label className="sc-onb-consent">
                    <input checked readOnly type="checkbox" />
                    <span>
                      Yes, send me free class invites, job alerts and visa news
                      on WhatsApp. I can stop anytime.
                    </span>
                  </label>

                  <button className="sc-onb-cta" type="submit">
                    Send OTP on WhatsApp
                    <ArrowRight size={17} weight="bold" aria-hidden="true" />
                  </button>
                  <p className="sc-onb-fineprint">
                    We never share your number.{" "}
                    <a href="/privacy-policy/">Privacy policy</a>.
                  </p>
                </form>
              )}

              {step === "otp" && (
                <form className="sc-onb-form" onSubmit={submitOtp} noValidate>
                  <Eyebrow icon={<ShieldCheck size={13} weight="bold" />}>
                    Verify phone
                  </Eyebrow>
                  <h1>Enter the 6-digit code</h1>
                  <p className="sc-onb-lede">
                    Sent on WhatsApp to <strong>+91 {profile.phone}</strong>.
                    For now any 6 digits work.
                  </p>

                  <div
                    className={`sc-onb-otp ${otpError ? "is-error" : ""}`}
                    role="group"
                    aria-label="OTP code"
                  >
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpRefs.current[index] = el;
                        }}
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        value={digit}
                        aria-label={`Digit ${index + 1}`}
                        onChange={(event) =>
                          handleOtpChange(index, event.target.value)
                        }
                        onKeyDown={(event) => handleOtpKeyDown(index, event)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                      />
                    ))}
                  </div>
                  {otpError && (
                    <small className="sc-onb-error">{otpError}</small>
                  )}

                  <div className="sc-onb-otp-help">
                    <button type="button" className="sc-onb-text-link">
                      Resend code
                    </button>
                    <span aria-hidden="true">·</span>
                    <a className="sc-onb-text-link" href="tel:+919731462667">
                      <PhoneCall size={13} weight="bold" aria-hidden="true" />{" "}
                      Verify by call
                    </a>
                  </div>

                  <button className="sc-onb-cta" type="submit">
                    Verify and continue
                    <ArrowRight size={17} weight="bold" aria-hidden="true" />
                  </button>
                </form>
              )}

              {step === "name" && (
                <form className="sc-onb-form" onSubmit={submitName} noValidate>
                  <Eyebrow icon={<Sparkle size={13} weight="bold" />}>
                    Personalise
                  </Eyebrow>
                  <h1>What should we call you?</h1>
                  <p className="sc-onb-lede">
                    Your coach greets you by name in class. Email is for class
                    links and backup updates.
                  </p>

                  <div className="sc-onb-field-grid">
                    <label className="sc-onb-field">
                      <span className="sc-onb-field-label">Full name</span>
                      <input
                        autoComplete="name"
                        className={`sc-onb-text ${errors.fullName ? "is-error" : ""}`}
                        aria-describedby={
                          errors.fullName ? "name-error" : undefined
                        }
                        aria-invalid={Boolean(errors.fullName)}
                        placeholder="Sanjukta Rout"
                        value={profile.fullName}
                        onChange={(event) =>
                          updateProfile("fullName", event.target.value)
                        }
                      />
                      {errors.fullName && (
                        <small id="name-error" className="sc-onb-error">
                          {errors.fullName}
                        </small>
                      )}
                    </label>

                    <label className="sc-onb-field">
                      <span className="sc-onb-field-label">Email address</span>
                      <input
                        autoComplete="email"
                        type="email"
                        className={`sc-onb-text ${errors.email ? "is-error" : ""}`}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        aria-invalid={Boolean(errors.email)}
                        placeholder="you@example.com…"
                        value={profile.email}
                        onChange={(event) =>
                          updateProfile("email", event.target.value)
                        }
                      />
                      {errors.email && (
                        <small id="email-error" className="sc-onb-error">
                          {errors.email}
                        </small>
                      )}
                    </label>
                  </div>

                  <button className="sc-onb-cta" type="submit">
                    Continue
                    <ArrowRight size={17} weight="bold" aria-hidden="true" />
                  </button>
                </form>
              )}

              {step === "qualification" && (
                <ChoiceStep
                  eyebrow="Qualification"
                  eyebrowIcon={<SealCheck size={13} weight="bold" />}
                  title="Your nursing qualification"
                  copy="Pick what’s closest. All Indian nursing degrees can be checked for Germany."
                  options={qualificationOptions}
                  selectedValue={profile.qualification}
                  error={errors.qualification}
                  onSelect={(value) => updateProfile("qualification", value)}
                  onContinue={() => submitChoice("qualification", "experience")}
                />
              )}

              {step === "experience" && (
                <ChoiceStep
                  eyebrow="Experience"
                  eyebrowIcon={<Clock size={13} weight="bold" />}
                  title="Your nursing experience"
                  copy="Years of clinical work after your degree. Helps match salary bands."
                  options={experienceOptions}
                  selectedValue={profile.experience}
                  error={errors.experience}
                  onSelect={(value) => updateProfile("experience", value)}
                  onContinue={() => submitChoice("experience", "german")}
                />
              )}

              {step === "german" && (
                <ChoiceStep
                  eyebrow="German level"
                  eyebrowIcon={<Globe size={13} weight="bold" />}
                  title="Where are you with German?"
                  copy="Most Skillcase nurses start from zero. You’re not behind."
                  options={germanLevelOptions}
                  selectedValue={profile.germanLevel}
                  error={errors.germanLevel}
                  continueLabel="Build my roadmap"
                  onSelect={(value) => updateProfile("germanLevel", value)}
                  onContinue={finishOnboarding}
                />
              )}
              {step === "roadmap" && <RoadmapReveal profile={profile} />}
            </section>
          </div>
        </div>

        <aside className="sc-onb-aside" aria-label="A Skillcase success story">
          <AsideCard />
        </aside>
      </main>

      {hasLoaded &&
        profile.fullName &&
        step !== "roadmap" &&
        step !== "welcome" && (
          <div className="sc-onb-return" role="status">
            <SealCheck size={14} weight="bold" aria-hidden="true" />
            Welcome back, {profile.fullName.split(" ")[0]}. Progress saved.
          </div>
        )}
    </div>
  );
}
function Eyebrow({ children, icon }) {
  return (
    <p className="sc-onb-eyebrow">
      {icon && <i aria-hidden="true">{icon}</i>}
      {children}
    </p>
  );
}
function WelcomeScreen({ onStart }) {
  return (
    <main className="sc-onb-welcome">
      <section className="sc-onb-welcome-hero">
        <div className="sc-onb-welcome-copy">
          <span className="sc-onb-welcome-pill">
            <span className="sc-onb-welcome-flag" aria-hidden="true">
              🇩🇪
            </span>
            Now hiring in Germany
          </span>
          <h1>Your Germany nursing career, guided step by step.</h1>
          <p>
            Land a hospital job in Germany at zero recruitment cost. Skillcase
            guides your German classes, documents, interviews and job placement.
          </p>
          <ul className="sc-onb-welcome-checks">
            <li>
              <Check size={14} weight="bold" aria-hidden="true" /> German A1 to
              B2, live classes for nurses
            </li>
            <li>
              <Check size={14} weight="bold" aria-hidden="true" /> 13+ matched
              jobs unlocked at B1
            </li>
            <li>
              <Check size={14} weight="bold" aria-hidden="true" /> Visa, flight
              and first-week support
            </li>
          </ul>
          <button
            className="sc-onb-cta sc-onb-cta-lg"
            type="button"
            onClick={onStart}
          >
            Start free — takes 60 seconds
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className="sc-onb-welcome-stage" aria-hidden="true">
          <div className="sc-onb-welcome-stage-image">
            <ResponsiveImage alt="" src="/assets/images/hero.webp" />
          </div>
          <div className="sc-onb-welcome-stage-card sc-onb-stage-card-top">
            <span className="sc-onb-stage-card-icon">
              <WhatsappLogo size={16} weight="bold" />
            </span>
            <div>
              <strong>Coach Priya</strong>
              <small>“Class starts at 7 PM. See you!”</small>
            </div>
            <em className="sc-onb-stage-pulse" />
          </div>
          <div className="sc-onb-welcome-stage-card sc-onb-stage-card-bottom">
            <div className="sc-onb-stage-trophy">
              <SealCheck size={20} weight="fill" />
            </div>
            <div>
              <strong>Anjana, BSc</strong>
              <small>Just landed a job in Aachen €3,100/mo</small>
            </div>
          </div>
        </div>
      </section>

      <section
        className="sc-onb-welcome-stats"
        aria-label="Skillcase outcomes at a glance"
      >
        <article>
          <strong>₹2.5L+</strong>
          <small>average monthly salary in Germany</small>
        </article>
        <article>
          <strong>13+</strong>
          <small>jobs to preview before B1</small>
        </article>
        <article>
          <strong>0₹</strong>
          <small>recruitment fee from candidates</small>
        </article>
        <article>
          <strong>60s</strong>
          <small>to create your first profile</small>
        </article>
      </section>

      <section
        className="sc-onb-welcome-grid"
        aria-label="What Skillcase helps with"
      >
        {[
          {
            title: "German A1 → B2",
            detail: "Live online classes built for nurses.",
            icon: "globe",
          },
          {
            title: "Documents",
            detail: "Resume, certificates, passport, recognition.",
            icon: "doc",
          },
          {
            title: "Job placement",
            detail: "Preview Germany roles before B1.",
            icon: "case",
          },
          {
            title: "Visa & flight",
            detail: "Hand-holding until your first day.",
            icon: "plane",
          },
        ].map((tile) => (
          <article key={tile.title}>
            <span className="sc-onb-tile-icon" aria-hidden="true">
              <TileGlyph kind={tile.icon} />
            </span>
            <strong>{tile.title}</strong>
            <small>{tile.detail}</small>
          </article>
        ))}
      </section>
    </main>
  );
}
function TileGlyph({ kind }) {
  if (kind === "globe") return <Globe size={20} weight="bold" />;
  if (kind === "doc") return <SealCheck size={20} weight="bold" />;
  if (kind === "case") return <ChatCircleText size={20} weight="bold" />;
  return <ShieldCheck size={20} weight="bold" />;
}
function ChoiceStep({
  copy,
  error,
  eyebrow,
  eyebrowIcon,
  options,
  selectedValue,
  title,
  continueLabel = "Continue",
  onContinue,
  onSelect,
}) {
  return (
    <div className="sc-onb-form sc-onb-choice">
      <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p className="sc-onb-lede">{copy}</p>

      <div className="sc-onb-choice-grid" role="radiogroup" aria-label={title}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              className={`sc-onb-choice-card ${isSelected ? "is-selected" : ""}`}
              role="radio"
              type="button"
              aria-checked={isSelected}
              onClick={() => onSelect(option.value)}
            >
              <span className="sc-onb-choice-text">
                <strong>{option.label}</strong>
                <small>{option.detail}</small>
              </span>
              {option.tag && (
                <em className="sc-onb-choice-tag">{option.tag}</em>
              )}
              <span className="sc-onb-choice-radio" aria-hidden="true">
                {isSelected ? <Check size={13} weight="bold" /> : null}
              </span>
            </button>
          );
        })}
      </div>
      {error && <small className="sc-onb-error">{error}</small>}

      <button className="sc-onb-cta" type="button" onClick={onContinue}>
        {continueLabel}
        <ArrowRight size={17} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
}
function RoadmapReveal({ profile }) {
  const milestones = [
    {
      title: "Today — you’re in",
      detail: `${profile.qualification || "Nursing"} · ${profile.experience || "Experience"} · ${getGermanLabel(profile.germanLevel)}`,
      state: "done",
    },
    {
      title: "German A1 → A2",
      detail: "3 months · live online classes",
      state: "current",
    },
    {
      title: "German B1",
      detail: "3 months · 13+ jobs unlock here",
      state: "next",
    },
    {
      title: "Documents & recognition",
      detail: "2 months · we handle most paperwork",
      state: "next",
    },
    {
      title: "Interview & job offer",
      detail: "1 month · coach-led practice",
      state: "next",
    },
    {
      title: "Visa, flight, first day",
      detail: "≈3 months · end-to-end support",
      state: "next",
    },
  ];
  return (
    <div className="sc-onb-roadmap" aria-live="polite">
      <div className="sc-onb-roadmap-burst" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <Eyebrow icon={<Sparkle size={13} weight="bold" />}>
        Roadmap ready
      </Eyebrow>
      <h1>Welcome, {getFirstName(profile.fullName)}!</h1>
      <p className="sc-onb-lede">
        Here’s your personalised path to Germany. Your details are saved on this
        device. Talk to a Skillcase advisor to discuss your next steps.
      </p>

      <div className="sc-onb-roadmap-card">
        <div className="sc-onb-roadmap-head">
          <span>Estimated journey</span>
          <strong>12–14 months</strong>
        </div>
        <ol className="sc-onb-roadmap-list">
          {milestones.map((m, index) => (
            <li key={m.title} className={`is-${m.state}`}>
              <span className="sc-onb-roadmap-marker" aria-hidden="true">
                {m.state === "done" ? (
                  <Check size={12} weight="bold" />
                ) : (
                  <em>{index + 1}</em>
                )}
              </span>
              <div>
                <strong>{m.title}</strong>
                <small>{m.detail}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="sc-onb-roadmap-proof">
        78 nurses are at a similar starting point this month. You’ll learn
        together in batches.
      </p>
      <a className="sc-onb-cta" href="tel:+919731462667">
        Talk to an advisor
        <ArrowRight size={17} weight="bold" aria-hidden="true" />
      </a>
    </div>
  );
}
function AsideCard() {
  return (
    <div className="sc-onb-aside-success">
      <ResponsiveImage
        alt="Anjana, a Skillcase nurse now working in Aachen, Germany"
        src="/assets/images/testimonial-anjali.webp"
      />
      <Eyebrow icon={<SealCheck size={13} weight="bold" />}>
        Success story
      </Eyebrow>
      <h2>Anjana started at A1. Today she works in Aachen, Germany.</h2>
      <p>
        “Skillcase guided me from my first class to my visa. I had a coach the
        whole way.”
      </p>
      <span className="sc-onb-aside-stat">
        ₹2.85L/mo · Aachen City Hospital
      </span>
    </div>
  );
}
