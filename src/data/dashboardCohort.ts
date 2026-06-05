import type {
  CohortLayout,
  GermanLevel,
  LevelMeta,
  QuickWin,
} from "./dashboardTypes";
import { levelRank } from "./dashboardStorage";

export const GERMAN_LEVELS: LevelMeta[] = [
  { value: "not_started", label: "Not started", shortLabel: "Start", rank: 0 },
  { value: "a1_completed", label: "A1 completed", shortLabel: "A1", rank: 1 },
  { value: "a2_completed", label: "A2 completed", shortLabel: "A2", rank: 2 },
  { value: "b1_in_progress", label: "B1 in progress", shortLabel: "B1*", rank: 3 },
  { value: "b1_completed", label: "B1 completed", shortLabel: "B1", rank: 4 },
  { value: "b2_in_progress", label: "B2 in progress", shortLabel: "B2*", rank: 5 },
  { value: "b2_completed", label: "B2 completed", shortLabel: "B2", rank: 6 },
];

export function getLevelMeta(level: GermanLevel): LevelMeta {
  return GERMAN_LEVELS.find((l) => l.value === level) ?? GERMAN_LEVELS[0];
}

const QW = {
  bookDemo: (): QuickWin => ({ label: "Book free demo class", detail: "Today 7 PM IST", iconKey: "calendar", action: { kind: "tab", tab: "learn" } }),
  watchExplainer: (): QuickWin => ({ label: "Watch 2-min explainer", detail: "How the path works", iconKey: "play", action: { kind: "url", url: "https://wa.me/919731462667", external: true } }),
  talkPlaced: (): QuickWin => ({ label: "Talk to a placed nurse", detail: "WhatsApp introduction", iconKey: "whatsapp", action: { kind: "url", url: "https://wa.me/919731462667", external: true } }),
  completeProfile: (pct: number): QuickWin => ({ label: "Complete profile", detail: `${pct}% filled`, iconKey: "clipboard", action: { kind: "tab", tab: "profile" } }),
  continueGerman: (level: string): QuickWin => ({ label: "Continue German", detail: level, iconKey: "graduation", action: { kind: "tab", tab: "learn" } }),
  vocabDrill: (): QuickWin => ({ label: "Today's vocab drill", detail: "5 words · 3 minutes", iconKey: "sparkle", action: { kind: "url", url: "https://wa.me/919731462667", external: true } }),
  previewJobs: (): QuickWin => ({ label: "Preview Germany jobs", detail: "13+ unlock at B1", iconKey: "briefcase", action: { kind: "tab", tab: "jobs" } }),
  coach: (msg: string): QuickWin => ({ label: "Talk to coach", detail: msg, iconKey: "whatsapp", action: { kind: "url", url: "https://wa.me/919731462667", external: true } }),
  startDocs: (): QuickWin => ({ label: "Start documents", detail: "Passport + degree first", iconKey: "file", action: { kind: "tab", tab: "documents" } }),
  anerkennung: (): QuickWin => ({ label: "Anerkennung help", detail: "Recognition paperwork", iconKey: "shield", action: { kind: "url", url: "https://wa.me/919731462667", external: true } }),
  b1Mock: (): QuickWin => ({ label: "B1 readiness check", detail: "10-min self-test", iconKey: "trophy", action: { kind: "url", url: "https://wa.me/919731462667", external: true } }),
  examPlan: (): QuickWin => ({ label: "B1 exam plan", detail: "Pick a date with coach", iconKey: "calendar", action: { kind: "url", url: "https://wa.me/919731462667", external: true } }),
  docsProgress: (pct: number): QuickWin => ({ label: "Your documents", detail: `${pct}% ready`, iconKey: "file", action: { kind: "tab", tab: "documents" } }),
  applyNow: (matched: number): QuickWin => ({ label: "Apply with profile", detail: `${matched} matched roles`, iconKey: "briefcase", action: { kind: "tab", tab: "jobs" } }),
  bookInterview: (): QuickWin => ({ label: "Book mock interview", detail: "30-min with coach", iconKey: "chat", action: { kind: "tab", tab: "learn" } }),
  placement: (): QuickWin => ({ label: "Talk to placement coach", detail: "Hannah · responds in 3h", iconKey: "whatsapp", action: { kind: "url", url: "https://wa.me/919731462667", external: true } }),
  specialty: (): QuickWin => ({ label: "Add your specialty", detail: "ICU / OR / Paeds", iconKey: "stethoscope", action: { kind: "tab", tab: "profile" } }),
  salary: (): QuickWin => ({ label: "Salary calculator", detail: "₹ vs € over 5 years", iconKey: "money", action: { kind: "tab", tab: "profile" } }),
  family: (): QuickWin => ({ label: "Add family details", detail: "Spouse + kids relocation", iconKey: "shield", action: { kind: "tab", tab: "profile" } }),
  visa: (): QuickWin => ({ label: "Visa & flight checklist", detail: "After your first offer", iconKey: "shield", action: { kind: "tab", tab: "applications" } }),
};

