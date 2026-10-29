import ResponsiveImage from "./ResponsiveImage.jsx";

// Homepage sections shared by the live homepage (/) and its variant
// (/home-next). Moved here unchanged from src/pages/home.jsx.

export const blogCards = [
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

export const faqs = [
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
              href="/events/7cdknjvd/"
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
  );
}

export function BlogSection() {
  return (
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
  );
}

export function PodcastSection() {
  return (
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
  );
}

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
