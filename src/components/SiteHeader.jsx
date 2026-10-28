import { useEffect, useRef, useState } from "react";

export default function SiteHeader(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  const refreshBackdropOffset = () => {
    if (!headerRef.current) return;
    headerRef.current.style.setProperty(
      "--mobile-nav-backdrop-top",
      `${Math.ceil(headerRef.current.offsetHeight)}px`
    );
  };

  useEffect(() => {
    refreshBackdropOffset();
    const media = window.matchMedia("(min-width: 901px)");
    const closeOnResize = () => {
      if (media.matches) setMenuOpen(false);
    };
    const closeOnOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("resize", refreshBackdropOffset);
    media.addEventListener("change", closeOnResize);
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("resize", refreshBackdropOffset);
      media.removeEventListener("change", closeOnResize);
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);
  const { active = "home", revealCta = false } = props;

  // With revealCta (the homepage-style pages), the header's Get Started stays
  // tucked away on phones while the hero's own buttons are on screen, and
  // comes in once they scroll under the header. CSS limits it to phones.
  const [ctaTucked, setCtaTucked] = useState(revealCta);
  useEffect(() => {
    if (!revealCta) return undefined;
    const actions = document.querySelector("#top .hero-actions");
    if (!actions) {
      setCtaTucked(false);
      return undefined;
    }
    // A scroll check once per frame; WebKit's IntersectionObserver missed
    // this case. Tucked while the hero buttons are below the header's edge.
    let frame = 0;
    const check = () => {
      frame = 0;
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom || 0;
      setCtaTucked(actions.getBoundingClientRect().bottom > headerBottom);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [revealCta]);
  const navItems = [
    {
      href: "/#jobs",
      label: "Candidate",
      key: "candidate",
    },
    // Real learners, their videos and reviews (src/pages/start-now.jsx).
    {
      href: "/start-now/",
      label: "Learner Stories",
      key: "stories",
    },
    {
      href: "/about/",
      label: "About Us",
      key: "about",
    },
    {
      href: "/blog/",
      label: "Blog",
      key: "blog",
    },
    {
      href: "/#faq",
      label: "FAQ",
      key: "faq",
    },
  ];
  return (
    <>
      <header
        className={revealCta && ctaTucked ? "site-header is-cta-tucked" : "site-header"}
        ref={headerRef}
      >
        <a className="brand" href="/" aria-label="Skillcase home">
          <img
            alt="Skillcase"
            className="brand-logo"
            src="/assets/images/SKILLCASE_logo.svg"
          />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <a
              key={index}
              className={[active === item.key && "is-active"]
                .filter(Boolean)
                .join(" ")}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="btn btn-gold btn-sm nav-cta" href="/signup/">
            Get Started
          </a>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="mobile-menu-toggle"
            type="button"
            ref={toggleRef}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="hamburger-icon" aria-hidden="true">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
        <div
          aria-hidden="true"
          className="mobile-nav-backdrop"
          hidden={!menuOpen}
          onClick={() => setMenuOpen(false)}
        />
        <nav
          aria-label="Mobile navigation"
          className="mobile-nav-panel"
          hidden={!menuOpen}
          id="mobile-navigation"
          onClick={(event) => {
            if (event.target.closest("a")) setMenuOpen(false);
          }}
          onBlur={(event) => {
            if (!headerRef.current?.contains(event.relatedTarget))
              setMenuOpen(false);
          }}
        >
          <div className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a key={index} href={item.href}>
                {item.label}
                <span
                  data-icon="arrow-right"
                  data-size="14"
                  aria-hidden="true"
                ></span>
              </a>
            ))}
          </div>
          <div className="mobile-nav-actions">
            <a className="btn btn-gold btn-sm" href="/signup/">
              Get Started
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
