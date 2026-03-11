import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "VulnExus — AI Vulnerability Research Platform",
	description:
		"AI-powered CVE research, pentester assistant, attack path generation, and vulnerability intelligence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className={inter.className}>
				<div className="flex min-h-screen">
					<Sidebar />
					<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
						<Header />
						<main className="flex-1 flex flex-col overflow-hidden">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
