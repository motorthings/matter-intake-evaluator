interface ScoreCardProps {
  name: string;
  score: number;
  weight: number;
  reasoning: string;
}

function scoreColor(score: number): string {
  if (score >= 70) return "#34d399";
  if (score >= 40) return "#fbbf24";
  return "#f87171";
}

export default function ScoreCard({ name, score, weight, reasoning }: ScoreCardProps) {
  const color = scoreColor(score);

  return (
    <div className="bg-[#111820] rounded-xl border border-white/6 p-6 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-medium text-[#e4e8ef] leading-tight">
          {name}
        </h4>
        <span className="text-xs text-[#8c9aad] bg-[#1a2230] px-2 py-0.5 rounded-full whitespace-nowrap ml-2 font-mono">
          {Math.round(weight * 100)}%
        </span>
      </div>

      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold font-mono" style={{ color }}>
          {score}
        </span>
        <span className="text-sm text-[#55667a]">/100</span>
      </div>

      <div className="h-1.5 rounded-full bg-[#1a2230] mb-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, background: color }}
        />
      </div>

      <p className="text-xs text-[#8c9aad] leading-relaxed mt-auto">
        {reasoning}
      </p>
    </div>
  );
}
