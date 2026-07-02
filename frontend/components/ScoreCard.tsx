interface ScoreCardProps {
  name: string;
  score: number;
  weight: number;
  reasoning: string;
  color: string;
}

export default function ScoreCard({
  name,
  score,
  weight,
  reasoning,
  color,
}: ScoreCardProps) {
  return (
    <div className="card flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-[var(--color-text)] leading-tight">
          {name}
        </h4>
        <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-bg)] px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
          {Math.round(weight * 100)}%
        </span>
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <span
          className="text-2xl font-bold"
          style={{ color }}
        >
          {score}
        </span>
        <span className="text-sm text-[var(--color-text-muted)]">/100</span>
      </div>

      {/* Score bar */}
      <div className="score-bar mb-3">
        <div
          className="score-bar-fill"
          style={{ width: `${score}%`, background: color }}
        />
      </div>

      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-auto">
        {reasoning}
      </p>
    </div>
  );
}
