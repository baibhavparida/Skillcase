import { useEffect, useRef, useState } from "react";
import "../styles/healthcare-options.css";
import BaseLayout from "../layouts/BaseLayout.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import LearnerMarquee from "../components/LearnerMarquee.jsx";
import CandidateStories from "../components/CandidateStories.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import Icon from "../components/healthcare/Icon.jsx";
import useRotation, { tabKeyHandler } from "../components/healthcare/useRotation.js";
import {
  BenefitsSection,
  BlogsSection,
  FaqSection,
  PodcastSection,
  WebinarSection,
} from "../components/healthcare/SharedSections.jsx";
import { ausbildung, professions, signupHref } from "../data/professions.js";

// Option 3, "Speak medical German": language-first. The hero pairs real
// clinical scenes with the German each profession uses on the job, and the
// page leads with profession-specific German tracks before jobs.

function useGermanSpeech() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    return () => window.speechSynthesis?.cancel();
  }, []);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    const voice = synth.getVoices().find((item) => item.lang?.toLowerCase().startsWith("de"));
    if (voice) utterance.voice = voice;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utterance);
  };

  return { supported, speaking, speak };
}

function PhraseHero() {
  const { active, choose, rotating, stopped, holdProps, delay } = useRotation(professions.length, 5200);
  const { supported, speaking, speak } = useGermanSpeech();
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const role = professions[active];

  useEffect(() => {
    const timer = window.setTimeout(
      () => setLoaded(new Set(professions.map((_, index) => index))),
      1500,
    );
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoaded((current) => (current.has(active) ? current : new Set(current).add(active)));
  }, [active]);

  return (
    <section className="hc3-hero" aria-labelledby="hc3-title">
      <div className="hc3-hero-inner">
        <div className="hc3-copy">
          <p className="hc3-kicker">
            <Icon name="translate" size={15} />
            Medical German and jobs in Germany
          </p>
          <h1 id="hc3-title">
            Speak <em>medical German.</em> Work in Germany.
          </h1>
          <p className="hc3-lede">
            Profession-specific German, exam preparation and job placement for nurses, doctors,
            physiotherapists and medical technologists.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#tracks">
              Find my German track
              <Icon name="arrow-down" size={16} />
            </a>
            <a
              className="btn btn-outline hero-app-cta"
              href="https://play.google.com/store/apps/details?id=com.skillcase.app&hl=en_IN"
              rel="noreferrer"
              target="_blank"
            >
              <img src="/assets/images/google-play-mark.svg" alt="" aria-hidden="true" />
              Try the app free
            </a>
          </div>
          <ul className="hc3-proof" aria-label="Why Skillcase">
            <li>
              <Icon name="check" size={14} />
              A1 to C1
            </li>
            <li>
              <Icon name="check" size={14} />
              Live online classes
            </li>
            <li>
              <Icon name="check" size={14} />
              No recruitment fees
            </li>
          </ul>
        </div>

        <div className="hc3-stage" {...holdProps}>
          <div className="hc3-photo">
            {professions.map(
              (item, index) =>
                loaded.has(index) && (
                  <ResponsiveImage
                    key={item.key}
                    className={index === active ? "is-active" : undefined}
                    src={item.scene}
                    alt={index === active ? item.sceneAlt : ""}
                    aria-hidden={index === active ? undefined : "true"}
                    loading="eager"
                    fetchPriority={index === 0 ? "high" : undefined}
                    sizes="(max-width: 760px) 100vw, 640px"
                  />
                ),
            )}
          </div>

          <figure className="hc3-phrase" aria-live={stopped ? "polite" : "off"}>
            <div className="hc3-phrase-top">
              <span className="hc3-phrase-role">
                <Icon name={role.icon} size={14} />
                {role.title}
              </span>
              {supported && (
                <button
                  className={`hc3-listen${speaking ? " is-speaking" : ""}`}
                  type="button"
                  onClick={() => {
                    choose(active);
                    speak(role.phrase.de);
                  }}
                  aria-label={`Hear “${role.phrase.de}” spoken in German`}
                >
                  <Icon name={speaking ? "waveform" : "speaker-high"} size={15} />
                  Hear it
                </button>
              )}
            </div>
            <blockquote lang="de" key={role.key}>
              {role.phrase.de}
            </blockquote>
            <figcaption>{role.phrase.en}</figcaption>
          </figure>

          <div className="hc3-scene-tabs" role="tablist" aria-label="Choose a profession">
            {professions.map((item, index) => (
              <button
                key={item.key}
                className="hc3-scene-tab"
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={item.title}
                title={item.title}
                tabIndex={index === active ? 0 : -1}
                onClick={() => choose(index)}
                onKeyDown={tabKeyHandler(index, professions.length, choose)}
              >
                <Icon name={item.icon} size={16} />
                {index === active && rotating && (
                  <span className="hc3-scene-progress" key={active} style={{ animationDuration: `${delay}ms` }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const levels = ["A1", "A2", "B1", "B2", "C1"];

function GermanTracks() {
  const [active, setActive] = useState(0);
  const role = professions[active];
  const target = levels.indexOf(role.languageTarget);

  return (
    <section className="section hc3-tracks" id="tracks" aria-labelledby="hc3-tracks-title">
      <div className="section-heading">
        <p className="eyebrow">Choose your German</p>
        <h2 id="hc3-tracks-title">German for the job you actually do</h2>
        <p>
          Every track starts at A1 and builds the vocabulary, conversations and exam your profession
          needs.
        </p>
      </div>

      <div className="hc3-tracks-shell">
        <div className="hc3-track-tabs" role="tablist" aria-label="German tracks by profession">
          {professions.map((item, index) => (
            <button
              key={item.key}
              id={`hc3-track-${item.key}`}
              className="hc3-track-tab"
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls="hc3-track-panel"
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={tabKeyHandler(index, professions.length, setActive)}
            >
              <Icon name={item.icon} size={18} />
              <span>
                <strong>{item.title}</strong>
                <small>Target {item.languageTarget}</small>
              </span>
            </button>
          ))}
        </div>

        <div
          className="hc3-track-panel"
          id="hc3-track-panel"
          role="tabpanel"
          aria-labelledby={`hc3-track-${role.key}`}
          key={role.key}
        >
          <div className="hc3-track-head">
            <div>
              <p lang="de">{role.germanTitle}</p>
              <h3>{role.title} track</h3>
            </div>
            <a className="btn btn-gold" href={signupHref(role.key)}>
              Start the {role.singular} track
            </a>
          </div>

          <ol className="hc3-levels" aria-label={`Level path: A1 to ${role.languageTarget}`}>
            {levels.map((level, index) => (
              <li
                key={level}
                className={index < target ? "is-done" : index === target ? "is-target" : "is-beyond"}
              >
                <span>{level}</span>
                {index === target && <small>Your target</small>}
              </li>
            ))}
          </ol>

          <div className="hc3-track-details">
            <div>
              <h4>You’ll practise</h4>
              <ul>
                {role.practise.map((item) => (
                  <li key={item}>
                    <Icon name="chat-circle-text" size={15} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Exam to aim for</h4>
              <p>{role.exam}</p>
              <h4>Then</h4>
              <p>{role.route}</p>
            </div>
            <div className="hc3-track-phrase">
              <h4>Sounds like</h4>
              <p lang="de">“{role.phrase.de}”</p>
              <small>{role.phrase.en}</small>
            </div>
          </div>

          <a className="btn btn-gold hc3-track-cta-bottom" href={signupHref(role.key)}>
            Start the {role.singular} track
          </a>
        </div>
      </div>
    </section>
  );
}

const roleCards = [...professions, ausbildung];

function RoleStrip() {
  const trackRef = useRef(null);
  const scroll = (direction) => {
    const track = trackRef.current;
    const card = track?.querySelector(".hc3-role-card");
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 16;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <section className="section hc3-roles" id="roles" aria-labelledby="hc3-roles-title">
      <div className="hc3-roles-head">
        <div className="section-heading">
          <p className="eyebrow">Jobs for every specialty</p>
          <h2 id="hc3-roles-title">Then put your German to work</h2>
          <p>Hospitals, rehab clinics and labs across Germany are hiring Indian healthcare professionals.</p>
        </div>
        <div className="hc3-roles-arrows">
          <button type="button" aria-label="Previous pathways" onClick={() => scroll(-1)}>
            <Icon name="arrow-left" size={17} />
          </button>
          <button type="button" aria-label="More pathways" onClick={() => scroll(1)}>
            <Icon name="arrow-right" size={17} />
          </button>
        </div>
      </div>
      <div className="hc3-role-track" ref={trackRef} role="region" tabIndex={0} aria-label="Pathways by profession">
        {roleCards.map((role) => (
          <article className="hc3-role-card" key={role.key}>
            <ResponsiveImage src={role.scene} alt={role.sceneAlt} sizes="(max-width: 760px) 80vw, 360px" />
            <div className="hc3-role-body">
              <p lang="de">{role.germanTitle}</p>
              <h3>{role.key === "ausbildung" ? "Students (Ausbildung)" : role.label}</h3>
              <span className="hc3-role-language">
                <Icon name="translate" size={14} />
                {role.language}
              </span>
              <a href={signupHref(role.key)}>
                Apply now
                <Icon name="arrow-right" size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function OptionThree() {
  return (
    <BaseLayout
      title="Skillcase | Medical German and Healthcare Jobs in Germany"
      description="Profession-specific medical German, exam preparation and job placement in Germany for Indian nurses, doctors, physiotherapists and medical technologists."
      robots="noindex"
    >
      <div className="site-shell hc-page">
        <SiteHeader active="home" />

        <main>
          <PhraseHero />
          <GermanTracks />
          <AppJourneyShowcase />
          <RoleStrip />
          <BenefitsSection pathwaysHref="#roles" />
          <CandidateStories
            title="Real learners. Real progress toward Germany."
            intro="Hear directly from Skillcase learners building their German and preparing for healthcare careers in Germany."
          />
          <LearnerMarquee />
          <WebinarSection />
          <BlogsSection />
          <PodcastSection />
          <FaqSection />
        </main>

        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
