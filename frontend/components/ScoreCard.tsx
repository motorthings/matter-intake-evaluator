interface ScoreCardProps {
  name: string;
  score: number;
  weight: number;
  reasoning: string;
  color: string;
}

export default function ScoreCard({ name, score, weight, reasoning, color }: ScoreCardProps) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/6 p-6 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900 dark:text-[#e2e8f0] leading-tight">
          {name}
        </h4>
        <span className="text-xs text-gray-400 dark:text-[#64748b] bg-gray-50 dark:bg-[#1a2236] px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
          {Math.round(weight * 100)}%
        </span>
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-sm text-gray-400 dark:text-[#64748b]">/100</span>
      </div>

      {/* Score bar */}
      <div className="h-1.5 rounded-full bg-gray-100 dark:bg-[#1e293b] mb-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, background: color }}
        />
      </div>

      <p className="text-xs text-gray-500 dark:text-[#94a3b8] leading-relaxed mt-auto">
        {reasoning}
      </p>
    </div>
  );
}
