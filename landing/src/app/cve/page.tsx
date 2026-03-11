import Link from 'next/link';
import { cves } from '@/data/mockData';

export default function CVEDatabase() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">CVE Database</h1>
        <p className="text-gray-500">
          Browse and search the complete vulnerability database
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
          <option>All Severities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
          <option>All Years</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
        </select>
        <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
          <option>All Software</option>
          <option>Apache</option>
          <option>Microsoft</option>
          <option>Google</option>
          <option>WordPress</option>
        </select>
        <button className="ml-auto px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800">
          Apply Filters
        </button>
      </div>

      {/* CVE Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-500">CVE ID</th>
              <th className="px-6 py-4 font-bold text-gray-500">Severity</th>
              <th className="px-6 py-4 font-bold text-gray-500">Affected Software</th>
              <th className="px-6 py-4 font-bold text-gray-500">Published</th>
              <th className="px-6 py-4 font-bold text-gray-500">Exploit</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cves.map((cve) => (
              <tr key={cve.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-bold text-black">
                  <Link href={`/cve/${cve.id.replace('CVE-', '')}`} className="hover:underline">
                    {cve.id}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black text-white ${
                    cve.severity === 'CRITICAL' ? 'bg-black' :
                    cve.severity === 'HIGH' ? 'bg-gray-600' :
                    cve.severity === 'MEDIUM' ? 'bg-gray-400' :
                    'bg-gray-300'
                  }`}>
                    {cve.score} {cve.severity}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-600">{cve.software}</td>
                <td className="px-6 py-4 text-gray-400">{cve.published}</td>
                <td className="px-6 py-4">
                  {cve.exploitability === 'Verified' && (
                    <span className="text-xs bg-black text-white px-2 py-1 rounded font-medium">Verified</span>
                  )}
                  {cve.exploitability === 'Public POC' && (
                    <span className="text-xs bg-black text-white px-2 py-1 rounded font-medium">POC</span>
                  )}
                  {cve.exploitability === 'None' && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded font-medium">None</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/cve/${cve.id.replace('CVE-', '')}`}
                    className="p-1 rounded text-gray-400 hover:text-black hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 inline-flex"
                  >
                    →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 text-sm">
          ← Previous
        </button>
        <button className="px-3 py-1 rounded bg-black text-white font-medium text-sm">1</button>
        <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 text-sm">2</button>
        <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 text-sm">3</button>
        <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 text-sm">
          Next →
        </button>
      </div>
    </div>
  );
}
