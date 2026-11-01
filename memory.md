# Project Memory

## Goal

Build a responsive personal portfolio for RabbitTheDesigner from the supplied long-page design reference, working section by section.

## Current state

- Next.js 16 App Router starter using React 19, TypeScript, and Tailwind CSS 4.
- `app/page.tsx` renders the 1440×900 hero artboard, scaled to viewport width with no extra outer gutter; additional section files are scaffolded for later implementation.
- User supplied a full-page screenshot and JSX export in a Codex attachment.
- The supplied transparent character image is `public/images/character.PNG` and is used by the hero.
- Responsive design tokens and shared atoms have been added under `components/atoms/` as the first implementation step.
- The reusable atom set now includes button, container, eyebrow, heading, icon link, input, logo, nav link, tag, and textarea components.
- The hero artboard uses the shared `Navbar`, atoms, and typed data under `data/portfolio.ts`.
- Typography follows the supplied JSX roles: Luckiest Guy for the oversized wordmark; Inter for hero copy and brand name; Manrope for headings and monogram; Roboto for navigation and hero paragraph; JetBrains Mono for figures; and Caveat for the signature.
- Semantic color, type, radius, and layout tokens are exposed through Tailwind v4 in `app/globals.css`; contrast notes are in `DESIGN.md`.
- The user shared an older project's preferred structure: `components/atoms`, `organisms`, `sections`, `navigation`, `hooks`, `Animation`, and `providers`; align future work to it, while keeping this repo's root-level `app/` folder.
- Empty section files and scaffold folders have now been created across the planned portfolio structure at the user's request. Implement them incrementally, starting with atoms, then navigation/hero.

## Working agreements

- Explain the approach and provide concrete code when solving implementation tasks.
- Before implementation, map the page sections and likely reusable components.
- Reuse shared UI for genuinely repeated patterns; avoid over-componentizing one-off visuals.
- Centralize generic container gutters: 100px desktop, 24px tablet, 16px mobile, with a 1440px maximum container width. Apply the gutter once around the hero artboard; align its header, intro, and stats to the artboard edges.
- Keep hooks in `hooks/`; keep design tokens in CSS variables. Add dedicated animation/theme structure only when needed.
- Build and review one section at a time.
- Keep local asset paths in `data/portfolio.ts` so they are straightforward to replace.
- Reveal the hero character when the page load state completes, with a 2.2-second fallback, scaling up from its bottom edge over 1.6 seconds; honor reduced-motion preferences.
- See `design.md` for the proposed section/component structure and `decision.md` for settled and open decisions.

## Next step

The hero is implemented from the supplied `HeroStage` code. Continue with the next supplied page section and preserve its design source, content, and responsive behavior.
