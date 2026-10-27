import BaseLayout from "../layouts/BaseLayout.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import CandidateStories from "../components/CandidateStories.jsx";
import {
  BlogSection,
  FaqSection,
  PodcastSection,
  WebinarSection,
} from "../components/HomeSections.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import LearnerMarquee from "../components/LearnerMarquee.jsx";
import PlacedHero from "../components/PlacedHero.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import RoleList from "../components/RoleList.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import { formatLakhRange } from "../data/placements.js";
import { salaryRange } from "../data/roles.js";
import "../styles/home.css";

// The live homepage, written for every healthcare profession. Sections follow
// the questions a visitor asks in turn: what is this (hero), is it for me
// (roles), how do I get there (how it works), is it worth it (benefits, then
// the numbers), can I trust it (learners, stories), can I start now (app), and
// finally a free webinar, reading, podcast and FAQ. The previous homepage
// stays untouched at /home-legacy.

const payRange = formatLakhRange(salaryRange);

const benefits = [
  {
    className: "benefit-card-earnings",
    title: "10x your earning potential",
    copy: "Earn up to 10x your current salary, plus performance bonuses and allowances in Germany.",
    points: ["German salary range", "Allowances + bonuses", "Financial planning"],
    image: "/assets/images/o4-benefit-contract.webp",
    alt: "Indian nurse shaking hands with a hospital HR manager after signing her German job contract",
    salary: true,
  },
  {
    className: "benefit-card-family",
    title: "Settle abroad with your family",
    copy: "Bring your spouse and children to Germany with guidance on family reunification and work rights.",
    points: ["Spouse support", "Children included", "Work rights guidance"],
    image: "/assets/images/o4-benefit-reunion.webp",
    alt: "Indian family reunited with hugs at an airport in Germany",
  },
  {
    className: "benefit-card-education",
    title: "World-class healthcare and education",
    copy: "Access high-quality healthcare and affordable education for your family while living in Germany.",
    points: ["Resident healthcare", "Quality education", "Affordable schooling", "Ongoing mentorship"],
    image: "/assets/images/o4-benefit-school.webp",
    alt: "Indian mother adjusting her daughter’s school bag outside a primary school in Germany",
  },
  {
    className: "benefit-card-residency",
    title: "Pathway to permanent residency",
    copy: "Get guidance on the work, language, and integration steps required for permanent residency.",
    points: ["Document roadmap", "Language milestones", "PR pathway guidance"],
    image: "/assets/images/o4-benefit-home.webp",
    alt: "Indian family smiling with the keys to their new home in Germany",
  },
];

const globeMarkers = [
  ["india", "India"],
  ["germany", "Germany"],
  ["japan", "Japan"],
  ["uae", "UAE"],
  ["uk", "UK"],
  ["australia", "Australia"],
];

export default function Home({ isPrimaryHome = false }) {
  return (
    <BaseLayout robots={isPrimaryHome ? undefined : "noindex"}>
      <div className="site-shell home-page">
        <SiteHeader active="home" />

        <main>
          <PlacedHero />

          <RoleList />

          <HowItWorks />

          <section className="section benefits-section">
            <div className="section-heading">
              <p className="eyebrow">Why choose Skillcase</p>
              <h2>A practical move with long-term upside.</h2>
              <p>See what a healthcare career in Germany can offer you.</p>
            </div>
            <div className="benefit-grid">
              {benefits.map((card) => (
                <article className={`benefit-card ${card.className}`} key={card.title}>
                  <div className="benefit-copy">
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                    <div
                      className="benefit-points benefit-points-grid"
                      aria-label={`${card.title} highlights`}
                    >
                      {card.points.map((point) => (
                        <span key={point}>
                          <span data-icon="check-circle-2" data-size="13"></span>
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="benefit-media">
                    <ResponsiveImage alt={card.alt} src={card.image} />
                    {card.salary && (
                      <div className="benefit-ui salary-ui" aria-hidden="true">
                        <strong>
                          {payRange} <span>per month</span>
                        </strong>
                        <div className="salary-bars">
                          <div>
                            <small>Current</small>
                            <i style={{ "--bar-width": "32%" }}></i>
                          </div>
                          <div>
                            <small>Germany</small>
                            <i style={{ "--bar-width": "94%" }}></i>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section metric-section">
            <section className="globe-feature">
              <div className="globe-card-header">
                <p className="eyebrow">Global opportunities</p>
                <h2>India’s healthcare talent, ready for global opportunities</h2>
              </div>
              <div className="globe-copy">
                <div className="opportunity-metrics">
                  <article className="metric-card opportunity-metric">
                    <span className="metric-label">Healthcare demand</span>
                    <strong>500,000+</strong>
                    <p>Healthcare professionals needed in Germany by 2030</p>
                  </article>
                  <article className="metric-card opportunity-metric">
                    <span className="metric-label">Typical monthly salary</span>
                    <strong>{payRange}</strong>
                    <p>Gross pay for nurses, doctors, physios and technicians</p>
                  </article>
                  <article className="metric-card opportunity-metric">
                    <span className="metric-label">Transparent support</span>
                    <strong>Free</strong>
                    <p>No agent or recruitment fees. Fully transparent.</p>
                  </article>
                </div>
              </div>
              <div className="globe-stage" aria-label="Global healthcare routes from India">
                <div className="opportunity-cobe-globe" data-globe="">
                  <canvas></canvas>
                  {globeMarkers.map(([marker, label]) => (
                    <div className="cobe-marker-label" data-marker={marker} key={marker}>
                      {label}
                      <span aria-hidden="true"></span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>

          <LearnerMarquee />

          <CandidateStories
            title="Real learners. Real progress toward Germany."
            intro="Hear directly from Skillcase learners building their German and preparing for healthcare careers in Germany."
          />

          <AppJourneyShowcase />

          <WebinarSection />

          <BlogSection />

          <PodcastSection />

          <FaqSection />
        </main>

        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
