import type { StaffingRecommendation as Staffing } from "@/lib/types";
import { Users } from "lucide-react";

interface StaffingRecommendationProps {
  staffing: Staffing;
}

export default function StaffingRecommendation({ staffing }: StaffingRecommendationProps) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/6 p-6">
      <h4 className="text-sm font-medium text-gray-900 dark:text-[#e2e8f0] mb-3">
        Staffing Recommendation
      </h4>

      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        <span className="text-base font-semibold text-gray-900 dark:text-[#e2e8f0]">
          {staffing.recommended_role}
        </span>
      </div>

      {staffing.estimated_hours > 0 && (
        <p className="text-xs text-gray-400 dark:text-[#64748b] mb-3">
          Estimated: {staffing.estimated_hours.toLocaleString()} hours
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-[#94a3b8] leading-relaxed">
        {staffing.reasoning}
      </p>
    </div>
  );
}
