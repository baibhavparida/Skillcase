import { events } from "./data/events.js";
import { blogPosts } from "./data/siteContent.js";

// Keep normal links and page loads, including direct visits to nested URLs.
// Each route imports only its own React components and CSS.
// The main pages (/, /start-now, /about, /blog and its guides) are the
// redesign built as /home-next and friends, live since 2026-10-28. The
// designs they replaced are kept (noindex) at -classic URLs in case they are
// needed again; the old -next preview links redirect (public/_redirects).
const pages = {
  "/": {
    source: "src/pages/home-next.jsx",
    load: () => import("./pages/home-next.jsx"),
  },
  "/about": {
    source: "src/pages/about-next.jsx",
    load: () => import("./pages/about-next.jsx"),
  },
  "/blog": {
    source: "src/pages/blog-next.jsx",
    load: () => import("./pages/blog-next.jsx"),
  },
  "/signup": {
    source: "src/pages/signup.jsx",
    load: () => import("./pages/signup.jsx"),
  },
  // Redesign of learner.skillcase.in/start-now, the trust page before the
  // program picker.
  "/start-now": {
    source: "src/pages/start-now-next.jsx",
    load: () => import("./pages/start-now-next.jsx"),
  },
  // The program picker the Learner Stories page leads to (replaces the
  // learner site's cart; payment goes through the Worker to Razorpay).
  "/start-now/cart": {
    source: "src/pages/start-now-cart.jsx",
    load: () => import("./pages/start-now-cart.jsx"),
  },
  "/privacy-policy": {
    source: "src/pages/privacy-policy.jsx",
    load: () => import("./pages/privacy-policy.jsx"),
  },
  "/terms-and-condition": {
    source: "src/pages/terms-and-condition.jsx",
    load: () => import("./pages/terms-and-condition.jsx"),
  },
  "/terms-and-conditions": {
    source: "src/pages/terms-and-conditions.jsx",
    load: () => import("./pages/terms-and-conditions.jsx"),
  },
  "/blog-view": {
    source: "src/pages/blog-view.jsx",
    load: () => import("./pages/blog-view.jsx"),
  },
  "/home-b": {
    source: "src/pages/home-b.jsx",
    load: () => import("./pages/home-b.jsx"),
  },
  // The homepage before the healthcare-wide one, kept (noindex).
  "/home-legacy": {
    source: "src/pages/home-legacy.jsx",
    load: () => import("./pages/home-legacy.jsx"),
  },
  // The designs live until 2026-10-28, kept (noindex).
  "/home-classic": {
    source: "src/pages/home.jsx",
    load: () => import("./pages/home.jsx"),
  },
  "/start-now-classic": {
    source: "src/pages/start-now.jsx",
    load: () => import("./pages/start-now.jsx"),
    props: { robots: "noindex" },
  },
  "/about-classic": {
    source: "src/pages/about.jsx",
    load: () => import("./pages/about.jsx"),
    props: { robots: "noindex" },
  },
  "/blog-classic": {
    source: "src/pages/blog.jsx",
    load: () => import("./pages/blog.jsx"),
    props: { robots: "noindex" },
  },
  // Broadened healthcare homepage options, previewed side by side (noindex).
  "/option-1": {
    source: "src/pages/option-1.jsx",
    load: () => import("./pages/option-1.jsx"),
  },
  "/option-2": {
    source: "src/pages/option-2.jsx",
    load: () => import("./pages/option-2.jsx"),
  },
  "/option-3": {
    source: "src/pages/option-3.jsx",
    load: () => import("./pages/option-3.jsx"),
  },
};

for (const post of blogPosts) {
  pages[`/blog/${post.slug}`] = {
    source: "src/pages/blog-next/[slug].jsx",
    load: () => import("./pages/blog-next/[slug].jsx"),
    props: { post },
  };
  pages[`/blog-classic/${post.slug}`] = {
    source: "src/pages/blog/[slug].jsx",
    load: () => import("./pages/blog/[slug].jsx"),
    props: { post, robots: "noindex" },
  };
}

// Free live demos, rebuilt from the learner site's event pages at the same
// /events/<slug> paths; registration goes through the Worker.
for (const event of events) {
  pages[`/events/${event.slug}`] = {
    source: "src/pages/event.jsx",
    load: () => import("./pages/event.jsx"),
    props: { event },
  };
}

export const routePaths = Object.keys(pages);

export async function resolveRoute(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const route = pages[path];
  if (!route) {
    const module = await import("./pages/not-found.jsx");
    return {
      Page: module.default,
      props: {},
      source: "src/pages/not-found.jsx",
      status: 404,
      sharedScript: true,
    };
  }
  const module = await route.load();
  return {
    Page: module.default,
    initPage: module.initPage,
    props: route.props || {},
    source: route.source,
    status: 200,
    sharedScript: route.source !== "src/pages/home-b.jsx",
  };
}
