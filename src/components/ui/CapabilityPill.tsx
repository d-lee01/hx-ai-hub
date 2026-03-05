interface CapabilityPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function CapabilityPill({ label, active = false, onClick }: CapabilityPillProps) {
  return (
    <span
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
      className={`capability-pill ${active ? "capability-pill--active" : "capability-pill--inactive"}`}
    >
      {label}
    </span>
  );
}
