'use client';

import { cves } from '@/data/mockData';
import { useParams } from 'next/navigation';

export default function CVEDetail() {
  const params = useParams();
  const cveId = `CVE-${params.id}`;
  const cve = cves.find(c => c.id === cveId) || cves[0];

  return (
    <div className="max-w-7xl mx-auto p-8 lg:p-12">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Main Body Column */}
        <div className="xl:col-span-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-4">
            {cveId}: {cve.description}
          </h1>
          <p className="text-lg text-gray-500 mb-8 font-light italic leading-relaxed">
            A critical flaw in the URI parsing engine allows unauthenticated remote attackers to execute
            arbitrary system commands via a specially crafted HTTP request.
          </p>
          <hr className="border-gray-200 mb-10" />

          {/* Overview Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
              <span>📄</span>
              Overview
            </h2>
            <div className="max-w-none text-gray-600 leading-7">
              <p>
                {cve.software} versions {cve.versions} contain a vulnerability in the handling of
                percent-encoded characters. An attacker can bypass canonicalization checks and inject shell metacharacters into the backend processing stream.
              </p>
              <p className="mt-4">
                The vulnerability is categorized as an <strong>Unsafe Reflection leading to OS Command Injection</strong>. 
                Initial discovery was reported by the VulNexus Research Team during a routine audit of legacy protocol handlers.
              </p>
            </div>
          </section>

          {/* Technical Details Section */}
          <section className="mb-12">
            <details className="group bg-gray-50 rounded-xl border border-gray-200" open>
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <h2 className="text-2xl font-bold flex items-center gap-2 m-0">
                  <span>{'</>'}</span>
                  Technical Details
                </h2>
                <span className="group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 text-sm space-y-4">
                <p>The root cause lies in the <code>process_uri_request()</code> function. When a URI contains double-encoded null bytes or pipe characters, the sanitization filter fails to strip them before passing the string to the internal <code>popen()</code> wrapper.</p>
                <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-xs overflow-x-auto border border-gray-800">
                  <code>GET /api/v1/resource?id=123%257c%256e%2565%2574%2563%2561%2574 HTTP/1.1</code><br />
                  <code>Host: target-server.com</code>
                </div>
                <p>Decoded, this triggers: <code>/usr/bin/handler --id 123 | netcat ...</code></p>
              </div>
            </details>
          </section>

          {/* Affected Versions Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
              <span>☰</span>
              Affected Versions
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-xs">
                  <tr>
                    <th className="px-6 py-4">Software Name</th>
                    <th className="px-6 py-4">Versions</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">{cve.software} (Community)</td>
                    <td className="px-6 py-4">2.0.0 - 2.4.2</td>
                    <td className="px-6 py-4">Linux, macOS</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-black text-white rounded-full text-xs font-bold">Vulnerable</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">{cve.software} (Enterprise)</td>
                    <td className="px-6 py-4">2.3.1 - 2.4.8</td>
                    <td className="px-6 py-4">All Platforms</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-black text-white rounded-full text-xs font-bold">Vulnerable</span></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">{cve.software} (Legacy Support)</td>
                    <td className="px-6 py-4">1.8.x</td>
                    <td className="px-6 py-4">Legacy</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-400 text-white rounded-full text-xs font-bold">Safe</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Mitigation Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
              <span>✓</span>
              Mitigation & Patch Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-black border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-white">Recommended Patch</h3>
                <p className="text-sm text-gray-300">
                  Upgrade to <strong className="text-white">version 2.4.9</strong> immediately. The patch implements a strict whitelist for URI
                  characters and uses <code className="text-white">execve()</code> for process handling instead of <code className="text-white">popen()</code>.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gray-600 border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-white">Temporary Workaround</h3>
                <p className="text-sm text-gray-200">
                  Disable the RewriteModule if not critical, or apply a WAF rule to block
                  requests containing percent-encoded pipe characters (%7c).
                </p>
              </div>
            </div>
          </section>

          {/* References Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
              <span>🔗</span>
              References
            </h2>
            <ul className="space-y-3">
              <li>
                <a className="flex items-center gap-2 text-black hover:underline group" href="#">
                  <span>↗</span>
                  Official Vendor Security Advisory
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2 text-black hover:underline group" href="#">
                  <span>↗</span>
                  NIST NVD {cveId} Entry
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2 text-black hover:underline group" href="#">
                  <span>↗</span>
                  Initial Analysis by Researcher @CyberSleuth
                </a>
              </li>
            </ul>
          </section>

          {/* Community POC Section */}
          <section className="pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>💬</span>
              Community POC & Insights
            </h2>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-white flex gap-4 shadow-sm">
                <div className="flex flex-col items-center justify-center bg-gray-100 px-3 rounded-lg min-w-[50px]">
                  <button className="text-gray-400 hover:text-black transition-colors">▲</button>
                  <span className="font-bold text-lg">142</span>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">▼</button>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Python exploit script for unauthenticated RCE</h4>
                  <p className="text-sm text-gray-500 mb-2">Verified exploit for {cve.software} on Ubuntu 22.04 LTS.</p>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                    <span className="flex items-center gap-1">👤 user_zero</span>
                    <span className="flex items-center gap-1">📅 2 days ago</span>
                    <span className="flex items-center gap-1 text-black cursor-pointer hover:underline">{'</>'} View Script</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-medium hover:border-black hover:text-black transition-all flex items-center justify-center gap-2">
                <span>+</span>
                Submit your own analysis or POC
              </button>
            </div>
          </section>
        </div>

        {/* Right Column Infobox */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200 sticky top-24">
            <div className="bg-black p-6 text-white text-center">
              <h3 className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">CVE IDENTIFIER</h3>
              <p className="text-3xl font-black">{cveId}</p>
            </div>
            <div className="p-8 space-y-6">
              {/* Score */}
              <div className="flex flex-col items-center pb-6 border-b border-gray-100">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle className="text-gray-200" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="8" />
                    <circle 
                      className="text-black" 
                      cx="64" 
                      cy="64" 
                      fill="transparent" 
                      r="56" 
                      stroke="currentColor" 
                      strokeDasharray="351.8" 
                      strokeDashoffset={351.8 - (cve.score / 10) * 351.8} 
                      strokeWidth="8"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-black">{cve.score}</span>
                    <span className="text-[10px] font-bold text-black uppercase tracking-tighter">{cve.severity}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 uppercase font-bold tracking-widest">CVSS 3.1 Base Score</p>
              </div>

              {/* Infobox Fields */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <span>💻</span> Software
                  </span>
                  <span className="font-bold text-black">{cve.software}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <span>✓</span> Patch Status
                  </span>
                  <span className="px-2 py-0.5 bg-black text-white rounded text-xs font-bold">{cve.patchStatus}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <span>🐛</span> Exploitability
                  </span>
                  <span className="text-black font-bold">{cve.exploitability}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <span>📅</span> Published
                  </span>
                  <span className="font-medium">{cve.published}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-2">
                    <span>🔄</span> Modified
                  </span>
                  <span className="font-medium">{cve.modified}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Affected Platforms
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white px-2 py-1 border border-gray-200 rounded text-[11px] font-semibold">CentOS 7/8</span>
                    <span className="bg-white px-2 py-1 border border-gray-200 rounded text-[11px] font-semibold">Ubuntu 20+</span>
                    <span className="bg-white px-2 py-1 border border-gray-200 rounded text-[11px] font-semibold">Debian 11</span>
                    <span className="bg-white px-2 py-1 border border-gray-200 rounded text-[11px] font-semibold">FreeBSD</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-black text-sm font-bold rounded-lg transition-all border border-gray-200">
                  Request Early Access
                </button>
                <button className="w-full py-3 text-gray-400 hover:text-black text-xs font-semibold transition-all">
                  Report Correction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
