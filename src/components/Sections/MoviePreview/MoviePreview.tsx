"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
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

	const [isShowed, setIsShowed] = useState(false)
	const [isFinish, setIsFinish] = useState(false)
	const [isMerged, setIsMerged] = useState(false)
	const [mergedState, setMergedState] = useState(1)
	const [movies, setMovies] = useState<Movie[]>([])

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

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest >= 1 && !isShowed) {
			setIsShowed(true)
		} else if (latest < 1 && isShowed) {
			setIsShowed(false)
		}
	})

	const cardsContainerY = useTransform(shrinkProgress, [0.1, 0.15], ["5%", "100%"])
	const cardsOpacity = useTransform(shrinkProgress, [0.5, 0.7], [1, 0])
	const trackOpacity = useTransform(shrinkProgress, [0.6, 0.9], [0, 1])
	const mergedCardRotateY = useTransform(shrinkProgress, [0.2, 0.55], [0, 180])
	const mergedCardScale = useTransform(shrinkProgress, [0.55, 0.95], [1, 4.5])

	useMotionValueEvent(shrinkProgress, "change", (latest) => {
		if (latest >= 0.2 && !isFinish) {
			setIsFinish(true)
			setIsMerged(true)
		} else if (latest < 0.2 && isFinish) {
			setIsFinish(false)
			setIsMerged(false)
		}

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

	return (
		<div ref={containerRef} className={s.moviePreviewContainer}>
			<motion.section
				ref={sectionRef}
				className={clsx(s.moviePreview, isShowed && s.showed, isFinish && s.finish)}
			>
				<div className={s.secondRowCards}>
					<motion.div
						className={s.secondRowCardsInner}
						style={{ y: cardsContainerY, opacity: mergedState >= 2 ? cardsOpacity : 1 }}
					>
						{movies.length > 0 && movies.slice(24, 48).map((item, i) => {
							const centerIndex = 11.5
							const offsetIndex = i - centerIndex
							const stackX = offsetIndex * 160
							
							return (
								<motion.div
									key={item.id}
									className={s.secondRowCard}
									initial="normal"
									animate={isMerged ? "merged" : "normal"}
									variants={{
										normal: {
											x: 0,
											y: 0,
											scale: 1,
											opacity: 1,
											transition: { duration: 0.4, ease: "easeOut" }
										},
										merged: {
											x: -stackX,
											y: 0,
											scale: 0.5,
											opacity: 0,
											transition: { duration: 0.5, ease: "easeInOut", delay: i * 0.015 }
										}
									}}
								>
									<Link href={`/movie/${item.id}`}>
										<Image src={item.src} width={150} height={226} alt={item.title} />
										<div className={s.secondRowCardPrice}><span>Less than ${item.price}</span></div>
									</Link>
								</motion.div>
							)
						})}
						{isMerged && (
							<div
								className={clsx(
									s.mergedCardWrapper,
									mergedState === 1 && s.state1,
									mergedState === 2 && s.state2,
									mergedState === 3 && s.state3
								)}
							>
								<motion.div
									className={s.mergedCard}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
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
							</div>
						)}
					</motion.div>
				</div>

				<motion.div
					className={s.moviePreviewWrapper}
					style={{ opacity: wrapperOpacity }}
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
