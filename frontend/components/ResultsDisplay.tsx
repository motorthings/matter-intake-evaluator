import type { EvaluateResponse } from "@/lib/types";
import RiskBadge from "./RiskBadge";
import ScoreCard from "./ScoreCard";
import ConflictFlags from "./ConflictFlags";
import StaffingRecommendation from "./StaffingRecommendation";

interface ResultsDisplayProps {
  data: EvaluateResponse;
  onReset: () => void;
}

function scoreColor(score: number): string {
  if (score >= 70) return "var(--color-success)";
  if (score >= 40) return "var(--color-warning)";
  return "var(--color-error)";
}

export default function ResultsDisplay({ data, onReset }: ResultsDisplayProps) {
  return (
    <div>
      {/* Overall header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">
              Evaluation Results
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {data.processing_time_ms.toLocaleString()}ms ·{" "}
              {data.model_used}
            </p>
          </div>
          <RiskBadge level={data.overall_risk_level} score={data.overall_score} />
        </div>
      </div>

      {/* Dimension score cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {data.dimension_scores.map((dim) => (
          <ScoreCard
            key={dim.dimension_name}
            name={dim.dimension_name}
            score={dim.score}
            weight={dim.weight}
            reasoning={dim.reasoning}
            color={scoreColor(dim.score)}
          />
        ))}
      </div>

      {/* Side-by-side: conflict + staffing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ConflictFlags conflict={data.conflict_check} />
        <StaffingRecommendation staffing={data.staffing} />
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-primary)] bg-[var(--color-primary-light)] hover:bg-[var(--color-primary-light)]/80 transition-colors"
        >
          Evaluate Another Matter
        </button>
      </div>
    </div>
  );
}
