import { useEffect, useState } from "react";
import Icon from "../healthcare/Icon.jsx";
import { formatLakhRange } from "../../data/placements.js";
import { roles } from "../../data/roles.js";

// Animated UI scenes for "How it works" on /home-next, built in code. Ideas
// from the owner's reference list, rebuilt in our style: UI notifications
// sliding in (turn.io), a flipping flashcard (Kokonut / SmoothUI card flip),
// a number pop-in (transitions.dev) and a pointer tap.
//
// A scene animates while `play` is true. Before JavaScript runs (and for
// search engines) every scene shows its finished state; once mounted, scenes
// wait at their first frame until played. Remount a scene (new key) to replay
// it. With Reduce Motion the animations run more slowly rather than stopping.

const nursePay = formatLakhRange(roles.find((role) => role.key === "nurse").salary);

// After the first mount the page is hydrated, so scenes mounted later (a
// replay remounts one) can start armed and never flash their finished state.
let hydrated = false;

function Scene({ play, className, children }) {
  const [armed, setArmed] = useState(hydrated);
  useEffect(() => {
    hydrated = true;
    setArmed(true);
  }, []);
  return (
    <div className={`sc ${className}${armed ? " is-armed" : ""}${play ? " is-play" : ""}`} aria-hidden="true">
      {children}
    </div>
  );
}

// 1. A pointer taps "Nurse"; an advisor match slides in.
export function ProfileScene({ play }) {
  return (
    <Scene play={play} className="sc-profile">
      <div className="sc-card">
        <div className="sc-head">
          <span className="sc-avatar">
            <Icon name="user" size={15} />
          </span>
          <span className="sc-title">
            <strong>Your profile</strong>
            <small>Takes 2 minutes</small>
          </span>
        </div>
        <p className="sc-label">I work as a</p>
        <div className="sc-chips">
          <span className="sc-chip sc-pick">
            <Icon name="check" size={11} />
            Nurse
          </span>
          <span className="sc-chip">Doctor</span>
          <span className="sc-chip">Physio</span>
          <span className="sc-chip">Lab tech</span>
        </div>
        <span className="sc-pointer">
          <Icon name="hand-pointing" size={22} weight="fill" />
        </span>
      </div>
      <div className="sc-toast">
        <span className="sc-toast-icon">
          <Icon name="seal-check" size={16} weight="fill" />
        </span>
        <span>
          <strong>Advisor matched 3 roles</strong>
          <small>Hamburg · Munich · Cologne</small>
        </span>
      </div>
    </Scene>
  );
}

// 2. The level bar fills to B1; a medical German flashcard flips back and forth.
export function GermanScene({ play }) {
  return (
    <Scene play={play} className="sc-german">
      <div className="sc-card">
        <div className="sc-head sc-between">
          <strong>German level</strong>
          <span className="sc-tag">B1</span>
        </div>
        <div className="sc-track">
          <i />
        </div>
        <ol className="sc-levels">
          <li>A1</li>
          <li>A2</li>
          <li className="is-now">B1</li>
          <li>B2</li>
        </ol>
        <div className="sc-flash">
          <div className="sc-flash-inner">
            <span className="sc-face sc-front">
              <small>Medical German</small>
              <strong>die Krankenschwester</strong>
            </span>
            <span className="sc-face sc-back">
              <small>English</small>
              <strong>the nurse</strong>
            </span>
          </div>
        </div>
        <div className="sc-live">
          <span className="sc-dot" />
          Live class · 7:00 PM
        </div>
      </div>
    </Scene>
  );
}

// 3. Interview and documents tick off; an offer drops in; the pay pops in.
export function OfferScene({ play }) {
  return (
    <Scene play={play} className="sc-offer">
      <div className="sc-notif">
        <span className="sc-notif-icon">
          <Icon name="hospital" size={15} />
        </span>
        <span className="sc-title">
          <strong>New job offer</strong>
          <small>University hospital · Hamburg</small>
        </span>
        <em>now</em>
      </div>
      <div className="sc-card">
        <div className="sc-row">
          <span className="sc-tick">
            <Icon name="check" size={11} />
          </span>
          Interview completed
        </div>
        <div className="sc-row">
          <span className="sc-tick">
            <Icon name="check" size={11} />
          </span>
          Documents verified
        </div>
        <div className="sc-offer-row">
          <span>
            <small>Registered nurse</small>
            <strong className="sc-pay">
              {nursePay}
              <em>/month</em>
            </strong>
          </span>
          <span className="sc-accept">Accept</span>
        </div>
      </div>
    </Scene>
  );
}

// 4. The plane flies BLR -> FRA along an arc; visa, housing and family tick off.
export function MoveScene({ play }) {
  return (
    <Scene play={play} className="sc-move">
      <div className="sc-card sc-pass">
        <div className="sc-pass-top">
          <span>Boarding pass</span>
          <span className="sc-status">On time</span>
        </div>
        <div className="sc-route">
          <span className="sc-city">
            <strong>BLR</strong>
            <small>Bengaluru</small>
          </span>
          <span className="sc-arc">
            <svg viewBox="0 0 120 44">
              <path d="M6 38 Q60 -4 114 38" pathLength="100" />
            </svg>
            <span className="sc-plane">
              <Icon name="airplane" size={16} weight="fill" />
            </span>
          </span>
          <span className="sc-city sc-end">
            <strong>FRA</strong>
            <small>Frankfurt</small>
          </span>
        </div>
        <div className="sc-checks">
          <span>
            <Icon name="check" size={11} />
            Visa
          </span>
          <span>
            <Icon name="check" size={11} />
            Housing
          </span>
          <span>
            <Icon name="check" size={11} />
            Family
          </span>
        </div>
      </div>
    </Scene>
  );
}
