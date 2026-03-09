import { clsx } from "clsx";

interface BadgeProps {
  section: "NEWS" | "AT_HX" | "TOOLS" | "MODEL_RELEASES";
  children: React.ReactNode;
}

const badgeClasses = {
  NEWS: "badge-news",
  AT_HX: "badge-athx",
  TOOLS: "badge-tools",
  MODEL_RELEASES: "badge-models",
};

export function Badge({ section, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
        badgeClasses[section]
      )}
    >
      {children}
    </span>
  );
}
