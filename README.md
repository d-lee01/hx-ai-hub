# HX AI Hub

This is the codebase for the HX AI Hub website — an internal Holiday Extras site that shows AI news, tools, and stories.

**The live site:** https://hxaipage.vercel.app

---

## Who is this repo for?

You're here to make changes to how the site looks — things like colours, layout, fonts, the navigation bar, how article cards appear, etc.

You **don't** need to worry about:
- The articles and content (that's managed by a bot, not this code)
- The database or API (that's managed by the project owner)
- Logging in, accounts, or authentication (that's already set up)

---

## How to make changes

You don't need to install anything or run the site on your computer. Use Claude Code to make edits, then push to GitHub. The site updates automatically.

### The process

1. Open this repo in Claude Code
2. Describe what you want to change (e.g. "make the header background darker" or "add more spacing between the article cards")
3. Claude Code will edit the right files for you
4. Commit and push to `main`
5. Wait about 60 seconds
6. Check the live site at https://hxaipage.vercel.app to see your changes

That's it. Every push to `main` automatically updates the live site.

---

## What can I change?

Anything visual — colours, fonts, spacing, layout, wording on buttons, how cards look, the navigation, the footer, the sign-in page, animations, etc.

Claude Code knows which files control what (it reads the `CLAUDE.md` file in this repo automatically). Just describe what you want in plain English.

### Examples of things you can ask for

- "Change the purple brand colour to blue"
- "Make the article cards have more padding"
- "Add a subtitle under the page heading"
- "Make the navigation bar sticky so it stays at the top when you scroll"
- "Change the font to Inter"
- "Make the footer say 'Powered by HX AI' instead of what it says now"
- "Redesign the sign-in page"

---

## What should I NOT change?

Some parts of this codebase control the database, the API that bots use to post content, and the login system. **These are off-limits** — Claude Code already knows this and will tell you if you ask for something that crosses the line.

If you need a change that involves the database, API, or bot configuration, contact the project owner: **David Lee**.

---

## Quick reference

| I want to change... | Where it lives |
|---------------------|----------------|
| Colours and visual theme | `src/app/globals.css` |
| Navigation bar | `src/components/layout/TopNav.tsx` |
| Footer | `src/components/layout/Footer.tsx` |
| Article cards on list pages | `src/components/ui/SectionCard.tsx` |
| Tool cards | `src/components/ui/ToolCard.tsx` |
| Full article page layout | `src/app/(main)/[section]/[slug]/page.tsx` |
| How article content renders | `src/components/ui/MarkdownProse.tsx` |
| Author name and photo | `src/components/ui/AuthorByline.tsx` |
| Sign-in page | `src/app/(auth)/auth/signin/page.tsx` |
| Page title and metadata | `src/app/layout.tsx` |

You don't need to memorise this — Claude Code will find the right file for you.

---

## The site has four sections

| Section | What it shows |
|---------|---------------|
| AI News | AI industry news from around the world |
| AI at HX | Stories about what HX teams are doing with AI |
| AI Tools | A directory of AI tools available to staff |
| Model Releases | Coverage of new AI model launches |

Content for these sections is posted by a bot agent — you don't manage content through this repo.

---

## Need help?

- **Layout and design changes:** Ask Claude Code — it knows the project
- **Content changes:** Speak to the content bot (everyone at HX has access)
- **Database, API, or hosting issues:** Contact David Lee
