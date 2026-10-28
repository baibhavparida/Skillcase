import BaseLayout from "../layouts/BaseLayout.jsx";
import AppJourneyShowcase from "../components/AppJourneyShowcase.jsx";
import { BlogSection } from "../components/HomeSections.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import FaqNext from "../components/next/FaqNext.jsx";
import FinalCta from "../components/next/FinalCta.jsx";
import HeroSplit from "../components/next/HeroSplit.jsx";
import JourneyScroll from "../components/next/JourneyScroll.jsx";
import LearnersNext from "../components/next/LearnersNext.jsx";
import { PodcastNext, WebinarNext } from "../components/next/MediaNext.jsx";
import PayCalculator from "../components/next/PayCalculator.jsx";
import RoleStrips from "../components/next/RoleStrips.jsx";
import StoriesNext from "../components/next/StoriesNext.jsx";
import WhyGermany from "../components/next/WhyGermany.jsx";
import "../styles/home.css";
import "../styles/start-now.css";
import "../styles/home-next.css";

// The homepage (served at /; the previous one is kept at /home-classic).
// Hero: an orbit of role cards on desktop and a wheel of cards on phones,
// where the header's Get Started waits until the hero's buttons scroll away.
// Then "Why Germany" (a bento of figures and photos), role strips, a
// scroll-story "How it works", a pay calculator, our learners, learner
// stories with a review wall, the app, a webinar card, blogs, a tap-to-load
// podcast, the FAQ and a closing call to action, in Manrope. Patterns came
// from the owner's reference list and Mobbin, rebuilt in our own style.

export default function HomeNext() {
  return (
    <BaseLayout font="manrope">
      <div className="site-shell home-page home-next">
        <SiteHeader active="home" revealCta />
        <main>
          <HeroSplit />
          <WhyGermany />
          <RoleStrips />
          <JourneyScroll />
          <PayCalculator />
          <LearnersNext />
          <StoriesNext />
          <AppJourneyShowcase />
          <WebinarNext />
          <BlogSection />
          <PodcastNext />
          <FaqNext />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
