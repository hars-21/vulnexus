"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			setError("Please fill in all fields.");
			return;
		}
		setError("");
		setLoading(true);
		// Simulate login — replace with real auth call
		setTimeout(() => {
			setLoading(false);
			setError("Invalid credentials. (Demo: use any email + password)");
		}, 1500);
	};

	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-display flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				{/* Logo mark */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
						<span className="material-symbols-outlined text-white text-3xl">shield</span>
					</div>
					<h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Welcome back</h1>
					<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
						Sign in to your VulnNexus account
					</p>
				</div>

				<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
					{error && (
						<div className="mb-5 flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
							<span className="material-symbols-outlined text-[18px]">error</span>
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
								Email address
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
							/>
						</div>
						<div>
							<div className="flex items-center justify-between mb-1.5">
								<label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
									Password
								</label>
								<a href="#" className="text-xs text-primary hover:underline font-medium">
									Forgot password?
								</a>
							</div>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
							/>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
						>
							{loading ? (
								<>
									<svg
										className="animate-spin h-4 w-4 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
										></path>
									</svg>
									Signing in...
								</>
							) : (
								<>
									<span className="material-symbols-outlined text-[18px]">login</span>
									Sign In
								</>
							)}
						</button>
					</form>

					<div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
						<p className="text-sm text-slate-500 dark:text-slate-400">
							Don&apos;t have an account?{" "}
							<Link href="/register" className="text-primary font-semibold hover:underline">
								Create one
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
