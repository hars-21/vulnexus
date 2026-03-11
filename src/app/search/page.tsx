"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, AlertTriangle, ArrowRight } from "lucide-react";

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-slate-100 text-slate-600",
};

type CVEResult = {
  cve_id: string;
  description: string;
  cvss_v3_score: number | null;
  severity: string | null;
  published_date: string | null;
  has_exploit: boolean;
  patch_available: boolean;
};

function SearchContent() {
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [input, setInput] = useState(initialQ);
  const [results, setResults] = useState<CVEResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/cves/search?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => {
        setResults(d.results || []);
        setTotal(d.total || 0);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(input.trim());
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">CVE Search</h1>
        <p className="text-sm text-slate-500">Hybrid BM25 + semantic vector search over 250K+ CVEs</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`e.g. "nginx 1.18" or "log4j rce"`}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0646ac]/20 focus:border-[#0646ac]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#0646ac] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-[#0646ac]/90 transition-colors"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0646ac] border-t-transparent" />
        </div>
      )}

      {!loading && query && (
        <p className="text-xs text-slate-400 mb-4 font-medium uppercase tracking-wider">
          {total} results for &ldquo;{query}&rdquo;
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">CVE ID</th>
                <th className="px-5 py-3">Severity</th>
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Flags</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {results.map((cve) => (
                <tr key={cve.cve_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-5 py-3 font-bold text-[#0646ac] whitespace-nowrap">
                    <Link href={`/cves/${cve.cve_id}`} className="hover:underline">{cve.cve_id}</Link>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    {cve.severity && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${severityColors[cve.severity] || "bg-slate-100 text-slate-500"}`}>
                        {cve.cvss_v3_score} {cve.severity}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-400 max-w-xs">
                    <p className="line-clamp-2 text-xs">{cve.description}</p>
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="flex gap-1">
                      {cve.has_exploit && (
                        <span className="text-[10px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <AlertTriangle size={10} /> Exploit
                        </span>
                      )}
                      {cve.patch_available && (
                        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-1.5 py-0.5 rounded">
                          Patched
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/cves/${cve.cve_id}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#0646ac] opacity-0 group-hover:opacity-100 transition-all">
                      View <ArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && query && results.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No results found for &ldquo;{query}&rdquo;</p>
          <p className="text-xs mt-1">Try a different keyword or CVE ID</p>
        </div>
      )}

      {!query && (
        <div className="text-center py-20 text-slate-400">
          <Search size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">Search for CVEs, software, or keywords</p>
          <p className="text-xs mt-1">Examples: nginx 1.18 · log4j · CVE-2021-44228 · apache rce</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
