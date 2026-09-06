import ResponsiveImage from "../../components/ResponsiveImage.jsx";
import ArticleContents from "../../components/ArticleContents.jsx";
import SiteFooter from "../../components/SiteFooter.jsx";
import SiteHeader from "../../components/SiteHeader.jsx";
import { blogPosts } from "../../data/siteContent";
import BaseLayout from "../../layouts/BaseLayout.jsx";
import { formatInline } from "../../utils/text";
export default function BlogArticle(props) {
  const { post } = props;
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug);
  const slugify = (value) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  const articleBlocks = post.content.map((block, index) =>
    block.type === "heading" || block.type === "subheading"
      ? {
          ...block,
          id: `${slugify(block.text)}-${index}`,
        }
      : block,
  );
  const tocItems = articleBlocks.filter(
    (block) => block.type === "heading" || block.type === "subheading",
  );
  return (
    <>
      <BaseLayout
        title={`${post.title} | Skillcase Blog`}
        description={post.excerpt}
      >
        <div className="site-shell">
          <SiteHeader active="blog" />
          <main className="page-main">
            <article className="article-page">
              <header className="article-hero">
                <a className="article-back" href="/blog">
                  <span data-icon="arrow-left" data-size="14"></span>
                  Back to blogs
                </a>
                <div className="article-hero-grid article-hero-rich">
                  <div className="article-title-block">
                    <p className="eyebrow">{post.category}</p>
                    <h1>{post.title}</h1>
                    <p>{post.excerpt}</p>
                    <div className="article-meta">
                      <span>{post.author}</span>
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="article-image-card article-thumbnail-card">
                    <ResponsiveImage
                      alt={post.imageAlt}
                      src={post.image}
                      loading="eager"
                    />
                  </div>
                </div>
              </header>

              <div className="article-layout">
                <ArticleContents items={tocItems} />
                <div className="article-content">
                  {articleBlocks.map((block, index) => {
                    if (block.type === "heading") {
                      return (
                        <h2 key={index} data-toc-section="" id={block.id}>
                          {block.text}
                        </h2>
                      );
                    }
                    if (block.type === "subheading") {
                      return (
                        <h3 key={index} data-toc-section="" id={block.id}>
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={index}>
                          {block.items.map((item, index) => (
                            <li
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: formatInline(item),
                              }}
                            />
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: formatInline(block.text),
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </article>

            <section className="section related-section">
              <div className="section-heading">
                <p className="eyebrow">More guides</p>
                <h2>Keep exploring the Germany pathway</h2>
              </div>
              <div className="related-grid">
                {relatedPosts.map((item, index) => (
                  <a
                    key={index}
                    className="related-card"
                    href={`/blog/${item.slug}`}
                  >
                    <div className="related-media">
                      <ResponsiveImage
                        loading="lazy"
                        alt={item.imageAlt}
                        src={item.image}
                      />
                    </div>
                    <div className="related-card-copy">
                      <span>{item.category}</span>
                      <strong>{item.title}</strong>
                      <small>{item.readTime}</small>
                    </div>
                  </a>
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
