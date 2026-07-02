"use client";

import { useState } from "react";
import { evaluateMatter } from "@/lib/api";
import type { AppState } from "@/lib/types";
import MatterInput from "@/components/MatterInput";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ResultsDisplay from "@/components/ResultsDisplay";

export default function Home() {
  const [state, setState] = useState<AppState>({ status: "empty" });

  const handleSubmit = async (summary: string) => {
    setState({ status: "loading" });
    try {
      const data = await evaluateMatter(summary);
      setState({ status: "success", data });
    } catch (err) {
      setState({
        status: "error",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  const handleReset = () => setState({ status: "empty" });

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text)] tracking-tight">
            Matter Intake Evaluator
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1 text-sm leading-relaxed">
            Paste a matter summary to receive AI-powered classification,
            conflict check, risk assessment, and staffing recommendations.
          </p>
        </header>

        {/* Input always visible */}
        <MatterInput
          onSubmit={handleSubmit}
          disabled={state.status === "loading"}
        />

        {/* Content area */}
        <div className="mt-8">
          {state.status === "empty" && <EmptyState />}
          {state.status === "loading" && <LoadingState />}
          {state.status === "error" && (
            <ErrorState error={state.error} onRetry={handleReset} />
          )}
          {state.status === "success" && (
            <ResultsDisplay data={state.data} onReset={handleReset} />
          )}
        </div>
      </div>
    </main>
  );
}
