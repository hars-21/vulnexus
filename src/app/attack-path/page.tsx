import Link from "next/link";

export default function AttackPathPage() {
	return (
		<div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
			<style
				dangerouslySetInnerHTML={{
					__html: `
                .wiki-border {
                    border-color: #a2a9b1;
                }
                .attack-line::before {
                    content: '';
                    position: absolute;
                    left: 1.25rem;
                    top: 2.5rem;
                    bottom: -1.5rem;
                    width: 2px;
                    background-color: #0646ac30;
                    z-index: 0;
                }
                .attack-step:last-child .attack-line::before {
                    display: none;
                }
            `,
				}}
			/>
			<div className="p-8 max-w-6xl mx-auto w-full">
				<div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-2">
					<h2 className="text-3xl font-display font-medium text-slate-900 dark:text-white mb-2 tracking-tight">
						Attack Path Generator
					</h2>
					<div className="flex items-center gap-4 text-xs text-slate-500 italic mb-4">
						<span>From VulNexus Research Intelligence</span>
						<span className="w-1 h-1 bg-slate-300 rounded-full"></span>
						<span>Revised version 2.4.1</span>
					</div>
					<p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 max-w-4xl">
						The <span className="font-semibold">Attack Path Generator</span> is an AI-driven
						simulation tool designed to identify potential exploit chains within a target
						infrastructure. By leveraging large language models and real-time vulnerability
						intelligence, the tool correlates{" "}
						<span className="text-primary hover:underline cursor-pointer">reconnaissance data</span>{" "}
						such as open ports and service versions with known exploit vectors to model multi-stage
						infiltration scenarios.
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
					<div className="lg:col-span-5 space-y-6">
						<section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-sm">
							<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<span className="material-symbols-outlined text-primary">analytics</span>
								Reconnaissance Data Input
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
										Open Ports &amp; Protocols
									</label>
									<input
										className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm focus:ring-1 focus:ring-primary"
										placeholder="e.g. 80/tcp, 443/tcp, 8080/tcp, 22/ssh"
										type="text"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
										Service Banners
									</label>
									<textarea
										className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm focus:ring-1 focus:ring-primary"
										placeholder="Paste Nmap banners or service headers..."
										rows={3}
									></textarea>
								</div>
								<div>
									<label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
										Software Versions
									</label>
									<input
										className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm focus:ring-1 focus:ring-primary"
										placeholder="e.g. Apache Struts 2.3.5, OpenSSH 7.2p2"
										type="text"
									/>
								</div>
								<div className="pt-2">
									<button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-4 rounded transition-all shadow-md flex items-center justify-center gap-2">
										<span className="material-symbols-outlined text-sm">rocket_launch</span>
										Generate Attack Path
									</button>
								</div>
							</div>
						</section>
						<div className="p-4 border-l-4 border-primary/30 bg-primary/5 rounded-r">
							<h4 className="text-xs font-bold uppercase text-primary mb-1">System Insight</h4>
							<p className="text-xs text-slate-600 dark:text-slate-400 italic">
								Paths are generated using the latest CVE definitions from the VulNexus Intelligence
								engine, updated 14 minutes ago.
							</p>
						</div>
					</div>
					<div className="lg:col-span-7">
						<div className="flex items-center justify-between mb-4 px-2">
							<h3 className="text-lg font-semibold flex items-center gap-2">
								<span className="material-symbols-outlined text-primary">route</span>
								Generated Attack Path
							</h3>
							<div className="flex gap-2">
								<button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
									<span className="material-symbols-outlined text-sm">download</span>
									Export Path
								</button>
								<button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
									<span className="material-symbols-outlined text-sm">bookmark</span>
									Save
								</button>
							</div>
						</div>
						<div className="space-y-6 relative ml-6">
							<div className="attack-step relative flex gap-6 attack-line">
								<div className="z-10 mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900">
									<span className="text-white text-xs font-bold">1</span>
								</div>
								<div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-5 shadow-sm hover:shadow-md transition-shadow">
									<div className="flex justify-between items-start mb-2">
										<h4 className="font-bold text-slate-900 dark:text-white">
											Exploit Apache Struts RCE
										</h4>
										<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800">
											CRITICAL
										</span>
									</div>
									<p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-snug">
										Exploitation of CVE-2017-5638 via a crafted Content-Type header allows remote
										code execution on the application server.
									</p>
									<div className="flex items-center gap-3">
										<Link
											className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
											href="/cves/CVE-2017-5638"
										>
											CVE-2017-5638{" "}
											<span className="material-symbols-outlined text-[14px]">open_in_new</span>
										</Link>
										<a
											className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
											href="#"
										>
											ExploitDB #41614{" "}
											<span className="material-symbols-outlined text-[14px]">open_in_new</span>
										</a>
									</div>
								</div>
							</div>
							<div className="attack-step relative flex gap-6 attack-line">
								<div className="z-10 mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900">
									<span className="text-white text-xs font-bold">2</span>
								</div>
								<div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-5 shadow-sm hover:shadow-md transition-shadow">
									<div className="flex justify-between items-start mb-2">
										<h4 className="font-bold text-slate-900 dark:text-white">
											Local Privilege Escalation
										</h4>
										<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
											HIGH
										</span>
									</div>
									<p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-snug">
										Utilization of dirty cow (CVE-2016-5195) to escalate from &apos;www-data&apos;
										service account to &apos;root&apos; access on the target host.
									</p>
									<div className="flex items-center gap-3">
										<Link
											className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
											href="/cves/CVE-2016-5195"
										>
											CVE-2016-5195{" "}
											<span className="material-symbols-outlined text-[14px]">open_in_new</span>
										</Link>
									</div>
								</div>
							</div>
							<div className="attack-step relative flex gap-6 attack-line">
								<div className="z-10 mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900">
									<span className="text-white text-xs font-bold">3</span>
								</div>
								<div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-5 shadow-sm hover:shadow-md transition-shadow">
									<div className="flex justify-between items-start mb-2">
										<h4 className="font-bold text-slate-900 dark:text-white">
											Internal Network Pivoting
										</h4>
										<span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
											MEDIUM
										</span>
									</div>
									<p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-snug">
										Setup of an SSH dynamic port forward (SOCKS proxy) to bridge external traffic
										into the internal 10.0.x.x management subnet.
									</p>
									<div className="flex items-center gap-3">
										<a
											className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
											href="#"
										>
											Lateral Movement Tooling{" "}
											<span className="material-symbols-outlined text-[14px]">open_in_new</span>
										</a>
									</div>
								</div>
							</div>
							<div className="attack-step relative flex gap-6 opacity-50">
								<div className="z-10 mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-900">
									<span className="text-slate-400 text-xs font-bold">...</span>
								</div>
								<div className="flex-1 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded p-5">
									<div className="h-4 bg-slate-100 dark:bg-slate-800 w-1/3 mb-3 rounded"></div>
									<div className="h-3 bg-slate-100 dark:bg-slate-800 w-full mb-2 rounded"></div>
									<div className="h-3 bg-slate-100 dark:bg-slate-800 w-2/3 rounded"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row gap-4 justify-between items-start italic">
					<div className="max-w-xl">
						This page was last edited on 24 May 2024, at 14:02 (UTC). Text is available under the
						VulNexus Proprietary Intelligence License; additional terms may apply. By using this
						tool, you agree to the Terms of Service and Cybersecurity Ethics Policy.
					</div>
					<div className="flex gap-4">
						<a className="hover:text-primary underline" href="#">
							Privacy Policy
						</a>
						<a className="hover:text-primary underline" href="#">
							About VulNexus
						</a>
						<a className="hover:text-primary underline" href="#">
							Disclaimers
						</a>
					</div>
				</footer>
			</div>
		</div>
	);
}
