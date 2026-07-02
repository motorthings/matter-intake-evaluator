"use client";

import { useEffect, useState } from "react";
import { FileSearch, Clock, ChevronRight, X, ChevronDown, ChevronUp } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Evaluation {
  id: number;
  created_at: string;
  overall_score: number;
  overall_risk_level: string;
  practice_area: string;
  practice_area_confidence: number;
  urgency_level: string;
  risk_score: number;
  conflict_type: string;
  conflict_entity: string | null;
  recommended_role: string;
  estimated_hours: number;
  completeness: number;
  clarity: number;
  summary_preview: string;
  processing_time_ms: number;
  model_used: string;
}

interface AuditTrail {
  id: number;
  created_at: string;
  overall_score: number;
  overall_risk_level: string;
  audit_trail: {
    pipeline_stages: Array<{
      stage: string;
      description: string;
      input: string;
      output: string;
      key_decisions: string[];
    }>;
    rubrics_used: Record<string, any>;
    explainability_summary: string;
  };
  rubrics?: Record<string, any>;
}

function riskColor(level: string) {
  if (level === "high") return "text-red-400 bg-red-950/30";
  if (level === "medium") return "text-amber-400 bg-amber-950/30";
  return "text-emerald-400 bg-emerald-950/30";
}

export default function HistoryPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [auditOpen, setAuditOpen] = useState<number | null>(null);
  const [auditData, setAuditData] = useState<AuditTrail | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const [expandedStages, setExpandedStages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch(`${API_BASE}/api/evaluations`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setEvaluations(data.evaluations);
        else setError(data.error || "Failed to load");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const openAudit = async (id: number) => {
    setAuditOpen(id);
    setAuditLoading(true);
    setAuditData(null);
    setExpandedStages({});
    try {
      const r = await fetch(`${API_BASE}/api/evaluations/${id}/audit`);
      const data = await r.json();
      if (data.success) setAuditData(data.audit_trail);
    } catch (e) {
      setAuditData(null);
    } finally {
      setAuditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#e4e8ef] tracking-tight">
          Evaluation History
        </h1>
        <p className="text-[#8c9aad] mt-1 text-sm">
          Previous matter intake evaluations with full audit trails.
        </p>
      </header>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {evaluations.length === 0 ? (
        <div className="bg-[#111820] rounded-xl border border-white/6 p-6 text-center py-16">
          <FileSearch className="w-12 h-12 text-gray-300 dark:text-[#1e293b] mx-auto mb-4" />
          <p className="text-[#8c9aad]">No evaluations yet.</p>
        </div>
      ) : (
        <div className="bg-[#111820] rounded-xl border border-white/6 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-6 py-3 text-xs font-medium text-[#8c9aad] uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-[#8c9aad] uppercase">Practice Area</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-[#8c9aad] uppercase">Score</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-[#8c9aad] uppercase">Risk</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-[#8c9aad] uppercase">Staffing</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-[#8c9aad] uppercase">Audit</th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((ev) => (
                  <tr
                    key={ev.id}
                    className="border-b border-white/6 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-3 text-sm text-[#8c9aad] whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(ev.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-[#e4e8ef]">
                      {ev.practice_area}
                    </td>
                    <td className="px-6 py-3 text-sm font-semibold text-[#e4e8ef]">
                      {ev.overall_score}/100
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${riskColor(ev.overall_risk_level)}`}>
                        {ev.overall_risk_level}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-[#8c9aad] max-w-[200px] truncate">
                      {ev.recommended_role}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => openAudit(ev.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        <FileSearch className="w-3.5 h-3.5" />
                        Audit
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Audit trail slide-out */}
      {auditOpen !== null && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setAuditOpen(null)} />
          <div className="relative w-full max-w-2xl bg-[#111820] h-full overflow-y-auto shadow-xl border-l border-white/6">
            <div className="sticky top-0 bg-[#111820] border-b border-white/6 p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#e4e8ef]">
                Audit Trail
              </h2>
              <button
                onClick={() => setAuditOpen(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-[#e2e8f0] rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {auditLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : auditData ? (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="bg-primary-50 dark:bg-primary-950/20 rounded-lg p-4 border border-primary-100 dark:border-primary-900">
                    <p className="text-sm text-primary-900 dark:text-primary-200 leading-relaxed">
                      {auditData.audit_trail.explainability_summary}
                    </p>
                  </div>

                  {/* Pipeline stages */}
                  {auditData.audit_trail.pipeline_stages.map((stage) => {
                    const isExpanded = expandedStages[stage.stage] || false;
                    return (
                      <div key={stage.stage} className="border border-white/6 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedStages((prev) => ({ ...prev, [stage.stage]: !isExpanded }))}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <div>
                            <div className="text-sm font-medium text-[#e4e8ef]">
                              Stage {stage.stage.replace("_", " ")}: {stage.description}
                            </div>
                            <div className="text-xs text-[#8c9aad] mt-1">
                              {stage.key_decisions.map((d, i) => (
                                <div key={i}>{d}</div>
                              ))}
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="border-t border-white/6 p-4 space-y-4 bg-gray-50/50 dark:bg-[#1a2236]/50">
                            <div>
                              <div className="text-xs font-medium text-[#8c9aad] mb-1 uppercase">Input (Raw Prompt)</div>
                              <pre className="text-xs text-gray-700 dark:text-[#cbd5e1] whitespace-pre-wrap font-mono bg-[#111820] rounded p-3 border border-white/6 max-h-48 overflow-y-auto">
                                {stage.input}
                              </pre>
                            </div>
                            <div>
                              <div className="text-xs font-medium text-[#8c9aad] mb-1 uppercase">Output (Raw Response)</div>
                              <pre className="text-xs text-gray-700 dark:text-[#cbd5e1] whitespace-pre-wrap font-mono bg-[#111820] rounded p-3 border border-white/6 max-h-48 overflow-y-auto">
                                {stage.output}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Rubrics used */}
                  {auditData.rubrics && Object.keys(auditData.rubrics).length > 0 && (
                    <div className="border border-white/6 rounded-lg p-4">
                      <div className="text-sm font-medium text-[#e4e8ef] mb-3">
                        Rubrics Used (version snapshot)
                      </div>
                      <pre className="text-xs text-gray-700 dark:text-[#cbd5e1] whitespace-pre-wrap font-mono bg-[#1a2230] rounded p-3 max-h-64 overflow-y-auto">
                        {JSON.stringify(auditData.rubrics, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-[#8c9aad]">Failed to load audit trail.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
