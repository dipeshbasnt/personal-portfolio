# Portfolio Design and Build Plan

## Reference

- Primary reference: the supplied full-page portfolio screenshot and pasted JSX.
- Visual direction: warm stone background, deep navy text, orange-red accents, generous whitespace, rounded controls, and hand-drawn details.
- Keep the hero on its supplied 1440×900 artboard and scale the complete composition to fit smaller viewports.
- Use the supplied local hero character at `public/images/character.PNG`; keep future project imagery in section data so assets remain easy to replace.

## Page sections

Implement and review these one at a time, in page order:

1. Header and navigation
2. Hero
3. About
4. Skills / “What I Bring”
5. Journey and education
6. Beyond work
7. Featured project
8. Project collection
9. Services
10. Process
11. Testimonials and outcome cards
12. Contact call to action and form
13. Footer

The hero, navigation, and footer are page-level features. The rest are section components. Journey and education share one visual panel; testimonials and outcome cards share one section wrapper. Atomic pieces live in `components/atoms/`; combinations such as `SectionHeading` live in `components/organisms/`.

## Initial component inventory

These are estimates to guide implementation, not a requirement to create a file for every element.

### Shared UI components

- `Container` — shared responsive horizontal gutters and max width.
- `Heading` — semantic heading level with consistent responsive type sizes.
- `Button` — primary, secondary, and outline link/button variants.
- `Eyebrow` — small uppercase section label.
- `IconLink` — accessible icon-only link/button with a required label.
- `Logo` — shared, linked RabbitTheDesigner mark for the header and footer.
- `NavLink` — consistent accessible in-page navigation link.
- `Tag` — compact pill label.
- `Input` and `Textarea` — native form controls with shared focus, invalid, and disabled styles.
- `Section` — semantic section spacing only if at least two sections need the same behavior.

### Feature components

- `SiteHeader` / `NavigationItem`
- `HeroSection` / `HeroStats`
- `AboutSection` / `SkillItem` / `JourneyPanel` / `InterestTag`
- `FeaturedProjectSection`
- `ProjectGrid` / `ProjectCard`
- `ServicesSection` / `ServiceCard`
- `ProcessSection` / `ProcessStep`
- `TestimonialsSection` / `TestimonialCard` / `OutcomeCard`
- `ContactSection` / `ContactForm`
- `SiteFooter`

Keep simple one-use layout and decoration inline in their feature component. Promote an element into shared UI only when it repeats or has meaningful behavior/accessibility responsibility.

## Layout and spacing

- Use a centered content container with `max-width: 1440px`.
- Horizontal gutters: `100px` on desktop, `24px` on tablet, and `16px` on mobile. Apply the gutter once; align hero content to its inner edge without a second inset.
- Implement gutters once as CSS variables and a `.container` utility, then use it consistently across sections and header/footer.
- Use a small spacing scale for vertical rhythm; tune individual sections against the screenshot rather than forcing every section into one fixed height.
- Breakpoints should follow the existing Tailwind defaults unless the design requires a documented exception.

## Folder structure proposal

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  atoms/
    Button.tsx
    Container.tsx
    Eyebrow.tsx
    Heading.tsx
    IconLink.tsx
    Input.tsx
    Logo.tsx
    NavLink.tsx
    Tag.tsx
    Textarea.tsx
  organisms/
    SplitHero.tsx
    SectionHeading.tsx
  navigation/
    Navbar.tsx
    Footer.tsx
  sections/
    hero/
      HeroSection.tsx
      HeroStats.tsx
    about/
      AboutSection.tsx
    skills/
      SkillsSection.tsx
    journey/
      JourneyEducationSection.tsx
    beyond-work/
      BeyondWorkSection.tsx
    featured-work/
      FeaturedWorkSection.tsx
    projects/
      ProjectsSection.tsx
    services/
      ServicesSection.tsx
    process/
      ProcessSection.tsx
    testimonials/
      TestimonialsSection.tsx
    contact/
      ContactSection.tsx
  hooks/
  Animation/
  providers/
data/
  portfolio.ts
lib/
  utils.ts
public/
  images/
  icons/
```

Keep the current project's root-level `app/` directory. Follow the demonstrated `components/atoms`, `components/organisms`, `components/sections`, `components/navigation`, and `components/hooks` naming convention. The user explicitly requested empty scaffolding across the full structure; files will be implemented one section at a time. Keep section-specific components with their section unless multiple features genuinely share them.

## Hooks, animation, and themes

- `hooks/` is for React hooks, not ordinary helper functions.
- Add animation files/components only when animation is actually used; keep motion behavior local to the feature or in `components/Animation/` if shared, matching the user's established naming convention.
- Keep color, type, spacing, and radius tokens in CSS custom properties in `app/globals.css`. A separate theme directory is unnecessary for the initial single-theme page; create one if multiple themes or a larger token system appears.
- Respect reduced-motion preferences for any nonessential movement.

## Assets and content

- Use local images from `public/images/` when the user has supplied them.
- Keep image paths in typed data rather than scattering them through markup.
- Confirm project copy, testimonial authenticity, social URLs, and contact destination before presenting them as real content.

## Section-by-section workflow

For each section: inspect reference details and available assets, agree on the section's structure, implement it responsively, then review it before moving on. Keep `decision.md` updated when a meaningful choice is settled and `memory.md` updated with durable project context.
