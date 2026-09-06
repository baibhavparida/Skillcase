import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import worker from "../src/worker.js";
import { blogPosts } from "../src/data/siteContent.js";

const routes = [
  "",
  "about",
  "blog",
  "signup",
  "privacy-policy",
  "terms-and-condition",
  "terms-and-conditions",
  "blog-view",
  "home-b",
  "home-legacy",
  ...blogPosts.map((post) => `blog/${post.slug}`),
];

test("every public URL has HTML, metadata, and local assets", async () => {
  for (const route of routes) {
    const html = await readFile(path.join("dist", route, "index.html"), "utf8");
    assert.match(html, /<title>[^<]+<\/title>/, route);
    assert.match(html, /<meta name="description"/, route);
    assert.match(html, /data-prerendered="true"/, route);
    assert.doesNotMatch(html, /astro-island|\/dashboard\//, route);
    if (!["blog-view", "terms-and-conditions"].includes(route))
      assert.match(html, /<h1\b/, route);
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
      if (/\.(?:js|css|svg|webp|png|jpg|jpeg|woff2?)$/.test(asset)) {
        await access(path.join("dist", asset));
      }
    }
  }
});

test("internal page links resolve to generated routes", async () => {
  const known = new Set(routes.map((route) => `/${route}`));
  for (const route of routes) {
    const html = await readFile(path.join("dist", route, "index.html"), "utf8");
    for (const [, href] of html.matchAll(/href="(\/[^"\s]*)"/g)) {
      const url = new URL(
        href.replaceAll("&amp;", "&"),
        "https://skillcase.test",
      );
      if (
        url.origin !== "https://skillcase.test" ||
        /\.[a-z0-9]+$/i.test(url.pathname)
      )
        continue;
      const pathname = url.pathname.replace(/\/+$/, "") || "/";
      assert.ok(
        known.has(pathname),
        `/${route} links to missing route ${href}`,
      );
    }
  }
});

test("dashboard routes and TypeScript/Astro source are removed", async () => {
  const files = await readdir("src", { recursive: true });
  assert.deepEqual(
    files.filter((file) => /\.(astro|tsx?)$/.test(file)),
    [],
  );
  assert.deepEqual(
    files.filter((file) => /dashboard/i.test(file)),
    [],
  );
  await assert.rejects(access("dist/dashboard"));
  const html = await readFile("dist/404.html", "utf8");
  assert.match(html, /Page not found/);
  assert.match(html, /name="robots" content="noindex"/);
});

test("Cloudflare health and unknown API responses remain intact", async () => {
  const response = await worker.fetch(
    new Request("https://skillcase.test/api/health"),
    {},
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    ok: true,
    service: "skillcase",
    runtime: "cloudflare-workers",
  });
  const missing = await worker.fetch(
    new Request("https://skillcase.test/api/missing"),
    {},
  );
  assert.equal(missing.status, 404);
});

test("Cloudflare passes public requests to static assets", async () => {
  const request = new Request("https://skillcase.test/about/");
  let received;
  const response = await worker.fetch(request, {
    ASSETS: {
      fetch: async (value) => {
        received = value;
        return new Response("About Skillcase");
      },
    },
  });
  assert.equal(received, request);
  assert.equal(await response.text(), "About Skillcase");
});
