import "../styles/app-plan.css";
import Icon from "./healthcare/Icon.jsx";
import { learnerAppUrl, playStoreUrl } from "../data/appOnboarding.js";

// Phosphor icon names for the plan highlights.
const icons = {
  cards: "cards",
  documents: "file-text",
  describe: "image-square",
  exam: "exam",
  interview: "video-camera",
  jobs: "briefcase",
  listening: "headphones",
  maya: "chat-circle-dots",
  "maya-call": "waveform",
  path: "path",
  reading: "book-open-text",
  speaking: "microphone",
  streak: "fire",
  test: "list-checks",
  timer: "timer",
  training: "chalkboard-teacher",
  trophy: "trophy",
  writing: "pencil-simple-line",
};

const LEVELS = ["A1", "A2", "B1", "B2"];

function formatPhone(phone) {
  return phone.length === 10 ? `${phone.slice(0, 5)} ${phone.slice(5)}` : phone;
}

// The last signup screen: what this learner will find in the app at their
// level and goal, then the download. On desktop the app preview moves into
// the navy side panel (CandidateSignup renders it there).
export default function AppPlanReveal({ profile, plan }) {
  return (
    <div className="sc-onb-complete sc-plan">
      <div className="sc-plan-intro">
        <div className="sc-plan-tags">
          <p className="sc-onb-eyebrow">
            <i aria-hidden="true">
              <Icon name="seal-check" size={13} weight="fill" />
            </i>
            Profile ready
          </p>
          <span className="sc-plan-badge">{plan.badge}</span>
        </div>
        <h1>
          {profile.firstName || "You’re in"}, {plan.headline}
        </h1>
        <p className="sc-onb-lede">{plan.lede}</p>
      </div>

      <AppStage plan={plan} variant="inline" />

      <section className="sc-plan-get" aria-label="Get the Skillcase app">
        <div className="sc-onb-app-actions">
          <a
            className="sc-onb-app-action sc-onb-app-action-primary"
            href={playStoreUrl}
            rel="noreferrer"
            target="_blank"
            aria-label="Download the Skillcase app from Google Play"
          >
            <img
              className="sc-onb-app-brand-logo"
              src="/assets/images/google-play-mark.svg"
              alt=""
              aria-hidden="true"
            />
            <span>
              <small>Download on</small>
              <strong>Google Play</strong>
            </span>
          </a>
          <a
            className="sc-onb-app-action sc-onb-app-action-secondary"
            href={learnerAppUrl}
            rel="noreferrer"
            target="_blank"
            aria-label="Open the Skillcase web app for Apple users"
          >
            <img
              className="sc-onb-app-brand-logo"
              src="/assets/images/apple-mark.svg"
              alt=""
              aria-hidden="true"
            />
            <span>
              <small>Apple user</small>
              <strong>Open the web app</strong>
            </span>
          </a>
        </div>
        {profile.phone && (
          <p className="sc-plan-signin">
            Sign in with <strong>+91 {formatPhone(profile.phone)}</strong>
          </p>
        )}
        {plan.trial && (
          <p className="sc-plan-trial">
            <Icon name="gift" size={16} />
            <span>
              <strong>Free 7-day Premium trial</strong> for new accounts, with
              unlimited practice. No charges during the trial.
            </span>
          </p>
        )}
      </section>

      <section className="sc-plan-section" aria-labelledby="sc-plan-highlights">
        <h2 id="sc-plan-highlights">{plan.highlightsTitle}</h2>
        <ul className="sc-plan-highlights">
          {plan.highlights.map((item) => (
            <li key={item.title}>
              <span className="sc-plan-highlight-icon" aria-hidden="true">
                <Icon name={icons[item.icon]} size={18} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <small>{item.copy}</small>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {plan.road && <LevelRoad road={plan.road} />}

      <a className="btn btn-outline sc-onb-advisor-cta" href="tel:+919731462667">
        <Icon name="phone-call" size={16} />
        Questions? Talk to an advisor
      </a>
    </div>
  );
}

// A1 → B2 with the learner's level marked and B1 flagged as the jobs level.
function LevelRoad({ road }) {
  const currentIndex = LEVELS.indexOf(road.current);
  return (
    <section className="sc-plan-section" aria-labelledby="sc-plan-road">
      <h2 id="sc-plan-road">Your road to a job in Germany</h2>
      <ol
        className="sc-plan-road"
        style={{ "--road-fill": `${(Math.max(currentIndex, 0) / 3) * 100}%` }}
      >
        {LEVELS.map((level, index) => {
          const state =
            index < currentIndex ? "is-done" : index === currentIndex ? "is-now" : "";
          return (
            <li
              key={level}
              className={state || undefined}
              aria-current={index === currentIndex ? "step" : undefined}
            >
              <span className="sc-plan-road-dot" aria-hidden="true">
                {index < currentIndex ? <Icon name="check" size={11} /> : null}
              </span>
              <strong>{level}</strong>
              <small>
                {index === currentIndex
                  ? road.label || "You are here"
                  : level === "B1"
                    ? "Jobs open"
                    : ""}
              </small>
            </li>
          );
        })}
      </ol>
      <p className="sc-plan-road-note">{road.note}</p>
    </section>
  );
}

/* -------------------------------------------------------------------------
   App preview: the screen this learner lands on, rebuilt from the live
   app's own components (NewNavbar, TopModeSwitcher, FeatureCardsGrid,
   B2PracticeHome, LearnGermanHome, JobScreening, ScholarshipHome) with the
   app's own images. It is laid out at the app's 390 px width inside a phone
   frame and scaled to fit, so it reads like a screenshot at any size.
   ------------------------------------------------------------------------- */

const APP_UI = "/assets/images/app-ui";

// TopModeSwitcher's tabs for each kind of screen.
const modeTabs = {
  learn: [
    { lines: ["Guided", "German"], image: "tab-maya" },
    { lines: ["German", "Practice"], image: "tab-book" },
  ],
  jobs: [
    { lines: ["Job Preparation"], image: "tab-book" },
    { lines: ["German Jobs"], image: "tab-bag" },
  ],
  exam: [{ lines: ["Exam"], image: "tab-book" }],
};

function previewLabel({ preview }) {
  if (preview.kind === "grid" || preview.kind === "b2")
    return `The Skillcase app at ${preview.level}: ${preview.cards.map(([title]) => title).join(", ")}`;
  if (preview.kind === "path") return "The Skillcase app's guided German lessons";
  if (preview.kind === "jobs")
    return `Skillcase job screening: ${preview.steps.map(([title]) => title).join(", ")}`;
  return "The Skillcase scholarship exam in the app";
}

// A phone rising into a light band (inline, phones) or pinned in the navy
// side panel (desktop). The band crops the phone and fades it out.
export function AppStage({ plan, variant }) {
  return (
    <div className={`sc-plan-stage-wrap is-${variant}`}>
      <div className="sc-plan-stage" data-kind={plan.preview.kind}>
        <AppPreview plan={plan} />
      </div>
    </div>
  );
}

function AppPreview({ plan }) {
  const { preview } = plan;
  return (
    <div className="sc-device" role="img" aria-label={previewLabel(plan)}>
      <div className="sc-device-frame" aria-hidden="true">
        <span className="sc-device-key is-action" />
        <span className="sc-device-key is-volume-up" />
        <span className="sc-device-key is-volume-down" />
        <span className="sc-device-key is-power" />
        <div className={`sc-device-screen is-${preview.kind}`}>
          <AppTop preview={preview} trial={plan.trial} />
          <div className="sc-app-body">
            {preview.kind === "grid" && <AppCardGrid cards={preview.cards} />}
            {preview.kind === "b2" && <AppB2Home cards={preview.cards} />}
            {preview.kind === "path" && <AppGuidedPath />}
            {preview.kind === "jobs" && <AppJobLobby steps={preview.steps} />}
            {preview.kind === "scholarship" && <AppScholarshipHub />}
          </div>
          <span className="sc-device-island" />
        </div>
      </div>
    </div>
  );
}

// Font icon sized by its parent's font size, so it scales with the phone.
function AppIcon({ name, weight = "bold" }) {
  return <span className={`icon-svg icon-ph ph-${weight} ph-${name}`} />;
}

function AppImage({ name }) {
  return (
    <img src={`${APP_UI}/${name}.webp`} alt="" loading="lazy" decoding="async" />
  );
}

// Status bar, NewNavbar and TopModeSwitcher: the navy top of every hub.
function AppTop({ preview, trial }) {
  return (
    <div className="sc-app-top">
      <div className="sc-app-status">
        <span>9:41</span>
        <svg viewBox="0 0 68 12">
          <rect x="0" y="8" width="3" height="4" rx="0.8" />
          <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.8" />
          <rect x="9" y="3" width="3" height="9" rx="0.8" />
          <rect x="13.5" y="0.5" width="3" height="11.5" rx="0.8" />
          <path d="M33 2.2c2.3 0 4.4.9 6 2.3l-1.2 1.3A6.9 6.9 0 0 0 33 4c-1.8 0-3.5.7-4.8 1.8L27 4.5a8.8 8.8 0 0 1 6-2.3Zm0 3.6c1.3 0 2.5.5 3.4 1.3l-1.2 1.3a3.2 3.2 0 0 0-4.4 0l-1.2-1.3c.9-.8 2.1-1.3 3.4-1.3Zm0 3.5 1.3 1.4L33 12l-1.3-1.3L33 9.3Z" />
          <rect x="44" y="0.6" width="21" height="10.8" rx="3.2" fill="none" stroke="currentColor" strokeOpacity="0.45" />
          <rect x="45.8" y="2.4" width="17.4" height="7.2" rx="1.9" />
          <path d="M66.4 4.2v3.6c.8-.3 1.3-1 1.3-1.8s-.5-1.5-1.3-1.8Z" opacity="0.45" />
        </svg>
      </div>
      <div className="sc-app-nav">
        <span className="sc-app-nav-title">
          <b>
            {preview.kind === "scholarship"
              ? "Scholarship Exam"
              : `${preview.level} German Level`}
          </b>
          <small>German for Career Growth</small>
        </span>
        <span className="sc-app-nav-tools">
          {trial ? (
            <span className="sc-app-plan-pill">
              <span className="sc-app-trial-ring">07</span>
              days left
            </span>
          ) : (
            <span className="sc-app-plan-pill">
              <span className="sc-app-gift">
                <AppIcon name="gift" />
              </span>
              Free Plan
            </span>
          )}
          <svg className="sc-app-avatar" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="50" fill="#D1D5DB" />
            <circle cx="50" cy="38" r="16" fill="#9CA3AF" />
            <ellipse cx="50" cy="78" rx="28" ry="20" fill="#9CA3AF" />
          </svg>
        </span>
      </div>
      <div className="sc-app-tabs">
        {modeTabs[preview.tabs].map((tab, index) => (
          <span
            key={tab.lines.join(" ")}
            className={`sc-app-tab ${index === preview.activeTab ? "is-active" : ""} ${tab.lines.length === 1 ? "is-single" : ""}`}
          >
            <AppImage name={tab.image} />
            <span>
              {tab.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// FeatureCardsGrid: three photo cards across.
function AppCardGrid({ cards }) {
  return (
    <div className="sc-app-grid">
      {cards.map(([title, text, image]) => (
        <span className="sc-app-card" key={title}>
          <AppImage name={image} />
          <b>{title}</b>
          <small>{text}</small>
        </span>
      ))}
    </div>
  );
}

// B2PracticeHome: the placement test, then practice by skill.
function AppB2Home({ cards }) {
  return (
    <div className="sc-app-b2">
      <span className="sc-app-b2-test">
        <img src="/assets/images/app-maya-wave.webp" alt="" loading="lazy" decoding="async" />
        <span>
          <small>Your test</small>
          <b>Test 1</b>
          <span>Your first test is ready.</span>
        </span>
        <AppIcon name="caret-right" />
      </span>
      <span className="sc-app-b2-head">
        <b>Practise by skill</b>
        <small>Short practice from real exams</small>
      </span>
      <span className="sc-app-b2-grid">
        {cards.map(([title, text, image]) => (
          <span className="sc-app-b2-card" key={title}>
            <AppImage name={image} />
            <b>{title}</b>
            <small>{text}</small>
          </span>
        ))}
      </span>
      <span className="sc-app-b2-exam">
        <span>
          <b>Full exam practice</b>
          <small>Real Goethe and telc exams, with a timer</small>
        </span>
        <em>Start</em>
      </span>
    </div>
  );
}

// LearnGermanHome: zig-zag lesson cards on a road, the first one open.
function AppGuidedPath() {
  return (
    <div className="sc-app-path">
      <svg className="sc-app-road" viewBox="0 0 342 520" preserveAspectRatio="none">
        <path d="M110 150 C 110 300, 232 250, 232 420" />
      </svg>
      <span className="sc-app-lesson is-open">
        <AppImage name="lesson-bakery" />
        <small>Level 1</small>
        <b>The bakery window</b>
        <em>Start challenge</em>
      </span>
      <span className="sc-app-lesson is-locked">
        <i className="sc-app-lesson-lock">
          <AppIcon name="lock-simple" />
        </i>
        <span className="sc-app-lesson-art" />
        <small>Level 2</small>
      </span>
    </div>
  );
}

// JobScreening lobby: progress ring and the pipeline steps.
function AppJobLobby({ steps }) {
  return (
    <div className="sc-app-jobs">
      <div className="sc-app-jobs-head">
        <span>
          <b>Your job progress</b>
          <small>Next step - {steps[0][1]}</small>
        </span>
        <span className="sc-app-jobs-ring">
          <b>0/7</b>
          <small>Done</small>
        </span>
      </div>
      <ol className="sc-app-steps">
        {steps.map(([title, text], index) => (
          <li key={title} className={index === 0 ? "is-next" : "is-locked"}>
            <i>{index === 0 ? "1" : <AppIcon name="lock-simple" />}</i>
            <span className="sc-app-step">
              <span>
                <b>{title}</b>
                <small>{text}</small>
              </span>
              <em>{index === 0 ? "pending" : "locked"}</em>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ScholarshipHome: banner with Maya, the exam title and Start Exam.
function AppScholarshipHub() {
  return (
    <div className="sc-app-scholar">
      <span className="sc-app-scholar-banner">
        <img src="/assets/images/app-maya-wave.webp" alt="" loading="lazy" decoding="async" />
      </span>
      <span className="sc-app-scholar-title">
        <em>
          <AppIcon name="sparkle" />
          Exam
        </em>
        <b>Scholarship Exam</b>
        <small>One attempt per candidate · take it when you’re ready</small>
      </span>
      <span className="sc-app-scholar-ready">
        <AppIcon name="check-circle" weight="fill" />
        <span>
          <b>Ready when you are</b>
          <small>Read the instructions and start when you are ready.</small>
        </span>
      </span>
      <span className="sc-app-scholar-start">Start Exam</span>
    </div>
  );
}
