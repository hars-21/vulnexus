import Link from "next/link";

export default function CvePage({ params }: { params: { id: string } }) {
	const cveId = params.id;
	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
			<style
				dangerouslySetInnerHTML={{
					__html: `
                .sidebar-link-active {
                    background-color: rgba(6, 70, 172, 0.1);
                    border-left: 3px solid #0646ac;
                }
                .infobox {
                    border: 1px solid #e2e8f0;
                }
            `,
				}}
			/>
			<div className="max-w-7xl mx-auto p-8 lg:p-12">
				<div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
					<div className="xl:col-span-8">
						<h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-4">
							{cveId}: Remote Code Execution in WebServer X
						</h1>
						<p className="text-lg text-slate-600 dark:text-slate-400 mb-8 font-light italic leading-relaxed">
							A critical flaw in the URI parsing engine allows unauthenticated remote attackers to
							execute arbitrary system commands via a specially crafted HTTP request.
						</p>
						<hr className="border-slate-200 dark:border-slate-800 mb-10" />
						<section className="mb-12" id="overview">
							<h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
								<span className="material-symbols-outlined text-primary">article</span>
								Overview
							</h2>
							<div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-7">
								<p>
									WebServer X versions 2.0 through 2.4.8 contain a vulnerability in the handling of
									percent-encoded characters within the <code>RewriteModule</code>. An attacker can
									bypass canonicalization checks and inject shell metacharacters into the backend
									processing stream.
								</p>
								<p className="mt-4">
									The vulnerability is categorized as an{" "}
									<strong>Unsafe Reflection leading to OS Command Injection</strong>. Initial
									discovery was reported by the VulnNexus Research Team during a routine audit of
									legacy protocol handlers.
								</p>
							</div>
						</section>
						<section className="mb-12" id="technical">
							<details
								className="group bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800"
								open
							>
								<summary className="flex items-center justify-between p-6 cursor-pointer list-none">
									<h2 className="text-2xl font-bold flex items-center gap-2 m-0">
										<span className="material-symbols-outlined text-primary">code</span>
										Technical Details
									</h2>
									<span className="material-symbols-outlined group-open:rotate-180 transition-transform">
										expand_more
									</span>
								</summary>
								<div className="px-6 pb-6 text-slate-700 dark:text-slate-300 text-sm space-y-4">
									<p>
										The root cause lies in the <code>process_uri_request()</code> function in{" "}
										<code>src/modules/rewrite.c</code>. When a URI contains double-encoded null
										bytes or pipe characters, the sanitization filter fails to strip them before
										passing the string to the internal <code>popen()</code> wrapper.
									</p>
									<div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800">
										<code>
											GET /api/v1/resource?id=123%257c%256e%2565%2574%2563%2561%2574 HTTP/1.1
										</code>
										<br />
										<code>Host: target-server.com</code>
									</div>
									<p>
										Decoded, this triggers: <code>/usr/bin/handler --id 123 | netcat ...</code>
									</p>
								</div>
							</details>
						</section>
						<section className="mb-12" id="affected">
							<h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
								<span className="material-symbols-outlined text-primary">table_rows</span>
								Affected Versions
							</h2>
							<div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
								<table className="w-full text-left text-sm">
									<thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase font-semibold text-xs">
										<tr>
											<th className="px-6 py-4">Software Name</th>
											<th className="px-6 py-4">Versions</th>
											<th className="px-6 py-4">Platform</th>
											<th className="px-6 py-4">Status</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-200 dark:divide-slate-800">
										<tr>
											<td className="px-6 py-4 font-medium">WebServer X (Community)</td>
											<td className="px-6 py-4">2.0.0 - 2.4.2</td>
											<td className="px-6 py-4">Linux, MacOS</td>
											<td className="px-6 py-4">
												<span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
													Vulnerable
												</span>
											</td>
										</tr>
										<tr>
											<td className="px-6 py-4 font-medium">WebServer X (Enterprise)</td>
											<td className="px-6 py-4">2.3.1 - 2.4.8</td>
											<td className="px-6 py-4">All Platforms</td>
											<td className="px-6 py-4">
												<span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
													Vulnerable
												</span>
											</td>
										</tr>
										<tr>
											<td className="px-6 py-4 font-medium">WebServer X (Legacy Support)</td>
											<td className="px-6 py-4">1.8.x</td>
											<td className="px-6 py-4">Legacy</td>
											<td className="px-6 py-4">
												<span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
													Safe
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
						<section className="mb-12" id="vector">
							<h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
								<span className="material-symbols-outlined text-primary">schema</span>
								Attack Vector Diagram
							</h2>
							<div className="aspect-video bg-white dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-8">
								<div className="relative w-full h-full flex items-center justify-center">
									<div
										className="absolute inset-0 opacity-10 pointer-events-none"
										style={{
											backgroundImage: "radial-gradient(#0646ac 1px, transparent 1px)",
											backgroundSize: "20px 20px",
										}}
									></div>
									<div className="flex flex-col items-center gap-4 z-1">
										<span className="material-symbols-outlined text-6xl text-primary/40">
											account_tree
										</span>
										<p className="text-slate-500 max-w-md">
											Visualization of the Exploit Chain: Request Interception → Parsing Bypass →
											Shell Execution
										</p>
										<span className="text-xs text-primary font-mono bg-primary/10 px-3 py-1 rounded">
											IMAGE_HOLDER_DIAGRAM_VECTOR
										</span>
									</div>
								</div>
							</div>
						</section>
						<section className="mb-12" id="mitigation">
							<h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
								<span className="material-symbols-outlined text-primary">verified_user</span>
								Mitigation &amp; Patch Info
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
									<h3 className="font-bold text-lg mb-2 text-primary">Recommended Patch</h3>
									<p className="text-sm text-slate-700 dark:text-slate-300">
										Upgrade to <strong>version 2.4.9</strong> immediately. The patch implements a
										strict whitelist for URI characters and uses <code>execve()</code> for process
										handling instead of <code>popen()</code>.
									</p>
								</div>
								<div className="p-6 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800">
									<h3 className="font-bold text-lg mb-2 text-orange-700 dark:text-orange-400">
										Temporary Workaround
									</h3>
									<p className="text-sm text-slate-700 dark:text-slate-300">
										Disable the <code>RewriteModule</code> if not critical, or apply a WAF rule to
										block requests containing percent-encoded pipe characters (%7c).
									</p>
								</div>
							</div>
						</section>
						<section className="mb-12" id="references">
							<h2 className="text-2xl font-bold mb-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
								<span className="material-symbols-outlined text-primary">list_alt</span>
								References
							</h2>
							<ul className="space-y-3">
								<li>
									<a
										className="flex items-center gap-2 text-primary hover:underline group"
										href="#"
									>
										<span className="material-symbols-outlined text-sm">open_in_new</span>
										Official Vendor Security Advisory (WEBSVR-2024-001)
									</a>
								</li>
								<li>
									<a
										className="flex items-center gap-2 text-primary hover:underline group"
										href="#"
									>
										<span className="material-symbols-outlined text-sm">open_in_new</span>
										NIST NVD {cveId} Entry
									</a>
								</li>
								<li>
									<a
										className="flex items-center gap-2 text-primary hover:underline group"
										href="#"
									>
										<span className="material-symbols-outlined text-sm">open_in_new</span>
										Initial Analysis by Researcher @CyberSleuth
									</a>
								</li>
							</ul>
						</section>
						<section
							className="pt-12 border-t border-slate-200 dark:border-slate-800"
							id="community"
						>
							<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
								<span className="material-symbols-outlined text-primary">forum</span>
								Community POC &amp; Insights
							</h2>
							<div className="space-y-4">
								<div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-4 shadow-sm">
									<div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 px-3 rounded-lg min-w-12.5">
										<button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">
											expand_less
										</button>
										<span className="font-bold text-lg">142</span>
										<button className="material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors">
											expand_more
										</button>
									</div>
									<div className="flex-1">
										<h4 className="font-bold mb-1">
											Python exploit script for unauthenticated RCE
										</h4>
										<p className="text-sm text-slate-500 mb-2">
											Verified exploit for WebServer X 2.4.5 on Ubuntu 22.04 LTS.
										</p>
										<div className="flex items-center gap-4 text-xs font-medium text-slate-400">
											<span className="flex items-center gap-1">
												<span className="material-symbols-outlined text-[14px]">person</span>{" "}
												user_zero
											</span>
											<span className="flex items-center gap-1">
												<span className="material-symbols-outlined text-[14px]">
													calendar_today
												</span>{" "}
												2 days ago
											</span>
											<span className="flex items-center gap-1 text-primary cursor-pointer hover:underline">
												<span className="material-symbols-outlined text-[14px]">terminal</span> View
												Script
											</span>
										</div>
									</div>
								</div>
								<div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-4 shadow-sm">
									<div className="flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 px-3 rounded-lg min-w-12.5">
										<button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">
											expand_less
										</button>
										<span className="font-bold text-lg">38</span>
										<button className="material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors">
											expand_more
										</button>
									</div>
									<div className="flex-1">
										<h4 className="font-bold mb-1">Clarification on CloudFront bypass</h4>
										<p className="text-sm text-slate-500 mb-2">
											Note that default CloudFront settings might block the specific pipe character
											encoding used in the POC. Check your edge rules.
										</p>
										<div className="flex items-center gap-4 text-xs font-medium text-slate-400">
											<span className="flex items-center gap-1">
												<span className="material-symbols-outlined text-[14px]">person</span>{" "}
												infra_guru
											</span>
											<span className="flex items-center gap-1">
												<span className="material-symbols-outlined text-[14px]">
													calendar_today
												</span>{" "}
												5 hours ago
											</span>
											<span className="flex items-center gap-1 text-primary cursor-pointer hover:underline">
												<span className="material-symbols-outlined text-[14px]">reply</span> Reply
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="mt-6">
								<Link
									href="/pocs/submit"
									className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 font-medium hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
								>
									<span className="material-symbols-outlined">add_circle</span>
									Submit your own analysis or POC
								</Link>
							</div>
						</section>
					</div>
					<div className="xl:col-span-4">
						<div className="infobox bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-xl sticky top-24">
							<div className="bg-primary p-6 text-white text-center">
								<h3 className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">
									CVE IDENTIFIER
								</h3>
								<p className="text-3xl font-black">{cveId}</p>
							</div>
							<div className="p-8 space-y-6">
								<div className="flex flex-col items-center pb-6 border-b border-slate-100 dark:border-slate-800">
									<div className="relative w-32 h-32 flex items-center justify-center">
										<svg className="w-full h-full -rotate-90">
											<circle
												className="text-slate-100 dark:text-slate-800"
												cx="64"
												cy="64"
												fill="transparent"
												r="56"
												stroke="currentColor"
												strokeWidth="8"
											></circle>
											<circle
												className="text-red-500"
												cx="64"
												cy="64"
												fill="transparent"
												r="56"
												stroke="currentColor"
												strokeDasharray="351.8"
												strokeDashoffset="7"
												strokeWidth="8"
											></circle>
										</svg>
										<div className="absolute inset-0 flex flex-col items-center justify-center">
											<span className="text-4xl font-extrabold text-slate-900 dark:text-white">
												9.8
											</span>
											<span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">
												Critical
											</span>
										</div>
									</div>
									<p className="text-xs text-slate-400 mt-4 uppercase font-bold tracking-widest">
										CVSS 3.1 Base Score
									</p>
								</div>
								<div className="space-y-4">
									<div className="flex justify-between items-center text-sm">
										<span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
											<span className="material-symbols-outlined text-[18px]">developer_board</span>{" "}
											Software
										</span>
										<span className="font-bold text-slate-900 dark:text-white">WebServer X</span>
									</div>
									<div className="flex justify-between items-center text-sm">
										<span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
											<span className="material-symbols-outlined text-[18px]">verified</span> Patch
											Status
										</span>
										<span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded text-xs font-bold">
											Patched
										</span>
									</div>
									<div className="flex justify-between items-center text-sm">
										<span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
											<span className="material-symbols-outlined text-[18px]">bug_report</span>{" "}
											Exploitability
										</span>
										<span className="text-red-500 font-bold">Public POC</span>
									</div>
									<div className="flex justify-between items-center text-sm">
										<span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
											<span className="material-symbols-outlined text-[18px]">event</span> Published
										</span>
										<span className="font-medium">Jan 20, 2024</span>
									</div>
									<div className="flex justify-between items-center text-sm">
										<span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
											<span className="material-symbols-outlined text-[18px]">update</span> Modified
										</span>
										<span className="font-medium">2 hours ago</span>
									</div>
								</div>
								<div className="pt-6 border-t border-slate-100 dark:border-slate-800">
									<div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
										<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
											Affected Platforms
										</p>
										<div className="flex flex-wrap gap-2">
											<span className="bg-white dark:bg-slate-700 px-2 py-1 border border-slate-200 dark:border-slate-600 rounded text-[11px] font-semibold">
												CentOS 7/8
											</span>
											<span className="bg-white dark:bg-slate-700 px-2 py-1 border border-slate-200 dark:border-slate-600 rounded text-[11px] font-semibold">
												Ubuntu 20+
											</span>
											<span className="bg-white dark:bg-slate-700 px-2 py-1 border border-slate-200 dark:border-slate-600 rounded text-[11px] font-semibold">
												Debian 11
											</span>
											<span className="bg-white dark:bg-slate-700 px-2 py-1 border border-slate-200 dark:border-slate-600 rounded text-[11px] font-semibold">
												FreeBSD
											</span>
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-2">
									<button className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold rounded-lg transition-all border border-primary/20">
										Request Early Access
									</button>
									<button className="w-full py-3 text-slate-400 hover:text-slate-600 text-xs font-semibold transition-all">
										Report Correction
									</button>
								</div>
							</div>
						</div>
						<div className="mt-8 p-6 bg-slate-900 rounded-xl text-white relative overflow-hidden group shadow-lg">
							<div className="absolute inset-0 bg-linear-to-br from-primary to-transparent opacity-20 pointer-events-none"></div>
							<div className="relative z-1">
								<h4 className="font-bold text-lg mb-2">Nexus Threat Intelligence</h4>
								<p className="text-sm text-slate-400 mb-4">
									Get real-time monitoring of this CVE across your infrastructure.
								</p>
								<button className="text-xs font-bold uppercase tracking-widest text-primary group-hover:underline flex items-center gap-1">
									Learn More{" "}
									<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
								</button>
							</div>
							<div className="absolute -bottom-6 -right-6 text-slate-800 opacity-30 select-none">
								<span className="material-symbols-outlined text-8xl">verified_user</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
