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

export const signupHref = (key) => `/signup/?role=${key}`;
