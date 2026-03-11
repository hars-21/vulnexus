import Link from "next/link";

const mockPocs = [
	{
		id: "poc-001",
		cveId: "CVE-2023-50164",
		title: "Apache Struts RCE via File Upload Path Traversal",
		severity: "CRITICAL",
		score: 9.8,
		language: "Python",
		author: "sec_researcher",
		date: "Dec 8, 2023",
		tags: ["RCE", "File Upload", "Path Traversal"],
		verified: true,
		description:
			"A functional exploit demonstrating path traversal in Apache Struts file upload handling, leading to remote code execution on unpatched servers.",
	},
	{
		id: "poc-002",
		cveId: "CVE-2021-44228",
		title: "Log4Shell – JNDI Injection Remote Code Execution",
		severity: "CRITICAL",
		score: 10.0,
		language: "Java",
		author: "infosec_labs",
		date: "Dec 12, 2021",
		tags: ["RCE", "JNDI", "Log4j"],
		verified: true,
		description:
			"Exploit for the critical Log4Shell vulnerability. Triggers JNDI lookup via crafted log message, allowing arbitrary class loading and RCE.",
	},
	{
		id: "poc-003",
		cveId: "CVE-2021-31805",
		title: "Apache Struts S2-062 Double Evaluation RCE",
		severity: "HIGH",
		score: 8.1,
		language: "Python",
		author: "vuln_hunter",
		date: "Apr 14, 2022",
		tags: ["RCE", "OGNL", "Double Evaluation"],
		verified: true,
		description:
			"Proof-of-concept demonstrating double OGNL evaluation in Apache Struts 2, triggering arbitrary code execution via crafted tag attributes.",
	},
	{
		id: "poc-004",
		cveId: "CVE-2022-22965",
		title: "Spring4Shell – Spring Framework RCE via ClassLoader",
		severity: "CRITICAL",
		score: 9.8,
		language: "Bash",
		author: "spring_hacker",
		date: "Apr 1, 2022",
		tags: ["RCE", "Spring", "ClassLoader"],
		verified: true,
		description:
			"Exploits Spring Framework data binding to write a JSP shell via ClassLoader manipulation on Tomcat deployments with JDK 9+.",
	},
	{
		id: "poc-005",
		cveId: "CVE-2023-23397",
		title: "Microsoft Outlook NTLM Hash Leak via Calendar Invite",
		severity: "CRITICAL",
		score: 9.8,
		language: "PowerShell",
		author: "ms_researcher",
		date: "Mar 14, 2023",
		tags: ["NTLM", "Hash Leak", "Outlook"],
		verified: false,
		description:
			"A specially crafted calendar invite causes Outlook to send NTLM authentication to an attacker-controlled server, leaking Net-NTLMv2 hashes.",
	},
	{
		id: "poc-006",
		cveId: "CVE-2019-0230",
		title: "Apache Struts OGNL Sandbox Bypass",
		severity: "MEDIUM",
		score: 6.5,
		language: "Ruby",
		author: "sec_analyst",
		date: "Aug 20, 2020",
		tags: ["OGNL", "Sandbox Bypass"],
		verified: false,
		description:
			"Demonstrates bypassing the OGNL sandbox in Apache Struts 2.0.0–2.5.20 under specific configurations where expression caching is disabled.",
	},
];

const severityColors: Record<string, string> = {
	CRITICAL:
		"bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
	HIGH: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
	MEDIUM:
		"bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
	LOW: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
};

const langColors: Record<string, string> = {
	Python: "bg-blue-50 text-blue-700 border-blue-200",
	Java: "bg-amber-50 text-amber-700 border-amber-200",
	Bash: "bg-slate-100 text-slate-700 border-slate-200",
	PowerShell: "bg-indigo-50 text-indigo-700 border-indigo-200",
	Ruby: "bg-red-50 text-red-700 border-red-200",
};

