"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navSections = [
	{
		label: "Main",
		items: [
			{ href: "/", icon: "home", label: "Home" },
			{ href: "/search", icon: "database", label: "CVE Database" },
			{ href: "/pocs", icon: "terminal", label: "Exploit Library" },
			{ href: "/threat-feed", icon: "sensors", label: "Threat Feed" },
		],
	},
	{
		label: "Intelligence",
		items: [
			{ href: "/attack-path", icon: "route", label: "Attack Path" },
			{ href: "/quickscan", icon: "query_stats", label: "Vulnerability Predictor" },
			{ href: "/github", icon: "code_blocks", label: "GitHub Analyzer" },
			{ href: "/assistant", icon: "smart_toy", label: "Pentester Assistant" },
		],
	},
	{
		label: "Community",
		items: [
			{ href: "/contributors", icon: "history", label: "Recent Changes" },
			{ href: "/contributors", icon: "groups", label: "Contributors" },
			{ href: "/pocs/submit", icon: "publish", label: "Submit POC" },
		],
	},
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 flex-shrink-0 hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 h-screen overflow-y-auto">
			<div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
				<div className="bg-primary p-1.5 rounded text-white flex items-center justify-center">
					<span className="material-symbols-outlined text-[20px]">shield_person</span>
				</div>
				<span className="text-sm font-bold tracking-tight uppercase text-slate-900 dark:text-slate-100">
					VULNEXUS
				</span>
			</div>

			<nav className="flex-1 p-4 space-y-6 overflow-y-auto">
				{navSections.map((section) => (
					<div key={section.label}>
						<p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-3">
							{section.label}
						</p>
						<ul className="space-y-1">
							{section.items.map((item) => {
								const active = pathname === item.href;
								return (
									<li key={item.href + item.label}>
										<Link
											href={item.href}
											className={cn(
												"flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
												active
													? "bg-primary/10 text-primary font-semibold"
													: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary",
											)}
										>
											<span className="material-symbols-outlined text-[20px]">{item.icon}</span>
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				))}
			</nav>

			<div className="pt-6 border-t border-slate-200 dark:border-slate-800 p-6">
				<div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
					<p className="text-xs text-primary font-bold mb-2">PRO ACCESS</p>
					<p className="text-xs text-slate-500 mb-3">
						Get real-time alerts and advanced exploit APIs.
					</p>
					<button className="w-full bg-primary text-white text-[11px] font-bold py-2 rounded hover:bg-primary/90 transition-colors">
						UPGRADE
					</button>
				</div>
			</div>
		</aside>
	);
}
