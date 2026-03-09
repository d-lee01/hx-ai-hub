import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/db/queries";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { CapabilityPill } from "@/components/ui/CapabilityPill";
import { GlassButton } from "@/components/ui/GlassButton";
import { MarkdownProse } from "@/components/ui/MarkdownProse";
import { AuthorByline } from "@/components/ui/AuthorByline";
import Link from "next/link";

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || page.section !== "TOOLS" || !page.published) {
    notFound();
  }

  return (
    <article className="animate-fade-in-up">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-foreground transition-colors mb-4"
      >
        &larr; Back to AI Tools
      </Link>
      <GlassCard size="lg">
        {/* Hero */}
        <div className="flex items-start gap-4 mb-6">
          {page.logoUrl ? (
            <img src={page.logoUrl} alt="" className="w-16 h-16 rounded-xl object-contain shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-hx-purple/10 flex items-center justify-center shrink-0">
              <span className="text-hx-purple font-bold text-2xl">{page.title[0]}</span>
            </div>
          )}
          <div>
            <Badge section="TOOLS">AI Tool</Badge>
            <h1 className="text-3xl font-bold mt-2">{page.title}</h1>
          </div>
        </div>

        {/* Capabilities */}
        {page.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {page.capabilities.map((cap) => (
              <CapabilityPill key={cap} label={cap} active />
            ))}
          </div>
        )}

        {/* Author */}
        {page.author && <AuthorByline author={page.author} />}

        {/* Body */}
        <MarkdownProse content={page.body} />

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-glass-border flex flex-wrap gap-4 items-center">
          {page.accessUrl && (
            <GlassButton as="a" href={page.accessUrl}>
              Access Tool &rarr;
            </GlassButton>
          )}
          {page.hxContact && (
            <span className="text-sm text-text-secondary">
              HX Contact: <strong>{page.hxContact}</strong>
            </span>
          )}
        </div>
      </GlassCard>
    </article>
  );
}
