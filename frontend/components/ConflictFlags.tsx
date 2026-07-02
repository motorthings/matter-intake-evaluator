import type { ConflictEntry } from "@/lib/types";
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

interface ConflictFlagsProps {
  conflict: ConflictEntry;
}

const CONFIG: Record<string, { icon: typeof ShieldAlert; label: string; color: string }> = {
  direct_adverse: { icon: ShieldAlert, label: "Direct Adverse", color: "#f87171" },
  business_conflict: { icon: ShieldQuestion, label: "Business Conflict", color: "#fbbf24" },
  none_identified: { icon: ShieldCheck, label: "None Identified", color: "#34d399" },
};

export default function ConflictFlags({ conflict }: ConflictFlagsProps) {
  const c = CONFIG[conflict.conflict_type] || CONFIG.none_identified;
  const Icon = c.icon;

  return (
    <div className="bg-[#111820] rounded-xl border border-white/6 p-6">
      <h4 className="text-sm font-medium text-[#e4e8ef] mb-3">
        Conflict Check
      </h4>

      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4" style={{ color: c.color }} />
        <span className="text-xs font-medium" style={{ color: c.color }}>
          {c.label}
        </span>
      </div>

      {conflict.entity_name && (
        <p className="text-sm text-[#e4e8ef] mb-2">
          <span className="text-[#8c9aad]">Entity:</span>{" "}
          <span className="font-medium">{conflict.entity_name}</span>
        </p>
      )}

      <p className="text-xs text-[#8c9aad] leading-relaxed">
        {conflict.detail}
      </p>
    </div>
  );
}
