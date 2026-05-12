import React from "react";
import {
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardCheck,
  FileCheck2,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

type DashboardRole = "nurse" | "recruiter";

const roleContent = {
  nurse: {
    eyebrow: "Nurse dashboard",
    title: "Your Germany pathway",
    description: "Track profile readiness, job matches, interviews, and visa documents in one guided workspace.",
    primaryMetric: "92%",
    primaryLabel: "Profile readiness",
    secondaryMetric: "6",
    secondaryLabel: "Eligible jobs",
    action: "Complete profile",
    cards: [
      ["Documents", "8 of 10 ready", FileCheck2],
      ["Interview prep", "Mock session Friday", CalendarCheck],
      ["Job matches", "3 high-fit roles", BriefcaseBusiness],
    ],
    tableTitle: "Recommended next steps",
    rows: [
      ["Upload language certificate", "Profile", "Pending"],
      ["Review Hamburg nurse role", "Jobs", "Ready"],
      ["Attend mock interview", "Training", "Scheduled"],
    ],
  },
  recruiter: {
    eyebrow: "Recruiter dashboard",
    title: "Healthcare hiring pipeline",
    description: "Review candidate readiness, shortlist qualified nurses, and coordinate interviews from one workspace.",
    primaryMetric: "148",
    primaryLabel: "Active candidates",
    secondaryMetric: "37",
    secondaryLabel: "Interview-ready",
    action: "Review candidates",
    cards: [
      ["Candidate pool", "148 active profiles", UsersRound],
      ["Verified files", "92 ready for review", ShieldCheck],
      ["Interview queue", "12 this week", CalendarCheck],
    ],
    tableTitle: "Priority candidate pipeline",
    rows: [
      ["Anjali S.", "Registered Nurse", "Interview-ready"],
      ["Rahul M.", "Care Specialist", "Documents verified"],
      ["Priya K.", "Ausbildung track", "Language review"],
    ],
  },
} satisfies Record<DashboardRole, {
  eyebrow: string;
  title: string;
  description: string;
  primaryMetric: string;
  primaryLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  action: string;
  cards: [string, string, typeof BadgeCheck][];
  tableTitle: string;
  rows: [string, string, string][];
}>;

export default function DashboardShell({ role }: { role: DashboardRole }) {
  const content = roleContent[role];

  return (
    <div className="dashboard-app">
      <aside className="dashboard-sidebar">
        <a className="dashboard-brand" href="/">
          <img alt="Skillcase" src="/assets/images/SKILLCASE_logo.svg" />
        </a>
        <nav aria-label={`${content.eyebrow} navigation`}>
          <a className="is-active" href="#"><LayoutDashboard size={17} />Overview</a>
          <a href="#"><ClipboardCheck size={17} />Tasks</a>
          <a href="#"><MessageSquareText size={17} />Messages</a>
          <a href="#"><FileCheck2 size={17} />Documents</a>
        </nav>
        <a className="dashboard-logout" href="/"><LogOut size={16} />Back to website</a>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
          </div>
          <div className="dashboard-actions">
            <label className="dashboard-search">
              <Search size={15} aria-hidden="true" />
              <input aria-label="Search dashboard" placeholder="Search" />
            </label>
            <button type="button" aria-label="Notifications"><Bell size={17} /></button>
          </div>
        </header>

        <section className="dashboard-hero-card">
          <div>
            <p>{content.description}</p>
            <button className="btn btn-gold" type="button">{content.action}</button>
          </div>
          <div className="dashboard-metrics">
            <article>
              <strong>{content.primaryMetric}</strong>
              <span>{content.primaryLabel}</span>
            </article>
            <article>
              <strong>{content.secondaryMetric}</strong>
              <span>{content.secondaryLabel}</span>
            </article>
          </div>
        </section>

        <section className="dashboard-card-grid">
          {content.cards.map(([title, detail, Icon]) => (
            <article className="dashboard-card" key={title}>
              <span><Icon size={18} /></span>
              <strong>{title}</strong>
              <small>{detail}</small>
            </article>
          ))}
        </section>

        <section className="dashboard-table-card">
          <div className="dashboard-table-head">
            <h2>{content.tableTitle}</h2>
            <span><BadgeCheck size={15} />Live workspace</span>
          </div>
          <div className="dashboard-table" role="table" aria-label={content.tableTitle}>
            {content.rows.map(([name, context, status]) => (
              <div role="row" key={`${name}-${status}`}>
                <span role="cell">{name}</span>
                <span role="cell">{context}</span>
                <strong role="cell">{status}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
