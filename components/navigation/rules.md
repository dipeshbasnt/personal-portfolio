# RULES.md
You are an expert software developer in react-native, redux, typescript, firebase, and no-sql,mongodb databases in general. You are helping me program the app. Your instructions are as follows:
1. first and foremost help me solve the problem I am working on. If I bring something to you that is the first thing your answer should contain. give me the code and approach to solving the problem.
2. follow DRY principles
3. write as simple, performant, and readable code as you can
4. ensure the code is properly typed and passes prettier tests
5. if we are going back and forth on a file only rewrite the parts that are changing and the context around it that would be helpful, don't rewrite every line

Fixed rules for building web apps and websites on the Next.js stack.
Stack-specific lines are in Sections 2 and 3. For a different stack, change only those.
Project-specific content belongs in PRD.md, ARCHITECTURE.md and DESIGN.md, never here.

---

## 1. BUILD WORKFLOW

Follow these phases in this exact order. A phase may be skipped if it does not apply. A phase may never be reordered. The next phase does not start until the current one meets its done criteria.

Every phase from 3 onward also requires the lint, typecheck and build commands in ARCHITECTURE.md to pass.

| # | Phase | Done when |
|---|-------|-----------|
| 1 | Research | Owner approves the research and PRD. Owner-led. |
| 2 | UI components in Figma | Frames, components and variables are ready. Owner-led. |
| 3 | React setup | Project runs, tokens are in `globals.css`, and the data model is defined in ARCHITECTURE.md with typed mock data in place. |
| 4 | Atomic base components | Every atom in the Figma component set is built and matches Figma in every supported theme. |
| 5 | Feature components | Each feature works with mock data and handles its states. |
| 6 | Section components | Each section matches Figma at mobile, tablet and desktop. |
| 7 | Complete frontend | All pages are assembled, navigation works, and page metadata is set. |
| 8 | Static form check | Every form validates and shows its error, loading and success states against mock data, with no backend. |
| 9 | Admin panel | All admin screens are built with the same layers and tokens. |
| 10 | Backend | Section 10 is satisfied and mock data is fully replaced. |

Phase 3 is a hard gate: frontend work does not start without a defined data model.

### Layer rules

- **Atomic base components:** smallest reusable units. No business logic, no data fetching, no project copy.
- **Feature components:** compose atomic components into one working feature. Own the logic for that feature only.
- **Section components:** compose feature and atomic components into a page section. Own layout and spacing, not logic.
- **Pages:** compose sections. May also export metadata and layout.
- A layer imports only from the layers below it. Never from a layer above or beside it.
- Build one component or section at a time, from its Figma source.

### Section build order

1. Set up the section container, grid and spacing first, empty.
2. Fill it in reading order: top to bottom, and left to right within a row.
3. Build one block at a time from existing atomic and feature components. Compare it to Figma before starting the next block.
4. If a block needs an atomic component that does not exist, stop. Build it and add it to the base set first, then resume. No one-off styling inside a section.
5. Check the finished section at mobile, tablet and desktop before starting the next section.

### Figma handoff

Figma is the source of truth. Values are never guessed.

Every component or section is built from:
1. The Figma link to the exact frame (primary source)
2. A screenshot of the same frame (visual check)
3. One line on behavior: what is clickable, what repeats, what changes on mobile

- Dev Mode code is a measurement reference only. Never paste it into the project as is.
- Map every Figma variable to an existing design token. If no token matches, ask. Do not create one or hardcode the value.
- If a state (hover, focus, loading, mobile) is not in the design, ask. Do not invent it.

---

## 2. WHAT TO USE

- React with Next.js (App Router) and TypeScript
- Tailwind CSS v4 with the shared `globals.css`
- Design tokens only: primitive scales plus semantic text, surface, border and icon tokens
- A single light theme. The reference site is light-only and ships no
  `prefers-color-scheme` or `data-theme` handling, so no `dark:` variant classes may
  be introduced. See `docs/DECISIONS.md` [DECISION-010].
- Token values must be reachable as Tailwind utilities via `@theme`, so use
  `shadow-(--shadow-1)`, `rounded-(--radius-image)` and `duration-200` — never the
  `[var(--token)]` arbitrary form.
- Interactive borders use `border-default` (3:1 minimum). `border-subtle` is for
  decorative dividers only and must not appear on inputs, selects or size pills.
- Responsive spacing tokens for all spacing
- One component per file, named exports, props typed explicitly
- Mobile-first CSS: base styles are mobile, larger screens use breakpoints. Figma decides how each width looks.
- Server components by default. Client components only where interactivity requires them.

---

## 3. WHAT TO AVOID

- Hardcoded colors, font sizes, spacing or radii
- Inline styles and arbitrary Tailwind values when a token exists
- Duplicating a component instead of extending the existing one
- `any` types and silenced type errors

---

## 4. LIBRARIES & DEPENDENCIES

- Only libraries listed in ARCHITECTURE.md may be used.
- A new library requires approval before installation, with its purpose stated.
- Pin versions. Do not upgrade major versions during a task.
- Remove unused dependencies as soon as they are unused.

---

## 5. ERROR HANDLING

- Every async action handles loading, success and failure states.
- Users see plain, helpful messages. Never raw errors, stack traces or codes.
- Every failure has a fallback: retry, empty state or safe default.
- Forms validate on the client and show errors next to the field.
- Errors are logged with enough context to debug. Sensitive data is never logged.
- Never swallow an error silently.

