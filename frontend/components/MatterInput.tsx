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
    <div className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/6 p-6">
      <label
        htmlFor="matter-summary"
        className="block text-sm font-medium text-gray-900 dark:text-[#e2e8f0] mb-2"
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
        className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a2236] px-4 py-3 text-sm text-gray-900 dark:text-[#e2e8f0] placeholder:text-gray-400 dark:placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-y disabled:opacity-50 disabled:cursor-not-allowed font-mono"
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400 dark:text-[#64748b]">
          {value.length.toLocaleString()} characters · ⌘+Enter to submit
        </span>
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
          Evaluate Matter
        </button>
      </div>
    </div>
  );
}
