import { useEffect, useState } from "react";

// Auto-advances through `count` items until the visitor takes over.
// Hovering or focusing holds the rotation; choosing an item stops it.
// Visitors who prefer reduced motion never get auto-advance.
export default function useRotation(count, delay = 4500) {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [held, setHeld] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const rotating = !stopped && !held && !reducedMotion;

  useEffect(() => {
    if (!rotating) return undefined;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % count), delay);
    return () => window.clearTimeout(timer);
  }, [active, rotating, count, delay]);

  const choose = (index) => {
    setActive(index);
    setStopped(true);
  };

  const holdProps = {
    onMouseEnter: () => setHeld(true),
    onMouseLeave: () => setHeld(false),
    onFocus: () => setHeld(true),
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
    },
  };

  return { active, choose, rotating, stopped, holdProps, delay };
}

// Roving-focus keyboard support for a row of role="tab" buttons.
export function tabKeyHandler(index, count, choose) {
  return (event) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next;
    if (event.key in keys) next = (index + keys[event.key] + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    choose(next);
    event.currentTarget.parentElement?.children[next]?.focus();
  };
}
