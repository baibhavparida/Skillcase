import "../styles/how-it-works.css";

// Four plain steps from sign-up to starting work, so visitors know what
// happens after they apply. Each step maps to a service Skillcase offers.
const steps = [
  {
    title: "Create your profile",
    copy: "Share your qualification and experience. An advisor checks which roles in Germany suit you.",
  },
  {
    title: "Learn German",
    copy: "Go from A1 to B2 with live online classes, exam prep and the Skillcase app.",
  },
  {
    title: "Interview and get your offer",
    copy: "Practise interviews, have your documents reviewed and get matched with employers in Germany.",
  },
  {
    title: "Move to Germany",
    copy: "Get support with your visa and relocation, and with bringing your family.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section hiw-section" aria-labelledby="hiw-title">
      <div className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2 id="hiw-title">From your first German class to your first shift</h2>
      </div>
      <ol className="hiw-steps">
        {steps.map((step, index) => (
          <li className="hiw-step" key={step.title}>
            <span className="hiw-number" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
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
