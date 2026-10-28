import BaseLayout from "../layouts/BaseLayout.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import LearnerReviewCard, { GoogleReviewMark } from "../components/LearnerReviewCard.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import Icon from "../components/healthcare/Icon.jsx";
import LiveClass from "../components/start-now/LiveClass.jsx";
import { RowDots, useSnapRow } from "../components/start-now/SnapRow.jsx";
import VideoCard from "../components/start-now/VideoCard.jsx";
import {
  cartUrl,
  classClips,
  faqs,
  lectures,
  notes,
  phone,
  reviews,
  stories,
  webAppUrl,
} from "../data/startNow.js";
import "../styles/start-now.css";

// Redesign of learner.skillcase.in/start-now in the homepage's style: the
// trust page people reach from ads before choosing a program. Sections follow
// the visitor's questions: what is this (hero), are people like me doing it
// (learner videos), what are classes like (classroom clips), can I try it
// (free notes), who else teaches (guest sessions), what do learners say
// (reviews), can I learn on my phone (app), then answers and a final nudge.
// It is the site nav's "Learner Stories" page, so it uses the shared header.

const proofFaces = ["sneha-shaji", "ruth-joseph", "priyanka-c", "sheila-h-v"];

function Hero() {
  return (
    <section className="sn-hero" id="top" aria-labelledby="sn-title">
      <div className="sn-hero-inner">
        <div className="sn-hero-copy">
          <a className="webinar-pill sn-pill" href="#notes">
            <span className="webinar-pill-icon" aria-hidden="true">
              <Icon name="file-text" size={15} />
            </span>
            <span className="webinar-pill-copy">
              <span>Free download</span>
              <strong>German A1 notes in your language</strong>
            </span>
            <span className="webinar-pill-arrow" aria-hidden="true">
              <Icon name="arrow-right" size={12} />
            </span>
          </a>
          <h1 id="sn-title">
            From Day 1 <span>to Germany</span>
          </h1>
          <p className="sn-lede">
            From your first German class to your first job in Germany. One trusted team for
            your entire journey.
          </p>
          <div className="sn-hero-actions">
            <a className="btn btn-gold" href={cartUrl}>
              Start your journey
              <Icon name="arrow-right" size={15} />
            </a>
            <a className="btn btn-outline" href={phone.href}>
              <Icon name="phone" size={15} />
              Call us
            </a>
          </div>
          <div className="sn-proof">
            <span className="sn-proof-faces" aria-hidden="true">
              {proofFaces.map((face) => (
                <img
                  key={face}
                  src={`/assets/images/start-now/tile-${face}.webp`}
                  alt=""
                  width="360"
                  height="270"
                  decoding="async"
                />
              ))}
            </span>
            <span className="sn-proof-copy">
              <strong>Trusted by 300+ nurses</strong>
              <span>
                <span className="sn-stars" aria-hidden="true">
                  ★★★★★
                </span>
                5-star learner reviews
              </span>
            </span>
          </div>
        </div>
        <LiveClass />
      </div>
    </section>
  );
}

function Stories() {
  const row = useSnapRow(stories.length);
  return (
    <section className="section sn-stories" id="stories" aria-labelledby="sn-stories-title">
      <div className="section-heading">
        <p className="eyebrow">Learner stories</p>
        <h2 id="sn-stories-title">Hundreds of nurses are applying. Hear from a few.</h2>
        <p>Real Skillcase learners on learning German and getting ready for work in Germany.</p>
      </div>
      <ul className="sn-row sn-story-row" ref={row.ref} onScroll={row.onScroll}>
        {stories.map((story) => (
          <li className="sn-story" key={story.name}>
            <VideoCard
              className="sn-story-media"
              poster={story.poster}
              posterWidth="480"
              posterHeight="640"
              video={story.video}
              label={`${story.name} from ${story.state} on learning German with Skillcase`}
              duration={story.duration}
              focus={story.focus}
            >
              <div className="sn-story-info">
                <strong>{story.name}</strong>
                <span>
                  {story.state} · {story.qualification}
                </span>
                <span className={`sn-level${story.done ? " is-done" : ""}`}>
                  <Icon
                    name={story.done ? "seal-check" : "hourglass-medium"}
                    size={12}
                    weight={story.done ? "fill" : "bold"}
                  />
                  {story.level}
                </span>
              </div>
            </VideoCard>
          </li>
        ))}
      </ul>
      <RowDots row={row} labels={stories.map((story) => `Show ${story.name}'s video`)} />
    </section>
  );
}

