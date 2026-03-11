"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Bot, Send, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

type VulnHit = {
  cve_id: string;
  description: string;
  severity: string | null;
  cvss_score: number | null;
  exploitation_idea: string;
  references: string[];
};

type AssistantResponse = {
  analysis_summary: string;
  vulnerabilities: VulnHit[];
  mitigation_advice: string;
  next_steps: string[];
};

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-slate-100 text-slate-600",
};

function AssistantContent() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AssistantResponse | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const r = await fetch(`${API}/api/assistant/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await r.json();
      setResponse(data);
    } catch {
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Bot size={22} className="text-purple-600" /> AI Pentester Assistant
        </h1>
        <p className="text-sm text-slate-500">Describe your target — get CVE mapping, exploitation ideas, and mitigations</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={4}
            placeholder={`Target info:\nnginx 1.18\nport 80 open\nubuntu server 22.04`}
            className="w-full bg-transparent text-sm resize-none focus:outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
          />
          <div className="flex justify-end mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="flex items-center gap-2 bg-[#0646ac] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#0646ac]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <Send size={14} />
              )}
              Analyze
            </button>
          </div>
        </div>
      </form>

      {response && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-2">Analysis Summary</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{response.analysis_summary}</p>
          </div>

          {response.vulnerabilities.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wider">
                Vulnerabilities Found ({response.vulnerabilities.length})
              </h2>
              {response.vulnerabilities.map((v) => (
                <div key={v.cve_id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggle(v.cve_id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={16} className="text-orange-500 flex-shrink-0" />
                      <span className="font-bold text-sm">{v.cve_id}</span>
                      {v.severity && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${severityColors[v.severity] || ""}`}>
                          {v.cvss_score} {v.severity}
                        </span>
                      )}
                    </div>
                    {expanded.has(v.cve_id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {expanded.has(v.cve_id) && (
                    <div className="px-5 pb-5 space-y-3 border-t border-slate-100 dark:border-slate-800 pt-3">
                      <p className="text-xs text-slate-600 dark:text-slate-400">{v.description}</p>
                      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg p-3">
                        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-1">Exploitation Idea</p>
                        <p className="text-xs text-slate-700 dark:text-slate-300">{v.exploitation_idea}</p>
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        <Link href={`/cves/${v.cve_id}`} className="text-xs text-[#0646ac] hover:underline font-medium">View CVE Details →</Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0646ac]/5 border border-[#0646ac]/20 rounded-xl p-5">
              <h3 className="font-bold text-sm text-[#0646ac] mb-2">Mitigation Advice</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{response.mitigation_advice}</p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">Next Steps</h3>
              <ul className="space-y-1">
                {response.next_steps.map((step, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="text-[#0646ac] font-bold mt-0.5">{i + 1}.</span> {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading...</div>}>
      <AssistantContent />
    </Suspense>
  );
}
