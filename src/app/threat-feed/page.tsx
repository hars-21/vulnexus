"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, AlertTriangle, Filter } from "lucide-react";

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-slate-100 text-slate-600",
};

type CVE = {
  cve_id: string;
  description: string;
  cvss_v3_score: number | null;
  severity: string | null;
  published_date: string | null;
  has_exploit: boolean;
  patch_available: boolean;
};

export default function ThreatFeedPage() {
  const [cves, setCves] = useState<CVE[]>([]);
  const [loading, setLoading] = useState(true);
  const [severity, setSeverity] = useState("");
  const [hasExploit, setHasExploit] = useState<boolean | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (severity) params.set("severity", severity);
    if (hasExploit !== null) params.set("has_exploit", String(hasExploit));

    fetch(`${API}/api/threat-feed?${params}`)
      .then((r) => r.json())
      .then((d) => setCves(d.results || []))
      .catch(() => setCves([]))
      .finally(() => setLoading(false));
  }, [API, severity, hasExploit]);

  return (
    <div className="max-w-5xl">
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <Radio size={22} className="text-red-500" /> Threat Feed
          </h1>
          <p className="text-sm text-slate-500">Live stream of newly disclosed CVEs</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Filter size={14} className="text-slate-400" />
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0646ac]/20"
            >
              <option value="">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={hasExploit === true}
              onChange={(e) => setHasExploit(e.target.checked ? true : null)}
              className="rounded border-slate-300"
            />
            Exploit Available
          </label>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0646ac] border-t-transparent" />
        </div>
      )}

      {!loading && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">CVE ID</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Published</th>
                <th className="px-5 py-3">Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {cves.map((cve) => (
                <tr key={cve.cve_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-5 py-3 font-bold text-[#0646ac] whitespace-nowrap">
                    <Link href={`/cves/${cve.cve_id}`} className="hover:underline">{cve.cve_id}</Link>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    {cve.severity && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${severityColors[cve.severity] || ""}`}>
                        {cve.cvss_v3_score} {cve.severity}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-400 max-w-xs">
                    <p className="line-clamp-2 text-xs">{cve.description}</p>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-500 whitespace-nowrap">
                    {cve.published_date ? new Date(cve.published_date).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      {cve.has_exploit && (
                        <span className="text-[10px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <AlertTriangle size={10} /> Exploit
                        </span>
                      )}
                      {cve.patch_available && (
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-1.5 py-0.5 rounded">Patched</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {cves.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Radio size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No CVEs match the current filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
