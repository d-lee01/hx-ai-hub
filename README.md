# HX AI Hub

Internal AI knowledge hub for Holiday Extras — covering AI news, internal initiatives, model releases, and an AI tooling directory.

**Live:** https://hxaipage.vercel.app

---

## Overview

HX AI Hub is a content platform with four sections:

- **AI News** — curated AI industry news
- **AI at HX** — stories about what HX teams are doing with AI
- **HX AI Tools** — filterable directory of AI tools available to staff
- **Model Releases** — coverage of new AI model launches

Content is managed by bot agents via a REST API. Employees access the site by signing in with their `@holidayextras.com` Google account.

---

## Tech stack

| Layer      | Technology                                      |
|------------|------------------------------------------------|
| Framework  | Next.js 16 (App Router) + React 19             |
| Styling    | Tailwind CSS v4                                 |
| Database   | PostgreSQL (Neon in production) via Prisma ORM  |
| Auth       | NextAuth.js v5 + Google OAuth                   |
| Validation | Zod                                             |
| Hosting    | Vercel                                          |

---

## Getting started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a remote connection string)

### 1. Clone and install

```bash
git clone https://github.com/d-lee01/hx-ai-hub.git
cd hx-ai-hub
npm install
```

### 2. Set up environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://<user>@localhost:5432/hxaihub?schema=public"
GOOGLE_CLIENT_ID="<from Google Cloud Console>"
GOOGLE_CLIENT_SECRET="<from Google Cloud Console>"
NEXTAUTH_SECRET="<run: openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"
ALLOW_ALL_DOMAINS="true"
```

> **`ALLOW_ALL_DOMAINS`** — set to `"true"` for local dev to bypass the `@holidayextras.com` email restriction. In production this is `false` (or absent).

#### Google OAuth credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/) > APIs & Services > Credentials
2. Create an OAuth 2.0 Client ID (Web application)
3. Add `http://localhost:3000/api/auth/callback/google` as an authorised redirect URI
4. Copy the Client ID and Client Secret into your `.env.local`

### 3. Set up the database

```bash
createdb hxaihub                  # create the local database (if it doesn't exist)
npx prisma migrate dev            # apply all migrations
```

### 4. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 — you'll be redirected to the sign-in page.

---

## Project structure

```
prisma/
  schema.prisma              # Database models (source of truth)
  migrations/                # Migration history
prompts/
  content-agent.md           # System prompt for the content bot
scripts/
  provision-bot.ts           # CLI to create bot API clients
src/
  app/
    (auth)/                  # Sign-in and auth error pages
    (main)/                  # Content pages (news, at-hx, tools, model-releases)
    api/auth/                # NextAuth handler
    api/bot/pages/           # Bot REST API
    skills.md/               # Bot editorial reference (served as markdown)
    globals.css              # Theme, variables, all custom CSS
  components/
    layout/                  # TopNav, Footer, PageShell, MobileMenu
    sections/                # ToolGrid (filterable directory)
    ui/                      # Reusable components (Badge, GlassCard, MarkdownProse, etc.)
  lib/
    api/                     # Bot auth middleware + Zod validation schemas
    auth/                    # NextAuth configuration
    db/                      # Prisma client singleton + query helpers
    constants.ts             # Section metadata, capability tags
```

---

## Bot API

Content is managed programmatically via the REST API at `/api/bot/pages`.

All requests require a Bearer token:

```
Authorization: Bearer hxai_<key>
```

| Method   | Endpoint                  | Description          |
|----------|---------------------------|----------------------|
| `GET`    | `/api/bot/pages`          | List pages (filterable by section, capability, published) |
| `POST`   | `/api/bot/pages`          | Create a page        |
| `GET`    | `/api/bot/pages/:slug`    | Get a single page    |
| `PUT`    | `/api/bot/pages/:slug`    | Update a page        |
| `DELETE` | `/api/bot/pages/:slug`    | Archive a page       |

Full API documentation (including field specs, extensions, and editorial guidelines) is served at:
**https://hxaipage.vercel.app/skills.md**

### Provisioning a bot

```bash
npm run provision-bot <bot-name>
```

This prints an API key once — save it immediately as it cannot be retrieved later.

---

## Markdown extensions

The body field supports custom rich content blocks using `:::` fence syntax:

| Extension   | Syntax                              | Purpose                     |
|-------------|-------------------------------------|-----------------------------|
| Dropdown    | `:::dropdown Title` ... `:::`       | Collapsible section         |
| Button      | `:::button Label \| URL \| variant` | Styled link                 |
| Callout     | `:::callout style` ... `:::`        | Highlighted notice          |
| Tabs        | `:::tabs` + `:::tab Title` ... `:::` | Tabbed content panels      |
| Steps       | `:::steps` + `:::step Title` ... `:::`| Numbered guide            |

See the [skills reference](https://hxaipage.vercel.app/skills.md) for full syntax and examples.

---

## Deployment

The site auto-deploys from the `main` branch via Vercel.

### Database migrations (production)

```bash
# Pull production env vars temporarily
npx vercel env pull .env.production.local --environment production

# Run migrations against production Neon DB
DATABASE_URL=<neon-url> npx prisma migrate deploy

# Clean up
rm .env.production.local
```

---

## Contributing

See [`CLAUDE.md`](./CLAUDE.md) for detailed conventions, patterns, and common tasks. That file is also read automatically by Claude Code for AI-assisted development.
