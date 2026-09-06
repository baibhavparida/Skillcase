# Skillcase Cloudflare Deployment

Skillcase is configured for Cloudflare Workers with Static Assets. This matches the Git-connected Cloudflare Worker named `skillcase`.

## Project Setup

- Build command: `npm run build`
- Build output directory: `dist`
- Deploy command in Cloudflare Workers Git settings: `npx wrangler deploy`
- Manual production deploy command: `npm run cf:deploy`
- Dry-run validation command: `npm run cf:deploy:dry-run`
- Local Worker preview: `npm run cf:dev`

## Current Architecture

- React components use JavaScript/JSX, HTML, and CSS, with Vite for development and builds.
- The build pre-renders each public route into HTML, including blog articles and page metadata.
- React hydrates those pages in the browser for interactive features and signup.
- Nurse and recruiter dashboards have been removed. Signup ends with an advisor contact step.
- Cloudflare Workers serves the static output from `dist` through Static Assets.
- `src/worker.js` handles edge/API routes before static assets, including `/api/health`.

## Development

- Start the site locally with `npm run dev` (port 4321).
- Run `npm run check` to build all pages and validate routes, metadata, assets, and API behavior.
- Preview the built site with `npm run preview`, or use `npm run cf:dev` to test Cloudflare behavior.
- Page components live in `src/pages`; routes are listed in `src/routes.js`.
- Signup currently saves progress in the visitor's browser. It does not submit details to a backend.
- API routes can be added in `src/worker.js` when backend services are needed.
