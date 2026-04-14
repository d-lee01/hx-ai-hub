import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { OrbField } from "@/components/ui/OrbField";

interface PageShellProps {
  children: React.ReactNode;
  wide?: boolean;
}

export function PageShell({ children, wide }: PageShellProps) {
  return (
    <div className="min-h-dvh flex flex-col relative">
      <OrbField />
      <TopNav />
      <main className={`flex-1 pt-32 pb-12 px-4 relative z-10 ${wide ? "max-w-7xl" : "max-w-4xl"} mx-auto w-full`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
