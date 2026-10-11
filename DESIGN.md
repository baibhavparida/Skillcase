# Existing Skillcase design

The current primary homepage is `src/pages/home.jsx`, served at `/` through `src/routes.js`, and is written for every healthcare profession. Its hero imagery is a moving row of professionals (`src/components/PlacedHero.jsx`, data in `src/data/placements.js`), followed by a role list (`src/components/RoleList.jsx`, data in `src/data/roles.js`) and "How it works" (`src/components/HowItWorks.jsx`). Backgrounds are flat (no light gradient washes) and phone CTAs keep the shared 40px button style. The previous homepage is kept unchanged, noindex, at `/home-legacy`.

## Visual identity

- Poppins for public pages and signup.
- Navy `#002856`, deep navy `#001f44`, cyan `#05a3e5`, gold `#edb843`.
- Dark blue body text, pale blue-gray surfaces, photography of healthcare professionals.
- Gold primary buttons, navy secondary actions, restrained rounded corners.
- Preserve the alternate Home B page's existing typography and visual identity.

## Layout

Desktop content is centered around an 1180px maximum width. Phone layouts use a single column where reading or forms require it. Horizontal scrollers must expose a visible continuation, preserve access to all items, and support touch and keyboard use.

## Mobile requirements

Prioritize 320–430px phone widths, touch targets of at least 44px, 16px form text, comfortable body copy, safe-area spacing, and persistent access to the main navigation. Desktop layouts remain supported. Use responsive images and defer below-the-fold media.

## Sources

Recorded from the existing CSS, components, and the owner's confirmed preferences in this task. This documents the existing identity rather than proposing a new brand.
