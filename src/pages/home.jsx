import BaseLayout from "../layouts/BaseLayout.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import CandidateStories from "../components/CandidateStories.jsx";
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

const blogCards = [
  {
    href: "/blog/nursing-in-germany-guide",
    label: "Read Nursing in Germany guide",
    image: "/assets/images/o4-blog-guide.webp",
    alt: "Indian nursing graduate studying German with a grammar book and flashcards",
    badge: "Career guide",
    title: "Nursing in Germany: A Comprehensive Guide for Aspiring Nurses",
    summary: "A practical guide to qualifications, work conditions, and building your nursing career in Germany.",
  },
  {
    href: "/blog/nursing-salaries-germany-foreign-professionals",
    label: "Read nursing salary guide",
    image: "/assets/images/o4-blog-salary.webp",
    alt: "Indian nurse smiling at her phone in a café in a German old town",
    badge: "Salary insights",
    title: "Nursing Salaries in Germany for Foreign Professionals",
    summary: "See expected nursing salaries, working conditions, and career opportunities for foreign professionals.",
  },
  {
    href: "/blog/moving-to-germany-as-a-foreign-doctor",
    label: "Read foreign doctor relocation guide",
    image: "/assets/images/o4-blog-doctor.webp",
    alt: "Indian doctor arriving at a German railway station with his suitcase",
    badge: "Relocation",
    title: "Moving to Germany as a Foreign Doctor: A Step-by-Step Guide",
    summary: "Learn the documents, licensing steps, and relocation process for practising medicine in Germany.",
  },
];

const faqs = [
  {
    question: "Which healthcare professionals can apply?",
    answer:
      "Nurses, doctors, physiotherapists, and lab, radiology, OT and anaesthesia technicians can apply. If you’ve finished 12th, you can also train in Germany through a paid Ausbildung. We review your profile and suggest suitable roles.",
  },
  {
    question: "Do I need to speak German before I start?",
    answer:
      "No. Most learners start from zero. The level you need depends on your role: usually B1–B2 for nurses, B2 for physiotherapists and technicians, and C1 medical German for doctors.",
  },
  {
    question: "How do I know if I’m eligible for a particular job?",
    answer: "Not sure you qualify? We’ll review your profile and suggest suitable roles.",
  },
  {
    question: "What documents do I need to apply for a job?",
    answer:
      "Usually, you’ll need a resume, qualifications, professional certificates, and language proof. We’ll confirm your exact list.",
  },
  {
    question: "How long does the recruitment process take?",
    answer:
      "Timelines depend on the role and your documents. We’ll guide you from interview through visa processing.",
  },
  {
    question: "What countries can I apply to through Skillcase?",
    answer: "We currently focus on healthcare opportunities in Germany.",
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

          <section className="section webinar-section" id="register-webinar">
            <div className="webinar-card">
              <div className="webinar-copy">
                <div className="webinar-kicker-row">
                  <p className="eyebrow webinar-eyebrow">Free live webinar</p>
                  <span className="webinar-note webinar-note-top">
                    <span data-icon="badge-check" data-size="14" aria-hidden="true"></span>
                    Limited live seats
                  </span>
                </div>
                <h2>Live webinar – nursing jobs in Germany</h2>
                <p className="webinar-lede">
                  Get clear guidance on eligibility, documents, interviews, salary, and your next
                  steps.
                </p>
                <div className="webinar-details" aria-label="Webinar details">
                  <div className="webinar-detail">
                    <span data-icon="video" data-size="22" aria-hidden="true"></span>
                    <span>Live session</span>
                    <strong>Today · 8:00 PM IST</strong>
                  </div>
                  <div className="webinar-detail">
                    <span data-icon="badge-check" data-size="22" aria-hidden="true"></span>
                    <span>Access</span>
                    <strong>Free registration</strong>
                  </div>
                  <div className="webinar-detail">
                    <span data-icon="map-pin" data-size="22" aria-hidden="true"></span>
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
                    <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
                  </a>
                </div>
              </div>
              <div className="webinar-media">
                <ResponsiveImage
                  alt="Three young Indian women joining a Skillcase webinar on a laptop at home"
                  src="/assets/images/o4-webinar.webp"
                />
                <div className="play-orb" aria-hidden="true">
                  <span data-icon="play-filled" data-size="18"></span>
                </div>
              </div>
            </div>
          </section>

          <section className="section blog-section" id="blogs" aria-labelledby="blogs-title">
            <div className="section-heading blog-section-heading">
              <p className="eyebrow">Blogs</p>
              <h2 id="blogs-title">Read our blogs</h2>
            </div>
            <div className="blog-grid">
              {blogCards.map((post) => (
                <article className="blog-card" key={post.href}>
                  <a className="blog-media" href={post.href} aria-label={post.label}>
                    <ResponsiveImage loading="lazy" alt={post.alt} src={post.image} />
                    <span className="blog-media-badge">{post.badge}</span>
                  </a>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span>Skillcase</span>
                      <time dateTime="2025-07-25">25 July 2025</time>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                    <a href={post.href}>
                      Read more <span data-icon="arrow-right" data-size="13"></span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="podcast-section" aria-labelledby="podcast-title">
            <div className="podcast-copy">
              <p className="eyebrow">Podcast</p>
              <h2 id="podcast-title">Listen to our expert podcast</h2>
              <p>
                Get practical guidance on healthcare careers in Germany, employer expectations, and
                stronger applications.
              </p>
              <div className="podcast-highlights" aria-label="Podcast highlights">
                <span>
                  <span data-icon="stethoscope" data-size="13"></span>
                  Healthcare careers
                </span>
                <span>
                  <span data-icon="shield-check" data-size="13"></span>Expert guidance
                </span>
                <span>
                  <span data-icon="file-check-2" data-size="13"></span>Germany pathway
                </span>
              </div>
              <a
                className="btn btn-outline podcast-secondary-cta"
                href="https://www.youtube.com/watch?v=-1NrsTNPab4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
                <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
              </a>
            </div>
            <article className="podcast-player" aria-label="Skillcase expert podcast video">
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

          <section className="section faq-section" id="faq" aria-labelledby="faq-title">
            <div className="faq-shell">
              <div className="faq-intro">
                <p className="eyebrow">FAQ</p>
                <h2 id="faq-title">Frequently asked questions</h2>
                <p>Get clear answers before starting your Germany healthcare journey.</p>
                <a className="faq-support-link" href="tel:+919731462667">
                  <span data-icon="phone-call" data-size="15"></span>
                  Talk to an advisor
                </a>
              </div>
              <div className="faq-list">
                {faqs.map((item, index) => (
                  <details key={item.question} open={index === 0}>
                    <summary>
                      {item.question}
                      <span data-icon="chevron-down" data-size="15"></span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
