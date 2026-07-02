"use client";

import { useEffect, useState } from "react";

export default function LoadingState() {
  const [stage, setStage] = useState<"classifying" | "evaluating">(
    "classifying"
  );

  useEffect(() => {
    // Simulate two-stage progression for visual feedback
    const t1 = setTimeout(() => setStage("evaluating"), 2000);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--color-text-secondary)]">
          {stage === "classifying"
            ? "Classifying practice area..."
            : "Evaluating across 5 dimensions..."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="card">
            <div className="skeleton h-4 w-32 mb-3" />
            <div className="skeleton h-8 w-16 mb-3" />
            <div className="skeleton h-2 w-full mb-2" />
            <div className="skeleton h-3 w-full mb-1" />
            <div className="skeleton h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
