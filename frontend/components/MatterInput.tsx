"use client";

import { useState } from "react";

interface MatterInputProps {
  onSubmit: (summary: string) => void;
  disabled: boolean;
}

export default function MatterInput({ onSubmit, disabled }: MatterInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue("");
  };

  return (
    <div className="card">
      <label
        htmlFor="matter-summary"
        className="block text-sm font-medium text-[var(--color-text)] mb-2"
      >
        Matter Summary
      </label>
      <textarea
        id="matter-summary"
        rows={12}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder={`Paste the matter summary here...

Example:
"Proposed acquisition of TargetCo, Inc. by Acme Corp. Stock-for-stock transaction valued at approximately $500M. TargetCo is a Delaware corporation with operations in 12 states. Requires HSR filing and shareholder approval..."`}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-transparent resize-y disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-[var(--color-text-muted)]">
          {value.length.toLocaleString()} characters · ⌘+Enter to submit
        </span>
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Evaluate Matter
        </button>
      </div>
    </div>
  );
}
