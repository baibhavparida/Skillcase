import ResponsiveImage from "./ResponsiveImage.jsx";
import AppPlanReveal, { AppStage } from "./AppPlanReveal.jsx";
import React, { useEffect, useRef, useState } from "react";
import Icon from "./healthcare/Icon.jsx";
import {
  GERMAN_STATUS,
  INDIAN_MOBILE_REGEX,
  PREFERENCE,
  builtinPathway,
  germanLevels,
  germanStatusOptions,
  hasOtherPathways,
  learnerAppUrl,
  levelFor,
  occupationForRole,
  occupations,
  pathways,
} from "../data/appOnboarding.js";
import { planFor } from "../data/appPlans.js";

// Answers use the app's own field names (see appOnboarding.js). The old
// website-only profile (full name, email, qualification) lived under the
// legacy key; only the phone and name carry over from it.
const STORAGE_KEY = "skillcase_onboarding_profile";
const LEGACY_STORAGE_KEY = "skillcase_candidate_profile";

const defaultProfile = {
  phone: "",
  firstName: "",
  lastName: "",
  occupation: "",
  pathwayId: builtinPathway?.id ?? null,
  germanStatus: "",
  germanLevel: "",
  germanPreference: "",
  whatsappOptIn: true,
};

const stepTitles = {
  phone: "Phone",
  otp: "Verify",
  name: "Name",
  occupation: "Occupation",
  pathway: "Goal",
  status: "German",
  level: "Level",
  preference: "Preference",
  goal: "Path",
};

// The app's branching (OnboardingFlow.jsx): a non-Jobs pathway ends the
// questions; "Yet to start" skips the level; "completed" ends at the level
// (job screening); B1/B2 learners choose practice or a job; A1/A2 learners
// choose learn or practice. Until the German status is known, assume the
// longest route so the step count never jumps backwards.
function stepsFor(profile) {
  const steps = ["phone", "otp", "name", "occupation"];
  if (hasOtherPathways) steps.push("pathway");
  const pathway = pathways.find((item) => item.id === profile.pathwayId);
  if (pathway && !pathway.isBuiltin) return steps;
  steps.push("status");
  if (profile.germanStatus === GERMAN_STATUS.notStarted) {
    return [...steps, "preference"];
  }
  steps.push("level");
  if (profile.germanStatus === GERMAN_STATUS.completed) return steps;
  const level = levelFor(profile.germanLevel);
  return [...steps, level && level.rank >= 3 ? "goal" : "preference"];
}

// Levels offered on the level step: someone who has completed German picks
// B1 or B2 only, exactly as in the app.
function levelsFor(germanStatus) {
  return germanStatus === GERMAN_STATUS.completed
    ? germanLevels.filter((level) => level.rank >= 3)
    : germanLevels;
}

function readStoredProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultProfile, ...JSON.parse(raw) };
    const legacy = JSON.parse(
      window.localStorage.getItem(LEGACY_STORAGE_KEY) || "null",
    );
    if (!legacy) return null;
    const [firstName = "", ...rest] = String(legacy.fullName || "")
      .trim()
      .split(/\s+/);
    return {
      ...defaultProfile,
      phone: onlyDigits(String(legacy.phone || "")),
      firstName,
      lastName: rest.join(" "),
    };
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

