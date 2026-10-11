import { useEffect, useState } from "react";
import Icon from "../healthcare/Icon.jsx";
import { classTiles } from "../../data/startNow.js";

// Hero visual: a live class window built in code, filled with real webcam
// frames of a Skillcase teacher and learners. Phones show the first nine
// tiles (3 x 3), wider screens all twelve (4 x 3). The "speaking" highlight
// moves between the teacher and learners; with Reduce Motion on it keeps
// moving, just more slowly, as the homepage's moving rows do.

// Tile indexes in speaking order, all within the nine tiles phones show.
const speakingOrder = [0, 2, 0, 5, 1, 0, 3, 6, 0, 8, 4, 0, 7];

export default function LiveClass() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setInterval(
      () => setStep((current) => (current + 1) % speakingOrder.length),
      reduceMotion ? 5200 : 2600,
    );
    return () => window.clearInterval(timer);
  }, []);

  const speaker = speakingOrder[step];

  return (
    <figure
      className="sn-live"
      role="img"
      aria-label="A live Skillcase German class: a teacher and learners on video"
    >
      <div className="sn-live-bar">
        <span className="sn-live-badge">
          <span className="sn-live-dot" />
          Live
        </span>
        <span className="sn-live-title">German class</span>
        <span className="sn-live-people">
          <Icon name="users" size={13} />
          {classTiles.length}
        </span>
      </div>

      <ul className="sn-live-grid">
        {classTiles.map((tile, index) => (
          <li
            key={tile.name}
            className={[
              "sn-tile",
              tile.teacher && "is-teacher",
              index === speaker && "is-speaking",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {tile.image ? (
              <img
                src={`/assets/images/start-now/${tile.image}.webp`}
                alt=""
                width="360"
                height="270"
                loading={index < 6 ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <span className="sn-tile-initials">{tile.initials}</span>
            )}
            <span className="sn-tile-name">
              {index === speaker && <Icon name="waveform" size={11} weight="fill" />}
              {tile.name}
            </span>
          </li>
        ))}
      </ul>

      <div className="sn-live-tools">
        <span>
          <Icon name="microphone" size={15} />
        </span>
        <span>
          <Icon name="video-camera" size={15} />
        </span>
        <span>
          <Icon name="hand-palm" size={15} />
        </span>
        <span>
          <Icon name="chat-circle-dots" size={15} />
        </span>
      </div>
    </figure>
  );
}
