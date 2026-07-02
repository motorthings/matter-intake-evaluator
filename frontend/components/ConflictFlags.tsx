import type { ConflictEntry } from "@/lib/types";
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

interface ConflictFlagsProps {
  conflict: ConflictEntry;
}

const CONFIG: Record<string, { icon: typeof ShieldAlert; label: string; color: string }> = {
  direct_adverse: { icon: ShieldAlert, label: "Direct Adverse", color: "#dc2626" },
  business_conflict: { icon: ShieldQuestion, label: "Business Conflict", color: "#d97706" },
  none_identified: { icon: ShieldCheck, label: "None Identified", color: "#059669" },
};

export default function ConflictFlags({ conflict }: ConflictFlagsProps) {
  const c = CONFIG[conflict.conflict_type] || CONFIG.none_identified;
  const Icon = c.icon;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/6 p-6">
      <h4 className="text-sm font-medium text-gray-900 dark:text-[#e2e8f0] mb-3">
        Conflict Check
      </h4>

      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4" style={{ color: c.color }} />
        <span className="text-xs font-medium" style={{ color: c.color }}>
          {c.label}
        </span>
      </div>

      {conflict.entity_name && (
        <p className="text-sm text-gray-900 dark:text-[#e2e8f0] mb-2">
          <span className="text-gray-400 dark:text-[#64748b]">Entity:</span>{" "}
          <span className="font-medium">{conflict.entity_name}</span>
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-[#94a3b8] leading-relaxed">
        {conflict.detail}
      </p>
    </div>
  );
}
