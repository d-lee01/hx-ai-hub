import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/db/queries";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { MarkdownProse } from "@/components/ui/MarkdownProse";
import Link from "next/link";

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || page.section !== "NEWS" || !page.published) {
    notFound();
  }

  return (
    <article className="animate-fade-in-up">
      <Link
        href="/news"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-foreground transition-colors mb-4"
      >
        &larr; Back to AI News
      </Link>
      <GlassCard size="lg">
        <div className="flex items-center gap-3 mb-4">
          <Badge section="NEWS">AI News</Badge>
          <time className="text-xs text-text-tertiary" dateTime={page.createdAt.toISOString()}>
            {page.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </div>
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <MarkdownProse content={page.body} />
        {page.sourceUrl && (
          <div className="mt-8 pt-4 border-t border-glass-border">
            <a
              href={page.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-hx-purple hover:text-hx-purple-light transition-colors"
            >
              View original source &rarr;
            </a>
          </div>
        )}
      </GlassCard>
    </article>
  );
}