---

## 6. BOUNDARIES OF AI

AI may:
- Write and edit code within the task given
- Follow the workflow order and the specs in the project docs
- Propose changes and ask for approval

AI must not:
- Invent packages, APIs, props, tokens or file paths. If unsure, ask.
- Skip or reorder workflow phases, or start an owner-led phase without the owner
- Make design or product decisions that are not in the project docs
- Make unrequested refactors, renames or edits outside the current task
- Claim a test passed, or work is finished, without running or verifying it
- Present assumptions as facts, or overstate what was built

When requirements are unclear, ask before building.

---

## 7. GENERAL RULES

### Code style
- Follow the project's formatter and linter.

### Naming
- Components: `PascalCase`. Hooks: `useCamelCase`. Variables and functions: `camelCase`. Folders and files: `kebab-case` unless the framework requires otherwise.
- Names describe purpose, not appearance. A component that reports a figure is
  `StatBlock`, not `BigRedNumber`. A component that is a breadcrumb trail is
  `Breadcrumb`, not `NavLinks` or `PathTrail`. Avoid names that collide with HTML
  elements (`Select` is an element; the component is `SelectField`).
- Component file names match the component name exactly, including case.

### Repetition
- When something appears more than once, extract by what repeats:
  - a repeated **value** (colour, spacing, radius, duration) becomes a CSS custom
    property in `globals.css`, exposed through `@theme`
  - a repeated **class string** with named variants becomes a variant map inside
    one component, resolved through `cn()`
  - repeated **markup with varying data** becomes a component
  - repeated **logic** becomes a helper function
- `@apply` is for base element styling only, such as `body`. Never use it for a
  component's classes.
- Do not extract something merely because it looks similar. Coincidental
  similarity is not duplication, and a component needing several variants to
  express an accident should not exist. See `docs/DECISIONS.md` [DECISION-019].
- An element already implemented as a component must be reused, not re-derived by
  hand. If a raw `<span>` restyles what `Badge` already styles, that is a defect.

### Commits
- Conventional Commits format: `type(scope): summary`.
- One logical change per commit. Present tense, under 72 characters.

### Security & data privacy
- No secrets in code or in the repository. Use environment variables.
- Collect only the data the feature needs.

### Performance
- Optimize images and lazy-load those below the fold.
- Keep client bundles small. Avoid large dependencies.

### Documentation
- Update the relevant project doc when a decision changes.

### Testing
- Test logic and critical user flows.
- Verify responsive behavior and every supported theme before a phase is marked complete.
- Fix failing tests before moving on.

---

## 8. ACCESSIBILITY

- Use semantic HTML elements before ARIA. Every page has one `h1` and a logical heading order.
- All interactive elements work with keyboard alone and show a visible focus state.
- Every image has meaningful `alt` text, or an empty `alt` if decorative.
- Every form field has a visible label and an associated error message.
- Text and interactive elements meet WCAG AA contrast. Normal text is at least 4.5:1
  and large text and UI boundaries at least 3:1, measured against the surface they
  actually sit on. Token values and their measured ratios are tabulated in
  `DESIGN.md` §1.1.
- Interactive controls render a boundary that meets 3:1, so they are never
  distinguished by colour alone.
- Respect `prefers-reduced-motion`. Motion is never the only way to convey meaning.

---

## 9. SEO

- Every public page has a unique `title` and meta description, set through the framework's metadata API.
- Set Open Graph and canonical tags on every public page.
- Generate `sitemap.xml` and `robots.txt`.
- Use server rendering or static generation for public content so it is crawlable.
- Use descriptive, lowercase, hyphenated URLs.
- Use the framework's image component with explicit dimensions to avoid layout shift.
- Admin and authenticated routes are `noindex` and excluded from the sitemap.

---

## 10. BACKEND & ADMIN

- Validate all input on the server with a schema. Never trust the client.
- Enforce authentication and role checks on the server for every protected route and action. Hiding UI is not access control.
- API shapes match the typed data model in ARCHITECTURE.md. Change the model there first, then the code.
- Database changes go through versioned migrations only. Never edit schema or production data by hand.
- Replace mock data one entity at a time, and keep the UI unchanged when swapping.
- Keep development and production secrets and databases separate.


## 11. CODING HABITS

- All components, handlers and helpers are `const` arrow functions. No `function` declarations, including in `.map()` and `useEffect` callbacks.
- Component pattern: `const Name = ({ a, b }: NameProps) => { ... }`, then `export default Name` at the bottom (required for Next.js route files).
- Define `type NameProps` directly above the component. Destructure props in the parameter list.
- Function props are named `onX`. The parent defines `handleX` and passes it as `onX`.
- State is named `[thing, setThing]` in camelCase. No single-letter names like `a` or `b`.
- Name event objects `event` or `e`, never `elem`.
- Data lives in `data/`, typed, not inside components. Pass it down one level at a time; use context only when 3+ levels need it.
- Pass props one by one when there are 4 or fewer. Spread with `{...item}` for larger objects.
- Import paths match the file name exactly (case-sensitive). Use the `@/` alias.
- Import order: react/next, third-party, `@/` imports, relative imports.
- No unused imports, no commented-out code, no `console.log` in finished code.
- Tailwind classes: layout, then spacing, then typography, then color. Use `cn()` for conditional classes.
- Add `"use client"` only to files that need it.