import { useEffect, useState } from "react";
import Icon from "../healthcare/Icon.jsx";

// "In this guide": the article's sections, numbered. Phones get one row that
// opens into the list (and closes again once you pick a section); wide
// screens get the list in a sticky rail beside the text. Both mark the
// section you're reading.
export default function GuideContents({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return undefined;
    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        });
        if (visible.size) setActive([...visible.entries()].sort((a, b) => a[1] - b[1])[0][0]);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const list = (onPick) => (
    <ol className="bx-toc-list">
      {items.map((item, index) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={item.id === active ? "is-active" : undefined}
            aria-current={item.id === active ? "location" : undefined}
            onClick={onPick}
          >
            <span className="bx-toc-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="bx-toc-row" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
        <summary>
          <Icon name="list-numbers" size={16} />
          <span className="bx-toc-label">In this guide</span>
          <span className="bx-toc-count">{items.length} sections</span>
          <Icon name="caret-down" size={14} className="bx-toc-caret" />
        </summary>
        <nav aria-label="In this guide">{list(() => setOpen(false))}</nav>
      </details>

      <aside className="bx-toc-rail">
        <nav aria-label="In this guide">
          <p className="bx-toc-label">In this guide</p>
          {list()}
        </nav>
      </aside>
    </>
  );
}