export default function PocsPage() {
	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
			<div className="max-w-5xl mx-auto py-10 px-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
							Exploit Library
						</h1>
						<p className="text-slate-500 dark:text-slate-400 text-sm">
							Community-contributed proof-of-concept exploits for known CVEs. For authorized
							security research only.
						</p>
					</div>
					<Link
						href="/pocs/submit"
						className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
					>
						<span className="material-symbols-outlined text-[18px]">add_circle</span>
						Submit POC
					</Link>
				</div>

				{/* Stats bar */}
				<div className="grid grid-cols-3 gap-4 mb-8">
					{[
						{ label: "Total POCs", value: "1,248", icon: "terminal" },
						{ label: "Verified", value: "834", icon: "verified" },
						{ label: "This Week", value: "+23", icon: "trending_up" },
					].map((stat) => (
						<div
							key={stat.label}
							className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4"
						>
							<div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
								<span className="material-symbols-outlined text-primary">{stat.icon}</span>
							</div>
							<div>
								<p className="text-2xl font-extrabold text-slate-900 dark:text-white">
									{stat.value}
								</p>
								<p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
							</div>
						</div>
					))}
				</div>

				{/* Filter tabs */}
				<div className="flex gap-2 mb-6 flex-wrap">
					{["All", "Critical", "High", "Medium", "Low", "Verified"].map((filter, i) => (
						<button
							key={filter}
							className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
								i === 0
									? "bg-primary text-white border-primary"
									: "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary"
							}`}
						>
							{filter}
						</button>
					))}
				</div>

				{/* POC list */}
				<div className="space-y-4">
					{mockPocs.map((poc) => (
						<div
							key={poc.id}
							className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow"
						>
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1 min-w-0">
									<div className="flex flex-wrap items-center gap-2 mb-2">
										<Link
											href={`/cves/${poc.cveId}`}
											className="text-xs font-bold text-primary hover:underline"
										>
											{poc.cveId}
										</Link>
										<span
											className={`px-2 py-0.5 rounded-full text-xs font-bold border ${severityColors[poc.severity]}`}
										>
											{poc.severity} {poc.score}
										</span>
										{poc.verified && (
											<span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
												<span className="material-symbols-outlined text-[14px]">verified</span>{" "}
												Verified
											</span>
										)}
										<span
											className={`px-2 py-0.5 rounded text-xs font-medium border ${langColors[poc.language] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
										>
											{poc.language}
										</span>
									</div>
									<h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
										{poc.title}
									</h3>
									<p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
										{poc.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{poc.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs"
											>
												#{tag}
											</span>
										))}
									</div>
								</div>
								<div className="shrink-0 text-right">
									<p className="text-xs text-slate-400 dark:text-slate-500 mb-1">{poc.date}</p>
									<p className="text-xs text-slate-500 dark:text-slate-400">
										by{" "}
										<span className="font-semibold text-slate-700 dark:text-slate-300">
											{poc.author}
										</span>
									</p>
								</div>
							</div>
							<div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
								<button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
									<span className="material-symbols-outlined text-[14px]">code</span>
									View Code
								</button>
								<button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
									<span className="material-symbols-outlined text-[14px]">download</span>
									Download
								</button>
								<Link
									href={`/cves/${poc.cveId}`}
									className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
								>
									<span className="material-symbols-outlined text-[14px]">open_in_new</span>
									CVE Details
								</Link>
							</div>
						</div>
					))}
				</div>

				{/* Pagination */}
				<div className="mt-10 flex items-center justify-center gap-2">
					<button className="flex items-center justify-center w-9 h-9 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
						<span className="material-symbols-outlined">chevron_left</span>
					</button>
					{[1, 2, 3, 4].map((p) => (
						<button
							key={p}
							className={`flex items-center justify-center w-9 h-9 rounded font-bold text-sm ${
								p === 1
									? "bg-primary text-white"
									: "border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
							}`}
						>
							{p}
						</button>
					))}
					<button className="flex items-center justify-center w-9 h-9 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
						<span className="material-symbols-outlined">chevron_right</span>
					</button>
				</div>
			</div>
		</div>
	);
}
