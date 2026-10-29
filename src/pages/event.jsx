import { useEffect, useRef, useState } from "react";
import BaseLayout from "../layouts/BaseLayout.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Icon from "../components/healthcare/Icon.jsx";
import FaqNext from "../components/next/FaqNext.jsx";
import { useInView } from "../components/next/shared.jsx";
import { calendarLink, describeSession, nextSessions, scheduleDays, scheduleTime, startsIn } from "../data/events.js";
import { cartUrl, faqs, phone } from "../data/startNow.js";
import "../styles/home.css";
import "../styles/home-next.css";
import "../styles/event.css";

// A free live demo (/events/<slug>), rebuilt from the learner site's event
// page and laid out like Luma's: a square cover beside the event, and a
// registration card on the right (sticky) on wide screens; on phones the
// card follows the facts and a Meetup-style bar keeps "Reserve my seat" in
// reach.
// - The next real session is worked out from the weekly schedule in the
//   browser (src/data/events.js), with the honest time left ("Starts in 2
//   hours"); the prerendered page names the weekly days instead.
// - Registration is for the next session, with no day to choose: the Meet
//   link is the same for every session, and the success card says so.
//   Name, mobile, email and German level, as the learner site asks, go
//   through the Worker to the platform's own registration, which emails the
//   link. The success card adds the session to Google Calendar and shows
//   the link; it's remembered on this device until the session starts.
// - Below: what the demo covers (the CMS's own points) and an FAQ.

const LEVELS = ["Yet to learn", "A1", "A2", "B1", "B2"];
const storageKey = (slug) => `skillcase_event_${slug}`;
// "every Monday, Wednesday…" mid-sentence.
const everyDays = (schedule) => scheduleDays(schedule).replace(/^Every/, "every");
const FACES = ["sheila-h-v", "sneha-shaji", "modem-praveena", "ruth-joseph"];

function check(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter your name";
  if (!/^[6-9]\d{9}$/.test(form.phone)) errors.phone = "Enter your 10-digit mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address";
  if (!form.level) errors.level = "Choose your German level";
  return errors;
}

