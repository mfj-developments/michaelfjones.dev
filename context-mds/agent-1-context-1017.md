# Agent Work Log — Portfolio Website (Context Pack)

Date: 2025-10-17
Scope: `/Users/mj580/MJ_DEV/michaelfjones.dev` (primary app in `web/`)

This document captures everything implemented, changed, and decided during the agent session so future contributors have full context.

---

## 1) Repository + Project Layout

- Monorepo-like structure with the Next.js app under `web/`.
- Important paths:
  - App root: `web/`
  - App Router: `web/src/app`
  - Components: `web/src/components`
  - Data: `web/src/data`
  - Public assets: `web/public`
  - API routes: `web/src/app/api`
  - Context docs: `context-mds/`

Deployment note: on Vercel, set Project “Root Directory” to `web` so builds run in the Next.js app folder.

---

## 2) Branding, Links, and Identity

- Navbar brand (top-left): “Michael F. Jones”
  - `web/src/components/nav.tsx:21`
- Primary domain used in metadata: `https://michaelfjones.com`
  - `web/src/app/layout.tsx:10`
- Email address for contact: `mfjdevelopments@gmail.com`
  - Replaced all occurrences of `jonesmf58@gmail.com`.
- GitHub profile links point to: `https://github.com/mj850-turbo`
  - Navbar, footer, contact social buttons
- LinkedIn link: `https://www.linkedin.com/in/michael-jones-58a03124b/`
  - Navbar, footer, contact social buttons

---

## 3) Visual Design System (Dark-first)

Final palette (blue family):
- Background: `#0A1931` (canvas)
- Surface/Card: `#1A3D63`
- Primary (CTA/ring): `#4A7FA7`
- Accent (glow/details): `#B3CFE5`
- Foreground: `#F6FAFD`

Applied via CSS variables in `web/src/app/globals.css` under `.dark`:
- `--background`, `--foreground`, `--card`, `--primary`, `--muted`, `--accent`, `--ring`, etc.
- Utility: `.text-gradient-accent` for gradient-highlighted headlines.

Depth + atmosphere:
- Background layers added in `web/src/app/layout.tsx`:
  - Base vertical gradient
  - Two radial “spotlights”
  - Optional noise overlay (`/public/noise.svg`) if present

Rounded surfaces and subtle rings:
- Cards upgraded to `rounded-2xl`, soft border, and `ring-1 ring-inset` styling.

---

## 4) Global Structure

- `web/src/app/layout.tsx`
  - Forces dark mode on the root `<html>` for now (`className="dark"`).
  - Adds gradient + spotlight + noise background layers.
  - Page container spacing adjusted.
- Glassy navigation bar and footer:
  - `web/src/components/nav.tsx`: sticky, backdrop blur, muted text; social icons; theme controls hook present.
  - `web/src/components/footer.tsx`: frosted border/blur to match nav.

---

## 5) Home Page (Hero + Sections)

- File: `web/src/app/page.tsx`
- Marked as client (`"use client"`) to enable Framer Motion.
- Hero:
  - Eyebrow badges (role/stack), gradient-accent headline, copy, CTA buttons.
  - Subtle grid overlay and two radial orbs.
  - Tech chip strip for React/Next/TS/Tailwind/shadcn/Supabase.
  - Three stat tiles (Projects, Performance targets, Location).
- Removed redundant highlights below the projects grid per request.
- Bottom CTA banner retained with gradient glow.

Build fix implemented here:
- Resolved Framer Motion server error by adding `"use client"` to the page component.

---

## 6) Projects (Grid, Filters, Details)

Data
- `web/src/data/projects.ts` — strongly-typed list with `slug`, `title`, `summary`, `stack`, `links`, optional `image`.
- Placeholder cover images added and referenced:
  - `public/images/kat.png`
  - `public/images/dash-1.jpg`
  - `public/images/mj.jpg`
- Portfolio live URL set to `https://michaelfjones.com`.

Card component
- `web/src/components/project-card.tsx`:
  - 16:9 media area (Image with gradient veil, slight hover scale)
  - Soft elevation, left accent bar on hover
  - Tag pills as badges
  - Entire card is clickable to details via an overlay link
  - Removed Live/GitHub links on the card (kept on details page)

Projects page with filters
- Server page: `web/src/app/projects/page.tsx`
  - Exports `metadata` (server)
  - Renders `ProjectsClient`
- Client page: `web/src/app/projects/projects-client.tsx`
  - State-based category filter chips (All + unique stack names)
  - Grid of `ProjectCard`

Details route
- `web/src/app/projects/[slug]/page.tsx`
  - `generateStaticParams` for SSG of known slugs
  - `generateMetadata` for per-project SEO
  - Hero with image + gradient veil, title/summary/badges, Live/GitHub buttons
  - Overview tile (placeholder copy) and Tech Stack sidebar

Build fix implemented here:
- Resolved “metadata export in a client component” error by splitting server page (`page.tsx`) from a client component (`projects-client.tsx`).

---

## 7) About Page Refresh

