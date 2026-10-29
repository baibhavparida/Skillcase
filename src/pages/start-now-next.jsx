import BaseLayout from "../layouts/BaseLayout.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import Icon from "../components/healthcare/Icon.jsx";
import FaqNext from "../components/next/FaqNext.jsx";
import { PayError, useCheckout } from "../components/next/Checkout.jsx";
import FinalCta from "../components/next/FinalCta.jsx";
import LearnerMap from "../components/next/LearnerMap.jsx";
import PreviewVideo from "../components/next/PreviewVideo.jsx";
import { GoogleReviews, StoryCarousel } from "../components/next/StoriesNext.jsx";
import { Heading } from "../components/next/shared.jsx";
import { useCourses } from "../components/next/useCourses.js";
import { COMPLETE_ID, compareLabel, comparePrice, courseExtras, formatRupees } from "../data/courses.js";
import { cartUrl, classClips, faqs, lectures, notes, phone, webAppUrl } from "../data/startNow.js";
import "../styles/placed-hero.css";
import "../styles/home.css";
import "../styles/start-now.css";
import "../styles/home-next.css";
import "../styles/start-now-next.css";

// The Learner Stories page (served at /start-now; the previous design is
// kept at /start-now-classic), in the homepage's style. The content follows
// a visitor's questions: what is this, are people like me doing it, what are
// classes like, can I try it, who else teaches, what do learners say, can I
// learn on my phone, what does it cost, then answers and a final nudge.
// Built from the homepage's parts: its hero (with a map of India showing
// real learners' home states, LearnerMap), story tiles with silent previews, the review
// wall, the FAQ with icons, the app reel and the navy closing band, in
// Manrope.

function Hero() {
  return (
    <section className="ph-hero nx-hero sx-hero" id="top" aria-labelledby="sx-title">
      <div className="nx-hero-grid">
        <div className="ph-copy nx-hero-copy">
          <a className="nx-hero-news" href="#notes">
            <span className="nx-hero-news-kicker">Free download</span>
            <span className="nx-hero-news-text">German A1 notes in your language</span>
            <Icon name="arrow-right" size={12} />
          </a>
          <h1 id="sx-title">From Day 1 to Germany</h1>
          <p className="nx-hero-lede">
            From your first German class to your first job in Germany. One trusted team for your
            entire journey.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold" href={cartUrl}>
              Start your journey
              <Icon name="arrow-right" size={16} />
            </a>
            <a className="btn btn-outline" href={phone.href}>
              <Icon name="phone" size={16} />
              Call us
            </a>
          </div>
          <p className="sx-proof">
            <span className="nx-review-stars" aria-hidden="true">
              ★★★★★
            </span>
            5-star learner reviews
          </p>
        </div>

        <div className="sx-hero-visual">
          <LearnerMap />
        </div>
      </div>
    </section>
  );
}

// Real frames from the recordings themselves for three of the videos, so the
// tiles look like what they open (their designed posters looked staged).
// `size` is the recording's own size. Keyed by video file.
const realFrames = {
  "/assets/videos/start-now/class-article-game.mp4": {
    src: "/assets/images/start-now/frame-class-article-game.webp",
    size: [960, 720],
  },
  "/assets/videos/start-now/class-letter-d-lesson.mp4": {
    src: "/assets/images/start-now/frame-class-letter-d-lesson.webp",
    size: [1280, 698],
  },
  "/assets/videos/start-now/lecture-armin-alagic.mp4": {
    src: "/assets/images/start-now/frame-lecture-armin-alagic.webp",
    size: [1280, 696],
  },
};

function Stories() {
  return (
    <section className="section nx-stories sx-stories" id="stories" aria-labelledby="sx-stories-title">
      <Heading
        id="sx-stories-title"
        eyebrow="Learner stories"
        title="Hundreds of nurses are applying. Hear from a few."
        intro="Learners introduce themselves in German. Tap a video to hear them."
      />
      <StoryCarousel />
    </section>
  );
}

