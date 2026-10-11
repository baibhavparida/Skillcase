import { useRef, useState } from "react";

// On phones, several start-now sections are swipeable rows with dots below
// (the same pattern as the homepage's "How it works"). useSnapRow tracks the
// card in view; RowDots shows it and scrolls to a card when tapped. From
// tablet width up the rows become grids and CSS hides the dots.
export function useSnapRow(count) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const stepWidth = (list) =>
    list.firstElementChild.getBoundingClientRect().width +
    (Number.parseFloat(getComputedStyle(list).columnGap) || 0);

  const onScroll = () => {
    const list = ref.current;
    if (!list?.firstElementChild) return;
    // The last card can't snap to the start of the row, so treat the end of
    // the scroll range as the last card.
    const atEnd = list.scrollLeft >= list.scrollWidth - list.clientWidth - 2;
    const index = atEnd ? count - 1 : Math.round(list.scrollLeft / stepWidth(list));
    setActive(Math.min(count - 1, Math.max(0, index)));
  };

  const goTo = (index) => {
    const list = ref.current;
    if (!list?.firstElementChild) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: index * stepWidth(list), behavior: reduceMotion ? "auto" : "smooth" });
  };

  return { ref, active, onScroll, goTo };
}

export function RowDots({ row, labels }) {
  return (
    <div className="sn-dots">
      {labels.map((label, index) => (
        <button
          key={label}
          type="button"
          className={index === row.active ? "is-active" : undefined}
          aria-label={label}
          aria-current={index === row.active ? "true" : undefined}
          onClick={() => row.goTo(index)}
        />
      ))}
    </div>
  );
}
