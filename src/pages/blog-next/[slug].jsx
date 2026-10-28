import { Fragment } from "react";
import BaseLayout from "../../layouts/BaseLayout.jsx";
import ResponsiveImage from "../../components/ResponsiveImage.jsx";
import SiteFooter from "../../components/SiteFooter.jsx";
import SiteHeader from "../../components/SiteHeader.jsx";
import Icon from "../../components/healthcare/Icon.jsx";
import FinalCta from "../../components/next/FinalCta.jsx";
import GuideContents from "../../components/next/GuideContents.jsx";
import PostCard, { PostMeta } from "../../components/next/PostCard.jsx";
import ShareGuide from "../../components/next/ShareGuide.jsx";
import { blogPosts } from "../../data/siteContent";
import { formatInline } from "../../utils/text";
import "../../styles/home.css";
import "../../styles/home-next.css";
import "../../styles/pages-next.css";

// A blog guide (served at /blog/<slug>; the previous design is kept at
// /blog-classic/<slug>), in the homepage's style. One reading column:
// breadcrumb, title, byline, what the guide covers, the photo, then the
// text in large dark type with bold section headings. "In this guide" opens
// from a row on phones and sits in a sticky rail on wide screens. Halfway
// through, one prompt to check eligibility; at the end, sharing, more
// guides and the navy closing band.

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function EligibilityPrompt() {
  return (
    <aside className="bx-prompt" aria-label="Check your eligibility">
      <div>
        <p className="bx-prompt-title">Not sure you qualify?</p>
        <p>Answer a few questions and see which roles in Germany fit your experience.</p>
      </div>
      <a className="btn btn-gold" href="/signup/">
        Check your eligibility
        <Icon name="arrow-right" size={16} />
      </a>
    </aside>
  );
}

function Block({ block, className }) {
  if (block.type === "heading") return <h2 id={block.id}>{block.text}</h2>;
  if (block.type === "subheading") return <h3 id={block.id}>{block.text}</h3>;
  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
        ))}
      </ul>
    );
  }
  return <p className={className} dangerouslySetInnerHTML={{ __html: formatInline(block.text) }} />;
}

export default function BlogArticleNext({ post }) {
  const related = blogPosts.filter((item) => item.slug !== post.slug);
  const blocks = post.content.map((block, index) =>
    block.type === "heading" || block.type === "subheading"
      ? { ...block, id: `${slugify(block.text)}-${index}` }
      : block,
  );
  const sections = blocks.filter((block) => block.type === "heading");
  // The prompt goes just before the middle section heading.
  const promptBefore = sections[Math.floor(sections.length / 2)]?.id;

  return (
    <BaseLayout title={`${post.title} | Skillcase Blog`} description={post.excerpt} font="manrope">
      <div className="site-shell home-page home-next bx-page">
        <SiteHeader active="blog" />
        <main>
          <article className="bx-read">
            <header className="bx-read-head">
              <nav className="bx-crumbs" aria-label="Breadcrumb">
                <a href="/blog/">Blog</a>
                <Icon name="caret-right" size={12} />
                <span>{post.category}</span>
              </nav>
              <h1>{post.title}</h1>
              <PostMeta post={post} byline />
              {post.highlights?.length > 0 && (
                <ul className="bx-covers" aria-label="This guide covers">
                  {post.highlights.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={13} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </header>

            <figure className="bx-read-image">
              <ResponsiveImage
                src={post.image}
                alt={post.imageAlt}
                loading="eager"
                sizes="(max-width: 799px) calc(100vw - 32px), 720px"
              />
            </figure>

            <GuideContents items={sections} />

            <div className="bx-prose">
              {blocks.map((block, index) => (
                <Fragment key={index}>
                  {block.id && block.id === promptBefore && <EligibilityPrompt />}
                  <Block block={block} className={index === 0 && block.type === "paragraph" ? "bx-intro" : undefined} />
                </Fragment>
              ))}
              <ShareGuide title={post.title} />
            </div>
          </article>

          <section className="section bx-more bx-related" aria-labelledby="bx-related-title">
            <h2 className="bx-section-title" id="bx-related-title">
              Keep reading
            </h2>
            <div className="bx-grid">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} headingLevel="h3" sizes="(max-width: 899px) calc(100vw - 32px), 560px" />
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
