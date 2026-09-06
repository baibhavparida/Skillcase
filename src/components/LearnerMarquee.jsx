const learners = [
  {
    name: "Ruth Joseph",
    location: "Tamil Nadu",
    image: "/assets/images/learner-marquee/ruth-joseph.webp",
    width: 576,
    height: 653,
  },
  {
    name: "Modem Praveena",
    location: "Andhra Pradesh",
    image: "/assets/images/learner-marquee/modem-praveena.webp",
    width: 720,
    height: 960,
  },
  {
    name: "Sivaranjani P",
    location: "Tamil Nadu",
    image: "/assets/images/learner-marquee/sivaranjani-p.webp",
    width: 720,
    height: 923,
  },
  {
    name: "Sheila H. V.",
    location: "Karnataka",
    image: "/assets/images/learner-marquee/sheila-h-v.webp",
    width: 720,
    height: 933,
  },
  {
    name: "Pinak Saini",
    location: "Rajasthan",
    image: "/assets/images/learner-marquee/pinak-saini.webp",
    width: 200,
    height: 126,
  },
  {
    name: "Ganesh Akhade",
    location: "Maharashtra",
    image: "/assets/images/learner-marquee/ganesh-akhade.webp",
    width: 537,
    height: 504,
  },
];

function LearnerGroup({ duplicate = false }) {
  return (
    <div className="learner-marquee-group" aria-hidden={duplicate || undefined}>
      {learners.map((learner) => (
        <figure className="learner-marquee-card" key={learner.name}>
          <img
            src={learner.image}
            alt={
              duplicate
                ? ""
                : `${learner.name}, Skillcase learner from ${learner.location}`
            }
            width={learner.width}
            height={learner.height}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <strong>{learner.name}</strong>
            <span>{learner.location}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function LearnerMarquee() {
  return (
    <section
      className="learner-marquee-section"
      aria-labelledby="learner-marquee-title"
    >
      <div className="learner-marquee-heading">
        <p className="eyebrow">Skillcase community</p>
        <h2 id="learner-marquee-title">Meet our learners</h2>
      </div>
      <div className="learner-marquee-window">
        <div className="learner-marquee-track">
          <LearnerGroup />
          <LearnerGroup duplicate />
        </div>
      </div>
    </section>
  );
}