export type CohortInputs = {
  level: GermanLevel;
  profileCompleteness: number;
  documentReadiness: number;
  matchedJobsCount: number;
  applicationsCount: number;
};

/**
 * Three intent buckets drive the home feed. ~95% of signups are absolute
 * beginners, so the default experience optimizes for them.
 *   not_started → activate (free hooks first, then the paid course)
 *   learning (A1–A2) → convert & retain (pathway + paid course, keep learning)
 *   job_ready (B1–B2) → place (jobs, interview, profile/docs readiness)
 */
export type CohortBucket = "not_started" | "learning" | "job_ready";

export function getCohortBucket(level: GermanLevel): CohortBucket {
  const rank = levelRank(level);
  if (rank === 0) return "not_started";
  if (rank <= 2) return "learning";
  return "job_ready";
}

/** Hero (today_focus) always leads; the rest follows each bucket's intent. */
function bucketHomeBlocks(level: GermanLevel): CohortLayout["homeBlocks"] {
  switch (getCohortBucket(level)) {
    case "not_started":
      return ["progress_pathway", "today_focus", "free_webinar", "quad_actions", "checklist", "testimonials_marquee"];
    case "learning":
      return ["progress_pathway", "today_focus", "free_webinar", "quad_actions", "checklist", "testimonials_marquee"];
    case "job_ready": {
      const blocks: CohortLayout["homeBlocks"] = ["progress_pathway", "today_focus", "matched_jobs", "interview_practice", "profile_docs"];
      // B2 already done with language — no "resume your German course".
      if (levelRank(level) < 6) blocks.push("join_course");
      blocks.push("testimonials_marquee", "guidance");
      return blocks;
    }
  }
}

