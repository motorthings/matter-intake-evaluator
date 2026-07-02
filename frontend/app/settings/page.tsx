"use client";

import { useEffect, useState } from "react";
import { Save, Key, Users, BookOpen, Check } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Defaults
const DEFAULT_TEAMS = [
  { name: "M&A Team", roles: ["Partner", "Senior Associate", "Associate", "Paralegal"] },
  { name: "Litigation Team", roles: ["Partner", "Senior Associate", "Associate", "Paralegal"] },
  { name: "IP Team", roles: ["Partner", "Senior Associate", "Patent Agent", "Paralegal"] },
];

const DEFAULT_RUBRICS = {
  practice_areas: [
    "Corporate M&A", "Litigation", "Intellectual Property", "Real Estate",
    "Labor & Employment", "Regulatory & Compliance", "Tax",
    "Bankruptcy & Restructuring", "White Collar & Investigations",
    "Technology Transactions", "Healthcare", "Energy & Infrastructure",
  ],
  urgency_criteria: {
    immediate: "Action required within days — court deadline, TRO, or imminent filing",
    short_term: "Action required within weeks — regulatory filing, transaction closing",
    routine: "Action required within months — standard matter, no pressing deadline",
  },
  conflict_types: {
    direct_adverse: "Named adverse party identified — direct conflict with current or former client",
    business_conflict: "Industry or business competition concern — may affect client relationships",
    none_identified: "No conflicts apparent from the matter summary provided",
  },
  data_integrity_dimensions: [
    "Client identity and contact information",
    "Counterparty identification",
    "Jurisdiction and venue",
    "Matter value or amount in controversy",
    "Timeline and key dates",
    "Regulatory approvals required",
    "Prior counsel or ongoing representation",
  ],
};

export default function SettingsPage() {
  const [teams, setTeams] = useState(DEFAULT_TEAMS);
  const [rubrics, setRubrics] = useState(DEFAULT_RUBRICS);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    // Load from server on mount
    fetch(`${API_BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          if (data.settings.teams) setTeams(JSON.parse(data.settings.teams));
          if (data.settings.rubrics) setRubrics(JSON.parse(data.settings.rubrics));
        }
      })
      .catch(() => {}); // Use defaults on error
  }, []);

  const saveSetting = async (key: string, value: any) => {
    try {
      await fetch(`${API_BASE}/api/settings/${key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: JSON.stringify(value) }),
      });
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-[#e2e8f0] tracking-tight">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-[#94a3b8] mt-1 text-sm">
          Configure teams, evaluation rubrics, and categories.
        </p>
      </header>

      <div className="space-y-6">
        {/* API Configuration */}
        <section className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-[#e2e8f0]">
              API Configuration
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-[#94a3b8] leading-relaxed">
            The LLM provider and model are configured via environment variables on the server.
            Set <code className="bg-gray-100 dark:bg-[#1a2236] px-1 rounded">LLM_API_KEY</code> for
            DeepSeek or Anthropic (auto-detected by key prefix). Override model with{" "}
            <code className="bg-gray-100 dark:bg-[#1a2236] px-1 rounded">ROUTER_MODEL</code> and{" "}
            <code className="bg-gray-100 dark:bg-[#1a2236] px-1 rounded">EVALUATOR_MODEL</code>.
          </p>
        </section>

        {/* Teams */}
        <section className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-[#e2e8f0]">
                Staffing Teams
              </h2>
            </div>
            <button
              onClick={() => saveSetting("teams", teams)}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {saved === "teams" ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {saved === "teams" ? "Saved" : "Save"}
            </button>
          </div>
          <div className="space-y-3">
            {teams.map((team, ti) => (
              <div key={ti} className="border border-gray-200 dark:border-white/6 rounded-lg p-4">
                <input
                  value={team.name}
                  onChange={(e) => {
                    const updated = [...teams];
                    updated[ti] = { ...team, name: e.target.value };
                    setTeams(updated);
                  }}
                  className="w-full px-3 py-1.5 text-sm font-medium bg-gray-50 dark:bg-[#1a2236] border border-gray-200 dark:border-white/10 rounded-md text-gray-900 dark:text-[#e2e8f0] mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {team.roles.map((role, ri) => (
                    <span key={ri} className="text-xs bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rubrics */}
        <section className="bg-white dark:bg-[#111827] rounded-xl border border-gray-200 dark:border-white/6 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-[#e2e8f0]">
                Evaluation Rubrics
              </h2>
            </div>
            <button
              onClick={() => saveSetting("rubrics", rubrics)}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {saved === "rubrics" ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {saved === "rubrics" ? "Saved" : "Save"}
            </button>
          </div>

          {/* Practice areas */}
          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-500 dark:text-[#94a3b8] uppercase mb-2">Practice Areas</h3>
            <textarea
              value={rubrics.practice_areas.join("\n")}
              onChange={(e) => setRubrics({ ...rubrics, practice_areas: e.target.value.split("\n").filter(Boolean) })}
              rows={6}
              className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a2236] px-3 py-2 text-sm text-gray-900 dark:text-[#e2e8f0] font-mono resize-y"
            />
          </div>

          {/* Urgency criteria */}
          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-500 dark:text-[#94a3b8] uppercase mb-2">Urgency Criteria</h3>
            {Object.entries(rubrics.urgency_criteria).map(([key, val]) => (
              <div key={key} className="flex items-start gap-3 mb-2">
                <span className="text-xs font-medium text-gray-900 dark:text-[#e2e8f0] w-24 flex-shrink-0 pt-2">{key}</span>
                <input
                  value={val as string}
                  onChange={(e) => setRubrics({
                    ...rubrics,
                    urgency_criteria: { ...rubrics.urgency_criteria, [key]: e.target.value },
                  })}
                  className="flex-1 px-3 py-1.5 text-sm bg-gray-50 dark:bg-[#1a2236] border border-gray-200 dark:border-white/10 rounded-md text-gray-900 dark:text-[#e2e8f0]"
                />
              </div>
            ))}
          </div>

          {/* Conflict types */}
          <div className="mb-4">
            <h3 className="text-xs font-medium text-gray-500 dark:text-[#94a3b8] uppercase mb-2">Conflict Types</h3>
            {Object.entries(rubrics.conflict_types).map(([key, val]) => (
              <div key={key} className="flex items-start gap-3 mb-2">
                <span className="text-xs font-medium text-gray-900 dark:text-[#e2e8f0] w-32 flex-shrink-0 pt-2">{key}</span>
                <input
                  value={val as string}
                  onChange={(e) => setRubrics({
                    ...rubrics,
                    conflict_types: { ...rubrics.conflict_types, [key]: e.target.value },
                  })}
                  className="flex-1 px-3 py-1.5 text-sm bg-gray-50 dark:bg-[#1a2236] border border-gray-200 dark:border-white/10 rounded-md text-gray-900 dark:text-[#e2e8f0]"
                />
              </div>
            ))}
          </div>

          {/* Data integrity dimensions */}
          <div>
            <h3 className="text-xs font-medium text-gray-500 dark:text-[#94a3b8] uppercase mb-2">Data Integrity Dimensions</h3>
            <textarea
              value={rubrics.data_integrity_dimensions.join("\n")}
              onChange={(e) => setRubrics({ ...rubrics, data_integrity_dimensions: e.target.value.split("\n").filter(Boolean) })}
              rows={4}
              className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a2236] px-3 py-2 text-sm text-gray-900 dark:text-[#e2e8f0] font-mono resize-y"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
