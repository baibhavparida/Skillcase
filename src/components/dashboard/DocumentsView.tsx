import React, { useRef, useState } from "react";
import {
  CheckIcon as Check,
  ClockClockwiseIcon as ClockClockwise,
  FileTextIcon as FileText,
  PaperPlaneTiltIcon as PaperPlane,
  ShieldCheckIcon as ShieldCheck,
  UploadSimpleIcon as Upload,
  WarningCircleIcon as Warning,
  WhatsappLogoIcon as WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import type { DocumentConfig } from "../../data/documents";
import { DOCUMENT_CATALOG } from "../../data/documents";
import { setDocumentRecord } from "../../data/dashboardStorage";
import type { DocumentId, DocumentRecord, DocumentState } from "../../data/dashboardTypes";
import type { DashboardContext } from "./shared";

const GROUP_LABEL: Record<DocumentConfig["group"], string> = {
  identity: "Identity",
  qualification: "Qualifications",
  language: "Language",
  recognition: "Recognition (Anerkennung)",
  compliance: "Compliance",
};

const GROUP_ORDER: DocumentConfig["group"][] = ["identity", "qualification", "language", "recognition", "compliance"];

const STATE_LABEL: Record<DocumentState, string> = {
  missing: "Not uploaded",
  uploaded: "Uploaded",
  under_review: "Coach reviewing",
  verified: "Verified",
  needs_revision: "Needs changes",
};

const STATE_ICON: Record<DocumentState, React.ComponentType<{ size?: number; weight?: "regular" | "bold" | "fill" }>> = {
  missing: Upload,
  uploaded: PaperPlane,
  under_review: ClockClockwise,
  verified: Check,
  needs_revision: Warning,
};

export function DocumentsView(ctx: DashboardContext) {
  const [tick, setTick] = useState(0);
  const visible = DOCUMENT_CATALOG.filter((d) => ctx.level.rank >= d.unlocksAtRank);
  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: visible.filter((d) => d.group === group),
  })).filter((g) => g.items.length > 0);

  const counts = {
    verified: visible.filter((d) => ctx.documents[d.id]?.state === "verified").length,
    review: visible.filter((d) => ctx.documents[d.id]?.state === "under_review").length,
    uploaded: visible.filter((d) => ctx.documents[d.id]?.state === "uploaded").length,
    missing: visible.filter((d) => !ctx.documents[d.id] || ctx.documents[d.id]?.state === "missing").length,
    revision: visible.filter((d) => ctx.documents[d.id]?.state === "needs_revision").length,
  };

  const refresh = () => setTick((t) => t + 1);

  const handleUpload = (id: DocumentId, fileName: string, fileSize: number) => {
    setDocumentRecord(id, {
      state: "uploaded",
      fileName,
      fileSize,
      uploadedAt: new Date().toISOString(),
    });
    refresh();
    // Simulate coach review pipeline (stub for backend)
    window.setTimeout(() => {
      setDocumentRecord(id, { state: "under_review" });
      refresh();
    }, 1400);
    window.setTimeout(() => {
      setDocumentRecord(id, { state: "verified" });
      refresh();
    }, 4200);
  };

  // tick is used to force re-render after async updates
  void tick;

  return (
    <div className="sc-dash-tab-space">
      <section className="sc-dash-docs-hero">
        <div className="sc-dash-docs-hero-copy">
          <p className="sc-dash-eyebrow"><FileText size={11} weight="bold" /> Documents</p>
          <h2>{ctx.documentReadiness}% of your file is ready</h2>
          <p>
            {ctx.level.rank >= 4
              ? "Documents go to the German recruiter together with your application. Complete every required item before submitting."
              : "We start documents at A2 so Anerkennung (qualification recognition) runs in parallel with B1 prep. Saves 2 months."}
          </p>
        </div>
        <div className="sc-dash-docs-hero-counts">
          <span className="is-verified"><strong>{counts.verified}</strong>verified</span>
          <span className="is-review"><strong>{counts.review}</strong>reviewing</span>
          <span className="is-uploaded"><strong>{counts.uploaded}</strong>queued</span>
          <span className="is-missing"><strong>{counts.missing}</strong>to do</span>
        </div>
      </section>

      {counts.revision > 0 && (
        <div className="sc-dash-lock-note is-warning" role="status">
          <Warning size={15} weight="bold" />
          {counts.revision} document{counts.revision > 1 ? "s" : ""} needs revision. Open the item for the coach's note.
        </div>
      )}

      {grouped.map(({ group, items }) => (
        <section key={group} className="sc-dash-card-flat">
          <div className="sc-dash-section-head">
            <div>
              <p className="sc-dash-eyebrow">{GROUP_LABEL[group]}</p>
              <h2>{items.length} document{items.length > 1 ? "s" : ""}</h2>
            </div>
          </div>
          <div className="sc-dash-doc-list">
            {items.map((doc) => (
              <DocumentRow
                key={doc.id}
                doc={doc}
                record={ctx.documents[doc.id]}
                onUpload={(file) => handleUpload(doc.id, file.name, file.size)}
                onWhatsApp={() => window.open(`https://wa.me/${ctx.coach.whatsApp}`, "_blank")}
              />
            ))}
          </div>
        </section>
      ))}

      <section className="sc-dash-coach-band">
        <img alt="" src={ctx.coach.photo} />
        <div>
          <p className="sc-dash-eyebrow">Document coach</p>
          <h3>{ctx.coach.name}</h3>
          <p>{ctx.coach.sampleMessage}</p>
        </div>
        <div className="sc-dash-coach-actions">
          <a className="sc-dash-btn sc-dash-btn-navy" href={`https://wa.me/${ctx.coach.whatsApp}`} target="_blank" rel="noreferrer">
            <WhatsappLogo size={15} weight="bold" />
            WhatsApp documents
          </a>
        </div>
      </section>
    </div>
  );
}

