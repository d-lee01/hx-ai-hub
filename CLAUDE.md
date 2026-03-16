# CLAUDE.md — HX AI Hub

This file is read automatically by Claude Code. It describes the project and how to make changes to the live site.

---

## What is this?

HX AI Hub is an internal knowledge hub for Holiday Extras — covering AI news, internal initiatives, model releases, and an AI tooling directory. Content is created by bot agents via API. Employees access the site via Google SSO.

**Live site:** https://hxaipage.vercel.app
**Repo:** https://github.com/d-lee01/hx-ai-hub

---

## How deployment works

This repo is connected to Vercel. **Every push to `main` automatically deploys to the live site.** No extra steps needed — no Vercel login, no manual deploy. Just push and wait ~60 seconds.

The workflow for any change is:

1. Edit files in this repo
2. Commit and push to `main`
3. Vercel builds and deploys automatically
4. Check the live site at https://hxaipage.vercel.app

**You do not need to run the site locally to make changes.** Edit, push, and verify on the live URL.

---

## Changing the look and feel

These are the files that control what the site looks like. You do not need to touch the database, API, or auth system to change layout and styling.

### Theme and colours — `src/app/globals.css`

All colours, spacing, and visual effects are defined as CSS variables at the top of this file. This is the single source of truth for the site's appearance.

Key variables:
- `--hx-purple`, `--hx-purple-light`, `--hx-purple-dark` — brand colours
- `--bg-primary`, `--bg-secondary` — page backgrounds
- `--text-primary`, `--text-secondary`, `--text-tertiary` — text colours
- `--glass-bg`, `--glass-border` — glass-morphism panel styling
- `--section-news`, `--section-athx`, `--section-tools`, `--section-models` — section accent colours

Custom utility classes (used throughout components):
- `glass-panel` — frosted glass card effect
- `hover-lift` — subtle lift on hover
- `gradient-text` — purple gradient heading text
- `animate-fade-in-up` — entrance animation

**To change the site's colour scheme, fonts, or visual feel — start here.**

### Page layout and navigation

| What | File |
|------|------|
| Top navigation bar | `src/components/layout/TopNav.tsx` |
| Mobile hamburger menu | `src/components/layout/MobileMenu.tsx` |
| Page wrapper (nav + content + footer) | `src/components/layout/PageShell.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Session/auth provider wrapper | `src/components/layout/Providers.tsx` |
| Root HTML layout (font, metadata) | `src/app/layout.tsx` |

### Content pages — what each section looks like

**List pages** (the index of articles in each section):

| Section | List page | Card component |
|---------|-----------|----------------|
| AI News | `src/app/(main)/news/page.tsx` | `src/components/ui/SectionCard.tsx` |
| AI at HX | `src/app/(main)/at-hx/page.tsx` | `src/components/ui/SectionCard.tsx` |
| Model Releases | `src/app/(main)/model-releases/page.tsx` | `src/components/ui/SectionCard.tsx` |
| HX AI Tools | `src/app/(main)/tools/page.tsx` | `src/components/ui/ToolCard.tsx` + `src/components/sections/ToolGrid.tsx` |

**Detail pages** (individual article view):

| Section | Detail page |
|---------|-------------|
| AI News | `src/app/(main)/news/[slug]/page.tsx` |
| AI at HX | `src/app/(main)/at-hx/[slug]/page.tsx` |
| Model Releases | `src/app/(main)/model-releases/[slug]/page.tsx` |
| HX AI Tools | `src/app/(main)/tools/[slug]/page.tsx` |

### Reusable UI components — `src/components/ui/`

| Component | What it does |
|-----------|-------------|
| `SectionCard.tsx` | Article card on list pages (title, date, excerpt, author) |
| `ToolCard.tsx` | Tool card on the tools directory page |
| `GlassCard.tsx` | Generic glass-morphism container used on detail pages |
| `GlassButton.tsx` | Styled button/link |
| `Badge.tsx` | Coloured section label (e.g. "AI News", "AI Tool") |
| `CapabilityPill.tsx` | Tag pill for tool capabilities (e.g. "Chat", "Code") |
| `CapabilityFilter.tsx` | Filter bar on the tools page |
| `AuthorByline.tsx` | Author name + Google profile photo (or initial circle) |
| `MarkdownProse.tsx` | Renders article body markdown including custom `:::` extensions |
| `ScrollReveal.tsx` | Scroll-triggered fade-in animation wrapper |
| `OrbField.tsx` | Animated background orbs on the sign-in page |

### Sign-in and error pages

| Page | File |
|------|------|
| Sign-in page | `src/app/(auth)/auth/signin/page.tsx` |
| Auth error page | `src/app/(auth)/auth/error/page.tsx` |

---

## Things you should NOT change without the project owner

These areas affect the database, API, authentication, or bot integrations. Changes here can break the live site's data layer or the bot agents that publish content.

- `prisma/schema.prisma` — database schema (requires migration against production DB)
- `src/app/api/` — bot REST API endpoints
- `src/lib/auth/` — Google OAuth / NextAuth configuration
- `src/lib/api/` — API validation and authentication middleware
- `src/app/skills.md/route.ts` — bot editorial reference (bots read this to know how to write content)
- `prompts/` — bot agent system prompts
- `scripts/` — database provisioning scripts
- `.env*` files — secrets (never commit these)

If a change requires a new database field or API modification, coordinate with the project owner (David Lee) who has access to the production database and Vercel hosting.

---

## Tech stack (reference)

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 (CSS-first config in `globals.css` — there is no `tailwind.config` file)
- **Database:** PostgreSQL via Prisma ORM (Neon in production)
- **Auth:** NextAuth.js v5 + Google OAuth (restricted to `@holidayextras.com`)
- **Hosting:** Vercel (auto-deploys from `main`)

---

## Project structure (full reference)

```
prisma/
  schema.prisma              # Database models (DO NOT edit without project owner)
  migrations/                # Migration history
