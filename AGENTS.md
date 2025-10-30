# Repository Guidelines

## Project Structure & Module Organization
- All buildable code lives in `web/`. Routes sit in `web/src/app`, reusable UI and theme helpers in `web/src/components`, and project metadata in `web/src/data/projects.ts`.
- Utilities, shared types, and static assets live in `web/src/lib`, `web/src/types`, and `web/public`. Treat `context-mds/` as the canonical history; append context rather than replacing it.

## Build, Test, and Development Commands
- From `web/`, run `npm install`, `npm run dev`, `npm run build`, and `npm start` (Node 20+ required).
- `npm run lint` and `npm run typecheck` mirror CI; run both before every PR. Configure `.env.local` with `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` whenever you modify `/api/contact`.

## Coding Style & Naming Conventions
- Use TypeScript React function components with explicit props, 2-space indentation, PascalCase components, and camelCase helpers.
- Tailwind plus CSS variables in `web/src/app/globals.css` drive theming—reference tokens such as `--primary` instead of hard-coded colors to keep palette switching reliable.

## Development Workflow
- Move work through the GitHub Project board (Backlog -> In Progress -> In Review -> Done) and keep tasks scoped to 1-2 focused days.
- All public references (nav icons, documentation) should use the primary account: `https://github.com/mfj-developments`.
- Branch per change (`feat/projects-drawer`, `fix/contact-errors`), push early for Vercel previews, and log noteworthy decisions in the relevant `context-mds/agent-*-context-*.md` file or `updates-plan.md`.

## Testing Guidelines
- Automated suites are pending; align with the roadmap by colocating new tests as `*.test.ts[x]` or Playwright smoke specs near the code they cover.
- Until that lands, rely on `npm run lint`, `npm run typecheck`, and manual QA of hero motion, theme switching, project filters, and contact happy/error paths. Record the steps and accessibility findings in PRs.

## Commit & Pull Request Guidelines
- Write short, imperative commit subjects (for example `tune hero badges`) and keep diffs single-purpose.
- Reference the linked issue or Project entry, update the status column, and include validation commands plus screenshots or clips for UI PRs.

## Architecture & Configuration Notes
- `ThemeProvider` and `theme-controls` own palette state; reuse them instead of new global stores. Project detail pages rely on `generateStaticParams`, so update `web/src/data/projects.ts` and `web/public/images` together.
- Secrets belong in `.env.local` and Vercel project settings (root directory stays `web`). Sanitize any new API inputs following the `web/src/app/api/contact/route.ts` pattern and avoid committing sensitive files outside `web/public`.
