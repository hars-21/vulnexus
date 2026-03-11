"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Shield, Bug, CheckCircle, Clock, ExternalLink, ChevronDown, ChevronUp, Terminal, ThumbsUp, ThumbsDown
} from "lucide-react";

const severityColors: Record<string, string> = {
  CRITICAL: "text-red-500",
  HIGH: "text-orange-500",
  MEDIUM: "text-yellow-600",
  LOW: "text-slate-500",
};

type CVE = {
  cve_id: string;
  description: string;
  cvss_v3_score: number | null;
  cvss_v2_score: number | null;
  severity: string | null;
  published_date: string | null;
  last_modified: string | null;
  has_exploit: boolean;
  patch_available: boolean;
  references: string[] | null;
  cwe_ids: string[] | null;
};

type POC = {
  id: number;
  title: string;
  reproduction_steps: string | null;
  author_username: string;
  vote_count: number;
  verification_status: string;
  created_at: string;
};

export default function CVEDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [cve, setCve] = useState<CVE | null>(null);
  const [pocs, setPocs] = useState<POC[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTech, setShowTech] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      fetch(`${API}/api/cves/${id}`).then((r) => r.json()),
      fetch(`${API}/api/pocs/${id}`).then((r) => r.json()).catch(() => []),
    ])
      .then(([cveData, pocData]) => {
        if (!cveData.detail) setCve(cveData);
        setPocs(Array.isArray(pocData) ? pocData : []);
      })
      .finally(() => setLoading(false));
  }, [id, API]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0646ac] border-t-transparent" />
      </div>
    );
  }

  if (!cve) {
    return (
      <div className="text-center py-32 text-slate-400">
        <Shield size={48} className="mx-auto mb-3 opacity-30" />
        <p className="font-bold">CVE not found</p>
        <Link href="/search" className="text-[#0646ac] text-sm mt-2 inline-block hover:underline">← Back to search</Link>
      </div>
    );
  }

  const score = cve.cvss_v3_score ?? cve.cvss_v2_score;
  const maxScore = 10;
  const circumference = 2 * Math.PI * 56;
  const dashoffset = circumference - ((score ?? 0) / maxScore) * circumference;

  return (
    <div className="max-w-6xl">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8">
          <nav className="text-xs text-slate-400 mb-4 flex items-center gap-2">
            <Link href="/search" className="hover:text-[#0646ac]">CVE Search</Link>
            <span>/</span>
            <span className="text-slate-600 font-medium">{cve.cve_id}</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mb-3">
            {cve.cve_id}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 italic leading-relaxed mb-6">
            {cve.description}
          </p>
          <hr className="border-slate-200 dark:border-slate-800 mb-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Shield size={18} className="text-[#0646ac]" /> Overview
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-7">{cve.description}</p>
          </section>

          <section className="mb-10">
            <div
              className="group bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setShowTech((p) => !p)}
                className="flex items-center justify-between w-full p-5 cursor-pointer"
              >
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Terminal size={18} className="text-[#0646ac]" /> Technical Details
                </h2>
                {showTech ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {showTech && (
                <div className="px-5 pb-5 text-sm text-slate-700 dark:text-slate-300 space-y-3">
                  {cve.cwe_ids && cve.cwe_ids.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cve.cwe_ids.map((c) => (
                        <span key={c} className="px-2 py-1 bg-[#0646ac]/10 text-[#0646ac] rounded text-xs font-bold">{c}</span>
                      ))}
                    </div>
                  )}
                  {cve.cvss_v3_score && (
                    <p className="text-xs font-mono bg-slate-900 text-green-400 p-3 rounded">
                      CVSS 3.x Score: {cve.cvss_v3_score} ({cve.severity})
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>

          {cve.references && cve.references.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                <ExternalLink size={18} className="text-[#0646ac]" /> References
              </h2>
              <ul className="space-y-2">
                {cve.references.slice(0, 8).map((ref, i) => (
                  <li key={i}>
                    <a href={ref} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-[#0646ac] hover:underline">
                      <ExternalLink size={12} />
                      <span className="truncate">{ref}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
              <Terminal size={18} className="text-[#0646ac]" /> Community POCs
            </h2>
            {pocs.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
                <p className="text-sm font-medium mb-2">No POCs submitted yet</p>
                <Link href="/pocs/submit" className="text-[#0646ac] text-xs font-bold hover:underline">Submit a POC</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {pocs.map((poc) => (
                  <div key={poc.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-4">
                    <div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 px-3 rounded-lg min-w-[48px] gap-1">
                      <button className="text-slate-400 hover:text-[#0646ac]"><ThumbsUp size={14} /></button>
                      <span className="font-bold text-sm">{poc.vote_count}</span>
                      <button className="text-slate-400 hover:text-red-500"><ThumbsDown size={14} /></button>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm mb-1">{poc.title}</h4>
                      {poc.reproduction_steps && (
                        <p className="text-xs text-slate-500 line-clamp-2 mb-2">{poc.reproduction_steps}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>@{poc.author_username}</span>
                        <span>{new Date(poc.created_at).toLocaleDateString()}</span>
                        {poc.verification_status !== "unverified" && (
                          <span className="text-green-600 font-bold flex items-center gap-1">
                            <CheckCircle size={10} /> {poc.verification_status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="xl:col-span-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 sticky top-24">
            <div className="bg-[#0646ac] p-5 text-white text-center">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">CVE IDENTIFIER</p>
              <p className="text-2xl font-black">{cve.cve_id}</p>
            </div>
            <div className="p-6 space-y-5">
              {score && (
                <div className="flex flex-col items-center pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle className="text-slate-100 dark:text-slate-800" cx="56" cy="56" fill="transparent" r="52" stroke="currentColor" strokeWidth="8" />
                      <circle
                        className={score >= 9 ? "text-red-500" : score >= 7 ? "text-orange-500" : "text-yellow-500"}
                        cx="56" cy="56" fill="transparent" r="52"
                        stroke="currentColor"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashoffset}
                        strokeWidth="8"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{score}</span>
                      <span className={`text-[10px] font-bold uppercase ${severityColors[cve.severity || ""] || "text-slate-500"}`}>
                        {cve.severity}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 uppercase font-bold tracking-widest">CVSS Base Score</p>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2"><Clock size={14} /> Published</span>
                  <span className="font-medium text-xs">{cve.published_date ? new Date(cve.published_date).toLocaleDateString() : "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2"><Bug size={14} /> Exploitability</span>
                  <span className={`font-bold text-xs ${cve.has_exploit ? "text-red-500" : "text-slate-400"}`}>
                    {cve.has_exploit ? "Public POC" : "No Known PoC"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 flex items-center gap-2"><CheckCircle size={14} /> Patch</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${cve.patch_available ? "bg-green-100 text-green-700" : "bg-red-50 text-red-500"}`}>
                    {cve.patch_available ? "Available" : "None"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Link href={`/assistant?q=${cve.cve_id}`}
                  className="w-full py-2.5 bg-[#0646ac]/10 hover:bg-[#0646ac]/20 text-[#0646ac] text-sm font-bold rounded-lg transition-all border border-[#0646ac]/20 text-center">
                  Ask AI Assistant
                </Link>
                <Link href="/pocs/submit"
                  className="w-full py-2.5 text-slate-400 hover:text-slate-600 text-xs font-semibold transition-all text-center">
                  Submit POC
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
