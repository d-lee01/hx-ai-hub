import { clsx } from "clsx";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "purple" | "blue" | "teal" | "ghost";
  as?: "button" | "a";
  href?: string;
}

const variantClasses = {
  purple: "bg-hx-purple text-white hover:bg-hx-purple-light",
  blue: "bg-section-news text-white hover:opacity-90",
  teal: "bg-section-athx text-white hover:opacity-90",
  ghost: "bg-transparent text-hx-purple border border-hx-purple hover:bg-hx-purple/5",
};

export function GlassButton({
  variant = "purple",
  as = "button",
  href,
  className,
  children,
  ...props
}: GlassButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm transition-all cursor-pointer",
    "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
    "min-h-[40px]",
    variantClasses[variant],
    className
  );

  if (as === "a" && href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
