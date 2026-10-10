import HomeLegacy from "./home-legacy.jsx";
import PlacedHero from "../components/PlacedHero.jsx";
import "../styles/home.css";

// The live homepage (formerly preview "Option 4"): the previous homepage's
// content with the hero imagery replaced by a moving row of healthcare
// professionals working across Germany, the blue services band under the hero
// removed, full-width phone CTAs and realistic photography chosen for
// conversion. The previous homepage stays available at /home-legacy.
const images = {
  earnings: {
    src: "/assets/images/o4-benefit-contract.webp",
    alt: "Indian nurse shaking hands with a hospital HR manager after signing her German job contract",
  },
  family: {
    src: "/assets/images/o4-benefit-reunion.webp",
    alt: "Indian family reunited with hugs at an airport in Germany",
  },
  education: {
    src: "/assets/images/o4-benefit-school.webp",
    alt: "Indian mother adjusting her daughter’s school bag outside a primary school in Germany",
  },
  residency: {
    src: "/assets/images/o4-benefit-home.webp",
    alt: "Indian family smiling with the keys to their new home in Germany",
  },
  webinar: {
    src: "/assets/images/o4-webinar.webp",
    alt: "Three Indian nurses joining a Skillcase webinar on a laptop at home",
  },
  blogGuide: {
    src: "/assets/images/o4-blog-guide.webp",
    alt: "Indian nursing graduate studying German with a grammar book and flashcards",
  },
  blogSalary: {
    src: "/assets/images/o4-blog-salary.webp",
    alt: "Indian nurse smiling at her phone in a café in a German old town",
  },
  blogDoctor: {
    src: "/assets/images/o4-blog-doctor.webp",
    alt: "Indian doctor arriving at a German railway station with his suitcase",
  },
  jobNurse: { src: "/assets/images/o4-job-nurse.webp" },
  jobTrainee: { src: "/assets/images/o4-job-trainee.webp" },
};

export default function Home({ isPrimaryHome = false }) {
  return (
    <HomeLegacy
      isPrimaryHome={isPrimaryHome}
      hero={<PlacedHero />}
      showOfferStrip={false}
      shellClassName="home-page"
      images={images}
    />
  );
}
