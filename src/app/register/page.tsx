"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
	const [form, setForm] = useState({
		username: "",
		email: "",
		password: "",
		confirm: "",
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.username || !form.email || !form.password || !form.confirm) {
			setError("Please fill in all fields.");
			return;
		}
		if (form.password !== form.confirm) {
			setError("Passwords do not match.");
			return;
		}
		if (form.password.length < 8) {
			setError("Password must be at least 8 characters.");
			return;
		}
		setError("");
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
		}, 1500);
	};

	if (success) {
		return (
			<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-display flex items-center justify-center p-6">
				<div className="text-center max-w-sm">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
						<span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
							check_circle
						</span>
					</div>
					<h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
						Account Created!
					</h2>
					<p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
						Welcome to VulnNexus, <strong>{form.username}</strong>. Your account is ready.
					</p>
					<Link
						href="/login"
						className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
					>
						<span className="material-symbols-outlined text-[18px]">login</span>
						Sign In
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark font-display flex items-center justify-center p-6">
			<div className="w-full max-w-md">
				{/* Logo mark */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
						<span className="material-symbols-outlined text-white text-3xl">shield</span>
					</div>
					<h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
						Create your account
					</h1>
					<p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
						Join VulnNexus and contribute to the community
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
								Username
							</label>
							<input
								type="text"
								name="username"
								value={form.username}
								onChange={handleChange}
								placeholder="sec_researcher"
								className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
							/>
						</div>
						<div>
							<label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
								Email address
							</label>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								placeholder="you@example.com"
								className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
							/>
						</div>
						<div>
							<label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
								Password
							</label>
							<input
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								placeholder="At least 8 characters"
								className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
							/>
						</div>
						<div>
							<label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
								Confirm Password
							</label>
							<input
								type="password"
								name="confirm"
								value={form.confirm}
								onChange={handleChange}
								placeholder="Repeat password"
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
									Creating account...
								</>
							) : (
								<>
									<span className="material-symbols-outlined text-[18px]">person_add</span>
									Create Account
								</>
							)}
						</button>
					</form>

					<div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
						<p className="text-sm text-slate-500 dark:text-slate-400">
							Already have an account?{" "}
							<Link href="/login" className="text-primary font-semibold hover:underline">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
