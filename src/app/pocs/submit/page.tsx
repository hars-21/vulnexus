import Link from "next/link";

export default function PocSubmitPage() {
	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
			<style
				dangerouslySetInnerHTML={{
					__html: `
                .wiki-sidebar-border {
                    border-right: 1px solid #e2e8f0;
                }
                .content-max-width {
                    max-width: 1200px;
                }
                pre {
                    font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
                }
            `,
				}}
			/>
			<div className="flex min-h-screen content-max-width mx-auto">
				<aside className="w-64 flex-shrink-0 pt-8 px-4 wiki-sidebar-border hidden lg:block bg-background-light dark:bg-background-dark">
					<div className="space-y-6">
						<div>
							<h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
								MAIN
							</h3>
							<ul className="space-y-1">
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="/"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">home</span>
										Home
									</Link>
								</li>
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="/search"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">
											database
										</span>
										CVE Database
									</Link>
								</li>
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="/pocs"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">
											terminal
										</span>
										Exploit Library
									</Link>
								</li>
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="/threat-feed"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">
											rss_feed
										</span>
										Threat Feed
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
								INTELLIGENCE
							</h3>
							<ul className="space-y-1">
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="/attack-path"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">hub</span>
										Attack Path
									</Link>
								</li>
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="/quickscan"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">
											psychology
										</span>
										Vulnerability Predictor
									</Link>
								</li>
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="/assistant"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">
											robot_2
										</span>
										Pentester Assistant
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
								COMMUNITY
							</h3>
							<ul className="space-y-1">
								<li>
									<a
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="#"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">
											history
										</span>
										Recent Changes
									</a>
								</li>
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
										href="/contributors"
									>
										<span className="material-symbols-outlined text-lg text-slate-500">badge</span>
										Contributors
									</Link>
								</li>
								<li>
									<Link
										className="flex items-center gap-3 px-2 py-1.5 text-sm rounded bg-primary/10 text-primary font-semibold"
										href="/pocs/submit"
									>
										<span className="material-symbols-outlined text-lg">add_box</span>
										Submit POC
									</Link>
								</li>
							</ul>
						</div>
						<div className="pt-6 border-t border-slate-200 dark:border-slate-800">
							<p className="text-[10px] text-slate-400 leading-relaxed px-2 italic">
								Supporting responsible disclosure since 2024.
							</p>
						</div>
					</div>
				</aside>
				<main className="flex-1 bg-white dark:bg-background-dark min-w-0">
					<div className="px-8 py-8 lg:px-12">
						<nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
							<Link className="hover:text-primary" href="/">
								VULNEXUS
							</Link>
							<span className="material-symbols-outlined text-[12px]">chevron_right</span>
							<Link className="hover:text-primary" href="/pocs">
								Submissions
							</Link>
							<span className="material-symbols-outlined text-[12px]">chevron_right</span>
							<span className="text-slate-900 dark:text-slate-100 font-medium">New POC</span>
						</nav>
						<div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-8">
							<h2 className="text-3xl font-display font-medium text-slate-900 dark:text-white">
								Submit Proof of Concept
							</h2>
							<p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
								Create a new vulnerability research record. Please ensure all technical details are
								accurate and your exploit script is functional for verification.
							</p>
						</div>
						<div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
							<div className="xl:col-span-8 space-y-8">
								<form className="space-y-6">
									<div className="space-y-2">
										<label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
											Associated CVE Identifier
										</label>
										<div className="relative">
											<input
												className="w-full p-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
												placeholder="e.g., CVE-2024-1234"
												type="text"
											/>
											<div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
												<span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
													AUTOCOMPLETE
												</span>
											</div>
										</div>
										<p className="text-[11px] text-slate-500">
											Search for an existing CVE entry to link this POC.
										</p>
									</div>
									<div className="space-y-2">
										<label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
											Exploit Title
										</label>
										<input
											className="w-full p-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
											placeholder="Descriptive title of the vulnerability impact"
											type="text"
										/>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
												Detailed Description
											</label>
											<div className="flex gap-4">
												<button
													className="text-[11px] text-primary font-bold hover:underline"
													type="button"
												>
													Write
												</button>
												<button
													className="text-[11px] text-slate-500 hover:text-primary"
													type="button"
												>
													Preview
												</button>
											</div>
										</div>
										<div className="border border-slate-300 dark:border-slate-700 rounded overflow-hidden">
											<div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-300 dark:border-slate-700 px-3 py-1.5 flex gap-4">
												<span className="material-symbols-outlined text-lg text-slate-500 cursor-pointer hover:text-primary">
													format_bold
												</span>
												<span className="material-symbols-outlined text-lg text-slate-500 cursor-pointer hover:text-primary">
													format_italic
												</span>
												<span className="material-symbols-outlined text-lg text-slate-500 cursor-pointer hover:text-primary">
													link
												</span>
												<span className="material-symbols-outlined text-lg text-slate-500 cursor-pointer hover:text-primary">
													list
												</span>
												<span className="material-symbols-outlined text-lg text-slate-500 cursor-pointer hover:text-primary">
													terminal
												</span>
											</div>
											<textarea
												className="w-full p-3 text-sm bg-white dark:bg-slate-900 border-none focus:ring-0 outline-none resize-y"
												placeholder="Technical analysis, reproduction steps, and impact assessment..."
												rows={8}
											></textarea>
										</div>
										<p className="text-[11px] text-slate-500 flex items-center gap-1">
											<span className="material-symbols-outlined text-[14px]">info</span> Supports
											Markdown for technical documentation.
										</p>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
												POC Script / Exploit Code
											</label>
											<select className="text-[11px] bg-slate-100 dark:bg-slate-800 border-none rounded py-0.5 pl-2 pr-8 focus:ring-0">
												<option>Python</option>
												<option>Go</option>
												<option>Bash</option>
												<option>JavaScript</option>
												<option>C++</option>
											</select>
										</div>
										<div className="relative group">
											<pre className="bg-slate-900 text-slate-300 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed min-h-[200px] border border-slate-800">
												<code>{`import socket

def exploit(target_ip, target_port):
    payload = b"A" * 1024
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((target_ip, target_port))
        s.sendall(payload)
        print("[+] Payload sent to {}:{}".format(target_ip, target_port))

if __name__ == "__main__":
    pass`}</code>
											</pre>
											<button
												className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
												type="button"
											>
												<span className="material-symbols-outlined text-sm">content_copy</span>
											</button>
										</div>
									</div>
									<div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4">
										<Link
											href="/pocs"
											className="px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded"
										>
											Cancel
										</Link>
										<button
											className="px-8 py-2 text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all rounded shadow-sm"
											type="submit"
										>
											Initialize Submission
										</button>
									</div>
								</form>
							</div>
							<div className="xl:col-span-4 space-y-6">
								<div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
									<div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-800">
										<h4 className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
											Submission Guidelines
										</h4>
									</div>
									<div className="p-4 space-y-4">
										<div className="flex gap-3">
											<span className="material-symbols-outlined text-primary text-lg">
												check_circle
											</span>
											<div>
												<h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
													Verifiability
												</h5>
												<p className="text-xs text-slate-500 mt-1 leading-normal">
													All POCs must be reproducible in the VulNexus Sandbox environment.
												</p>
											</div>
										</div>
										<div className="flex gap-3">
											<span className="material-symbols-outlined text-primary text-lg">
												check_circle
											</span>
											<div>
												<h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
													Original Content
												</h5>
												<p className="text-xs text-slate-500 mt-1 leading-normal">
													Plagiarism is strictly prohibited. Cite external researchers if
													applicable.
												</p>
											</div>
										</div>
										<div className="flex gap-3">
											<span className="material-symbols-outlined text-primary text-lg">
												check_circle
											</span>
											<div>
												<h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">
													Safety First
												</h5>
												<p className="text-xs text-slate-500 mt-1 leading-normal">
													Do not include destructive components that could harm production systems.
												</p>
											</div>
										</div>
										<div className="pt-2">
											<a
												className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline"
												href="#"
											>
												Read the full Disclosure Policy{" "}
												<span className="material-symbols-outlined text-xs">open_in_new</span>
											</a>
										</div>
									</div>
								</div>
								<div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900/30">
									<div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-800">
										<h4 className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400">
											Verification Process
										</h4>
									</div>
									<div className="p-4">
										<div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200 dark:before:bg-slate-700">
											<div className="relative">
												<div className="absolute -left-[21px] top-1 size-3 rounded-full bg-primary border-2 border-white dark:border-slate-900"></div>
												<p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
													Initial Review
												</p>
												<p className="text-[11px] text-slate-500">
													Automated static analysis of the POC script for safety and syntax.
												</p>
											</div>
											<div className="relative">
												<div className="absolute -left-[21px] top-1 size-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900"></div>
												<p className="text-[13px] font-semibold text-slate-400">
													Sandbox Execution
												</p>
												<p className="text-[11px] text-slate-500">
													Manual verification by our triage team in an isolated environment.
												</p>
											</div>
											<div className="relative">
												<div className="absolute -left-[21px] top-1 size-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900"></div>
												<p className="text-[13px] font-semibold text-slate-400">Final Validation</p>
												<p className="text-[11px] text-slate-500">
													Public advisory generation and reward allocation (if applicable).
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-lg">
									<div className="flex items-center gap-3 mb-3">
										<div className="size-10 bg-primary/20 rounded flex items-center justify-center">
											<span className="material-symbols-outlined text-primary">military_tech</span>
										</div>
										<div>
											<p className="text-xs text-slate-500">Researcher Tier</p>
											<p className="text-sm font-bold text-primary">Senior Contributor</p>
										</div>
									</div>
									<div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
										<div className="h-full bg-primary w-[75%]"></div>
									</div>
									<p className="text-[10px] text-slate-500 mt-2">
										Submit 3 more POCs to reach &apos;Master&apos; tier.
									</p>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
