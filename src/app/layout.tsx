import React from "react";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import Header from "@/components/Common/Header/Header";
import Footer from "@/components/Common/Footer/Footer";
import "../globals.css";

const instrumentSans = Instrument_Sans({
	variable: "--ff-instrument-sans",
	weight: ["400", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "MovieMe | World's First Pay-Per-Minute Movie Streaming",
	description: "Stream movies your way with MovieMe, the world's first pay-per-minute service. No subscriptions, " +
		"no hidden fees—watch anytime on mobile, web & beyond today!",
};

export default function RootLayout({
	                                   children,
                                   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className={`${instrumentSans.variable}`}>
		<Header/>
		{children}
		<Footer/>
		</body>
		</html>
	);
}
