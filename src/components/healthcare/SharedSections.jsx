import ResponsiveImage from "../ResponsiveImage.jsx";
import { blogPosts } from "../../data/siteContent.js";

// Sections shared by the broadened homepage options. Markup and class names
// match the legacy homepage so they inherit its styling; only copy and
// imagery change so nothing reads as nurses-only.

const services = [
  ["languages", "Medical German, A1 to C1"],
  ["badge-check", "Fachsprachprüfung prep"],
  ["file-check-2", "Recognition (Anerkennung) guidance"],
  ["shield-check", "Visa support"],
  ["messages-square", "Interview preparation"],
  ["heart-handshake", "Job matching"],
  ["clipboard-check", "Profile assessment"],
  ["plane-takeoff", "Relocation planning"],
  ["users-round", "Family settlement guidance"],
];

export function ServicesStrip() {
  return (
    <section className="offer-strip" aria-label="Skillcase support services">
      <div className="offer-marquee">
        <div className="offer-marquee-track">
          {[...services, ...services].map(([icon, label], index) => (
            <span className="offer-chip" key={index} aria-hidden={index >= services.length || undefined}>
              <span data-icon={icon} data-size="15"></span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefitCards = [
  {
    className: "benefit-card-earnings",
    title: "10x your earning potential",
    copy: "Earn up to 10x your current salary, plus performance bonuses and allowances in Germany.",
    points: ["German salary range", "Allowances + bonuses", "Financial planning"],
    image: "/assets/images/benefit-offer.webp",
    alt: "Indian doctor reviewing a German job offer on a laptop with a Skillcase advisor",
    salary: true,
  },
  {
    className: "benefit-card-family",
    title: "Settle abroad with your family",
    copy: "Bring your spouse and children to Germany with guidance on family reunification and work rights.",
    points: ["Spouse support", "Children included", "Work rights guidance"],
    image: "/assets/images/benefit-family.webp",
    alt: "Indian family laughing together on the sofa of their new apartment in Germany",
  },
  {
    className: "benefit-card-education",
    title: "World-class healthcare and education",
    copy: "Access high-quality healthcare and affordable education for your family while living in Germany.",
    points: ["Resident healthcare", "Quality education", "Affordable schooling", "Ongoing mentorship"],
    image: "/assets/images/benefit-school.webp",
    alt: "Indian father walking his son to a primary school in Germany on an autumn morning",
  },
  {
    className: "benefit-card-residency",
    title: "Pathway to permanent residency",
    copy: "Get guidance on the work, language, and integration steps required for permanent residency.",
    points: ["Document roadmap", "Language milestones", "PR pathway guidance"],
    image: "/assets/images/benefit-home-keys.webp",
    alt: "Indian couple holding up the keys to their new home on the steps of a German apartment building",
  },
];

export function BenefitsSection({ pathwaysHref = "#roles" }) {
  return (
    <section className="section benefits-section">
      <div className="section-heading">
        <p className="eyebrow">Why choose Skillcase</p>
        <h2>A practical move with long-term upside.</h2>
        <p>See what a healthcare career in Germany can offer you and your family.</p>
      </div>
      <div className="benefit-grid">
        {benefitCards.map((card) => (
          <article className={`benefit-card ${card.className}`} key={card.title}>
            <div className="benefit-copy">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <div className="benefit-points benefit-points-grid" aria-label={`${card.title} highlights`}>
                {card.points.map((point) => (
                  <span key={point}>
                    <span data-icon="check-circle-2" data-size="13"></span>
                    {point}
                  </span>
                ))}
              </div>
              <a href={pathwaysHref}>
                Explore pathways
                <span data-icon="arrow-right" data-size="14" aria-hidden="true"></span>
              </a>
            </div>
            <div className="benefit-media">
              <ResponsiveImage alt={card.alt} src={card.image} />
              {card.salary && (
                <div className="benefit-ui salary-ui" aria-hidden="true">
                  <strong>
                    Up to 10x <span>your current salary</span>
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
  );
}

export function WebinarSection() {
  return (
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
            Get clear guidance on eligibility, documents, interviews, salary, and your next steps.
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
            <a className="btn btn-outline webinar-secondary-cta" href="/events/7cdknjvd/">
              Register Now for Free
              <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
            </a>
          </div>
        </div>
        <div className="webinar-media">
          <ResponsiveImage
            alt="Indian doctor, nurse and physiotherapist following a Skillcase webinar together on a laptop"
            src="/assets/images/webinar-mixed.webp"
          />
          <div className="play-orb" aria-hidden="true">
            <span data-icon="play-filled" data-size="18"></span>
          </div>
        </div>
      </div>
    </section>
  );
}

const blogSummaries = {
  "nursing-in-germany-guide":
    "A practical guide to qualifications, work conditions, and building your nursing career in Germany.",
  "nursing-salaries-germany-foreign-professionals":
    "See expected nursing salaries, working conditions, and career opportunities for foreign professionals.",
  "moving-to-germany-as-a-foreign-doctor":
    "Learn the documents, licensing steps, and relocation process for practising medicine in Germany.",
};

export function BlogsSection() {
  return (
    <section className="section blog-section" id="blogs" aria-labelledby="blogs-title">
      <div className="section-heading blog-section-heading">
        <p className="eyebrow">Blogs</p>
        <h2 id="blogs-title">Read our blogs</h2>
      </div>
      <div className="blog-grid">
        {blogPosts.slice(0, 3).map((post) => (
          <article className="blog-card" key={post.slug}>
            <a className="blog-media" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
              <ResponsiveImage loading="lazy" alt={post.imageAlt} src={post.image} />
              <span className="blog-media-badge">{post.category}</span>
            </a>
            <div className="blog-card-body">
              <div className="blog-meta">
                <span>{post.author}</span>
                <time dateTime={post.datetime}>{post.date}</time>
              </div>
              <h3>{post.title}</h3>
              <p>{blogSummaries[post.slug] || post.excerpt}</p>
              <a href={`/blog/${post.slug}`}>
                Read more <span data-icon="arrow-right" data-size="13"></span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PodcastSection() {
  return (
    <section className="podcast-section" aria-labelledby="podcast-title">
      <div className="podcast-copy">
        <p className="eyebrow">Podcast</p>
        <h2 id="podcast-title">Listen to our expert podcast</h2>
        <p>
          Get practical guidance on healthcare careers in Germany, employer expectations, and stronger
          applications.
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
  );
}

const faqs = [
  {
    question: "Which healthcare professionals can apply?",
    answer:
      "Nurses, doctors, physiotherapists, and lab and radiology technologists can apply, and students who have finished 12th can start an Ausbildung. We review your profile and suggest suitable roles.",
  },
  {
    question: "Do I need to speak German before I start?",
    answer:
      "No. Most learners start from zero. Your target level depends on your profession: usually B1 to B2 for most roles, plus C1 medical German for doctors.",
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

export function FaqSection() {
  return (
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
  );
}
