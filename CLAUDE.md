# CLAUDE.md — HX AI Hub

This file is read automatically by Claude Code. It describes the project, its conventions, and how to work with the codebase.

---

## What is this?

HX AI Hub is an internal knowledge hub for Holiday Extras. It covers AI news, internal AI initiatives, model releases, and an AI tooling directory. Content is managed by bot agents via a REST API. Human employees access the site via Google SSO (restricted to `@holidayextras.com`).

**Live URL:** https://hxaipage.vercel.app
**Repo:** https://github.com/d-lee01/hx-ai-hub

---

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 (PostCSS plugin, no tailwind.config — uses CSS-first config in `globals.css`)
- **Database:** PostgreSQL via Prisma ORM (Neon in production, local Postgres in dev)
- **Auth:** NextAuth.js v5 (beta) with Google OAuth + Prisma adapter
- **Validation:** Zod v4
- **Hosting:** Vercel (auto-deploys from `main` branch)

---

## Project structure

```
prisma/schema.prisma        # Database models — source of truth for all tables
prisma/migrations/          # Prisma migration history (committed)
prompts/                    # System prompts for bot agents
scripts/provision-bot.ts    # CLI to create new API clients
src/
  app/
    (auth)/                 # Sign-in and error pages
    (main)/                 # Content pages — news, at-hx, tools, model-releases
    api/auth/               # NextAuth route handler
    api/bot/pages/          # Bot REST API (CRUD for pages)
    skills.md/route.ts      # Bot skills/editorial reference (served as markdown)
    globals.css             # All CSS variables, custom classes, Tailwind theme
  components/
    layout/                 # TopNav, Footer, PageShell, MobileMenu, Providers
    sections/               # ToolGrid (filterable tool directory)
    ui/                     # Reusable UI: Badge, GlassCard, GlassButton, SectionCard,
                            #   AuthorByline, MarkdownProse, CapabilityPill, etc.
  lib/
    api/bot-auth.ts         # Bearer token auth for bot API
    api/validation.ts       # Zod schemas for page create/update
    auth/auth.ts            # NextAuth config (Google provider, domain restriction)
    db/prisma.ts            # Prisma singleton
    db/queries.ts           # Database query helpers
    constants.ts            # SECTIONS map, CAPABILITIES list
```

---

## Content sections

| Section          | Enum value       | URL prefix          | Voice                            |
|------------------|------------------|---------------------|----------------------------------|
| AI News          | `NEWS`           | `/news/`            | Factual, concise, neutral        |
| AI at HX         | `AT_HX`          | `/at-hx/`           | Warm, celebratory, accessible    |
| HX AI Tools      | `TOOLS`          | `/tools/`           | Practical, structured, scannable |
| Model Releases   | `MODEL_RELEASES` | `/model-releases/`  | Technical but accessible         |

---

## Key conventions

### Styling
- All custom CSS variables and theme colours are defined in `src/app/globals.css` (no `tailwind.config` file — Tailwind v4 uses CSS-first config)
- Glass-morphism design: use `glass-panel`, `hover-lift`, `gradient-text` utility classes
- Section colours: `--section-news`, `--section-athx`, `--section-tools`, `--section-models`

### Database
- Always run `npx prisma migrate dev --name <description>` for schema changes
- Production migrations: `DATABASE_URL=<neon-url> npx prisma migrate deploy`
- Use `npx prisma generate` after pulling new migrations
- Prisma singleton in `src/lib/db/prisma.ts` prevents hot-reload connection leaks

### API routes
- Bot API lives at `/api/bot/pages` — all endpoints require Bearer token auth
- Auth middleware is in `src/lib/api/bot-auth.ts`
- Validation schemas are in `src/lib/api/validation.ts` — update these when adding fields
- The skills reference at `/skills.md` is the bot's source of truth — keep it in sync with the API

### Markdown extensions
The `MarkdownProse` component (`src/components/ui/MarkdownProse.tsx`) is a `"use client"` component that parses custom `:::` block syntax:
- `:::dropdown Title` — collapsible section
- `:::button Label | URL | variant` — styled link (variants: purple, blue, teal, ghost)
- `:::callout style` — highlighted notice (styles: info, warning, tip, success)
- `:::tabs` / `:::tab Title` — tabbed content
- `:::steps` / `:::step Title` — numbered steps

### Auth
- Google OAuth restricted to `@holidayextras.com` in production
- Set `ALLOW_ALL_DOMAINS=true` in `.env.local` to bypass domain restriction in dev
- NextAuth config: `src/lib/auth/auth.ts`

### Author byline
- Pages have an optional `author` field (string)
- `AuthorByline` component resolves author name → Google profile image from the `users` table
- Falls back to a coloured initial circle if no matching user is found
- Bot agents send author as a JSON field, not in the markdown body

---

## Environment variables

Create `.env.local` with:

```
DATABASE_URL="postgresql://<user>@localhost:5432/hxaihub?schema=public"
GOOGLE_CLIENT_ID="<from Google Cloud Console>"
GOOGLE_CLIENT_SECRET="<from Google Cloud Console>"
NEXTAUTH_SECRET="<random string — run: openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
ALLOW_ALL_DOMAINS="true"
```

Production env vars are managed in the Vercel dashboard — never commit secrets.

---

## Common tasks

### Run locally
```bash
npm install
npx prisma migrate dev      # apply migrations to local DB
npm run dev                  # start dev server at localhost:3000
```

### Add a new field to Page
1. Edit `prisma/schema.prisma`
2. Add field to Zod schema in `src/lib/api/validation.ts`
3. Run `npx prisma migrate dev --name <description>`
4. Update `src/app/skills.md/route.ts` (bot API docs)
5. Update `prompts/content-agent.md` if it affects bot behaviour

### Provision a new bot API client
```bash
npm run provision-bot <bot-name>
# Prints API key once — save it immediately
```

### Deploy
Push to `main` — Vercel auto-deploys. For DB migrations against production:
```bash
npx vercel env pull .env.production.local --environment production
DATABASE_URL=<neon-url> npx prisma migrate deploy
rm .env.production.local
```

---

## Guardrails

- `DELETE /api/bot/pages/<slug>` archives (sets `published=false`) — never deletes data
- Always `GET` before `PUT` — never blindly overwrite page content
- Never commit `.env*` files (already in `.gitignore`)
- The `provision-bot` script prints API keys once — they are hashed and not retrievable later
