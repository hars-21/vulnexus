"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Home,
	Database,
	Terminal,
	Radio,
	Route,
	BrainCircuit,
	Bot,
	History,
	Users,
	Upload,
	Github,
	Zap,
	ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navSections = [
	{
		label: "Main",
		items: [
			{ href: "/", icon: Home, label: "Home" },
			{ href: "/search", icon: Database, label: "CVE Search" },
			{ href: "/threat-feed", icon: Radio, label: "Threat Feed" },
			{ href: "/pocs", icon: Terminal, label: "Exploit Library" },
		],
	},
	{
		label: "Intelligence",
		items: [
			{ href: "/attack-path", icon: Route, label: "Attack Path" },
			{ href: "/quickscan", icon: BrainCircuit, label: "Vulnerability Predictor" },
			{ href: "/github", icon: Github, label: "GitHub Analyzer" },
			{ href: "/assistant", icon: Bot, label: "AI Assistant" },
		],
	},
	{
		label: "Community",
		items: [
			{ href: "/pocs/submit", icon: Upload, label: "Submit POC" },
			{ href: "/contributors", icon: Users, label: "Contributors" },
		],
	},
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 flex-shrink-0 hidden lg:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 h-screen overflow-y-auto">
			<div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
				<div className="bg-[#0646ac] p-1.5 rounded text-white flex items-center justify-center">
					<ShieldCheck size={18} />
				</div>
				<span className="text-lg font-black tracking-tight text-[#0646ac]">VULNEXUS</span>
			</div>

			<nav className="flex-1 p-4 space-y-6 overflow-y-auto">
				{navSections.map((section) => (
					<div key={section.label}>
						<p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-2 px-3 uppercase tracking-[0.2em]">
							{section.label}
						</p>
						<div className="flex flex-col gap-0.5">
							{section.items.map((item) => {
								const active = pathname === item.href;
								return (
									<Link
										key={item.href}
										href={item.href}
										className={cn(
											"flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors",
											active
												? "bg-[#0646ac]/10 text-[#0646ac] font-semibold border-l-2 border-[#0646ac]"
												: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
										)}
									>
										<item.icon size={18} />
										{item.label}
									</Link>
								);
							})}
						</div>
					</div>
				))}
			</nav>

			<div className="p-4 border-t border-slate-200 dark:border-slate-800">
				<div className="bg-[#0646ac]/5 rounded-xl p-4 border border-[#0646ac]/10">
					<p className="text-xs text-[#0646ac] font-bold mb-1">PRO ACCESS</p>
					<p className="text-xs text-slate-500 mb-3">Real-time alerts and advanced exploit APIs.</p>
					<button className="w-full bg-[#0646ac] text-white text-[11px] font-bold py-2 rounded hover:bg-[#0646ac]/90 transition-colors">
						UPGRADE
					</button>
				</div>
			</div>
		</aside>
	);
}
