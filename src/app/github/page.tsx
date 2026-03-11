"use client";

import { useState } from "react";

const mockResults = {
	repo: "torvalds/linux",
	scannedAt: "Just now",
	stats: {
		critical: 2,
		high: 5,
		medium: 8,
		low: 3,
		info: 12,
	},
	findings: [
		{
			id: 1,
			severity: "CRITICAL",
			title: "Use-after-free in memory allocator",
			file: "mm/slub.c",
			line: 3847,
			cwe: "CWE-416",
			description:
				"Potential use-after-free vulnerability detected in slab allocator. Object is accessed after being freed in the error handling path.",
		},
		{
			id: 2,
			severity: "CRITICAL",
			title: "Integer overflow leading to heap overflow",
			file: "net/ipv6/raw.c",
			line: 512,
			cwe: "CWE-190",
			description:
				"Arithmetic operation on user-controlled value can overflow, leading to a heap buffer overflow in the subsequent allocation.",
		},
		{
			id: 3,
			severity: "HIGH",
			title: "Uninitialized variable used in crypto context",
			file: "crypto/aes_generic.c",
			line: 228,
			cwe: "CWE-457",
			description:
				"Stack variable is used before initialization in the AES key expansion routine under certain error conditions.",
		},
		{
			id: 4,
			severity: "HIGH",
			title: "Missing input validation on ioctl argument",
			file: "drivers/usb/core/devio.c",
			line: 1123,
			cwe: "CWE-20",
			description:
				"User-supplied ioctl argument is not validated before use, potentially allowing out-of-bounds memory access.",
		},
		{
			id: 5,
			severity: "MEDIUM",
			title: "Race condition in file descriptor management",
			file: "fs/file.c",
			line: 445,
			cwe: "CWE-362",
			description:
				"A TOCTOU race condition exists between the check and use of a file descriptor during close operations.",
		},
	],
};

const severityColors: Record<string, { badge: string; dot: string }> = {
	CRITICAL: {
		badge: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400",
		dot: "bg-red-500",
	},
	HIGH: {
		badge:
			"bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
		dot: "bg-orange-500",
	},
	MEDIUM: {
		badge:
			"bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400",
		dot: "bg-yellow-500",
	},
	LOW: {
		badge: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400",
		dot: "bg-green-500",
	},
};

export default function GithubPage() {
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<typeof mockResults | null>(null);

	const handleScan = (e: React.FormEvent) => {
		e.preventDefault();
		if (!url.trim()) return;
		setLoading(true);
		setResults(null);
		setTimeout(() => {
			setLoading(false);
			setResults(mockResults);
		}, 2000);
	};

	const totalIssues = results
		? results.stats.critical + results.stats.high + results.stats.medium + results.stats.low
		: 0;

	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
			<div className="max-w-4xl mx-auto py-10 px-6">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
						GitHub Analyzer
					</h1>
					<p className="text-slate-500 dark:text-slate-400 text-sm">
						Scan any public GitHub repository for known vulnerability patterns, CVE references, and
						security anti-patterns.
					</p>
				</div>

				{/* Input form */}
				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-8">
					<form onSubmit={handleScan} className="flex gap-3">
						<div className="flex-1 relative">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">
								code
							</span>
							<input
								type="text"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://github.com/owner/repository"
								className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center gap-2"
						>
							{loading ? (
								<>
									<svg
										className="animate-spin h-4 w-4 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
										></path>
									</svg>
									Scanning...
								</>
							) : (
								<>
									<span className="material-symbols-outlined text-[18px]">search</span>
									Analyze
								</>
							)}
						</button>
					</form>
					<p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
						Example:{" "}
						<button
							className="text-primary hover:underline"
							onClick={() => setUrl("https://github.com/torvalds/linux")}
							type="button"
						>
							https://github.com/torvalds/linux
						</button>
					</p>
				</div>

				{/* Scanning animation */}
				{loading && (
					<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-10 text-center">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
							<span className="material-symbols-outlined text-primary text-3xl animate-pulse">
								radar
							</span>
						</div>
						<p className="text-slate-700 dark:text-slate-300 font-semibold mb-1">
							Analyzing repository...
						</p>
						<p className="text-slate-400 text-sm">
							Scanning for CVE patterns, insecure functions, and vulnerability signatures.
						</p>
					</div>
				)}

				{/* Results */}
				{results && !loading && (
					<div className="space-y-6">
						{/* Summary */}
						<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
							<div className="flex items-center justify-between mb-4">
								<div>
									<h2 className="text-lg font-bold text-slate-900 dark:text-white">Scan Results</h2>
									<p className="text-xs text-slate-400 dark:text-slate-500">
										{results.repo} · {results.scannedAt}
									</p>
								</div>
								<span
									className={`px-3 py-1 rounded-full text-sm font-bold border ${
										totalIssues > 5
											? "bg-red-100 text-red-700 border-red-200"
											: "bg-yellow-100 text-yellow-700 border-yellow-200"
									}`}
								>
									{totalIssues} Issues
								</span>
							</div>
							<div className="grid grid-cols-5 gap-3">
								{(
									[
										["Critical", results.stats.critical, "text-red-600"],
										["High", results.stats.high, "text-orange-600"],
										["Medium", results.stats.medium, "text-yellow-600"],
										["Low", results.stats.low, "text-green-600"],
										["Info", results.stats.info, "text-blue-600"],
									] as [string, number, string][]
								).map(([label, count, color]) => (
									<div key={label} className="text-center">
										<p className={`text-2xl font-extrabold ${color}`}>{count}</p>
										<p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
									</div>
								))}
							</div>
						</div>

						{/* Findings */}
						<div>
							<h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-3">
								Top Findings
							</h3>
							<div className="space-y-3">
								{results.findings.map((finding) => (
									<div
										key={finding.id}
										className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"
									>
										<div className="flex items-start gap-3">
											<span
												className={`w-2 h-2 rounded-full mt-2 shrink-0 ${severityColors[finding.severity].dot}`}
											></span>
											<div className="flex-1 min-w-0">
												<div className="flex flex-wrap items-center gap-2 mb-1">
													<span
														className={`px-2 py-0.5 rounded text-xs font-bold border ${severityColors[finding.severity].badge}`}
													>
														{finding.severity}
													</span>
													<span className="text-xs text-slate-400 font-mono">{finding.cwe}</span>
												</div>
												<p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
													{finding.title}
												</p>
												<p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
													{finding.description}
												</p>
												<div className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 rounded px-2 py-1 w-fit">
													<span className="material-symbols-outlined text-[13px]">draft</span>
													{finding.file}:{finding.line}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Empty state */}
				{!results && !loading && (
					<div className="text-center py-16 text-slate-400 dark:text-slate-500">
						<span className="material-symbols-outlined text-5xl mb-3 block">manage_search</span>
						<p className="font-semibold text-slate-600 dark:text-slate-400">
							Enter a GitHub repository URL to start analysis
						</p>
						<p className="text-sm mt-1">
							We&apos;ll check for vulnerability patterns and CVE references.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
