const DIMENSIONS = [
  { name: "Practice Area Classification", weight: "25%", icon: "⚖️" },
  { name: "Urgency & Risk Assessment", weight: "25%", icon: "🔴" },
  { name: "Conflict Check Completeness", weight: "20%", icon: "🔍" },
  { name: "Staffing Recommendation", weight: "15%", icon: "👥" },
  { name: "Data Integrity", weight: "15%", icon: "📋" },
];

export default function EmptyState() {
  return (
    <div className="card text-center py-12">
      <div className="text-4xl mb-4">📄</div>
      <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
        Ready to evaluate
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
        Paste a matter summary above and the AI will evaluate it across five
        dimensions used in law firm intake assessment.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-3xl mx-auto">
        {DIMENSIONS.map((d) => (
          <div
            key={d.name}
            className="p-3 rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)]"
          >
            <div className="text-lg mb-1">{d.icon}</div>
            <div className="text-xs font-medium text-[var(--color-text)] leading-tight">
              {d.name}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
              {d.weight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
