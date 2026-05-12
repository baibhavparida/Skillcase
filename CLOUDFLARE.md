# Skillcase Cloudflare Deployment

Skillcase is configured for Cloudflare Pages.

## Project Setup

- Build command: `npm run build`
- Build output directory: `dist`
- Deploy command in Cloudflare Pages Git settings: leave this blank.
- If Cloudflare requires a custom deploy command, use: `npm run cf:publish`
- Do not use `npx wrangler deploy`; that deploys Workers, not Pages, and fails with "Missing entry-point to Worker script or to assets directory".
- Manual production deploy command: `npm run cf:deploy`
- Preview deploy command: `npm run cf:deploy:preview`
- Local Cloudflare preview: `npm run cf:dev`

## Current Architecture

- Astro renders the public website as static pages.
- React powers interactive islands on the marketing site and future dashboard areas.
- Cloudflare Pages serves the static output from `dist`.
- Pages Functions live in `functions/`; `functions/api/health.js` is a small edge endpoint to keep the app/backend path ready.

## Future App Direction

When the nurse and recruiter dashboards need real data, add Pages Functions under `functions/api/*` for API routes and bind Cloudflare services such as D1, KV, R2, or Workers AI in `wrangler.toml`.
