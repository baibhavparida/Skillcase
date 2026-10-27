import ResponsiveImage from "../ResponsiveImage.jsx";
import Icon from "../healthcare/Icon.jsx";
import { formatLakhRange } from "../../data/placements.js";
import { salaryRange } from "../../data/roles.js";
import { CountUp, Heading } from "./shared.jsx";

// "Why Germany" (merged with "Why choose Skillcase") as a compact bento:
// two figure tiles and three photo tiles, one reason each. Figures and
// reasons are ones the site already states; the photos are the live
// homepage's benefit photos.
// Desktop (4 columns):  family family | pay  | demand
//                       school school | home home
// Phones (2 columns): family wide, pay and demand, school and home.

export default function WhyGermany() {
  return (
    <section className="section nx-whyde" id="benefits" aria-labelledby="nx-whyde-title">
      <Heading
        id="nx-whyde-title"
        eyebrow="Why Germany"
        title="A healthcare career that travels well"
        intro="Better pay, your family with you, and a path to settle."
      />

      <div className="nx-bento">
        <article className="nx-tile nx-tile-photo nx-tile-family">
          <ResponsiveImage
            src="/assets/images/o4-benefit-reunion.webp"
            alt="Indian family reunited with hugs at an airport in Germany"
            sizes="(max-width: 899px) calc(100vw - 32px), 580px"
          />
          <div className="nx-tile-caption">
            <h3>Bring your family</h3>
            <p>Your spouse and children, with guidance on visas and work rights.</p>
          </div>
        </article>

        <article className="nx-tile nx-tile-navy nx-tile-pay">
          <span className="nx-tile-label">Typical monthly pay</span>
          <strong className="nx-tile-figure">{formatLakhRange(salaryRange)}</strong>
          <p>Earn up to 10x your current salary, plus allowances.</p>
          <a href="#pay">
            Check your role <Icon name="arrow-right" size={13} />
          </a>
        </article>

        <article className="nx-tile nx-tile-sky nx-tile-demand">
          <span className="nx-tile-label">In demand</span>
          <strong className="nx-tile-figure">
            <CountUp to={500000} suffix="+" />
          </strong>
          <p>Healthcare professionals Germany needs by 2030</p>
        </article>


        <article className="nx-tile nx-tile-photo nx-tile-school">
          <ResponsiveImage
            src="/assets/images/o4-benefit-school.webp"
            alt="Indian mother adjusting her daughter’s school bag outside a primary school in Germany"
            sizes="(max-width: 899px) 46vw, 580px"
          />
          <div className="nx-tile-caption">
            <h3>Healthcare and schools</h3>
            <p>Quality care and affordable schooling.</p>
          </div>
        </article>

        <article className="nx-tile nx-tile-photo nx-tile-home">
          <ResponsiveImage
            src="/assets/images/o4-benefit-home.webp"
            alt="Indian family smiling with the keys to their new home in Germany"
            sizes="(max-width: 899px) 46vw, 580px"
          />
          <div className="nx-tile-caption">
            <h3>A path to settle</h3>
            <p>Guidance towards permanent residency.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
