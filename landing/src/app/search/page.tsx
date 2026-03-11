import { searchResults } from '@/data/mockData';

export default function SearchPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto w-full">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Search Results for <span className="text-primary">Apache Struts</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          About {searchResults.length * 10} results found (0.24 seconds)
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <div className="flex gap-8 whitespace-nowrap min-w-max">
          <a className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-2" href="#">
            <p className="text-sm font-bold">All ({searchResults.length * 10})</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 hover:text-slate-900 dark:hover:text-slate-100" href="#">
            <p className="text-sm font-bold">CVEs (210)</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 hover:text-slate-900 dark:hover:text-slate-100" href="#">
            <p className="text-sm font-bold">Exploits (45)</p>
          </a>
          <a className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 hover:text-slate-900 dark:hover:text-slate-100" href="#">
            <p className="text-sm font-bold">Articles (87)</p>
          </a>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-10">
        {searchResults.map((result, index) => (
          <article key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              {result.type === 'CVE' && (
                <>
                  <span>{result.id}</span>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold border ${
                    result.severity === 'CRITICAL' ? 'bg-red-100 text-red-700 border-red-200' :
                    result.severity === 'HIGH' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                    'bg-yellow-100 text-yellow-700 border-yellow-200'
                  }`}>
                    {result.severity} {result.score}
                  </span>
                  <span>•</span>
                  <span>{result.date}</span>
                </>
              )}
              {result.type === 'ARTICLE' && (
                <>
                  <span>ARTICLE</span>
                  <span>•</span>
                  <span>{result.date}</span>
                  <span>•</span>
                  <span>{result.source}</span>
                </>
              )}
              {result.type === 'EXPLOIT' && (
                <>
                  <span>EXPLOIT-DB</span>
                  <span>•</span>
                  <span>{result.date}</span>
                </>
              )}
            </div>
            <h3 className="text-xl font-semibold">
              <a className="text-primary hover:underline" href="#">
                {result.title}
              </a>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-3">
              {result.description}
            </p>
            <div className="flex gap-4 mt-1">
              {result.type === 'CVE' && (
                <>
                  <a className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1" href="#">
                    <span>🔗</span> Reference URL
                  </a>
                  {result.hasExploit && (
                    <a className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1" href="#">
                      <span>{'</>'}</span> Exploit Available
                    </a>
                  )}
                </>
              )}
              {result.type === 'ARTICLE' && (
                <a className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1" href="#">
                  <span>📖</span> {result.readTime} read
                </a>
              )}
              {result.type === 'EXPLOIT' && (
                <>
                  {result.verified && (
                    <a className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1" href="#">
                      <span>✓</span> Verified Exploit
                    </a>
                  )}
                  <a className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1" href="#">
                    <span>⬇</span> Download Payload
                  </a>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-16 flex items-center justify-center gap-2">
        <button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
          ←
        </button>
        <button className="flex items-center justify-center w-10 h-10 rounded bg-primary text-white font-bold">1</button>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">2</button>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">3</button>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">4</button>
        <span className="px-2 text-slate-400">...</span>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">35</button>
        <button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
          →
        </button>
      </div>
    </div>
  );
}
