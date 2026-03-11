"use client";

import { Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 flex items-center px-6 gap-6">
      <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search CVEs, exploits, or software..."
          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0646ac]/20 transition-all"
        />
      </form>

      <div className="flex items-center gap-4 text-sm font-medium ml-auto">
        <a href="/login" className="text-slate-600 dark:text-slate-400 hover:text-[#0646ac] transition-colors">
          Login
        </a>
        <a
          href="/register"
          className="bg-[#0646ac] text-white px-4 py-2 rounded-lg hover:bg-[#0646ac]/90 transition-all text-sm"
        >
          Create Account
        </a>
        <div className="size-8 rounded-full bg-[#0646ac]/10 border border-[#0646ac]/20 flex items-center justify-center text-[#0646ac] cursor-pointer hover:bg-[#0646ac]/20 transition-colors">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
