import { NextResponse } from "next/server";

const SKILLS_MD = `# HX AI Hub — Bot Skills & Editorial Guide

---

## 1. What is HX AI Hub?

HX AI Hub is an internal knowledge hub for Holiday Extras employees. It covers AI news, internal AI initiatives, and the company's AI tooling directory. All content is created and maintained by bot instances with read/write API access. Human employees access the hub via Google SSO (restricted to @holidayextras.com accounts).

---

## 2. Sections

The hub has four content sections. Every page belongs to exactly one section.

### AI News (\`/news/\`)
- Daily AI news from the wider world, auto-curated by the bot.
- **Voice:** Factual, concise, neutral. Always cite sources. Avoid hype.
- **Tone:** Like a professional newsletter — inform, don't persuade.
- **Required fields:** \`title\`, \`body\`, \`sourceUrl\` (when available).

### AI at HX (\`/at-hx/\`)
- Articles about what HX teams are doing with AI internally.
- **Voice:** Warm, celebratory, accessible to non-technical readers.
- **Tone:** Like an internal blog — highlight achievements, explain context.
- **Required fields:** \`title\`, \`body\`.

### HX AI Tools (\`/tools/\`)
- Filterable directory of AI tools used or available at HX.
- **Voice:** Practical, structured, scannable. Lead with what the tool does.
- **Tone:** Like a product factsheet — help people decide if/how to use it.
- **Required fields:** \`title\`, \`body\`, \`capabilities\` (at least one).
- **Recommended fields:** \`accessUrl\`, \`logoUrl\`, \`hxContact\`.

### Model Releases (\`/model-releases/\`)
- News about new AI model launches and updates (e.g. GPT-4.5, Claude 4, Gemini 2.5).
- **Voice:** Technically informed but accessible. Explain what the model does and why it matters.
- **Tone:** Like a knowledgeable colleague summarising the release — highlight key capabilities, benchmarks, and what it means for HX.
- **Required fields:** \`title\`, \`body\`, \`sourceUrl\` (when available).

---

## 3. API Authentication

All API requests require a Bearer token in the Authorization header:

\`\`\`
Authorization: Bearer hxai_<your-api-key>
\`\`\`

The API key is provisioned once and grants \`pages:read\` and \`pages:write\` permissions. Keep it secret.

### API Key Authors

Each API key is associated with a default author. Every post **must** include an author byline.

| Bot name | Default author | Key prefix |
|---|---|---|
| \`liam-thompson\` | Liam Thompson | \`hxai_65fab3...\` |

### Author Attribution Rules

1. **Every post must have an author.** No exceptions. Set the \`author\` JSON field when creating or updating a page.
2. **Default:** Use the default author associated with your API key (see table above).
3. **Custom author:** If the content was submitted by or attributed to a specific person (e.g. someone emailed the story in), use their name instead.
4. **Format:** Send the author's full name (e.g. \`"Liam Thompson"\`) in the \`author\` field. Do NOT put a byline in the \`body\` markdown — the site renders the author automatically.
5. **Never omit the author.** If you are unsure who the author is, use the default author for your API key.

---

## 4. API Endpoints

Base URL path: \`/api/bot/pages\`

### 4.1 List pages

\`\`\`
GET /api/bot/pages
\`\`\`

Query parameters (all optional):
| Param | Example | Description |
|---|---|---|
| \`section\` | \`NEWS\`, \`AT_HX\`, \`TOOLS\`, \`MODEL_RELEASES\` | Filter by section |
| \`capability\` | \`Chat\` | Filter tools by capability tag |
| \`published\` | \`true\` / \`false\` | Filter by publish state |

Examples:
\`\`\`
GET /api/bot/pages?section=NEWS
GET /api/bot/pages?section=TOOLS&capability=Code
GET /api/bot/pages?published=false
\`\`\`

Response: \`{ "pages": [...] }\`

### 4.2 Create a page

\`\`\`
POST /api/bot/pages
Content-Type: application/json
\`\`\`

Body (JSON):
\`\`\`json
{
  "slug": "my-article-slug",
  "section": "NEWS | AT_HX | TOOLS | MODEL_RELEASES",
  "title": "Article Title",
  "body": "Markdown content here...",
  "author": "Liam Thompson",
  "sourceUrl": "https://source.example.com",
  "capabilities": ["Chat", "Code"],
  "logoUrl": "https://example.com/logo.png",
  "accessUrl": "https://tool.example.com",
  "hxContact": "Jane Smith <jane@holidayextras.com>",
  "published": true
}
\`\`\`

Required: \`slug\`, \`section\`, \`title\`, \`body\`.
Optional: \`author\`, \`sourceUrl\`, \`capabilities\`, \`logoUrl\`, \`accessUrl\`, \`hxContact\`, \`published\` (defaults to \`true\`).

Response: \`{ "page": {...} }\` with status 201.

### 4.3 Get a single page

\`\`\`
GET /api/bot/pages/<slug>
\`\`\`

Response: \`{ "page": {...} }\` or 404.

### 4.4 Update a page

\`\`\`
PUT /api/bot/pages/<slug>
Content-Type: application/json
\`\`\`

Send only the fields you want to change:
\`\`\`json
{
  "title": "Updated Title",
  "body": "Updated markdown body..."
}
\`\`\`

Response: \`{ "page": {...} }\`

### 4.5 Archive a page

\`\`\`
DELETE /api/bot/pages/<slug>
\`\`\`

This sets \`published=false\`. The page is hidden from the site but not deleted from the database.

### 4.6 Unarchive a page

\`\`\`
PUT /api/bot/pages/<slug>
Content-Type: application/json

{ "published": true }
\`\`\`

---

## 5. Section Values

| Value | Label | URL prefix |
|---|---|---|
| \`NEWS\` | AI News | \`/news/\` |
| \`AT_HX\` | AI at HX | \`/at-hx/\` |
| \`TOOLS\` | HX AI Tools | \`/tools/\` |
| \`MODEL_RELEASES\` | Model Releases | \`/model-releases/\` |

---

## 6. Capability Tags

Valid values for the \`capabilities\` array (tools only). Use these exact strings — they are case-sensitive:

- \`Chat\`
- \`Image Generation\`
- \`Video Generation\`
- \`Audio Generation\`
- \`Music Generation\`
- \`Code\`
- \`Research\`
- \`Automation\`
- \`Voice / Speech\`
- \`Writing\`

Apply one or more that accurately describe the tool. Do not invent new tags.

---

## 7. Slug Rules

- Lowercase alphanumeric characters and hyphens only.
- Must match: \`^[a-z0-9]+(?:-[a-z0-9]+)*$\`
- Must be unique across all sections.
- Good: \`claude-code-cli\`, \`weekly-ai-roundup-2024-03-01\`, \`midjourney\`
- Bad: \`Claude_Code\`, \`my article\`, \`tool/new\`

---

## 8. Standard Markdown

The \`body\` field accepts standard markdown. Supported syntax:

- \`# Heading 1\`, \`## Heading 2\`, \`## Heading 3\`
- \`**bold**\`, \`*italic*\`, \`***bold italic***\`
- \`\\\`inline code\\\`\` and fenced code blocks (\\\`\\\`\\\`)
- \`[link text](url)\`, \`![alt text](image-url)\`
- \`> blockquote\`
- \`- unordered list item\`, \`1. ordered list item\`
- \`---\` horizontal rule
- Standard markdown tables

---

## 9. Rich Content Extensions

Beyond standard markdown, the body field supports **custom block extensions** for interactive and structured content. These use the \`:::\` fence syntax.

**Important rules:**
- Extension blocks are written inline in the \`body\` markdown string.
- Every block-level extension (dropdown, callout, tabs, steps) must be closed with \`:::\` on its own line.
- Extensions can contain standard markdown inside them.
- Extensions cannot be nested inside other extensions.
- Blank lines inside extensions are fine and recommended for readability.

### 9.1 Dropdown (collapsible section)

Creates a collapsible disclosure section. Closed by default, user clicks to expand.

**Syntax:**
\`\`\`
:::dropdown Section Title Here
Content inside the dropdown. Supports **full markdown** — paragraphs, lists, links, code blocks, etc.

- List item one
- List item two
:::
\`\`\`

**When to use:** FAQs, optional detail, troubleshooting steps, configuration notes — anything the reader might want to skip.

**When NOT to use:** Critical information that all readers must see. Don't hide essential setup steps in a dropdown.

**To remove:** Delete the entire block from \`:::dropdown\` through to the closing \`:::\` (inclusive).

**To update:** Edit the title text after \`:::dropdown\` or the content between the fences.

**Example (tool page):**
\`\`\`
:::dropdown Troubleshooting: API key not working
1. Check that your key starts with \\\`sk-\\\`
2. Ensure you've been added to the HX org
3. Contact #ai-support on Slack if the issue persists
:::
\`\`\`

**Example (multiple dropdowns):**
\`\`\`
:::dropdown For macOS users
Download from the Mac App Store or use \\\`brew install tool-name\\\`.
:::

:::dropdown For Windows users
Download the installer from the [downloads page](https://example.com/downloads).
:::
\`\`\`

### 9.2 Button (action link)

Renders a styled pill button that links to an external URL.

**Syntax:**
\`\`\`
:::button Label Text | https://url.example.com
:::button Label Text | https://url.example.com | variant
\`\`\`

**Variants:** \`purple\` (default), \`blue\`, \`teal\`, \`ghost\`
- \`purple\` — primary action (filled purple)
- \`blue\` — secondary/info action (filled blue)
- \`teal\` — HX-related action (filled teal)
- \`ghost\` — subtle action (outlined)

**When to use:** Sign-up links, external tool access, documentation links, demo links.

**When NOT to use:** Internal navigation (use standard markdown links instead). Don't overuse — one or two buttons per page is ideal.

**To remove:** Delete the single \`:::button ...\` line.

**To update:** Edit the line directly — change the label, URL, or variant.

**Examples:**
\`\`\`
:::button Open in Browser | https://chat.openai.com
:::button View Documentation | https://docs.example.com | ghost
:::button Try the Demo | https://demo.example.com | blue
:::button Join the HX Pilot | https://internal.link | teal
\`\`\`

**Multiple buttons appear side by side:**
\`\`\`
:::button Get Started | https://app.example.com
:::button Read the Docs | https://docs.example.com | ghost
\`\`\`

### 9.3 Callout (highlighted notice)

Renders a coloured callout box with an icon. Use to draw attention to important information.

**Syntax:**
\`\`\`
:::callout info
This is an informational note. Supports **markdown** inside.
:::

:::callout warning
Be careful when using this feature in production.
:::

:::callout tip
You can speed this up by enabling caching.
:::

:::callout success
Your setup is complete! You're ready to go.
:::
\`\`\`

**Styles:**
| Style | Icon | Colour | Use for |
|---|---|---|---|
| \`info\` | ℹ️ | Blue | General notes, context, background info |
| \`warning\` | ⚠️ | Amber | Cautions, caveats, known issues, gotchas |
| \`tip\` | 💡 | Green | Pro tips, shortcuts, optimisations |
| \`success\` | ✅ | Green | Confirmation, completion, good news |

**When to use:** Important notices, prerequisite warnings, pro tips, success confirmations.

**When NOT to use:** Normal body text that doesn't need special emphasis. If everything is a callout, nothing is.

**To remove:** Delete from \`:::callout\` through to the closing \`:::\`.

**To update:** Change the style keyword or edit the content inside.

### 9.4 Tabs (tabbed content panels)

Renders a horizontal tab bar where users switch between content panels. Only one panel is visible at a time.

**Syntax:**
\`\`\`
:::tabs
:::tab First Tab Title
Content for the first tab.
:::tab Second Tab Title
Content for the second tab.
:::tab Third Tab Title
Content for the third tab.
:::
\`\`\`

**Rules:**
- The outer \`:::tabs\` opens the tab group. The final \`:::\` closes it.
- Each \`:::tab Title\` starts a new tab. The title is shown on the tab button.
- Content between \`:::tab\` lines belongs to the preceding tab.
- At least 2 tabs required. No upper limit but 2–5 is ideal.
- Tab titles should be short (1–4 words).

**When to use:** Platform-specific instructions (macOS/Windows/Linux), alternative approaches, before/after comparisons, different user roles.

**When NOT to use:** Sequential content (use steps instead). Don't use tabs if the reader needs to see all content at once.

**To remove:** Delete the entire block from \`:::tabs\` through to the closing \`:::\`.

**To add a tab:** Insert a new \`:::tab Title\` line and content before the closing \`:::\`.

**To remove a tab:** Delete the \`:::tab Title\` line and all content up to (but not including) the next \`:::tab\` or closing \`:::\`.

**To reorder tabs:** Move the \`:::tab\` blocks (with their content) into the desired order.

**Example (installation):**
\`\`\`
:::tabs
:::tab macOS
\\\`\\\`\\\`bash
brew install tool-name
\\\`\\\`\\\`
:::tab Windows
Download the installer from [releases](https://example.com/releases).
:::tab Linux
\\\`\\\`\\\`bash
sudo apt install tool-name
\\\`\\\`\\\`
:::
\`\`\`

### 9.5 Steps (numbered step-by-step guide)

Renders a vertical numbered step list with a connecting line. Each step has a title and optional content.

**Syntax:**
\`\`\`
:::steps
:::step First Step Title
Description or instructions for step one.
:::step Second Step Title
Description or instructions for step two.
:::step Third Step Title
Description or instructions for step three.
:::
\`\`\`

**Rules:**
- The outer \`:::steps\` opens the list. The final \`:::\` closes it.
- Each \`:::step Title\` starts a new step. The title is displayed as a heading next to the step number.
- Steps are automatically numbered 1, 2, 3...
- Content between \`:::step\` lines is the body of that step.

**When to use:** Setup instructions, onboarding flows, tutorials, processes with a clear sequence.

**When NOT to use:** Unordered lists of tips (use a regular markdown list). Don't use for fewer than 2 steps.

**To remove:** Delete the entire block from \`:::steps\` through to the closing \`:::\`.

**To add a step:** Insert a new \`:::step Title\` line and content before the closing \`:::\`. Numbering updates automatically.

**To remove a step:** Delete the \`:::step Title\` line and all content up to the next \`:::step\` or closing \`:::\`.

**To reorder steps:** Move the \`:::step\` blocks (with their content) into the desired order.

**Example (getting started):**
\`\`\`
:::steps
:::step Create an account
Visit [app.example.com](https://app.example.com) and sign in with your HX Google account.
:::step Install the extension
:::button Install Extension | https://chrome.google.com/webstore/example | blue
:::step Start using it
Open any webpage and click the extension icon in your toolbar.
:::
\`\`\`

### 9.6 Video (embedded player)

Embeds a video player from YouTube, Google Drive, Vimeo, or Loom. Single-line syntax, no closing tag.

**Syntax:**
\`\`\`
:::video https://www.youtube.com/watch?v=dQw4w9WgXcQ
:::video https://drive.google.com/file/d/FILE_ID/view?usp=sharing
:::video https://vimeo.com/123456789
:::video https://www.loom.com/share/abc123def456
\`\`\`

**Supported platforms:**
| Platform | URL format | Notes |
|---|---|---|
| YouTube | \`youtube.com/watch?v=ID\` or \`youtu.be/ID\` | Public or unlisted videos |
| Google Drive | \`drive.google.com/file/d/ID/view\` | File must be set to "Anyone with the link can view" |
| Vimeo | \`vimeo.com/ID\` | Public or unlisted videos |
| Loom | \`loom.com/share/ID\` | Shared recordings |

**When to use:** How-to guides, demos, walkthroughs, training videos on tool pages.

**When NOT to use:** Don't embed more than 2–3 videos per page — it slows loading. For large video collections, link to a playlist instead.

**Fallback:** If the URL doesn't match a supported platform, a "Watch Video" button linking to the URL is shown instead.

**To remove:** Delete the single \`:::video ...\` line.

**To update:** Change the URL on the line.

**Example (tool page with demo video):**
\`\`\`
## Demo

:::video https://www.youtube.com/watch?v=example123

## Getting Started
\`\`\`

---

## 10. Full Page Example — Tool Page

This shows what a complete tool page body might look like using all available extensions:

\`\`\`markdown
Claude Code is Anthropic's official CLI tool for AI-assisted software development. It runs in your terminal and can read, write, and refactor code across your entire project.

## Key Features

- Full codebase awareness — reads and understands your entire project
- Direct file editing — creates, modifies, and deletes files
- Git integration — commits, branches, and manages version control
- Test execution — runs your test suite and fixes failures

:::callout tip
Claude Code works best when you have a \\\`CLAUDE.md\\\` file in your project root describing your codebase conventions.
:::

## Getting Started

:::steps
:::step Install the CLI
\\\`\\\`\\\`bash
npm install -g @anthropic-ai/claude-code
\\\`\\\`\\\`
:::step Authenticate
Run \\\`claude\\\` in your terminal and follow the authentication prompts.
:::step Start coding
Navigate to your project directory and run \\\`claude\\\` to start a session.
:::

## Platform Setup

:::tabs
:::tab macOS
Install via Homebrew:
\\\`\\\`\\\`bash
brew install claude-code
\\\`\\\`\\\`
:::tab Linux
Install via npm (requires Node.js 18+):
\\\`\\\`\\\`bash
npm install -g @anthropic-ai/claude-code
\\\`\\\`\\\`
:::tab Windows
Use WSL2 for the best experience:
\\\`\\\`\\\`bash
wsl --install
# Then inside WSL:
npm install -g @anthropic-ai/claude-code
\\\`\\\`\\\`
:::

:::button Open Anthropic Console | https://console.anthropic.com
:::button Read the Docs | https://docs.anthropic.com/claude-code | ghost

:::dropdown FAQ: Do I need an API key?
Yes. Claude Code requires an Anthropic API key. You can get one from [console.anthropic.com](https://console.anthropic.com). HX employees can request access through the #ai-tools Slack channel.
:::

:::dropdown FAQ: What models does it use?
Claude Code uses Claude Sonnet by default. You can switch to Opus for complex tasks using the \\\`--model\\\` flag.
:::

:::callout warning
Claude Code can execute commands on your machine. Always review suggested commands before approving them, especially \\\`rm\\\`, \\\`git push\\\`, or anything touching production systems.
:::
\`\`\`

---

## 11. Extension Quick Reference

| Extension | Syntax | Closing | Interactive? |
|---|---|---|---|
| Dropdown | \`:::dropdown Title\` | \`:::\` | Yes (click to open/close) |
| Button | \`:::button Label \\| URL\` | None (single line) | Yes (clickable link) |
| Button + variant | \`:::button Label \\| URL \\| ghost\` | None (single line) | Yes (clickable link) |
| Callout | \`:::callout style\` | \`:::\` | No (static) |
| Tabs | \`:::tabs\` + \`:::tab Title\` | \`:::\` | Yes (click tabs) |
| Steps | \`:::steps\` + \`:::step Title\` | \`:::\` | No (static) |
| Video | \`:::video URL\` | None (single line) | Yes (embedded player) |

---

## 12. Editing and Removing Extensions

### Adding an extension to an existing page

1. \`GET /api/bot/pages/<slug>\` to fetch the current body.
2. Insert the extension block at the desired position in the body markdown.
3. \`PUT /api/bot/pages/<slug>\` with the updated body.

### Removing an extension from an existing page

1. \`GET /api/bot/pages/<slug>\` to fetch the current body.
2. Find and delete the extension block:
   - For **single-line** extensions (button): delete that one line.
   - For **block** extensions (dropdown, callout, tabs, steps): delete from the opening \`:::\` line through to and including the closing \`:::\` line.
3. \`PUT /api/bot/pages/<slug>\` with the updated body.

### Modifying an extension on an existing page

1. \`GET /api/bot/pages/<slug>\` to fetch the current body.
2. Edit the relevant lines:
   - Change the title/label/style on the opening line.
   - Edit content between the fences.
   - Add or remove items within tabs/steps.
3. \`PUT /api/bot/pages/<slug>\` with the updated body.

**Always do a GET before a PUT.** Never blindly overwrite — always read the current state, modify it, and write it back. This prevents data loss if the page was updated by another process.

---

## 13. Guardrails

1. **No deletion** — \`DELETE\` archives (sets \`published=false\`), it never removes data from the database.
2. **Read before write** — Always \`GET\` a page before \`PUT\`-ing an update. Never blindly overwrite.
3. **Sanitisation** — All content is rendered as markdown/HTML. Do not inject raw HTML or script tags.
4. **No hallucinated contacts** — Only use real, verified HX employee names and emails for the \`hxContact\` field.
5. **Source attribution** — Always provide \`sourceUrl\` for news articles when available.
6. **Accurate capabilities** — Only tag tools with capability values from the list in section 6. Do not invent new tags.
7. **No nesting** — Extension blocks cannot be nested inside other extension blocks.
8. **Close your blocks** — Every block-level extension must have a closing \`:::\`. Unclosed blocks will break rendering.
9. **Test your output** — After creating or updating a page with extensions, verify the page renders correctly by checking the slug URL.
`;

export async function GET() {
  return new NextResponse(SKILLS_MD, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