export default function EventPage({ event }) {
  const [now, setNow] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", level: "", website: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState("");
  const [booked, setBooked] = useState(null);
  const [cardRef, cardInView] = useInView({ threshold: 0.15, once: false });
  const nameRef = useRef(null);

  // Dates depend on the clock, so they're worked out here and refreshed
  // each minute. A registration made on this device shows until it starts.
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = setInterval(tick, 60000);
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey(event.slug)) || "null");
      if (saved?.at && new Date(saved.at) > new Date()) setBooked(saved);
    } catch {
      // Private mode: nothing remembered.
    }
    return () => clearInterval(timer);
  }, [event.slug]);

  const sessions = now ? nextSessions(event.schedule, now, 1) : [];
  const chosen = sessions[0] || null;
  const info = chosen ? describeSession(chosen, now, event.schedule.minutes) : null;
  const bookedAt = booked?.at ? new Date(booked.at) : null;
  const bookedInfo = bookedAt && now ? describeSession(bookedAt, now, event.schedule.minutes) : null;
  const dayLabel = (detail) => (detail.short === "Today" || detail.short === "Tomorrow" ? `${detail.short}, ${detail.date}` : `${detail.short} ${detail.date}`);

  const update = (field) => (change) => {
    const value = field === "phone" ? change.target.value.replace(/\D/g, "").slice(0, 10) : change.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (submitEvent) => {
    submitEvent.preventDefault();
    const found = check(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`ev-${first}`)?.focus();
      return;
    }
    setSending(true);
    setFailure("");
    try {
      const response = await fetch(`/api/events/${event.slug}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone,
          language_level: form.level,
          instance_date: chosen ? chosen.toISOString() : null,
          website: form.website,
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) throw new Error(data?.error || "");
      const record = {
        at: chosen ? chosen.toISOString() : null,
        email: form.email.trim(),
        meetingLink: data.meetingLink || event.meetingLink,
      };
      setBooked(record);
      try {
        localStorage.setItem(storageKey(event.slug), JSON.stringify(record));
      } catch {
        // Not remembered; the page still shows it now.
      }
    } catch (error) {
      setFailure(error.message || "Registration didn’t go through. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const goToForm = (click) => {
    click.preventDefault();
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 450);
  };

  const showBar = Boolean(now) && !booked && !cardInView;
  const eventFaqs = [
    {
      question: "Is the demo really free?",
      answer: "Yes. Register to get the Google Meet link by email. There’s nothing to pay.",
    },
    faqs.find((item) => item.question.includes("know German")),
    {
      question: "What do I need to join?",
      answer:
        "A phone or laptop with a good internet connection. The demo runs on Google Meet, and the link comes to your email when you register.",
    },
    {
      question: "Can I pick another day?",
      answer: `Yes. The demo runs ${everyDays(event.schedule)}, ${scheduleTime(event.schedule)}, and the same Google Meet link works for every session. Join on the day that suits you.`,
    },
    {
      question: "What happens after the demo?",
      answer:
        "If you’d like to continue, you can choose a program and pay online, or call us and a counsellor will help you choose.",
    },
  ].filter(Boolean);

  return (
    <BaseLayout
      title={`${event.title}: Free Live Demo | Skillcase`}
      description={`${event.lede} ${scheduleDays(event.schedule)}, ${scheduleTime(event.schedule)}.`}
      font="manrope"
    >
      <div className="site-shell home-page home-next ev-page">
        <header className="ev-top">
          <a className="brand" href="/" aria-label="Skillcase home">
            <img alt="Skillcase" className="brand-logo" src="/assets/images/SKILLCASE_logo.svg" />
          </a>
          <a className="ev-call" href={phone.href} aria-label={`Call us on ${phone.label}`}>
            <Icon name="phone" size={16} />
            <span className="ev-call-short">Call</span>
            <span className="ev-call-long">{phone.label}</span>
          </a>
        </header>

        <main className="ev-main">
          <div className="ev-layout">
            <div className="ev-intro">
              <figure className="ev-cover">
                <ResponsiveImage
                  src={event.image}
                  alt=""
                  loading="eager"
                  sizes="(max-width: 760px) calc(100vw - 32px), 300px"
                />
              </figure>

              <section className="ev-head" aria-labelledby="ev-title">
                <p className="ev-kicker">
                  <Icon name="video-camera" size={13} />
                  {event.kicker}
                </p>
                <h1 id="ev-title">{event.title}</h1>

                <ul className="ev-facts">
                  <li>
                    <span className="ev-tile" aria-hidden="true">
                      {info ? (
                        <>
                          <small>{info.month.slice(0, 3)}</small>
                          <b>{info.day}</b>
                        </>
                      ) : (
                        <Icon name="calendar-blank" size={20} />
                      )}
                    </span>
                    <span>
                      <strong>{info ? info.long : scheduleDays(event.schedule)}</strong>
                      <small>
                        {info ? info.time : scheduleTime(event.schedule)}
                        {info && <em> · {startsIn(chosen, now)}</em>}
                      </small>
                    </span>
                  </li>
                  <li>
                    <span className="ev-icon" aria-hidden="true">
                      <Icon name="video-camera" size={19} />
                    </span>
                    <span>
                      <strong>Google Meet</strong>
                      <small>On your phone or laptop. The link comes by email.</small>
                    </span>
                  </li>
                  <li>
                    <span className="ev-icon" aria-hidden="true">
                      <Icon name="ticket" size={19} />
                    </span>
                    <span>
                      <strong>Free</strong>
                      <small>{event.seats}</small>
                    </span>
                  </li>
                </ul>

                <p className="ev-host">
                  <span className="ev-faces" aria-hidden="true">
                    {FACES.map((name) => (
                      <img key={name} src={`/assets/images/start-now/tile-${name}.webp`} alt="" decoding="async" />
                    ))}
                  </span>
                  Hosted by Skillcase · Trusted by 300+ nurses
                </p>
              </section>
            </div>

            <aside className="ev-card" id="register" ref={cardRef} aria-labelledby="ev-card-title">
              {booked ? (
                <div className="ev-done" role="status">
                  <span className="ev-done-icon" aria-hidden="true">
                    <Icon name="check" size={22} />
                  </span>
                  <h2 id="ev-card-title">You’re in!</h2>
                  {bookedInfo && (
                    <p className="ev-done-when">
                      {bookedInfo.long} · {bookedInfo.time}
                    </p>
                  )}
                  <p>
                    We’ve emailed the Google Meet link to <strong>{booked.email}</strong>.
                  </p>
                  <div className="ev-done-actions">
                    {bookedAt && (
                      <a
                        className="btn btn-gold"
                        href={calendarLink(event, bookedAt, booked.meetingLink)}
                        target="_blank"
                        rel="noopener"
                      >
                        <Icon name="calendar-plus" size={16} />
                        Add to Google Calendar
                      </a>
                    )}
                    <a className="btn btn-outline" href={booked.meetingLink} target="_blank" rel="noopener">
                      <Icon name="video-camera" size={16} />
                      Open the Google Meet link
                    </a>
                  </div>
                  <p className="ev-done-also">
                    Can’t make it? The demo also runs {everyDays(event.schedule)},{" "}
                    {scheduleTime(event.schedule)}, on the same link.
                  </p>
                  <a className="ev-done-next" href={cartUrl}>
                    While you wait: see programs and fees
                    <Icon name="arrow-right" size={13} />
                  </a>
                </div>
              ) : (
                <form className="ev-form" onSubmit={submit} noValidate>
                  <h2 id="ev-card-title">Reserve your free seat</h2>

                  <p className="ev-next">
                    <Icon name="calendar-blank" size={15} />
                    <span>
                      Next demo: <strong>{info ? dayLabel(info) : scheduleDays(event.schedule)}</strong>
                      {" · "}
                      <span className="ev-nowrap">{info ? info.time : scheduleTime(event.schedule)}</span>
                    </span>
                  </p>

                  <div className="ev-field">
                    <label htmlFor="ev-name">Full name</label>
                    <input
                      id="ev-name"
                      ref={nameRef}
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "ev-name-error" : undefined}
                    />
                    {errors.name && (
                      <p className="ev-error" id="ev-name-error">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="ev-field">
                    <label htmlFor="ev-phone">Mobile number</label>
                    <div className="ev-phone">
                      <span aria-hidden="true">+91</span>
                      <input
                        id="ev-phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder="98765 43210"
                        value={form.phone}
                        onChange={update("phone")}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? "ev-phone-error" : undefined}
                      />
                    </div>
                    {errors.phone && (
                      <p className="ev-error" id="ev-phone-error">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="ev-field">
                    <label htmlFor="ev-email">Email</label>
                    <input
                      id="ev-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "ev-email-hint ev-email-error" : "ev-email-hint"}
                    />
                    <p className="ev-hint" id="ev-email-hint">
                      We send the Google Meet link here.
                    </p>
                    {errors.email && (
                      <p className="ev-error" id="ev-email-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <fieldset className="ev-field" aria-describedby={errors.level ? "ev-level-error" : undefined}>
                    <legend>Your German level</legend>
                    <div className="ev-levels">
                      {LEVELS.map((level, index) => (
                        <label key={level} className={`ev-level${form.level === level ? " is-on" : ""}`}>
                          <input
                            id={index === 0 ? "ev-level" : undefined}
                            type="radio"
                            name="level"
                            value={level}
                            checked={form.level === level}
                            onChange={update("level")}
                          />
                          {level}
                        </label>
                      ))}
                    </div>
                    {errors.level && (
                      <p className="ev-error" id="ev-level-error">
                        {errors.level}
                      </p>
                    )}
                  </fieldset>

                  {/* Hidden from people; bots fill it in. */}
                  <input
                    className="ev-trap"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={form.website}
                    onChange={update("website")}
                  />

                  <button type="submit" className="btn btn-gold ev-submit" disabled={sending}>
                    {sending ? "Reserving…" : "Reserve my free seat"}
                    {!sending && <Icon name="arrow-right" size={16} />}
                  </button>
                  {failure && (
                    <p className="ev-failure" role="alert">
                      {failure} Or call us on <a href={phone.href}>{phone.label}</a>.
                    </p>
                  )}
                  <p className="ev-note">
                    <Icon name="envelope-simple" size={13} />
                    Free. We’ll email you the Google Meet link.
                  </p>
                </form>
              )}
            </aside>

            <div className="ev-details">
              <section className="ev-section" aria-labelledby="ev-about-title">
                <h2 id="ev-about-title">About the demo</h2>
                <ul className="ev-points">
                  {event.highlights.map((point) => (
                    <li key={point.label}>
                      <span className="ev-icon" aria-hidden="true">
                        <Icon name={point.icon} size={19} />
                      </span>
                      {point.label}
                    </li>
                  ))}
                </ul>
              </section>

            </div>
          </div>

          <FaqNext
            items={eventFaqs}
            icons={["gift", "translate", "device-mobile", "calendar-check", "path"]}
            title="Questions before you join"
            intro="Quick answers about the free demo."
            call={{ href: phone.href, label: "Talk to a counsellor" }}
          />
        </main>

        {/* Phones: the next session and the button stay in reach until the
            registration card is on screen. */}
        <div className={`ev-bar${showBar ? " is-shown" : ""}`} aria-hidden={!showBar}>
          <span className="ev-bar-text">
            <strong>Free live demo</strong>
            <small>{info ? `${dayLabel(info)} · ${info.at}` : scheduleTime(event.schedule)}</small>
          </span>
          <a className="btn btn-gold" href="#register" tabIndex={showBar ? 0 : -1} onClick={goToForm}>
            Reserve my seat
          </a>
        </div>

        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
