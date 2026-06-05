import type { GermanLevel } from "./dashboardTypes";
import { levelRank } from "./dashboardStorage";

export type Coach = {
  name: string;
  role: string;
  photo: string;
  languages: string[];
  phone: string;
  whatsApp: string;
  email: string;
  responseSlaMin: number;
  sampleMessage: string;
};

const COACHES: Coach[] = [
  {
    name: "Priya Nair",
    role: "Onboarding coach",
    photo: "/assets/images/about-indian-teacher-guidance.webp",
    languages: ["English", "Malayalam", "Hindi"],
    phone: "+919731462667",
    whatsApp: "919731462667",
    email: "priya@skillcase.in",
    responseSlaMin: 60,
    sampleMessage: "Hi! Ready to book your free demo class? I'll guide you for the first 4 weeks.",
  },
  {
    name: "Anu Mathew",
    role: "German A1 → B1 coach",
    photo: "/assets/images/testimonial-anjali.webp",
    languages: ["English", "Hindi", "Tamil"],
    phone: "+919731462667",
    whatsApp: "919731462667",
    email: "anu@skillcase.in",
    responseSlaMin: 120,
    sampleMessage: "Your A2 class is Tuesday 7 PM. Today's 5-minute drill is in WhatsApp.",
  },
  {
    name: "Vinod Kuriakose",
    role: "Documents & Anerkennung coach",
    photo: "/assets/images/about-indian-teacher-guidance.webp",
    languages: ["English", "Malayalam", "Hindi"],
    phone: "+919731462667",
    whatsApp: "919731462667",
    email: "vinod@skillcase.in",
    responseSlaMin: 90,
    sampleMessage: "Let's start your Anerkennung paperwork. It runs in parallel with B1 prep.",
  },
  {
    name: "Hannah Schmidt",
    role: "Placement & interview coach",
    photo: "/assets/images/webinar-nurses.webp",
    languages: ["German", "English"],
    phone: "+919731462667",
    whatsApp: "919731462667",
    email: "hannah@skillcase.in",
    responseSlaMin: 180,
    sampleMessage: "I'll prep you for German employer interviews. We start with a 20-min mock.",
  },
];

export function getCoachForLevel(level: GermanLevel): Coach {
  const rank = levelRank(level);
  if (rank === 0) return COACHES[0]; // Priya — onboarding
  if (rank <= 3) return COACHES[1]; // Anu — language
  if (rank === 4) return COACHES[2]; // Vinod — documents (just unlocked B1)
  return COACHES[3]; // Hannah — placement
}

export function getDocumentCoach(): Coach {
  return COACHES[2];
}

export function getPlacementCoach(): Coach {
  return COACHES[3];
}
