# Decisions

## 2026-10-31 — Initial architecture proposal

- Build the portfolio section by section, in the order listed in `design.md`.
- Start from a small set of shared UI pieces plus feature-local components; do not split every visual element into its own file.
- Extract a repeated pattern when it appears in at least two places and has the same structure or behavior. A third use makes extraction especially clear, but reuse is not a mechanical count: accessibility, consistency, and behavior can justify earlier extraction; superficial similarity alone does not.
- Use one shared responsive container: max width 1440px, horizontal gutters 100px desktop / 24px tablet / 16px mobile.
- Apply the responsive gutter once around the 1440×900 hero artboard; align its header, intro, and stats to the artboard's inner edges.
- Keep hooks in `hooks/`, design tokens in CSS variables, and add animation/theme folders only when actual complexity warrants them.
- Treat the screenshot and pasted JSX as visual/content references, not as production-ready responsive implementation.

## 2026-10-31 — Responsive atoms foundation

- Create a small shared atom set first: `Container`, `Button`, `Heading`, `Eyebrow`, `NavLink`, `Tag`, and `IconLink`.
- Centralize the page palette, responsive gutters, section rhythm, and focus/reduced-motion behavior in global CSS variables and utilities.
- Match the user's prior project naming convention for component folders: `atoms`, `organisms`, `sections`, `navigation`, and `hooks`; preserve this starter's existing root-level `app/` directory.
- Scaffold all planned sections and supporting folders with empty files/placeholders first, then implement in order so the user can follow the folder map.
- Keep true atoms such as `Heading` and `Eyebrow` in `components/atoms/`; place composite patterns such as `SectionHeading` in `components/organisms/`.
- Use the supplied transparent hero character at `/images/character.PNG` instead of a remote portrait.
- Match the supplied Figma typography: Luckiest Guy for the oversized wordmark, Inter for hero copy and brand name, Manrope for headings and monogram, Roboto for navigation and body copy, JetBrains Mono for figures, and Caveat for the signature.
- The shared atom set is `Button`, `Container`, `Eyebrow`, `Heading`, `IconLink`, `Input`, `Logo`, `NavLink`, `Tag`, and `Textarea`.
- Component files use PascalCase matching their component names, default arrow-function exports, and `cn()` for conditional classes.
- Build the static sections one at a time from the user's section PNG and code; do the animation pass after the static page is complete.
- Hero character animation for the later motion pass: expand from scale `0` to scale `1` over `1s`.

## Open decisions

- Which projects, testimonials, social links, and contact destination are accurate and should be published.
- Whether any section needs interactive animation beyond simple hover/scroll behavior.
