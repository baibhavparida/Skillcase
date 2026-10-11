import "../styles/role-list.css";
import ResponsiveImage from "./ResponsiveImage.jsx";
import Icon from "./healthcare/Icon.jsx";
import { ausbildung, roles, signupHref } from "../data/roles.js";
import { formatLakhRange } from "../data/placements.js";

// "Who can apply?": one tappable row per profession with its usual German
// level and typical pay, so every visitor can find their pathway quickly.
export default function RoleList() {
  return (
    <section className="section rl-section" id="jobs" aria-labelledby="rl-title">
      <div className="section-heading">
        <p className="eyebrow">Job seeker?</p>
        <h2 id="rl-title">Who can apply?</h2>
        <p>
          Germany pathways for nurses, doctors, physiotherapists and medical
          technicians, with the usual German level and typical pay for each role.
        </p>
      </div>

      <ul className="rl-list">
        {roles.map((role) => (
          <li key={role.key}>
            <a className="rl-row" href={signupHref(role.key)}>
              <ResponsiveImage className="rl-face" src={role.image} alt="" sizes="56px" />
              <span className="rl-text">
                <strong>{role.title}</strong>
                <span className="rl-meta">
                  <span className="rl-pay">{formatLakhRange(role.salary)}/month</span>
                  <span>{role.german}</span>
                </span>
              </span>
              <span className="rl-apply">
                Apply
                <Icon name="arrow-right" size={14} />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <a className="rl-row rl-row-ausbildung" href={signupHref(ausbildung.key)}>
        <ResponsiveImage className="rl-face" src={ausbildung.image} alt="" sizes="56px" />
        <span className="rl-text">
          <span className="rl-intro">{ausbildung.intro}</span>
          <strong>{ausbildung.title}</strong>
          <span className="rl-meta">
            <span className="rl-pay">{formatLakhRange(ausbildung.salary)}/month stipend</span>
            <span>{ausbildung.german}</span>
          </span>
        </span>
        <span className="rl-apply">
          Apply
          <Icon name="arrow-right" size={14} />
        </span>
      </a>
    </section>
  );
}
