interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

/** Small pill badge with a glowing dot, shown above section headings — brucelabs.tech pattern. */
export function SectionBadge({ children, className = "" }: SectionBadgeProps) {
  return (
    <span className={`section-badge ${className}`}>
      <span className="section-badge-dot" />
      {children}
    </span>
  );
}
