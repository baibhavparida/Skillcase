import React, { useEffect, useState } from "react";
import {
  CheckIcon as Check,
  ConfettiIcon as Confetti,
  DownloadSimpleIcon as Download,
  WhatsappLogoIcon as WhatsappLogo,
  XIcon as Close,
} from "@phosphor-icons/react/ssr";
import type { CelebrationKind } from "../../data/dashboardTypes";

type CelebrationConfig = {
  eyebrow: string;
  title: string;
  copy: string;
  badge: string;
  cta: string;
  share?: { whatsApp: string; download?: string };
};

const CONFIG: Record<CelebrationKind, CelebrationConfig> = {
  a1_done: {
    eyebrow: "Milestone unlocked",
    title: "A1 done.",
    copy: "You just finished your first level of German. That's 14% of your Germany pathway. Keep this momentum for A2.",
    badge: "A1",
    cta: "Continue to A2",
  },
  halfway: {
    eyebrow: "Halfway there",
    title: "You're 50% of the way",
    copy: "A2 done. Half the German learning is behind you. From here, B1 prep and documents move together.",
    badge: "A2",
    cta: "Start documents",
  },
  b1_unlock: {
    eyebrow: "Jobs unlocked",
    title: "B1 cleared. Germany jobs are open.",
    copy: "You can now apply with your Skillcase profile to 13+ matched hospital roles. Share your win.",
    badge: "B1",
    cta: "View matched jobs",
    share: {
      whatsApp: "I just cleared German B1 with Skillcase. Germany nursing jobs are unlocked.",
      download: "/assets/images/SKILLCASE_logo.svg",
    },
  },
};

export function MilestoneCelebration({
  kind,
  onDismiss,
  onPrimary,
}: {
  kind: CelebrationKind;
  onDismiss: () => void;
  onPrimary: () => void;
}) {
  const config = CONFIG[kind];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 20);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  const handleShareWhatsApp = () => {
    if (!config.share) return;
    const text = encodeURIComponent(config.share.whatsApp);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleDownload = () => {
    // For now, downloads the Skillcase logo as a placeholder shareable card.
    // A future canvas-rendered PNG can replace this without changing the trigger.
    if (!config.share?.download) return;
    const a = document.createElement("a");
    a.href = config.share.download;
    a.download = `skillcase-${kind}.svg`;
    a.click();
  };

  return (
    <div className={`sc-celebration ${visible ? "is-visible" : ""}`} role="dialog" aria-modal="true" aria-labelledby="celebration-title">
      <div className="sc-celebration-backdrop" onClick={onDismiss} aria-hidden="true" />
      <div className="sc-celebration-card">
        <button className="sc-celebration-close" type="button" onClick={onDismiss} aria-label="Close">
          <Close size={16} weight="bold" aria-hidden="true" />
        </button>

        <div className="sc-celebration-burst" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => <span key={i} />)}
        </div>

        <div className="sc-celebration-badge" aria-hidden="true">
          <span>{config.badge}</span>
          <i><Check size={20} weight="bold" /></i>
        </div>

        <p className="sc-celebration-eyebrow">
          <Confetti size={11} weight="fill" aria-hidden="true" /> {config.eyebrow}
        </p>
        <h2 id="celebration-title">{config.title}</h2>
        <p className="sc-celebration-copy">{config.copy}</p>

        <div className="sc-celebration-actions">
          <button className="sc-celebration-cta" type="button" onClick={onPrimary}>
            {config.cta}
          </button>
          {config.share && (
            <div className="sc-celebration-share">
              <button type="button" onClick={handleShareWhatsApp}>
                <WhatsappLogo size={15} weight="bold" aria-hidden="true" />
                Share on WhatsApp
              </button>
              {config.share.download && (
                <button type="button" onClick={handleDownload}>
                  <Download size={15} weight="bold" aria-hidden="true" />
                  Save card
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
