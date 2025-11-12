"use client"

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import clsx from 'clsx'
import type { Movie } from '@/types/movie'
import { fetchMovies } from '@/lib/api/movies'
import s from "./HeroCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Ui/Button/Button";
import TrailText from "@/components/Ui/TrailText/TrailText";
import MaskText from "@/components/Ui/MaskText/MaskText";

function HeroCardList({ data, start, end }: { data: Movie[]; start: number; end: number }) {
	return data.slice(start, end).map(item => (
		<div key={item.id} className={s.heroCardItem}>
			<Link href={`/movie/${item.id}`}>
				<Image src={item.src} width={150} height={226} alt={item.title} />
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
	const [movies, setMovies] = useState<Movie[]>([])
	const prefersReducedMotion = useReducedMotion()

	useEffect(() => {
		const loadMovies = async () => {
			const data = await fetchMovies(48)
			setMovies(data)
		}
		void loadMovies()
	}, [])

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "start 20vh"]
	})

	const { scrollYProgress: shrinkProgress } = useScroll({
		target: containerRef,
		offset: ["start 20vh", "end end"]
	})

	const { scrollYProgress: cardsProgress } = useScroll({
		target: cardsRef,
		offset: ["start end", "start center"]
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

	const cardsTranslateX1 = useTransform(
		shrinkProgress,
		[0, 1],
		[0, -300]
	)

	const cardsTranslateX2 = useTransform(
		shrinkProgress,
		[0, 1],
		[0, 400]
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
						<MaskText show={showDesc} className={s.heroCardDescD}>
							<h2>Hating Game</h2>
							<Button color="violet" type="button">Play <b>Me</b></Button>
						</MaskText>
					</motion.div>
					<MaskText show={showDesc} className={s.heroCardDescM}>
						<h2>Hating Game</h2>
						<Button color="violet" type="button">Play <b>Me</b></Button>
					</MaskText>
					<MaskText show={showText} className={s.heroCardText}>
						<h3>
							MovieMe is the  <em>un-subscription</em>
						</h3>
						<p>
							Handpicked films,
							not an endless scroll.
						</p>
					</MaskText>
					<motion.div 
						ref={cardsRef} 
						className={s.heroCardItems}
						style={{ 
							x: cardsTranslateX1
						}}
						animate={{
							x: isExpanded ? undefined : 0
						}}
						transition={{ type: "spring", stiffness: 80, damping: 20 }}
					>
						{movies.length > 0 && <HeroCardList data={movies} start={0} end={24} />}
					</motion.div>
					<motion.div 
						className={s.heroCardItemsText}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "0px 0px -200px 0px" }}
						transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
					>
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
					</motion.div>
					<motion.div 
						className={s.heroCardItems}
						style={{ 
							x: cardsTranslateX2
						}}
						animate={{
							x: isExpanded ? undefined : 0
						}}
						transition={{ type: "spring", stiffness: 80, damping: 20 }}
					>
						{movies.length > 0 && <HeroCardList data={movies} start={24} end={48} />}
					</motion.div>
				</div>
			</motion.div>
		</div>
	)
}