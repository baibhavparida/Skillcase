import BaseLayout from "../../layouts/BaseLayout.jsx";
import ArticleContents from "../../components/ArticleContents.jsx";
import ResponsiveImage from "../../components/ResponsiveImage.jsx";
import SiteFooter from "../../components/SiteFooter.jsx";
import SiteHeader from "../../components/SiteHeader.jsx";
import Icon from "../../components/healthcare/Icon.jsx";
import FinalCta from "../../components/next/FinalCta.jsx";
import PostCard from "../../components/next/PostCard.jsx";
import { Heading, variantLinks } from "../../components/next/shared.jsx";
import { blogPosts } from "../../data/siteContent";
import { formatInline } from "../../utils/text";
import "../../styles/home.css";
import "../../styles/home-next.css";
import "../../styles/pages-next.css";

// A blog guide in the homepage variant's style, for comparison (noindex). The
// article body and its "On this page" list are the live article page's (same
// markup, so site.js highlights the section being read); the header, related
// guides and closing band are the variant's.

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function BlogArticleNext({ post }) {
  const related = blogPosts.filter((item) => item.slug !== post.slug);
  const blocks = post.content.map((block, index) =>
    block.type === "heading" || block.type === "subheading"
      ? { ...block, id: `${slugify(block.text)}-${index}` }
      : block,
  );
  const tocItems = blocks.filter((block) => block.type === "heading" || block.type === "subheading");
  // Most guides open with their excerpt; don't print it twice.
  const opensWithExcerpt = post.content[0]?.text?.startsWith(post.excerpt.slice(0, 80));

  return (
    <BaseLayout title={`${post.title} | Skillcase Blog`} description={post.excerpt} robots="noindex" font="manrope">
      <div className="site-shell home-page home-next bx-page">
        <SiteHeader active="blog" links={variantLinks} />
        <main>
          <article className="bx-article">
            <header className="section bx-article-head">
              <a className="bx-back" href="/blog-next/">
                <Icon name="arrow-left" size={14} />
                All guides
              </a>
              <div className="bx-article-intro">
                <div>
                  <p className="eyebrow">{post.category}</p>
                  <h1>{post.title}</h1>
                  {!opensWithExcerpt && <p className="bx-lede">{post.excerpt}</p>}
                  <p className="bx-post-meta">
                    <span>{post.author}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.datetime}>{post.date}</time>
                    <span aria-hidden="true">·</span>
                    {post.readTime}
                  </p>
                </div>
                <div className="bx-article-image">
                  <ResponsiveImage
                    src={post.image}
                    alt={post.imageAlt}
                    loading="eager"
                    sizes="(max-width: 899px) calc(100vw - 32px), 520px"
                  />
                </div>
              </div>
            </header>

            <div className="article-layout bx-article-layout">
              <ArticleContents items={tocItems} pathwayHref="/home-next/#jobs" />
              <div className="article-content">
                {blocks.map((block, index) => {
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
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index} dangerouslySetInnerHTML={{ __html: formatInline(block.text) }} />;
                })}
              </div>
            </div>
          </article>

          <section className="section bx-related" aria-labelledby="bx-related-title">
            <Heading id="bx-related-title" eyebrow="More guides" title="Keep exploring the Germany pathway" />
            <div className="bx-grid">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} headingLevel="h3" sizes="(max-width: 899px) 120px, 560px" />
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
