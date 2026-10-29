import BaseLayout from "../layouts/BaseLayout.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Icon from "../components/healthcare/Icon.jsx";
import { PayError, useCheckout } from "../components/next/Checkout.jsx";
import { useCourses } from "../components/next/useCourses.js";
import { COMPLETE_ID, compareLabel, comparePrice, courseExtras, formatRupees } from "../data/courses.js";
import { faqs, phone, reviews } from "../data/startNow.js";
import "../styles/home.css";
import "../styles/home-next.css";
import "../styles/cart.css";

// The program picker (/start-now/cart), where the Learner Stories page's
// "Start your journey" leads. Built to help people decide and pay, honestly:
// - The recommended End-to-End program comes first, white with a glowing
//   edge: what it includes (kept small), its parts' regular prices added up
//   (struck out, with the saving), its price and a gold "Pay now".
// - Then every other program as its own card, in the CMS's order, each with
//   its own "Pay now". Every "Pay now" goes straight to Razorpay for that
//   one program (the owner's call: no basket, no second step).
// - Then secure payment on Razorpay and a counsellor's number, what happens
//   after paying, real learner reviews and a short FAQ.
// Seat notes and offers come from the CMS as the team writes them; nothing
// here invents a deadline or a count. Struck-out prices are only real
// comparisons (comparePrice in courses.js). Payment: /api/cart/checkout (Worker)
// returns a Razorpay payment link and the page goes there.

function Price({ block, large = false }) {
  return (
    <span className={`cx-price${large ? " is-large" : ""}`}>
      <strong>{formatRupees(block.price_paise)}</strong>
      {block.show_gst_badge && <small>+ GST</small>}
    </span>
  );
}

// The struck-out price, labelled with what it is.
function Was({ block, compare }) {
  return (
    <p className="cx-was">
      <s>{formatRupees(compare.paise)}</s>
      {compareLabel(compare)}
    </p>
  );
}

function CompletePlan({ block, compare, paying, failed, onPay }) {
  const extra = courseExtras[block.id] || {};

  return (
    <section className="cx-complete nx-glow" aria-labelledby="cx-complete-title">
      <div className="cx-complete-tags">
        {block.is_recommended && <span className="cx-tag">Recommended</span>}
        {block.urgency_badge_text && (
          <span className="cx-seats">
            <i aria-hidden="true" />
            {block.urgency_badge_text}
          </span>
        )}
      </div>
      <h2 id="cx-complete-title">{block.title}</h2>

      {extra.includes ? (
        <ul className="cx-includes" aria-label="Included">
          {extra.includes.map((item) => (
            <li key={item.label}>
              <Icon name={item.icon} size={14} />
              {item.label}
            </li>
          ))}
        </ul>
      ) : (
        <p className="cx-complete-lede">{block.description}</p>
      )}

      <div className="cx-complete-foot">
        <div>
          {compare && <Was block={block} compare={compare} />}
          <div className="cx-now">
            <Price block={block} large />
            {compare && <span className="cx-save">Save {formatRupees(compare.paise - block.price_paise)}</span>}
          </div>
        </div>
        <button type="button" className="btn btn-gold cx-choose" disabled={Boolean(paying)} onClick={() => onPay(block.id)}>
          {paying === block.id ? (
            "Opening payment…"
          ) : (
            <>
              Pay now
              <Icon name="arrow-right" size={16} />
            </>
          )}
        </button>
      </div>
      {failed === block.id && <PayError />}
    </section>
  );
}

// One program as its own card, text first like a food-delivery menu item
// (Swiggy, talabat): name, description and price on the left; a small photo
// on the right with its "Pay now" over the photo's lower edge.
function Course({ block, compare, paying, failed, onPay, tag }) {
  const extra = courseExtras[block.id] || {};
  const label = extra.label || block.title;
  return (
    <article className="cx-course">
      <div className="cx-course-info">
        <h3>{label}</h3>
        {tag && <span className="cx-course-tag">{tag}</span>}
        <p className="cx-course-text">{extra.note || block.description}</p>
        <div className="cx-course-price">
          {compare && <Was block={block} compare={compare} />}
          <div className="cx-now">
            <Price block={block} />
            {compare && <span className="cx-save">Save {formatRupees(compare.paise - block.price_paise)}</span>}
          </div>
        </div>
      </div>
      <div className="cx-course-side">
        {extra.image ? (
          <img src={extra.image} alt="" loading="lazy" decoding="async" width="240" height="240" />
        ) : (
          <span className="cx-course-badge" aria-hidden="true">
            <Icon name="graduation-cap" size={22} />
          </span>
        )}
        <button
          type="button"
          className="btn btn-outline cx-select"
          disabled={Boolean(paying)}
          onClick={() => onPay(block.id)}
        >
          {paying === block.id ? "Opening…" : "Pay now"}
          <span className="cx-sr"> for {label}</span>
        </button>
      </div>
      {failed === block.id && <PayError />}
    </article>
  );
}

