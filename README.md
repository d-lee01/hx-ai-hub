# HX AI Hub

Internal AI knowledge hub for Holiday Extras — covering AI news, internal initiatives, model releases, and an AI tooling directory.

**Live site:** https://hxaipage.vercel.app

---

## How it works

- **Content** is created and managed by bot agents via a REST API — you don't edit content in this repo
- **Layout, styling, and components** are in this repo — edit files here, push to `main`, and the live site updates automatically via Vercel
- **Employees** access the site by signing in with their `@holidayextras.com` Google account

---

## Making changes

This repo is connected to Vercel. Every push to `main` automatically deploys to the live site within ~60 seconds.

```
Edit files → Commit → Push to main → Live site updates
```

You do not need to run the site locally. You do not need a Vercel account. Just push to this repo.

For details on which files control what, see [`CLAUDE.md`](./CLAUDE.md) — this is also read automatically by Claude Code for AI-assisted development.

---

## Quick reference — what to edit

| I want to change... | Edit this file |
|---------------------|----------------|
| Colours, fonts, visual effects | `src/app/globals.css` |
| Navigation bar | `src/components/layout/TopNav.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Page wrapper / layout | `src/components/layout/PageShell.tsx` |
| Article cards on list pages | `src/components/ui/SectionCard.tsx` |
| Tool cards on the tools page | `src/components/ui/ToolCard.tsx` |
| Individual article layout | `src/app/(main)/<section>/[slug]/page.tsx` |
| How markdown content renders | `src/components/ui/MarkdownProse.tsx` |
| Author byline appearance | `src/components/ui/AuthorByline.tsx` |
| Sign-in page | `src/app/(auth)/auth/signin/page.tsx` |

See [`CLAUDE.md`](./CLAUDE.md) for the full file map.

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Neon) via Prisma ORM |
| Auth | NextAuth.js v5 + Google OAuth |
| Hosting | Vercel (auto-deploys from `main`) |

---

## Project structure

```
src/
  app/
    globals.css              # Theme — all colours, fonts, effects
    (auth)/                  # Sign-in and error pages
    (main)/                  # Content pages (news, at-hx, tools, model-releases)
    api/                     # Bot REST API (managed by project owner)
  components/
    layout/                  # TopNav, Footer, PageShell, MobileMenu
    sections/                # ToolGrid (filterable tool directory)
    ui/                      # Reusable components (cards, badges, buttons, etc.)
  lib/                       # Database, auth, API internals (managed by project owner)
prisma/                      # Database schema (managed by project owner)
prompts/                     # Bot agent prompts (managed by project owner)
```

---

## Content management

Content (articles, tool pages) is **not** managed through this repo. It is managed by bot agents via the REST API at `/api/bot/pages`. Employees can submit content by speaking to the content bot — no code changes needed.

API documentation: https://hxaipage.vercel.app/skills.md

---

## Local development (optional)

Most changes can be made by editing files and pushing. If you need to run locally:

1. Install Node.js 18+ and PostgreSQL
2. `cp .env.example .env.local` and fill in credentials (ask the project owner)
3. `npm install && npx prisma migrate dev`
4. `npm run dev` → http://localhost:3000

---

## Contact

Project owner: David Lee — manages the database, Vercel hosting, bot agents, and API.
