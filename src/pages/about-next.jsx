import BaseLayout from "../layouts/BaseLayout.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import Icon from "../components/healthcare/Icon.jsx";
import FinalCta from "../components/next/FinalCta.jsx";
import LearnersNext from "../components/next/LearnersNext.jsx";
import { Heading, variantLinks } from "../components/next/shared.jsx";
import { aboutPage } from "../data/siteContent.js";
import "../styles/placed-hero.css";
import "../styles/home.css";
import "../styles/home-next.css";
import "../styles/pages-next.css";

// About Us in the homepage variant's style, for comparison (noindex). The live
// page's words (siteContent.js), laid out with the variant's parts: its hero,
// a bento of values, photo tiles, the learners row and the navy closing band,
// in Manrope.

const proof = ["Ethical recruitment", "End-to-end pathway support", "Germany career readiness"];
const valueIcons = ["shield-check", "seal-check", "sparkle", "globe-hemisphere-east"];
const reasonImages = [
  "/assets/images/about-mission-bridge.webp",
  "/assets/images/about-mission-empower.webp",
  "/assets/images/about-mission-trust.webp",
];

function Hero() {
  return (
    <section className="ph-hero nx-hero ax-hero" id="top" aria-labelledby="ax-title">
      <div className="nx-hero-grid">
        <div className="ph-copy nx-hero-copy">
          <p className="eyebrow">{aboutPage.eyebrow}</p>
          <h1 id="ax-title">{aboutPage.title}</h1>
          <p className="nx-hero-lede">{aboutPage.intro[0]}</p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="/signup/">
              Get started
              <Icon name="arrow-right" size={16} />
            </a>
            <a className="btn btn-outline" href="tel:+919731462667">
              <Icon name="phone" size={16} />
              Call us
            </a>
          </div>
          <ul className="ax-proof">
            {proof.map((item) => (
              <li key={item}>
                <Icon name="check" size={13} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="ax-hero-photo">
          <ResponsiveImage
            src="/assets/images/about-indian-teacher-guidance.webp"
            alt="Indian teacher guiding nurses for global healthcare career preparation"
            loading="eager"
            sizes="(max-width: 999px) calc(100vw - 32px), 560px"
          />
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section className="section ax-what" aria-labelledby="ax-what-title">
      <Heading id="ax-what-title" eyebrow="What we do" title="One platform for the whole journey abroad" />
      <div className="ax-what-copy">
        {aboutPage.intro.slice(1).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

// The four values as a bento: the first on navy, the rest on light fills.
function Values() {
  return (
    <section className="section ax-values" aria-labelledby="ax-values-title">
      <Heading
        id="ax-values-title"
        eyebrow="Our values"
        title="Our shared values keep us connected and guide us as one team."
      />
      <ul className="ax-value-grid">
        {aboutPage.values.map((value, index) => (
          <li className="ax-value" key={value.title}>
            <span className="ax-value-icon" aria-hidden="true">
              <Icon name={valueIcons[index]} size={20} />
            </span>
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Why we exist: the three reasons as photo tiles, the first one large.
function Reasons() {
  return (
    <section className="section ax-why" aria-labelledby="ax-why-title">
      <Heading
        id="ax-why-title"
        eyebrow="Why we exist"
        title="Built to make global healthcare careers clearer, faster, and more trustworthy."
      />
      <div className="ax-why-grid">
        {aboutPage.reasons.map((reason, index) => (
          <article className="nx-tile nx-tile-photo ax-why-tile" key={reason.label}>
            <ResponsiveImage
              src={reasonImages[index]}
              alt=""
              sizes={index === 0 ? "(max-width: 899px) calc(100vw - 32px), 760px" : "(max-width: 899px) 46vw, 380px"}
            />
            <div className="nx-tile-caption">
              <h3>{reason.label}</h3>
              <p>{reason.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AboutNext() {
  return (
    <BaseLayout
      title="About Skillcase | Global Healthcare Careers"
      description="Learn how Skillcase connects Indian healthcare professionals with global opportunities through ethical recruitment, training, documentation, and relocation support."
      robots="noindex"
      font="manrope"
    >
      <div className="site-shell home-page home-next ax-page">
        <SiteHeader active="about" revealCta links={variantLinks} />
        <main>
          <Hero />
          <WhatWeDo />
          <Values />
          <Reasons />
          <LearnersNext />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
