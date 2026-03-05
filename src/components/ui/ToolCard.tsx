import Link from "next/link";
import { CapabilityPill } from "./CapabilityPill";

interface ToolCardProps {
  slug: string;
  title: string;
  body: string;
  logoUrl?: string | null;
  capabilities: string[];
}

export function ToolCard({ slug, title, body, logoUrl, capabilities }: ToolCardProps) {
  const excerpt = body.replace(/[#*_`>\[\]]/g, "").slice(0, 100) + (body.length > 100 ? "..." : "");

  return (
    <Link href={`/tools/${slug}`} className="block group">
      <article className="glass-panel p-5 h-full hover-lift flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          {logoUrl ? (
            <img src={logoUrl} alt="" className="w-10 h-10 rounded-lg object-contain shrink-0" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-hx-purple/10 flex items-center justify-center shrink-0">
              <span className="text-hx-purple font-bold text-lg">{title[0]}</span>
            </div>
          )}
          <h3 className="font-bold text-lg group-hover:text-hx-purple transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-sm text-text-secondary mb-4 flex-1">{excerpt}</p>
        {capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {capabilities.map((cap) => (
              <CapabilityPill key={cap} label={cap} active={false} />
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
