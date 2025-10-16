# Portfolio Enhancement Worklog

> Tracking the transformation from the current minimal portfolio to the richer, high-impact experience we discussed.

## Implementation Order

1. **Foundations & Styling**  
   - `@studio-freight/lenis` for smooth scroll inertia.  
   - `tailwind-gradient-mask-image` (or equivalent utility) for mask/gradient reveals.  
   - `tailwindcss-fluid-type` for responsive hero typography.  
   - `react-wrap-balancer` to balance long headings.  
   _Goal:_ establish the baseline feel (motion, responsive type, gradients) before layering hero set pieces.

2. **Hero & Visual Impact**  
   - Evaluate `@splinetool/react-spline` and fallback patterns using `@react-three/fiber` + `drei`.  
   - Introduce scroll-linked parallax (`framer-motion` hooks or `motion-primitives`).  
   - Consider `react-parallax-tilt` / `embla-carousel-react` for interactive project/service strips.  
   - Optional micro-animations via `lottie-react` or `@rive-app/react-canvas` for CTA icons.

3. **Section Components & Layouts**  
   - Pull in shadcn-compatible patterns (Magic UI / Aceternity UI snippets).  
   - Build service grid, testimonial sliders, pricing tiles, timeline components (Radix `Tabs`, `Accordion`, `HoverCard`).  
   - Add metric counters with `react-countup` + `framer-motion`.

4. **Content & Credibility Systems**  
   - Set up MDX via `contentlayer` (or `next-mdx-remote`) to author case studies/testimonials.  
   - Integrate `next-seo` for richer metadata.  
   - Wire optional command palette (`cmdk`) and analytics badges.

## Task Checklist

- [x] Install and configure foundational libraries (Lenis, gradient mask utility, fluid type helper class, wrap balancer).  
- [x] Update global styles / layout to use new utilities and ensure regression-free baseline.  
- [x] Build theme system with shared tokens, palette presets, and UI controls (light/dark toggle + palette switcher).  
- [ ] Prototype hero upgrades (3D background or parallax) and lock selected approach.  
- [ ] Implement interactive project/service sections using chosen component patterns.  
- [ ] Add testimonial/metrics modules with animated counters.  
- [ ] Migrate long-form content to MDX/contentlayer pipeline.  
- [ ] Expand SEO + analytics instrumentation.  
- [ ] Document outcomes and remaining todos per milestone.

## Notes & Decisions

- Maintain existing stack alignment (Next.js + Tailwind + shadcn/ui + Framer Motion); new libraries complement rather than replace.  
- Prefer minimal bundle impact—defer heavier 3D assets behind dynamic imports or feature toggles.  
- Keep accessibility checks running; revisit focus states after motion/animation additions.  
- Adopt the journey outlined in the ASCII wireframes: hero → proof strip → featured case study → services → process → testimonials/metrics → secondary work → explorations → contact. Use this as the target structure while upgrading components.  
- Default palette uses Canyon Dawn (light) and Velvet Twilight (dark) under the `palette-default` profile; all new styling should reference CSS custom properties (`--primary`, `--panel-gradient-start`, etc.) rather than hard-coded color values so theme swaps stay consistent.  
- Smooth scrolling will stay off for now (Lenis removed on request); revisit once we have the rest of the experience dialed in.  
- Revisit this file after each milestone to mark progress and capture iterations.
