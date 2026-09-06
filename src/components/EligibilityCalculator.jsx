import React, { useState, useMemo } from "react";
const qualOptions = [
  { value: "BSc Nursing", label: "BSc Nursing", sub: "4-year degree" },
  { value: "GNM Nursing", label: "GNM", sub: "3-year diploma" },
  { value: "MSc / Post Basic", label: "MSc / PB BSc", sub: "Advanced" },
  { value: "Other", label: "Other", sub: "Review needed" },
];
const expOptions = [
  { value: "Fresher", label: "Fresher" },
  { value: "Under 1 Year", label: "<1 Year" },
  { value: "1-2 Years", label: "1–2 Years" },
  { value: "2+ Years", label: "2+ Years" },
];
const germanOptions = [
  { value: "Not Started", label: "Not Started" },
  { value: "A1 / A2", label: "A1 / A2" },
  { value: "B1 / B2", label: "B1 / B2" },
];
export default function EligibilityCalculator() {
  const [qualification, setQualification] = useState("BSc Nursing");
  const [experience, setExperience] = useState("1-2 Years");
  const [germanLevel, setGermanLevel] = useState("Not Started");
  const results = useMemo(() => {
    let baseSalaryEuro = 3200;
    let baseSalaryINR = 280000;
    let timelineMonths = 12;
    let jobMatches = 85;
    if (qualification === "MSc / Post Basic") {
      baseSalaryEuro += 300;
      baseSalaryINR += 30000;
      jobMatches += 20;
    } else if (qualification === "GNM Nursing") {
      baseSalaryEuro -= 100;
      baseSalaryINR -= 10000;
      jobMatches -= 10;
    } else if (qualification === "Other") {
      baseSalaryEuro -= 200;
      baseSalaryINR -= 20000;
      timelineMonths += 2;
      jobMatches -= 30;
    }
    if (experience === "2+ Years") {
      baseSalaryEuro += 400;
      baseSalaryINR += 35000;
      jobMatches += 35;
    } else if (experience === "Fresher") {
      baseSalaryEuro -= 200;
      baseSalaryINR -= 20000;
      jobMatches -= 20;
    }
    if (germanLevel === "B1 / B2") {
      timelineMonths -= 6;
      jobMatches += 40;
      baseSalaryEuro += 150;
    } else if (germanLevel === "A1 / A2") {
      timelineMonths -= 3;
      jobMatches += 15;
    }
    return {
      euroLow: baseSalaryEuro.toLocaleString(),
      euroHigh: (baseSalaryEuro + 500).toLocaleString(),
      inrRange: `₹${(baseSalaryINR / 100000).toFixed(1)}L – ₹${((baseSalaryINR + 40000) / 100000).toFixed(1)}L`,
      timeline: `${timelineMonths}–${timelineMonths + 2} months`,
      jobs: jobMatches,
    };
  }, [qualification, experience, germanLevel]);
  return (
    <div className="ec-shell">
      {/* Inputs */}
      <div className="ec-inputs">
        {/* Qualification */}
        <fieldset className="ec-fieldset">
          <legend className="ec-legend">Your Qualification</legend>
          <div className="ec-chip-row ec-chip-row--qual">
            {qualOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setQualification(o.value)}
                className={`ec-chip ${qualification === o.value ? "ec-chip--on" : ""}`}
              >
                <span className="ec-chip-label">{o.label}</span>
                <span className="ec-chip-sub">{o.sub}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {/* Experience */}
        <fieldset className="ec-fieldset">
          <legend className="ec-legend">Clinical Experience</legend>
          <div className="ec-chip-row ec-chip-row--exp">
            {expOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setExperience(o.value)}
                className={`ec-chip ec-chip--compact ${experience === o.value ? "ec-chip--on" : ""}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* German */}
        <fieldset className="ec-fieldset">
          <legend className="ec-legend">German Language</legend>
          <div className="ec-chip-row ec-chip-row--german">
            {germanOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setGermanLevel(o.value)}
                className={`ec-chip ec-chip--compact ${germanLevel === o.value ? "ec-chip--on" : ""}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Results */}
      <div className="ec-results">
        <div className="ec-salary-block">
          <span className="ec-results-label">Estimated Monthly Salary</span>
          <strong className="ec-salary-value">
            €{results.euroLow} – €{results.euroHigh}
          </strong>
          <span className="ec-salary-inr">≈ {results.inrRange} / month</span>
        </div>

        <div className="ec-stats-row">
          <div className="ec-stat">
            <span className="ec-stat-value">{results.timeline}</span>
            <span className="ec-stat-label">To Relocate</span>
          </div>
          <div className="ec-stat-divider" />
          <div className="ec-stat">
            <span className="ec-stat-value ec-stat-value--cyan">
              {results.jobs}+
            </span>
            <span className="ec-stat-label">Matched Jobs</span>
          </div>
        </div>

        <a href="/signup" className="ec-cta">
          Start Free Application
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
        <p className="ec-fine">Zero fees · Profile takes 60 seconds</p>
      </div>
    </div>
  );
}