prompts/
  content-agent.md           # Bot system prompt (DO NOT edit without project owner)
scripts/
  provision-bot.ts           # Bot API key creation script
src/
  app/
    (auth)/                  # Sign-in and auth error pages
    (main)/                  # Content pages — news, at-hx, tools, model-releases
    api/                     # Bot REST API (DO NOT edit without project owner)
    skills.md/               # Bot editorial reference
    globals.css              # THEME — all colours, fonts, effects
    layout.tsx               # Root HTML layout
    page.tsx                 # Home (redirects to /news)
  components/
    layout/                  # TopNav, Footer, PageShell, MobileMenu
    sections/                # ToolGrid (filterable tool directory)
    ui/                      # All reusable UI components
  lib/
    api/                     # API middleware (DO NOT edit without project owner)
    auth/                    # Auth config (DO NOT edit without project owner)
    db/                      # Database queries
    constants.ts             # Section metadata, capability tags
```

---

## Content sections

| Section | URL | Description |
|---------|-----|-------------|
| AI News | `/news/` | Curated AI industry news |
| AI at HX | `/at-hx/` | Internal HX AI stories |
| HX AI Tools | `/tools/` | Filterable directory of AI tools |
| Model Releases | `/model-releases/` | New AI model launches |

---

## Markdown extensions (body content)

Article bodies support custom rich content blocks using `:::` fence syntax. These are parsed by `MarkdownProse.tsx`:

| Extension | Syntax | Purpose |
|-----------|--------|---------|
| Dropdown | `:::dropdown Title` ... `:::` | Collapsible section |
| Button | `:::button Label \| URL \| variant` | Styled link (variants: purple, blue, teal, ghost) |
| Callout | `:::callout style` ... `:::` | Highlighted notice (styles: info, warning, tip, success) |
| Tabs | `:::tabs` + `:::tab Title` ... `:::` | Tabbed content panels |
| Steps | `:::steps` + `:::step Title` ... `:::` | Numbered step-by-step guide |

To change how these render visually, edit `MarkdownProse.tsx` and the corresponding CSS classes in `globals.css` (prefixed with `ext-`).

---

## Local development (advanced — only if needed)

Most changes can be made by editing files and pushing to `main`. If you do need to run the site locally:

1. Install Node.js 18+ and PostgreSQL
2. `cp .env.example .env.local` and fill in credentials (ask the project owner)
3. `npm install`
4. `npx prisma migrate dev`
5. `npm run dev` → http://localhost:3000
