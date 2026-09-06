import ResponsiveImage from "../components/ResponsiveImage.jsx";
import BaseLayout from "../layouts/BaseLayout.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import SearchTimeline from "../components/SearchTimeline";
import CandidateStories from "../components/CandidateStories.jsx";
import LearnerMarquee from "../components/LearnerMarquee.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
export default function HomeLegacy({ isPrimaryHome = false }) {
  return (
    <>
      <BaseLayout robots={isPrimaryHome ? undefined : "noindex"}>
        <div className="site-shell">
          <SiteHeader active="home" />

          <main>
            <section className="hero-section hero-background" id="top">
              <ResponsiveImage
                alt="Indian nurse walking through Berlin in a Germany healthcare career setting"
                className="hero-bg-image"
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 760px) 900px, 100vw"
                src="/assets/images/hero.webp"
              />
              <div className="hero-copy">
                <a
                  className="webinar-pill"
                  href="https://learner.skillcase.in/events/7cdknjvd"
                >
                  <span className="webinar-pill-icon" aria-hidden="true">
                    <span data-icon="video" data-size="15"></span>
                  </span>
                  <span className="webinar-pill-copy">
                    <span>Live webinar</span>
                    <strong>Nursing jobs in Germany</strong>
                  </span>
                  <span className="webinar-pill-arrow" aria-hidden="true">
                    <span data-icon="arrow-right" data-size="13"></span>
                  </span>
                </a>
                <h1>Land your healthcare job in Germany</h1>
                <p>
                  Explore healthcare jobs in Germany with expert support at
                  every step.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-gold" href="#jobs">
                    See Jobs
                    <span
                      data-icon="arrow-right"
                      data-size="16"
                      aria-hidden="true"
                    ></span>
                  </a>
                </div>
              </div>
            </section>

            <section
              className="offer-strip"
              aria-label="Skillcase support services"
            >
              <div className="offer-marquee">
                <div className="offer-marquee-track">
                  <span className="offer-chip">
                    <span data-icon="graduation-cap" data-size="15"></span>
                    German language training
                  </span>
                  <span className="offer-chip">
                    <span data-icon="shield-check" data-size="15"></span>Visa
                    support
                  </span>
                  <span className="offer-chip">
                    <span data-icon="badge-check" data-size="15"></span>
                    Interview preparation
                  </span>
                  <span className="offer-chip">
                    <span data-icon="file-check-2" data-size="15"></span>
                    Documentation review
                  </span>
                  <span className="offer-chip">
                    <span data-icon="clipboard-check" data-size="15"></span>
                    Profile assessment
                  </span>
                  <span className="offer-chip">
                    <span data-icon="heart-handshake" data-size="15"></span>Job
                    matching
                  </span>
                  <span className="offer-chip">
                    <span data-icon="briefcase-business" data-size="15"></span>
                    CV guidance
                  </span>
                  <span className="offer-chip">
                    <span data-icon="plane-takeoff" data-size="15"></span>
                    Relocation planning
                  </span>
                  <span className="offer-chip">
                    <span data-icon="stethoscope" data-size="15"></span>Employer
                    coordination
                  </span>
                  <span className="offer-chip">
                    <span data-icon="users-round" data-size="15"></span>Family
                    settlement guidance
                  </span>
                  <span className="offer-chip">
                    <span data-icon="graduation-cap" data-size="15"></span>
                    German language training
                  </span>
                  <span className="offer-chip">
                    <span data-icon="shield-check" data-size="15"></span>Visa
                    support
                  </span>
                  <span className="offer-chip">
                    <span data-icon="badge-check" data-size="15"></span>
                    Interview preparation
                  </span>
                  <span className="offer-chip">
                    <span data-icon="file-check-2" data-size="15"></span>
                    Documentation review
                  </span>
                  <span className="offer-chip">
                    <span data-icon="clipboard-check" data-size="15"></span>
                    Profile assessment
                  </span>
                  <span className="offer-chip">
                    <span data-icon="heart-handshake" data-size="15"></span>Job
                    matching
                  </span>
                  <span className="offer-chip">
                    <span data-icon="briefcase-business" data-size="15"></span>
                    CV guidance
                  </span>
                  <span className="offer-chip">
                    <span data-icon="plane-takeoff" data-size="15"></span>
                    Relocation planning
                  </span>
                  <span className="offer-chip">
                    <span data-icon="stethoscope" data-size="15"></span>Employer
                    coordination
                  </span>
                  <span className="offer-chip">
                    <span data-icon="users-round" data-size="15"></span>Family
                    settlement guidance
                  </span>
                </div>
              </div>
            </section>

            <section className="section metric-section">
              <section className="globe-feature">
                <div className="globe-card-header">
                  <p className="eyebrow">Global opportunities</p>
                  <h2>
                    India’s healthcare talent, ready for global opportunities
                  </h2>
                </div>
                <div className="globe-copy">
                  <div className="opportunity-metrics">
                    <article className="metric-card opportunity-metric">
                      <span className="metric-label">Healthcare demand</span>
                      <strong>500,000+</strong>
                      <p>Healthcare professionals needed in Germany by 2030</p>
                    </article>
                    <article className="metric-card opportunity-metric">
                      <span className="metric-label">Average gross salary</span>
                      <strong>₹3.2–₹3.8L</strong>
                      <p>Typical gross salary for registered nurses</p>
                    </article>
                    <article className="metric-card opportunity-metric">
                      <span className="metric-label">Transparent support</span>
                      <strong>Free</strong>
                      <p>No agent or recruitment fees. Fully transparent.</p>
                    </article>
                  </div>
                  <a className="btn btn-gold globe-action" href="/signup/">
                    Create Profile
                    <span
                      data-icon="arrow-right"
                      data-size="16"
                      aria-hidden="true"
                    ></span>
                  </a>
                </div>
                <div
                  className="globe-stage"
                  aria-label="Global healthcare routes from India"
                >
                  <div className="opportunity-cobe-globe" data-globe="">
                    <canvas></canvas>
                    <div className="cobe-marker-label" data-marker="india">
                      India<span aria-hidden="true"></span>
                    </div>
                    <div className="cobe-marker-label" data-marker="germany">
                      Germany<span aria-hidden="true"></span>
                    </div>
                    <div className="cobe-marker-label" data-marker="japan">
                      Japan<span aria-hidden="true"></span>
                    </div>
                    <div className="cobe-marker-label" data-marker="uae">
                      UAE<span aria-hidden="true"></span>
                    </div>
                    <div className="cobe-marker-label" data-marker="uk">
                      UK<span aria-hidden="true"></span>
                    </div>
                    <div className="cobe-marker-label" data-marker="australia">
                      Australia<span aria-hidden="true"></span>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            <LearnerMarquee />

            <section className="section benefits-section">
              <div className="section-heading">
                <p className="eyebrow">Why choose Skillcase</p>
                <h2>A practical move with long-term upside.</h2>
                <p>See what a healthcare career in Germany can offer you.</p>
              </div>
              <div className="benefit-grid">
                <article className="benefit-card benefit-card-earnings">
                  <div className="benefit-copy">
                    <h3>10x your earning potential</h3>
                    <p>
                      Earn up to 10x your current salary, plus performance
                      bonuses and allowances in Germany.
                    </p>
                    <div
                      className="benefit-points"
                      aria-label="10x your earning potential highlights"
                    >
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        German salary range
                      </span>
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Allowances + bonuses
                      </span>
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Financial planning
                      </span>
                    </div>
                    <a href="#pathway">
                      See the pathway
                      <span
                        data-icon="arrow-right"
                        data-size="14"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </div>
                  <div className="benefit-media">
                    <ResponsiveImage
                      alt="Indian nurse reviewing overseas career documents with a Skillcase advisor"
                      src="/assets/images/benefit-earnings.webp"
                    />
                    <div className="benefit-ui salary-ui" aria-hidden="true">
                      <strong>
                        ₹3.2L–₹3.8L <span>per month</span>
                      </strong>
                      <div className="salary-bars">
                        <div>
                          <small>Current</small>
                          <i
                            style={{
                              "--bar-width": "32%",
                            }}
                          ></i>
                        </div>
                        <div>
                          <small>Germany</small>
                          <i
                            style={{
                              "--bar-width": "94%",
                            }}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="benefit-card benefit-card-family">
                  <div className="benefit-copy">
                    <h3>Settle abroad with your family</h3>
                    <p>
                      Bring your spouse and children to Germany with guidance on
                      family reunification and work rights.
                    </p>
                    <div
                      className="benefit-points"
                      aria-label="Settle abroad with your family highlights"
                    >
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Spouse support
                      </span>
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Children included
                      </span>
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Work rights guidance
                      </span>
                    </div>
                    <a href="#pathway">
                      See the pathway
                      <span
                        data-icon="arrow-right"
                        data-size="14"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </div>
                  <div className="benefit-media">
                    <ResponsiveImage
                      alt="Indian healthcare professional with family preparing for relocation to Germany"
                      src="/assets/images/family-settlement.webp"
                    />
                  </div>
                </article>

                <article className="benefit-card benefit-card-education">
                  <div className="benefit-copy">
                    <h3>World-class healthcare and education</h3>
                    <p>
                      Access high-quality healthcare and affordable education
                      for your family while living in Germany.
                    </p>
                    <div
                      className="benefit-points"
                      aria-label="World-class healthcare and education highlights"
                    >
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Resident healthcare
                      </span>
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Quality education
                      </span>
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Ongoing mentorship
                      </span>
                    </div>
                    <a href="#pathway">
                      See the pathway
                      <span
                        data-icon="arrow-right"
                        data-size="14"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </div>
                  <div className="benefit-media">
                    <ResponsiveImage
                      alt="Indian nurses in a training and mentorship session"
                      src="/assets/images/benefit-education.webp"
                    />
                  </div>
                </article>

                <article className="benefit-card benefit-card-residency">
                  <div className="benefit-copy">
                    <h3>Pathway to permanent residency</h3>
                    <p>
                      Get guidance on the work, language, and integration steps
                      required for permanent residency.
                    </p>
                    <div
                      className="benefit-points"
                      aria-label="Pathway to permanent residency highlights"
                    >
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Document roadmap
                      </span>
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        Language milestones
                      </span>
                      <span>
                        <span data-icon="check-circle-2" data-size="13"></span>
                        PR pathway guidance
                      </span>
                    </div>
                    <a href="#pathway">
                      See the pathway
                      <span
                        data-icon="arrow-right"
                        data-size="14"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </div>
                  <div className="benefit-media">
                    <ResponsiveImage
                      alt="Visa and documentation support for an Indian healthcare professional"
                      src="/assets/images/benefit-residency.webp"
                    />
                  </div>
                </article>
              </div>
            </section>

            <section className="section webinar-section" id="register-webinar">
              <div className="webinar-card">
                <div className="webinar-copy">
                  <div className="webinar-kicker-row">
                    <p className="eyebrow webinar-eyebrow">Free live webinar</p>
                    <span className="webinar-note webinar-note-top">
                      <span
                        data-icon="badge-check"
                        data-size="14"
                        aria-hidden="true"
                      ></span>
                      Limited live seats
                    </span>
                  </div>
                  <h2>Live webinar – nursing jobs in Germany</h2>
                  <p className="webinar-lede">
                    Get clear guidance on eligibility, documents, interviews,
                    salary, and your next steps.
                  </p>
                  <div className="webinar-details" aria-label="Webinar details">
                    <div className="webinar-detail">
                      <span
                        data-icon="video"
                        data-size="22"
                        aria-hidden="true"
                      ></span>
                      <span>Live session</span>
                      <strong>Today · 8:00 PM IST</strong>
                    </div>
                    <div className="webinar-detail">
                      <span
                        data-icon="badge-check"
                        data-size="22"
                        aria-hidden="true"
                      ></span>
                      <span>Access</span>
                      <strong>Free registration</strong>
                    </div>
                    <div className="webinar-detail">
                      <span
                        data-icon="map-pin"
                        data-size="22"
                        aria-hidden="true"
                      ></span>
                      <span>Pathway</span>
                      <strong>Nursing jobs in Germany</strong>
                    </div>
                  </div>
                  <div className="webinar-actions">
                    <a
                      className="btn btn-outline webinar-secondary-cta"
                      href="https://learner.skillcase.in/events/7cdknjvd"
                    >
                      Register Now for Free
                      <span
                        data-icon="arrow-right"
                        data-size="16"
                        aria-hidden="true"
                      ></span>
                    </a>
                  </div>
                </div>
                <div className="webinar-media">
                  <ResponsiveImage
                    alt="Indian nurses attending a Germany healthcare webinar"
                    src="/assets/images/webinar-nurses.webp"
                  />
                  <div className="play-orb" aria-hidden="true">
                    <span data-icon="play-filled" data-size="18"></span>
                  </div>
                </div>
              </div>
            </section>

            <section className="section apply-section" id="jobs">
              <div className="section-heading">
                <p className="eyebrow">Job seeker?</p>
                <h2>Who can apply?</h2>
                <p>
                  Explore Germany pathways for nurses, with support from
                  application to relocation.
                </p>
              </div>
              <div className="job-grid">
                <article className="job-card job-card-jobs">
                  <div className="job-card-content">
                    <span className="job-badge">
                      <span
                        data-icon="stethoscope"
                        data-size="15"
                        aria-hidden="true"
                      ></span>
                      Germany pathway
                    </span>
                    <h3>Nurses (Jobs)</h3>
                    <p>
                      Paid clinical roles in Germany for qualified nurses, with
                      support through relocation.
                    </p>
                    <div className="job-meta">
                      <span>
                        <span data-icon="map-pin" data-size="14"></span>Hamburg,
                        Germany
                      </span>
                      <span>
                        <span
                          data-icon="briefcase-business"
                          data-size="14"
                        ></span>
                        100+ jobs available
                      </span>
                    </div>
                    <div className="job-card-actions">
                      <a className="btn btn-gold" href="/signup/">
                        Apply Now
                      </a>
                      <small>No recruitment charges</small>
                    </div>
                  </div>
                  <div className="job-visual" aria-hidden="true">
                    <ResponsiveImage
                      alt=""
                      className="job-cutout job-cutout-jobs"
                      src="/assets/images/job-nurse-jobs.webp"
                    />
                  </div>
                </article>
                <article className="job-card job-card-ausbildung">
                  <div className="job-card-content">
                    <span className="job-badge">
                      <span
                        data-icon="graduation-cap"
                        data-size="15"
                        aria-hidden="true"
                      ></span>
                      Training pathway
                    </span>
                    <h3>Nurses (Ausbildung)</h3>
                    <p>
                      A structured apprenticeship route for early-career
                      nursing candidates in Germany.
                    </p>
                    <div className="job-meta">
                      <span>
                        <span data-icon="map-pin" data-size="14"></span>Hamburg,
                        Germany
                      </span>
                      <span>
                        <span
                          data-icon="briefcase-business"
                          data-size="14"
                        ></span>
                        50+ jobs available
                      </span>
                    </div>
                    <div className="job-card-actions">
                      <a className="btn btn-gold" href="/signup/">
                        Apply Now
                      </a>
                      <small>Guided pathway support</small>
                    </div>
                  </div>
                  <div className="job-visual" aria-hidden="true">
                    <ResponsiveImage
                      alt=""
                      className="job-cutout job-cutout-ausbildung"
                      src="/assets/images/job-nurse-ausbildung.webp"
                    />
                  </div>
                </article>
              </div>
            </section>

            <CandidateStories />

            <AppJourneyShowcase />

            <section className="section pathway-section" id="pathway">
              <div className="pathway-intro">
                <p className="eyebrow">Why choose Skillcase</p>
                <h2>International nursing jobs, made step by step.</h2>
                <p>
                  One coach guides every stage, from profile to relocation,
                  with no recruitment fees.
                </p>
                <div
                  className="pathway-proof"
                  aria-label="Skillcase pathway highlights"
                >
                  <span>4 guided stages</span>
                  <span>2,400+ nurses placed</span>
                  <span>Zero recruitment fees</span>
                </div>
              </div>
              <SearchTimeline />
            </section>

            <section
              className="section blog-section"
              id="blogs"
              aria-labelledby="blogs-title"
            >
              <div className="section-heading blog-section-heading">
                <p className="eyebrow">Blogs</p>
                <h2 id="blogs-title">Read our blogs</h2>
              </div>
              <div className="blog-grid">
                <article className="blog-card">
                  <a
                    className="blog-media"
                    href="/blog/nursing-in-germany-guide"
                    aria-label="Read Nursing in Germany guide"
                  >
                    <ResponsiveImage
                      loading="lazy"
                      alt="Indian healthcare professional researching nursing opportunities in Germany"
                      src="/assets/images/webinar-nurses.webp"
                    />
                    <span className="blog-media-badge">Career guide</span>
                  </a>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>Skillcase</span>
                      <time dateTime="2025-07-25">25 July 2025</time>
                    </div>
                    <h3>
                      Nursing in Germany: A Comprehensive Guide for Aspiring
                      Nurses
                    </h3>
                    <p>
                      A practical guide to qualifications, work conditions, and
                      building your nursing career in Germany.
                    </p>
                    <a href="/blog/nursing-in-germany-guide">
                      Read more{" "}
                      <span data-icon="arrow-right" data-size="13"></span>
                    </a>
                  </div>
                </article>
                <article className="blog-card">
                  <a
                    className="blog-media"
                    href="/blog/nursing-salaries-germany-foreign-professionals"
                    aria-label="Read nursing salary guide"
                  >
                    <ResponsiveImage
                      loading="lazy"
                      alt="Nurse planning salary and career growth for Germany"
                      src="/assets/images/benefit-earnings.webp"
                    />
                    <span className="blog-media-badge">Salary insights</span>
                  </a>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>Skillcase</span>
                      <time dateTime="2025-07-25">25 July 2025</time>
                    </div>
                    <h3>
                      Nursing Salaries in Germany for Foreign Professionals
                    </h3>
                    <p>
                      See expected nursing salaries, working conditions, and
                      career opportunities for foreign professionals.
                    </p>
                    <a href="/blog/nursing-salaries-germany-foreign-professionals">
                      Read more{" "}
                      <span data-icon="arrow-right" data-size="13"></span>
                    </a>
                  </div>
                </article>
                <article className="blog-card">
                  <a
                    className="blog-media"
                    href="/blog/moving-to-germany-as-a-foreign-doctor"
                    aria-label="Read foreign doctor relocation guide"
                  >
                    <ResponsiveImage
                      loading="lazy"
                      alt="Foreign medical professional preparing documents for Germany"
                      src="/assets/images/benefit-residency.webp"
                    />
                    <span className="blog-media-badge">Relocation</span>
                  </a>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>Skillcase</span>
                      <time dateTime="2025-07-25">25 July 2025</time>
                    </div>
                    <h3>
                      Moving to Germany as a Foreign Doctor: A Step-by-Step
                      Guide
                    </h3>
                    <p>
                      Learn the documents, licensing steps, and relocation
                      process for practising medicine in Germany.
                    </p>
                    <a href="/blog/moving-to-germany-as-a-foreign-doctor">
                      Read more{" "}
                      <span data-icon="arrow-right" data-size="13"></span>
                    </a>
                  </div>
                </article>
              </div>
            </section>

            <section
              className="podcast-section"
              aria-labelledby="podcast-title"
            >
              <div className="podcast-copy">
                <p className="eyebrow">Podcast</p>
                <h2 id="podcast-title">Listen to our expert podcast</h2>
                <p>
                  Get practical guidance on healthcare careers in Germany,
                  employer expectations, and stronger applications.
                </p>
                <div
                  className="podcast-highlights"
                  aria-label="Podcast highlights"
                >
                  <span>
                    <span data-icon="stethoscope" data-size="13"></span>
                    Healthcare careers
                  </span>
                  <span>
                    <span data-icon="shield-check" data-size="13"></span>Expert
                    guidance
                  </span>
                  <span>
                    <span data-icon="file-check-2" data-size="13"></span>Germany
                    pathway
                  </span>
                </div>
                <a
                  className="btn btn-outline podcast-secondary-cta"
                  href="https://www.youtube.com/watch?v=-1NrsTNPab4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube
                  <span
                    data-icon="arrow-right"
                    data-size="16"
                    aria-hidden="true"
                  ></span>
                </a>
              </div>
              <article
                className="podcast-player"
                aria-label="Skillcase expert podcast video"
              >
                <div className="podcast-video-frame">
                  <iframe
                    src="https://www.youtube.com/embed/-1NrsTNPab4?rel=0"
                    title="Listen to our expert podcast on YouTube"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </article>
            </section>

            <section
              className="section faq-section"
              id="faq"
              aria-labelledby="faq-title"
            >
              <div className="faq-shell">
                <div className="faq-intro">
                  <p className="eyebrow">FAQ</p>
                  <h2 id="faq-title">Frequently asked questions</h2>
                  <p>
                    Get clear answers before starting your Germany healthcare
                    journey.
                  </p>
                  <a className="faq-support-link" href="tel:+919731462667">
                    <span data-icon="phone-call" data-size="15"></span>
                    Talk to an advisor
                  </a>
                </div>
                <div className="faq-list">
                  <details open>
                    <summary>
                      How do I know if I’m eligible for a particular job?
                      <span data-icon="chevron-down" data-size="15"></span>
                    </summary>
                    <p>
                      Not sure you qualify? We’ll review your profile and
                      suggest suitable roles.
                    </p>
                  </details>
                  <details>
                    <summary>
                      What documents do I need to apply for a job?
                      <span data-icon="chevron-down" data-size="15"></span>
                    </summary>
                    <p>
                      Usually, you’ll need a resume, qualifications,
                      professional certificates, and language proof. We’ll
                      confirm your exact list.
                    </p>
                  </details>
                  <details>
                    <summary>
                      How long does the recruitment process take?
                      <span data-icon="chevron-down" data-size="15"></span>
                    </summary>
                    <p>
                      Timelines depend on the role and your documents. We’ll
                      guide you from interview through visa processing.
                    </p>
                  </details>
                  <details>
                    <summary>
                      What countries can I apply to through Skillcase?
                      <span data-icon="chevron-down" data-size="15"></span>
                    </summary>
                    <p>
                      We currently focus on healthcare opportunities in Germany.
                    </p>
                  </details>
                </div>
              </div>
            </section>
          </main>

          <SiteFooter />
        </div>
      </BaseLayout>
    </>
  );
}
