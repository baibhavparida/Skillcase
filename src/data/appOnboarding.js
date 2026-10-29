// The learner app's onboarding questions, mirrored for /signup so a profile
// started on the website has the same answers the app asks for.
// Source: SkillCase-Frontend src/pages/onboarding/OnboardingFlow.jsx (the
// main and nursing-german branches ask identical questions).
//
// Every `value` is the exact string the app sends to
// POST /user/complete-onboarding-profile, so keep them byte-for-byte in sync
// with the app (German levels include a newline). `label`, `detail` and
// `icon` are website-only.

export const playStoreUrl =
  "https://play.google.com/store/apps/details?id=com.skillcase.app&hl=en_IN";

// Logged-out visitors land on the app's own sign-in; returning users go home.
export const learnerAppUrl = "https://learner.skillcase.in/";

// The app accepts Indian mobile numbers only.
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

export const occupations = [
  {
    value: "Professional nurse",
    label: "Professional nurse",
    detail: "GNM, BSc or MSc Nursing",
    icon: "stethoscope",
  },
  {
    value: "Physiotherapist",
    label: "Physiotherapist",
    detail: "BPT or MPT",
    icon: "person-simple-walk",
  },
  {
    value: "Student (learning nursing)",
    label: "Student (learning nursing)",
    detail: "Currently studying nursing",
    icon: "graduation-cap",
  },
  {
    value: "Other",
    label: "Other",
    detail: "Doctors, technicians and more",
    icon: "hospital",
  },
];

// Homepage role links pass ?role=<key>; map them to the app's occupations.
// Ausbildung has no clean match, so it is left for the visitor to pick.
const occupationByRole = {
  nurse: "Professional nurse",
  "nursing-student": "Student (learning nursing)",
  physiotherapist: "Physiotherapist",
  other: "Other",
  doctor: "Other",
  "lab-technician": "Other",
  "lab-technologist": "Other",
  "radiology-technician": "Other",
  radiographer: "Other",
  "ot-anaesthesia-technician": "Other",
};

export const occupationForRole = (roleKey) => occupationByRole[roleKey] || "";

// "What are you here for?" Snapshot of GET
// https://learnerapi.skillcase.in/api/scholarship-exam/pathways/public taken
// on 2026-10-11. The app shows this step only while a pathway other than the
// built-in "Jobs in Germany" exists; picking one ends onboarding there and
// sends the learner to that pathway's exam. Re-check when admins change it.
export const pathways = [
  {
    id: 1,
    title: "Jobs in Germany",
    detail: "Learn German and apply for jobs",
    badge: "Popular",
    isBuiltin: true,
  },
  {
    id: 2,
    title: "Scholarship Exam",
    detail: "Take the exam for a scholarship",
    isBuiltin: false,
  },
];

export const hasOtherPathways = pathways.some((pathway) => !pathway.isBuiltin);
export const builtinPathway = pathways.find((pathway) => pathway.isBuiltin);

export const GERMAN_STATUS = {
  notStarted: "Yet to start (no knowledge)",
  learning: "I am learning German",
  completed: "I have completed learning German",
};

export const germanStatusOptions = [
  {
    value: GERMAN_STATUS.notStarted,
    label: "Yet to start (no knowledge)",
    detail: "Start from your very first word",
    icon: "sparkle",
  },
  {
    value: GERMAN_STATUS.learning,
    label: "I am learning German",
    detail: "You know some German already",
    icon: "book-open-text",
  },
  {
    value: GERMAN_STATUS.completed,
    label: "I have completed learning German",
    detail: "You have reached B1 or B2",
    icon: "seal-check",
  },
];

export const germanLevels = [
  {
    code: "A1",
    rank: 1,
    value: "A1 - Beginner\n(I know a few words)",
    label: "A1 · Beginner",
    detail: "I know a few words",
  },
  {
    code: "A2",
    rank: 2,
    value: "A2 - Elementary\n(I understand basic sentences)",
    label: "A2 · Elementary",
    detail: "I understand basic sentences",
  },
  {
    code: "B1",
    rank: 3,
    value: "B1 - Intermediate\n(I can have simple conversations)",
    label: "B1 · Intermediate",
    detail: "I can have simple conversations",
  },
  {
    code: "B2",
    rank: 4,
    value: "B2 - Upper Intermediate\n(I can speak fairly confidently)",
    label: "B2 · Upper Intermediate",
    detail: "I can speak fairly confidently",
  },
];

export const levelFor = (value) =>
  germanLevels.find((level) => level.value === value) || null;

// germanPreference codes the app stores.
export const PREFERENCE = { learn: "1", practice: "2", job: "3" };
