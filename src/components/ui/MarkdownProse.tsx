"use client";

import { useState, useMemo } from "react";

// ── Segment types ─────────────────────────────────────

type Segment =
  | { type: "markdown"; content: string }
  | { type: "dropdown"; title: string; content: string }
  | { type: "button"; label: string; url: string; variant: string }
  | { type: "callout"; style: string; content: string }
  | { type: "tabs"; tabs: { title: string; content: string }[] }
  | { type: "steps"; steps: { title: string; content: string }[] };

// ── Block parser ──────────────────────────────────────

function parseSegments(md: string): Segment[] {
  const segments: Segment[] = [];
  const lines = md.split("\n");
  let i = 0;
  let buffer: string[] = [];

  function flush() {
    const text = buffer.join("\n").trim();
    if (text) segments.push({ type: "markdown", content: text });
    buffer = [];
  }

  while (i < lines.length) {
    const line = lines[i];

    // ── Button (single-line) ──
    const btnMatch = line.match(
      /^:::button\s+(.+?)\s*\|\s*(\S+?)(?:\s*\|\s*(\w+))?\s*$/
    );
    if (btnMatch) {
      flush();
      segments.push({
        type: "button",
        label: btnMatch[1].trim(),
        url: btnMatch[2].trim(),
        variant: btnMatch[3] || "purple",
      });
      i++;
      continue;
    }

    // ── Dropdown ──
    const ddMatch = line.match(/^:::dropdown\s+(.+)$/);
    if (ddMatch) {
      flush();
      const title = ddMatch[1].trim();
      const body: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        body.push(lines[i]);
        i++;
      }
      i++; // skip closing :::
      segments.push({ type: "dropdown", title, content: body.join("\n") });
      continue;
    }

    // ── Callout ──
    const coMatch = line.match(/^:::callout\s+(\w+)\s*$/);
    if (coMatch) {
      flush();
      const style = coMatch[1];
      const body: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ":::") {
        body.push(lines[i]);
        i++;
      }
      i++;
      segments.push({ type: "callout", style, content: body.join("\n") });
      continue;
    }

    // ── Tabs ──
    if (line.trim() === ":::tabs") {
      flush();
      const tabs: { title: string; content: string }[] = [];
      i++;
      let cur: { title: string; lines: string[] } | null = null;
      while (i < lines.length && lines[i].trim() !== ":::") {
        const tabMatch = lines[i].match(/^:::tab\s+(.+)$/);
        if (tabMatch) {
          if (cur) tabs.push({ title: cur.title, content: cur.lines.join("\n") });
          cur = { title: tabMatch[1].trim(), lines: [] };
        } else if (cur) {
          cur.lines.push(lines[i]);
        }
        i++;
      }
      if (cur) tabs.push({ title: cur.title, content: cur.lines.join("\n") });
      i++;
      segments.push({ type: "tabs", tabs });
      continue;
    }

    // ── Steps ──
    if (line.trim() === ":::steps") {
      flush();
      const steps: { title: string; content: string }[] = [];
      i++;
      let cur: { title: string; lines: string[] } | null = null;
      while (i < lines.length && lines[i].trim() !== ":::") {
        const stepMatch = lines[i].match(/^:::step\s+(.+)$/);
        if (stepMatch) {
          if (cur) steps.push({ title: cur.title, content: cur.lines.join("\n") });
          cur = { title: stepMatch[1].trim(), lines: [] };
        } else if (cur) {
          cur.lines.push(lines[i]);
        }
        i++;
      }
      if (cur) steps.push({ title: cur.title, content: cur.lines.join("\n") });
      i++;
      segments.push({ type: "steps", steps });
      continue;
    }

    // ── Plain markdown line ──
    buffer.push(line);
    i++;
  }

  flush();
  return segments;
}

// ── Markdown → HTML (basic) ───────────────────────────

function mdToHtml(md: string): string {
  let html = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^---$/gm, "<hr />")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br />");

  html = html.replace(
    /((?:<li>.*?<\/li>\s*(?:<br\s*\/?>)?\s*)+)/g,
    "<ul>$1</ul>"
  );
  html = html.replace(/<ul>([\s\S]*?)<\/ul>/g, (_, inner) =>
    "<ul>" + inner.replace(/<br\s*\/?>/g, "") + "</ul>"
  );

  return `<p>${html}</p>`;
}

// ── Inline HTML renderer ──────────────────────────────

function InlineMarkdown({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: mdToHtml(content) }} />;
}

// ── Callout icons ─────────────────────────────────────

const calloutIcons: Record<string, string> = {
  info: "ℹ️",
  warning: "⚠️",
  tip: "💡",
  success: "✅",
};

// ── Button variant classes ────────────────────────────

const btnVariants: Record<string, string> = {
  purple:
    "ext-btn ext-btn--purple",
  blue:
    "ext-btn ext-btn--blue",
  teal:
    "ext-btn ext-btn--teal",
  ghost:
    "ext-btn ext-btn--ghost",
};

// ── Tabs component ────────────────────────────────────

function TabBlock({ tabs }: { tabs: { title: string; content: string }[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="ext-tabs">
      <div className="ext-tabs__bar" role="tablist">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === active}
            className={`ext-tabs__tab ${idx === active ? "ext-tabs__tab--active" : ""}`}
            onClick={() => setActive(idx)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="ext-tabs__panel" role="tabpanel">
        <InlineMarkdown content={tabs[active].content} />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────

interface MarkdownProseProps {
  content: string;
}

export function MarkdownProse({ content }: MarkdownProseProps) {
  const segments = useMemo(() => parseSegments(content), [content]);

  return (
    <div className="prose-hx">
      {segments.map((seg, idx) => {
        switch (seg.type) {
          case "markdown":
            return (
              <div key={idx} dangerouslySetInnerHTML={{ __html: mdToHtml(seg.content) }} />
            );

          case "dropdown":
            return (
              <details key={idx} className="ext-dropdown">
                <summary className="ext-dropdown__summary">{seg.title}</summary>
                <div className="ext-dropdown__body">
                  <InlineMarkdown content={seg.content} />
                </div>
              </details>
            );

          case "button":
            return (
              <a
                key={idx}
                href={seg.url}
                target="_blank"
                rel="noopener noreferrer"
                className={btnVariants[seg.variant] || btnVariants.purple}
              >
                {seg.label}
              </a>
            );

          case "callout":
            return (
              <div key={idx} className={`ext-callout ext-callout--${seg.style}`}>
                <span className="ext-callout__icon">
                  {calloutIcons[seg.style] || "ℹ️"}
                </span>
                <div className="ext-callout__body">
                  <InlineMarkdown content={seg.content} />
                </div>
              </div>
            );

          case "tabs":
            return <TabBlock key={idx} tabs={seg.tabs} />;

          case "steps":
            return (
              <ol className="ext-steps" key={idx}>
                {seg.steps.map((step, si) => (
                  <li key={si} className="ext-steps__item">
                    <span className="ext-steps__number">{si + 1}</span>
                    <div className="ext-steps__content">
                      <h4 className="ext-steps__title">{step.title}</h4>
                      <InlineMarkdown content={step.content} />
                    </div>
                  </li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
