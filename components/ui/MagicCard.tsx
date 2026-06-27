"use client";

// ─── Constants ──────────────────────────────────────────────
const WHITE_HOVER_COLOR = "#ffffff";

// ─── MagicCard (public API) ─────────────────────────────────
interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  goldBorder?: boolean;
}

export default function MagicCard({
  children,
  className = "",
  style,
  goldBorder = true,
}: MagicCardProps) {
  const baseClassName = `magic-bento-card magic-bento-card--text-autohide magic-bento-card--border-glow ${className}`.trim();

  return (
    <div
      className={baseClassName}
      style={{
        ...style,
        backgroundColor: "var(--bg-card)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        borderColor: goldBorder ? "var(--border)" : undefined,
      }}
      onMouseEnter={(e) => {
        if (!goldBorder) return;
        e.currentTarget.style.borderColor = WHITE_HOVER_COLOR;
        e.currentTarget.style.boxShadow = `0 0 0 2px ${WHITE_HOVER_COLOR}40, 0 0 20px ${WHITE_HOVER_COLOR}15`;
      }}
      onMouseLeave={(e) => {
        if (!goldBorder) return;
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {children}
    </div>
  );
}
