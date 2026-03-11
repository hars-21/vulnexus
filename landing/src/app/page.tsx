import Link from 'next/link';
import { cves, featuredThreats, exploits, news } from '@/data/mockData';

export default function Home() {
  return (
    <>
      {/* Welcome Box */}
      <section className="p-6 md:p-8">
        <div className="bg-black rounded-xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black mb-3">Welcome to VULNEXUS</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
                The industry-leading open-source cyber threat intelligence feed and vulnerability database. Aggregating, validating, and sharing security data for a safer web.
              </p>
              <div className="flex gap-3">
                <Link href="/cve" className="bg-white text-black px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                  Start Hunting
                </Link>
                <button className="bg-gray-800 border border-gray-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-700 transition-colors">
                  View API Docs
                </button>
              </div>
            </div>
            <div className="hidden xl:block text-[120px] opacity-20 text-white">
              🛡
            </div>
          </div>
          {/* Abstract Background Pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg className="h-full w-full text-white" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <pattern height="10" id="grid" patternUnits="userSpaceOnUse" width="10">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
                </pattern>
              </defs>
              <rect fill="url(#grid)" height="100" width="100"></rect>
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Threats Grid */}
      <section className="px-6 md:px-8 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span>⚡</span>
            Featured Threats
          </h3>
          <Link className="text-sm font-bold underline text-gray-600 hover:text-black" href="/cve">
            View Archive
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredThreats.map((threat) => (
            <div key={threat.id} className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all bg-white">
              <div className="h-40 bg-gray-100 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${threat.image}')` }}
                />
                <div className="absolute top-3 right-3 bg-black text-white text-[10px] font-black px-2 py-1 rounded">
                  {threat.severity}
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-lg mb-2 group-hover:text-gray-700 transition-colors">{threat.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{threat.description}</p>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                  <span>{threat.date}</span>
                  <span className="flex items-center gap-1">👁 {threat.views} Views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Disclosed CVEs Table */}
      <section className="px-6 md:px-8 pb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span>☰</span>
            Recently Disclosed CVEs
          </h3>
          <div className="flex gap-2">
            <button className="text-xs font-bold px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
              Filter
            </button>
            <button className="text-xs font-bold px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600">
              Export CSV
            </button>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-500">CVE ID</th>
                <th className="px-6 py-4 font-bold text-gray-500">Severity</th>
                <th className="px-6 py-4 font-bold text-gray-500">Affected Software</th>
                <th className="px-6 py-4 font-bold text-gray-500">Published</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cves.slice(0, 5).map((cve) => (
                <tr key={cve.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-black cursor-pointer hover:underline">
                    <Link href={`/cve/${cve.id.replace('CVE-', '')}`}>{cve.id}</Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      cve.severity === 'CRITICAL' ? 'bg-black text-white' :
                      cve.severity === 'HIGH' ? 'bg-gray-600 text-white' :
                      cve.severity === 'MEDIUM' ? 'bg-gray-400 text-white' :
                      'bg-gray-300 text-gray-700'
                    }`}>
                      {cve.score} {cve.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">{cve.software}</td>
                  <td className="px-6 py-4 text-gray-400">{cve.published}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/cve/${cve.id.replace('CVE-', '')}`} className="p-1 rounded text-gray-400 hover:text-black hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 inline-flex">
                      →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
            <Link href="/cve" className="text-gray-600 text-xs font-black uppercase tracking-widest hover:text-black">
              View Full Database
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Sections: Trending Exploits & News */}
      <div className="px-6 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Exploits */}
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
            <span>▤</span>
            Trending Exploits
          </h3>
          <div className="space-y-4">
            {exploits.slice(0, 3).map((exploit) => (
              <div key={exploit.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all cursor-pointer bg-white">
                <div className="bg-gray-100 p-2 rounded text-gray-600">
                  <span className="text-lg">{'</>'}</span>
                </div>
                <div>
                  <h5 className="font-bold text-sm mb-1">{exploit.title}</h5>
                  <p className="text-xs text-gray-400">{exploit.description}</p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-0.5">★ {exploit.votes}</span>
                    <span className="flex items-center gap-0.5">⑂ {exploit.forks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Security News */}
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
            <span>📰</span>
            Security News Feed
          </h3>
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="size-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                </div>
                <div>
                  <Link href="#" className="font-bold text-sm hover:text-black transition-colors leading-tight block mb-1">
                    {item.title}
                  </Link>
                  <p className="text-[11px] text-gray-400 font-medium">{item.source} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="p-8 border-t border-gray-200 text-center bg-white">
        <p className="text-sm text-gray-400 font-medium">
          © 2024 VULNEXUS Intelligence. All information provided for educational and defensive purposes only.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <Link className="text-xs text-gray-500 hover:text-black transition-colors" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs text-gray-500 hover:text-black transition-colors" href="#">
            API License
          </Link>
          <Link className="text-xs text-gray-500 hover:text-black transition-colors" href="#">
            Terms of Service
          </Link>
        </div>
      </footer>
    </>
  );
}
