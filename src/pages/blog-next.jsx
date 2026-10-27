import BaseLayout from "../layouts/BaseLayout.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import FinalCta from "../components/next/FinalCta.jsx";
import PostCard from "../components/next/PostCard.jsx";
import { variantLinks } from "../components/next/shared.jsx";
import { blogPosts } from "../data/siteContent.js";
import "../styles/home.css";
import "../styles/home-next.css";
import "../styles/pages-next.css";

// The blog in the homepage variant's style, for comparison (noindex): a short
// header, the newest guide featured, the others beside it, then the navy
// closing band, in Manrope. The live page's email sign-up is left out: it
// shows a thank-you but doesn't store the address anywhere.

export default function BlogNext() {
  const [featured, ...rest] = blogPosts;
  return (
    <BaseLayout
      title="Skillcase Blog | Healthcare Jobs in Germany"
      description="Read Skillcase guides on nursing jobs in Germany, salary expectations, documentation, relocation, and pathways for healthcare professionals."
      robots="noindex"
      font="manrope"
    >
      <div className="site-shell home-page home-next bx-page">
        <SiteHeader active="blog" links={variantLinks} />
        <main>
          <section className="section bx-head" aria-labelledby="bx-title">
            <p className="eyebrow">Skillcase insights</p>
            <h1 id="bx-title">Practical guides for healthcare careers in Germany</h1>
            <p className="bx-lede">
              Clear, useful reads on salaries, eligibility, language preparation, relocation,
              recognition, and long-term career planning.
            </p>
          </section>

          <section className="section bx-list" aria-label="Guides">
            <PostCard post={featured} featured sizes="(max-width: 899px) calc(100vw - 32px), 640px" />
            <div className="bx-grid">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} sizes="(max-width: 899px) 120px, 560px" />
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
