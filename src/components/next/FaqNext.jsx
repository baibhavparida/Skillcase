import { useState } from "react";
import Icon from "../healthcare/Icon.jsx";
import { faqs } from "../HomeSections.jsx";

// FAQ for the homepage variant: the live homepage's questions with an icon
// each and thin dividers instead of boxes (after HeroUI's accordion). Answers
// open smoothly (grid rows 0fr -> 1fr) and stay in the page for search. One
// open at a time; the first starts open. Desktop: the heading stays in view
// on the left while the questions scroll on the right. Defaults are the
// homepage's; the Learner Stories variant passes its own questions.

const homeIcons = ["stethoscope", "translate", "seal-check", "file-text", "clock", "globe-hemisphere-east"];

export default function FaqNext({
  items = faqs,
  icons = homeIcons,
  title = "Frequently asked questions",
  intro = "Clear answers before you start your healthcare journey to Germany and beyond.",
  call = { href: "tel:+919731462667", label: "Talk to an advisor" },
}) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section nx-faq" id="faq" aria-labelledby="nx-faq-title">
      <div className="nx-faq-head">
        <p className="eyebrow">FAQ</p>
        <h2 id="nx-faq-title">{title}</h2>
        <p>{intro}</p>
        <a className="nx-faq-call" href={call.href}>
          <Icon name="phone-call" size={15} />
          {call.label}
        </a>
      </div>
      <ul className="nx-faq-list">
        {items.map((item, index) => {
          const isOpen = index === open;
          return (
            <li key={item.question} className={isOpen ? "is-open" : undefined}>
              <h3>
                <button
                  type="button"
                  id={`nx-faq-q${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`nx-faq-a${index}`}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span className="nx-faq-icon" aria-hidden="true">
                    <Icon name={icons[index] || "question"} size={17} />
                  </span>
                  <span className="nx-faq-q">{item.question}</span>
                  <span className="nx-faq-toggle" aria-hidden="true" />
                </button>
              </h3>
              <div className="nx-faq-a" id={`nx-faq-a${index}`} role="region" aria-labelledby={`nx-faq-q${index}`}>
                <div>
                  <p>{item.answer}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