- `web/src/app/about/page.tsx`
  - Intro tile with glow, badges, and Resume CTA
  - Quick Facts grid (Focus, Tooling, Education with icon)
  - Skills tiles (Core Stack chips, Principles list)
  - Closing CTA banner
  - Server-rendered for speed (no client hooks required)

---

## 8) Contact: Real Email Sending (Resend)

- UI: `web/src/app/contact/page.tsx`
  - Switch from `mailto:` to fetch `POST /api/contact`
  - Loading/success/error states
  - Social buttons (Email/GitHub/LinkedIn) on the left
  - Honeypot field included (“company”), hidden from users

- API: `web/src/app/api/contact/route.ts`
  - `runtime = "nodejs"`
  - Validates `name`, `email`, `message`; early-return if honeypot set
  - Uses Resend SDK to send email with `reply_to` (or `replyTo`) set to the sender
  - Environment variables used:
    - `RESEND_API_KEY`
    - `CONTACT_TO_EMAIL` (recipient; defaults to `mfjdevelopments@gmail.com`)
    - `CONTACT_FROM_EMAIL` (from identity; defaults to `onboarding@resend.dev`)

- Local env file (gitignored): `web/.env.local`
  - `RESEND_API_KEY=re_AhHgVWnC_BMTD3ut9DBaQrF6bq9vauUhP`
  - `CONTACT_TO_EMAIL=mfjdevelopments@gmail.com`
  - `CONTACT_FROM_EMAIL="Michael F. Jones <onboarding@resend.dev>"`

Notes
- Works in Resend’s sandbox sending to your own account address immediately.
- For sending to any recipient, verify domain in Resend and change `CONTACT_FROM_EMAIL` to use your domain (e.g., `contact@michaelfjones.com`).

---

## 9) Accessibility, Motion & Micro-Interactions

- Focus-visible rings use `--ring` (primary) for obvious focus states.
- Framer Motion applied sparingly on hero and section entrances.
- Cards lift subtly on hover; buttons have soft gradient glow.

---

## 10) Domain & Copy Updates

- Replaced content references of `michaeljones.dev` → `michaelfjones.com`.
- Adjusted README to reflect project name and live site domain.
- Updated email and social links throughout.

---

## 11) Deployment Guidance (Vercel)

Root cause of 404 NOT_FOUND encountered
- Vercel built the repo root (no Next app there) instead of `web/`, producing a deployment with no app routes, leading to Vercel’s generic 404.

Fix
- Vercel → Project Settings → General → Root Directory → set to `web` → Redeploy.
- Add env vars in Vercel → Settings → Environment Variables:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`

Why this matters
- Next.js apps in a subfolder require Root Directory set so the builder runs in the right context.

---

## 12) Git Push Troubleshooting (Summary)

- Local `main` was ahead of `origin/main`. Push failures typically stem from:
  - Auth/PAT issues → Re-authenticate; clear Keychain entry if on macOS; push again.
  - Branch protection on `main` → Push feature branch and PR; or relax protection.
  - Wrong remote URL or permissions → Verify remote; fix with `git remote set-url`.

---

## 13) Files Changed (Highlights)

- Layout & Theme
  - `web/src/app/layout.tsx` — background layers; dark mode root; metadata base
  - `web/src/app/globals.css` — palette variables; gradient text utility; radii/shadows
- Navigation & Footer
  - `web/src/components/nav.tsx` — glassy navbar; brand; links updated
  - `web/src/components/footer.tsx` — frosted footer
- Home Page
  - `web/src/app/page.tsx` — hero redesign; motion; CTA; client component
- Projects
  - `web/src/data/projects.ts` — data + image paths + live URL
  - `web/src/components/project-card.tsx` — media cover; full-card link; removed footer links
  - `web/src/app/projects/page.tsx` — server page + metadata
  - `web/src/app/projects/projects-client.tsx` — client filters + grid
  - `web/src/app/projects/[slug]/page.tsx` — dynamic details route
- About
  - `web/src/app/about/page.tsx` — redesigned sections + CTAs
- Contact
  - `web/src/app/contact/page.tsx` — functional form + API submission
  - `web/src/app/api/contact/route.ts` — Resend email sending
- Public assets
  - Placeholder images in `web/public/images/` (kat.png, dash-1.jpg, mj.jpg)
  - Optional `web/public/noise.svg` for grain overlay

---

## 14) What’s Next (Suggested Roadmap)

- Verify email domain in Resend; switch `CONTACT_FROM_EMAIL` to `@michaelfjones.com`.
- Add logo strip and subtle hero shine for further polish.
- Build `/projects/[slug]` richer case studies (MDX content + image gallery).
- Optional: add rate limiting on `/api/contact` (e.g., Upstash Ratelimit) if needed.
- Consider a minimal blog (MDX) and sitemap/robots for SEO polish.

---

## 15) Quick Start (Local)

```bash
cd web
npm install
npm run dev
# Ensure .env.local contains RESEND_API_KEY and contact emails
```

## 16) Quick Start (Vercel)

- Settings → General → Root Directory = `web`
- Settings → Environment Variables: add the three contact variables
- Redeploy; test `/contact`

---

This context file is intended to be a living artifact. If you change design tokens, routes, or email provider, append a new dated section here rather than overwriting history.
