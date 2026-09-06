import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { render, routePaths } = await server.ssrLoadModule(
    "/src/entry-server.jsx",
  );
  const template = await readFile("dist/index.html", "utf8");
  const manifest = JSON.parse(
    await readFile("dist/.vite/manifest.json", "utf8"),
  );

  function stylesFor(source, seen = new Set()) {
    if (seen.has(source)) return [];
    seen.add(source);
    const chunk = manifest[source];
    if (!chunk) return [];
    return [
      ...(chunk.imports || []).flatMap((key) => stylesFor(key, seen)),
      ...(chunk.css || []),
    ];
  }

  for (const pathname of [...routePaths, "/404"]) {
    const { head, body, source } = await render(pathname);
    const styles = [...new Set(stylesFor(source))]
      .map((file) => `<link rel="stylesheet" href="/${file}">`)
      .join("");
    const html = template
      .replace("<!--page-head-->", () => head + styles)
      .replace(
        '<div id="root"></div>',
        () => `<div id="root" data-prerendered="true">${body}</div>`,
      );
    const file =
      pathname === "/404"
        ? "dist/404.html"
        : path.join("dist", pathname, "index.html");
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`Rendered ${pathname}`);
  }
  await rm("dist/.vite", { recursive: true });
} finally {
  await server.close();
}
