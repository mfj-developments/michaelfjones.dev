# 🌐 Michael Jones — Portfolio & Project Showcase

**Live Site:** _Coming soon on [michaelfjones.com](https://michaelfjones.com)_  
**Author:** Michael F. Jones  
**Location:** Fayetteville, Arkansas  
**Email:** [mfjdevelopments@gmail.com](mailto:mfjdevelopments@gmail.com)  
**LinkedIn:** [linkedin.com/in/michael-jones-58a03124b](https://www.linkedin.com/in/michael-jones-58a03124b/)  
**GitHub:** [github.com/mj850-turbo](https://github.com/mj850-turbo)

---

## 🎯 Purpose

This repository powers my **personal developer portfolio website** — a space to:
- Present who I am as a **frontend-focused full-stack developer**.
- Showcase **production-grade web projects** built with modern tools (React, Next.js, Supabase).
- Provide direct access to my **resume**, **LinkedIn**, and **GitHub**.
- Share technical learnings and reflections through a lightweight **blog**.

The site is designed to serve as both a **personal brand** and a **proof of competency** for employers, recruiters, and collaborators in the **Northwest Arkansas tech community**.

---

## 🧠 Project Overview

| Category | Details |
|-----------|----------|
| **Project Name** | michaelfjones.com |
| **Type** | Portfolio / Personal Website |
| **Primary Goal** | Establish a public, credible developer presence |
| **Target Audience** | Recruiters, engineering managers, local clients |
| **Tech Focus** | React, Next.js, TypeScript, Supabase, Tailwind |
| **Hosting** | Vercel |
| **Status** | 🚧 In active development |
| **Initial Release Target** | Q4 2025 |

---

## 🧩 Tech Stack

### Core Framework
- **Next.js 14+ (App Router)**
  - Static site generation (SSG) for performance
  - Server components for clean data loading
  - Route metadata for SEO and Open Graph

### Languages
- **TypeScript** — for static typing and maintainability  
- **JavaScript (ES6+)** — core runtime  
- **Markdown / MDX** — for blog content  

### Styling
- **Tailwind CSS** — utility-first styling  
- **ShadCN/UI** — accessible UI primitives  
- **Framer Motion** — subtle animations and transitions  

### Backend & Data
- **Supabase (optional)** — Auth, DB, and form storage  
- **Static JSON / MDX** — for simplicity in early stages  

### Tools & Platforms
- **Vercel** — hosting & CI/CD  
- **GitHub Actions** — lint + build checks  
- **ESLint / Prettier** — consistent formatting  
- **Plausible / Vercel Analytics** — privacy-focused insights  

---

## 🧱 Repository Structure

```
/ (root)
├─ .github/workflows/ci.yml
├─ public/
│  ├─ resume.pdf
│  ├─ images/
│  └─ og/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx                # Home
│  │  ├─ about/page.tsx
│  │  ├─ projects/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ blog/page.tsx           # optional
│  │  └─ layout.tsx
│  ├─ components/
│  ├─ data/projects.json
│  ├─ lib/
│  ├─ styles/
│  └─ types/
├─ package.json
├─ tailwind.config.ts
├─ tsconfig.json
└─ README.md
```

---

## 🚀 Setup & Development

### Prerequisites
- Node.js ≥ 20.x  
- npm ≥ 9.x  
- Git  

### Installation
```bash
git clone https://github.com/michaelfjones/michaeljones.dev.git
cd michaeljones.dev
npm install
```

### Local Development
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

### Linting & Type Checking
```bash
npm run lint
npm run typecheck
```

---

## 📄 Pages Overview

### `/` — **Home**
- Hero section with name, tagline, and location (Fayetteville, AR)
- CTA buttons for Projects / Resume / Contact
- Featured Projects grid (3 cards)
- Tech & Tools strip

### `/about`
- Short biography & headshot
- Quick facts: education, experience, skills
- Timeline: Turbo Labs → UArk → Leadership
- Core principles and tech philosophy

### `/projects`
- Data-driven gallery of projects
- Filter by stack or category
- Each card includes screenshot, stack badges, and links
- Optional case study detail pages (`/projects/[slug]`)

### `/contact`
- Form: name, email, message (Supabase or Formspree)
- Fallback `mailto:` link
- Alt contact buttons (LinkedIn, GitHub, Resume)

### `/blog` *(optional)*
- Articles written in MDX
- Tags, reading time, date metadata
- Pagination & social sharing

---

## 📸 Projects To Feature

| Project | Description | Stack | Status |
|----------|--------------|--------|--------|
| **Kat’s Interiors Web Presence** | Responsive marketing site for a local business | Next.js, Tailwind, Supabase | 🚧 Planned |
| **Personal Dashboard / Tracker** | Authenticated app for tracking habits or finances | Next.js, Supabase, Charts.js | 🏗️ Building |
| **Portfolio Website** | This site itself — clean UI + modern tooling | Next.js, Tailwind, ShadCN | ✅ In progress |

---

## 🧰 Components Inventory

- `Nav` / `MobileNav`
- `Footer`
- `HeroSection`
- `ProjectCard`
- `ProjectFilters`
- `ContactForm`
- `TechBadge`
- `SectionWrapper`
- `PageHeader`
- `MDXComponents` (blog)

---

## 🧮 CI/CD Workflow

1. **Branching** — `main` → prod; feature branches → PRs  
2. **CI (GitHub Actions)** — lint, typecheck, build  
3. **Preview Deploys** — Vercel auto-builds PRs  
4. **Merge to Main** — triggers production deployment  
5. **Analytics & monitoring** — checked via dashboard  

---

## 🎨 Design System

- **Font:** Inter / Manrope (Google Fonts)  
- **Colors:** Neutral base (`zinc` / `slate`) + accent (e.g., teal or amber)  
- **Layout:** 2xl max-width, 4–6rem vertical rhythm  
- **Shapes:** `rounded-2xl`, soft shadows  
- **Motion:** Framer Motion for fade/slide transitions  
- **Dark Mode:** future stretch goal  

---

## 🧭 Roadmap

| Milestone | Description | Status |
|------------|-------------|--------|
| M0 | Init project + CI/CD | ✅ Complete |
| M1 | Layout + Navigation | 🏗️ In progress |
| M2 | Home page + featured projects | 🏗️ In progress |
| M3 | About page content | 🔜 |
| M4 | Projects data + filtering | 🔜 |
| M5 | Contact form + Supabase integration | 🔜 |
| M6 | Resume + SEO polish | 🔜 |
| M7 | Blog (optional) | 🔜 |
| M8 | Final QA + deployment | 🔜 |

---

## 🧪 Quality & Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Visible focus states
- `aria-label`s for icons
- Lighthouse target scores:  
  - Performance ≥ 90  
  - Accessibility ≥ 95  
  - Best Practices ≥ 95  
  - SEO ≥ 95  

---

## 🌍 Deployment

This site is hosted on **Vercel**, automatically built from the `main` branch.  
Preview builds are available for every pull request via the GitHub → Vercel integration.

**Environment Variables (if Supabase enabled):**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # optional for API routes
```

**Environment Variables (contact email via Resend):**
```
# Required for sending email from /api/contact
RESEND_API_KEY=         # get from https://resend.com (project API key)

# Optional overrides (defaults below if not set)
CONTACT_TO_EMAIL=mfjdevelopments@gmail.com
CONTACT_FROM_EMAIL="Michael F. Jones <onboarding@resend.dev>"
```
The contact form at `/contact` submits to `/api/contact` and sends an email via Resend with Reply‑To set to the sender’s address.

---

## 📈 Analytics

Using **Vercel Analytics** (default) or optionally **Plausible.io** for:
- Page views & referrers
- Engagement duration
- Project link clicks
- No personal data collection

---

## 💬 Contributing

Although this is a personal portfolio, suggestions and improvements are welcome.

**Ways to Contribute:**
1. Fork the repository  
2. Create a new branch: `feat/new-component`  
3. Make edits  
4. Open a Pull Request describing changes  

---

## 🧩 Future Enhancements

- Dark mode toggle  
- CMS integration (Supabase Admin or Notion API)  
- RSS feed for blog  
- Project detail pages with screenshots and changelogs  
- Search + tag filtering for blog  
- Improved SEO schema with JSON-LD  

---

## 🛡️ License

MIT License © 2025 Michael F. Jones

---

## 🙌 Acknowledgments

- **Supabase** for making open-source backend tooling delightful.  
- **ShadCN/UI** for accessible React component primitives.  
- **Vercel** for making deployment seamless.  
- Mentors, professors, and peers at the **University of Arkansas College of Engineering**.  
- The **Turbo Labs** team for hands-on startup experience and inspiration.  

---

## 💬 Closing Notes

This site is a reflection of continuous learning and progress.  
It started as a simple project to “have a website,” but evolved into a personal standard for:
- building well-structured software,  
- showcasing clean design,  
- and blending **human creativity + AI tooling** effectively.

If you’re hiring in **NWA** or looking for collaboration, feel free to reach out —  
I’d love to chat about development, design, or building something new.

> “Craft with intention. Iterate with curiosity.” — M.J.
