interface RiskBadgeProps {
  level: "high" | "medium" | "low";
  score: number;
}

const CONFIG: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  high: {
    bg: "#fef2f2",
    text: "#dc2626",
    border: "#fecaca",
    label: "High Risk",
  },
  medium: {
    bg: "#fffbeb",
    text: "#d97706",
    border: "#fde68a",
    label: "Medium Risk",
  },
  low: {
    bg: "#ecfdf5",
    text: "#059669",
    border: "#a7f3d0",
    label: "Low Risk",
  },
};

export default function RiskBadge({ level, score }: RiskBadgeProps) {
  const c = CONFIG[level];

  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border"
      style={{ background: c.bg, borderColor: c.border }}
    >
      <span
        className="text-sm font-semibold"
        style={{ color: c.text }}
      >
        {c.label}
      </span>
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-full"
        style={{ background: c.border, color: c.text }}
      >
        {score}/100
      </span>
    </div>
  );
}
