import Icon from "../healthcare/Icon.jsx";
import { learners as liveLearners } from "../LearnerMarquee.jsx";
import { Heading } from "./shared.jsx";

// "Meet our learners": the live homepage's real learners (photo, name, home
// state) drifting slowly past in a full-width row. Real people, so their names
// stay; no claims beyond what the live page says. The row pauses under a
// resting mouse; Reduce Motion slows it rather than stopping it.

// Cleaner copies of three live photos: the start-now page's sharper still of
// Pinak Saini, and two video-call stills with their black frames trimmed off.
const cleaner = {
  "Pinak Saini": "/assets/images/start-now/tile-pinak-saini.webp",
  "Sheila H. V.": "/assets/images/learner-marquee/sheila-h-v-trimmed.webp",
  "Sivaranjani P": "/assets/images/learner-marquee/sivaranjani-p-trimmed.webp",
};

const learners = liveLearners.map((learner) => ({
  ...learner,
  image: cleaner[learner.name] || learner.image,
}));

function Group({ duplicate = false }) {
  return (
    <ul className="nx-lm-group" aria-hidden={duplicate || undefined}>
      {learners.map((learner) => (
        <li className="nx-lm-card" key={learner.name}>
          <img
            src={learner.image}
            alt={duplicate ? "" : `${learner.name}, Skillcase learner from ${learner.location}`}
            loading="lazy"
            decoding="async"
          />
          <span className="nx-lm-caption">
            <strong>{learner.name}</strong>
            <span>
              <Icon name="map-pin" size={11} weight="fill" />
              {learner.location}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function LearnersNext() {
  return (
    <section className="section nx-learners" aria-labelledby="nx-learners-title">
      <div className="nx-learners-head">
        <Heading id="nx-learners-title" eyebrow="Skillcase community" title="Meet our learners" />
      </div>
      <div className="nx-lm-window">
        <div className="nx-lm-track">
          <Group />
          <Group duplicate />
        </div>
      </div>
    </section>
  );
}
