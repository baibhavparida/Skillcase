import { blogPosts } from "./data/siteContent.js";

// Keep normal links and page loads, including direct visits to nested URLs.
// Each route imports only its own React components and CSS.
const pages = {
  "/": {
    source: "src/pages/home-legacy.jsx",
    load: () => import("./pages/home-legacy.jsx"),
    props: { isPrimaryHome: true },
  },
  "/about": {
    source: "src/pages/about.jsx",
    load: () => import("./pages/about.jsx"),
  },
  "/blog": {
    source: "src/pages/blog.jsx",
    load: () => import("./pages/blog.jsx"),
  },
  "/signup": {
    source: "src/pages/signup.jsx",
    load: () => import("./pages/signup.jsx"),
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
  "/home-legacy": {
    source: "src/pages/home-legacy.jsx",
    load: () => import("./pages/home-legacy.jsx"),
  },
};

for (const post of blogPosts) {
  pages[`/blog/${post.slug}`] = {
    source: "src/pages/blog/[slug].jsx",
    load: () => import("./pages/blog/[slug].jsx"),
    props: { post },
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
