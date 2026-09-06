import ResponsiveImage from "../components/ResponsiveImage.jsx";
import BaseLayout from "../layouts/BaseLayout.jsx";
import ProcessWorkspace from "../components/ProcessWorkspace";
import SearchTimeline from "../components/SearchTimeline";
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
                    India's Healthcare Talent: Ready for Global Opportunities
                  </h2>
                </div>
                <div className="globe-copy">
                  <div className="opportunity-metrics">
                    <article className="metric-card opportunity-metric">
                      <div className="metric-icon">
                        <span
                          data-icon="users-round"
                          data-size="16"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <span className="metric-label">Healthcare demand</span>
                      <strong>500,000 +</strong>
                      <p>Health professionals require in Germany by 2030</p>
                    </article>
                    <article className="metric-card opportunity-metric">
                      <div className="metric-icon">
                        <span
                          data-icon="briefcase-business"
                          data-size="16"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <span className="metric-label">Average gross salary</span>
                      <strong>₹3.2 - ₹3.8L</strong>
                      <p>
                        Average gross salary for registered nurses in Germany
                      </p>
                    </article>
                    <article className="metric-card opportunity-metric">
                      <div className="metric-icon">
                        <span
                          data-icon="shield-check"
                          data-size="16"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <span className="metric-label">Transparent support</span>
                      <strong>Free</strong>
                      <p>
                        No agent or recruitment charges with fully transparency
                      </p>
                    </article>
                  </div>
                  <a className="btn btn-gold globe-action" href="#jobs">
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

            <section className="section benefits-section">
              <div className="section-heading">
                <p className="eyebrow">Why choose Skillcase</p>
                <h2>A practical move with long-term upside.</h2>
                <p>
                  Explore the long-term benefits of working in Germany as a
                  healthcare professional.
                </p>
              </div>
              <div className="benefit-grid">
                <article className="benefit-card benefit-card-earnings">
                  <div className="benefit-copy">
                    <h3>10x Your Earning Potential</h3>
                    <p>
                      Earn Up to 10 Times More Than Your Current Salary as a
                      Healthcare Professional in Germany, along with performance
                      bonuses and additional allowances, allowing you to
                      significantly enhance your financial future.
                    </p>
                    <div
                      className="benefit-points"
                      aria-label="10x Your Earning Potential highlights"
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
                    <a href="#process">
                      Get started
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
                      <strong>₹3.2L - ₹3.8L</strong>
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
                    <h3>Settle Abroad with Your Family</h3>
                    <p>
                      Germany’s family reunification policy allows you to bring
                      your spouse and minor children with you. They can join you
                      in Germany, and in most cases, also have the right to work
                      during their stay.
                    </p>
                    <div
                      className="benefit-points"
                      aria-label="Settle Abroad with Your Family highlights"
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
                    <a href="#process">
                      Get started
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
                    <h3>World-Class Healthcare and Education</h3>
                    <p>
                      Germany provides free or heavily subsidized healthcare and
                      education for all residents, ensuring your family's
                      well-being and access to quality learning opportunities.
                    </p>
                    <div
                      className="benefit-points"
                      aria-label="World-Class Healthcare and Education highlights"
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
                    <a href="#process">
                      Get started
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
                    <h3>Pathway to Permanent Residency</h3>
                    <p>
                      As a healthcare professional in Germany, you can typically
                      apply for permanent residency after 3 years of living and
                      working in the country, provided you meet the language and
                      integration requirements.
                    </p>
                    <div
                      className="benefit-points"
                      aria-label="Pathway to Permanent Residency highlights"
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
                        3-year PR track
                      </span>
                    </div>
                    <a href="#process">
                      Get started
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
                  <a
                    className="webinar-status"
                    href="https://learner.skillcase.in/events/7cdknjvd"
                  >
                    <span className="webinar-status-icon" aria-hidden="true">
                      <span data-icon="video" data-size="15"></span>
                    </span>
                    <span>
                      <small>Free live webinar</small>
                      <strong>Nursing jobs in Germany</strong>
                    </span>
                  </a>
                  <h2>Live Webinar - Nursing Jobs In Germany</h2>
                  <p className="webinar-lede">
                    Join Skillcase experts for a practical walkthrough of
                    eligibility, documents, interviews, salary range, and the
                    next steps to work in Germany.
                  </p>
                  <div className="webinar-details" aria-label="Webinar details">
                    <div className="webinar-detail">
                      <span
                        data-icon="video"
                        data-size="17"
                        aria-hidden="true"
                      ></span>
                      <span>Live session</span>
                      <strong>Today · 8:00 PM IST</strong>
                    </div>
                    <div className="webinar-detail">
                      <span
                        data-icon="badge-check"
                        data-size="17"
                        aria-hidden="true"
                      ></span>
                      <span>Access</span>
                      <strong>Free registration</strong>
                    </div>
                    <div className="webinar-detail">
                      <span
                        data-icon="map-pin"
                        data-size="17"
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
                    <span className="webinar-note">
                      <span
                        data-icon="badge-check"
                        data-size="15"
                        aria-hidden="true"
                      ></span>
                      Limited live seats
                    </span>
                  </div>
                </div>
                <div className="webinar-media">
                  <ResponsiveImage
                    alt="Indian nurses attending a Germany healthcare webinar"
                    src="/assets/images/webinar-nurses.webp"
                  />
                  <div className="webinar-media-topbar" aria-hidden="true">
                    <span className="webinar-live-dot"></span>
                    Going live tonight
                  </div>
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
                  Explore diverse job opportunities outside India with expert
                  support at every stage—from application to relocation.
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
                      For qualified nurses ready to move into paid clinical
                      roles in Germany with Skillcase support from profile to
                      relocation.
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
                      <button className="btn btn-gold" type="button">
                        Apply Now
                      </button>
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
                      A guided training route for early-career candidates who
                      want to build a healthcare career in Germany through
                      structured apprenticeship.
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
                      <button className="btn btn-gold" type="button">
                        Apply Now
                      </button>
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

            <section className="section process-section" id="process">
              <div className="process-intro">
                <p className="eyebrow">Inside Skillcase</p>
                <h2>One workspace for every part of your global career.</h2>
                <p>
                  Profile building, role matching, language and interview prep,
                  and relocation support — every Skillcase feature, in one
                  place.
                </p>
                <div
                  className="process-proof"
                  aria-label="Skillcase workspace highlights"
                >
                  <span>4 connected tools</span>
                  <span>Profile-first</span>
                  <span>Built for healthcare</span>
                </div>
              </div>
              <ProcessWorkspace />
            </section>

            <section className="section pathway-section" id="pathway">
              <div className="pathway-intro">
                <p className="eyebrow">Why choose Skillcase</p>
                <h2>International nursing jobs, made step by step.</h2>
                <p>
                  One coach, one path. Profile to relocation, every stage
                  tracked throughout your Skillcase journey. No agent fees, no
                  guesswork.
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

            <section className="section testimonials-section" id="testimonials">
              <div className="testimonials-shell">
                <div className="testimonials-intro">
                  <div className="section-heading testimonials-heading">
                    <p className="eyebrow">Testimonials</p>
                    <h2>
                      What our candidates are saying: real stories, real
                      experiences
                    </h2>
                    <p>
                      Candid feedback from healthcare candidates using Skillcase
                      for profile building, interview preparation, language
                      planning, and Germany pathway support.
                    </p>
                  </div>
                  <div
                    className="testimonial-proof-row"
                    aria-label="Skillcase candidate support highlights"
                  >
                    <span>
                      <strong>4 guided stages</strong>
                      <small>Profile to relocation</small>
                    </span>
                    <span>
                      <strong>1:1 prep</strong>
                      <small>Interview and documents</small>
                    </span>
                    <span>
                      <strong>Germany pathway</strong>
                      <small>Role-ready guidance</small>
                    </span>
                  </div>
                </div>

                <p className="mobile-scroll-hint">
                  Swipe to read more stories <span aria-hidden="true">→</span>
                </p>
                <div
                  className="testimonial-layout"
                  tabIndex={0}
                  role="region"
                  aria-label="Candidate stories"
                >
                  <div className="testimonial-feature-column">
                    <article className="testimonial-card testimonial-card-feature">
                      <div className="testimonial-card-head">
                        <ResponsiveImage
                          alt="Candidate testimonial portrait for Priya S."
                          className="testimonial-avatar testimonial-avatar-lg"
                          sizes="72px"
                          loading="lazy"
                          src="/assets/images/testimonial-priya.webp"
                        />
                        <div className="testimonial-person">
                          <strong>Priya S.</strong>
                          <span>Registered Nurse · Kerala</span>
                        </div>
                        <span className="testimonial-verified">
                          <span
                            data-icon="badge-check"
                            data-size="14"
                            aria-hidden="true"
                          ></span>
                          Verified
                        </span>
                      </div>
                      <div
                        className="testimonial-rating"
                        aria-label="5 out of 5 rating"
                      >
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <h3>From profile to interview with clarity</h3>
                      <blockquote>
                        I had the experience, but I did not know how to present
                        it for Germany. Skillcase helped me rebuild my profile,
                        prepare for the interview, and understand what would
                        happen after each step.
                      </blockquote>
                      <div
                        className="testimonial-tags"
                        aria-label="Priya support highlights"
                      >
                        <span>Profile review</span>
                        <span>Mock interview</span>
                        <span>Next-step guidance</span>
                      </div>
                    </article>

                    <article className="testimonial-card">
                      <div className="testimonial-card-head">
                        <ResponsiveImage
                          alt="Candidate testimonial portrait for Nikhil R."
                          className="testimonial-avatar"
                          sizes="72px"
                          loading="lazy"
                          src="/assets/images/testimonial-nikhil.webp"
                        />
                        <div className="testimonial-person">
                          <strong>Nikhil R.</strong>
                          <span>Healthcare Candidate · Karnataka</span>
                        </div>
                        <span className="testimonial-verified">
                          <span
                            data-icon="badge-check"
                            data-size="14"
                            aria-hidden="true"
                          ></span>
                          Verified
                        </span>
                      </div>
                      <div
                        className="testimonial-rating"
                        aria-label="5 out of 5 rating"
                      >
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <h3>I knew exactly what to do next</h3>
                      <blockquote>
                        Skillcase helped me understand which documents were
                        urgent, what to prepare before calls, and how to keep my
                        application moving without feeling lost.
                      </blockquote>
                    </article>
                  </div>

                  <div className="testimonial-stack">
                    <article className="testimonial-card">
                      <div className="testimonial-card-head">
                        <ResponsiveImage
                          alt="Candidate testimonial portrait for Ravi M."
                          className="testimonial-avatar"
                          sizes="72px"
                          loading="lazy"
                          src="/assets/images/testimonial-ravi.webp"
                        />
                        <div className="testimonial-person">
                          <strong>Ravi M.</strong>
                          <span>Healthcare Assistant · Maharashtra</span>
                        </div>
                        <span className="testimonial-verified">
                          <span
                            data-icon="badge-check"
                            data-size="14"
                            aria-hidden="true"
                          ></span>
                          Verified
                        </span>
                      </div>
                      <div
                        className="testimonial-rating"
                        aria-label="5 out of 5 rating"
                      >
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <h3>Language prep felt structured</h3>
                      <blockquote>
                        The team broke my German practice into clear weekly
                        goals and connected it with interview preparation. It
                        finally felt manageable.
                      </blockquote>
                    </article>

                    <article className="testimonial-card">
                      <div className="testimonial-card-head">
                        <ResponsiveImage
                          alt="Candidate testimonial portrait for Anjali K."
                          className="testimonial-avatar"
                          sizes="72px"
                          loading="lazy"
                          src="/assets/images/testimonial-anjali.webp"
                        />
                        <div className="testimonial-person">
                          <strong>Anjali K.</strong>
                          <span>Staff Nurse · Tamil Nadu</span>
                        </div>
                        <span className="testimonial-verified">
                          <span
                            data-icon="badge-check"
                            data-size="14"
                            aria-hidden="true"
                          ></span>
                          Verified
                        </span>
                      </div>
                      <div
                        className="testimonial-rating"
                        aria-label="5 out of 5 rating"
                      >
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <h3>Support after the interview</h3>
                      <blockquote>
                        After my interview, Skillcase checked every next
                        requirement with me instead of leaving me confused about
                        documents and timelines.
                      </blockquote>
                    </article>

                    <article className="testimonial-card">
                      <div className="testimonial-card-head">
                        <ResponsiveImage
                          alt="Candidate testimonial portrait for Meera P."
                          className="testimonial-avatar"
                          sizes="72px"
                          loading="lazy"
                          src="/assets/images/testimonial-meera.webp"
                        />
                        <div className="testimonial-person">
                          <strong>Meera P.</strong>
                          <span>Nursing Candidate · Punjab</span>
                        </div>
                        <span className="testimonial-verified">
                          <span
                            data-icon="badge-check"
                            data-size="14"
                            aria-hidden="true"
                          ></span>
                          Verified
                        </span>
                      </div>
                      <div
                        className="testimonial-rating"
                        aria-label="5 out of 5 rating"
                      >
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                        <span
                          data-icon="star"
                          data-size="14"
                          aria-hidden="true"
                        ></span>
                      </div>
                      <h3>Documents became easier</h3>
                      <blockquote>
                        I was worried about missing something important. Their
                        checklist made the application and visa paperwork much
                        easier to track.
                      </blockquote>
                    </article>
                  </div>
                </div>
              </div>
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
                      Germany is a highly sought-after destination for nurses
                      from around the world. With its world-class healthcare
                      system, excellent work-life balance,
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
                      Germany is a leading destination for nurses worldwide,
                      offering competitive salaries, excellent working
                      conditions, and plenty of opportunities for
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
                      Germany offers immense opportunities for medical
                      professionals seeking career growth, attractive salaries,
                      and exposure to an advanced healthcare system.
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
                <h2 id="podcast-title">Listen to Our Expert Podcast</h2>
                <p>
                  Get practical guidance from Skillcase experts on healthcare
                  careers in Germany, employer expectations, documentation, and
                  how to stand out with a stronger international profile.
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
                    title="Listen to Our Expert Podcast on YouTube"
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
                    Quick clarity before you start your Germany healthcare
                    pathway with Skillcase.
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
                      Each job listing on Skillcase includes detailed
                      eligibility criteria. If you're unsure, our team is always
                      available to discuss your qualifications and guide you on
                      the best opportunities.
                    </p>
                  </details>
                  <details>
                    <summary>
                      What documents do I need to apply for a job?
                      <span data-icon="chevron-down" data-size="15"></span>
                    </summary>
                    <p>
                      You'll need your updated resume, professional
                      certifications, language proficiency certificates, and
                      educational qualifications documents. We will guide you
                      through the exact requirements based on the job you apply
                      for.
                    </p>
                  </details>
                  <details>
                    <summary>
                      How long does the recruitment process take?
                      <span data-icon="chevron-down" data-size="15"></span>
                    </summary>
                    <p>
                      The timeline can vary depending on the role and country.
                      For nurses who've completed the language training, it
                      usually takes 2-3 weeks to give your interview and receive
                      an offer letter. You can expect the visa and documentation
                      process to take another 7-8 weeks.
                    </p>
                  </details>
                  <details>
                    <summary>
                      What countries can I apply to through Skillcase?
                      <span data-icon="chevron-down" data-size="15"></span>
                    </summary>
                    <p>
                      Currently, we focus on global opportunities in Germany. We
                      are continuously expanding our reach to bring more
                      opportunities to our candidates.
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
