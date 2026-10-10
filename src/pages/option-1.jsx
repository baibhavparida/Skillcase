import "../styles/healthcare-options.css";
import BaseLayout from "../layouts/BaseLayout.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import LearnerMarquee from "../components/LearnerMarquee.jsx";
import CandidateStories from "../components/CandidateStories.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import ArtDirectedImage from "../components/healthcare/ArtDirectedImage.jsx";
import Icon from "../components/healthcare/Icon.jsx";
import {
  BenefitsSection,
  BlogsSection,
  FaqSection,
  PodcastSection,
  WebinarSection,
} from "../components/healthcare/SharedSections.jsx";
import { ausbildung, professions, signupHref } from "../data/professions.js";

// Option 1, "Every specialty": people-first. Closest to the live homepage,
// with a mixed-team hero and a profession bar so every visitor finds their
// field within the first screen.
const roles = [...professions, ausbildung];

export default function OptionOne() {
  return (
    <BaseLayout
      title="Skillcase | Healthcare Careers in Germany"
      description="Skillcase helps Indian nurses, doctors, physiotherapists and medical technologists build careers in Germany with medical German training, recognition guidance and job placement."
      robots="noindex"
    >
      <div className="site-shell hc-page">
        <SiteHeader active="home" />

        <main>
          <section className="hc1-hero" id="top" aria-labelledby="hc1-title">
            <ArtDirectedImage
              className="hc1-hero-media"
              src="/assets/images/hero-team-wide.webp"
              mobileSrc="/assets/images/hero-team-mobile.webp"
              alt="Indian doctor, nurse, physiotherapist and lab technologist walking together through a German hospital atrium"
              loading="eager"
              fetchPriority="high"
            />
            <div className="hc1-hero-inner">
              <p className="hc1-kicker">
                <Icon name="sparkle" size={14} weight="fill" />
                Now for every healthcare profession
              </p>
              <h1 id="hc1-title">Bring your healthcare career to Germany</h1>
              <p className="hc1-lede">
                Medical German, recognition support and job placement for nurses, doctors,
                physiotherapists and medical technologists. No recruitment fees.
              </p>
              <div className="hero-actions">
                <a className="btn btn-gold" href="#roles">
                  Find my pathway
                  <Icon name="arrow-down" size={16} />
                </a>
                <a
                  className="btn btn-outline hero-app-cta"
                  href="https://play.google.com/store/apps/details?id=com.skillcase.app&hl=en_IN"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src="/assets/images/google-play-mark.svg" alt="" aria-hidden="true" />
                  Download App
                </a>
              </div>
            </div>

            <nav className="hc1-roles-bar" aria-label="Pathways by profession">
              <div className="hc1-roles-bar-inner">
                <span className="hc1-roles-label">I’m a</span>
                <div className="hc1-roles-scroll">
                  {roles.map((role) => (
                    <a href={`#role-${role.key}`} key={role.key}>
                      <Icon name={role.icon} size={16} />
                      {role.key === "ausbildung" ? "Student" : role.title}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
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
                    <span className="metric-label">Career pathways</span>
                    <strong>6</strong>
                    <p>Nursing, medicine, physiotherapy, lab, radiology and Ausbildung</p>
                  </article>
                  <article className="metric-card opportunity-metric">
                    <span className="metric-label">Transparent support</span>
                    <strong>Free</strong>
                    <p>No agent or recruitment fees. Fully transparent.</p>
                  </article>
                </div>
                <a className="btn btn-gold globe-action" href="/signup/">
                  Create Profile
                  <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
                </a>
              </div>
              <div className="globe-stage" aria-label="Global healthcare routes from India">
                <div className="opportunity-cobe-globe" data-globe="">
                  <canvas></canvas>
                  {["india", "germany", "japan", "uae", "uk", "australia"].map((marker) => (
                    <div className="cobe-marker-label" data-marker={marker} key={marker}>
                      {{ india: "India", germany: "Germany", japan: "Japan", uae: "UAE", uk: "UK", australia: "Australia" }[marker]}
                      <span aria-hidden="true"></span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>

          <section className="section hc1-roles" id="roles" aria-labelledby="hc1-roles-title">
            <div className="section-heading">
              <p className="eyebrow">Who can apply</p>
              <h2 id="hc1-roles-title">Six ways into German healthcare</h2>
              <p>
                For qualified professionals and for students starting out. Each pathway shows the
                German level and the recognition route it usually needs.
              </p>
            </div>
            <div className="hc1-role-grid">
              {roles.map((role, index) => (
                <article
                  className={`hc1-role-card${index < 2 ? " is-featured" : ""}`}
                  id={`role-${role.key}`}
                  key={role.key}
                >
                  <div className="hc1-role-media">
                    <ResponsiveImage
                      src={role.scene}
                      alt={role.sceneAlt}
                      sizes={index < 2 ? "(max-width: 760px) 100vw, 320px" : "(max-width: 760px) 50vw, 300px"}
                    />
                  </div>
                  <div className="hc1-role-body">
                    <p className="hc1-role-german" lang="de">
                      {role.germanTitle}
                    </p>
                    <h3>{role.key === "ausbildung" ? "Students (Ausbildung)" : role.label}</h3>
                    <p className="hc1-role-summary">{role.summary}</p>
                    <ul className="hc1-role-facts">
                      <li>
                        <span data-icon="languages" data-size="14"></span>
                        {role.language}
                      </li>
                      <li>
                        <span data-icon="file-check-2" data-size="14"></span>
                        {role.route}
                      </li>
                    </ul>
                    <div className="hc1-role-actions">
                      <a className="btn btn-gold" href={signupHref(role.key)}>
                        Apply now
                      </a>
                      {role.jobs && <small>{role.jobs}</small>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <LearnerMarquee />

          <BenefitsSection pathwaysHref="#roles" />

          <WebinarSection />

          <CandidateStories
            title="Real learners. Real progress toward Germany."
            intro="Hear directly from Skillcase learners building their German and preparing for healthcare careers in Germany."
          />

          <AppJourneyShowcase />

          <BlogsSection />

          <PodcastSection />

          <FaqSection />
        </main>

        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
