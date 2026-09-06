import { useEffect, useRef, useState } from "react";

export default function SiteHeader(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  useEffect(() => {
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
    media.addEventListener("change", closeOnResize);
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      media.removeEventListener("change", closeOnResize);
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);
  const { active = "home" } = props;
  const navItems = [
    {
      href: "/#jobs",
      label: "Candidate",
      key: "candidate",
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
      <header className="site-header" ref={headerRef}>
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
