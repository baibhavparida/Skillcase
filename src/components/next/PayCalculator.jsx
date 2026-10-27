import { useId, useState } from "react";
import Icon from "../healthcare/Icon.jsx";
import { INR_PER_EUR, formatLakhRange } from "../../data/placements.js";
import { roles, signupHref } from "../../data/roles.js";
import { groupThousands, Heading } from "./shared.jsx";

// Pay calculator. Built for phones first, after the mobile calculators of
// Wealthsimple (value with − and + buttons), Stake (quick-pick amounts) and
// Zopa (one tidy row of options): pick a role and today's salary, and the
// answer sits right below, above the call to action. Pay is the typical gross
// monthly range for the role (the same figures as the role list).

const MIN = 10000;
const MAX = 200000;
const STEP = 5000;
const PICKS = [20000, 35000, 50000, 100000];

// Short chip labels so the row stays compact.
const shortTitle = {
  nurse: "Nurse",
  doctor: "Doctor",
  physiotherapist: "Physio",
  "lab-technician": "Lab tech",
  "radiology-technician": "Radiology tech",
  "ot-anaesthesia-technician": "OT & anaesthesia",
};

// 150000 -> "1,50,000" (Indian grouping), by hand so server and browser agree.
function indianGroup(value) {
  const digits = String(Math.round(value));
  if (digits.length <= 3) return digits;
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${last3}`;
}

// 35000 -> "₹35k", 100000 -> "₹1L".
const shortRupees = (value) => (value >= 100000 ? `₹${value / 100000}L` : `₹${value / 1000}k`);

const clamp = (value) => Math.min(MAX, Math.max(MIN, value));

// Desktop only, in the column beside the calculator: what comes with the pay.
// From the live homepage (bonuses and allowances; no recruitment fees) and
// the site's nursing guide (paid leave, health insurance, pension).
const perks = [
  {
    icon: "coins",
    title: "Bonuses and allowances",
    copy: "Performance bonuses and allowances on top of your base pay.",
  },
  {
    icon: "first-aid-kit",
    title: "Paid leave and health insurance",
    copy: "20–30 days of paid leave a year, health insurance and pension contributions.",
  },
  {
    icon: "seal-check",
    title: "No recruitment fees",
    copy: "No agent or recruitment fees. Fully transparent.",
  },
];

export default function PayCalculator() {
  const [roleKey, setRoleKey] = useState("nurse");
  const [current, setCurrent] = useState(30000);
  const sliderId = useId();
  const role = roles.find((entry) => entry.key === roleKey);
  const [lowEur, highEur] = role.salary;
  const low = lowEur * INR_PER_EUR;
  const high = highEur * INR_PER_EUR;
  const timesLow = Math.floor(low / current);
  const timesHigh = Math.floor(high / current);
  const times = timesLow === timesHigh ? `${timesLow}×` : `${timesLow}–${timesHigh}×`;
  const fill = ((current - MIN) / (MAX - MIN)) * 100;
  const set = (value) => setCurrent(clamp(value));

  return (
    <section className="section nx-pay" id="pay" aria-labelledby="nx-pay-title">
      <div className="nx-pay-panel">
        <div className="nx-pay-copy">
          <Heading
            id="nx-pay-title"
            eyebrow="Pay calculator"
            title="What could you earn in Germany?"
            intro="Pick your role and your salary today to compare."
          />
          <p className="nx-pay-perks-title">Along with your pay</p>
          <ul className="nx-pay-perks">
            {perks.map(({ icon, title, copy }) => (
              <li key={title}>
                <span className="nx-pay-perk-icon" aria-hidden="true">
                  <Icon name={icon} size={18} />
                </span>
                <span>
                  <strong>{title}</strong>
                  {copy}
                </span>
              </li>
            ))}
          </ul>
          <a className="nx-pay-call" href="tel:+919731462667">
            <Icon name="phone-call" size={15} />
            Not sure which role fits? Talk to an advisor
          </a>
        </div>

        <div className="nx-calc">
          <div className="nx-calc-field">
            <p className="nx-calc-label" id="nx-calc-role">
              Your role
            </p>
            <div className="nx-calc-roles" role="group" aria-labelledby="nx-calc-role">
              {roles.map((entry) => (
                <button
                  key={entry.key}
                  type="button"
                  aria-pressed={entry.key === roleKey}
                  className={entry.key === roleKey ? "is-on" : undefined}
                  onClick={() => setRoleKey(entry.key)}
                >
                  {shortTitle[entry.key] || entry.title}
                </button>
              ))}
            </div>
          </div>

          <div className="nx-calc-field">
            <label className="nx-calc-label" htmlFor={sliderId}>
              Your monthly salary now
            </label>
            <div className="nx-stepper">
              <button
                type="button"
                aria-label="Decrease by ₹5,000"
                onClick={() => set(current - STEP)}
                disabled={current <= MIN}
              >
                <Icon name="minus" size={16} />
              </button>
              <output className="nx-calc-now" htmlFor={sliderId}>
                ₹{indianGroup(current)}
              </output>
              <button
                type="button"
                aria-label="Increase by ₹5,000"
                onClick={() => set(current + STEP)}
                disabled={current >= MAX}
              >
                <Icon name="plus" size={16} />
              </button>
            </div>
            <input
              id={sliderId}
              className="nx-calc-slider"
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={current}
              style={{ "--nx-fill": `${fill}%` }}
              aria-valuetext={`₹${indianGroup(current)} a month`}
              onChange={(event) => set(Number(event.target.value))}
            />
            <div className="nx-picks" role="group" aria-label="Quick amounts">
              {PICKS.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={value === current ? "is-on" : undefined}
                  aria-pressed={value === current}
                  onClick={() => set(value)}
                >
                  {shortRupees(value)}
                </button>
              ))}
            </div>
          </div>

          {/* The answer, right under the controls that change it. */}
          <div className="nx-calc-result" aria-live="polite">
            <div className="nx-calc-head">
              <p className="nx-calc-label">{shortTitle[roleKey]} in Germany</p>
              {timesHigh >= 2 && (
                <span className="nx-calc-times">
                  {times}{" "}
                  <small>your pay</small>
                </span>
              )}
            </div>
            <p className="nx-calc-total">
              {formatLakhRange(role.salary)}
              <span>/month</span>
            </p>
            <p className="nx-calc-sub">
              <span>
                Typical gross pay · €{groupThousands(lowEur)}–{groupThousands(highEur)}
              </span>{" "}
              · <span>{role.german}</span>
            </p>

            <div className="nx-bars" aria-hidden="true">
              <div className="nx-bar">
                <span>
                  You now <b>₹{indianGroup(current)}</b>
                </span>
                <i style={{ width: `${Math.max(1.5, (current / high) * 100)}%` }} />
              </div>
              <div className="nx-bar nx-bar-de">
                <span>
                  In Germany <b>{formatLakhRange(role.salary)}</b>
                </span>
                <i style={{ width: "100%", "--nx-low": `${(low / high) * 100}%` }} />
              </div>
            </div>
          </div>

          <a className="btn btn-gold nx-calc-cta" href={signupHref(roleKey)}>
            Check your eligibility
            <Icon name="arrow-right" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
