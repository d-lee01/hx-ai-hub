import { Suspense } from "react";
import { getPagesBySection, getUserImagesByNames } from "@/lib/db/queries";
import { SectionCard } from "@/components/ui/SectionCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ThemeFilter } from "@/components/ui/ThemeFilter";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI at HX — HX AI Hub" };

async function AtHxContent({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
  const { theme } = await searchParams;
  const themes = theme?.split(",").filter(Boolean) ?? [];
  const allPages = await getPagesBySection("AT_HX");
  const pages =
    themes.length > 0
      ? allPages.filter((p) => themes.some((t) => p.capabilities.includes(t)))
      : allPages;
  const authorImages = await getUserImagesByNames(
    pages.map((p) => p.author).filter(Boolean) as string[]
  );

  if (pages.length === 0) {
    return (
      <div className="glass-panel p-8 text-center text-text-secondary animate-fade-in-up stagger-1">
        <p>{themes.length > 0 ? "No articles match this theme yet." : "No articles yet. Check back soon!"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {pages.map((page, i) => (
        <ScrollReveal key={page.id} delay={i * 50}>
          <SectionCard
            slug={page.slug}
            section={page.section}
            title={page.title}
            createdAt={page.createdAt}
            body={page.body}
            author={page.author}
            authorImage={page.author ? authorImages[page.author.toLowerCase()] ?? null : null}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default async function AtHxPage({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
  return (
    <>
      <div className="mb-6 animate-fade-in-up">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded border inline-block mb-3"
          style={{ background: "rgba(139,92,246,0.12)", color: "#C4B5FD", borderColor: "rgba(139,92,246,0.25)" }}>
          AI at HX
        </span>
        <h1 className="text-4xl font-black text-white leading-tight tracking-tight">AI at HX</h1>
      </div>
      {/* Contribution CTA */}
      <div className="glass-panel p-5 mb-6 border-l-4 border-section-athx animate-fade-in-up stagger-1">
        <p className="text-sm text-text-secondary">
          Got something to share? Send your thoughts to{" "}
          <a
            href="mailto:hxaipage@gmail.com"
            className="text-hx-purple hover:text-hx-purple-light underline transition-colors"
          >
            hxaipage@gmail.com
          </a>{" "}
          — AI will help you write and publish it.
        </p>
      </div>

      <Suspense>
        <ThemeFilter />
      </Suspense>
      <Suspense fallback={<div className="glass-panel p-8 text-center text-text-secondary">Loading articles...</div>}>
        <AtHxContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
