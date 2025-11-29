"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import Track from "@/components/Ui/Track/Track"
import { fetchMovies } from "@/lib/api/movies"
import type { Movie } from "@/types/movie"
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
		if (latest >= 1 && !isShowed) {
			setIsShowed(true)
		} else if (latest < 1 && isShowed) {
			setIsShowed(false)
		}

		const allCardsRendered =
			moviesToShow.length > 0 &&
			cardRefs.current.filter(cardEl => cardEl !== null).length === moviesToShow.length
		const offsetsNotComputed = cardMergeOffsets.length !== moviesToShow.length
		const canComputeOffsets = !isMerged && secondRowRef.current && allCardsRendered && offsetsNotComputed

		if (canComputeOffsets) {
			requestAnimationFrame(() => {
				if (!secondRowRef.current) return
				const containerRect = secondRowRef.current.getBoundingClientRect()
				const containerCenterX = containerRect.left + containerRect.width / 2
				const containerCenterY = containerRect.top + containerRect.height / 2

				const offsets = cardRefs.current.map((cardEl) => {
					if (!cardEl) return { x: 0, y: 0 }
					const cardRect = cardEl.getBoundingClientRect()
					const cardCenterX = cardRect.left + cardRect.width / 2
					const cardCenterY = cardRect.top + cardRect.height / 2

					return {
						x: containerCenterX - cardCenterX,
						y: containerCenterY - cardCenterY,
					}
				})
				setCardMergeOffsets(offsets)
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
		<div ref={containerRef} className="w-full min-h-[800vh] md:min-h-[1500vh] flex items-start relative">
			<motion.section
				ref={sectionRef}
				className={clsx(
					"sticky left-0 top-0 w-full h-[100dvh] z-[51] will-change-[transform,opacity]",
					isShowed && "z-[52]",
					isFinish && "origin-center"
				)}
			>
				<div className="absolute left-0 top-[5%] w-screen h-screen z-[1] flex justify-center items-stretch" style={{ marginLeft: "calc(50% - 50vw)" }}>
					<motion.div
						ref={secondRowRef}
						className="flex items-center h-[226px] gap-[8px] md:gap-[20px] whitespace-nowrap"
						style={{ y: cardsContainerY, opacity: mergedState >= 2 ? cardsOpacity : 1 }}
					>
						{moviesToShow.map((item, i) => {
							const offset = cardMergeOffsets[i] || { x: 0, y: 0 }

							return (
								<motion.div
									key={item.id}
									ref={el => { cardRefs.current[i] = el }}
									className="flex-shrink-0 w-[92px] h-[140px] md:w-[150px] md:h-[226px] relative rounded-[8px] overflow-hidden"
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
									<Link href="#" className="group flex h-full w-full flex-col relative no-underline">
										<Image src={item.src} width={150} height={226} alt={item.title} className="w-full h-full object-cover block" />
										<div
											className="absolute inset-0 flex items-end justify-center px-[10px] pb-[20px] pt-[10px] opacity-0 transition-opacity duration-[200ms] ease-in-out group-hover:opacity-100"
											style={{ background: "linear-gradient(to top, rgb(13, 19, 15), rgba(13, 19, 40, 1), rgba(13, 19, 35, 0.8), rgba(13, 19, 35, 0.3), rgba(13, 19, 35, 0), rgba(13, 19, 35, 0))" }}
										>
											<span className="font-bold text-[10px] leading-[18px] text-center text-[var(--color-gold)] md:text-[14px]">Less than ${item.price}</span>
										</div>
									</Link>
								</motion.div>
							)
						})}
						<motion.div
							className={clsx(
								"absolute left-1/2 flex-shrink-0 z-[50] pointer-events-none overflow-visible transition-[height,width] duration-[200ms] ease-in-out transition-[top,transform] duration-[1000ms] ease-in-out",
								mergedCardBegin ? "top-[40%]" : "top-[5%] md:top-0",
								mergedState === 3
									? "w-[600px] h-[300px]"
									: mergedState === 2
										? "w-[400px] h-[200px]"
										: "w-[92px] h-[140px] md:w-[150px] md:h-[226px]"
							)}
							style={{ transform: mergedCardBegin ? "translate(-50%, -50%)" : "translate(-50%, 0)" }}
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
								className="relative w-full h-full [perspective:1000px] [transform-style:preserve-3d]"
								style={{ rotateY: mergedCardRotateY, scale: mergedCardScale }}
							>
								<div className="absolute w-full h-full [backface-visibility:hidden] [transform-style:preserve-3d]">
									{movies.length > 0 && (
										<Image src={movies[6].src} width={150} height={226} alt="Front" className="w-full h-full object-cover rounded-[5px]" />
									)}
								</div>
								<div
									className="absolute w-full h-full [backface-visibility:hidden] [transform-style:preserve-3d] transition-opacity duration-[200ms] ease"
									style={{ transform: "rotateY(180deg)", opacity: mergedState >= 2 ? 0 : 1 }}
								>
									<Image src="/img/svg/state1.svg" width={150} height={226} alt="Back" className="w-full h-full object-cover rounded-[5px]" />
								</div>
								<div
									className="absolute left-0 top-0 z-[10] w-full h-full rounded-[20px] border-2 border-[var(--color-blue)] bg-[var(--color-dark)]"
									style={{ opacity: mergedState >= 2 ? 1 : 0 }}
								>
									<div className="w-full h-full flex flex-col items-center justify-center">
										<Image
											src="/img/svg/keyb.svg"
											width={382}
											height={11}
											alt="Vector keyboard"
											className="w-full h-[14px] absolute left-0 -bottom-[14px]"
											style={{ opacity: mergedState === 3 ? 1 : 0 }}
										/>
										<Image
											src="/img/svg/logo-sm.svg"
											width={50}
											height={50}
											alt="Small movie-me vector logo"
											style={{
												transform: "scaleX(-1)",
												width: mergedState === 2 ? "100px" : mergedState === 3 ? "160px" : "66px",
												height: mergedState === 2 ? "100px" : mergedState === 3 ? "160px" : "66px"
											}}
										/>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</motion.div>
				</div>

				<motion.div
					className="w-full h-[65%] md:h-full flex flex-col items-center justify-center relative z-[20] px-[20px] py-[82px] md:px-[50px] md:py-[50px]"
					style={{ opacity: wrapperOpacity, y: enableWrapperShift ? wrapperOffsetY : 0 }}
				>
					<h2 className="sr-only">Watch More, Pay Less - Only for What You Watch</h2>
					<div className="absolute top-0 left-0 w-full h-full z-[-1]">
						<Image src="/img/movie--bg.jpg" width={1540} height={500} alt="Movie preview" className="w-full h-full object-cover" />
						<div className="absolute top-0 left-0 w-full h-full" style={{ background: "linear-gradient(90deg,rgba(13, 19, 15, 0.87) 15%, rgba(13, 19, 40, 0.76) 50%, rgba(13, 19, 35, 0.43) 100%)" }} />
					</div>
					<h3 className="font-bold text-[40px] leading-[48px] text-[var(--color-white)] text-center mb-[20px] hidden md:block">Lamborghini</h3>
					<div className="w-full h-full flex flex-col items-center justify-center">
						{mergedState === 3 && <Track totalTime={5067} />}
					</div>
				</motion.div>
			</motion.section>
		</div>
	)
}
