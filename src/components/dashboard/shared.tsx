import React from "react";
import {
  BookOpenTextIcon as BookOpenText,
  BriefcaseIcon as Briefcase,
  CalendarIcon as Calendar,
  CaretRightIcon as CaretRight,
  ChatCircleTextIcon as ChatCircleText,
  CheckIcon as Check,
  ClipboardTextIcon as ClipboardText,
  CoinIcon as Coin,
  FileTextIcon as FileText,
  GraduationCapIcon as GraduationCap,
  LockKeyIcon as LockKey,
  PhoneCallIcon as PhoneCall,
  PlayIcon as Play,
  SealCheckIcon as SealCheck,
  ShieldCheckIcon as ShieldCheck,
  SparkleIcon as Sparkle,
  StethoscopeIcon as Stethoscope,
  TrophyIcon as Trophy,
  WhatsappLogoIcon as WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import type {
  Application,
  ApplicationStatus,
  CandidateProfile,
  CohortLayout,
  DashboardTab,
  DocumentsState,
  LevelMeta,
  QuickWinIconKey,
  StreakState,
} from "../../data/dashboardTypes";
import type { Coach } from "../../data/coaches";

export type ReadinessTask = {
  id: string;
  label: string;
  detail: string;
  status: "done" | "next" | "pending" | "locked";
  tab?: DashboardTab;
};

export type DashboardContext = {
  profile: CandidateProfile;
  level: LevelMeta;
  cohort: CohortLayout;
  coach: Coach;
  documents: DocumentsState;
  applications: Application[];
  streak: StreakState;
  documentReadiness: number;
  profileCompleteness: number;
  journeyScore: number;
  applicationsCount: number;
  matchedJobsCount: number;
  canApply: boolean;
  readinessTasks: ReadinessTask[];
  setActiveTab: (tab: DashboardTab) => void;
  updateProfile: <Field extends keyof CandidateProfile>(field: Field, value: CandidateProfile[Field]) => void;
  saveProfile: () => void;
};

export const QUICK_WIN_ICONS: Record<QuickWinIconKey, Icon> = {
  graduation: GraduationCap,
  clipboard: ClipboardText,
  briefcase: Briefcase,
  whatsapp: WhatsappLogo,
  phone: PhoneCall,
  file: FileText,
  chat: ChatCircleText,
  play: Play,
  calendar: Calendar,
  stethoscope: Stethoscope,
  trophy: Trophy,
  shield: ShieldCheck,
  money: Coin,
  sparkle: Sparkle,
};

export const APPLICATION_STATUS_LABEL: Record<ApplicationStatus, string> = {
  submitted: "Submitted",
  reviewing: "Recruiter reviewing",
  interview_scheduled: "Interview scheduled",
  offer: "Offer",
  rejected: "Closed",
  withdrawn: "Withdrawn",
};

export const APPLICATION_STATUS_TONE: Record<ApplicationStatus, "neutral" | "active" | "good" | "muted"> = {
  submitted: "neutral",
  reviewing: "active",
  interview_scheduled: "active",
  offer: "good",
  rejected: "muted",
  withdrawn: "muted",
};

export function ProgressRing({
  value,
  size = 88,
  stroke = 8,
  label,
  segmented = false,
  flag = false,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  /** Dashed/segmented track instead of a solid ring. */
  segmented?: boolean;
  /** Show the German flag in the centre instead of the percentage. */
  flag?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circumference;
  const gradId = React.useId();
  const center = size / 2;

  // Segmented track: N rounded dashes with gaps that divide the circle evenly.
  const segCount = 8;
  const segGap = stroke + 5;
  const segDash = Math.max(2, circumference / segCount - segGap);

  return (
    <div className="sc-ring" style={{ width: size, height: size }} aria-label={`${clamped}% ${label ?? "complete"}`}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-cyan)" />
            <stop offset="100%" stopColor="var(--color-navy)" />
          </linearGradient>
        </defs>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--sc-border-soft)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={segmented ? `${segDash} ${segGap}` : undefined}
          transform={`rotate(-90 ${center} ${center})`}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      {flag ? (
        <span className="sc-ring-flag" aria-hidden="true">
          <GermanFlag size={Math.round(size * 0.34)} />
        </span>
      ) : (
        <strong style={{ fontSize: Math.max(14, size * 0.22) }}>
          {clamped}
          <em>%</em>
        </strong>
      )}
    </div>
  );
}

