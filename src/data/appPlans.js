// What a new learner will find in the Skillcase app, picked by the route the
// app's onboarding sends them down (answers from appOnboarding.js). Shown on
// the last /signup screen to make the app download feel worth it.
//
// Every claim comes from the learner app's own screens. The live app at
// learner.skillcase.in matches the nursing-german branch of SkillCase-Frontend
// (its B2 suite and nursing routes are in the live bundle), so that branch is
// the reference. Lesson names, limits and job details are set on the server,
// so none are promised here.

import { GERMAN_STATUS, PREFERENCE, levelFor, pathways } from "./appOnboarding.js";

const levelNames = {
  A1: "Beginner",
  A2: "Elementary",
  B1: "Intermediate",
  B2: "Upper Intermediate",
};

// The cards each level sees on the app's home screen, as [title, subtitle,
// image] from FeatureCardsGrid.jsx and B2PracticeHome.jsx. Images live in
// public/assets/images/app-ui.
const appCards = {
  A1: [
    ["Flashcards", "Learn image-based vocabulary with quiz checkpoints", "flashcards"],
    ["Grammar", "Learn chapter-wise grammar in A1", "grammar"],
    ["Listening", "Train your ear with guided beginner audio tasks", "listening"],
    ["Speaking", "Practice pronunciation with guided speaking cards", "speaking"],
    ["Reading", "Practice reading comprehension in A1", "reading"],
    ["Test", "Take level-wise A1 tests", "test"],
  ],
  A2: [
    ["Flashcards", "Advanced vocabulary with sentences", "flashcards"],
    ["Grammar", "Master German grammar rules", "grammar"],
    ["Listening", "Improve your comprehension", "listening"],
    ["Speaking", "Practice pronunciation", "speaking"],
    ["Reading", "Read and understand German texts", "reading"],
    ["Test", "Test your A2 knowledge", "test"],
  ],
  B1: [
    ["Flashcards", "Practice basic German using Flashcards", "flashcards"],
    ["Reading & Listening", "Read articles and answer questions", "b1-read-listen"],
    ["Describe & Speak", "Describe images and practice pronunciation", "b1-describe-speak"],
    ["TELC & GOETHE Exam Papers", "Take mock exams under real constraints", "b1-exam"],
    ["Talk to Maya", "Have real German conversation & get instant feedback", "b1-maya"],
  ],
  B2: [
    ["Reading", "Texts, emails and grammar", "b2-reading"],
    ["Listening", "Real exam audio", "b2-listening"],
    ["Writing", "Emails and short texts", "b2-writing"],
    ["Speaking", "Speak and get feedback", "b2-speaking"],
  ],
};

const roadNotes = {
  start:
    "You start from your very first word. B1 is the minimum for German jobs, and job screening opens in the app when you reach it.",
  A1: "Next stop is A2. B1 is the minimum for German jobs, and job screening opens in the app when you reach it.",
  A2: "B1 is next, and it’s the minimum for German jobs. Reach it and job screening opens in the app.",
  B1: "You’ve reached the minimum for German jobs. Many roles ask for B2, so keep practising while you apply.",
  B2: "B2 is the level most healthcare roles in Germany ask for.",
};

const speakingScore = {
  icon: "speaking",
  title: "Speaking, scored out of 100",
  copy: "Record yourself and see your pronunciation, fluency, accuracy and completeness.",
};

const jobsOpen = {
  icon: "jobs",
  title: "Jobs are open to you",
  copy: "B1 is the minimum for German jobs, so you can start your job screening in the app whenever you’re ready.",
};

function guidedPlan(code) {
  const isNew = !code;
  return {
    key: "guided",
    badge: isNew ? "New to German" : `${code} · ${levelNames[code]}`,
    goal: isNew ? "start your first German lesson" : "start your guided German lessons",
    preview: { kind: "path", level: code || "A1", tabs: "learn", activeTab: 0 },
    highlightsTitle: "What your lessons look like",
    highlights: [
      {
        icon: "path",
        title: "Real-life lessons, one at a time",
        copy: "Each lesson is an everyday scene. Finish one and the next one unlocks.",
      },
      isNew
        ? {
            icon: "maya",
            title: "Maya guides every step",
            copy: "Your guide in the app talks you through each lesson out loud.",
          }
        : {
            icon: "cards",
            title: `Practice at ${code} too`,
            copy: "Switch to German Practice for flashcards, speaking scores and tests at your level.",
          },
      {
        icon: "listening",
        title: "Listen, match and build sentences",
        copy: "Tap to hear words, match them to pictures, unjumble sentences and pick the right reply in conversations.",
      },
      {
        icon: "streak",
        title: "Under 10 minutes a day",
        copy: "Hit your daily goal to keep your streak, earn coins and grow your count of German words learnt.",
      },
    ],
    // New learners start at A1, as the app shows them.
    road: isNew
      ? { current: "A1", label: "Start here", note: roadNotes.start }
      : { current: code, note: roadNotes[code] },
    trial: true,
  };
}

