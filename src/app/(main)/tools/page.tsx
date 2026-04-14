import { Suspense } from "react";
import { getToolsByCapabilities } from "@/lib/db/queries";
import { CapabilityFilter } from "@/components/ui/CapabilityFilter";
import { ToolGrid } from "@/components/sections/ToolGrid";

export const dynamic = "force-dynamic";
export const metadata = { title: "HX AI Tools — HX AI Hub" };

async function ToolsContent({ searchParams }: { searchParams: Promise<{ cap?: string }> }) {
  const { cap } = await searchParams;
  const capabilities = cap?.split(",").filter(Boolean) ?? [];
  const tools = await getToolsByCapabilities(capabilities);

  return <ToolGrid tools={tools} />;
}

export default async function ToolsPage({ searchParams }: { searchParams: Promise<{ cap?: string }> }) {
  return (
    <>
      <h1 className="text-4xl font-black uppercase tracking-widest px-4 py-2 rounded inline-block mb-6 animate-fade-in-up"
        style={{ background: "rgba(16,185,129,0.12)", color: "#6EE7B7", border: "1px solid rgba(16,185,129,0.25)" }}>
        HX AI Tools
      </h1>
      <Suspense>
        <CapabilityFilter />
      </Suspense>
      <Suspense fallback={<div className="glass-panel p-8 text-center text-text-secondary">Loading tools...</div>}>
        <ToolsContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
