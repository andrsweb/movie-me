"use client"

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { maskTextVariants, maskTransition } from '@/lib/animations';
import clsx from 'clsx'
import s from "./HeroCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { imagesData } from "@/data/data";
import Button from "@/components/Ui/Button/Button";

function HeroCardList({ data, start, end }: { data: typeof imagesData; start: number; end: number }) {
	return data.slice(start, end).map(item => (
		<div key={item.src} className={s.heroCardItem}>
			<Link href="#">
				<Image src={item.src} width={150} height={226} alt="Film cover" />
				<div className={s.itemPrice}><span>Less than ${item.price}</span></div>
			</Link>
		</div>
	))
}

interface HeroCardProps {
	onShowChange?: (isShowed: boolean) => void
}

export default function HeroCard({ onShowChange }: HeroCardProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isShowed, setIsShowed] = useState(false)
	const [showDesc, setShowDesc] = useState(false)
	const [showText, setShowText] = useState(false)
	const prefersReducedMotion = useReducedMotion()

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "start 20vh"]
	})

	const { scrollYProgress: shrinkProgress } = useScroll({
		target: containerRef,
		offset: ["start 20vh", "start -50vh"]
	})

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest >= 1 && !isShowed) {
			setIsShowed(true)
			onShowChange?.(true)
		} else if (latest < 1 && isShowed) {
			setIsShowed(false)
			onShowChange?.(false)
		}
	})

	const cardMaxWidth = useTransform(
		shrinkProgress,
		[0, 1],
		[1240, 912]
	)

	const imgHeight = useTransform(
		shrinkProgress,
		[0, 1],
		[700, 510]
	)

	useMotionValueEvent(shrinkProgress, "change", (latest) => {
		if (latest >= 0.3 && !showDesc) {
			setShowDesc(true)
		} else if (latest < 0.3 && showDesc) {
			setShowDesc(false)
		}

		if (latest >= 0.5 && !showText) {
			setShowText(true)
		} else if (latest < 0.5 && showText) {
			setShowText(false)
		}
	})

	return (
		<div ref={containerRef} className={s.heroCardContainer}>
			<motion.div
				className={clsx(s.heroCard, isShowed && s.showed)}
				style={prefersReducedMotion ? {} : { maxWidth: cardMaxWidth }}
			>
				<div className={s.heroCardInner}>
					<motion.div
						className={s.heroCardImg}
						style={prefersReducedMotion ? {} : { height: imgHeight }}
					>
						<Image src="/img/hero-bg.jpg" width={906} height={514} alt="Hero image"/>
						<motion.div
							className={s.heroCardDesc}
							initial="hidden"
							animate={showDesc ? "visible" : "hidden"}
							variants={prefersReducedMotion ? {} : maskTextVariants}
							transition={prefersReducedMotion ? {} : maskTransition}
						>
							<h2>Hating Game</h2>
							<Button color="violet" type="button">Play <b>Me</b></Button>
						</motion.div>
					</motion.div>
					<motion.div
						className={s.heroCardText}
						initial="hidden"
						animate={showText ? "visible" : "hidden"}
						variants={prefersReducedMotion ? {} : maskTextVariants}
						transition={prefersReducedMotion ? {} : maskTransition}
					>
						<h3>
							MovieMe is the  <em>un-subscription</em>
						</h3>
						<p>
							Handpicked films,
							not an endless scroll.
						</p>
					</motion.div>
					<div className={s.heroCardItems}>
						<HeroCardList data={imagesData} start={0} end={8} />
					</div>
					<div className={s.heroCardItemsText}>
						<h3>
							With MovieMe there are <br/>
							no monthly fees
						</h3>
						<em>
							Just pay when you play.
						</em>
					</div>
					<div className={s.heroCardItems}>
						<HeroCardList data={imagesData} start={8} end={16} />
					</div>
				</div>
			</motion.div>
		</div>
	)
}