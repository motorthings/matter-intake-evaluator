import type { StaffingRecommendation as Staffing } from "@/lib/types";
import { Users } from "lucide-react";

interface StaffingRecommendationProps {
  staffing: Staffing;
}

export default function StaffingRecommendation({ staffing }: StaffingRecommendationProps) {
  return (
    <div className="bg-[#111820] rounded-xl border border-white/6 p-6">
      <h4 className="text-sm font-medium text-[#e4e8ef] mb-3">
        Staffing Recommendation
      </h4>

      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-primary-400" />
        <span className="text-base font-semibold text-[#e4e8ef]">
          {staffing.recommended_role}
        </span>
      </div>

      {staffing.estimated_hours > 0 && (
        <p className="text-xs text-[#8c9aad] mb-3 font-mono">
          Estimated: {staffing.estimated_hours.toLocaleString()} hours
        </p>
      )}

      <p className="text-xs text-[#8c9aad] leading-relaxed">
        {staffing.reasoning}
      </p>
    </div>
  );
}
