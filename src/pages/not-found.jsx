import BaseLayout from "../layouts/BaseLayout.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import SiteFooter from "../components/SiteFooter.jsx";

export default function NotFound() {
  return (
    <BaseLayout title="Page not found | Skillcase" robots="noindex">
      <div className="site-shell">
        <SiteHeader />
        <main className="page-main">
          <section className="page-hero">
            <p className="eyebrow">404</p>
            <h1>We couldn’t find that page.</h1>
            <p>Head back to Skillcase to explore your Germany pathway.</p>
            <a className="btn btn-gold" href="/">
              Back to home
            </a>
          </section>
        </main>
        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
