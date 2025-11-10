"use client"

import { useState } from 'react'
import clsx from 'clsx'
import Image from "next/image";
import HeroCard from "./HeroCard/HeroCard";
import HeroDesc from "@/components/Sections/Hero/HeroDesc/HeroDesc";
import s from './Hero.module.scss'

export default function Hero() {
	const [isCardShowed, setIsCardShowed] = useState(false)

	return(
			<section className={s.hero}>
				{/* sr-only - global class for screen readers. Just for good SEO and accessibility */}
				<h1 className="sr-only">
					Stream movies your way with MovieMe, the world&#39;s first pay-per-minute service.
					No subscriptions, no hidden fees—watch anytime on mobile, web & beyond today!
				</h1>
				<div className={s.heroWrapper}>
					<div className={clsx(s.heroBg, isCardShowed && s.heroBgHidden)}>
						<Image src="/img/hero-bg.jpg" width={1440} height={785} alt="Hero image" />
					</div>
					<HeroDesc />
				</div>

					<HeroCard onShowChange={setIsCardShowed} />

			</section>
		)
}