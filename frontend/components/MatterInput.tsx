"use client";

import { useState } from "react";
import { Send } from "lucide-react";

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
    <div className="bg-[#111820] rounded-xl border border-white/6 p-6">
      <label
        htmlFor="matter-summary"
        className="block text-sm font-medium text-[#e4e8ef] mb-2"
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
"Proposed acquisition of TargetCo, Inc. by Acme Corp. Stock-for-stock transaction valued at approximately $500M. TargetCo is a Delaware corporation with operations in 12 states. Requires HSR filing and shareholder approval from both entities..."`}
        className="w-full rounded-lg border border-white/10 bg-[#0d1117] px-4 py-3 text-sm text-[#e4e8ef] placeholder:text-[#55667a] focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent resize-y disabled:opacity-50 disabled:cursor-not-allowed font-mono"
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-[#55667a] font-mono">
          {value.length.toLocaleString()} characters · ⌘+Enter to submit
        </span>
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-[#0a0e14] bg-primary-500 hover:bg-primary-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg shadow-primary-500/10"
        >
          <Send className="w-4 h-4" />
          Evaluate Matter
        </button>
      </div>
    </div>
  );
}
