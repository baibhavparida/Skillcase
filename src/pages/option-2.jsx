import { useEffect, useState } from "react";
import "../styles/healthcare-options.css";
import BaseLayout from "../layouts/BaseLayout.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import LearnerMarquee from "../components/LearnerMarquee.jsx";
import CandidateStories from "../components/CandidateStories.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import Icon from "../components/healthcare/Icon.jsx";
import useRotation, { tabKeyHandler } from "../components/healthcare/useRotation.js";
import {
  BenefitsSection,
  BlogsSection,
  FaqSection,
  PodcastSection,
  ServicesStrip,
  WebinarSection,
} from "../components/healthcare/SharedSections.jsx";
import { ausbildung, professions, signupHref } from "../data/professions.js";

// Option 2, "Pick your profession": choice-first. The hero is a profession
// explorer on a navy stage; the page then compares every pathway side by side.

function RoleExplorerHero() {
  const { active, choose, rotating, holdProps, delay } = useRotation(professions.length, 4200);
  // Only the first portrait loads with the page; the rest load once it settles.
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const role = professions[active];

  useEffect(() => {
    const timer = window.setTimeout(
      () => setLoaded(new Set(professions.map((_, index) => index))),
      1200,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoaded((current) => (current.has(active) ? current : new Set(current).add(active)));
  }, [active]);

  return (
    <section className="hc2-hero" aria-labelledby="hc2-title">
      <div className="hc2-hero-inner">
        <div className="hc2-copy">
          <p className="hc2-kicker">For India’s healthcare professionals</p>
          <h1 id="hc2-title">
            <span className="hc-sr-only">
              Germany needs nurses, doctors, physiotherapists, lab technologists and radiographers.
            </span>
            <span className="hc2-title-static" aria-hidden="true">
              Germany needs
            </span>
            <span className="hc2-title-swap" aria-hidden="true">
              <span className="hc2-title-word" key={role.key}>
                {role.plural}.
              </span>
            </span>
          </h1>
          <p className="hc2-lede">
            From medical German to your first shift: one guided pathway, shaped around your
            profession. No recruitment fees.
          </p>

          <div className="hc2-tabs" role="tablist" aria-label="Choose your profession" {...holdProps}>
            {professions.map((item, index) => (
              <button
                key={item.key}
                id={`hc2-tab-${item.key}`}
                className="hc2-tab"
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-controls="hc2-panel"
                tabIndex={index === active ? 0 : -1}
                onClick={() => choose(index)}
                onKeyDown={tabKeyHandler(index, professions.length, choose)}
              >
                <Icon name={item.icon} size={16} />
                {item.title}
              </button>
            ))}
          </div>
          <div className="hc2-progress" aria-hidden="true">
            {rotating && <span key={active} style={{ animationDuration: `${delay}ms` }} />}
          </div>
        </div>

        <div className="hc2-stage" {...holdProps}>
          <div className="hc2-portraits">
            {professions.map(
              (item, index) =>
                loaded.has(index) && (
                  <ResponsiveImage
                    key={item.key}
                    className={index === active ? "is-active" : undefined}
                    src={item.portrait}
                    alt={index === active ? item.portraitAlt : ""}
                    aria-hidden={index === active ? undefined : "true"}
                    loading="eager"
                    fetchPriority={index === 0 ? "high" : undefined}
                    sizes="(max-width: 760px) 92vw, 440px"
                  />
                ),
            )}
          </div>

          <div
            className="hc2-panel"
            id="hc2-panel"
            role="tabpanel"
            aria-labelledby={`hc2-tab-${role.key}`}
          >
            <p className="hc2-panel-german" lang="de">
              {role.germanTitle}
            </p>
            <h2>{role.title}</h2>
            <dl className="hc2-panel-facts">
              <div>
                <dt>Language goal</dt>
                <dd>{role.language}</dd>
              </div>
              <div>
                <dt>Route</dt>
                <dd>{role.route}</dd>
              </div>
            </dl>
            <div className="hc2-panel-actions">
              <a className="btn btn-gold" href={signupHref(role.key)}>
                Start as a {role.singular}
                <Icon name="arrow-right" size={16} />
              </a>
              <a className="hc2-panel-link" href="#pathways">
                Compare pathways
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PathwayIndex() {
  return (
    <section className="section hc2-pathways" id="pathways" aria-labelledby="hc2-pathways-title">
      <div className="section-heading">
        <p className="eyebrow">Compare pathways</p>
        <h2 id="hc2-pathways-title">What each pathway asks of you</h2>
        <p>
          Language goals and recognition routes at a glance. Your advisor confirms the details for
          your state and employer.
        </p>
      </div>

      <div className="hc2-index">
        <div className="hc2-index-head" aria-hidden="true">
          <span>Profession</span>
          <span>Language goal</span>
          <span>Route</span>
          <span>Exam to aim for</span>
        </div>
        <ul className="hc2-index-rows">
          {professions.map((item) => (
            <li className="hc2-row" key={item.key}>
              <div className="hc2-row-who">
                <ResponsiveImage
                  className="hc2-row-face"
                  src={item.portrait}
                  alt=""
                  sizes="64px"
                />
                <div>
                  <h3>{item.label}</h3>
                  <p lang="de">{item.germanTitle}</p>
                </div>
              </div>
              <dl className="hc2-row-facts">
                <div>
                  <dt>Language goal</dt>
                  <dd>{item.language}</dd>
                </div>
                <div>
                  <dt>Route</dt>
                  <dd>{item.route}</dd>
                </div>
                <div>
                  <dt>Exam to aim for</dt>
                  <dd>{item.exam}</dd>
                </div>
              </dl>
              <a
                className="hc2-row-cta"
                href={signupHref(item.key)}
                aria-label={`Start the ${item.singular} pathway`}
              >
                <span className="hc2-row-cta-text">Start</span>
                <Icon name="arrow-right" size={16} />
              </a>
            </li>
          ))}
        </ul>

        <a className="hc2-ausbildung" href={signupHref(ausbildung.key)}>
          <span className="hc2-ausbildung-icon">
            <Icon name={ausbildung.icon} size={22} />
          </span>
          <span className="hc2-ausbildung-copy">
            <strong>Finished 12th and not qualified yet?</strong>
            <span>
              Train for three years in Germany with a monthly stipend through an Ausbildung. Start
              with {ausbildung.language}.
            </span>
          </span>
          <span className="hc2-ausbildung-cta">
            Explore Ausbildung
            <Icon name="arrow-right" size={16} />
          </span>
        </a>
      </div>
    </section>
  );
}

export default function OptionTwo() {
  return (
    <BaseLayout
      title="Skillcase | Healthcare Careers in Germany"
      description="Skillcase helps Indian nurses, doctors, physiotherapists and medical technologists build careers in Germany with medical German training, recognition guidance and job placement."
      robots="noindex"
    >
      <div className="site-shell hc-page">
        <SiteHeader active="home" />

        <main>
          <RoleExplorerHero />
          <ServicesStrip />
          <PathwayIndex />
          <LearnerMarquee />
          <BenefitsSection pathwaysHref="#pathways" />
          <CandidateStories
            title="Real learners. Real progress toward Germany."
            intro="Hear directly from Skillcase learners building their German and preparing for healthcare careers in Germany."
          />
          <AppJourneyShowcase />
          <WebinarSection />
          <BlogsSection />
          <PodcastSection />
          <FaqSection />
        </main>

        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