function practicePlan(code) {
  const base = {
    key: `practice-${code.toLowerCase()}`,
    badge: `${code} · ${levelNames[code]}`,
    goal: `start your ${code} practice`,
    preview: {
      kind: code === "B2" ? "b2" : "grid",
      level: code,
      tabs: code === "A1" || code === "A2" ? "learn" : "jobs",
      activeTab: code === "A1" || code === "A2" ? 1 : 0,
      cards: appCards[code],
    },
    highlightsTitle: `Inside the app at ${code}`,
    road: { current: code, note: roadNotes[code] },
    trial: true,
  };
  if (code === "A1") {
    return {
      ...base,
      highlights: [
        {
          icon: "cards",
          title: "Picture flashcards",
          copy: "Learn A1 words with image-first cards and a quick quiz every 20 cards.",
        },
        speakingScore,
        {
          icon: "listening",
          title: "Listening with subtitles",
          copy: "Beginner audio with subtitles that follow along, then questions to check you understood.",
        },
        {
          icon: "test",
          title: "Tests in 5 levels",
          copy: "Every topic has five test levels. Clear all five to master it.",
        },
      ],
    };
  }
  if (code === "A2") {
    return {
      ...base,
      highlights: [
        {
          icon: "cards",
          title: "Words in real sentences",
          copy: "A2 flashcards pair each word with an example sentence, with a quick quiz every 20 cards.",
        },
        {
          icon: "reading",
          title: "Read real messages",
          copy: "Practise with German emails, texts, SMS and articles, then answer quiz questions.",
        },
        speakingScore,
        {
          icon: "test",
          title: "Grammar and 5-level tests",
          copy: "Learn each A2 grammar rule with practice, then clear five test levels per topic.",
        },
      ],
    };
  }
  if (code === "B1") {
    return {
      ...base,
      highlights: [
        {
          icon: "exam",
          title: "telc and Goethe mock papers",
          copy: "Timed reading, writing, listening and speaking sections, like the real B1 exam.",
        },
        {
          icon: "maya-call",
          title: "Talk to Maya, your AI tutor",
          copy: "Have a real spoken conversation in German and get instant feedback.",
        },
        {
          icon: "describe",
          title: "Describe & Speak",
          copy: "Write about a picture, see the corrected version, then read it aloud for a speaking score.",
        },
        jobsOpen,
      ],
    };
  }
  return {
    ...base,
    highlights: [
      {
        icon: "test",
        title: "Start with a short test",
        copy: "It shows where you stand, and the app suggests what to practise next.",
      },
      {
        icon: "exam",
        title: "Practise all four exam skills",
        copy: "Reading, listening, writing and speaking practice built from real Goethe and telc exams.",
      },
      {
        icon: "writing",
        title: "Feedback on writing and speaking",
        copy: "Get your writing checked and your speaking scored, so you know exactly what to fix.",
      },
      jobsOpen,
    ],
  };
}

function jobsPlan(code) {
  return {
    key: "jobs",
    badge: `${code} · ${levelNames[code]}`,
    goal: "start your job screening",
    // The lobby's first steps, with the app's own step descriptions.
    preview: {
      kind: "jobs",
      level: code,
      tabs: "jobs",
      activeTab: 1,
      steps: [
        ["Welcome to job screening", "Read the overview of the program"],
        ["Upload your documents", "fill your education and personal details"],
        ["Skillcase interview", "complete your interview assessment"],
        ["Agreement", "sign the terms of agreement"],
      ],
    },
    highlightsTitle: "How your application works",
    highlights: [
      {
        icon: "documents",
        title: "Upload your CV and certificate",
        copy: "Add your CV and your B1 or B2 language certificate as PDFs. Reviews usually take 24 to 48 hours.",
      },
      {
        icon: "interview",
        title: "Record a short video interview",
        copy: "About 10 minutes, in German, at your own pace. The Skillcase team reviews it.",
      },
      {
        icon: "jobs",
        title: "Apply to opportunities",
        copy: "See the roles you’re eligible for and apply to more than one. The team calls you within 24 hours.",
      },
      {
        icon: "training",
        title: "Training, then employer interviews",
        copy: "One-on-one interview training, then interviews with German employers. Offer letters arrive in the app.",
      },
    ],
    road: null,
    trial: false,
  };
}

const scholarshipPlan = {
  key: "scholarship",
  badge: "Scholarship exam",
  goal: "take your scholarship exam",
  preview: { kind: "scholarship", tabs: "exam", activeTab: 0 },
  highlightsTitle: "How the exam works",
  highlights: [
    {
      icon: "timer",
      title: "One timed attempt",
      copy: "Start whenever you’re ready. The timer can’t be paused, so pick a quiet moment.",
    },
    {
      icon: "test",
      title: "Reading, audio and grammar questions",
      copy: "Multiple choice, fill in the blanks, sentence order, matching and dialogues.",
    },
    {
      icon: "trophy",
      title: "Your score sets your scholarship",
      copy: "When results are released, see the scholarship you’ve earned and book your seat.",
    },
    {
      icon: "cards",
      title: "Practise while you wait",
      copy: "Pick your level, from A1 to B2, and keep practising German in the app.",
    },
  ],
  road: null,
  trial: false,
};

// Same routing as the app: a scholarship pathway goes to its exam; completed
// German or "Apply for a job" goes to job screening; otherwise guided lessons
// or the practice grid for the level ("Yet to start" practises at A1).
export function planFor(profile) {
  const pathway = pathways.find((item) => item.id === profile.pathwayId);
  if (pathway && !pathway.isBuiltin) return scholarshipPlan;
  const code = levelFor(profile.germanLevel)?.code || null;
  if (
    code &&
    (profile.germanStatus === GERMAN_STATUS.completed ||
      profile.germanPreference === PREFERENCE.job)
  ) {
    return jobsPlan(code);
  }
  if (profile.germanPreference === PREFERENCE.learn) return guidedPlan(code);
  return practicePlan(code || "A1");
}
