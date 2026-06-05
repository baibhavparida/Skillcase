import type {
  Application,
  ApplicationStatus,
  CandidateProfile,
  CelebrationKind,
  CelebrationsSeen,
  DocumentId,
  DocumentRecord,
  DocumentState,
  DocumentsState,
  GermanLevel,
  StreakState,
} from "./dashboardTypes";

export const PROFILE_KEY = "skillcase_candidate_profile";
export const DOCUMENTS_KEY = "skillcase_documents";
export const APPLICATIONS_KEY = "skillcase_applications";
export const CELEBRATIONS_KEY = "skillcase_celebrations_seen";
export const STREAK_KEY = "skillcase_streak";

export const defaultProfile: CandidateProfile = {
  fullName: "Skillcase Nurse",
  email: "",
  city: "",
  phone: "",
  qualification: "",
  germanLevel: "not_started",
  experience: "",
};

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or privacy mode — silently ignore */
  }
}

export function readProfile(): CandidateProfile | null {
  const stored = safeGet<CandidateProfile>(PROFILE_KEY);
  return stored ? { ...defaultProfile, ...stored } : null;
}

export function writeProfile(profile: CandidateProfile) {
  safeSet(PROFILE_KEY, profile);
}

export function readDocuments(): DocumentsState {
  return safeGet<DocumentsState>(DOCUMENTS_KEY) ?? {};
}

export function writeDocuments(documents: DocumentsState) {
  safeSet(DOCUMENTS_KEY, documents);
}

export function setDocumentRecord(id: DocumentId, patch: Partial<DocumentRecord>) {
  const current = readDocuments();
  const existing = current[id] ?? { state: "missing" as DocumentState };
  current[id] = { ...existing, ...patch };
  writeDocuments(current);
  return current[id]!;
}

export function readApplications(): Application[] {
  return safeGet<Application[]>(APPLICATIONS_KEY) ?? [];
}

export function writeApplications(applications: Application[]) {
  safeSet(APPLICATIONS_KEY, applications);
}

export function upsertApplication(application: Application) {
  const applications = readApplications();
  const index = applications.findIndex((a) => a.jobId === application.jobId);
  if (index >= 0) applications[index] = application;
  else applications.unshift(application);
  writeApplications(applications);
  return applications;
}

export function addApplicationEvent(jobId: string, status: ApplicationStatus, label: string, note?: string) {
  const applications = readApplications();
  const found = applications.find((a) => a.jobId === jobId);
  if (!found) return applications;
  found.status = status;
  found.events.push({ at: new Date().toISOString(), label, note });
  writeApplications(applications);
  return applications;
}

export function readCelebrations(): CelebrationsSeen {
  return safeGet<CelebrationsSeen>(CELEBRATIONS_KEY) ?? [];
}

export function markCelebrationSeen(kind: CelebrationKind) {
  const seen = readCelebrations();
  if (!seen.includes(kind)) {
    seen.push(kind);
    safeSet(CELEBRATIONS_KEY, seen);
  }
}

export function readStreak(): StreakState {
  return safeGet<StreakState>(STREAK_KEY) ?? { daysActive: 0, lastActiveDate: "" };
}

export function touchStreak() {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().slice(0, 10);
  const current = readStreak();
  if (current.lastActiveDate === today) return;
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const nextDays = current.lastActiveDate === yesterday ? current.daysActive + 1 : 1;
  safeSet(STREAK_KEY, { daysActive: nextDays, lastActiveDate: today });
}

export function pendingCelebration(level: GermanLevel, seen: CelebrationsSeen): CelebrationKind | null {
  if (level !== "not_started" && !seen.includes("a1_done") && (level === "a1_completed" || rankAtLeast(level, "a1_completed"))) {
    // Only fire a1 if user is at exactly a1_completed OR if they leapt past without seeing it. We only fire when reaching a1 exactly.
    if (level === "a1_completed") return "a1_done";
  }
  if (!seen.includes("halfway") && level === "a2_completed") return "halfway";
  if (!seen.includes("b1_unlock") && rankAtLeast(level, "b1_completed")) return "b1_unlock";
  return null;
}

const RANKS: Record<GermanLevel, number> = {
  not_started: 0,
  a1_completed: 1,
  a2_completed: 2,
  b1_in_progress: 3,
  b1_completed: 4,
  b2_in_progress: 5,
  b2_completed: 6,
};

export function levelRank(level: GermanLevel): number {
  return RANKS[level];
}

export function rankAtLeast(level: GermanLevel, threshold: GermanLevel): boolean {
  return RANKS[level] >= RANKS[threshold];
}
