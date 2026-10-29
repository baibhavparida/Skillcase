import { useEffect, useRef, useState } from "react";
import Icon from "../healthcare/Icon.jsx";
import { GoogleReviewMark } from "../LearnerReviewCard.jsx";
import { RowDots, useSnapRow } from "../start-now/SnapRow.jsx";
import { reviews, stories } from "../../data/startNow.js";
import PreviewVideo from "./PreviewVideo.jsx";
import { Heading } from "./shared.jsx";

// Learner stories in two parts:
// - Compact video tiles. The tile most in view plays a silent preview (one at
//   a time; with several fully on screen they take turns); tapping plays it
//   from the start with sound. No previews with Data Saver or on 2G. The
//   videos are the learners introducing themselves in German, so the tiles
//   say who they are rather than quoting them.
// - Google reviews as a wall of cards.
// Both parts are exported for the Learner Stories variant page.

const pronoun = { "Sneha Shaji": "her", "Priyanka C": "her", "Prajwal G N": "his", Sandesh: "his" };

function usePreviewPicker(count) {
  const refs = useRef([]);
  const [ratios, setRatios] = useState(() => Array(count).fill(0));
  const [allowed, setAllowed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    const connection = navigator.connection;
    setAllowed(!(connection?.saveData || /2g/.test(connection?.effectiveType || "")));
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        setRatios((current) => {
          const next = [...current];
          entries.forEach((entry) => {
            next[Number(entry.target.dataset.index)] = entry.intersectionRatio;
          });
          return next;
        });
      },
      { threshold: [0, 0.3, 0.6, 0.8, 1] },
    );
    refs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const candidates = ratios.map((ratio, index) => (ratio >= 0.6 ? index : -1)).filter((index) => index >= 0);

  // Several tiles fully on screen (wide screens): take turns every 7s.
  useEffect(() => {
    if (candidates.length < 2 || soundOn) return undefined;
    const timer = window.setInterval(() => setTurn((current) => current + 1), 7000);
    return () => window.clearInterval(timer);
  }, [candidates.length, soundOn]);

  const previewIndex = allowed && !soundOn && candidates.length ? candidates[turn % candidates.length] : -1;
  return { refs, previewIndex, setSoundOn };
}

export function StoryCarousel() {
  const row = useSnapRow(stories.length);
  const picker = usePreviewPicker(stories.length);
  const step = (direction) => row.goTo(Math.min(stories.length - 1, Math.max(0, row.active + direction)));
  return (
    <div className="nx-storyrow-wrap">
      <ul className="sn-row nx-storyrow" ref={row.ref} onScroll={row.onScroll}>
        {stories.map((story, index) => (
          <li
            key={story.name}
            className="nx-story"
            data-index={index}
            ref={(element) => {
              picker.refs.current[index] = element;
            }}
          >
            <PreviewVideo
              poster={story.poster}
              video={story.video}
              label={`${story.name} introduces ${pronoun[story.name] || "their"}self in German`}
              duration={story.duration}
              focus={story.focus}
              preview={picker.previewIndex === index}
              onSound={picker.setSoundOn}
            >
              <span className="nx-story-info" aria-hidden="true">
                <strong>{story.name}</strong>
                <span>
                  {story.state} · {story.qualification}
                </span>
                <span className={`nx-story-level${story.done ? " is-done" : ""}`}>
                  <Icon
                    name={story.done ? "seal-check" : "hourglass-medium"}
                    size={12}
                    weight={story.done ? "fill" : "bold"}
                  />
                  {story.level}
                </span>
              </span>
            </PreviewVideo>
          </li>
        ))}
      </ul>
      <div className="nx-storyrow-controls">
        <button type="button" aria-label="Previous story" onClick={() => step(-1)} disabled={row.active === 0}>
          <Icon name="arrow-left" size={16} />
        </button>
        <RowDots row={row} labels={stories.map((story) => `Show ${story.name}'s story`)} />
        <button
          type="button"
          aria-label="Next story"
          onClick={() => step(1)}
          disabled={row.active === stories.length - 1}
        >
          <Icon name="arrow-right" size={16} />
        </button>
      </div>
    </div>
  );
}

// Google reviews as a plain wall of cards (after bklit's testimonial wall):
// each review at its natural length, nothing moving while people read.
// Phones show three and a button for the rest; wide screens show all seven
// in three columns.
function ReviewWall() {
  const [all, setAll] = useState(false);
  return (
    <div className="nx-wall-wrap">
      <ul className={`nx-wall${all ? " is-all" : ""}`} id="nx-wall">
        {reviews.map((review) => (
          <li key={review.name}>
            <figure className="nx-review">
              <div className="nx-review-top">
                <span className="nx-review-stars" role="img" aria-label="5 out of 5 stars">
                  ★★★★★
                </span>
                <span className="nx-review-g" aria-hidden="true">
                  <GoogleReviewMark />
                </span>
              </div>
              <blockquote>{review.quote}</blockquote>
              <figcaption>
                <span className="nx-review-avatar" aria-hidden="true">
                  {review.initials}
                </span>
                <span>
                  <strong>{review.name}</strong>
                  <small>Google review</small>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {!all && (
        <button type="button" className="nx-wall-more" aria-controls="nx-wall" aria-expanded="false" onClick={() => setAll(true)}>
          Show all {reviews.length} reviews
          <Icon name="caret-down" size={14} />
        </button>
      )}
    </div>
  );
}

// The review wall under a Google heading.
export function GoogleReviews() {
  return (
    <div className="nx-reviews">
      <div className="nx-reviews-head">
        <span className="nx-reviews-g" aria-hidden="true">
          <GoogleReviewMark />
        </span>
        <div>
          <h3>What learners say on Google</h3>
          <p>
            <span className="nx-review-stars" aria-hidden="true">
              ★★★★★
            </span>{" "}
            5-star reviews from Skillcase learners
          </p>
        </div>
      </div>
      <ReviewWall />
    </div>
  );
}

export default function StoriesNext() {
  return (
    <section className="section nx-stories" id="stories" aria-labelledby="nx-stories-title">
      <Heading
        id="nx-stories-title"
        eyebrow="Learner stories"
        title="Real learners. Real progress toward a job abroad."
        intro="Learners introduce themselves in German. Tap a video to hear them."
      />
      <StoryCarousel />
      <GoogleReviews />
    </section>
  );
}