export default function CandidateSignup() {
  // Users arrive here straight from the homepage CTA, already sold. Start them
  // on the first real step (phone) instead of behind a redundant welcome gate.
  const [step, setStep] = useState("phone");
  const [profile, setProfile] = useState(defaultProfile);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [errors, setErrors] = useState({});
  // Set only when this device already had saved answers, so the "welcome
  // back" note never greets someone who typed their name a moment ago.
  const [isReturning, setIsReturning] = useState(false);
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
    const role = new URLSearchParams(window.location.search).get("role");
    const roleOccupation = occupationForRole(role);
    if (stored || roleOccupation) {
      setProfile((current) => {
        const next = { ...current, ...stored };
        if (roleOccupation && !next.occupation) next.occupation = roleOccupation;
        return next;
      });
    }
    setIsReturning(Boolean(stored?.firstName));
  }, []);
  useEffect(() => {
    if (step === "otp") {
      const t = window.setTimeout(() => otpRefs.current[0]?.focus(), 80);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [step]);

  const steps = stepsFor(profile);
  const stepIndex = steps.indexOf(step) + 1;
  const plan = step === "complete" ? planFor(profile) : null;
  const isLastQuestion = steps[steps.length - 1] === step;
  const finishLabel = isLastQuestion ? "Complete my profile" : "Continue";

  const updateProfile = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));
    setErrors((e) => {
      const { [field]: _, ...rest } = e;
      return rest;
    });
  };
  // Save every answer, then move to the next question on this profile's
  // route, or to the app plan after the last one.
  const advance = (nextProfile) => {
    const route = stepsFor(nextProfile);
    const nextStep = route[route.indexOf(step) + 1] || "complete";
    writeStoredProfile(nextProfile);
    setProfile(nextProfile);
    setErrors({});
    setStep(nextStep);
  };
  const goBack = () => {
    const i = steps.indexOf(step);
    // First step has no prior screen, so Back returns to the marketing site.
    if (i <= 0) {
      window.location.assign("/");
      return;
    }
    setErrors({});
    setStep(steps[i - 1]);
  };
  const submitPhone = (event) => {
    event.preventDefault();
    const phone = onlyDigits(profile.phone);
    if (!INDIAN_MOBILE_REGEX.test(phone)) {
      setErrors({
        phone: "Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9.",
      });
      return;
    }
    advance({ ...profile, phone });
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
    advance(profile);
  };
  const submitName = (event) => {
    event.preventDefault();
    const firstName = profile.firstName.trim();
    const lastName = profile.lastName.trim();
    const next = {};
    if (!firstName) next.firstName = "Add your first name.";
    if (!lastName) next.lastName = "Add your last name.";
    if (Object.keys(next).length) return setErrors(next);
    advance({ ...profile, firstName, lastName });
  };
  const requireChoice = (field) => {
    if (profile[field]) return true;
    setErrors({ [field]: "Choose one option to continue." });
    return false;
  };
  const submitOccupation = () => {
    if (requireChoice("occupation")) advance(profile);
  };
  const submitPathway = () => {
    if (requireChoice("pathwayId")) advance(profile);
  };
  // Same side effects as the app: new learners are steered to guided lessons,
  // learners default to practice, and the level is cleared when it no longer
  // applies.
  const submitStatus = () => {
    if (!requireChoice("germanStatus")) return;
    const { germanStatus, germanLevel } = profile;
    if (germanStatus === GERMAN_STATUS.notStarted) {
      advance({
        ...profile,
        germanLevel: "",
        germanPreference: PREFERENCE.learn,
      });
      return;
    }
    const stillOffered = levelsFor(germanStatus).some(
      (level) => level.value === germanLevel,
    );
    advance({ ...profile, germanLevel: stillOffered ? germanLevel : "" });
  };
  const submitLevel = () => {
    if (!requireChoice("germanLevel")) return;
    const level = levelFor(profile.germanLevel);
    let germanPreference = PREFERENCE.practice;
    if (profile.germanStatus === GERMAN_STATUS.completed) {
      germanPreference = PREFERENCE.job;
    } else if (level.rank >= 3) {
      // B1/B2 learners pick practice or a job on the next screen.
      germanPreference = "";
    }
    advance({ ...profile, germanPreference });
  };
  const submitPreference = () => {
    if (requireChoice("germanPreference")) advance(profile);
  };

  const isNewToGerman = profile.germanStatus === GERMAN_STATUS.notStarted;
  const learnOption = {
    value: PREFERENCE.learn,
    label: "Start learning German",
    detail: "Guided lessons, step by step",
    icon: "path",
  };
  const practiceOption = {
    value: PREFERENCE.practice,
    label: "Practice my German",
    detail: "Flashcards, speaking and tests",
    icon: "cards",
  };
  // The app recommends guided lessons to new learners and practice to
  // everyone else, and lists the recommended option first.
  const preferenceOptions = isNewToGerman
    ? [{ ...learnOption, tag: "Recommended" }, practiceOption]
    : [{ ...practiceOption, tag: "Recommended" }, learnOption];
  const goalOptions = [
    {
      value: PREFERENCE.practice,
      label: "Practice my German",
      detail: "Keep building toward your exam",
      icon: "cards",
    },
    {
      value: PREFERENCE.job,
      label: "Apply for a job",
      detail: "Start your job screening in the app",
      icon: "briefcase",
    },
  ];

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
            <Icon name="shield-check" size={14} /> Free, zero recruitment cost
          </span>
          <a
            className="sc-onb-call"
            href="tel:+919731462667"
            aria-label="Call Skillcase"
          >
            <Icon name="phone-call" size={16} />
            <span>Call</span>
          </a>
        </div>
      </header>

      <main className="sc-onb-flow" aria-live="polite">
        <div className="sc-onb-main">
          {step !== "complete" && (
            <div
              className="sc-onb-flow-rail"
              aria-label={`Step ${stepIndex} of ${steps.length}`}
            >
              <button className="sc-onb-back" type="button" onClick={goBack}>
                <Icon name="arrow-left" size={16} />
                <span>Back</span>
              </button>
              <div className="sc-onb-stepper">
                {steps.map((item, index) => {
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
                <em>of {steps.length}</em>
              </strong>
            </div>
          )}

          <div className="sc-onb-canvas">
            <section className="sc-onb-panel" ref={panelRef}>
              {step === "phone" && (
                <form className="sc-onb-form" onSubmit={submitPhone} noValidate>
                  <Eyebrow icon={<Icon name="shield-check" size={13} />}>
                    Your number
                  </Eyebrow>
                  <h1>Let’s start with your number</h1>
                  <p className="sc-onb-lede">
                    Use the number you’ll sign in to the Skillcase app with.
                    We’ll send a 6-digit code to verify it.
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
                    <input
                      checked={profile.whatsappOptIn}
                      type="checkbox"
                      onChange={(event) =>
                        updateProfile("whatsappOptIn", event.target.checked)
                      }
                    />
                    <span>
                      Yes, send me free class invites, job alerts and visa news
                      on WhatsApp. I can stop anytime.
                    </span>
                  </label>

                  <button className="sc-onb-cta" type="submit">
                    Send OTP
                    <Icon name="arrow-right" size={17} />
                  </button>
                  <p className="sc-onb-login-prompt">
                    Already signed up?{" "}
                    <a href={learnerAppUrl} rel="noreferrer" target="_blank">
                      Log in instead
                    </a>
                  </p>
                  <p className="sc-onb-fineprint">
                    We never share your number.{" "}
                    <a href="/privacy-policy/">Privacy policy</a>.
                  </p>
                </form>
              )}

              {step === "otp" && (
                <form className="sc-onb-form" onSubmit={submitOtp} noValidate>
                  <Eyebrow icon={<Icon name="shield-check" size={13} />}>
                    Verify phone
                  </Eyebrow>
                  <h1>Enter the 6-digit code</h1>
                  <p className="sc-onb-lede">
                    Sent to <strong>+91 {profile.phone}</strong>. For now any 6
                    digits work.
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
                      <Icon name="phone-call" size={13} />{" "}
                      Verify by call
                    </a>
                  </div>

                  <button className="sc-onb-cta" type="submit">
                    Verify and continue
                    <Icon name="arrow-right" size={17} />
                  </button>
                </form>
              )}

              {step === "name" && (
                <form className="sc-onb-form" onSubmit={submitName} noValidate>
                  <Eyebrow icon={<Icon name="user" size={13} />}>
                    Your name
                  </Eyebrow>
                  <h1>What should we call you?</h1>
                  <p className="sc-onb-lede">
                    Enter your first and last name.
                  </p>

                  <div className="sc-onb-field-grid sc-onb-name-grid">
                    <label className="sc-onb-field">
                      <span className="sc-onb-field-label">First name</span>
                      <input
                        autoComplete="given-name"
                        className={`sc-onb-text ${errors.firstName ? "is-error" : ""}`}
                        aria-describedby={
                          errors.firstName ? "first-name-error" : undefined
                        }
                        aria-invalid={Boolean(errors.firstName)}
                        placeholder="Asha"
                        value={profile.firstName}
                        onChange={(event) =>
                          updateProfile("firstName", event.target.value)
                        }
                      />
                      {errors.firstName && (
                        <small id="first-name-error" className="sc-onb-error">
                          {errors.firstName}
                        </small>
                      )}
                    </label>

                    <label className="sc-onb-field">
                      <span className="sc-onb-field-label">Last name</span>
                      <input
                        autoComplete="family-name"
                        className={`sc-onb-text ${errors.lastName ? "is-error" : ""}`}
                        aria-describedby={
                          errors.lastName ? "last-name-error" : undefined
                        }
                        aria-invalid={Boolean(errors.lastName)}
                        placeholder="Nair"
                        value={profile.lastName}
                        onChange={(event) =>
                          updateProfile("lastName", event.target.value)
                        }
                      />
                      {errors.lastName && (
                        <small id="last-name-error" className="sc-onb-error">
                          {errors.lastName}
                        </small>
                      )}
                    </label>
                  </div>

                  <button className="sc-onb-cta" type="submit">
                    Continue
                    <Icon name="arrow-right" size={17} />
                  </button>
                </form>
              )}

              {step === "occupation" && (
                <ChoiceStep
                  eyebrow="Occupation"
                  eyebrowIcon={<Icon name="stethoscope" size={13} />}
                  title="What do you do?"
                  copy="Choose your current occupation."
                  options={occupations}
                  selectedValue={profile.occupation}
                  error={errors.occupation}
                  continueLabel={finishLabel}
                  onSelect={(value) => updateProfile("occupation", value)}
                  onContinue={submitOccupation}
                />
              )}

              {step === "pathway" && (
                <ChoiceStep
                  eyebrow="Your goal"
                  eyebrowIcon={<Icon name="target" size={13} />}
                  title="What are you here for?"
                  copy="Choose what you want to do in the Skillcase app."
                  options={pathways.map((pathway) => ({
                    value: pathway.id,
                    label: pathway.title,
                    detail: pathway.detail,
                    tag: pathway.badge,
                    icon: pathway.isBuiltin ? "briefcase" : "trophy",
                  }))}
                  selectedValue={profile.pathwayId}
                  error={errors.pathwayId}
                  continueLabel={finishLabel}
                  onSelect={(value) => updateProfile("pathwayId", value)}
                  onContinue={submitPathway}
                />
              )}

              {step === "status" && (
                <ChoiceStep
                  eyebrow="German"
                  eyebrowIcon={<Icon name="globe" size={13} />}
                  title="Where are you with German?"
                  copy="There’s no wrong answer. The app starts you from here."
                  options={germanStatusOptions}
                  selectedValue={profile.germanStatus}
                  error={errors.germanStatus}
                  continueLabel={finishLabel}
                  onSelect={(value) => updateProfile("germanStatus", value)}
                  onContinue={submitStatus}
                />
              )}

              {step === "level" && (
                <ChoiceStep
                  eyebrow="German level"
                  eyebrowIcon={<Icon name="globe" size={13} />}
                  title="What is your current German level?"
                  copy={
                    profile.germanStatus === GERMAN_STATUS.completed
                      ? "Pick the level you completed."
                      : "Pick the one that sounds most like you."
                  }
                  options={levelsFor(profile.germanStatus).map((level) => ({
                    value: level.value,
                    label: level.label,
                    detail: level.detail,
                    visual: <LevelBars rank={level.rank} />,
                  }))}
                  selectedValue={profile.germanLevel}
                  error={errors.germanLevel}
                  continueLabel={finishLabel}
                  onSelect={(value) => updateProfile("germanLevel", value)}
                  onContinue={submitLevel}
                />
              )}

              {step === "preference" && (
                <ChoiceStep
                  eyebrow="Your plan"
                  eyebrowIcon={<Icon name="path" size={13} />}
                  title={
                    isNewToGerman
                      ? "How would you like to begin?"
                      : "How would you like to continue?"
                  }
                  copy={
                    isNewToGerman
                      ? "Great start! We recommend guided lessons that teach German from the basics."
                      : "You already know some German. Practise at your level, or follow guided lessons."
                  }
                  options={preferenceOptions}
                  selectedValue={profile.germanPreference}
                  error={errors.germanPreference}
                  continueLabel={finishLabel}
                  onSelect={(value) => updateProfile("germanPreference", value)}
                  onContinue={submitPreference}
                />
              )}

              {step === "goal" && (
                <ChoiceStep
                  eyebrow="Your path"
                  eyebrowIcon={<Icon name="path" size={13} />}
                  title="Which path would you like to take?"
                  copy="You already have intermediate German. Keep practising, or start applying for jobs."
                  options={goalOptions}
                  selectedValue={profile.germanPreference}
                  error={errors.germanPreference}
                  continueLabel={finishLabel}
                  onSelect={(value) => updateProfile("germanPreference", value)}
                  onContinue={submitPreference}
                />
              )}

              {plan && <AppPlanReveal profile={profile} plan={plan} />}
            </section>
          </div>
        </div>

        <aside
          className={`sc-onb-aside ${plan ? "sc-plan-aside" : ""}`}
          aria-label={plan ? "Your Skillcase app" : "A Skillcase success story"}
        >
          {plan ? <AppStage plan={plan} variant="aside" /> : <AsideCard />}
        </aside>
      </main>

      {isReturning && profile.firstName && step !== "complete" && (
        <div className="sc-onb-return" role="status">
          <Icon name="seal-check" size={14} />
          Welcome back, {profile.firstName}. Progress saved.
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
// Four rising bars, filled up to the level, like the app's level picker.
function LevelBars({ rank }) {
  return (
    <span className="sc-onb-level-bars" aria-hidden="true">
      {[1, 2, 3, 4].map((bar) => (
        <i key={bar} className={bar <= rank ? "is-on" : undefined} />
      ))}
    </span>
  );
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

      <div
        className={`sc-onb-choice-grid ${options.some((option) => option.tag) ? "has-tags" : ""}`}
        role="radiogroup"
        aria-label={title}
      >
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const visual =
            option.visual || (option.icon && <Icon name={option.icon} size={18} />);
          return (
            <button
              key={option.value}
              className={`sc-onb-choice-card ${visual ? "has-visual" : ""} ${isSelected ? "is-selected" : ""}`}
              role="radio"
              type="button"
              aria-checked={isSelected}
              onClick={() => onSelect(option.value)}
            >
              {visual && (
                <span className="sc-onb-choice-visual" aria-hidden="true">
                  {visual}
                </span>
              )}
              <span className="sc-onb-choice-text">
                <strong>{option.label}</strong>
                {option.detail && <small>{option.detail}</small>}
              </span>
              {option.tag && <em className="sc-onb-choice-tag">{option.tag}</em>}
              <span className="sc-onb-choice-check" aria-hidden="true">
                <Icon name="check" size={12} />
              </span>
            </button>
          );
        })}
      </div>
      {error && <small className="sc-onb-error">{error}</small>}

      <button className="sc-onb-cta" type="button" onClick={onContinue}>
        {continueLabel}
        <Icon name="arrow-right" size={17} />
      </button>
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
      <Eyebrow icon={<Icon name="seal-check" size={13} />}>
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
