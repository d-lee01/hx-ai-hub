import { PageShell } from "@/components/layout/PageShell";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
