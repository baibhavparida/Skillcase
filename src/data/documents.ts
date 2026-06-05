import type { DocumentId, GermanLevel } from "./dashboardTypes";
import { levelRank } from "./dashboardStorage";

export type DocumentConfig = {
  id: DocumentId;
  label: string;
  helper: string;
  unlocksAtRank: number;       // minimum rank where this document becomes visible
  requiredAtRank: number;      // rank from which it counts toward "ready to apply"
  optional?: boolean;
  preventApplyIfMissing?: boolean;
  group: "identity" | "qualification" | "language" | "recognition" | "compliance";
  example?: string;
  expiryWatch?: boolean;
};

export const DOCUMENT_CATALOG: DocumentConfig[] = [
  {
    id: "passport",
    label: "Passport (front + back)",
    helper: "Indian passport, valid for at least 18 months.",
    unlocksAtRank: 2,
    requiredAtRank: 4,
    preventApplyIfMissing: true,
    group: "identity",
    example: "PDF or photo of the data page",
    expiryWatch: true,
  },
  {
    id: "nursing_certificate",
    label: "Nursing degree certificate",
    helper: "Your GNM / BSc / MSc nursing final certificate.",
    unlocksAtRank: 2,
    requiredAtRank: 4,
    preventApplyIfMissing: true,
    group: "qualification",
  },
  {
    id: "transcripts",
    label: "Mark sheets / transcripts",
    helper: "Year-wise mark sheets from your nursing degree.",
    unlocksAtRank: 2,
    requiredAtRank: 4,
    preventApplyIfMissing: true,
    group: "qualification",
  },
  {
    id: "experience_letter",
    label: "Experience letter",
    helper: "Latest hospital letterhead. Skip if Fresher.",
    unlocksAtRank: 2,
    requiredAtRank: 4,
    optional: true,
    group: "qualification",
  },
  {
    id: "b1_certificate",
    label: "German B1 certificate",
    helper: "Goethe-Institut / telc B1. Triggers application unlock.",
    unlocksAtRank: 3,
    requiredAtRank: 4,
    preventApplyIfMissing: true,
    group: "language",
  },
  {
    id: "anerkennung_form",
    label: "Anerkennung application",
    helper: "Recognition of your nursing qualification by the German state authority.",
    unlocksAtRank: 2,
    requiredAtRank: 4,
    group: "recognition",
  },
  {
    id: "police_clearance",
    label: "Police clearance certificate",
    helper: "From your Indian Regional Passport Office. Valid 6 months.",
    unlocksAtRank: 4,
    requiredAtRank: 4,
    group: "compliance",
    expiryWatch: true,
  },
  {
    id: "medical_fitness",
    label: "Medical fitness certificate",
    helper: "Required for the visa application after job offer.",
    unlocksAtRank: 4,
    requiredAtRank: 4,
    optional: true,
    group: "compliance",
  },
  {
    id: "photograph",
    label: "Passport-size photograph",
    helper: "German biometric format. White background, recent.",
    unlocksAtRank: 2,
    requiredAtRank: 4,
    group: "identity",
  },
];

export function getVisibleDocuments(level: GermanLevel): DocumentConfig[] {
  const rank = levelRank(level);
  return DOCUMENT_CATALOG.filter((d) => rank >= d.unlocksAtRank);
}

export function getApplyBlockingDocuments(): DocumentConfig[] {
  return DOCUMENT_CATALOG.filter((d) => d.preventApplyIfMissing);
}