export function TaskList({ tasks, onSelect }: { tasks: ReadinessTask[]; onSelect?: (tab: DashboardTab) => void }) {
  return (
    <div className="sc-dash-tasks">
      {tasks.map((task) => {
        const interactive = !!task.tab && task.status !== "locked" && !!onSelect;
        const inner = (
          <>
            <span className="sc-dash-task-icon" aria-hidden="true">
              {task.status === "done" ? (
                <Check size={14} weight="bold" />
              ) : task.status === "locked" ? (
                <LockKey size={14} weight="bold" />
              ) : (
                <CaretRight size={14} weight="bold" />
              )}
            </span>
            <div>
              <strong>{task.label}</strong>
              <small>{task.detail}</small>
            </div>
            <em>
              {task.status === "done"
                ? "Done"
                : task.status === "locked"
                  ? "Locked"
                  : task.status === "next"
                    ? "Next"
                    : "Pending"}
            </em>
          </>
        );
        if (interactive) {
          return (
            <button
              key={task.id}
              type="button"
              className={`sc-dash-task is-${task.status} is-clickable`}
              onClick={() => onSelect!(task.tab!)}
            >
              {inner}
            </button>
          );
        }
        return (
          <div key={task.id} className={`sc-dash-task is-${task.status}`}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

export function GermanFlag({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="presentation"
      style={{ borderRadius: 3, overflow: "hidden", flexShrink: 0 }}
    >
      <rect width="24" height="8" fill="#0a0a0a" />
      <rect y="8" width="24" height="8" fill="#dd0000" />
      <rect y="16" width="24" height="8" fill="#ffce00" />
    </svg>
  );
}

export function SectionHead({
  eyebrow,
  eyebrowIcon,
  title,
  right,
}: {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="sc-dash-section-head">
      <div>
        <p className="sc-dash-eyebrow">
          {eyebrowIcon}
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {right}
    </div>
  );
}

export function getInitials(name: string, fallback = "N"): string {
  const cleaned = name.trim();
  if (!cleaned || cleaned === "Skillcase Nurse") return fallback;
  const parts = cleaned.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getFirstName(name: string): string {
  const cleaned = name.trim();
  if (!cleaned || cleaned === "Skillcase Nurse") return "there";
  return cleaned.split(" ")[0];
}

export function maskedPhone(phone: string): string {
  if (!phone) return "";
  if (phone.length === 10) return `${phone.slice(0, 5)} ${phone.slice(5)}`;
  return phone;
}

export function formatResponseSla(min: number): string {
  if (min < 60) return `${min} min`;
  if (min < 1440) return `~${Math.round(min / 60)} hr`;
  return `~${Math.round(min / 1440)} day`;
}

export function pluralize(n: number, one: string, many?: string): string {
  return `${n} ${n === 1 ? one : many ?? one + "s"}`;
}

/** "47% ready" feels more human than "50% ready". Round to nearest, never to a flat 10. */
export function organicPercent(numerator: number, denominator: number): number {
  if (denominator <= 0) return 0;
  const raw = (numerator / denominator) * 100;
  return Math.min(100, Math.round(raw));
}

export function copyCap65(text: string): string {
  return text;
}

export function IconBadge({ icon: Icon, tone = "neutral" }: { icon: Icon; tone?: "neutral" | "gold" | "navy" | "cyan" }) {
  return (
    <span className={`sc-icon-badge is-${tone}`} aria-hidden="true">
      <Icon size={16} weight="bold" />
    </span>
  );
}

export { Briefcase, Check, FileText, GraduationCap, PhoneCall, SealCheck, ShieldCheck, ChatCircleText, BookOpenText, CaretRight, Sparkle, LockKey, ClipboardText, Trophy };
