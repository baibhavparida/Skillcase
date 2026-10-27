import { useState } from "react";
import ResponsiveImage from "../ResponsiveImage.jsx";
import Icon from "../healthcare/Icon.jsx";

// Webinar and podcast for the homepage variant. Same content as the live
// homepage's sections (HomeSections.jsx; keep them in sync).

const WEBINAR_URL = "https://learner.skillcase.in/events/7cdknjvd";
const PODCAST_ID = "-1NrsTNPab4";

// The webinar as a light event card with a soft cyan glow travelling round
// its edge (after libraries.dev's "Border beam"), so it draws the eye
// without moving the layout.
export function WebinarNext() {
  return (
    <section className="section nx-webinar" id="register-webinar" aria-labelledby="nx-webinar-title">
      <div className="nx-webinar-card">
        <div className="nx-webinar-media">
          <ResponsiveImage
            src="/assets/images/o4-webinar.webp"
            alt="Three young Indian women joining a Skillcase webinar on a laptop at home"
            sizes="(max-width: 899px) calc(100vw - 32px), 520px"
          />
          <span className="nx-webinar-live">
            <span className="sn-live-dot" aria-hidden="true" />
            Live
          </span>
        </div>
        <div className="nx-webinar-body">
          <p className="eyebrow">Free live webinar</p>
          <h2 id="nx-webinar-title">Nursing jobs in Germany</h2>
          <p className="nx-webinar-lede">
            Clear guidance on eligibility, documents, interviews, salary and your next steps.
          </p>
          <ul className="nx-webinar-facts">
            <li>
              <Icon name="calendar-check" size={16} />
              Today · 8:00 PM IST
            </li>
            <li>
              <Icon name="video-camera" size={16} />
              Online, live
            </li>
            <li>
              <Icon name="seal-check" size={16} />
              Free · limited seats
            </li>
          </ul>
          <a className="btn nx-webinar-cta" href={WEBINAR_URL}>
            Register for free
            <Icon name="arrow-right" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

// The podcast shows its thumbnail first and loads YouTube only on tap, which
// saves phones about a megabyte of player code until someone wants to watch.
export function PodcastNext() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="podcast-section nx-podcast" aria-labelledby="podcast-title">
      <div className="podcast-copy">
        <p className="eyebrow">Podcast</p>
        <h2 id="podcast-title">Listen to our expert podcast</h2>
        <p>
          Get practical guidance on healthcare careers in Germany, employer expectations, and
          stronger applications.
        </p>
        <div className="podcast-highlights" aria-label="Podcast highlights">
          <span>
            <Icon name="stethoscope" size={14} />
            Healthcare careers
          </span>
          <span>
            <Icon name="shield-check" size={14} />
            Expert guidance
          </span>
          <span>
            <Icon name="file-text" size={14} />
            Germany pathway
          </span>
        </div>
      </div>
      <article className="podcast-player" aria-label="Skillcase expert podcast video">
        <div className="podcast-video-frame">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${PODCAST_ID}?rel=0&autoplay=1`}
              title="Listen to our expert podcast on YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <button type="button" className="nx-pod-start" onClick={() => setPlaying(true)} aria-label="Play the Skillcase expert podcast">
              <img
                src={`https://i.ytimg.com/vi/${PODCAST_ID}/maxresdefault.jpg`}
                alt=""
                width="1280"
                height="720"
                loading="lazy"
                decoding="async"
              />
              <span className="nx-pv-play" aria-hidden="true">
                <Icon name="play" size={22} weight="fill" />
              </span>
            </button>
          )}
        </div>
      </article>
    </section>
  );
}
