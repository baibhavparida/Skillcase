import ResponsiveImage from "../ResponsiveImage.jsx";
import Icon from "../healthcare/Icon.jsx";

// A blog guide on the blog pages, in one format everywhere: photo,
// category, title, a two-line excerpt, then the date and read time. The
// title's link covers the whole card, so the card is one tap target and
// everything that looks clickable is. `featured` is the newest guide: a
// "Latest guide" label on the photo, a "Read the guide" cue, and on wide
// screens the photo beside the words.
export const postHref = (post) => `/blog/${post.slug}/`;

export function PostMeta({ post, byline = false }) {
  return (
    <p className={`bx-meta${byline ? " has-byline" : ""}`}>
      {byline && (
        <>
          <span className="bx-meta-avatar" aria-hidden="true">
            S
          </span>
          <span className="bx-meta-author">{post.author} team</span>
          <span aria-hidden="true">·</span>
        </>
      )}
      <time dateTime={post.datetime}>{post.date}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readTime}</span>
    </p>
  );
}

export default function PostCard({ post, featured = false, headingLevel = "h2", sizes }) {
  const Title = headingLevel;
  return (
    <article className={`bx-post${featured ? " is-featured" : ""}`}>
      <div className="bx-post-media">
        <ResponsiveImage src={post.image} alt="" sizes={sizes} loading={featured ? "eager" : "lazy"} />
        {featured && <span className="bx-post-badge">Latest guide</span>}
      </div>
      <div className="bx-post-body">
        <p className="bx-post-kicker">{post.category}</p>
        <Title className="bx-post-title">
          <a href={postHref(post)}>{post.title}</a>
        </Title>
        <p className="bx-post-excerpt">{post.excerpt}</p>
        <PostMeta post={post} />
        {featured && (
          <span className="bx-post-more" aria-hidden="true">
            Read the guide <Icon name="arrow-right" size={14} />
          </span>
        )}
      </div>
    </article>
  );
}
