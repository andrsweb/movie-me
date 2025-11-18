"use client"

import HeroCard from "./HeroCard/HeroCard";
import s from './Hero.module.scss'

export default function Hero() {
	return(
			<section className={s.hero}>
				<h1 className="sr-only">
					Stream movies your way with MovieMe, the world&#39;s first pay-per-minute service.
					No subscriptions, no hidden fees—watch anytime on mobile, web & beyond today!
				</h1>
				<div className={s.heroWrapper}>
					<HeroCard />
				</div>
			</section>
		)
}