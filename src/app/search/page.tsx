import Link from "next/link";

export default function SearchPage() {
	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
			<style
				dangerouslySetInnerHTML={{
					__html: `
                .hit-highlight {
                    background-color: rgba(6, 70, 172, 0.15);
                    font-weight: 600;
                    padding: 0 2px;
                    border-radius: 2px;
                }
            `,
				}}
			/>
			<div className="flex-1 flex justify-center py-8 px-4 sm:px-10 lg:px-20">
				<div className="max-w-[1200px] w-full flex flex-col md:flex-row gap-8">
					<aside className="w-full flex-shrink-0 md:w-48">
						<div className="sticky top-24 flex flex-col gap-8">
							<div>
								<h3 className="text-slate-400 dark:text-slate-500 text-[11px] font-bold mb-4 uppercase tracking-[0.08em] border-b border-slate-200 dark:border-slate-800 pb-1">
									Main
								</h3>
								<nav className="flex flex-col gap-1">
									<Link className="text-sm text-primary font-medium hover:underline py-1" href="/">
										Home
									</Link>
									<Link
										className="text-sm text-primary font-medium hover:underline py-1"
										href="/search"
									>
										CVE Database
									</Link>
									<Link
										className="text-sm text-primary font-medium hover:underline py-1"
										href="/pocs"
									>
										Exploit Library
									</Link>
									<Link
										className="text-sm text-primary font-medium hover:underline py-1"
										href="/threat-feed"
									>
										Threat Feed
									</Link>
								</nav>
							</div>
							<div>
								<h3 className="text-slate-400 dark:text-slate-500 text-[11px] font-bold mb-4 uppercase tracking-[0.08em] border-b border-slate-200 dark:border-slate-800 pb-1">
									Intelligence
								</h3>
								<nav className="flex flex-col gap-1">
									<Link
										className="text-sm text-primary font-medium hover:underline py-1"
										href="/attack-path"
									>
										Attack Path
									</Link>
									<Link
										className="text-sm text-primary font-medium hover:underline py-1"
										href="/quickscan"
									>
										Vulnerability Predictor
									</Link>
									<Link
										className="text-sm text-primary font-medium hover:underline py-1"
										href="/assistant"
									>
										Pentester Assistant
									</Link>
								</nav>
							</div>
							<div>
								<h3 className="text-slate-400 dark:text-slate-500 text-[11px] font-bold mb-4 uppercase tracking-[0.08em] border-b border-slate-200 dark:border-slate-800 pb-1">
									Community
								</h3>
								<nav className="flex flex-col gap-1">
									<Link className="text-sm text-primary font-medium hover:underline py-1" href="#">
										Recent Changes
									</Link>
									<Link
										className="text-sm text-primary font-medium hover:underline py-1"
										href="/contributors"
									>
										Contributors
									</Link>
									<Link
										className="text-sm text-primary font-medium hover:underline py-1"
										href="/pocs/submit"
									>
										Submit POC
									</Link>
								</nav>
							</div>
						</div>
					</aside>
					<div className="flex-1 flex flex-col min-w-0">
						<div className="mb-6">
							<h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
								Search Results for &lsquo;<span className="text-primary">Apache Struts</span>&rsquo;
							</h1>
							<p className="text-slate-500 dark:text-slate-400 text-sm">
								About 342 results found (0.24 seconds)
							</p>
						</div>
						<div className="border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
							<div className="flex gap-8 whitespace-nowrap min-w-max">
								<a
									className="flex flex-col items-center justify-center border-b-2 border-primary text-primary pb-3 pt-2"
									href="#"
								>
									<p className="text-sm font-bold leading-normal tracking-[0.015em]">All (342)</p>
								</a>
								<a
									className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 hover:text-slate-900 dark:hover:text-slate-100"
									href="#"
								>
									<p className="text-sm font-bold leading-normal tracking-[0.015em]">CVEs (210)</p>
								</a>
								<a
									className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 hover:text-slate-900 dark:hover:text-slate-100"
									href="#"
								>
									<p className="text-sm font-bold leading-normal tracking-[0.015em]">
										Exploits (45)
									</p>
								</a>
								<a
									className="flex flex-col items-center justify-center border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 hover:text-slate-900 dark:hover:text-slate-100"
									href="#"
								>
									<p className="text-sm font-bold leading-normal tracking-[0.015em]">
										Articles (87)
									</p>
								</a>
							</div>
						</div>
						<div className="space-y-10">
							<article className="flex flex-col gap-2">
								<div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
									<span>CVE-2023-50164</span>
									<span>•</span>
									<span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold border border-red-200 dark:border-red-800">
										CRITICAL 9.8
									</span>
									<span>•</span>
									<span>Dec 7, 2023</span>
								</div>
								<h3 className="text-xl font-semibold">
									<Link className="text-primary hover:underline" href="/cves/CVE-2023-50164">
										<span className="hit-highlight">Apache Struts</span> RCE: File Upload
										Vulnerability in Parameters Handling
									</Link>
								</h3>
								<p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-3">
									An attacker can manipulate file upload parameters to enable path traversal and
									under some circumstances this can be used to upload a malicious file which can
									lead to Remote Code Execution (RCE). Affected versions of{" "}
									<span className="hit-highlight">Apache Struts</span> include 2.0.0 through 2.3.37,
									2.5.0 through 2.5.32, and 6.0.0 through 6.3.0.
								</p>
								<div className="flex gap-4 mt-1">
									<a
										className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1"
										href="#"
									>
										<span className="material-symbols-outlined text-[14px]">link</span> Reference
										URL
									</a>
									<a
										className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1"
										href="#"
									>
										<span className="material-symbols-outlined text-[14px]">terminal</span> Exploit
										Available
									</a>
								</div>
							</article>
							<article className="flex flex-col gap-2">
								<div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
									<span>ARTICLE</span>
									<span>•</span>
									<span>Jan 15, 2024</span>
									<span>•</span>
									<span>Security Lab</span>
								</div>
								<h3 className="text-xl font-semibold">
									<a className="text-primary hover:underline" href="#">
										Deep Dive: Understanding the{" "}
										<span className="hit-highlight">Apache Struts</span> OGNL Injection Chain
									</a>
								</h3>
								<p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-3">
									This technical analysis explores how{" "}
									<span className="hit-highlight">Apache Struts</span> handles Object-Graph
									Navigation Language (OGNL) expressions and why this component has historically
									been a frequent target for remote execution exploits. We examine the latest
									patches released in January 2024 for the 6.x branch.
								</p>
								<div className="flex gap-4 mt-1">
									<a
										className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1"
										href="#"
									>
										<span className="material-symbols-outlined text-[14px]">menu_book</span> 12 min
										read
									</a>
								</div>
							</article>
							<article className="flex flex-col gap-2">
								<div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
									<span>CVE-2021-31805</span>
									<span>•</span>
									<span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-bold border border-orange-200 dark:border-orange-800">
										HIGH 8.1
									</span>
									<span>•</span>
									<span>Apr 12, 2022</span>
								</div>
								<h3 className="text-xl font-semibold">
									<Link className="text-primary hover:underline" href="/cves/CVE-2021-31805">
										S2-062: <span className="hit-highlight">Apache Struts</span> 2.0.0 through
										2.5.29 Double Evaluation RCE
									</Link>
								</h3>
								<p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-3">
									Forced double evaluation occurs when{" "}
									<span className="hit-highlight">Apache Struts</span> 2 tag attributes are
									evaluated twice based on certain user-controlled inputs. An attacker could provide
									a malicious expression which, when evaluated the second time, leads to arbitrary
									code execution on the server.
								</p>
								<div className="flex gap-4 mt-1">
									<a
										className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1"
										href="#"
									>
										<span className="material-symbols-outlined text-[14px]">bug_report</span>{" "}
										Vulnerability Database
									</a>
								</div>
							</article>
							<article className="flex flex-col gap-2">
								<div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
									<span>EXPLOIT-DB</span>
									<span>•</span>
									<span>ID: 51234</span>
									<span>•</span>
									<span>Nov 30, 2023</span>
								</div>
								<h3 className="text-xl font-semibold">
									<a className="text-primary hover:underline" href="#">
										PoC: Python-based RCE for <span className="hit-highlight">Apache Struts</span>{" "}
										Multi-Part Request Parser
									</a>
								</h3>
								<p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-3">
									A functional Python script demonstrating the exploitation of CVE-2023-50164. The
									exploit leverages a path traversal flaw in the file upload mechanism of{" "}
									<span className="hit-highlight">Apache Struts</span> 6.3.0. For educational and
									authorized testing purposes only.
								</p>
								<div className="flex gap-4 mt-1">
									<a
										className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1"
										href="#"
									>
										<span className="material-symbols-outlined text-[14px]">verified_user</span>{" "}
										Verified Exploit
									</a>
									<a
										className="text-xs font-semibold text-slate-500 hover:text-primary flex items-center gap-1"
										href="#"
									>
										<span className="material-symbols-outlined text-[14px]">download</span> Download
										Payload
									</a>
								</div>
							</article>
							<article className="flex flex-col gap-2">
								<div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
									<span>CVE-2019-0230</span>
									<span>•</span>
									<span className="px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-bold border border-yellow-200 dark:border-yellow-800">
										MEDIUM 6.5
									</span>
									<span>•</span>
									<span>Aug 13, 2020</span>
								</div>
								<h3 className="text-xl font-semibold">
									<Link className="text-primary hover:underline" href="/cves/CVE-2019-0230">
										<span className="hit-highlight">Apache Struts</span> 2.0.0 to 2.5.20 OGNL
										Sandboxing Bypass
									</Link>
								</h3>
								<p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-3">
									A potential vulnerability was identified in{" "}
									<span className="hit-highlight">Apache Struts</span> where certain OGNL
									expressions could bypass the sandbox under specific configurations. This requires
									the &ldquo;struts.ognl.enableExpressionCache&rdquo; property to be set to false.
								</p>
							</article>
						</div>
						<div className="mt-16 flex items-center justify-center gap-2">
							<button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
								<span className="material-symbols-outlined">chevron_left</span>
							</button>
							<button className="flex items-center justify-center w-10 h-10 rounded bg-primary text-white font-bold">
								1
							</button>
							<button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
								2
							</button>
							<button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
								3
							</button>
							<button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
								4
							</button>
							<span className="px-2 text-slate-400">...</span>
							<button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
								35
							</button>
							<button className="flex items-center justify-center w-10 h-10 rounded border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
								<span className="material-symbols-outlined">chevron_right</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
