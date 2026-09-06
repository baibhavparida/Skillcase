import { useRef } from "react";
import LearnerReviewCard, { GoogleReviewMark } from "./LearnerReviewCard.jsx";

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
    initials: "AF",
    quote:
      "The instructor uses easy examples that make complex topics easier. They always made time to answer questions after class and guide us.",
  },
  {
    name: "Abdullah Khan",
    initials: "AK",
    quote:
      "The classes were very interactive. They clear your doubts, make sure everyone understands, give assignments for practice, and provide recordings if you miss a class.",
  },
  {
    name: "Trendy Sagar",
    initials: "TS",
    quote:
      "Good teaching and quick action when problems come up. The team is helpful and stays connected with students as they work toward their dream job in Germany.",
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
                  <span className="candidate-story-location">
                    {story.location}
                  </span>
                </div>
                <div className="candidate-story-details">
                  <span>
                    <span
                      data-icon="graduation-cap"
                      data-size="14"
                      aria-hidden="true"
                    ></span>
                    {story.qualification}
                  </span>
                  <span className="candidate-story-progress">
                    <span
                      data-icon="badge-check"
                      data-size="14"
                      aria-hidden="true"
                    ></span>
                    <strong>{story.progress}</strong>
                  </span>
                </div>
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
            <h3>What our learners value most</h3>
            <p>Real experiences shared by Skillcase learners across India.</p>
          </div>
          <div className="learner-review-proof">
            <div
              className="learner-review-photo-stack"
              aria-label="Featured Skillcase learners"
            >
              {candidateStories.map((story) => (
                <img
                  src={story.poster}
                  alt={story.name}
                  width="52"
                  height="52"
                  loading="lazy"
                  decoding="async"
                  key={story.name}
                />
              ))}
            </div>
            <div>
              <span
                className="learner-review-stars"
                role="img"
                aria-label="5 out of 5 stars"
              >
                ★★★★★
              </span>
              <strong>5-star learner reviews</strong>
            </div>
          </div>
        </div>
        <div className="learner-review-grid">
          {learnerReviews.map((review) => (
            <LearnerReviewCard key={review.name} {...review} />
          ))}
        </div>
      </div>

    </section>
  );
}