const afterPay = [
  {
    icon: "lock-simple",
    title: "Pay securely",
    text: "Razorpay’s payment page opens, made out to Skillcase Education Private Limited.",
  },
  { icon: "phone-call", title: "We get in touch", text: "Our team contacts you to set up your classes and next steps." },
  {
    icon: "video-camera",
    title: "Start learning",
    text: "Live classes with recordings, notes in your language and practice in the Skillcase app.",
  },
];

// The two reviews that speak to fees and how classes run.
const cartReviews = reviews.filter((review) => ["Karthikeyan", "Abdullah Khan"].includes(review.name));
const cartFaqs = faqs.filter((item) => /know German|classes live/.test(item.question));

export default function StartNowCart() {
  const { blocks, banner } = useCourses();
  const { pay, paying, failed } = useCheckout();
  const complete = blocks.find((block) => block.id === COMPLETE_ID);
  const others = blocks.filter((block) => block.id !== COMPLETE_ID);
  const compareFor = (block) => comparePrice(block, blocks);
  const checkout = { paying, failed, onPay: pay };

  return (
    <BaseLayout
      title="Choose Your Program | Skillcase"
      description="Skillcase programs and fees: the End-to-End Germany Program, German courses from A1 to B2 and job placement for nurses. Pay securely online."
      font="manrope"
    >
      <div className="site-shell home-page home-next cx-page">
        <header className="cx-top">
          <a className="cx-back" href="/start-now/">
            <Icon name="arrow-left" size={16} />
            <span className="cx-back-label">Learner stories</span>
          </a>
          <a className="brand" href="/" aria-label="Skillcase home">
            <img alt="Skillcase" className="brand-logo" src="/assets/images/SKILLCASE_logo.svg" />
          </a>
          <a className="cx-call" href={phone.href} aria-label={`Call a counsellor on ${phone.label}`}>
            <Icon name="phone" size={16} />
            <span className="cx-call-short">Call</span>
            <span className="cx-call-long">{phone.label}</span>
          </a>
        </header>

        {banner && (
          <p className="cx-offer">
            {banner.highlight_text && <b>{banner.highlight_text}</b>}
            {banner.message}
          </p>
        )}

        <main className="cx-main">
          <div className="cx-intro">
            <p className="eyebrow">Programs and fees</p>
            <h1>Choose your program</h1>
            <p className="cx-trust">
              <span className="cx-faces" aria-hidden="true">
                {["sheila-h-v", "sneha-shaji", "modem-praveena", "ruth-joseph"].map((name) => (
                  <img key={name} src={`/assets/images/start-now/tile-${name}.webp`} alt="" decoding="async" />
                ))}
              </span>
              Trusted by 300+ nurses
            </p>
          </div>

          <div className="cx-layout">
            <div className="cx-plans">
              {complete && (
                <CompletePlan block={complete} compare={compareFor(complete)} {...checkout} />
              )}

              <p className="cx-or">Or pick only what you need</p>

              <ul className="cx-courses" id="courses" aria-label="Programs">
                {others.map((block) => {
                  const level = courseExtras[block.id]?.level;
                  return (
                    <li key={block.id}>
                      <Course
                        block={block}
                        compare={compareFor(block)}
                        {...checkout}
                        tag={level === "B1" || level === "B2" ? "For nursing jobs" : ""}
                      />
                    </li>
                  );
                })}
              </ul>

              <p className="cx-reassure">
                <span>
                  <Icon name="lock-simple" size={13} />
                  Secure payment on Razorpay
                </span>
                <span>
                  Need help choosing? <a href={phone.href}>Call {phone.label}</a>
                </span>
              </p>
            </div>
          </div>

          <section className="cx-after" aria-labelledby="cx-after-title">
            <h2 id="cx-after-title">What happens after you pay</h2>
            <ol>
              {afterPay.map((step, index) => (
                <li key={step.title}>
                  <span className="cx-after-num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>
                    <strong>{step.title}</strong>
                    {step.text}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="cx-voices" aria-labelledby="cx-voices-title">
            <h2 id="cx-voices-title">From our learners</h2>
            <ul>
              {cartReviews.map((review) => (
                <li key={review.name}>
                  <figure>
                    <span className="nx-review-stars" role="img" aria-label="5 out of 5 stars">
                      ★★★★★
                    </span>
                    <blockquote>{review.quote}</blockquote>
                    <figcaption>
                      {review.name} · Google review
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>

          <section className="cx-faq" aria-labelledby="cx-faq-title">
            <h2 id="cx-faq-title">Before you pay</h2>
            {cartFaqs.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <Icon name="caret-down" size={14} />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
            <details>
              <summary>
                How do payments and refunds work?
                <Icon name="caret-down" size={14} />
              </summary>
              <p>
                You pay online on Razorpay’s secure page, which shows the exact amount before you pay. Payments and
                refunds follow our <a href="/terms-and-conditions/">terms and conditions</a>.
              </p>
            </details>
            <p className="cx-faq-call">
              Still deciding? <a href={phone.href}>Call a counsellor on {phone.label}</a>
            </p>
          </section>
        </main>

        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
