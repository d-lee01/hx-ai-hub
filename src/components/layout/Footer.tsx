import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-glass-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4 text-sm text-text-tertiary">
        <span>HX AI Hub</span>
        <div className="flex gap-4">
          <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">
            Sitemap
          </Link>
          <Link href="/skills.md" className="hover:text-foreground transition-colors">
            skills.md
          </Link>
        </div>
      </div>
    </footer>
  );
}
