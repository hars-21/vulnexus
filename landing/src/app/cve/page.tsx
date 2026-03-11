'use client';

import Link from 'next/link';
import { cves } from '@/data/mockData';
import { useState } from 'react';

export default function CVEDatabase() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(cves.length / itemsPerPage);
  const paginatedCves = cves.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">CVE Database</h1>
        <p className="text-gray-500">
          Browse and search the complete vulnerability database ({cves.length.toLocaleString()} CVEs)
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select className="px-4 py-2 bg-black border border-gray-600 rounded-lg text-sm text-white">
          <option>All Severities</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select className="px-4 py-2 bg-black border border-gray-600 rounded-lg text-sm text-white">
          <option>All Years</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
          <option>2020</option>
        </select>
        <select className="px-4 py-2 bg-black border border-gray-600 rounded-lg text-sm text-white">
          <option>All Software</option>
          <option>Apache</option>
          <option>Microsoft</option>
          <option>Google</option>
          <option>WordPress</option>
          <option>OpenSSL</option>
          <option>Linux Kernel</option>
        </select>
        <button className="ml-auto px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800">
          Apply Filters
        </button>
      </div>

      {/* CVE Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-black border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-white">CVE ID</th>
              <th className="px-6 py-4 font-bold text-white">Severity</th>
              <th className="px-6 py-4 font-bold text-white">Affected Software</th>
              <th className="px-6 py-4 font-bold text-white">Published</th>
              <th className="px-6 py-4 font-bold text-white">Exploit</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedCves.map((cve) => (
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
                    <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded font-medium">POC</span>
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
      <div className="mt-6 flex justify-center items-center gap-2">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 text-sm disabled:opacity-50"
        >
          ← Previous
        </button>
        {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-1 rounded text-sm ${page === pageNum ? 'bg-black text-white' : 'border border-gray-200 hover:bg-gray-100'}`}
            >
              {pageNum}
            </button>
          );
        })}
        <span className="px-2 text-gray-400">...</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-100 text-sm disabled:opacity-50"
        >
          Next →
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Showing {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, cves.length)} of {cves.length.toLocaleString()} CVEs
      </p>
    </div>
  );
}
