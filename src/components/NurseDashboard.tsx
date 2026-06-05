import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BriefcaseIcon as Briefcase,
  FileTextIcon as FileText,
  GraduationCapIcon as GraduationCap,
  HouseSimpleIcon as HouseSimple,
  PhoneCallIcon as PhoneCall,
  SealCheckIcon as SealCheck,
  SignOutIcon as SignOut,
  UserCircleIcon as UserCircle,
  WhatsappLogoIcon as WhatsappLogo,
} from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { CandidateProfile, DashboardTab, DocumentsState, GermanLevel } from "../data/dashboardTypes";
import {
  defaultProfile,
  levelRank,
  markCelebrationSeen,
  pendingCelebration,
  readApplications,
  readCelebrations,
  readDocuments,
  readProfile,
  readStreak,
  touchStreak,
  writeProfile,
} from "../data/dashboardStorage";
import { getCohortLayout, getLevelMeta } from "../data/dashboardCohort";
import { DOCUMENT_CATALOG } from "../data/documents";
import { getCoachForLevel } from "../data/coaches";
import { MilestoneCelebration } from "./dashboard/MilestoneCelebration";
import { HomeView } from "./dashboard/HomeView";
import { LearnView } from "./dashboard/LearnView";
import { JobsView } from "./dashboard/JobsView";
import { DocumentsView } from "./dashboard/DocumentsView";
import { ApplicationsView } from "./dashboard/ApplicationsView";
import { ProfileView } from "./dashboard/ProfileView";
import { ProgressView } from "./dashboard/ProgressView";
import { ProgressRing, getFirstName, getInitials, type DashboardContext, type ReadinessTask } from "./dashboard/shared";

const TAB_META: Record<DashboardTab, { label: string; icon: Icon }> = {
  home: { label: "Home", icon: HouseSimple },
  learn: { label: "Learn", icon: GraduationCap },
  jobs: { label: "Jobs", icon: Briefcase },
  documents: { label: "Documents", icon: FileText },
  applications: { label: "Applications", icon: SealCheck },
  profile: { label: "Profile", icon: UserCircle },
  progress: { label: "Progress", icon: SealCheck },
};

