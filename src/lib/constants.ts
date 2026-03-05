export const SECTIONS = {
  NEWS: { label: "AI News", slug: "news", color: "news" as const },
  AT_HX: { label: "AI at HX", slug: "at-hx", color: "athx" as const },
  TOOLS: { label: "HX AI Tools", slug: "tools", color: "tools" as const },
} as const;

export const SECTION_BY_SLUG: Record<string, keyof typeof SECTIONS> = {
  news: "NEWS",
  "at-hx": "AT_HX",
  tools: "TOOLS",
};

export const CAPABILITIES = [
  "Chat",
  "Image Generation",
  "Video Generation",
  "Audio Generation",
  "Music Generation",
  "Code",
  "Research",
  "Automation",
  "Voice / Speech",
  "Writing",
] as const;

export type Capability = (typeof CAPABILITIES)[number];
