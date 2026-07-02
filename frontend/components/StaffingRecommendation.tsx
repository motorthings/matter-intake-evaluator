import type { StaffingRecommendation as Staffing } from "@/lib/types";

interface StaffingRecommendationProps {
  staffing: Staffing;
}

export default function StaffingRecommendation({
  staffing,
}: StaffingRecommendationProps) {
  return (
    <div className="card">
      <h4 className="text-sm font-medium text-[var(--color-text)] mb-3">
        👥 Staffing Recommendation
      </h4>

      <p className="text-base font-semibold text-[var(--color-text)] mb-2">
        {staffing.recommended_role}
      </p>

      {staffing.estimated_hours > 0 && (
        <p className="text-xs text-[var(--color-text-muted)] mb-3">
          Estimated: {staffing.estimated_hours.toLocaleString()} hours
        </p>
      )}

      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
        {staffing.reasoning}
      </p>
    </div>
  );
}