export default function NurseDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("home");
  const [profile, setProfile] = useState<CandidateProfile>(defaultProfile);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [documents, setDocuments] = useState<DocumentsState>(() => ({}));
  const [applications, setApplications] = useState(() => [] as ReturnType<typeof readApplications>);
  const [streak, setStreak] = useState(() => ({ daysActive: 0, lastActiveDate: "" }));
  const [celebrationsSeen, setCelebrationsSeen] = useState(() => [] as ReturnType<typeof readCelebrations>);
  const [activeCelebration, setActiveCelebration] = useState<ReturnType<typeof pendingCelebration>>(null);
  const [saveFlash, setSaveFlash] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  // Boot
  useEffect(() => {
    const stored = readProfile();
    if (stored) setProfile(stored);
    setDocuments(readDocuments());
    setApplications(readApplications());
    setStreak(readStreak());
    setCelebrationsSeen(readCelebrations());
    touchStreak();
    setHasLoaded(true);
  }, []);

  // Persist profile after first load
  useEffect(() => {
    if (!hasLoaded) return;
    if (profile.fullName === defaultProfile.fullName && !profile.phone) return;
    writeProfile(profile);
  }, [hasLoaded, profile]);

  // Refresh local state from storage at tab change so child writes propagate
  useEffect(() => {
    if (!hasLoaded) return;
    setDocuments(readDocuments());
    setApplications(readApplications());
  }, [activeTab, hasLoaded]);

  // Lightweight polling so child-component writes (Documents upload simulation, Apply, etc.)
  // surface on Home without forcing a global event bus.
  useEffect(() => {
    if (!hasLoaded) return;
    const id = window.setInterval(() => {
      const nextDocs = readDocuments();
      const nextApps = readApplications();
      setDocuments((current) => (JSON.stringify(current) === JSON.stringify(nextDocs) ? current : nextDocs));
      setApplications((current) => (current.length === nextApps.length && JSON.stringify(current) === JSON.stringify(nextApps) ? current : nextApps));
    }, 1200);
    return () => window.clearInterval(id);
  }, [hasLoaded]);

  // Celebration trigger
  useEffect(() => {
    if (!hasLoaded) return;
    const pending = pendingCelebration(profile.germanLevel, celebrationsSeen);
    if (pending) setActiveCelebration(pending);
  }, [hasLoaded, profile.germanLevel, celebrationsSeen]);

  // Scroll to top on tab change
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [activeTab]);

  const level = getLevelMeta(profile.germanLevel);
  const completedProfileFields = useMemo(() => {
    return [
      profile.fullName && profile.fullName !== defaultProfile.fullName,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email),
      profile.phone.length >= 10,
      Boolean(profile.qualification),
      Boolean(profile.experience),
    ].filter(Boolean).length;
  }, [profile]);

  const extendedProfileFields = useMemo(() => {
    return [
      Boolean(profile.passportStatus),
      Boolean(profile.preferredCity),
      Boolean(profile.earliestStart),
      Boolean(profile.relocateFamily),
      (profile.specialties?.length ?? 0) > 0,
    ].filter(Boolean).length;
  }, [profile]);

  const profileCompleteness = Math.round(((completedProfileFields + extendedProfileFields) / 10) * 100);

  const visibleDocs = useMemo(() => DOCUMENT_CATALOG.filter((d) => level.rank >= d.unlocksAtRank), [level.rank]);
  const documentReadiness = useMemo(() => {
    if (visibleDocs.length === 0) return 0;
    const scored = visibleDocs.reduce((sum, doc) => {
      const state = documents[doc.id]?.state;
      if (state === "verified") return sum + 1;
      if (state === "under_review") return sum + 0.7;
      if (state === "uploaded") return sum + 0.4;
      if (state === "needs_revision") return sum + 0.3;
      return sum;
    }, 0);
    return Math.round((scored / visibleDocs.length) * 100);
  }, [documents, visibleDocs]);

  const matchedJobsCount = 5; // see JobsView; stable for now
  const applicationsCount = applications.length;

  const cohort = useMemo(
    () => getCohortLayout({
      level: profile.germanLevel,
      profileCompleteness,
      documentReadiness,
      matchedJobsCount,
      applicationsCount,
    }),
    [profile.germanLevel, profileCompleteness, documentReadiness, matchedJobsCount, applicationsCount],
  );

  const isB1Ready = levelRank(profile.germanLevel) >= levelRank("b1_completed");
  const b1CertVerified = documents.b1_certificate?.state === "verified";
  const canApply = isB1Ready && b1CertVerified;

  const journeyScore = useMemo(() => getJourneyScore(profile.germanLevel, completedProfileFields, documentReadiness), [profile.germanLevel, completedProfileFields, documentReadiness]);

  const readinessTasks = useMemo<ReadinessTask[]>(() => {
    return [
      { id: "phone", label: "Mobile verified", detail: profile.phone ? `+91 ${profile.phone}` : "Verify your number", status: profile.phone ? "done" : "pending", tab: "profile" },
      { id: "profile", label: "Basic profile", detail: `${profileCompleteness}% complete`, status: profileCompleteness >= 80 ? "done" : "next", tab: "profile" },
      { id: "german", label: "German B1 readiness", detail: isB1Ready ? (b1CertVerified ? "Coach verified" : "Upload your B1 certificate") : "B1 unlocks applications", status: isB1Ready ? (b1CertVerified ? "done" : "next") : "next", tab: isB1Ready ? "documents" : "learn" },
      { id: "documents", label: "Documents", detail: `${documentReadiness}% ready`, status: documentReadiness >= 90 ? "done" : documentReadiness > 0 ? "next" : level.rank >= 2 ? "pending" : "locked", tab: "documents" },
      { id: "interview", label: "Interview practice", detail: canApply ? "Book your mock" : "Unlocks at B1", status: canApply ? "next" : "locked", tab: "learn" },
    ];
  }, [profile.phone, profileCompleteness, isB1Ready, b1CertVerified, documentReadiness, canApply, level.rank]);

  const coach = useMemo(() => getCoachForLevel(profile.germanLevel), [profile.germanLevel]);

  const updateProfile = <Field extends keyof CandidateProfile>(field: Field, value: CandidateProfile[Field]) => {
    setProfile((p) => ({ ...p, [field]: value }));
  };

  const saveProfile = () => {
    writeProfile(profile);
    setSaveFlash("Profile snapshot saved · recruiters see this version.");
    window.setTimeout(() => setSaveFlash(null), 2400);
  };

  const ctx: DashboardContext = {
    profile,
    level,
    cohort,
    coach,
    documents,
    applications,
    streak,
    documentReadiness,
    profileCompleteness,
    journeyScore,
    applicationsCount,
    matchedJobsCount,
    canApply,
    readinessTasks,
    setActiveTab,
    updateProfile,
    saveProfile,
  };

  const renderTab = () => {
    switch (activeTab) {
      case "learn": return <LearnView {...ctx} />;
      case "jobs": return <JobsView {...ctx} />;
      case "documents": return <DocumentsView {...ctx} />;
      case "applications": return <ApplicationsView {...ctx} />;
      case "profile": return <ProfileView {...ctx} />;
      case "progress": return <ProgressView {...ctx} />;
      case "home":
      default: return <HomeView {...ctx} />;
    }
  };

  // All possible nav tabs in desktop sidebar (gated by cohort)
  const desktopNavTabs: DashboardTab[] = [
    "home",
    "learn",
    "jobs",
    ...(cohort.showDocuments ? (["documents"] as DashboardTab[]) : []),
    ...(cohort.showApplications ? (["applications"] as DashboardTab[]) : []),
    "profile",
    "progress",
  ];

  const handleDismissCelebration = () => {
    if (activeCelebration) {
      markCelebrationSeen(activeCelebration);
      setCelebrationsSeen(readCelebrations());
    }
    setActiveCelebration(null);
  };

  const handleCelebrationPrimary = () => {
    if (!activeCelebration) return;
    markCelebrationSeen(activeCelebration);
    setCelebrationsSeen(readCelebrations());
    if (activeCelebration === "a1_done") setActiveTab("learn");
    else if (activeCelebration === "halfway") setActiveTab("documents");
    else if (activeCelebration === "b1_unlock") setActiveTab("jobs");
    setActiveCelebration(null);
  };

  return (
    <div className={`sc-dash sc-dash-tab-${activeTab}`}>
      <header className="sc-dash-mobile-bar">
        <a className="sc-dash-mobile-brand" href="/" aria-label="Skillcase home">
          <img alt="Skillcase" src="/assets/images/SKILLCASE_logo.svg" />
        </a>
        <div className="sc-dash-mobile-tools">
          <a className="sc-dash-mobile-call" href={`tel:${coach.phone}`} aria-label={`Call ${coach.name}`}>
            <PhoneCall size={16} weight="bold" />
          </a>
          <button className="sc-dash-mobile-avatar" type="button" aria-label="Profile" onClick={() => setActiveTab("profile")}>
            {getInitials(profile.fullName)}
          </button>
        </div>
      </header>

      <div className="sc-dash-shell">
        <aside className="sc-dash-side" aria-label="Dashboard navigation">
          <a className="sc-dash-side-brand" href="/">
            <img alt="Skillcase" src="/assets/images/SKILLCASE_logo.svg" />
          </a>

          <div className="sc-dash-side-profile">
            <span className="sc-dash-side-avatar">{getInitials(profile.fullName)}</span>
            <div>
              <strong>{profile.fullName === defaultProfile.fullName ? "Skillcase Nurse" : profile.fullName}</strong>
              <small>{profile.qualification || "Add qualification"} · {level.shortLabel}</small>
            </div>
          </div>

          <nav className="sc-dash-side-nav">
            {desktopNavTabs.map((id) => {
              const tab = TAB_META[id];
              const TabIcon = tab.icon;
              return (
                <button
                  key={id}
                  type="button"
                  className={`sc-dash-side-link ${activeTab === id ? "is-active" : ""}`}
                  onClick={() => setActiveTab(id)}
                >
                  <TabIcon size={18} weight={activeTab === id ? "fill" : "bold"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="sc-dash-side-coach-card">
            <div className="sc-dash-side-coach-head">
              <img alt="" src={coach.photo} />
              <div>
                <strong>{coach.name}</strong>
                <small>{coach.role}</small>
                <em><span className="sc-dash-side-coach-dot" aria-hidden="true" />Replies in ~{Math.round(coach.responseSlaMin / 60)} hr</em>
              </div>
            </div>
            <div className="sc-dash-side-coach-actions">
              <a className="is-whatsapp" href={`https://wa.me/${coach.whatsApp}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${coach.name}`}>
                <WhatsappLogo size={15} weight="bold" /> WhatsApp
              </a>
              <a className="is-call" href={`tel:${coach.phone}`} aria-label={`Call ${coach.name}`}>
                <PhoneCall size={15} weight="bold" /> Call
              </a>
            </div>
          </div>

          <a className="sc-dash-side-signout" href="/" aria-label="Sign out">
            <SignOut size={15} weight="bold" />
            Log out
          </a>
        </aside>

        <main className="sc-dash-main" ref={mainRef}>
          <div className="sc-dash-top">
            <div className="sc-dash-top-copy">
              <span className="sc-dash-hi">Hi {getFirstName(profile.fullName)}</span>
              <h1>you're {journeyScore}% of the way to Germany</h1>
            </div>
            <ProgressRing value={journeyScore} size={84} label="to Germany" segmented flag />
          </div>

          {renderTab()}

          {saveFlash && (
            <div className="sc-dash-toast" role="status">
              <SealCheck size={14} weight="fill" />
              {saveFlash}
            </div>
          )}
        </main>
      </div>

      <nav className="sc-dash-bottom" aria-label="Dashboard sections" style={{ gridTemplateColumns: `repeat(${cohort.bottomTabs.length}, 1fr)` }}>
        {cohort.bottomTabs.map((id) => {
          const tab = TAB_META[id];
          const TabIcon = tab.icon;
          return (
            <button
              key={id}
              type="button"
              className={`sc-dash-bottom-link ${activeTab === id ? "is-active" : ""}`}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? "page" : undefined}
            >
              <TabIcon size={20} weight={activeTab === id ? "fill" : "bold"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <a className="sc-dash-fab" href={`https://wa.me/${coach.whatsApp}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${coach.name}`}>
        <WhatsappLogo size={22} weight="fill" />
      </a>

      {activeCelebration && (
        <MilestoneCelebration
          kind={activeCelebration}
          onDismiss={handleDismissCelebration}
          onPrimary={handleCelebrationPrimary}
        />
      )}
    </div>
  );
}

function getJourneyScore(level: GermanLevel, completedProfileFields: number, documentReadiness: number): number {
  const base: Record<GermanLevel, number> = {
    not_started: 8,
    a1_completed: 22,
    a2_completed: 36,
    b1_in_progress: 50,
    b1_completed: 68,
    b2_in_progress: 78,
    b2_completed: 86,
  };
  const profileBonus = completedProfileFields * 1.5;
  const docBonus = documentReadiness * 0.05;
  return Math.min(96, Math.round(base[level] + profileBonus + docBonus));
}