function DocumentRow({
  doc,
  record,
  onUpload,
  onWhatsApp,
}: {
  doc: DocumentConfig;
  record: DocumentRecord | undefined;
  onUpload: (file: File) => void;
  onWhatsApp: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const state: DocumentState = record?.state ?? "missing";
  const Icon = STATE_ICON[state];
  const isMissing = state === "missing";

  return (
    <div className={`sc-dash-doc-row is-${state}`}>
      <span className="sc-dash-doc-state-icon" aria-hidden="true">
        <Icon size={14} weight="bold" />
      </span>
      <div className="sc-dash-doc-row-main">
        <div className="sc-dash-doc-row-head">
          <strong>{doc.label}</strong>
          {doc.optional && <em className="sc-dash-doc-optional">Optional</em>}
          {doc.preventApplyIfMissing && !doc.optional && <em className="sc-dash-doc-required">Required to apply</em>}
        </div>
        <small>{doc.helper}</small>
        {record?.fileName && (
          <p className="sc-dash-doc-file">
            <FileText size={11} weight="bold" /> {record.fileName} · {formatBytes(record.fileSize ?? 0)}
          </p>
        )}
        {record?.reviewNote && state === "needs_revision" && (
          <p className="sc-dash-doc-note">
            <Warning size={11} weight="bold" /> Coach: {record.reviewNote}
          </p>
        )}
      </div>
      <div className="sc-dash-doc-row-actions">
        <span className="sc-dash-doc-state-pill">{STATE_LABEL[state]}</span>
        {isMissing || state === "needs_revision" ? (
          <>
            <input
              ref={inputRef}
              type="file"
              hidden
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onUpload(file);
                event.target.value = "";
              }}
            />
            <button type="button" className="sc-dash-btn sc-dash-btn-ghost sc-dash-btn-sm" onClick={() => inputRef.current?.click()}>
              <Upload size={13} weight="bold" />
              Upload
            </button>
            <button type="button" className="sc-dash-btn sc-dash-btn-ghost sc-dash-btn-sm" onClick={onWhatsApp}>
              <WhatsappLogo size={13} weight="bold" />
              WhatsApp
            </button>
          </>
        ) : state === "uploaded" || state === "under_review" ? (
          <span className="sc-dash-doc-pending">Coach will reply in a few hours</span>
        ) : (
          <span className="sc-dash-doc-verified"><ShieldCheck size={12} weight="bold" /> Coach verified</span>
        )}
      </div>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
