import { clsx } from "clsx";

interface GlassCardProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  shimmer?: boolean;
  flush?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

export function GlassCard({ children, size = "md", shimmer, flush, className }: GlassCardProps) {
  return (
    <div
      className={clsx(
        "glass-panel",
        !flush && sizeClasses[size],
        shimmer && "shimmer-border",
        className
      )}
    >
      {children}
    </div>
  );
}
