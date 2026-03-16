# CLAUDE.md — HX AI Hub

This file is read automatically by Claude Code. It contains the rules for working with this project.

---

## IMPORTANT — Protected files (DO NOT MODIFY)

**The following files and directories MUST NOT be created, edited, deleted, or moved.** They control the database, API, authentication, and bot integrations. Modifying them will break the live site or the bot agents that publish content. If a user asks for a change that would require editing these files, explain that it needs the project owner (David Lee) and stop.

**Protected paths — never modify:**

- `prisma/` — entire directory (database schema and migrations)
- `src/app/api/` — entire directory (bot REST API)
- `src/lib/auth/` — entire directory (Google login configuration)
- `src/lib/api/` — entire directory (API validation and security)
- `src/lib/db/` — entire directory (database connection and queries)
- `src/app/skills.md/` — entire directory (bot editorial reference)
- `prompts/` — entire directory (bot agent instructions)
- `scripts/` — entire directory (database admin scripts)
- `.env*` — any environment files (contain secrets — never create, edit, read, or commit these)

**Also never:**
- Run any `prisma` commands
- Run any `npm run provision-bot` commands
- Modify `package.json` dependencies
- Create new API routes in `src/app/api/`

---

## What is this project?

HX AI Hub is an internal website for Holiday Extras that shows AI news, internal AI stories, AI tool recommendations, and model release coverage. The site is live at https://hxaipage.vercel.app.

**Content** (the articles and tool pages) is managed by a separate bot — not through this codebase. You don't need to worry about content at all.

**This codebase** controls how the site looks — the layout, colours, fonts, components, and pages. That's what's safe to change here.

---

## How changes go live

This repo is connected to Vercel. **Every push to `main` automatically deploys to the live site** within about 60 seconds. No extra steps, no Vercel login, no manual deploy.

The workflow:
1. Edit files in this repo
2. Commit and push to `main`
3. Wait ~60 seconds
4. Check the result at https://hxaipage.vercel.app

**You do not need to run the site locally.** Edit, push, and verify on the live URL.

---

## What you CAN change — and where to find it

### Colours, fonts, and visual effects

**File:** `src/app/globals.css`

This one file controls the entire look of the site. All colours are defined as CSS variables at the top:

- `--hx-purple`, `--hx-purple-light`, `--hx-purple-dark` — the main brand purple
- `--bg-primary`, `--bg-secondary` — page background colours
- `--text-primary`, `--text-secondary`, `--text-tertiary` — text colours
- `--glass-bg`, `--glass-border` — the frosted glass panel effect
- `--section-news`, `--section-athx`, `--section-tools`, `--section-models` — the accent colour for each section

To change the site's colour scheme, start here.

### Navigation and page layout

| What | File |
|------|------|
| Top navigation bar | `src/components/layout/TopNav.tsx` |
| Mobile menu (hamburger) | `src/components/layout/MobileMenu.tsx` |
| Page wrapper (holds nav + content + footer) | `src/components/layout/PageShell.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Root HTML shell (font, page title) | `src/app/layout.tsx` |

### Article list pages (the page showing all articles in a section)

| Section | Page file | Card component used |
|---------|-----------|---------------------|
| AI News | `src/app/(main)/news/page.tsx` | `src/components/ui/SectionCard.tsx` |
| AI at HX | `src/app/(main)/at-hx/page.tsx` | `src/components/ui/SectionCard.tsx` |
| Model Releases | `src/app/(main)/model-releases/page.tsx` | `src/components/ui/SectionCard.tsx` |
| AI Tools | `src/app/(main)/tools/page.tsx` | `src/components/ui/ToolCard.tsx` |

### Individual article pages (the full article view)

| Section | Page file |
|---------|-----------|
| AI News | `src/app/(main)/news/[slug]/page.tsx` |
| AI at HX | `src/app/(main)/at-hx/[slug]/page.tsx` |
| Model Releases | `src/app/(main)/model-releases/[slug]/page.tsx` |
| AI Tools | `src/app/(main)/tools/[slug]/page.tsx` |

### UI components (reusable building blocks)

All in `src/components/ui/`:

| Component | What it is |
|-----------|-----------|
| `SectionCard.tsx` | The card shown for each article on list pages |
| `ToolCard.tsx` | The card shown for each tool on the tools page |
| `GlassCard.tsx` | The main content container on article pages |
| `GlassButton.tsx` | Styled button / link |
| `Badge.tsx` | The coloured label that says "AI News", "AI Tool", etc. |
| `CapabilityPill.tsx` | The small tag on tools (e.g. "Chat", "Code") |
| `CapabilityFilter.tsx` | The filter bar at the top of the tools page |
| `AuthorByline.tsx` | The author's name and profile photo on articles |
| `MarkdownProse.tsx` | Renders article body text (including dropdowns, tabs, callouts, etc.) |
| `ScrollReveal.tsx` | Makes content fade in as you scroll down |
| `OrbField.tsx` | The animated background blobs on the sign-in page |

### Sign-in page

| Page | File |
|------|------|
| Sign-in page | `src/app/(auth)/auth/signin/page.tsx` |
| Error page (login failures) | `src/app/(auth)/auth/error/page.tsx` |

### Tools directory (filtering)

The tools page has a special filterable grid. The filter logic and grid layout are in:
- `src/components/sections/ToolGrid.tsx`
- `src/components/ui/CapabilityFilter.tsx`

### Section metadata

The names, URL paths, and colours for each section are defined in:
- `src/lib/constants.ts`

This file is safe to edit for cosmetic changes (labels, display names) but do not add or remove sections without the project owner.

---

## How markdown extensions look

Article content can include special blocks (dropdowns, buttons, callouts, tabs, numbered steps). These are rendered by `src/components/ui/MarkdownProse.tsx` and styled with classes in `src/app/globals.css` prefixed with `ext-`.

To change how these look, edit the CSS classes in `globals.css` or the JSX in `MarkdownProse.tsx`.

---

## Tech stack (for reference)

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 — configured via CSS in `globals.css` (there is no `tailwind.config` file)
- **Hosting:** Vercel — auto-deploys every push to `main`

---

## The four content sections

| Section | Live URL | What it shows |
|---------|----------|---------------|
| AI News | `/news/` | AI industry news |
| AI at HX | `/at-hx/` | What HX teams are doing with AI |
| AI Tools | `/tools/` | Directory of AI tools (filterable) |
| Model Releases | `/model-releases/` | New AI model launches |