export function getCohortLayout(input: CohortInputs): CohortLayout {
  const { level, profileCompleteness, documentReadiness, matchedJobsCount, applicationsCount } = input;
  const meta = getLevelMeta(level);

  // Home feed order is driven by the 3 intent buckets (hero stays per-level).
  const homeBlocks = bucketHomeBlocks(level);

  // Shared visibility flags
  const showDocuments = levelRank(level) >= 2; // a2+
  const showApplications = levelRank(level) >= 4; // b1_completed+
  const showFamily = levelRank(level) >= 6; // b2_completed
  const showPremiumJobs = levelRank(level) >= 5; // b2_in_progress+

  // Bottom tab choice
  let bottomTabs: CohortLayout["bottomTabs"];
  if (levelRank(level) >= 4) {
    bottomTabs = ["home", "jobs", "documents", "applications"];
  } else if (levelRank(level) >= 2) {
    bottomTabs = ["home", "learn", "documents", "profile"];
  } else {
    bottomTabs = ["home", "learn", "jobs", "profile"];
  }

  switch (level) {
    case "not_started":
      return {
        todayFocus: {
          eyebrow: "Start here",
          title: "Book your free German demo class",
          copy: "Germany roles need B1. Begin with a 30-minute nurse-friendly demo, then continue weekly. No commitment, no payment.",
          cta: "Book free class",
          ctaTab: "learn",
          meta: "Today 7 PM IST · 12 nurses joining",
          tone: "start",
          secondaryCta: { label: "Watch 2-min explainer", url: "https://wa.me/919731462667" },
        },
        quickWins: [QW.bookDemo(), QW.watchExplainer(), QW.talkPlaced(), QW.completeProfile(profileCompleteness)],
        showDocuments, showApplications, showFamily, showPremiumJobs,
        bottomTabs,
        homeBlocks,
        learnEmphasis: "demo",
      };

    case "a1_completed":
      return {
        todayFocus: {
          eyebrow: "Keep your streak",
          title: "A2 class Tuesday & Thursday",
          copy: "You finished A1, that's 14% of the way. Today's 5-minute drill is on WhatsApp. Don't break the streak.",
          cta: "Open today's drill",
          ctaTab: "learn",
          meta: "Batch 24-Mumbai · 18 nurses",
          tone: "build",
          secondaryCta: { label: "View class schedule", tab: "learn" },
        },
        quickWins: [QW.continueGerman(meta.label), QW.vocabDrill(), QW.previewJobs(), QW.coach("Anu replies in 2h")],
        showDocuments, showApplications, showFamily, showPremiumJobs,
        bottomTabs,
        homeBlocks,
        learnEmphasis: "weekly",
      };

    case "a2_completed":
      return {
        todayFocus: {
          eyebrow: "You're halfway",
          title: "Continue B1, start your documents now",
          copy: "A2 done. From here, B1 prep and documents run in parallel. Your nursing certificate and passport take time to gather.",
          cta: "Open documents",
          ctaTab: "documents",
          meta: `Documents · ${documentReadiness}% started · Anerkennung paperwork starts now`,
          tone: "build",
          secondaryCta: { label: "Continue German class", tab: "learn" },
        },
        quickWins: [QW.continueGerman(meta.label), QW.startDocs(), QW.anerkennung(), QW.previewJobs()],
        showDocuments, showApplications, showFamily, showPremiumJobs,
        bottomTabs,
        homeBlocks,
        learnEmphasis: "b1_prep",
      };

    case "b1_in_progress":
      return {
        todayFocus: {
          eyebrow: "Final stretch",
          title: "Take your B1 readiness check",
          copy: "10 minutes. We'll tell you which skill to focus on before the exam. Mock speaking class is Friday.",
          cta: "Start B1 readiness check",
          ctaTab: "learn",
          meta: "12 nurses in your batch passed B1 last month",
          tone: "almost",
          secondaryCta: { label: "Your B1 exam plan", tab: "learn" },
        },
        quickWins: [QW.b1Mock(), QW.examPlan(), QW.docsProgress(documentReadiness), QW.coach("Anu replies in 2h")],
        showDocuments, showApplications, showFamily, showPremiumJobs,
        bottomTabs,
        homeBlocks,
        learnEmphasis: "b1_prep",
      };

    case "b1_completed":
      return {
        todayFocus: {
          eyebrow: "Jobs unlocked",
          title: applicationsCount > 0 ? `${applicationsCount} application${applicationsCount > 1 ? "s" : ""} in motion, keep going` : `Apply to your ${matchedJobsCount} matched roles`,
          copy: documentReadiness < 100
            ? `Documents are ${documentReadiness}% ready. Finish them before submitting; recruiters review the full profile.`
            : "Documents look complete. Submit your Skillcase profile to matched hospitals.",
          cta: documentReadiness < 100 ? "Finish documents" : "Apply with profile",
          ctaTab: documentReadiness < 100 ? "documents" : "jobs",
          meta: "3 employers actively reviewing this week",
          tone: "unlock",
          secondaryCta: { label: "Book mock interview", tab: "learn" },
        },
        quickWins: [QW.applyNow(matchedJobsCount), QW.docsProgress(documentReadiness), QW.bookInterview(), QW.placement()],
        showDocuments, showApplications, showFamily, showPremiumJobs,
        bottomTabs,
        homeBlocks,
        learnEmphasis: "interview",
      };

    case "b2_in_progress":
      return {
        todayFocus: {
          eyebrow: "Premium track",
          title: "Premium hospitals open at B2",
          copy: "Charité, Hamburg-Eppendorf and other top hospitals prefer B2. ICU and OR roles pay €300–€500/mo more.",
          cta: "View premium roles",
          ctaTab: "jobs",
          meta: "B2 nurses earn €4k+/mo vs €3.3k at B1",
          tone: "premium",
          secondaryCta: { label: "Add your specialty", tab: "profile" },
        },
        quickWins: [QW.applyNow(matchedJobsCount), QW.specialty(), QW.salary(), QW.placement()],
        showDocuments, showApplications, showFamily, showPremiumJobs,
        bottomTabs,
        homeBlocks,
        learnEmphasis: "specialty",
      };

    case "b2_completed":
      return {
        todayFocus: {
          eyebrow: "Top-tier profile",
          title: "Add your family, they relocate with you",
          copy: "B2 done. Specialty roles open up. Spouse and kids can relocate with your visa. Let's plan their move now.",
          cta: "Open family planning",
          ctaTab: "profile",
          meta: "Average B2 nurse + family relocation: 4–5 months",
          tone: "premium",
          secondaryCta: { label: "View premium roles", tab: "jobs" },
        },
        quickWins: [QW.family(), QW.applyNow(matchedJobsCount), QW.visa(), QW.placement()],
        showDocuments, showApplications, showFamily, showPremiumJobs,
        bottomTabs,
        homeBlocks,
        learnEmphasis: "specialty",
      };
  }
}
