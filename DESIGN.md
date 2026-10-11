# Existing Skillcase design

The current primary homepage is `src/pages/home.jsx`, served at `/` through `src/routes.js`, and is written for every healthcare profession. Its hero imagery is a moving row of professionals (`src/components/PlacedHero.jsx`, data in `src/data/placements.js`), followed by a role list (`src/components/RoleList.jsx`, data in `src/data/roles.js`) and "How it works" (`src/components/HowItWorks.jsx`). Backgrounds are flat (no light gradient washes) and phone CTAs keep the shared 40px button style. The previous homepage is kept unchanged, noindex, at `/home-legacy`.

`/start-now` (`src/pages/start-now.jsx`, styles in `src/styles/start-now.css`) redesigns learner.skillcase.in/start-now, the trust page before the program picker, in the same identity, and is linked in the site nav as "Learner Stories". Its hero image is a code-built live class window filled with real teacher and learner webcam frames (`src/components/start-now/LiveClass.jsx`); inside it, colour is limited to navy and white plus a small red live dot. Class and lecture videos have designed covers that keep the real webcam frames, with a small play-and-length pill in a corner rather than a centred play button. Its content (learners, videos, notes, reviews) lives in `src/data/startNow.js` with media hosted under `public/assets/*/start-now` and `public/assets/notes`.

`/signup` (`src/components/CandidateSignup.jsx`) asks the learner app's own onboarding questions, with the exact values the app stores (`src/data/appOnboarding.js`, copied from the app's `OnboardingFlow.jsx`). It ends with a plan for the visitor's German level and goal (`src/components/AppPlanReveal.jsx`, content in `src/data/appPlans.js`, styles in `src/styles/app-plan.css`). The plan shows a realistic phone with the exact app screen that level lands on: navbar, mode tabs, card grid, guided path, job lobby or scholarship hub. It is rebuilt from the live learner app's components (the nursing-german branch), using the app's own images in `public/assets/images/app-ui`. It is drawn at the app's 390 px width and scaled with container units. On phones it rises out of a light-blue band; on desktop it sits in the navy side panel. Option cards are roomy and show one-line descriptions, with a navy border, light tint and check when selected. Signup icons use the site's Phosphor icon font (`src/components/healthcare/Icon.jsx`) rather than icon components, which keeps the page's script small.

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
