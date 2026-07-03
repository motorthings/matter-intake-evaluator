"use client";

import { useEffect, useState } from "react";
import { Save, Key, Users, BookOpen, Check, ChevronDown, ChevronUp, Plus, X, Trash2 } from "lucide-react";

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
  const [teamsExpanded, setTeamsExpanded] = useState(true);
  const [rubricsExpanded, setRubricsExpanded] = useState(true);
  // Track which team's role input is active
  const [newRoleInput, setNewRoleInput] = useState<Record<number, string>>({});

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

  // Team mutation helpers
  const addTeam = () => {
    setTeams([...teams, { name: "New Team", roles: [] }]);
  };

  const removeTeam = (index: number) => {
    setTeams(teams.filter((_, i) => i !== index));
  };

  const addRole = (teamIndex: number, role: string) => {
    if (!role.trim()) return;
    const updated = [...teams];
    updated[teamIndex] = {
      ...updated[teamIndex],
      roles: [...updated[teamIndex].roles, role.trim()],
    };
    setTeams(updated);
    setNewRoleInput({ ...newRoleInput, [teamIndex]: "" });
  };

  const removeRole = (teamIndex: number, roleIndex: number) => {
    const updated = [...teams];
    updated[teamIndex] = {
      ...updated[teamIndex],
      roles: updated[teamIndex].roles.filter((_, i) => i !== roleIndex),
    };
    setTeams(updated);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-[#e4e8ef] tracking-tight">
          Settings
        </h1>
        <p className="text-[#8c9aad] mt-1 text-sm">
          Configure teams, evaluation rubrics, and categories.
        </p>
      </header>

      <div className="space-y-6">
        {/* API Configuration */}
        <section className="bg-[#111820] rounded-xl border border-white/6 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <h2 className="text-sm font-semibold text-[#e4e8ef]">
              API Configuration
            </h2>
          </div>
          <p className="text-xs text-[#8c9aad] leading-relaxed">
            The LLM provider and model are configured via environment variables on the server.
            Set <code className="bg-[#1a2230] px-1 rounded">LLM_API_KEY</code> for
            DeepSeek or Anthropic (auto-detected by key prefix). Override model with{" "}
            <code className="bg-[#1a2230] px-1 rounded">ROUTER_MODEL</code> and{" "}
            <code className="bg-[#1a2230] px-1 rounded">EVALUATOR_MODEL</code>.
          </p>
        </section>

        {/* Teams — expandable */}
        <section className="bg-[#111820] rounded-xl border border-white/6 overflow-hidden">
          <button
            onClick={() => setTeamsExpanded(!teamsExpanded)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <h2 className="text-sm font-semibold text-[#e4e8ef]">
                Staffing Teams
              </h2>
              <span className="text-xs text-[#8c9aad]">({teams.length})</span>
            </div>
            {teamsExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
          </button>
          {teamsExpanded && (
            <div className="border-t border-white/6 p-6 space-y-4">
              {teams.map((team, ti) => (
                <div key={ti} className="border border-white/6 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      value={team.name}
                      onChange={(e) => {
                        const updated = [...teams];
                        updated[ti] = { ...team, name: e.target.value };
                        setTeams(updated);
                      }}
                      className="flex-1 px-3 py-1.5 text-sm font-medium bg-[#0d1117] border border-gray-200 dark:border-white/10 rounded-md text-[#e4e8ef]"
                      placeholder="Team name"
                    />
                    <button
                      onClick={() => removeTeam(ti)}
                      className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                      title="Delete team"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Role tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {team.roles.map((role, ri) => (
                      <span
                        key={ri}
                        className="inline-flex items-center gap-1 text-xs bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full"
                      >
                        {role}
                        <button
                          onClick={() => removeRole(ti, ri)}
                          className="hover:text-primary-900 dark:hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add role input */}
                  <div className="flex items-center gap-2">
                    <input
                      value={newRoleInput[ti] || ""}
                      onChange={(e) =>
                        setNewRoleInput({ ...newRoleInput, [ti]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addRole(ti, newRoleInput[ti] || "");
                        }
                      }}
                      placeholder="Add role…"
                      className="flex-1 px-2.5 py-1 text-xs bg-[#0d1117] border border-dashed border-white/10 rounded-md text-[#e4e8ef] placeholder:text-[#5a6a7e] focus:border-white/20 transition-colors"
                    />
                    <button
                      onClick={() => addRole(ti, newRoleInput[ti] || "")}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-[#8c9aad] hover:bg-white/10 hover:text-[#e4e8ef] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                </div>
              ))}

              {/* Add team + Save row */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={addTeam}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 text-[#8c9aad] hover:bg-white/10 hover:text-[#e4e8ef] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Team
                </button>
                <button
                  onClick={() => saveSetting("teams", teams)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  {saved === "teams" ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {saved === "teams" ? "Saved" : "Save Teams"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Rubrics — expandable */}
        <section className="bg-[#111820] rounded-xl border border-white/6 overflow-hidden">
          <button
            onClick={() => setRubricsExpanded(!rubricsExpanded)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <h2 className="text-sm font-semibold text-[#e4e8ef]">
                Evaluation Rubrics
              </h2>
            </div>
            {rubricsExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
          </button>
          {rubricsExpanded && (
            <div className="border-t border-white/6 p-6 space-y-4">
              {/* Practice areas */}
              <div>
                <h3 className="text-xs font-medium text-[#8c9aad] uppercase mb-2">Practice Areas</h3>
                <textarea
                  value={rubrics.practice_areas.join("\n")}
                  onChange={(e) => setRubrics({ ...rubrics, practice_areas: e.target.value.split("\n").filter(Boolean) })}
                  rows={6}
                  className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-[#0d1117] px-3 py-2 text-sm text-[#e4e8ef] font-mono resize-y"
                />
              </div>

              {/* Urgency criteria */}
              <div>
                <h3 className="text-xs font-medium text-[#8c9aad] uppercase mb-2">Urgency Criteria</h3>
                {Object.entries(rubrics.urgency_criteria).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-3 mb-2">
                    <span className="text-xs font-medium text-[#e4e8ef] w-24 flex-shrink-0 pt-2">{key}</span>
                    <input
                      value={val as string}
                      onChange={(e) => setRubrics({
                        ...rubrics,
                        urgency_criteria: { ...rubrics.urgency_criteria, [key]: e.target.value },
                      })}
                      className="flex-1 px-3 py-1.5 text-sm bg-[#0d1117] border border-gray-200 dark:border-white/10 rounded-md text-[#e4e8ef]"
                    />
                  </div>
                ))}
              </div>

              {/* Conflict types */}
              <div>
                <h3 className="text-xs font-medium text-[#8c9aad] uppercase mb-2">Conflict Types</h3>
                {Object.entries(rubrics.conflict_types).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-3 mb-2">
                    <span className="text-xs font-medium text-[#e4e8ef] w-32 flex-shrink-0 pt-2">{key}</span>
                    <input
                      value={val as string}
                      onChange={(e) => setRubrics({
                        ...rubrics,
                        conflict_types: { ...rubrics.conflict_types, [key]: e.target.value },
                      })}
                      className="flex-1 px-3 py-1.5 text-sm bg-[#0d1117] border border-gray-200 dark:border-white/10 rounded-md text-[#e4e8ef]"
                    />
                  </div>
                ))}
              </div>

              {/* Data integrity dimensions */}
              <div>
                <h3 className="text-xs font-medium text-[#8c9aad] uppercase mb-2">Data Integrity Dimensions</h3>
                <textarea
                  value={rubrics.data_integrity_dimensions.join("\n")}
                  onChange={(e) => setRubrics({ ...rubrics, data_integrity_dimensions: e.target.value.split("\n").filter(Boolean) })}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 dark:border-white/10 bg-[#0d1117] px-3 py-2 text-sm text-[#e4e8ef] font-mono resize-y"
                />
              </div>

              {/* Rubrics Save */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => saveSetting("rubrics", rubrics)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  {saved === "rubrics" ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                  {saved === "rubrics" ? "Saved" : "Save Rubrics"}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
