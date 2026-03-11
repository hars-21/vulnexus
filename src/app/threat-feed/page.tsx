import Link from "next/link";

const feedItems = [
	{
		id: 1,
		cveId: "CVE-2024-6387",
		title: "regreSSHion: OpenSSH Remote Code Execution (Unauthenticated)",
		severity: "CRITICAL",
		score: 8.1,
		published: "2 hours ago",
		source: "NVD",
		tags: ["RCE", "OpenSSH", "Linux"],
		isNew: true,
		hasPoc: true,
	},
	{
		id: 2,
		cveId: "CVE-2024-38063",
		title: "Windows TCP/IP IPv6 Remote Code Execution Vulnerability",
		severity: "CRITICAL",
		score: 9.8,
		published: "5 hours ago",
		source: "MSRC",
		tags: ["RCE", "Windows", "IPv6", "TCP/IP"],
		isNew: true,
		hasPoc: false,
	},
	{
		id: 3,
		cveId: "CVE-2024-21762",
		title: "Fortinet FortiOS Out-of-Bound Write in SSL VPN",
		severity: "CRITICAL",
		score: 9.6,
		published: "1 day ago",
		source: "Fortinet PSIRT",
		tags: ["SSL VPN", "Fortinet", "OOB Write"],
		isNew: false,
		hasPoc: true,
	},
	{
		id: 4,
		cveId: "CVE-2024-27198",
		title: "JetBrains TeamCity Authentication Bypass",
		severity: "CRITICAL",
		score: 10.0,
		published: "1 day ago",
		source: "JetBrains",
		tags: ["Auth Bypass", "TeamCity", "CI/CD"],
		isNew: false,
		hasPoc: true,
	},
	{
		id: 5,
		cveId: "CVE-2024-3400",
		title: "PAN-OS GlobalProtect Unauthenticated RCE (0-day)",
		severity: "CRITICAL",
		score: 10.0,
		published: "2 days ago",
		source: "Palo Alto PSIRT",
		tags: ["RCE", "PAN-OS", "0-day", "Firewall"],
		isNew: false,
		hasPoc: true,
	},
	{
		id: 6,
		cveId: "CVE-2024-1709",
		title: "ConnectWise ScreenConnect Authentication Bypass",
		severity: "CRITICAL",
		score: 10.0,
		published: "3 days ago",
		source: "ConnectWise",
		tags: ["Auth Bypass", "ScreenConnect", "Remote Access"],
		isNew: false,
		hasPoc: true,
	},
	{
		id: 7,
		cveId: "CVE-2024-30078",
		title: "Windows WiFi Driver Remote Code Execution",
		severity: "HIGH",
		score: 8.8,
		published: "4 days ago",
		source: "MSRC",
		tags: ["RCE", "Windows", "WiFi Driver"],
		isNew: false,
		hasPoc: false,
	},
	{
		id: 8,
		cveId: "CVE-2024-20767",
		title: "Adobe ColdFusion Improper Access Control",
		severity: "CRITICAL",
		score: 9.1,
		published: "5 days ago",
		source: "Adobe PSIRT",
		tags: ["Access Control", "ColdFusion", "Adobe"],
		isNew: false,
		hasPoc: false,
	},
	{
		id: 9,
		cveId: "CVE-2024-29988",
		title: "Microsoft SmartScreen Prompt Security Feature Bypass",
		severity: "HIGH",
		score: 8.8,
		published: "6 days ago",
		source: "MSRC",
		tags: ["Security Bypass", "SmartScreen", "Windows"],
		isNew: false,
		hasPoc: false,
	},
	{
		id: 10,
		cveId: "CVE-2024-23897",
		title: "Jenkins CLI Path Traversal leading to Arbitrary File Read",
		severity: "CRITICAL",
		score: 9.8,
		published: "1 week ago",
		source: "Jenkins",
		tags: ["Path Traversal", "Jenkins", "File Read"],
		isNew: false,
		hasPoc: true,
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

export default function ThreatFeedPage() {
	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
			<div className="max-w-4xl mx-auto py-10 px-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
							Threat Feed
						</h1>
						<p className="text-slate-500 dark:text-slate-400 text-sm">
							Real-time vulnerability intelligence — curated from NVD, vendor advisories, and
							community reports.
						</p>
					</div>
					<div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full">
						<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
						<span className="text-xs font-semibold text-green-700 dark:text-green-400">Live</span>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-4 gap-3 mb-8">
					{[
						{ label: "Today", value: "14", color: "text-primary" },
						{ label: "Critical", value: "8", color: "text-red-600" },
						{ label: "High", value: "4", color: "text-orange-600" },
						{ label: "With POC", value: "6", color: "text-purple-600" },
					].map((s) => (
						<div
							key={s.label}
							className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-center"
						>
							<p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
							<p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
						</div>
					))}
				</div>

				{/* Feed items */}
				<div className="space-y-3">
					{feedItems.map((item) => (
						<div
							key={item.id}
							className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md transition-shadow"
						>
							<div className="flex items-start gap-4">
								<div className="shrink-0 mt-0.5">
									<span
										className={`block w-2 h-2 rounded-full mt-1.5 ${item.isNew ? "bg-primary animate-pulse" : "bg-slate-300 dark:bg-slate-600"}`}
									></span>
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex flex-wrap items-center gap-2 mb-1.5">
										<Link
											href={`/cves/${item.cveId}`}
											className="text-xs font-bold text-primary hover:underline"
										>
											{item.cveId}
										</Link>
										<span
											className={`px-2 py-0.5 rounded-full text-xs font-bold border ${severityColors[item.severity]}`}
										>
											{item.severity} {item.score}
										</span>
										{item.isNew && (
											<span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-bold">
												NEW
											</span>
										)}
										{item.hasPoc && (
											<span className="flex items-center gap-0.5 text-xs font-semibold text-red-600 dark:text-red-400">
												<span className="material-symbols-outlined text-[13px]">bug_report</span>{" "}
												POC Available
											</span>
										)}
									</div>
									<Link
										href={`/cves/${item.cveId}`}
										className="text-sm font-semibold text-slate-900 dark:text-white hover:text-primary line-clamp-1 block"
									>
										{item.title}
									</Link>
									<div className="flex flex-wrap items-center gap-3 mt-2">
										<span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
											<span className="material-symbols-outlined text-[13px]">source</span>
											{item.source}
										</span>
										<span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
											<span className="material-symbols-outlined text-[13px]">schedule</span>
											{item.published}
										</span>
										<div className="flex gap-1 flex-wrap">
											{item.tags.slice(0, 3).map((tag) => (
												<span
													key={tag}
													className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[10px]"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Load more */}
				<div className="mt-8 text-center">
					<button className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors">
						Load More
					</button>
				</div>
			</div>
		</div>
	);
}
