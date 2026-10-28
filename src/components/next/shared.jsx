import { useEffect, useRef, useState } from "react";

// Small building blocks for the homepage variant (/home-next).

// True once the element has scrolled into view (or every time, with
// once = false). Without IntersectionObserver it reports true at once.
export function useInView({ threshold = 0.25, rootMargin = "0px", once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);
  return [ref, inView];
}

// "500000" -> "500,000". Written by hand so server and browser agree.
export function groupThousands(value) {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Counts up from 0 when scrolled into view. The page is rendered with the
// final number, so it reads correctly without JavaScript and for search.
// With Reduce Motion the count still runs, just more slowly.
export function CountUp({ to, suffix = "", prefix = "" }) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    // Below the fold: reset to 0 so the count can play when it arrives.
    const element = ref.current;
    if (element && element.getBoundingClientRect().top > window.innerHeight) setValue(0);
  }, [ref]);

  useEffect(() => {
    if (!inView || started.current) return undefined;
    started.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 2200 : 1400;
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(to * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} className="nx-count">
      {prefix}
      {groupThousands(value)}
      {suffix}
    </span>
  );
}

// Section heading with an eyebrow and a title.
export function Heading({ id, eyebrow, title, intro, align = "left" }) {
  return (
    <div className={`nx-heading nx-heading-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {intro && <p className="nx-heading-intro">{intro}</p>}
    </div>
  );
}
