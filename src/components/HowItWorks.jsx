import "../styles/how-it-works.css";
import ResponsiveImage from "./ResponsiveImage.jsx";
import Icon from "./healthcare/Icon.jsx";

// Four steps from sign-up to starting work, told as a photo journey: at home
// in India, learning German, interviewing, then arriving in Germany. Each
// step maps to a service Skillcase offers.
const steps = [
  {
    title: "Create your profile",
    copy: "An advisor matches you to roles.",
    image: "/assets/images/hiw-profile.webp",
    alt: "Young Indian nursing graduate filling in her profile on her phone at home",
  },
  {
    title: "Learn German",
    copy: "Live classes from A1 to B2.",
    image: "/assets/images/hiw-german.webp",
    alt: "Indian learner with headphones in a live online German class on his laptop",
  },
  {
    title: "Get your job offer",
    copy: "Interview prep and employer matching.",
    image: "/assets/images/hiw-interview.webp",
    alt: "Indian healthcare professional smiling during a video job interview",
  },
  {
    title: "Move to Germany",
    copy: "Visa, relocation and family support.",
    image: "/assets/images/hiw-arrival.webp",
    alt: "Indian woman with her suitcase on an old-town street after arriving in Germany",
  },
];

export default function HowItWorks() {
  return (
    <section className="section hiw-section" aria-labelledby="hiw-title">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2 id="hiw-title">4 steps to your job in Germany</h2>
      </div>
      <ol className="hiw-steps">
        {steps.map((step, index) => (
          <li className="hiw-step" key={step.title}>
            <div className="hiw-visual">
              <ResponsiveImage
                className="hiw-photo"
                src={step.image}
                alt={step.alt}
                sizes="(max-width: 899px) 96px, 168px"
              />
              <span className="hiw-number" aria-hidden="true">
                {index + 1}
              </span>
            </div>
            <div className="hiw-text">
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
            {index === steps.length - 2 && (
              <span className="hiw-plane" aria-hidden="true">
                <Icon name="airplane" size={13} weight="fill" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <div className="hiw-actions">
        <a className="btn btn-gold" href="/signup/">
          Create your profile
          <span data-icon="arrow-right" data-size="16" aria-hidden="true"></span>
        </a>
        <span className="hiw-note">
          <span data-icon="check-circle-2" data-size="14" aria-hidden="true"></span>
          No recruitment fees
        </span>
      </div>
    </section>
  );
}
