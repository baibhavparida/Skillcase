// Healthcare pathways listed in the homepage's "Who can apply?" section.
// Pay is a typical gross monthly range in euros (German public pay scales,
// matching the hero cards in placements.js); the page shows it in rupees.
// German levels are the usual requirement; it varies by state and employer.
export const roles = [
  {
    key: "nurse",
    title: "Nurse",
    german: "B1–B2 German",
    salary: [3300, 3900],
    image: "/assets/images/candidate-nurse-hamburg.webp",
  },
  {
    key: "doctor",
    title: "Doctor",
    german: "C1 medical German",
    salary: [5000, 6000],
    image: "/assets/images/candidate-doctor-munich.webp",
  },
  {
    key: "physiotherapist",
    title: "Physiotherapist",
    german: "B2 German",
    salary: [2700, 3500],
    image: "/assets/images/candidate-physio-cologne.webp",
  },
  {
    key: "lab-technician",
    title: "Lab technician",
    german: "B2 German",
    salary: [3300, 3900],
    image: "/assets/images/candidate-labtech-stuttgart.webp",
  },
  {
    key: "radiology-technician",
    title: "Radiology technician",
    german: "B2 German",
    salary: [3300, 3900],
    image: "/assets/images/candidate-radiographer-freiburg.webp",
  },
  {
    key: "ot-anaesthesia-technician",
    title: "OT & anaesthesia technician",
    german: "B2 German",
    salary: [3200, 3800],
    image: "/assets/images/candidate-ottech-heidelberg.webp",
  },
];

// Lowest to highest typical pay across qualified roles, for summary figures.
export const salaryRange = [
  Math.min(...roles.map((role) => role.salary[0])),
  Math.max(...roles.map((role) => role.salary[1])),
];

// The homepage's "Who can apply?" groups: the learner app's four answers to
// "What do you do?" (occupations in appOnboarding.js), so each card opens
// sign-up with its answer picked. Pay and German level as above; students
// get the Ausbildung stipend (as the nursing trainee hero card), and "Other"
// spans the technician and doctor ranges.
export const applyGroups = [
  {
    key: "nurse",
    title: "Nurses",
    detail: "GNM, BSc or MSc Nursing",
    german: "B1–B2 German",
    salary: [3300, 3900],
    image: "/assets/images/candidate-nurse-hamburg.webp",
  },
  {
    key: "nursing-student",
    title: "Nursing students",
    detail: "Paid Ausbildung in Germany",
    german: "B1–B2 German",
    salary: [1300, 1600],
    image: "/assets/images/candidate-trainee-nuremberg.webp",
  },
  {
    key: "physiotherapist",
    title: "Physiotherapists",
    detail: "BPT or MPT",
    german: "B2 German",
    salary: [2700, 3500],
    image: "/assets/images/candidate-physio-cologne.webp",
  },
  {
    key: "other",
    title: "Other roles",
    detail: "Doctors, technicians and more",
    german: "B2–C1 German",
    salary: [3200, 6000],
    image: "/assets/images/candidate-labtech-stuttgart.webp",
  },
];

export const signupHref = (key) => `/signup/?role=${key}`;
