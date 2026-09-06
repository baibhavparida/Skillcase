import { useRef } from "react";

const candidateStories = [
  {
    name: "Sneha Shaji",
    location: "Kerala",
    qualification: "BSc Nursing",
    progress: "B2 completed",
    poster: "/assets/images/testimonials/sneha-shaji.jpg",
    video: "/assets/videos/testimonials/sneha-shaji.mp4",
  },
  {
    name: "Priyanka C",
    location: "Karnataka",
    qualification: "GNM Nursing",
    progress: "B2 completed",
    poster: "/assets/images/testimonials/priyanka-c.jpg",
    video: "/assets/videos/testimonials/priyanka-c.mp4",
  },
  {
    name: "Sandesh",
    location: "Karnataka",
    qualification: "Nursing graduate",
    progress: "B2 ongoing",
    poster: "/assets/images/testimonials/sandesh.jpg",
    video: "/assets/videos/testimonials/sandesh.mp4",
  },
];

const learnerReviews = [
  {
    name: "Ayesha Fatima",
    quote:
      "The instructor uses easy examples that make complex topics easier. They always made time to answer questions after class and guide us.",
  },
  {
    name: "Abdullah Khan",
    quote:
      "The classes were very interactive. They clear your doubts, make sure everyone understands, give assignments for practice, and provide recordings if you miss a class.",
  },
];

export default function CandidateStories() {
  const storyTrackRef = useRef(null);

  const navigateStories = (direction) => {
    const track = storyTrackRef.current;
    const card = track?.querySelector(".candidate-story-card");

    if (!track || !card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 12;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      className="section candidate-stories-section"
      id="testimonials"
      aria-labelledby="candidate-stories-title"
    >
      <div className="candidate-stories-header">
        <div>
          <p className="eyebrow">Real learner stories</p>
          <h2 id="candidate-stories-title">
            Real nurses. Real progress toward Germany.
          </h2>
          <p>
            Hear directly from nurses building their language skills and
            preparing for healthcare careers in Germany with Skillcase.
          </p>
        </div>
        <span className="candidate-stories-proof">
          <span data-icon="badge-check" data-size="18" aria-hidden="true"></span>
          Shared by Skillcase learners
        </span>
      </div>

      <p className="candidate-stories-scroll-hint">
        Use the arrows or swipe to meet more learners
      </p>

      <div className="candidate-story-carousel">
        <button
          className="candidate-story-arrow candidate-story-arrow-prev"
          type="button"
          aria-label="Previous learner video"
          onClick={() => navigateStories(-1)}
        >
          <span data-icon="arrow-left" data-size="17" aria-hidden="true"></span>
        </button>
        <div
          className="candidate-story-grid"
          ref={storyTrackRef}
          role="region"
          tabIndex={0}
          aria-label="Video stories from Skillcase learners"
        >
          {candidateStories.map((story) => (
            <article className="candidate-story-card" key={story.name}>
              <div className="candidate-story-media">
                <video
                  controls
                  controlsList="nodownload"
                  playsInline
                  preload="none"
                  poster={story.poster}
                  aria-label={`Watch ${story.name}'s Skillcase story`}
                >
                  <source src={story.video} type="video/mp4" />
                </video>
                <span className="candidate-video-label">
                  <span data-icon="video" data-size="14" aria-hidden="true"></span>
                  Learner video
                </span>
              </div>
              <div className="candidate-story-body">
                <div className="candidate-story-name">
                  <h3>{story.name}</h3>
                  <span>{story.location}</span>
                </div>
                <p>
                  {story.qualification} <span aria-hidden="true">·</span>{" "}
                  <strong>{story.progress}</strong>
                </p>
              </div>
            </article>
          ))}
        </div>
        <button
          className="candidate-story-arrow candidate-story-arrow-next"
          type="button"
          aria-label="Next learner video"
          onClick={() => navigateStories(1)}
        >
          <span data-icon="arrow-right" data-size="17" aria-hidden="true"></span>
        </button>
      </div>

      <div className="learner-review-panel">
        <div className="learner-review-intro">
          <span className="google-review-mark" aria-hidden="true">G</span>
          <div>
            <p className="eyebrow">Google reviews</p>
            <h3>What learners value most</h3>
          </div>
        </div>
        <div className="learner-review-grid">
          {learnerReviews.map((review) => (
            <figure className="learner-review" key={review.name}>
              <blockquote>“{review.quote}”</blockquote>
              <figcaption>
                <span data-icon="badge-check" data-size="14" aria-hidden="true"></span>
                {review.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="candidate-stories-cta">
        <div>
          <strong>Ready to see where you stand?</strong>
          <span>Start with a free profile and eligibility check.</span>
        </div>
        <a className="btn btn-gold" href="/signup/">
          Check My Eligibility
          <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
        </a>
      </div>
    </section>
  );
}
