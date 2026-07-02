import type { ConflictEntry } from "@/lib/types";

interface ConflictFlagsProps {
  conflict: ConflictEntry;
}

const CONFIG: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  direct_adverse: {
    bg: "#fef2f2",
    text: "#dc2626",
    border: "#fecaca",
    label: "Direct Adverse",
  },
  business_conflict: {
    bg: "#fffbeb",
    text: "#d97706",
    border: "#fde68a",
    label: "Business Conflict",
  },
  none_identified: {
    bg: "#ecfdf5",
    text: "#059669",
    border: "#a7f3d0",
    label: "None Identified",
  },
};

export default function ConflictFlags({ conflict }: ConflictFlagsProps) {
  const c = CONFIG[conflict.conflict_type] || CONFIG.none_identified;

  return (
    <div className="card">
      <h4 className="text-sm font-medium text-[var(--color-text)] mb-3">
        🔍 Conflict Check
      </h4>

      <span
        className="inline-block text-xs font-medium px-2.5 py-1 rounded-full border mb-3"
        style={{ background: c.bg, color: c.text, borderColor: c.border }}
      >
        {c.label}
      </span>

      {conflict.entity_name && (
        <p className="text-sm text-[var(--color-text)] mb-2">
          <span className="text-[var(--color-text-muted)]">Entity:</span>{" "}
          <span className="font-medium">{conflict.entity_name}</span>
        </p>
      )}

      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
        {conflict.detail}
      </p>
    </div>
  );
}
