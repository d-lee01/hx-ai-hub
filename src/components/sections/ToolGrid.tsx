import { ToolCard } from "@/components/ui/ToolCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Page } from "@prisma/client";

interface ToolGridProps {
  tools: Page[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="glass-panel p-8 text-center text-text-secondary">
        <p>No tools found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool, i) => (
        <ScrollReveal key={tool.id} delay={i * 50}>
          <ToolCard
            slug={tool.slug}
            title={tool.title}
            body={tool.body}
            logoUrl={tool.logoUrl}
            capabilities={tool.capabilities}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
