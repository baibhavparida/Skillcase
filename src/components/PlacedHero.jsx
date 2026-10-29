import "../styles/placed-hero.css";
import ResponsiveImage from "./ResponsiveImage.jsx";
import Icon from "./healthcare/Icon.jsx";
import { formatLakhRange, placements } from "../data/placements.js";

// Homepage hero whose imagery is a moving row of healthcare professionals
// working across Germany, each card carrying city, role and typical pay.
// Copy matches the live hero word for word. Built phone-first: on a 390px
// screen the headline, both buttons and the moving row share the first view.

export function HeroCard({ item, index, duplicate }) {
  const eager = !duplicate && index < 2;
  return (
    <li className="ph-card">
      <ResponsiveImage
        src={item.image}
        alt={duplicate ? "" : item.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={!duplicate && index === 0 ? "high" : undefined}
        sizes="(max-width: 760px) 168px, 208px"
      />
      <span className="ph-city">
        <Icon name="map-pin" size={12} weight="fill" />
        {item.city}
      </span>
      <div className="ph-info">
        <p className="ph-role">{item.role}</p>
        <p className="ph-pay">
          <strong>{formatLakhRange(item.salary)}</strong>
          <span>/month</span>
        </p>
      </div>
    </li>
  );
}

export default function PlacedHero() {
  return (
    <section className="ph-hero" id="top" aria-labelledby="ph-title">
      <div className="ph-copy">
        <a className="webinar-pill" href="/events/7cdknjvd/">
          <span className="webinar-pill-icon" aria-hidden="true">
            <span data-icon="video" data-size="15"></span>
          </span>
          <span className="webinar-pill-copy">
            <span>Live webinar</span>
            <strong>Nursing jobs in Germany</strong>
          </span>
          <span className="webinar-pill-arrow" aria-hidden="true">
            <span data-icon="arrow-right" data-size="13"></span>
          </span>
        </a>
        <div className="ph-copy-grid">
          <h1 id="ph-title">
            Land your healthcare job in Germany
          </h1>
          <div className="ph-copy-side">
            <p>Explore healthcare jobs in Germany with expert support at every step.</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href="#jobs">
                See Jobs
                <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
              </a>
              <a
                className="btn btn-outline hero-app-cta"
                href="https://play.google.com/store/apps/details?id=com.skillcase.app&hl=en_IN"
                rel="noreferrer"
                target="_blank"
              >
                <img src="/assets/images/google-play-mark.svg" alt="" aria-hidden="true" />
                Download App
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="ph-window">
        <div className="ph-track">
          <ul className="ph-group" aria-label="Healthcare roles in Germany with typical monthly pay">
            {placements.map((item, index) => (
              <HeroCard item={item} index={index} key={item.key} />
            ))}
          </ul>
          <ul className="ph-group" aria-hidden="true">
            {placements.map((item, index) => (
              <HeroCard item={item} index={index} key={item.key} duplicate />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
