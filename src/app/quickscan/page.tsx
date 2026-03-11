"use client";

import { useState } from "react";
import { Zap, Terminal, Send } from "lucide-react";

type ServiceInfo = { port: number; service: string; version: string | null; protocol?: string };
type AttackNode = { id: string; label: string; type: string; cve_id: string | null; cvss_score: number | null; children: AttackNode[] };
type AttackPathResponse = { summary: string; attack_graph: AttackNode; cves_found: string[]; recommendations: string[] };
type QuickScanResponse = { parsed_services: ServiceInfo[]; attack_path: AttackPathResponse };

const nodeColors: Record<string, string> = {
  port: "border-[#0646ac] bg-[#0646ac]/5 text-[#0646ac]",
  vulnerability: "border-red-300 bg-red-50 text-red-700",
  action: "border-orange-300 bg-orange-50 text-orange-700",
  impact: "border-slate-300 bg-slate-50 text-slate-700",
};

function NodeTree({ node, depth = 0 }: { node: AttackNode; depth?: number }) {
  return (
    <div style={{ marginLeft: depth * 24 }} className="mt-2">
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${nodeColors[node.type] || "border-slate-200 bg-white"}`}>
        {node.cve_id && <span className="font-bold">{node.cve_id}</span>}
        {node.label}
        {node.cvss_score && <span className="font-bold text-red-600">{node.cvss_score}</span>}
      </div>
      {node.children?.map((child) => (
        <NodeTree key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function QuickScanPage() {
  const [scanOutput, setScanOutput] = useState("");
  const [targetInfo, setTargetInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuickScanResponse | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!scanOutput.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch(`${API}/api/attack-path/quickscan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scan_output: scanOutput, target_info: targetInfo || undefined }),
      });
      const data = await r.json();
      setResult(data);
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Zap size={22} className="text-yellow-500" /> Quick Scan
        </h1>
        <p className="text-sm text-slate-500">Paste raw nmap output — we parse services and generate a full attack path</p>
      </div>

      <form onSubmit={handleScan} className="mb-6 space-y-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <Terminal size={14} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-500">Nmap Output</span>
          </div>
          <textarea
            value={scanOutput}
            onChange={(e) => setScanOutput(e.target.value)}
            rows={8}
            placeholder={`22/tcp   open  ssh     OpenSSH 7.2p2 Ubuntu\n80/tcp   open  http    nginx 1.18.0\n3306/tcp open  mysql   MySQL 5.7.36`}
            className="w-full bg-transparent font-mono text-xs p-4 resize-none focus:outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
          />
        </div>

        <input
          value={targetInfo}
          onChange={(e) => setTargetInfo(e.target.value)}
          placeholder="Additional context (optional): OS, network segment, purpose..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0646ac]/20"
        />

        <button
          type="submit"
          disabled={loading || !scanOutput.trim()}
          className="flex items-center gap-2 bg-[#0646ac] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#0646ac]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Send size={14} />}
          Generate Attack Path
        </button>
      </form>

      {result && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-2">Parsed Services</h2>
            <div className="flex flex-wrap gap-2">
              {result.parsed_services.map((svc, i) => (
                <span key={i} className="px-3 py-1 bg-[#0646ac]/10 text-[#0646ac] rounded text-xs font-bold">
                  {svc.port}/{svc.protocol || "tcp"} {svc.service} {svc.version || ""}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
            <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-1">Summary</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300">{result.attack_path.summary}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 overflow-x-auto">
            <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Attack Graph</h2>
            <NodeTree node={result.attack_path.attack_graph} />
          </div>

          {result.attack_path.cves_found.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">CVEs Found</h2>
              <div className="flex flex-wrap gap-2">
                {result.attack_path.cves_found.map((cveId) => (
                  <a key={cveId} href={`/cves/${cveId}`}
                    className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-bold hover:bg-red-100 transition-colors">
                    {cveId}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#0646ac]/5 border border-[#0646ac]/20 rounded-xl p-5">
            <h3 className="font-bold text-sm text-[#0646ac] mb-2">Recommendations</h3>
            <ul className="space-y-1">
              {result.attack_path.recommendations.map((r, i) => (
                <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-[#0646ac] font-bold mt-0.5">{i + 1}.</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
