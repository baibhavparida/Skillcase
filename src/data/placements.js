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

export const placements = [
  {
    key: "nurse-hamburg",
    role: "Nurse",
    city: "Hamburg",
    salary: [3300, 3900],
    image: "/assets/images/placed-nurse-hamburg.webp",
    alt: "Indian nurse in light blue scrubs in a Hamburg hospital corridor",
  },
  {
    key: "doctor-munich",
    role: "Doctor",
    city: "Munich",
    salary: [5000, 6000],
    image: "/assets/images/placed-doctor-munich.webp",
    alt: "Indian doctor in a white coat on a hospital ward in Munich",
  },
  {
    key: "physio-cologne",
    role: "Physiotherapist",
    city: "Cologne",
    salary: [2900, 3500],
    image: "/assets/images/placed-physio-cologne.webp",
    alt: "Indian physiotherapist laughing in a rehabilitation gym in Cologne",
  },
  {
    key: "labtech-stuttgart",
    role: "Lab technician",
    city: "Stuttgart",
    salary: [3300, 3900],
    image: "/assets/images/placed-labtech-stuttgart.webp",
    alt: "Indian lab technician checking a blood sample in a Stuttgart hospital lab",
  },
  {
    key: "nurse-frankfurt",
    role: "Nurse",
    city: "Frankfurt",
    salary: [3300, 3900],
    image: "/assets/images/placed-nurse-frankfurt.webp",
    alt: "Indian nurse in teal scrubs holding a coffee on a Frankfurt hospital ward",
  },
  {
    key: "ottech-heidelberg",
    role: "OT technician",
    city: "Heidelberg",
    salary: [3200, 3800],
    image: "/assets/images/placed-ottech-heidelberg.webp",
    alt: "Indian operating theatre technician in scrubs beside a scrub sink in Heidelberg",
  },
  {
    key: "doctor-dusseldorf",
    role: "Doctor",
    city: "Düsseldorf",
    salary: [5000, 6000],
    image: "/assets/images/placed-doctor-dusseldorf.webp",
    alt: "Indian doctor in surgical scrubs outside the operating theatres in Düsseldorf",
  },
  {
    key: "trainee-nuremberg",
    role: "Nursing trainee",
    city: "Nuremberg",
    salary: [1300, 1600],
    image: "/assets/images/placed-trainee-nuremberg.webp",
    alt: "Indian nursing trainee outside a hospital training school in Nuremberg",
  },
  {
    key: "radiographer-freiburg",
    role: "Radiology technician",
    city: "Freiburg",
    salary: [3300, 3900],
    image: "/assets/images/placed-radiographer-freiburg.webp",
    alt: "Indian radiology technician beside a CT scanner in Freiburg",
  },
  {
    key: "nurse-leipzig",
    role: "Nurse",
    city: "Leipzig",
    salary: [3200, 3800],
    image: "/assets/images/placed-nurse-leipzig.webp",
    alt: "Indian nurse sharing tea with an elderly resident in a Leipzig care home",
  },
  {
    key: "anaesthesia-dresden",
    role: "Anaesthesia technician",
    city: "Dresden",
    salary: [3200, 3800],
    image: "/assets/images/placed-anaesthesia-dresden.webp",
    alt: "Indian anaesthesia technician beside an anaesthesia workstation in Dresden",
  },
  {
    key: "physio-hannover",
    role: "Physiotherapist",
    city: "Hannover",
    salary: [2700, 3300],
    image: "/assets/images/placed-physio-hannover.webp",
    alt: "Indian physiotherapist in a Hannover outpatient practice",
  },
  {
    key: "nurse-aachen",
    role: "Nurse",
    city: "Aachen",
    salary: [3300, 3900],
    image: "/assets/images/placed-nurse-aachen.webp",
    alt: "Indian nurse smiling on a colourful paediatric ward in Aachen",
  },
  {
    key: "doctor-berlin",
    role: "Doctor",
    city: "Berlin",
    salary: [5000, 6000],
    image: "/assets/images/placed-doctor-berlin.webp",
    alt: "Indian doctor leaving a Berlin hospital at golden hour, TV tower behind him",
  },
];
