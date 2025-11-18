"use client"

import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react'

import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'

import clsx from 'clsx'
import type { Movie } from '@/types/movie'
import { fetchMovies } from '@/lib/api/movies'
import s from "./HeroCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Ui/Button/Button";
import HeroDesc from "@/components/Sections/Hero/HeroDesc/HeroDesc";
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

export default function HeroCard() {
	const containerRef = useRef<HTMLDivElement>(null)
	const heroBgRef = useRef<HTMLDivElement>(null)
	const cardsRef = useRef<HTMLDivElement>(null)
	const [isStart, setIsStart] = useState(false)
	const [showDesc, setShowDesc] = useState(false)
	const [showText, setShowText] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [isFinish, setIsFinish] = useState(false)
	const [movies, setMovies] = useState<Movie[]>([])
	const imgBlockRef = useRef<HTMLDivElement | null>(null)
	const [imgScaleX, setImgScaleX] = useState(1)

	const prefersReducedMotion = useReducedMotion()

	useEffect(() => {
		const loadMovies = async () => {
			const data = await fetchMovies(48)
			setMovies(data)
		}
		void loadMovies()
	}, [])

	useEffect(() => {
		if (!imgBlockRef.current) return

		const targetWidth = imgBlockRef.current.offsetWidth
		const fullWidth = window.innerWidth

		if (targetWidth === 0) return

		const scale = fullWidth / targetWidth
		setImgScaleX(scale)
	}, [])

	const { scrollYProgress: shrinkProgress } = useScroll({
		target: containerRef,
		offset: ["start 20vh", "end end"]
	})

	const { scrollYProgress: cardsProgress } = useScroll({
		target: cardsRef,
		offset: ["start end", "start center"]
	})

	const { scrollY } = useScroll()

	useLayoutEffect(() => {
		if (window.scrollY > 0 && heroBgRef.current) {
			heroBgRef.current.classList.add(s.heroCardBgHidden)
		}
	}, [])

	const handleScrollEffects = useCallback(() => {
		const shrinkValue = shrinkProgress.get()
		const cardsValue = cardsProgress.get()

		if (shrinkValue >= 0.3 && !showDesc) {
			setShowDesc(true)
		} else if (shrinkValue < 0.3 && showDesc) {
			setShowDesc(false)
		}

		if (shrinkValue >= 0.5 && !showText) {
			setShowText(true)
		} else if (shrinkValue < 0.5 && showText) {
			setShowText(false)
		}

		if (cardsValue >= 1 && !isExpanded) {
			setIsExpanded(true)
		} else if (cardsValue < 1 && isExpanded) {
			setIsExpanded(false)
		}

		if (cardsValue >= 1 && !isFinish) {
			setIsFinish(true)
		} else if (cardsValue < 1 && isFinish) {
			setIsFinish(false)
		}
	}, [shrinkProgress, cardsProgress, showDesc, showText, isExpanded, isFinish])

	useMotionValueEvent(shrinkProgress, "change", handleScrollEffects)

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest === 0) {
			setIsStart(false)
		} else {
			setIsStart(true)
		}
	})

	const cardsTranslateX1 = useTransform(
		shrinkProgress,
		[0, 1],
		[0, 300]
	)

	const cardsTranslateX2 = useTransform(
		shrinkProgress,
		[0, 1],
		[0, 400]
	)

	return (
		<div ref={containerRef} className={s.heroCardContainer}>
			<motion.div
				ref={heroBgRef}
				className={clsx(s.heroCardBg, isExpanded && s.heroCardBgHidden)}
			>
				<Image
					src="/img/hero-bg.png"
					width={1440}
					height={785}
					alt="Hero image"
				/>
			</motion.div>
			<HeroDesc />
			<motion.div
				className={clsx(
					s.heroCard,
					isStart && s.heroCardStart,
					isFinish && s.finish,
					isExpanded && s.expanded
				)}
			>
				<motion.div
					ref={imgBlockRef}
					className={s.heroCardImg}
					style={prefersReducedMotion ? {} : {
						transform: `scaleX(${isStart ? 1 : imgScaleX})`,
						transformOrigin: 'center center',
					}}
				>
					<Image src="/img/hero-bg.jpg" width={906} height={514} alt="Hero image"/>
					<MaskText show={showDesc} className={s.heroCardDescD}>
						<h2>Hating Game</h2>
						<Button color="violet" type="button">Play <b>Me</b></Button>
					</MaskText>
				</motion.div>
				<div className={s.heroCardInner}>
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
						<MaskText 
							as="h3" 
							show={isExpanded}
							className={s.heroCardItemsTextTitle}
						>
							With MovieMe there are <br/>
							<span>
								no monthly fees
							</span>
						</MaskText>
						<MaskText 
							as="h3"
							show={isExpanded}
							className={s.heroCardItemsTextSubtitle}
							delay={1}
						>
							<br/>
							<em>
								Just pay for the
							</em>
							<br/>
							<em>
								movies you watch.
							</em>
						</MaskText>
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