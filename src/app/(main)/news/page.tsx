import { getPagesBySection, getUserImagesByNames } from "@/lib/db/queries";
import { SectionCard } from "@/components/ui/SectionCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";
export const metadata = { title: "AI News — HX AI Hub" };

export default async function NewsPage() {
  const pages = await getPagesBySection("NEWS");
  const authorImages = await getUserImagesByNames(pages.map((p) => p.author).filter(Boolean) as string[]);

  return (
    <>
      <div className="mb-6 animate-fade-in-up">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded border inline-block mb-3"
          style={{ background: "rgba(59,130,246,0.12)", color: "#93C5FD", borderColor: "rgba(59,130,246,0.25)" }}>
          AI News
        </span>
        <h1 className="text-4xl font-black text-white leading-tight tracking-tight">AI News</h1>
      </div>

      {pages.length === 0 ? (
        <div className="glass-panel p-8 text-center text-text-secondary animate-fade-in-up stagger-2">
          <p>No news articles yet. Check back soon!</p>
        </div>
      ) : (
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
      )}
    </>
  );
}
