import Link from "next/link";
import {
  Database, Radio, Bot, Route, Zap, Github, Terminal, ArrowRight
} from "lucide-react";

const features = [
  { href: "/search", icon: Database, label: "CVE Search", desc: "Hybrid BM25 + semantic search across the NVD database.", color: "text-[#0646ac] bg-[#0646ac]/10" },
  { href: "/threat-feed", icon: Radio, label: "Threat Feed", desc: "Live stream of new CVEs filtered by severity and exploitability.", color: "text-red-500 bg-red-50" },
  { href: "/assistant", icon: Bot, label: "AI Pentester Assistant", desc: "RAG-powered AI that maps your targets to real CVEs and exploitation paths.", color: "text-purple-600 bg-purple-50" },
  { href: "/attack-path", icon: Route, label: "Attack Path Generator", desc: "Input services and get a full visualized attack chain with CVE mapping.", color: "text-orange-500 bg-orange-50" },
  { href: "/quickscan", icon: Zap, label: "Quick Scan", desc: "Paste raw nmap output — auto-extract services and generate attack graph.", color: "text-yellow-600 bg-yellow-50" },
  { href: "/github", icon: Github, label: "GitHub Analyzer", desc: "Clone any repo and detect vulnerabilities with AI confidence scoring.", color: "text-green-600 bg-green-50" },
  { href: "/pocs", icon: Terminal, label: "Community POCs", desc: "Browse, submit, and vote on proof-of-concept exploits.", color: "text-slate-600 bg-slate-100" },
];

const stats = [
  { label: "CVEs Indexed", value: "250K+" },
  { label: "Exploit PoCs", value: "12K+" },
  { label: "AI Model", value: "GPT-4o" },
  { label: "Data Sources", value: "NVD, Git" },
];

const recentCves = [
  { id: "CVE-2024-21345", severity: "CRITICAL", score: "9.8", software: "Microsoft Windows Kernel", date: "2 hours ago" },
  { id: "CVE-2024-1922", severity: "HIGH", score: "7.5", software: "Google Chrome V8", date: "5 hours ago" },
  { id: "CVE-2024-5561", severity: "MEDIUM", score: "5.4", software: "WordPress Core", date: "Yesterday" },
  { id: "CVE-2024-3321", severity: "CRITICAL", score: "9.1", software: "OpenSSL v3.0.1", date: "Jan 12, 2024" },
];

const severityColors: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-slate-100 text-slate-600",
};

export default function HomePage() {
  return (
    <div className="max-w-5xl">
      <div className="bg-gradient-to-br from-[#0646ac] to-[#0646ac]/80 rounded-xl p-8 text-white relative overflow-hidden shadow-xl shadow-[#0646ac]/10 mb-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl font-black mb-3">Welcome to VULNEXUS</h1>
            <p className="text-blue-100 text-base leading-relaxed mb-6">
              The AI-powered vulnerability research platform. Search CVEs, generate attack paths, analyze code, and get expert guidance — all in one place.
            </p>
            <div className="flex gap-3">
              <Link href="/search" className="bg-white text-[#0646ac] px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors">
                Start Hunting
              </Link>
              <Link href="/assistant" className="bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors">
                AI Assistant
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect fill="url(#grid)" height="100" width="100" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-slate-900 px-6 py-5 text-center">
            <p className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{s.value}</p>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${f.color}`}>
              <f.icon size={18} />
            </div>
            <p className="font-semibold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-[#0646ac] transition-colors">{f.label}</p>
            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            Recently Disclosed CVEs
          </h3>
          <Link href="/threat-feed" className="text-xs font-bold text-[#0646ac] hover:underline flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">CVE ID</th>
              <th className="px-6 py-3">Severity</th>
              <th className="px-6 py-3">Software</th>
              <th className="px-6 py-3">Published</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentCves.map((cve) => (
              <tr key={cve.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-3">
                  <Link href={`/cves/${cve.id}`} className="font-bold text-[#0646ac] hover:underline">
                    {cve.id}
                  </Link>
                </td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${severityColors[cve.severity] || ""}`}>
                    {cve.score} {cve.severity}
                  </span>
                </td>
                <td className="px-6 py-3 font-medium text-slate-700 dark:text-slate-300">{cve.software}</td>
                <td className="px-6 py-3 text-slate-500 text-xs">{cve.date}</td>
                <td className="px-6 py-3">
                  <Link href={`/cves/${cve.id}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#0646ac] opacity-0 group-hover:opacity-100 transition-all">
                    View <ArrowRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
