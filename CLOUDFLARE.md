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

- Astro renders the public website as static pages.
- React powers interactive islands on the marketing site and future dashboard areas.
- Cloudflare Workers serves the static output from `dist` through Static Assets.
- `src/worker.js` handles edge/API routes before static assets, including `/api/health`.

## Future App Direction

When the nurse and recruiter dashboards need real data, add Worker API routes in `src/worker.js` or split them into modules, then bind Cloudflare services such as D1, KV, R2, or Workers AI in `wrangler.toml`.
