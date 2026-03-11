"use client";

export default function AssistantPage() {
	return (
		<div className="flex h-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
			<style
				dangerouslySetInnerHTML={{
					__html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `,
				}}
			/>
			<main className="flex-1 flex flex-col bg-white dark:bg-slate-900" id="chat-container">
				<header className="h-12 border-b border-primary/5 px-6 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<h2 className="text-xs font-bold uppercase tracking-wider">Log4j RCE Analysis</h2>
						<span className="text-[9px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded font-bold uppercase">
							Active
						</span>
					</div>
					<div className="flex items-center gap-3">
						<button className="text-slate-400 hover:text-primary transition-colors">
							<span className="material-symbols-outlined text-sm">ios_share</span>
						</button>
						<button className="text-slate-400 hover:text-primary transition-colors">
							<span className="material-symbols-outlined text-sm">bookmark</span>
						</button>
						<div className="text-[10px] font-medium text-slate-400">VULN-Engine v4.2</div>
					</div>
				</header>
				<div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 scrollbar-hide">
					<div className="max-w-3xl mx-auto flex gap-4">
						<div className="size-8 rounded bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center">
							<span className="material-symbols-outlined text-slate-500 text-sm">person</span>
						</div>
						<div className="flex-1 text-sm leading-relaxed">
							Analyze the attack surface for the recent Log4j vulnerability. I&apos;m specifically
							looking for common bypasses used against early mitigation attempts.
						</div>
					</div>
					<div className="max-w-3xl mx-auto flex gap-4">
						<div className="size-8 rounded bg-primary shrink-0 flex items-center justify-center">
							<span className="material-symbols-outlined text-white text-sm">smart_toy</span>
						</div>
						<div className="flex-1 space-y-4">
							<p className="text-sm leading-relaxed">
								The initial mitigation for Log4Shell (CVE-2021-44228) focused on disabling lookup
								mechanism via system properties. However, several bypasses were discovered shortly
								after.
							</p>
							<div className="p-3 rounded border border-primary/20 bg-primary/5 flex items-start gap-3">
								<span className="material-symbols-outlined text-primary text-sm mt-1">
									description
								</span>
								<div>
									<h4 className="text-xs font-bold text-primary">Related CVE Entry</h4>
									<p className="text-[11px] text-slate-600 dark:text-slate-400">
										CVE-2021-45046: Incomplete fix in Log4j 2.15.0 leads to RCE in certain
										non-default configurations.
									</p>
								</div>
							</div>
							<div className="bg-slate-900 rounded p-3 font-mono text-xs text-slate-300">
								<div className="flex justify-between items-center mb-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest border-b border-slate-800 pb-1">
									<span>java</span>
									<span>copy</span>
								</div>
								<code>
									{`\${jndi:ldap://127.0.0.1:1389/a}`}
									<br />
									{`\${\${lower:j}ndi:rmi://127.0.0.1:1099/poc}`}
								</code>
							</div>
						</div>
					</div>
				</div>
				<footer className="p-6 pt-0">
					<div className="max-w-3xl mx-auto">
						<div className="relative bg-white dark:bg-slate-800 border border-primary/10 rounded overflow-hidden">
							<div className="p-3">
								<textarea
									className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-slate-400 resize-none"
									placeholder="Ask a follow-up..."
									rows={2}
								></textarea>
							</div>
							<div className="flex items-center justify-between px-3 py-2 border-t border-primary/5 bg-slate-50/50 dark:bg-slate-900/50">
								<div className="flex gap-2">
									<span className="material-symbols-outlined text-slate-400 text-sm">
										attach_file
									</span>
									<span className="material-symbols-outlined text-slate-400 text-sm">language</span>
								</div>
								<button className="bg-primary text-white px-4 py-1.5 rounded text-xs font-bold">
									SEND
								</button>
							</div>
						</div>
					</div>
				</footer>
			</main>
			<aside
				className="w-72 shrink-0 border-l border-primary/10 bg-white dark:bg-slate-900"
				id="context-sidebar"
			>
				<div className="p-4 border-b border-primary/10 font-bold text-[10px] uppercase tracking-widest text-slate-500">
					Context Memory
				</div>
				<div className="flex-1 overflow-y-auto p-4 space-y-6">
					<section>
						<h4 className="text-[10px] font-bold uppercase mb-3">Active Files</h4>
						<div className="space-y-2">
							<div className="p-2 rounded border border-primary/10 flex items-center gap-2">
								<span className="material-symbols-outlined text-primary text-base">
									description
								</span>
								<div className="flex-1">
									<p className="text-[11px] font-semibold">Log4j_Analysis.pdf</p>
								</div>
							</div>
						</div>
					</section>
					<section>
						<h4 className="text-[10px] font-bold uppercase mb-3">Linked CVEs</h4>
						<div className="space-y-2">
							<div className="p-2 border border-slate-100 dark:border-slate-800 rounded">
								<div className="flex justify-between items-center text-[9px] font-bold mb-1">
									<span className="text-primary">CVE-2021-44228</span>
									<span className="text-red-500">CRITICAL</span>
								</div>
								<p className="text-[9px] text-slate-500">Apache Log4j2 JNDI features...</p>
							</div>
						</div>
					</section>
				</div>
			</aside>
		</div>
	);
}
