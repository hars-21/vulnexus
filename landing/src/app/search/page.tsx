import Link from 'next/link';
import { searchData, cves, exploits } from '@/data/mockData';

export default function SearchPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black mb-2">
          Search Results
        </h1>
        <p className="text-gray-500 text-sm">
          Showing results from VULNEXUS vulnerability database
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8 overflow-x-auto">
        <div className="flex gap-8 whitespace-nowrap min-w-max">
          <a className="flex flex-col items-center justify-center border-b-2 border-black text-black pb-3 pt-2" href="#">
            <p className="text-sm font-bold">All ({searchData.length})</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-gray-500 pb-3 pt-2 hover:text-black" href="#">
            <p className="text-sm font-bold">CVEs ({cves.length})</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-gray-500 pb-3 pt-2 hover:text-black" href="#">
            <p className="text-sm font-bold">Exploits ({exploits.length})</p>
          </a>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-8">
        {searchData.slice(0, 20).map((result: any, index: number) => (
          <article key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              {result.type === 'CVE' && (
                <>
                  <span>{result.id}</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-full font-bold border border-gray-300 text-[10px]">CVE</span>
                  <span>•</span>
                  <span>{result.software}</span>
                </>
              )}
              {result.type === 'EXPLOIT' && (
                <>
                  <span>EXPLOIT</span>
                  <span>•</span>
                  <span>Public POC</span>
                </>
              )}
              {result.type === 'SOFTWARE' && (
                <>
                  <span>SOFTWARE</span>
                  <span>•</span>
                  <span>Vulnerability Database</span>
                </>
              )}
            </div>
            <h3 className="text-xl font-semibold">
              <a className="text-black hover:underline" href="#">
                {result.title}
              </a>
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
              {result.description}
            </p>
            <div className="flex gap-4 mt-1">
              <a className="text-xs font-semibold text-gray-500 hover:text-black flex items-center gap-1" href="#">
                <span>🔗</span> Reference
              </a>
              {result.type === 'CVE' && (
                <Link href={`/cve/${result.id.replace('CVE-', '')}`} className="text-xs font-semibold text-black hover:underline flex items-center gap-1">
                  <span>{'</>'}</span> View Details
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex items-center justify-center gap-2">
        <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-200 hover:bg-gray-100 text-gray-500">
          ←
        </button>
        <button className="flex items-center justify-center w-10 h-10 rounded bg-black text-white font-bold">1</button>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-200 hover:bg-gray-100 text-gray-700">2</button>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-200 hover:bg-gray-100 text-gray-700">3</button>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-200 hover:bg-gray-100 text-gray-700">4</button>
        <span className="px-2 text-gray-400">...</span>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-200 hover:bg-gray-100 text-gray-700">{Math.ceil(searchData.length / 20)}</button>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-200 hover:bg-gray-100 text-gray-500">
          →
        </button>
      </div>
    </div>
  );
}
