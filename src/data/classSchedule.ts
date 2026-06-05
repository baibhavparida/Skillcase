// CMS = this file for now. Skillcase ops can edit weekly.
// TODO: swap getUpcomingClasses() for a real Google Calendar fetch once backend exists.
// Data shape mirrors a Calendar v3 event so the swap is mechanical.

import type { GermanLevel } from "./dashboardTypes";

export type ClassSession = {
  id: string;
  title: string;
  startsAt: string; // ISO string in local IST
  durationMin: number;
  zoomLink: string;
  teacher: string;
  teacherPhoto: string;
  batch: string;
  kind: "demo" | "regular" | "mock_speaking" | "mock_interview" | "doc_review";
  forLevels: GermanLevel[];
  description?: string;
};

// Build a series of synthetic classes anchored to "today at 7 PM IST" so the dashboard
// always shows realistic upcoming dates. Replace this with a real CMS later.
function buildSyntheticClasses(now: Date = new Date()): ClassSession[] {
  const today = new Date(now);
  today.setHours(19, 0, 0, 0); // 7 PM
  const day = today.getDay();

  function offset(days: number, hour = 19): string {
    const d = new Date(today);
    d.setDate(today.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
  }

  return [
    {
      id: "demo-tonight",
      title: "Free German demo class for nurses",
      startsAt: day < 5 ? offset(0) : offset(7 - day),
      durationMin: 30,
      zoomLink: "https://wa.me/919731462667",
      teacher: "Priya Nair",
      teacherPhoto: "/assets/images/about-indian-teacher-guidance.webp",
      batch: "Demo · open to all",
      kind: "demo",
      forLevels: ["not_started"],
      description: "Greetings, hospital vocabulary, and how the B1 path works for Indian nurses.",
    },
    {
      id: "a2-tuesday",
      title: "A2 · Hospital handover phrases",
      startsAt: offset(((2 - day) + 7) % 7 || 7), // next Tuesday
      durationMin: 75,
      zoomLink: "https://wa.me/919731462667",
      teacher: "Anu Mathew",
      teacherPhoto: "/assets/images/testimonial-anjali.webp",
      batch: "Batch 24-Mumbai · 18 nurses",
      kind: "regular",
      forLevels: ["a1_completed", "a2_completed"],
      description: "Roleplay: morning shift handover with a senior nurse.",
    },
    {
      id: "b1-thursday",
      title: "B1 · Listening practice — ward rounds",
      startsAt: offset(((4 - day) + 7) % 7 || 7), // next Thursday
      durationMin: 75,
      zoomLink: "https://wa.me/919731462667",
      teacher: "Anu Mathew",
      teacherPhoto: "/assets/images/testimonial-anjali.webp",
      batch: "Batch 24-Mumbai · 18 nurses",
      kind: "regular",
      forLevels: ["a2_completed", "b1_in_progress"],
      description: "Three audio clips, comprehension questions, then a 10-minute discussion.",
    },
    {
      id: "speaking-friday",
      title: "Mock speaking · pair practice",
      startsAt: offset(((5 - day) + 7) % 7 || 7), // next Friday
      durationMin: 45,
      zoomLink: "https://wa.me/919731462667",
      teacher: "Sara Joseph",
      teacherPhoto: "/assets/images/testimonial-meera.webp",
      batch: "B1 prep cohort",
      kind: "mock_speaking",
      forLevels: ["b1_in_progress", "b1_completed"],
      description: "10-min conversation with a peer, coach feedback.",
    },
    {
      id: "interview-saturday",
      title: "Mock interview · German employer",
      startsAt: offset(((6 - day) + 7) % 7 || 7), // next Saturday
      durationMin: 30,
      zoomLink: "https://wa.me/919731462667",
      teacher: "Hannah Schmidt",
      teacherPhoto: "/assets/images/webinar-nurses.webp",
      batch: "Application-ready cohort",
      kind: "mock_interview",
      forLevels: ["b1_completed", "b2_in_progress", "b2_completed"],
      description: "20-min interview simulating a hospital recruiter, 10-min feedback.",
    },
    {
      id: "doc-review-sunday",
      title: "Documents review · open clinic",
      startsAt: offset(((0 - day) + 7) % 7 || 7), // next Sunday
      durationMin: 60,
      zoomLink: "https://wa.me/919731462667",
      teacher: "Vinod Kuriakose",
      teacherPhoto: "/assets/images/about-indian-teacher-guidance.webp",
      batch: "Open · drop in",
      kind: "doc_review",
      forLevels: ["a2_completed", "b1_in_progress", "b1_completed", "b2_in_progress", "b2_completed"],
      description: "Bring your nursing certificate or Anerkennung form — coach reviews live.",
    },
  ];
}

export function getUpcomingClasses(level: GermanLevel, now: Date = new Date(), limit = 3): ClassSession[] {
  return buildSyntheticClasses(now)
    .filter((session) => session.forLevels.includes(level))
    .filter((session) => new Date(session.startsAt).getTime() > now.getTime() - 30 * 60 * 1000)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
    .slice(0, limit);
}

export function getNextClass(level: GermanLevel, now: Date = new Date()): ClassSession | null {
  return getUpcomingClasses(level, now, 1)[0] ?? null;
}

export function formatClassDate(iso: string, now: Date = new Date()): { absolute: string; relative: string } {
  const date = new Date(iso);
  const sameDay = date.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  const diffMs = date.getTime() - now.getTime();
  const diffMin = Math.round(diffMs / (1000 * 60));
  const diffHrs = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHrs / 24);

  let relative: string;
  if (diffMin <= 0) relative = "Live now";
  else if (sameDay && diffHrs < 1) relative = `In ${diffMin} min`;
  else if (sameDay) relative = `Today · ${formatTime(date)}`;
  else if (isTomorrow) relative = `Tomorrow · ${formatTime(date)}`;
  else if (diffDays < 7) relative = `${date.toLocaleDateString("en-IN", { weekday: "long" })} · ${formatTime(date)}`;
  else relative = date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  const absolute = `${date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} · ${formatTime(date)}`;
  return { absolute, relative };
}

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12}${minutes ? ":" + String(minutes).padStart(2, "0") : ""} ${period} IST`;
}
