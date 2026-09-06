import { useRef } from "react";
import {
  AppleLogoIcon as AppleLogo,
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  ArrowUpRightIcon as ArrowUpRight,
  GooglePlayLogoIcon as GooglePlayLogo,
} from "@phosphor-icons/react/ssr";

const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.skillcase.app&hl=en_IN";
const webAppUrl = "https://learner.skillcase.in/start-now";

const screens = [
  {
    phase: "Learn",
    title: "A guided German pathway",
    copy: "Move through practical lessons and challenges from your current level.",
    src: "/assets/images/app-screens/guided-german-pathway.webp",
    alt: "Skillcase app showing a guided German learning pathway with lesson challenges",
    width: 563,
  },
  {
    phase: "Practise",
    title: "One practice hub",
    copy: "Use flashcards, speaking practice, mock tests, reading and listening.",
    src: "/assets/images/app-screens/german-practice-hub.webp",
    alt: "Skillcase app German practice hub with flashcards, mock tests and speaking practice",
    width: 563,
  },
  {
    phase: "Practise",
    title: "Learn through real situations",
    copy: "Build useful vocabulary with audio and guided, everyday scenarios.",
    src: "/assets/images/app-screens/guided-vocabulary-lesson.webp",
    alt: "Skillcase app guided German vocabulary lesson with audio practice",
    width: 585,
  },
  {
    phase: "Track",
    title: "See your progress grow",
    copy: "Keep your learning streak and German vocabulary in one clear view.",
    src: "/assets/images/app-screens/vocabulary-progress.webp",
    alt: "Skillcase app showing German vocabulary progress and words learned",
    width: 585,
  },
  {
    phase: "Improve",
    title: "Actionable speaking feedback",
    copy: "Review pronunciation, fluency, accuracy and what to improve next.",
    src: "/assets/images/app-screens/speaking-feedback.webp",
    alt: "Skillcase app showing detailed feedback for a German speaking exercise",
    width: 563,
  },
  {
    phase: "Prepare",
    title: "Start your job screening",
    copy: "Move from German preparation into your Germany job pathway.",
    src: "/assets/images/app-screens/job-screening-welcome.webp",
    alt: "Skillcase Jobs app welcome screen for starting a Germany job screening",
    width: 585,
  },
  {
    phase: "Apply",
    title: "Know your next job step",
    copy: "Follow documents, interviews and application status without guesswork.",
    src: "/assets/images/app-screens/job-application-progress.webp",
    alt: "Skillcase app showing the progress and status of a Germany job application",
    width: 563,
  },
];

export default function AppJourneyShowcase() {
  const reelRef = useRef(null);

  const moveReel = (direction) => {
    const reel = reelRef.current;
    const card = reel?.querySelector(".app-screen-card");
    if (!reel || !card) return;

    const gap = Number.parseFloat(window.getComputedStyle(reel).columnGap) || 18;
    reel.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section
      className="section app-journey-section"
      id="process"
      aria-labelledby="app-journey-title"
    >
      <div className="app-journey-intro">
        <div className="app-journey-heading">
          <p className="eyebrow">The Skillcase app</p>
          <h2 id="app-journey-title">
            One app. From your first German lesson to your job in Germany.
          </h2>
          <p>
            Learn German, practise for exams and interviews, then manage your
            job journey—all from the same Skillcase account.
          </p>
        </div>
      </div>

      <div className="app-showcase-shell">
        <div className="app-gallery-head">
          <div>
            <span className="app-gallery-dot" aria-hidden="true" />
            Real screens from the Skillcase app
          </div>
          <div className="app-gallery-controls">
            <button
              aria-label="View previous app screen"
              onClick={() => moveReel(-1)}
              type="button"
            >
              <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            </button>
            <button
              aria-label="View next app screen"
              onClick={() => moveReel(1)}
              type="button"
            >
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="app-screen-reel"
          ref={reelRef}
          aria-label="Skillcase app screen gallery"
        >
          {screens.map((screen, index) => (
            <figure
              className="app-screen-card"
              key={screen.src}
              style={{
                "--app-screen-card-width": `${Math.round(
                  (561 * screen.width) / 1266,
                )}px`,
              }}
            >
              <div
                className="app-phone-frame"
                style={{ "--app-screen-ratio": `${screen.width} / 1266` }}
              >
                <img
                  alt={screen.alt}
                  decoding="async"
                  height="1266"
                  loading="lazy"
                  src={screen.src}
                  width={screen.width}
                />
              </div>
              <figcaption>
                <span>
                  {String(index + 1).padStart(2, "0")} · {screen.phase}
                </span>
                <h3>{screen.title}</h3>
                <p>{screen.copy}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="app-download-panel">
        <p className="app-download-kicker">Start on the device you use</p>
        <div className="app-download-actions">
          <a
            className="app-store-cta"
            href={playStoreUrl}
            rel="noreferrer"
            target="_blank"
          >
            <GooglePlayLogo size={24} weight="fill" aria-hidden="true" />
            <span>
              <small>Download on</small>
              <strong>Google Play</strong>
            </span>
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
          <a
            className="app-web-cta"
            href={webAppUrl}
            rel="noreferrer"
            target="_blank"
          >
            <AppleLogo size={24} weight="fill" aria-hidden="true" />
            <span>
              <small>Apple user</small>
              <strong>Use web app</strong>
            </span>
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
