import { useEffect, useState } from "react";

export default function ArticleContents({ items }) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 761px)");
    const update = () => setExpanded(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <aside className="article-aside article-toc" aria-label="Table of contents">
      <details
        open={expanded}
        onToggle={(event) => setExpanded(event.currentTarget.open)}
      >
        <summary>On this page</summary>
        <nav
          aria-label="Article sections"
          onClick={(event) => {
            if (
              event.target.closest("a") &&
              window.matchMedia("(max-width: 760px)").matches
            )
              setExpanded(false);
          }}
        >
          {items.map((item, index) => (
            <a
              key={item.id}
              className={[
                item.type === "subheading" && "is-subheading",
                index === 0 && "is-active",
              ]
                .filter(Boolean)
                .join(" ")}
              data-toc-link={item.id}
              href={`#${item.id}`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </details>
      <a className="article-pathway-link" href="/#jobs">
        Explore your pathway <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}
