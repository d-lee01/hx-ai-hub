import Link from "next/link";
import { Badge } from "./Badge";
import { SECTIONS } from "@/lib/constants";
import type { Section } from "@prisma/client";

interface SectionCardProps {
  slug: string;
  section: Section;
  title: string;
  createdAt: Date;
  body: string;
  author?: string | null;
  authorImage?: string | null;
}

const borderClasses: Record<Section, string> = {
  NEWS: "border-section-news",
  AT_HX: "border-section-athx",
  TOOLS: "border-section-tools",
  MODEL_RELEASES: "border-section-models",
};

const INITIAL_COLORS = [
  "bg-hx-purple",
  "bg-blue-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
];

function getColorForName(name: string) {
  let hash = 0;
  for (const ch of name) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
  return INITIAL_COLORS[Math.abs(hash) % INITIAL_COLORS.length];
}

export function SectionCard({ slug, section, title, createdAt, body, author, authorImage }: SectionCardProps) {
  const sectionMeta = SECTIONS[section];
  const href = `/${sectionMeta.slug}/${slug}`;
  const excerpt = body.replace(/[#*_`>\[\]]/g, "").slice(0, 160) + (body.length > 160 ? "..." : "");

  return (
    <Link href={href} className="block group">
      <article
        className={`glass-panel p-5 border-l-4 ${borderClasses[section]} hover-lift`}
      >
        <div className="flex items-center gap-3 mb-2">
          <Badge section={section}>{sectionMeta.label}</Badge>
          <time className="text-xs text-text-tertiary" dateTime={createdAt.toISOString()}>
            {createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </time>
        </div>
        <h3 className="font-bold text-lg group-hover:text-hx-purple transition-colors mb-1">
          {title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">{excerpt}</p>
        {author && section !== "TOOLS" && (
          <div className="flex items-center gap-2 mt-3">
            {authorImage ? (
              <img
                src={authorImage}
                alt={author}
                className="w-5 h-5 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-semibold ${getColorForName(author)}`}
              >
                {author[0].toUpperCase()}
              </div>
            )}
            <span className="text-xs text-text-tertiary">{author}</span>
          </div>
        )}
      </article>
    </Link>
  );
}