// Two clips from real classes, each with what it shows.
// Each clip's tile has its recording's own shape (no bars). The tiles share
// one height so the titles line up: on wide screens each column's width is in
// proportion to its clip's shape; on phones each card's width follows from it.
function Classroom() {
  const shapes = classClips.map((clip) => realFrames[clip.video]?.size || [4, 3]);
  return (
    <section className="section sx-classroom" id="classes" aria-labelledby="sx-classes-title">
      <Heading
        id="sx-classes-title"
        eyebrow="Inside the classroom"
        title="Learning beyond the books"
        intro="German doesn’t have to feel like a subject. Here are two moments from real classes."
      />
      <ul
        className="sn-row sx-row sx-class-row"
        style={{ "--sx-cols": shapes.map(([w, h]) => `minmax(0, ${(w / h).toFixed(4)}fr)`).join(" ") }}
      >
        {classClips.map((clip, index) => (
          <li
            className="sx-media-item"
            key={clip.title}
            style={{ "--sx-shape": (shapes[index][0] / shapes[index][1]).toFixed(4) }}
          >
            <PreviewVideo
              poster={realFrames[clip.video]?.src || clip.poster}
              posterSize={realFrames[clip.video]?.size || [1160, 870]}
              ratio={`${shapes[index][0]} / ${shapes[index][1]}`}
              wide
              video={clip.video}
              label={`${clip.title}: ${clip.label}`}
              duration={clip.duration}
            >
              <span className="sx-media-label" aria-hidden="true">
                {clip.label}
              </span>
            </PreviewVideo>
            <h3>{clip.title}</h3>
            <p>{clip.copy}</p>
            <ul className="sx-chips">
              {clip.points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={12} />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Free A1 notes as a list of downloads on a light full-width band; each row
// shows the first letter of that language's script.
function Notes() {
  return (
    <section className="section sx-notes" id="notes" aria-labelledby="sx-notes-title">
      <div className="sx-notes-inner">
        <Heading
          id="sx-notes-title"
          eyebrow="Free study notes"
          title="German A1 notes in your language"
          intro="Grammar, vocabulary and pronunciation, explained in the language you think in. Free to read, no account needed."
        />
        <ul className="sx-note-list">
          {notes.map((note) => (
            <li key={note.lang}>
              <a className="sx-note" href={note.file} target="_blank" rel="noopener">
                <span className="sx-note-letter" lang={note.lang} aria-hidden="true">
                  {note.letter}
                </span>
                <span className="sx-note-text">
                  <strong>{note.language}</strong>
                  <span lang={note.lang}>{note.title}</span>
                </span>
                <span className="sx-note-size">PDF · {note.size}</span>
                <span className="sx-note-open" aria-hidden="true">
                  <Icon name="arrow-up-right" size={15} />
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
  return (
    <section className="section sx-guests" id="guests" aria-labelledby="sx-guests-title">
      <Heading
        id="sx-guests-title"
        eyebrow="Guest sessions"
        title="Learn from people who know Germany"
        intro="A native speaker, an industry leader and a nurse who went from our classroom to a job in Germany."
      />
      <ul className="sn-row sx-row sx-guest-row">
        {lectures.map((lecture) => (
          <li className="sx-media-item" key={lecture.name}>
            <PreviewVideo
              poster={realFrames[lecture.video]?.src || lecture.poster}
              posterSize={realFrames[lecture.video]?.size || [960, 540]}
              ratio="16 / 9"
              wide
              video={lecture.video}
              label={`${lecture.name}, ${lecture.role}`}
              duration={lecture.duration}
            />
            <p className="sx-media-kicker">{lecture.role}</p>
            <h3>{lecture.name}</h3>
            <p>{lecture.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

// The three ways in, with prices, so the cost isn't a surprise on the
// program picker (/start-now/cart). Live prices, as on the picker; each card
// opens it at that choice (the complete program already ticked).
function Programs() {
  const { blocks } = useCourses();
  const complete = blocks.find((block) => block.id === COMPLETE_ID);
  const compare = complete && comparePrice(complete, blocks);
  const cheapest = (list) => list.reduce((low, block) => (!low || block.price_paise < low.price_paise ? block : low), null);
  const level = cheapest(blocks.filter((block) => courseExtras[block.id]?.level));
  const placement = cheapest(blocks.filter((block) => courseExtras[block.id]?.group === "placement"));
  const was = (block) => comparePrice(block, blocks);
  const { pay, paying, failed } = useCheckout();

  return (
    <section className="section sx-programs" id="programs" aria-labelledby="sx-programs-title">
      <Heading
        id="sx-programs-title"
        eyebrow="Programs and fees"
        title="Choose how far we take you"
        intro="From a single German level to complete support until your first job in Germany."
      />
      <div className="sx-programs-grid">
        {complete && (
          <div className="sx-program is-main nx-glow">
            {complete.is_recommended && <span className="sx-program-tag">Recommended</span>}
            <strong>{complete.title}</strong>
            <span className="sx-program-text">
              German training, interview preparation, job placement, recognition, visa and relocation support.
            </span>
            {compare && (
              <span className="sx-program-was">
                <s>{formatRupees(compare.paise)}</s> {compareLabel(compare)}
              </span>
            )}
            <span className="sx-program-price">
              <span>{formatRupees(complete.price_paise)}</span>
              {compare && <em className="sx-program-save">Save {formatRupees(compare.paise - complete.price_paise)}</em>}
            </span>
            <button type="button" className="btn btn-gold" disabled={Boolean(paying)} onClick={() => pay(COMPLETE_ID)}>
              {paying === COMPLETE_ID ? (
                "Opening payment…"
              ) : (
                <>
                  Pay now
                  <Icon name="arrow-right" size={16} />
                </>
              )}
            </button>
            {failed === COMPLETE_ID && <PayError />}
          </div>
        )}
        {level && (
          <a className="sx-program" href={`${cartUrl}#courses`}>
            <strong>German courses</strong>
            <span className="sx-program-text">A1 to B2, one level at a time, in live classes.</span>
            <span className="sx-program-price">
              <small>From</small>
              {was(level) && <s>{formatRupees(was(level).paise)}</s>}
              <span>{formatRupees(level.price_paise)}</span>
              {level.show_gst_badge && <small>+ GST</small>}
            </span>
            <span className="sx-program-go">
              See courses
              <Icon name="arrow-right" size={13} />
            </span>
          </a>
        )}
        {placement && (
          <a className="sx-program" href={`${cartUrl}#courses`}>
            <strong>Job placement</strong>
            <span className="sx-program-text">Hospital interviews and placement support.</span>
            <span className="sx-program-price">
              <small>From</small>
              {was(placement) && <s>{formatRupees(was(placement).paise)}</s>}
              <span>{formatRupees(placement.price_paise)}</span>
              {placement.show_gst_badge && <small>+ GST</small>}
            </span>
            <span className="sx-program-go">
              See placement
              <Icon name="arrow-right" size={13} />
            </span>
          </a>
        )}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section sx-reviews" id="reviews" aria-labelledby="sx-reviews-title">
      <Heading
        id="sx-reviews-title"
        eyebrow="Learner feedback"
        title="Hear it first-hand"
        intro="What learners say about our classes, teachers and support."
      />
      <GoogleReviews />
    </section>
  );
}

export default function StartNowNext() {
  return (
    <BaseLayout
      title="Start Your Germany Journey | Skillcase"
      description="Live German classes, free A1 notes in your language, guest sessions and job support. See real Skillcase learners and choose the program that fits you."
      font="manrope"
    >
      <div className="site-shell home-page home-next sx-page">
        <SiteHeader active="stories" revealCta />
        <main>
          <Hero />
          <Stories />
          <Classroom />
          <Notes />
          <Lectures />
          <Reviews />
          <AppJourneyShowcase webAppUrl={webAppUrl} />
          <Programs />
          <FaqNext
            items={faqs}
            icons={["translate", "video-camera", "book-open-text", "device-mobile", "signpost"]}
            title="Questions before you start"
            intro="Quick answers about classes, notes and your next step."
            call={{ href: phone.href, label: "Talk to a counsellor" }}
          />
          <FinalCta
            title="Take your first step. Land in Germany."
            copy="Choose the program that fits you, from a single German level to complete support all the way to your job."
            action={{ href: cartUrl, label: "Start your journey" }}
            call={{ href: phone.href, label: phone.label }}
            screens={[
              "/assets/images/app-screens/job-application-progress.webp",
              "/assets/images/app-screens/guided-german-pathway.webp",
            ]}
          />
        </main>
        <SiteFooter
          credit={
            <>
              Map data:{" "}
              <a href="https://github.com/datameet/maps" rel="noopener">
                DataMeet
              </a>
              , CC BY 4.0.
            </>
          }
        />
      </div>
    </BaseLayout>
  );
}
