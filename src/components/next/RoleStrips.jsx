import { useState } from "react";
import ResponsiveImage from "../ResponsiveImage.jsx";
import Icon from "../healthcare/Icon.jsx";
import { formatLakhRange } from "../../data/placements.js";
import { roles, signupHref } from "../../data/roles.js";
import { Heading } from "./shared.jsx";

// "Who can apply?"
// - Phones and tablets: compact full-width cards (two columns on tablets): a navy
//   panel with role, pay and German level that blends into the person's
//   photo on the right, so the text sits on solid colour and the face stays
//   clear. Each whole card links to Apply for that role.
// - Desktop: expanding photo strips (after React Bits' Accordion Gallery, in
//   full colour): six panels side by side; the open one widens on click or
//   when the mouse rests on it. Closed panels still show role and pay.

export default function RoleStrips() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section nx-roles" id="jobs" aria-labelledby="nx-roles-title">
      <Heading
        id="nx-roles-title"
        eyebrow="Job seeker?"
        title="Who can apply?"
        intro="Pathways for nurses, doctors, physiotherapists and medical technicians, with typical pay and German level."
      />
      <ul className="nx-rolegrid">
        {roles.map((role) => (
          <li key={role.key}>
            <a className="nx-rcard" href={signupHref(role.key)} aria-label={`Apply as ${role.title}: ${formatLakhRange(role.salary)} a month, ${role.german}`}>
              <ResponsiveImage className="nx-rcard-photo" src={role.image} alt="" sizes="(max-width: 599px) 62vw, 31vw" />
              <span className="nx-rcard-text" aria-hidden="true">
                <strong>{role.title}</strong>
                <span className="nx-rcard-pay">
                  {formatLakhRange(role.salary)}
                  <em>/month</em>
                </span>
                <span className="nx-rcard-german">
                  <Icon name="translate" size={12} />
                  {role.german}
                </span>
              </span>
              <span className="nx-rcard-go" aria-hidden="true">
                Apply
                <Icon name="arrow-right" size={13} />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <ul className="nx-strips">
        {roles.map((role, index) => {
          const isOpen = index === open;
          return (
            <li
              key={role.key}
              className={`nx-strip${isOpen ? " is-open" : ""}`}
              onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(index)}
            >
              <ResponsiveImage
                className="nx-strip-photo"
                src={role.image}
                alt=""
                sizes="(max-width: 899px) calc(100vw - 32px), 560px"
              />
              <button
                type="button"
                className="nx-strip-toggle"
                aria-expanded={isOpen}
                aria-controls={`nx-strip-${role.key}`}
                onClick={() => setOpen(index)}
              >
                <span className="nx-strip-name">{role.title}</span>
                <span className="nx-strip-pay">{formatLakhRange(role.salary)}/month</span>
              </button>
              <div className="nx-strip-detail" id={`nx-strip-${role.key}`} inert={!isOpen}>
                <span className="nx-strip-german">
                  <Icon name="translate" size={13} />
                  {role.german}
                </span>
                <a className="btn btn-gold nx-strip-apply" href={signupHref(role.key)}>
                  Apply
                  <Icon name="arrow-right" size={14} />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
