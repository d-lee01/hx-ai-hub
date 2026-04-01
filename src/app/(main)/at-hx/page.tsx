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
      <h1 className="text-3xl font-bold gradient-text-athx mb-6 animate-fade-in-up">AI at HX</h1>
      <Suspense>
        <ThemeFilter />
      </Suspense>
      <Suspense fallback={<div className="glass-panel p-8 text-center text-text-secondary">Loading articles...</div>}>
        <AtHxContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
