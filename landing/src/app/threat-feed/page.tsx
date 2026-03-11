import Link from 'next/link';
import { cves, threatFeed } from '@/data/mockData';

export default function ThreatFeedPage() {
  const criticalCves = cves.filter(c => c.severity === 'CRITICAL').slice(0, 12);
  const recentThreats = threatFeed.slice(0, 20);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Threat Feed</h1>
        <p className="text-gray-500">
          Live CVE threat intelligence and vulnerability alerts
        </p>
      </div>

      {/* Live Alert Banner */}
      <div className="bg-black border border-gray-200 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="animate-pulse w-3 h-3 bg-white rounded-full" />
          <span className="text-white font-bold text-sm">LIVE</span>
          <span className="text-gray-300 text-sm">
            {criticalCves.length} new critical vulnerabilities detected in the last 24 hours
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-bold">Total CVEs</p>
          <p className="text-2xl font-black text-white">{cves.length.toLocaleString()}</p>
        </div>
        <div className="bg-black rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-bold">Critical (24h)</p>
          <p className="text-2xl font-black text-white">{criticalCves.length}</p>
        </div>
        <div className="bg-black rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-bold">High (24h)</p>
          <p className="text-2xl font-black text-gray-300">{cves.filter(c => c.severity === 'HIGH').length}</p>
        </div>
        <div className="bg-black rounded-xl p-4">
          <p className="text-xs text-gray-400 uppercase font-bold">Active POCs</p>
          <p className="text-2xl font-black text-gray-300">{cves.filter(c => c.exploitability !== 'None').length}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium">All</button>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Critical</button>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">High</button>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Medium</button>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">Zero-Day</button>
      </div>

      {/* CVE List */}
      <div className="space-y-4 mb-12">
        <h3 className="text-lg font-bold text-black mb-4">Recent Vulnerability Disclosures</h3>
        {criticalCves.map((cve) => (
          <div key={cve.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Link href={`/cve/${cve.id.replace('CVE-', '')}`} className="font-bold text-black hover:underline">
                    {cve.id}
                  </Link>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black text-white ${
                    cve.severity === 'CRITICAL' ? 'bg-black' :
                    cve.severity === 'HIGH' ? 'bg-gray-600' :
                    cve.severity === 'MEDIUM' ? 'bg-gray-400' :
                    'bg-gray-300'
                  }`}>
                    {cve.score} {cve.severity}
                  </span>
                  {cve.exploitability === 'Verified' && (
                    <span className="text-xs bg-black text-white px-2 py-0.5 rounded font-medium">VERIFIED EXPLOIT</span>
                  )}
                  {cve.exploitability === 'Public POC' && (
                    <span className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded font-medium">PUBLIC POC</span>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{cve.title}</h3>
                <p className="text-sm text-gray-500">{cve.software} | {cve.platform}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm text-gray-400 mb-2">{cve.published}</p>
                <Link 
                  href={`/cve/${cve.id.replace('CVE-', '')}`}
                  className="inline-flex items-center gap-1 text-sm text-black font-medium hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Threat Articles */}
      <div className="space-y-4 mb-12">
        <h3 className="text-lg font-bold text-black mb-4">Threat Intelligence Articles</h3>
        <div className="grid gap-4">
          {recentThreats.map((threat: any) => (
            <div key={threat.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-black text-white px-2 py-0.5 rounded font-medium">{threat.category}</span>
                <span className="text-xs text-gray-400">{threat.source}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">{threat.date}</span>
              </div>
              <h4 className="font-bold text-black mb-1">{threat.title}</h4>
              <p className="text-sm text-gray-500">{threat.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="mt-12 bg-black rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Stay Protected</h3>
            <p className="text-gray-300">Subscribe to real-time threat alerts for your infrastructure.</p>
          </div>
          <div className="flex gap-2">
            <input
              className="px-4 py-2 rounded-lg text-black text-sm w-64"
              placeholder="Enter your email"
              type="email"
            />
            <button className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
