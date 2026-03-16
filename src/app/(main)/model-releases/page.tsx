import { getPagesBySection, getUserImagesByNames } from "@/lib/db/queries";
import { SectionCard } from "@/components/ui/SectionCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";
export const metadata = { title: "Model Releases — HX AI Hub" };

export default async function ModelReleasesPage() {
  const pages = await getPagesBySection("MODEL_RELEASES");
  const authorImages = await getUserImagesByNames(pages.map((p) => p.author).filter(Boolean) as string[]);

  return (
    <>
      <h1 className="text-3xl font-bold gradient-text mb-6 animate-fade-in-up">Model Releases</h1>
      {pages.length === 0 ? (
        <div className="glass-panel p-8 text-center text-text-secondary animate-fade-in-up stagger-1">
          <p>No model release articles yet. Check back soon!</p>
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
