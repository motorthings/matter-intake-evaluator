interface RiskBadgeProps {
  level: "high" | "medium" | "low";
  score: number;
}

const CONFIG: Record<string, { bg: string; text: string; border: string; darkBg: string; darkText: string; darkBorder: string; label: string }> = {
  high: {
    bg: "#fef2f2", text: "#dc2626", border: "#fecaca",
    darkBg: "#3b1010", darkText: "#fca5a5", darkBorder: "#5c1a1a",
    label: "High Risk",
  },
  medium: {
    bg: "#fffbeb", text: "#d97706", border: "#fde68a",
    darkBg: "#2d1f07", darkText: "#fcd34d", darkBorder: "#5c3d0a",
    label: "Medium Risk",
  },
  low: {
    bg: "#ecfdf5", text: "#059669", border: "#a7f3d0",
    darkBg: "#0a2820", darkText: "#6ee7b7", darkBorder: "#164e38",
    label: "Low Risk",
  },
};

export default function RiskBadge({ level, score }: RiskBadgeProps) {
  const c = CONFIG[level];

  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full"
      style={{ background: c.darkBg, border: `1px solid ${c.darkBorder}` }}
    >
      <span className="text-sm font-semibold" style={{ color: c.darkText }}>
        {c.label}
      </span>
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-full"
        style={{ background: c.darkBorder, color: c.darkText }}
      >
        {score}/100
      </span>
    </div>
  );
}
