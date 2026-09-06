import ResponsiveImage from "../components/ResponsiveImage.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import { blogPosts } from "../data/siteContent";
import BaseLayout from "../layouts/BaseLayout.jsx";
export default function Blog(props) {
  return (
    <>
      <BaseLayout
        title="Skillcase Blog | Healthcare Jobs in Germany"
        description="Read Skillcase guides on nursing jobs in Germany, salary expectations, documentation, relocation, and pathways for healthcare professionals."
      >
        <div className="site-shell">
          <SiteHeader active="blog" />
          <main className="page-main">
            <section className="page-hero blog-subscribe-hero page-hero-rich">
              <div className="page-hero-copy">
                <p className="eyebrow">Skillcase insights</p>
                <h1>Practical guides for healthcare careers in Germany.</h1>
                <p>
                  Clear, useful reads on salaries, eligibility, language
                  preparation, relocation, recognition, and long-term career
                  planning.
                </p>
                <div className="blog-topic-row" aria-label="Blog topics">
                  <span>
                    <span data-icon="stethoscope" data-size="14"></span>Nursing
                    jobs
                  </span>
                  <span>
                    <span data-icon="chart-line-up" data-size="14"></span>Salary
                    insights
                  </span>
                  <span>
                    <span data-icon="plane-takeoff" data-size="14"></span>
                    Relocation
                  </span>
                </div>
              </div>
              <form
                className="blog-subscribe-card"
                action="#"
                aria-label="Subscribe to Skillcase guides"
                data-subscribe-form=""
              >
                <span data-icon="mail" data-size="20"></span>
                <strong>Get Germany pathway updates</strong>
                <p>
                  Monthly Skillcase guidance on language prep, documents, jobs,
                  salaries, and relocation.
                </p>
                <label>
                  <span>Email address</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com…"
                    autoComplete="email"
                    required
                  />
                </label>
                <button className="btn btn-gold" type="submit">
                  Subscribe
                  <span data-icon="arrow-right" data-size="13"></span>
                </button>
                <small data-subscribe-status="">
                  No spam. Just practical candidate guidance.
                </small>
              </form>
            </section>

            <section className="section blog-list-section">
              <div className="blog-grid blog-page-grid">
                {blogPosts.map((post, index) => (
                  <article key={index} className="blog-card">
                    <a
                      className="blog-media"
                      href={`/blog/${post.slug}`}
                      aria-label={`Read ${post.title}`}
                    >
                      <ResponsiveImage
                        loading="lazy"
                        alt={post.imageAlt}
                        src={post.image}
                      />
                      <span className="blog-media-badge">{post.category}</span>
                    </a>
                    <div className="blog-card-body">
                      <div className="blog-meta">
                        <span>{post.author}</span>
                        <time dateTime={post.datetime}>{post.date}</time>
                      </div>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <a href={`/blog/${post.slug}`}>
                        Read more
                        <span data-icon="arrow-right" data-size="13"></span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </BaseLayout>
    </>
  );
}