function Classroom() {
  return (
    <section className="section sn-classroom" id="classes" aria-labelledby="sn-classes-title">
      <div className="section-heading">
        <p className="eyebrow">Inside the classroom</p>
        <h2 id="sn-classes-title">Learning beyond the books</h2>
        <p>German doesn’t have to feel like a subject. Here are two moments from real classes.</p>
      </div>
      <div className="sn-class-grid">
        {classClips.map((clip) => (
          <article className="sn-class-card" key={clip.title}>
            <VideoCard
              className="sn-class-media"
              poster={clip.poster}
              posterWidth="1160"
              posterHeight="870"
              video={clip.video}
              label={`${clip.title}: ${clip.label}`}
              duration={clip.duration}
              fit="contain"
            />
            <div className="sn-class-body">
              <h3>{clip.title}</h3>
              <p>{clip.copy}</p>
              <ul className="sn-checks">
                {clip.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={13} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// A small document with a folded corner and the first letter of the note's
// alphabet. The real PDF covers are too pale to read at thumbnail size. The
// large version, with the note's title, fans out beside the list on desktop.
function NoteDoc({ note, large = false }) {
  return (
    <span className={large ? "sn-doc sn-doc-lg" : "sn-doc"} aria-hidden="true">
      <span className="sn-doc-level">A1</span>
      <span className="sn-doc-letter" lang={note.lang}>
        {note.letter}
      </span>
      {large && (
        <>
          <span className="sn-doc-title" lang={note.lang}>
            {note.title}
          </span>
          <span className="sn-doc-lines">
            <i />
            <i />
            <i />
          </span>
        </>
      )}
    </span>
  );
}

// Malayalam, Hindi and Tamil, so the fan shows three different scripts.
const fanNotes = ["ml", "hi", "ta"].map((lang) => notes.find((note) => note.lang === lang));

function Notes() {
  return (
    <section className="section sn-notes" id="notes" aria-labelledby="sn-notes-title">
      <div className="sn-notes-panel">
        <div className="sn-notes-copy">
          <p className="eyebrow">Free study notes</p>
          <h2 id="sn-notes-title">German A1 notes in your language</h2>
          <p>
            Grammar, vocabulary and pronunciation, explained in the language you think in.
            Free to read, no account needed.
          </p>
          <div className="sn-notes-fan" aria-hidden="true">
            {fanNotes.map((note) => (
              <span key={note.lang}>
                <NoteDoc note={note} large />
              </span>
            ))}
          </div>
        </div>
        <ul className="sn-note-list">
          {notes.map((note) => (
            <li key={note.lang}>
              <a className="sn-note" href={note.file} target="_blank" rel="noopener">
                <NoteDoc note={note} />
                <span className="sn-note-text">
                  <span className="sn-note-head">
                    <strong>{note.language}</strong>
                    <span className="sn-note-size">PDF · {note.size}</span>
                  </span>
                  <span className="sn-note-title" lang={note.lang}>
                    {note.title}
                  </span>
                </span>
                <span className="sn-note-open" aria-hidden="true">
                  <Icon name="arrow-up-right" size={14} />
                </span>
                <span className="sn-visually-hidden">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Lectures() {
  const row = useSnapRow(lectures.length);
  return (
    <section className="section sn-lectures" id="guests" aria-labelledby="sn-guests-title">
      <div className="section-heading">
        <p className="eyebrow">Guest sessions</p>
        <h2 id="sn-guests-title">Learn from people who know Germany</h2>
        <p>
          A native speaker, an industry leader and a nurse who went from our classroom to a
          job in Germany.
        </p>
      </div>
      <ul className="sn-row sn-lecture-row" ref={row.ref} onScroll={row.onScroll}>
        {lectures.map((lecture) => (
          <li className="sn-lecture" key={lecture.name}>
            <VideoCard
              className="sn-lecture-media"
              poster={lecture.poster}
              posterWidth="960"
              posterHeight="540"
              video={lecture.video}
              label={`${lecture.name}, ${lecture.role}`}
              duration={lecture.duration}
              fit="contain"
            />
            <div className="sn-lecture-body">
              <p className="sn-lecture-role">{lecture.role}</p>
              <h3>{lecture.name}</h3>
              <p>{lecture.copy}</p>
            </div>
          </li>
        ))}
      </ul>
      <RowDots row={row} labels={lectures.map((lecture) => `Show ${lecture.name}'s session`)} />
    </section>
  );
}

function Reviews() {
  const row = useSnapRow(reviews.length);
  return (
    <section className="section sn-reviews" id="reviews" aria-labelledby="sn-reviews-title">
      <div className="sn-reviews-layout">
        <div className="learner-review-intro sn-reviews-intro">
          <div className="google-review-brand">
            <span className="google-review-mark">
              <GoogleReviewMark />
            </span>
            <div>
              <span>Google</span>
              <strong>Reviews</strong>
            </div>
          </div>
          <div className="learner-review-intro-copy">
            <p className="eyebrow">Learner feedback</p>
            <h2 id="sn-reviews-title">Hear it first-hand</h2>
            <p>What learners say about our classes, teachers and support.</p>
          </div>
          <div className="learner-review-proof">
            <div className="learner-review-photo-stack" aria-hidden="true">
              {proofFaces.slice(0, 3).map((face) => (
                <img
                  key={face}
                  src={`/assets/images/start-now/tile-${face}.webp`}
                  alt=""
                  width="52"
                  height="52"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
            <div>
              <span className="learner-review-stars" role="img" aria-label="5 out of 5 stars">
                ★★★★★
              </span>
              <strong>5-star learner reviews</strong>
            </div>
          </div>
        </div>
        <ul
          className="sn-row sn-review-row"
          ref={row.ref}
          onScroll={row.onScroll}
          tabIndex={0}
          aria-label="Google reviews from Skillcase learners"
        >
          {reviews.map((review) => (
            <li key={review.name}>
              <LearnerReviewCard {...review} />
            </li>
          ))}
        </ul>
      </div>
      <RowDots row={row} labels={reviews.map((review) => `Show ${review.name}'s review`)} />
    </section>
  );
}

function Faq() {
  return (
    <section className="section faq-section sn-faq" id="faq" aria-labelledby="sn-faq-title">
      <div className="faq-shell">
        <div className="faq-intro">
          <p className="eyebrow">FAQ</p>
          <h2 id="sn-faq-title">Questions before you start</h2>
          <p>Quick answers about classes, notes and your next step.</p>
          <a className="faq-support-link" href={phone.href}>
            <Icon name="phone-call" size={15} />
            Talk to a counsellor
          </a>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                {item.question}
                <Icon name="caret-down" size={15} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section sn-final" aria-labelledby="sn-final-title">
      <div className="sn-final-card">
        <div className="sn-final-copy">
          <h2 id="sn-final-title">
            Take your first step. <span>Land in Germany.</span>
          </h2>
          <p>
            Choose the program that fits you, from a single German level to complete support
            all the way to your job.
          </p>
        </div>
        <div className="sn-final-actions">
          <a className="btn btn-gold" href={cartUrl}>
            Start your journey
            <Icon name="arrow-right" size={15} />
          </a>
          <a className="sn-final-call" href={phone.href}>
            <Icon name="phone" size={15} />
            {phone.label}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function StartNow({ robots }) {
  return (
    <BaseLayout
      title="Start Your Germany Journey | Skillcase"
      description="Live German classes, free A1 notes in your language, guest sessions and job support. See real Skillcase learners and choose the program that fits you."
      robots={robots}
    >
      <div className="site-shell start-now-page">
        <SiteHeader active="stories" />
        <main>
          <Hero />
          <Stories />
          <Classroom />
          <Notes />
          <Lectures />
          <Reviews />
          <AppJourneyShowcase webAppUrl={webAppUrl} />
          <Faq />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
