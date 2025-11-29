"use client"

import HeroCard from "./HeroCard/HeroCard";

export default function Hero() {
	return (
		<section className="relative z-[50] w-full bg-[var(--color-dark)]">
			<h1 className="sr-only">
				Stream movies your way with MovieMe, the world&#39;s first pay-per-minute service.
				No subscriptions, no hidden fees—watch anytime on mobile, web & beyond today!
			</h1>
			<div className="relative mx-auto flex h-full w-full flex-col items-start justify-end">
				<HeroCard />
			</div>
		</section>
	)
}