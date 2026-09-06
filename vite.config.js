import { fileURLToPath } from "node:url";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "static-page-preview",
      configurePreviewServer(server) {
        // Match the deployed static site's directory URLs and 404 handling.
        // Vite's default SPA fallback would otherwise serve the home page here.
        server.middlewares.use(async (request, response, next) => {
          const url = new URL(request.url, "http://localhost");
          if (!["GET", "HEAD"].includes(request.method) || path.extname(url.pathname)) return next();
          const output = path.resolve(server.config.root, server.config.build.outDir);
          const directory = path.resolve(output, `.${url.pathname}`);
          if (directory !== output && !directory.startsWith(output + path.sep)) return next();
          try {
            await access(path.join(directory, "index.html"));
            if (!url.pathname.endsWith("/")) {
              response.writeHead(308, { Location: `${url.pathname}/${url.search}` });
              return response.end();
            }
            return next();
          } catch {
            try {
              const html = await readFile(path.join(output, "404.html"));
              response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
              response.end(request.method === "HEAD" ? undefined : html);
            } catch {
              next();
            }
          }
        });
      },
    },
  ],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  server: { host: "0.0.0.0", port: 4321 },
  preview: { host: "0.0.0.0", port: 4321 },
  build: { manifest: true },
});
