"use client"

import { useRef, useState, useEffect, useLayoutEffect, useMemo, useCallback } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, Variants } from "framer-motion"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import Track from "@/components/Ui/Track/Track"
import { fetchMovies } from "@/lib/api/movies"
import type { Movie } from "@/types/movie"
import s from './MoviePreview.module.scss'

export default function MoviePreview() {
	const containerRef = useRef<HTMLDivElement>(null)
	const sectionRef = useRef<HTMLElement>(null)
	const secondRowRef = useRef<HTMLDivElement>(null)
	const mergedCardRef = useRef<HTMLDivElement>(null)

	const [isShowed, setIsShowed] = useState(false)
	const [isFinish, setIsFinish] = useState(false)
	const [isMerged, setIsMerged] = useState(false)
	const [mergedState, setMergedState] = useState(1)
	const [movies, setMovies] = useState<Movie[]>([])
	const cardRefs = useRef<(HTMLDivElement | null)[]>([])
	const moviesToShow = useMemo(() => movies.slice(24, 48), [movies])
	const [enableWrapperShift, setEnableWrapperShift] = useState(false)
	const [cardMergeOffsets, setCardMergeOffsets] = useState<{ x: number; y: number }[]>([])
	const [mergedCardBegin, setMergedCardBegin] = useState(false)
	const scrollProgressRef = useRef(0)

	const updateCardMergeOffsets = useCallback(() => {
		if (!secondRowRef.current) {
			return
		}

		const containerRect = secondRowRef.current.getBoundingClientRect()
		const containerCenterX = containerRect.left + containerRect.width / 2
		const containerCenterY = containerRect.top + containerRect.height / 2

		const offsets = cardRefs.current.map((cardEl) => {
			if (!cardEl) {
				return { x: 0, y: 0 }
			}
			const cardRect = cardEl.getBoundingClientRect()
			const cardCenterX = cardRect.left + cardRect.width / 2
			const cardCenterY = cardRect.top + cardRect.height / 2

			return {
				x: containerCenterX - cardCenterX,
				y: containerCenterY - cardCenterY,
			}
		})

		setCardMergeOffsets(offsets)
	}, [])

	useEffect(() => {
		cardRefs.current = Array(moviesToShow.length).fill(null)
	}, [moviesToShow.length])

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | null = null

		if (isMerged) {
			timer = setTimeout(() => {
				setMergedCardBegin(true)
			}, 1200)
		} else {
			Promise.resolve().then(() => setMergedCardBegin(false))
		}

		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [isMerged])

	useEffect(() => {
		const loadMovies = async () => {
			const data = await fetchMovies(48)
			setMovies(data)
		}
		void loadMovies()
	}, [])

	useEffect(() => {
		const breakpoint = window.matchMedia('(max-width: 768px)')
		const update = (event?: MediaQueryListEvent | MediaQueryList) => {
			setEnableWrapperShift(event ? event.matches : breakpoint.matches)
		}

		update(breakpoint)

		if (typeof breakpoint.addEventListener === 'function') {
			breakpoint.addEventListener('change', update)
			return () => breakpoint.removeEventListener('change', update)
		}

		breakpoint.onchange = update
		return () => {
			breakpoint.onchange = null
		}
	}, [])

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "start 20vh"]
	})

	const { scrollYProgress: shrinkProgress } = useScroll({
		target: containerRef,
		offset: ["start 20vh", "end end"]
	})

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		scrollProgressRef.current = latest

		if (latest >= 1 && !isShowed) {
			setIsShowed(true)
		} else if (latest < 1 && isShowed) {
			setIsShowed(false)
		}

		if (latest >= 0.85 && latest < 0.9 && !isMerged && secondRowRef.current && moviesToShow.length > 0) {
			requestAnimationFrame(() => {
				updateCardMergeOffsets()
			})
		}

		if (latest >= 0.9) {
			if (!isFinish) setIsFinish(true)
			if (!isMerged) {
				setIsMerged(true)
			}
		} else {
			if (isFinish) setIsFinish(false)
			if (isMerged) {
				setIsMerged(false)
			}
		}
	})

	useEffect(() => {
		if (moviesToShow.length === 0) {
			return
		}

		const latest = scrollProgressRef.current

		if (latest >= 0.85 && latest < 0.9 && !isMerged && secondRowRef.current) {
			requestAnimationFrame(() => {
				updateCardMergeOffsets()
			})
		}
	}, [moviesToShow.length, isMerged, updateCardMergeOffsets])

	const cardsContainerY = useTransform(shrinkProgress, [0, 1], [0, 0])
	const cardsOpacity = useTransform(shrinkProgress, [0.5, 0.7], [1, 0])
	const trackOpacity = useTransform(shrinkProgress, [0.6, 0.9], [0, 1])
	const mergedCardRotateY = useTransform(shrinkProgress, [0.2, 0.55], [0, 180])
	const mergedCardScale = useTransform(shrinkProgress, [0.55, 0.95], [1, 4.5])

	useMotionValueEvent(shrinkProgress, "change", (latest) => {
		let nextState = 1
		if (latest >= 0.55 && latest < 0.6) {
			nextState = 2
		} else if (latest >= 0.6) {
			nextState = 3
		}

		if (nextState !== mergedState) {
			setMergedState(nextState)
		}
	})

	const wrapperOpacity = mergedState >= 2 ? trackOpacity : 0
	const wrapperOffsetY = useTransform(shrinkProgress, [0.6, 1], [0, 120])

	return (
		<div ref={containerRef} className={s.moviePreviewContainer}>
			<motion.section
				ref={sectionRef}
				className={clsx(s.moviePreview, isShowed && s.showed, isFinish && s.finish)}
			>
				<div className={s.secondRowCards}>
					<motion.div
						ref={secondRowRef}
						className={s.secondRowCardsInner}
						style={{ y: cardsContainerY, opacity: mergedState >= 2 ? cardsOpacity : 1 }}
					>
					{moviesToShow.map((item, i) => {
						const offset = cardMergeOffsets[i] || { x: 0, y: 0 };
						
						return (
							<motion.div
								key={item.id}
								ref={el => { cardRefs.current[i] = el }}
								className={s.secondRowCard}
								animate={isMerged ? {
									x: offset.x,
									y: offset.y,
									opacity: 0,
									zIndex: -1
								} : {
									x: 0,
									y: 0,
									opacity: 1,
									zIndex: 1
								}}
								transition={isMerged ? {
									x: {
										type: "spring",
										stiffness: 150,
										damping: 30,
										delay: i * 0.02
									},
									y: {
										type: "spring",
										stiffness: 150,
										damping: 30,
										delay: i * 0.02
									},
									opacity: {
										duration: 0.2,
										delay: i * 0.02 + 0.8
									},
									zIndex: {
										delay: i * 0.02 + 0.4
									}
								} : {
									type: "spring",
									stiffness: 300,
									damping: 30
								}}
							>
								<Link href={`/movie/${item.id}`}>
									<Image src={item.src} width={150} height={226} alt={item.title} />
									<div className={s.secondRowCardPrice}><span>Less than ${item.price}</span></div>
								</Link>
							</motion.div>
						)
					})}
						<motion.div
							className={clsx(
								s.mergedCardWrapper,
								mergedState === 1 && s.state1,
								mergedState === 2 && s.state2,
								mergedState === 3 && s.state3,
								mergedCardBegin && s.begin
							)}
							ref={mergedCardRef}
							animate={{
								opacity: isMerged ? 1 : 0
							}}
							transition={{
								duration: 0.6,
								ease: "easeInOut",
								delay: isMerged ? moviesToShow.length * 0.02 + 0.1 : 0
							}}
						>
							<motion.div
								className={s.mergedCard}
								style={{ rotateY: mergedCardRotateY, scale: mergedCardScale }}
							>
								<div className={s.mergedCardFront}>
									{movies.length > 0 && (
										<Image src={movies[6].src} width={150} height={226} alt="Front" />
									)}
								</div>
								<div className={s.mergedCardBack}>
									<Image className={s.state} src="/img/svg/state1.svg" width={150} height={226} alt="Back" />
								</div>
								<div className={s.stateImage}>
									<div className={s.stateItem}>
										<Image className={s.keyb} src="/img/svg/keyb.svg" width={382} height={11} alt="Vector keyboard" />
										<Image className={s.logo} src="/img/svg/logo-sm.svg" width={50} height={50} alt="Small movie-me vector logo" />
									</div>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>

				<motion.div
					className={s.moviePreviewWrapper}
					style={{ opacity: wrapperOpacity, y: enableWrapperShift ? wrapperOffsetY : 0 }}
				>
					<h2 className="sr-only">Watch More, Pay Less - Only for What You Watch</h2>
					<div className={s.moviePreviewBg}>
						<Image src="/img/movie--bg.jpg" width={1540} height={500} alt="Movie preview"/>
					</div>
					<h3>Lamborghini</h3>
					<div className={s.moviePreviewInner}>
						{mergedState === 3 && <Track totalTime={5067} />}
					</div>
				</motion.div>
			</motion.section>
		</div>
	)
}
