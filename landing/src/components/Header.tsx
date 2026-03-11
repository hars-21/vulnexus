'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleSearch = () => {
    router.push('/search');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6 lg:gap-12">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="bg-black p-1.5 rounded text-white flex items-center justify-center">
            <span className="text-xl">▮</span>
          </div>
          <h1 className="text-xl font-black tracking-tight">VULNEXUS</h1>
        </Link>
        <div className="hidden md:flex min-w-[300px] lg:min-w-[450px] mx-auto">
          <div className="relative w-full group flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black transition-colors">
              <span className="text-lg">⌕</span>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-l-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all placeholder:text-gray-400 text-sm"
              placeholder="Search CVEs, vulnerabilities, or software..."
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button 
              onClick={handleSearch}
              className="px-4 bg-black text-white rounded-r-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-4 border-r border-gray-200 pr-4">
          <Link className="text-sm font-medium text-gray-600 hover:text-black transition-colors" href="#">
            Create Account
          </Link>
          <Link className="text-sm font-medium text-gray-600 hover:text-black transition-colors" href="#">
            Login
          </Link>
        </div>
        <div className="size-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-black cursor-pointer hover:bg-gray-200 transition-colors">
          <span className="text-lg">◉</span>
        </div>
      </div>
    </header>
  );
}
