"use client";

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
		<header className="h-14 border-b border-primary/10 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-20 sticky top-0">
			<form onSubmit={handleSearch} className="flex-1 max-w-2xl">
				<div className="relative">
					<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
						search
					</span>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
						placeholder="Search CVEs, Exploits, or Intelligence..."
						type="text"
					/>
				</div>
			</form>

			<div className="flex items-center gap-6 w-64 justify-end">
				<a
					className="text-xs font-bold text-slate-500 hover:text-primary uppercase"
					href="/register"
				>
					Create Account
				</a>
				<a className="text-xs font-bold text-primary hover:underline uppercase" href="/login">
					Login
				</a>
			</div>
		</header>
	);
}
