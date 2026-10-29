// Cards for the homepage hero marquee (Option 4).
//
// These are role cards: the photos are illustrative and the pay is the typical
// gross monthly range for each designation, stored in euros from German public
// pay scales (TVöD for nurses and technicians, TV-Ärzte for doctors, the TVöD
// Ausbildung stipend for trainees) and shown in rupees. Do not add a name to a
// card unless it is a real Skillcase placement shared with that person's
// consent, with their own photo.
//
// Order matters: no two neighbouring cards share a designation, including the
// wrap from the last card back to the first, so the moving row always reads
// as a mix of professions.

// Used for the rupee figures. Update when the exchange rate moves.
export const INR_PER_EUR = 97;

// A euro range shown in lakh rupees, e.g. [3300, 3900] -> "₹3.2–3.8L".
// Formatted by hand so server and browser output match for hydration.
const toLakhs = (euros) => (Math.round((euros * INR_PER_EUR) / 10000) / 10).toFixed(1);
export const formatLakhRange = ([low, high]) => `₹${toLakhs(low)}–${toLakhs(high)}L`;

export const placements = [
  {
    key: "nurse-hamburg",
    role: "Nurse",
    city: "Hamburg",
    salary: [3300, 3900],
    image: "/assets/images/candidate-nurse-hamburg.webp",
    alt: "Indian nurse in light blue scrubs in a Hamburg hospital corridor",
  },
  {
    key: "doctor-munich",
    role: "Doctor",
    city: "Munich",
    salary: [5000, 6000],
    image: "/assets/images/candidate-doctor-munich.webp",
    alt: "Indian doctor in a white coat on a hospital ward in Munich",
  },
  {
    key: "physio-cologne",
    role: "Physiotherapist",
    city: "Cologne",
    salary: [2900, 3500],
    image: "/assets/images/candidate-physio-cologne.webp",
    alt: "Indian physiotherapist laughing in a rehabilitation gym in Cologne",
  },
  {
    key: "labtech-stuttgart",
    role: "Lab technician",
    city: "Stuttgart",
    salary: [3300, 3900],
    image: "/assets/images/candidate-labtech-stuttgart.webp",
    alt: "Indian lab technician checking a blood sample in a Stuttgart hospital lab",
  },
  {
    key: "nurse-frankfurt",
    role: "Nurse",
    city: "Frankfurt",
    salary: [3300, 3900],
    image: "/assets/images/candidate-nurse-frankfurt.webp",
    alt: "Indian nurse in teal scrubs holding a coffee on a Frankfurt hospital ward",
  },
  {
    key: "ottech-heidelberg",
    role: "OT technician",
    city: "Heidelberg",
    salary: [3200, 3800],
    image: "/assets/images/candidate-ottech-heidelberg.webp",
    alt: "Indian operating theatre technician in scrubs beside a scrub sink in Heidelberg",
  },
  {
    key: "doctor-dusseldorf",
    role: "Doctor",
    city: "Düsseldorf",
    salary: [5000, 6000],
    image: "/assets/images/candidate-doctor-dusseldorf.webp",
    alt: "Indian doctor in surgical scrubs outside the operating theatres in Düsseldorf",
  },
  {
    key: "trainee-nuremberg",
    role: "Nursing trainee",
    city: "Nuremberg",
    salary: [1300, 1600],
    image: "/assets/images/candidate-trainee-nuremberg.webp",
    alt: "Indian nursing trainee outside a hospital training school in Nuremberg",
  },
  {
    key: "radiographer-freiburg",
    role: "Radiology technician",
    city: "Freiburg",
    salary: [3300, 3900],
    image: "/assets/images/candidate-radiographer-freiburg.webp",
    alt: "Indian radiology technician beside a CT scanner in Freiburg",
  },
  {
    key: "nurse-leipzig",
    role: "Nurse",
    city: "Leipzig",
    salary: [3200, 3800],
    image: "/assets/images/candidate-nurse-leipzig.webp",
    alt: "Indian nurse sharing tea with an elderly resident in a Leipzig care home",
  },
  {
    key: "anaesthesia-dresden",
    role: "Anaesthesia technician",
    city: "Dresden",
    salary: [3200, 3800],
    image: "/assets/images/candidate-anaesthesia-dresden.webp",
    alt: "Indian anaesthesia technician beside an anaesthesia workstation in Dresden",
  },
  {
    key: "physio-hannover",
    role: "Physiotherapist",
    city: "Hannover",
    salary: [2700, 3300],
    image: "/assets/images/candidate-physio-hannover.webp",
    alt: "Indian physiotherapist in a Hannover outpatient practice",
  },
  {
    key: "nurse-aachen",
    role: "Nurse",
    city: "Aachen",
    salary: [3300, 3900],
    image: "/assets/images/candidate-nurse-aachen.webp",
    alt: "Indian nurse smiling on a colourful paediatric ward in Aachen",
  },
  {
    key: "doctor-berlin",
    role: "Doctor",
    city: "Berlin",
    salary: [5000, 6000],
    image: "/assets/images/candidate-doctor-berlin.webp",
    alt: "Indian doctor leaving a Berlin hospital, with the TV tower behind him",
  },
];

