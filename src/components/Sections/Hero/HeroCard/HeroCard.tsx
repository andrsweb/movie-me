"use client"

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import s from "./HeroCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { imagesData } from "@/data/data";
import Button from "@/components/Ui/Button/Button";
import TrailText from "@/components/Ui/TrailText/TrailText";
import MaskText from "@/components/Ui/MaskText/MaskText";

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
	const cardsRef = useRef<HTMLDivElement>(null)
	const [isShowed, setIsShowed] = useState(false)
	const [showDesc, setShowDesc] = useState(false)
	const [showText, setShowText] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [isFinish, setIsFinish] = useState(false)
	const prefersReducedMotion = useReducedMotion()

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "start 20vh"]
	})

	const { scrollYProgress: shrinkProgress } = useScroll({
		target: containerRef,
		offset: ["start 20vh", "start -300vh"]
	})

	const { scrollYProgress: cardsProgress } = useScroll({
		target: cardsRef,
		offset: ["start end", "start start"]
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

	useMotionValueEvent(cardsProgress, "change", (latest) => {
		if (latest >= 1 && !isExpanded) {
			setIsExpanded(true)
		} else if (latest < 1 && isExpanded) {
			setIsExpanded(false)
		}

		if (latest >= 1 && !isFinish) {
			setIsFinish(true)
		} else if (latest < 1 && isFinish) {
			setIsFinish(false)
		}
	})

	return (
		<div ref={containerRef} className={s.heroCardContainer}>
			<motion.div
				className={clsx(s.heroCard, isShowed && s.showed, isFinish && s.finish, isExpanded && s.expanded)}
			>
				<div className={s.heroCardInner}>
					<motion.div
						className={s.heroCardImg}
						style={prefersReducedMotion ? {} : { height: imgHeight }}
					>
						<Image src="/img/hero-bg.jpg" width={906} height={514} alt="Hero image"/>
						<MaskText show={showDesc} className={s.heroCardDesc}>
							<h2>Hating Game</h2>
							<Button color="violet" type="button">Play <b>Me</b></Button>
						</MaskText>
					</motion.div>
					<MaskText show={showText} className={s.heroCardText}>
						<h3>
							MovieMe is the  <em>un-subscription</em>
						</h3>
						<p>
							Handpicked films,
							not an endless scroll.
						</p>
					</MaskText>
					<div 
						ref={cardsRef} 
						className={s.heroCardItems}
						style={{ overflow: isExpanded ? 'visible' : 'hidden' }}
					>
						<HeroCardList data={imagesData} start={0} end={8} />
					</div>
					<div className={s.heroCardItemsText}>
						<TrailText 
							as="h3" 
							show={isExpanded}
							mode={"hide"}
							className={s.heroCardItemsTextTitle}
							delay={2}
							trailDirection={"left"}
							containerDirection={"bottom"}
						>
							With MovieMe there are <br/>
							no monthly fees
						</TrailText>
						<TrailText 
							as="em"
							show={isExpanded}
							delay={0.5}
							className={s.heroCardItemsTextSubtitle}
							trailDirection={"right"}
							containerDirection={"bottom"}
						>
							Just pay for the <br/> movies you watch.
						</TrailText>
					</div>
					<div 
						className={s.heroCardItems}
						style={{ overflow: isExpanded ? 'visible' : 'hidden' }}
					>
						<HeroCardList data={imagesData} start={8} end={16} />
					</div>
				</div>
			</motion.div>
		</div>
	)
}