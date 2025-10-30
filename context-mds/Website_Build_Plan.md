# Michael F. Jones — Portfolio Website Build Plan

> A structured, codex‑friendly plan to scaffold, implement, and ship a polished Next.js portfolio site. Includes goals, tech stack, milestones, tasks with acceptance criteria, and checklists you can mark as complete.

---

## 0) Context & Objectives

**Context**

- New CS grad (May 2025), recent experience at Turbo Labs (React/Next/Supabase, agentic AI workflows).
- Based in Northwest Arkansas; targeting frontend‑leaning full‑stack roles.
- Need a credible online presence: portfolio site + live projects + consistent story.
- GitHub footprint now consolidated under [github.com/mfj-developments](https://github.com/mfj-developments).

**Primary Objectives**

- Ship a production‑quality personal site with **Home, About, Projects, Contact, Blog (optional)**.
- Showcase **2–3 strong projects** with live demos and clean repos.
- Present a clear professional brand; streamline applications with a downloadable **Jones-Front-End-Web-Developer.pdf**.
- Make the site fast, accessible, and maintainable; simple content workflows.

**Secondary Objectives**

- Demonstrate familiarity with **CI/CD, analytics, SEO, and a light DevOps workflow**.
- Optionally use **Supabase** for simple content (project metadata/blog), or keep data static for speed.

**Success Metrics**

- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- CLS ≤ 0.1, TTI < 2.5s on cable‑like network.
- At least **2 live projects** linked, each with: README, screenshots, and a 3–5 sentence case study.
- Contact form successfully delivers messages (or clear mailto alternative).

---

## 1) Tech Stack & Key Decisions

**Core**

- Framework: **Next.js 14+ (App Router)**
- Language: **TypeScript**
- Styling: **Tailwind CSS** (+ @tailwindcss/typography/forms/aspect-ratio as needed)
- UI: **shadcn/ui** components
- Animation: **Framer Motion** (light usage for page/element transitions)
- Hosting: **Vercel** (Preview + Prod)
- Version Control: **GitHub**

**Optional/Pluggable**

- Data Layer: **Supabase** (Auth, simple tables for projects/blog), or **static JSON/MDX**.
- Forms: Supabase Functions / Resend / Formspree; fallback `mailto:` if API not ready.
- Analytics: Vercel Analytics or Plausible (lightweight).

**Tooling**

- Linting/Formatting: ESLint, Prettier
- Testing: Playwright (smoke + a11y), Vitest/RTL (unit), Lighthouse CI (optional)
- CI/CD: GitHub Actions (typecheck, lint, build, tests → deploy via Vercel)

**Design System**

- Typography: Inter or Manrope
- Color: Minimal (neutral base + 1 accent)
- Spacing: Tailwind scale; `rounded-2xl`, `shadow-md`
- Icons: lucide-react
- Tokens: define in `tailwind.config.ts` + CSS variables

**Architecture Choices**

- **App Router** with segment‑based layouts
- **MDX for blog** (optional); projects as `projects/*.json` or MDX frontmatter
- **Images** via `next/image`
- **SEO** via route `metadata` exports, OpenGraph images per page

---

## 2) Repository Structure

```
/ (root)
├─ .github/workflows/ci.yml
├─ public/
│  ├─ Jones-Front-End-Web-Developer.pdf
│  ├─ og/ (Open Graph images)
│  └─ images/ (project thumbs, avatar)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                              # Home
│  │  ├─ about/page.tsx
│  │  ├─ projects/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ blog/ (optional)
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/page.mdx
│  │  └─ api/ (optional; contact endpoints, revalidate hooks)
│  ├─ components/ (cards, nav, footer, buttons, badges)
│  ├─ lib/ (utils, analytics, seo)
│  ├─ data/ (projects.json or .mdx)
│  └─ styles/globals.css
├─ package.json
├─ tailwind.config.ts
├─ tsconfig.json
└─ README.md
```

---

## 3) Environment & Commands

**Scaffold**

```bash
npx create-next-app@latest michaeljones.dev --ts --tailwind --eslint
cd michaeljones.dev
npm i framer-motion lucide-react
# shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card badge input textarea navigation-menu sheet dialog
```

**Dev**

```bash
npm run dev        # local dev
npm run lint       # eslint
npm run typecheck  # ts - noEmit
npm run build      # prod build
npm run start      # run prod
```

**Optional (Supabase)**

```bash
npm i @supabase/supabase-js
# set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 4) Milestones & Checklists (Definitions of Done Included)

### M0 — Project Init & CI/CD

- [ ] Initialize Next.js (App Router, TS, Tailwind)
- [ ] Add ESLint/Prettier; strict TS settings
- [ ] Install shadcn/ui + base components
- [ ] Set up GitHub repo; push
- [ ] Configure Vercel: preview -> main deploys to prod
- [ ] Add CI GitHub Action: lint, typecheck, build
**DoD:** PR to `main` triggers CI, deploys preview on Vercel; base app renders.

---

### M1 — Global Layout & Navigation

- [ ] `app/layout.tsx` with fonts, metadata, and theme
- [ ] Header nav: LOGO, Projects, About, Blog (optional), Contact, GitHub/LinkedIn icons
- [ ] Footer: ©, location, email, social links
- [ ] Responsive: mobile hamburger (shadcn Sheet)
**DoD:** Nav/footers consistent, keyboard accessible (Tab/Enter), no layout shifts.

---

### M2 — Home Page (Hero + Featured Projects)

- [ ] Hero: name, tagline, short blurb, 2–3 CTAs (Projects, Resume, Email)
- [ ] Featured projects section (3 cards)
- [ ] Tech/tool strip (badges)
- [ ] OG image for `/`
**DoD:** Lighthouse a11y ≥ 95; hero CTAs focus-visible; images lazy‑loaded.

---

### M3 — About Page

- [ ] Profile/Quick facts section
- [ ] Timeline/experience (Turbo Labs, UArk, leadership)
- [ ] Principles/skills block
- [ ] CTAs: View Projects, Download Resume, Contact
**DoD:** All content readable on mobile; headings follow logical order (h1→h2→h3).

---

### M4 — Projects Page

- [ ] Filter chips (All, Frontend, Full‑stack, Next.js, Supabase)
- [ ] Project Card template: thumb, stack badges, 2–3 sentence summary
- [ ] Links: Live, GitHub, Case Study (or Readme)
- [ ] Data source: `src/data/projects.json` (or MDX), strongly typed
**DoD:** Can add/remove projects via data file w/o touching UI; cards pass a11y tests.

---

### M5 — Contact Page

- [ ] Contact intro; availability note
- [ ] Form: name, email, message (+ simple validation)
- [ ] Integration: mailto fallback OR API (Supabase/Resend)
- [ ] Success/failure states; spam honeypot
**DoD:** Submissions work (manual test) or mailto opens correctly; labels + aria‑describedby set.

---

### M6 — Resume Delivery

- [ ] Place `public/Jones-Front-End-Web-Developer.pdf` (ATS and print versions optional)
- [ ] Add `/resume` route or direct download button
**DoD:** Button downloads or opens resume reliably; file size < 1MB if possible.

---

### M7 — Performance & Accessibility

- [ ] Optimize images via `next/image`; preload hero font & avatar
- [ ] Reduce JS: tree-shake, lazy‑load non‑critical sections
- [ ] Add Playwright a11y checks for key pages
- [ ] Lighthouse CI (optional) or manual reports
**DoD:** Perf ≥ 90, A11y ≥ 95; no obvious keyboard traps; color contrast verified.

---

### M8 — SEO & Analytics

- [ ] Route metadata: titles, descriptions, canonical URLs
- [ ] OpenGraph/Twitter images (`/public/og/*.png`)
- [ ] Sitemap + robots.txt
- [ ] Analytics (Vercel or Plausible) wired only in prod
**DoD:** Pages indexed; previews show correct OG images; analytics events appear.

---

### M9 — Content Freeze & Polish

- [ ] Final copy edit (typos, voice)
- [ ] Replace placeholders with real screenshots
- [ ] Verify external links (LinkedIn/GitHub/Live demos)
- [ ] Add simple 404 page
**DoD:** Production deploy feels complete; nothing obviously “in progress.”

---

## 5) Page Requirements (Acceptance Criteria)

### Home

- Clear headline + location (Fayetteville, AR)
- 2–3 primary CTAs
- 3 featured projects (live links)
- Tech/tool strip
- OG image present

### About

- Short bio (recent grad, Turbo Labs, stack)
- Quick facts (GPA, minors, focus, location)
- Timeline of experience
- CTA row

### Projects

- Filterable cards
- Each card: title, stack badges, ~45–70 word summary
- Links: Live, GitHub, Case Study
- Data-driven (JSON/MDX)

### Contact

- Intro text + response expectation
- Form or mailto fallback
- Error/Success states
- Alt channels: GitHub, LinkedIn, Email, Resume

### Blog (Optional)

- Index: search + tags
- Post: title, date, read time, tags, MDX content
- Prev/Next navigation

---

## 6) Components Inventory

- `Nav`, `MobileNav` (Sheet)
- `Footer`
- `HeroSection`
- `ProjectCard`, `ProjectFilters`
- `TechBadge`
- `ContactForm`
- `Section` wrapper (max‑width, padding)
- `PageHeader` (title + subtitle)
- `MDXComponents` (if blog)

---

## 7) Content & Assets Checklist

- [ ] Headshot/avatar (1200×1200)
- [ ] Project screenshots (1200×630 OG‑friendly)
- [ ] Copy:
  - [ ] 1–2 sentence bio
  - [ ] 3 project summaries (45–70 words)
  - [ ] Contact intro line
- [ ] Resume (PDF, less than 1 MB)
- [ ] Social links (GitHub, LinkedIn)

---

## 8) Testing Plan

**Manual**

- Keyboard navigation coverage
- Mobile viewport checks (iPhone SE → Desktop XL)
- Broken link sweep (script or extension)

**Automated (nice to have)**

- Playwright: visit each page, run `axe-core` a11y
- Vitest: util functions, component rendering

---

## 9) Deployment & Maintenance

- Vercel environments: `Preview` for PRs, `Production` on `main`
- Branch strategy: feature branches → PR → CI → Preview → Review → Merge
- Backups: project data in repo (or export Supabase tables via scripts)
- Content updates: modify `projects.json` or MDX; redeploy auto‑triggers

---

## 10) Backlog / Stretch Goals

- Dark mode toggle
- RSS for blog
- Project detail pages (`/projects/[slug]`) with MDX case studies
- Contact automation (email templates, CRM tagging)
- Simple admin to manage projects (if using Supabase)
- i18n (English/Spanish) — low priority

---

## 11) Risks & Mitigations

- **Scope creep** → Work milestone by milestone; lock copy before M9.
- **API keys/Env** → Use Vercel environment vars; never commit secrets.
- **Supabase downtime** → Keep projects data static at first; add DB later.
- **Performance regressions** → Lighthouse in CI; avoid heavy libs.

---

## 12) Agent Tasks (Codex‑Ready Prompts)

1. **Scaffold & Configure**
   - Create Next.js app (TS, Tailwind), add shadcn/ui, framer‑motion, lucide-react.
   - Configure ESLint/Prettier; strict TS; create `ci.yml` (lint, typecheck, build).
   - Commit and push to GitHub; connect repo to Vercel; set preview/prod.

2. **Global Layout**
   - Implement `layout.tsx` with base `<html lang="en">`, fonts, metadata, theme.
   - Build `Nav` (desktop + mobile), `Footer`. Add social icons.

3. **Home Page**
   - Implement hero with headline, blurb, CTAs; featured projects section; tech strip.
   - Add OG image and metadata.

4. **About Page**
   - Implement profile + quick facts, timeline, principles, CTA row.

5. **Projects Page**
   - Create `projects.json` with typed schema; render filterable `ProjectCard`s.

6. **Contact Page**
   - Build accessible form with validation; stub API or mailto fallback.

7. **Resume Delivery**
  - Place `public/Jones-Front-End-Web-Developer.pdf`; wire “Download Resume” button site‑wide.

8. **Perf & A11y**
   - Replace images with `next/image`; add Playwright a11y smoke test.

9. **SEO & Analytics**
   - Add route metadata, sitemap, robots, OG images; wire analytics in prod only.

10. **Polish & Ship**

- Clean copy, replace placeholders, validate links, add 404; final deploy.

---

## 13) Definitions of Done (Global)

- No console errors or unhandled rejections in browser or server logs.
- Lighthouse: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95 on `/` and `/projects`.
- Pages keyboard navigable; visible focus states; meaningful link text.
- All images have `alt` or `aria-hidden` where appropriate.
- CI passes on `main`; Vercel deploy is green; contact path verified.

---

**End of Plan** — Ready to hand to an agent and begin execution.
