import Link from "next/link";

const recentChanges = [
	{
		id: 1,
		action: "added",
		user: "sec_researcher",
		target: "CVE-2024-6387",
		detail: "Added technical writeup and PoC details",
		time: "2 hours ago",
		icon: "add_circle",
		color: "text-green-600",
	},
	{
		id: 2,
		action: "updated",
		user: "infosec_labs",
		target: "CVE-2021-44228",
		detail: "Updated CVSS score and affected versions table",
		time: "5 hours ago",
		icon: "edit",
		color: "text-blue-600",
	},
	{
		id: 3,
		action: "submitted",
		user: "vuln_hunter",
		target: "POC for CVE-2024-3400",
		detail: "Submitted new Python exploit proof-of-concept",
		time: "8 hours ago",
		icon: "terminal",
		color: "text-purple-600",
	},
	{
		id: 4,
		action: "corrected",
		user: "patch_watcher",
		target: "CVE-2022-22965",
		detail: "Corrected affected Spring Framework version range",
		time: "1 day ago",
		icon: "check_circle",
		color: "text-orange-600",
	},
	{
		id: 5,
		action: "added",
		user: "ms_researcher",
		target: "CVE-2024-38063",
		detail: "Added MSRC advisory link and mitigation steps",
		time: "1 day ago",
		icon: "add_circle",
		color: "text-green-600",
	},
	{
		id: 6,
		action: "updated",
		user: "spring_hacker",
		target: "CVE-2024-27198",
		detail: "Added remediation section with patch verification steps",
		time: "2 days ago",
		icon: "edit",
		color: "text-blue-600",
	},
	{
		id: 7,
		action: "submitted",
		user: "sec_analyst",
		target: "POC for CVE-2023-23397",
		detail: "Submitted PowerShell PoC for Outlook NTLM leak",
		time: "3 days ago",
		icon: "terminal",
		color: "text-purple-600",
	},
];

const contributors = [
	{
		rank: 1,
		username: "sec_researcher",
		contributions: 847,
		pocs: 23,
		badges: ["Top Contributor", "Verified"],
		joinedMonth: "Jan 2022",
	},
	{
		rank: 2,
		username: "infosec_labs",
		contributions: 734,
		pocs: 18,
		badges: ["Core Team"],
		joinedMonth: "Mar 2022",
	},
	{
		rank: 3,
		username: "vuln_hunter",
		contributions: 612,
		pocs: 31,
		badges: ["Top POC Author"],
		joinedMonth: "Jun 2022",
	},
	{
		rank: 4,
		username: "patch_watcher",
		contributions: 589,
		pocs: 5,
		badges: ["Accuracy Award"],
		joinedMonth: "Feb 2023",
	},
	{
		rank: 5,
		username: "ms_researcher",
		contributions: 478,
		pocs: 12,
		badges: ["Verified"],
		joinedMonth: "Aug 2022",
	},
	{
		rank: 6,
		username: "spring_hacker",
		contributions: 412,
		pocs: 9,
		badges: [],
		joinedMonth: "Nov 2022",
	},
	{
		rank: 7,
		username: "sec_analyst",
		contributions: 387,
		pocs: 7,
		badges: [],
		joinedMonth: "Jan 2023",
	},
	{
		rank: 8,
		username: "red_team_ops",
		contributions: 356,
		pocs: 14,
		badges: ["Top POC Author"],
		joinedMonth: "Apr 2023",
	},
];

const badgeColors: Record<string, string> = {
	"Top Contributor":
		"bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400",
	"Core Team": "bg-primary/10 text-primary border-primary/20",
	"Top POC Author":
		"bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400",
	"Accuracy Award":
		"bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400",
	Verified: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function ContributorsPage() {
	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
			<div className="max-w-5xl mx-auto py-10 px-6">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
						Contributors
					</h1>
					<p className="text-slate-500 dark:text-slate-400 text-sm">
						Community members who keep VulnNexus accurate, up-to-date, and impactful.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					{/* Leaderboard */}
					<div className="lg:col-span-7">
						<h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
							<span className="material-symbols-outlined text-amber-500">emoji_events</span>
							Top Contributors
						</h2>
						<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
							<table className="w-full text-sm">
								<thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
									<tr>
										<th className="px-4 py-3 text-left">Rank</th>
										<th className="px-4 py-3 text-left">User</th>
										<th className="px-4 py-3 text-right">Edits</th>
										<th className="px-4 py-3 text-right">POCs</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
									{contributors.map((c) => (
										<tr
											key={c.rank}
											className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
										>
											<td className="px-4 py-3">
												<span
													className={`text-sm font-extrabold ${
														c.rank === 1
															? "text-amber-500"
															: c.rank === 2
																? "text-slate-400"
																: c.rank === 3
																	? "text-amber-700"
																	: "text-slate-400 dark:text-slate-500"
													}`}
												>
													#{c.rank}
												</span>
											</td>
											<td className="px-4 py-3">
												<div className="flex items-center gap-2.5">
													<div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
														{c.username.slice(0, 2).toUpperCase()}
													</div>
													<div>
														<p className="font-semibold text-slate-900 dark:text-white text-xs">
															{c.username}
														</p>
														<p className="text-xs text-slate-400 dark:text-slate-500">
															Since {c.joinedMonth}
														</p>
													</div>
													<div className="flex gap-1 flex-wrap">
														{c.badges.map((badge) => (
															<span
																key={badge}
																className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${badgeColors[badge] ?? "bg-slate-100 text-slate-600 border-slate-200"}`}
															>
																{badge}
															</span>
														))}
													</div>
												</div>
											</td>
											<td className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-300">
												{c.contributions.toLocaleString()}
											</td>
											<td className="px-4 py-3 text-right font-bold text-purple-600 dark:text-purple-400">
												{c.pocs}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* CTA */}
						<div className="mt-4 p-4 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-4">
							<span className="material-symbols-outlined text-primary text-3xl shrink-0">
								group_add
							</span>
							<div className="flex-1">
								<p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
									Become a contributor
								</p>
								<p className="text-xs text-slate-500 dark:text-slate-400">
									Help us keep VulnNexus accurate. Submit POCs, correct CVE data, and earn badges.
								</p>
							</div>
							<Link
								href="/register"
								className="shrink-0 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
							>
								Join
							</Link>
						</div>
					</div>

					{/* Recent changes */}
					<div className="lg:col-span-5">
						<h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
							<span className="material-symbols-outlined text-primary">history</span>
							Recent Changes
						</h2>
						<div className="space-y-3">
							{recentChanges.map((change) => (
								<div
									key={change.id}
									className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"
								>
									<div className="flex items-start gap-3">
										<span
											className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${change.color}`}
										>
											{change.icon}
										</span>
										<div className="flex-1 min-w-0">
											<p className="text-xs text-slate-900 dark:text-slate-100">
												<span className="font-bold">{change.user}</span>{" "}
												<span className="text-slate-500 dark:text-slate-400">{change.action}</span>{" "}
												<span className="text-primary font-semibold">{change.target}</span>
											</p>
											<p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
												{change.detail}
											</p>
											<p className="text-[10px] text-slate-300 dark:text-slate-600 mt-1">
												{change.time}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
