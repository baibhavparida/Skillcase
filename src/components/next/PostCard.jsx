import ResponsiveImage from "../ResponsiveImage.jsx";

// A blog guide on the variant pages: photo, category, title, a short excerpt,
// then the date and read time. The title's link covers the whole card, so the
// card is one tap target and everything that looks clickable is. `featured`
// lays it out wide on larger screens.
export const postHref = (post) => `/blog-next/${post.slug}/`;

export default function PostCard({ post, featured = false, headingLevel = "h2", sizes }) {
  const Title = headingLevel;
  return (
    <article className={`bx-post${featured ? " is-featured" : ""}`}>
      <div className="bx-post-media">
        <ResponsiveImage src={post.image} alt="" sizes={sizes} loading={featured ? "eager" : "lazy"} />
      </div>
      <div className="bx-post-body">
        <p className="bx-post-kicker">{post.category}</p>
        <Title className="bx-post-title">
          <a href={postHref(post)}>{post.title}</a>
        </Title>
        <p className="bx-post-excerpt">{post.excerpt}</p>
        <p className="bx-post-meta">
          <time dateTime={post.datetime}>{post.date}</time>
          <span aria-hidden="true">·</span>
          {post.readTime}
        </p>
      </div>
    </article>
  );
}
