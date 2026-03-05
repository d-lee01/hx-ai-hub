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
}

const borderClasses: Record<Section, string> = {
  NEWS: "border-section-news",
  AT_HX: "border-section-athx",
  TOOLS: "border-section-tools",
};

export function SectionCard({ slug, section, title, createdAt, body }: SectionCardProps) {
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
      </article>
    </Link>
  );
}
