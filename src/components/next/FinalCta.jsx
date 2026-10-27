import Icon from "../healthcare/Icon.jsx";

// Closing call to action: a navy band with two real screens of the Skillcase
// app in phones tilted in 3D, the front one overlapping the back one and both
// running off the band's bottom edge (after SmoothUI's and Watermelon's CTA
// blocks). The app screens are real; keep them real. `screens` is [back,
// front]; each page puts the screen closest to its message in front.
const defaultScreens = [
  "/assets/images/app-screens/guided-german-pathway.webp",
  "/assets/images/app-screens/job-application-progress.webp",
];

// Defaults are the homepage's; the Learner Stories variant passes its own.
export default function FinalCta({
  eyebrow = "Your next step",
  title = "Ready to start your move to Germany?",
  copy = "Create your profile in a few minutes. An advisor will suggest the roles that fit you.",
  action = { href: "/signup/", label: "Create your profile" },
  call = { href: "tel:+919731462667", label: "Talk to an advisor" },
  screens = defaultScreens,
}) {
  return (
    <section className="section nx-cta" aria-labelledby="nx-cta-title">
      <div className="nx-cta-band">
        <div className="nx-cta-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="nx-cta-title">{title}</h2>
          <p>{copy}</p>
          <div className="nx-cta-actions">
            <a className="btn btn-gold" href={action.href}>
              {action.label}
              <Icon name="arrow-right" size={15} />
            </a>
            <a className="nx-cta-call" href={call.href}>
              <Icon name="phone" size={15} />
              {call.label}
            </a>
          </div>
        </div>
        <div className="nx-cta-phones" aria-hidden="true">
          {screens.map((src) => (
            <div className="nx-cta-phone" key={src}>
              <img src={src} alt="" width="563" height="1266" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