// The homepage hero (next/HeroSplit.jsx) leads with nurses, as most Skillcase
// candidates are: twelve nursing cards (wards, specialties and one trainee),
// one physiotherapist and one doctor. Some photos are shared with the cards
// above. The order is the hero's: the first six sit on the orbit's inner ring,
// the rest on the outer one, and the phone wheel follows it too.
const NURSE_PAY = [3300, 3900];

export const heroPlacements = [
  {
    key: "nurse-hamburg",
    role: "Nurse",
    city: "Hamburg",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-nurse-hamburg.webp",
    alt: "Indian nurse in light blue scrubs in a Hamburg hospital corridor",
  },
  {
    key: "icu-nurse-bremen",
    role: "ICU nurse",
    city: "Bremen",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-nurse-icu-bremen.webp",
    alt: "Indian nurse in royal blue scrubs beside an intensive care bed in Bremen",
  },
  {
    key: "physio-cologne",
    role: "Physiotherapist",
    city: "Cologne",
    salary: [2900, 3500],
    image: "/assets/images/candidate-physio-cologne.webp",
    alt: "Indian physiotherapist laughing in a rehabilitation gym in Cologne",
  },
  {
    key: "nurse-frankfurt",
    role: "Nurse",
    city: "Frankfurt",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-nurse-frankfurt.webp",
    alt: "Indian nurse in teal scrubs holding a coffee on a Frankfurt hospital ward",
  },
  {
    key: "ot-nurse-heidelberg",
    role: "OT nurse",
    city: "Heidelberg",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-ottech-heidelberg.webp",
    alt: "Indian theatre nurse in scrubs beside a scrub sink in Heidelberg",
  },
  {
    key: "paediatric-nurse-aachen",
    role: "Paediatric nurse",
    city: "Aachen",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-nurse-aachen.webp",
    alt: "Indian nurse smiling on a colourful paediatric ward in Aachen",
  },
  {
    key: "geriatric-nurse-leipzig",
    role: "Geriatric nurse",
    city: "Leipzig",
    salary: [3200, 3800],
    image: "/assets/images/candidate-nurse-leipzig.webp",
    alt: "Indian nurse sharing tea with an elderly resident in a Leipzig care home",
  },
  {
    key: "emergency-nurse-berlin",
    role: "Emergency nurse",
    city: "Berlin",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-nurse-emergency-berlin.webp",
    alt: "Indian nurse in navy scrubs in a Berlin hospital's emergency department",
  },
  {
    key: "surgical-nurse-dusseldorf",
    role: "Surgical nurse",
    city: "Düsseldorf",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-doctor-dusseldorf.webp",
    alt: "Indian nurse in green scrubs outside the operating theatres in Düsseldorf",
  },
  {
    key: "trainee-nuremberg",
    role: "Nursing trainee",
    city: "Nuremberg",
    salary: [1300, 1600],
    image: "/assets/images/candidate-trainee-nuremberg.webp",
    alt: "Indian nursing trainee outside a hospital training school in Nuremberg",
  },
  {
    key: "dialysis-nurse-stuttgart",
    role: "Dialysis nurse",
    city: "Stuttgart",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-nurse-dialysis-stuttgart.webp",
    alt: "Indian nurse in a grey-blue tunic in a Stuttgart dialysis unit",
  },
  {
    key: "anaesthesia-nurse-dresden",
    role: "Anaesthesia nurse",
    city: "Dresden",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-anaesthesia-dresden.webp",
    alt: "Indian anaesthesia nurse beside an anaesthesia workstation in Dresden",
  },
  {
    key: "doctor-munich",
    role: "Doctor",
    city: "Munich",
    salary: [5000, 6000],
    image: "/assets/images/candidate-doctor-munich.webp",
    alt: "Indian doctor in a white coat on a hospital ward in Munich",
  },
  {
    key: "nurse-bonn",
    role: "Nurse",
    city: "Bonn",
    salary: NURSE_PAY,
    image: "/assets/images/candidate-nurse-ward-bonn.webp",
    alt: "Indian nurse in a white tunic beside a medication trolley on a Bonn hospital ward",
  },
];
