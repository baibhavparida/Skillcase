import BaseLayout from "../layouts/BaseLayout.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import FinalCta from "../components/next/FinalCta.jsx";
import PostCard from "../components/next/PostCard.jsx";
import { blogPosts } from "../data/siteContent.js";
import "../styles/home.css";
import "../styles/home-next.css";
import "../styles/pages-next.css";

// The blog (served at /blog; the previous design is kept at /blog-classic),
// in the homepage's style: the title centred on top, the newest guide as a
// large card, the others below in the same card format, then the navy
// closing band, in Manrope. The previous blog's email sign-up is left out:
// it shows a thank-you but doesn't store the address anywhere.

export default function BlogNext() {
  const [featured, ...rest] = blogPosts;
  return (
    <BaseLayout
      title="Skillcase Blog | Healthcare Jobs in Germany"
      description="Read Skillcase guides on nursing jobs in Germany, salary expectations, documentation, relocation, and pathways for healthcare professionals."
      font="manrope"
    >
      <div className="site-shell home-page home-next bx-page">
        <SiteHeader active="blog" />
        <main>
          <section className="section bx-head" aria-labelledby="bx-title">
            <p className="eyebrow">Skillcase blog</p>
            <h1 id="bx-title">Guides for your healthcare career in Germany</h1>
          </section>

          <section className="section bx-featured" aria-label="Latest guide">
            <PostCard post={featured} featured sizes="(max-width: 899px) calc(100vw - 32px), 680px" />
          </section>

          <section className="section bx-more" aria-labelledby="bx-more-title">
            <h2 className="bx-section-title" id="bx-more-title">
              More guides
            </h2>
            <div className="bx-grid">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} headingLevel="h3" sizes="(max-width: 899px) calc(100vw - 32px), 560px" />
              ))}
            </div>
          </section>

          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </BaseLayout>
  );
}
