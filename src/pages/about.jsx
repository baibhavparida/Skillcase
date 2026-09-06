import ResponsiveImage from "../components/ResponsiveImage.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import { aboutPage } from "../data/siteContent";
import BaseLayout from "../layouts/BaseLayout.jsx";
export default function About(props) {
  return (
    <>
      <BaseLayout
        title="About Skillcase | Global Healthcare Careers"
        description="Learn how Skillcase connects Indian healthcare professionals with global opportunities through ethical recruitment, training, documentation, and relocation support."
      >
        <div className="site-shell">
          <SiteHeader active="about" />
          <main className="page-main">
            <section className="about-hero-photo">
              <ResponsiveImage
                alt="Indian teacher guiding nurses for global healthcare career preparation"
                src="/assets/images/about-indian-teacher-guidance.webp"
                loading="eager"
                sizes="100vw"
              />
              <div className="about-hero-content">
                <p className="eyebrow">{aboutPage.eyebrow}</p>
                <h1>{aboutPage.title}</h1>
                <div className="page-hero-text">
                  {aboutPage.intro.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </div>
              <div
                className="about-hero-stats"
                aria-label="Skillcase pathway highlights"
              >
                <span>
                  <strong>Ethical</strong> recruitment
                </span>
                <span>
                  <strong>End-to-end</strong> pathway support
                </span>
                <span>
                  <strong>Germany</strong> career readiness
                </span>
              </div>
            </section>

            <section className="section page-section about-values-section">
              <div className="section-heading">
                <p className="eyebrow">Our values</p>
                <h2>
                  Our shared values keep us connected and guide us as one team.
                </h2>
              </div>
              <div className="value-pillar-grid">
                <article className="value-pillar value-pillar-dark">
                  <div className="value-pillar-head">
                    <span data-icon="shield-check" data-size="20"></span>
                    <small>Pillar 01</small>
                  </div>
                  <h3>Trust-led recruitment</h3>
                  <p>
                    Ethical, responsible, and transparent recruitment practices
                    that keep candidates informed at every step.
                  </p>
                  <div className="value-mini-grid">
                    <span>
                      <strong>Ethics</strong>
                      {aboutPage.values[0].text}
                    </span>
                    <span>
                      <strong>Transparency</strong>
                      {aboutPage.values[1].text}
                    </span>
                  </div>
                </article>
                <article className="value-pillar value-pillar-light">
                  <div className="value-pillar-head">
                    <span data-icon="sparkles" data-size="20"></span>
                    <small>Pillar 02</small>
                  </div>
                  <h3>Global readiness</h3>
                  <p>
                    Tools, training, and standards that help Indian healthcare
                    professionals integrate confidently abroad.
                  </p>
                  <div className="value-mini-grid">
                    <span>
                      <strong>Empowerment</strong>
                      {aboutPage.values[2].text}
                    </span>
                    <span>
                      <strong>Global Readiness</strong>
                      {aboutPage.values[3].text}
                    </span>
                  </div>
                </article>
              </div>
            </section>

            <section className="section mission-section mission-section-rich mission-section-image">
              <div className="mission-copy">
                <p className="eyebrow">Why we exist</p>
                <h2>
                  Built to make global healthcare careers clearer, faster, and
                  more trustworthy.
                </h2>
                <div className="mission-proof">
                  <span>
                    <span data-icon="map-pin" data-size="15"></span> Germany and
                    Europe
                  </span>
                  <span>
                    <span data-icon="heart-handshake" data-size="15"></span>{" "}
                    Candidate-first support
                  </span>
                </div>
              </div>
              <div className="mission-image-grid">
                {aboutPage.reasons.map((reason, index) => (
                  <article
                    key={index}
                    className={[
                      "mission-image-card",
                      index === 0 && "is-featured",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <ResponsiveImage
                      alt={`${reason.label} ${reason.text}`}
                      src={
                        index === 0
                          ? "/assets/images/about-mission-bridge.webp"
                          : index === 1
                            ? "/assets/images/about-mission-empower.webp"
                            : "/assets/images/about-mission-trust.webp"
                      }
                    />
                    <div>
                      <span
                        className="mission-icon"
                        data-icon={
                          index === 0
                            ? "bridge"
                            : index === 1
                              ? "sparkles"
                              : "handshake"
                        }
                        data-size="18"
                      ></span>
                      <strong>{reason.label}</strong>
                      <p>{reason.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </BaseLayout>
    </>
  );
}
