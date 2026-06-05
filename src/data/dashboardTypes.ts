export type GermanLevel =
  | "not_started"
  | "a1_completed"
  | "a2_completed"
  | "b1_in_progress"
  | "b1_completed"
  | "b2_in_progress"
  | "b2_completed";

export type DashboardTab =
  | "home"
  | "learn"
  | "jobs"
  | "profile"
  | "progress"
  | "documents"
  | "applications";

export type CandidateProfile = {
  fullName: string;
  email: string;
  city: string;
  phone: string;
  qualification: string;
  germanLevel: GermanLevel;
  experience: string;
  passportStatus?: "have" | "applied" | "none";
  passportExpiry?: string;
  preferredCity?: string;
  earliestStart?: string;
  relocateFamily?: "yes" | "no" | "later";
  specialties?: string[];
};

export type LevelMeta = {
  value: GermanLevel;
  label: string;
  shortLabel: string;
  rank: number;
};

export type CelebrationKind = "a1_done" | "halfway" | "b1_unlock";

export type DocumentId =
  | "passport"
  | "nursing_certificate"
  | "transcripts"
  | "experience_letter"
  | "b1_certificate"
  | "anerkennung_form"
  | "police_clearance"
  | "medical_fitness"
  | "photograph";

export type DocumentState =
  | "missing"
  | "uploaded"
  | "under_review"
  | "verified"
  | "needs_revision";

export type DocumentRecord = {
  state: DocumentState;
  fileName?: string;
  fileSize?: number;
  uploadedAt?: string;
  reviewNote?: string;
};

export type DocumentsState = Partial<Record<DocumentId, DocumentRecord>>;

export type ApplicationStatus =
  | "submitted"
  | "reviewing"
  | "interview_scheduled"
  | "offer"
  | "rejected"
  | "withdrawn";

export type ApplicationEvent = {
  at: string;
  label: string;
  note?: string;
};

export type Application = {
  jobId: string;
  status: ApplicationStatus;
  submittedAt: string;
  events: ApplicationEvent[];
};

export type StreakState = {
  daysActive: number;
  lastActiveDate: string;
};

export type CelebrationsSeen = CelebrationKind[];

export type QuickWin = {
  label: string;
  detail: string;
  iconKey: QuickWinIconKey;
  action: { kind: "tab"; tab: DashboardTab } | { kind: "url"; url: string; external?: boolean };
};

export type QuickWinIconKey =
  | "graduation"
  | "clipboard"
  | "briefcase"
  | "whatsapp"
  | "phone"
  | "file"
  | "chat"
  | "play"
  | "calendar"
  | "stethoscope"
  | "trophy"
  | "shield"
  | "money"
  | "sparkle";

export type TodayFocus = {
  eyebrow: string;
  title: string;
  copy: string;
  cta: string;
  ctaTab: DashboardTab;
  meta: string;
  secondaryCta?: { label: string; tab?: DashboardTab; url?: string };
  tone: "start" | "build" | "almost" | "unlock" | "premium";
};

export type CohortLayout = {
  todayFocus: TodayFocus;
  quickWins: QuickWin[];
  showDocuments: boolean;
  showApplications: boolean;
  showFamily: boolean;
  showPremiumJobs: boolean;
  bottomTabs: DashboardTab[];
  homeBlocks: HomeBlockKey[];
  learnEmphasis: "demo" | "weekly" | "b1_prep" | "interview" | "specialty";
};

export type HomeBlockKey =
  | "this_week"
  | "today_focus"
  | "progress_pathway"
  | "quick_wins"
  | "documents_status"
  | "applications_status"
  | "matched_jobs"
  | "story_class"
  | "salary_calc"
  | "checklist"
  | "batch_streak"
  | "why_germany"
  | "exam_plan"
  | "family"
  | "premium_track"
  // Intent-bucket blocks (freemium ladder + job-readiness)
  | "free_webinar"
  | "quad_actions"
  | "testimonials_marquee"
  | "guided_free_app"
  | "join_course"
  | "interview_practice"
  | "profile_docs"
  | "guidance";
