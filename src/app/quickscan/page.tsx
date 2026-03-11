export default function QuickscanPage() {
	return (
		<div className="flex-1 overflow-y-auto bg-slate-50 text-slate-800">
			<main className="p-8">
				<div className="max-w-5xl mx-auto space-y-8">
					<div>
						<h1 className="text-3xl font-bold text-slate-900 mb-2">Vulnerability Predictor</h1>
						<p className="text-slate-500 text-lg">
							AI-driven static and dynamic analysis to predict potential security flaws in your
							source code.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
									<span className="material-symbols-outlined text-sm">upload_file</span>
								</div>
								<h2 className="text-lg font-bold text-slate-800">Upload File/Folder</h2>
							</div>
							<div className="border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 flex flex-col items-center justify-center py-12 text-center transition-colors hover:bg-slate-100 hover:border-slate-300 cursor-pointer">
								<span className="material-symbols-outlined text-3xl text-slate-400 mb-3">
									cloud_upload
								</span>
								<p className="text-slate-600 text-sm">Drag &amp; drop source code or</p>
								<p className="text-blue-600 font-semibold text-sm">Browse files</p>
							</div>
						</div>
						<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
									<span className="material-symbols-outlined text-sm">terminal</span>
								</div>
								<h2 className="text-lg font-bold text-slate-800">Import from GitHub Repository</h2>
							</div>
							<div className="space-y-4">
								<div>
									<label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
										Repository URL
									</label>
									<input
										className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
										placeholder="https://github.com/username/repo"
										type="text"
									/>
								</div>
								<div className="flex gap-3">
									<div className="flex-1">
										<input
											className="w-full bg-slate-50 border border-slate-200 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
											placeholder="Branch (e.g. main)"
											type="text"
										/>
									</div>
									<button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors">
										Connect
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="flex justify-center pt-2">
						<button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium text-lg flex items-center gap-2 shadow-md transition-transform active:scale-95">
							<span className="material-symbols-outlined">my_location</span>
							Scan for Vulnerabilities
						</button>
					</div>
					<hr className="border-slate-200 my-8" />
					<div>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
								<div className="w-6 h-6 bg-blue-800 rounded text-white flex items-center justify-center">
									<span className="material-symbols-outlined text-xs">bar_chart</span>
								</div>
								Prediction Results:{" "}
								<span className="text-slate-400 font-normal">auth-service-main</span>
							</h2>
							<span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
								Scan Complete
							</span>
						</div>
						<div className="space-y-4">
							<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
								<div className="flex justify-between items-start mb-4">
									<div>
										<div className="flex items-center gap-3 mb-1">
											<h3 className="text-xl font-bold text-slate-900">SQL Injection</h3>
											<span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded uppercase">
												Critical
											</span>
										</div>
										<div className="flex items-center text-slate-500 text-sm gap-2 font-mono bg-slate-50 px-2 py-1 rounded">
											<span className="material-symbols-outlined text-sm">code</span>{" "}
											src/api/auth.js:142
										</div>
									</div>
									<div className="text-right">
										<p className="text-xs font-semibold text-slate-500 uppercase mb-1">
											Confidence Score
										</p>
										<div className="flex items-center gap-3">
											<div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
												<div className="h-full bg-red-500" style={{ width: "94%" }}></div>
											</div>
											<span className="font-bold text-slate-800">94%</span>
										</div>
									</div>
								</div>
								<div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-md mb-4">
									<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
										Context &amp; Reasoning
									</p>
									<p className="text-slate-700 italic text-sm">
										&ldquo;User input from &apos;req.body.username&apos; is directly concatenated
										into the SQL query without proper sanitization or parameterized inputs. Patterns
										match known unsanitized sink vulnerabilities.&rdquo;
									</p>
								</div>
								<div className="flex items-center text-sm">
									<span className="text-slate-400 font-semibold mr-2 uppercase text-xs">
										Related:
									</span>
									<div className="flex gap-3">
										<a className="text-blue-600 hover:underline" href="#">
											CVE-2023-4451
										</a>
										<a className="text-blue-600 hover:underline" href="#">
											CWE-89
										</a>
										<a className="text-blue-600 hover:underline" href="#">
											OWASP-A03:2021
										</a>
									</div>
								</div>
							</div>
							<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
								<div className="flex justify-between items-start mb-4">
									<div>
										<div className="flex items-center gap-3 mb-1">
											<h3 className="text-xl font-bold text-slate-900">Insecure Dependency</h3>
											<span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded uppercase">
												Medium
											</span>
										</div>
										<div className="flex items-center text-slate-500 text-sm gap-2 font-mono bg-slate-50 px-2 py-1 rounded">
											<span className="material-symbols-outlined text-sm">inventory_2</span>{" "}
											package.json:28
										</div>
									</div>
									<div className="text-right">
										<p className="text-xs font-semibold text-slate-500 uppercase mb-1">
											Confidence Score
										</p>
										<div className="flex items-center gap-3">
											<div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
												<div className="h-full bg-amber-500" style={{ width: "78%" }}></div>
											</div>
											<span className="font-bold text-slate-800">78%</span>
										</div>
									</div>
								</div>
								<div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-md mb-4">
									<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
										Context &amp; Reasoning
									</p>
									<p className="text-slate-700 italic text-sm">
										&ldquo;Package &apos;lodash&apos; version 4.17.20 contains multiple known
										vulnerabilities including Prototype Pollution. Update to 4.17.21 or
										higher.&rdquo;
									</p>
								</div>
								<div className="flex items-center text-sm">
									<span className="text-slate-400 font-semibold mr-2 uppercase text-xs">
										Related:
									</span>
									<div className="flex gap-3">
										<a className="text-blue-600 hover:underline" href="#">
											CVE-2020-8203
										</a>
										<a className="text-blue-600 hover:underline" href="#">
											CVE-2021-23337
										</a>
									</div>
								</div>
							</div>
							<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
								<div className="flex justify-between items-start mb-4">
									<div>
										<div className="flex items-center gap-3 mb-1">
											<h3 className="text-xl font-bold text-slate-900">
												Potential Buffer Overflow
											</h3>
											<span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded uppercase">
												Low/Info
											</span>
										</div>
										<div className="flex items-center text-slate-500 text-sm gap-2 font-mono bg-slate-50 px-2 py-1 rounded">
											<span className="material-symbols-outlined text-sm">code</span>{" "}
											native/utils.c:84
										</div>
									</div>
									<div className="text-right">
										<p className="text-xs font-semibold text-slate-500 uppercase mb-1">
											Confidence Score
										</p>
										<div className="flex items-center gap-3">
											<div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
												<div className="h-full bg-blue-500" style={{ width: "42%" }}></div>
											</div>
											<span className="font-bold text-slate-800">42%</span>
										</div>
									</div>
								</div>
								<div className="bg-slate-50 border-l-4 border-slate-300 p-4 rounded-r-md mb-4">
									<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
										Context &amp; Reasoning
									</p>
									<p className="text-slate-700 italic text-sm">
										&ldquo;Use of &apos;strcpy&apos; detected. While the destination buffer size
										seems managed, &apos;strncpy&apos; or &apos;strlcpy&apos; is recommended for
										safer memory handling.&rdquo;
									</p>
								</div>
								<div className="flex items-center text-sm">
									<span className="text-slate-400 font-semibold mr-2 uppercase text-xs">
										Related:
									</span>
									<div className="flex gap-3">
										<a className="text-blue-600 hover:underline" href="#">
											Best Practices
										</a>
										<a className="text-blue-600 hover:underline" href="#">
											CWE-120
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
