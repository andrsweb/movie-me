"use client"

import { useRef, useState, useEffect, useLayoutEffect, useMemo } from "react"
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
	const [isStacked, setIsStacked] = useState(false)
	const [movies, setMovies] = useState<Movie[]>([])
	const [cardOffsets, setCardOffsets] = useState<{ x: number; y: number }[]>([]);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const moviesToShow = useMemo(() => movies.slice(24, 48), [movies]);

	useEffect(() => {
		cardRefs.current = Array(moviesToShow.length).fill(null);
	}, [moviesToShow.length]);

	useLayoutEffect(() => {
		if (isMerged) {
			const timer = setTimeout(() => {
				setIsStacked(true);
			}, 3000);
			return () => clearTimeout(timer);
		} else {
			queueMicrotask(() => {
				setIsStacked(false);
			});
		}
	}, [isMerged]);

	useEffect(() => {
		const loadMovies = async () => {
			const data = await fetchMovies(48)
			setMovies(data)
		}
		void loadMovies()
	}, [])

	useLayoutEffect(() => {
		if (!isMerged || !mergedCardRef.current) {
			return;
		};

		const mergedCardRect = mergedCardRef.current.getBoundingClientRect();

		const newOffsets = cardRefs.current.map(cardEl => {
			if (!cardEl) return { x: 0, y: 0 };

			const cardRect = cardEl.getBoundingClientRect();
			
			const x = (mergedCardRect.left + mergedCardRect.width / 2) - (cardRect.left + cardRect.width / 2);
			const y = (mergedCardRect.top + mergedCardRect.height / 2) - (cardRect.top + cardRect.height / 2);

			return { x, y };
		});

		setCardOffsets(newOffsets);
	}, [isMerged, moviesToShow]);

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

		if (latest >= 0.9 && !isFinish) {
			setIsFinish(true)
			setIsMerged(true)
		} else if (latest < 0.9 && isFinish) {
			setIsFinish(false)
			setIsMerged(false)
			if (cardOffsets.length > 0) setCardOffsets([]);
		}
	})

	const cardsContainerY = useTransform(shrinkProgress, [0, 1], [0, 0])
	const cardsOpacity = useTransform(shrinkProgress, [0.5, 0.7], [1, 0])
	const trackOpacity = useTransform(shrinkProgress, [0.6, 0.9], [0, 1])
	const mergedCardRotateY = useTransform(shrinkProgress, [0.2, 0.55], [0, 180])
	const mergedCardScale = useTransform(shrinkProgress, [0.55, 0.95], [1, 4.5])
	const sectionScale = useTransform(shrinkProgress, [0.8, 1], [1, 0.75])

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

	return (
		<div ref={containerRef} className={s.moviePreviewContainer}>
			<motion.section
				ref={sectionRef}
				className={clsx(s.moviePreview, isShowed && s.showed, isFinish && s.finish)}
				style={{ scale: sectionScale }}
			>
				<div className={s.secondRowCards}>
					<motion.div
						ref={secondRowRef}
						className={s.secondRowCardsInner}
						style={{ y: cardsContainerY, opacity: mergedState >= 2 ? cardsOpacity : 1 }}
					>
						{moviesToShow.map((item, i) => {
							const cardVariants: Variants = {
								initial: {
									x: 0,
									y: 0,
									scale: 1,
									opacity: 1,
									rotate: 0,
									transition: { type: "spring", stiffness: 300, damping: 30 }
								},
								merged: {
									x: cardOffsets[i]?.x ?? 0,
									y: cardOffsets[i]?.y ?? 0,
									scale: 0.5 + (i % 5) * 0.1,
									opacity: 1,
									rotate: (i - 15.5) * 4 + (i % 3 - 1) * 2,
									transition: {
										type: "spring",
										stiffness: 120,
										damping: 30,
										delay: i * 0.04
									}
								},
								stacked: {
									x: cardOffsets[i]?.x ?? 0,
									y: cardOffsets[i]?.y ?? 0,
									scale: 0.4,
									opacity: 0,
									rotate: 0,
									transition: {
										type: "spring",
										stiffness: 200,
										damping: 30
									}
								}
							}

							return (
								<motion.div
									key={item.id}
									ref={el => { cardRefs.current[i] = el }}
									className={s.secondRowCard}
									variants={cardVariants}
									animate={isStacked ? "stacked" : isMerged ? "merged" : "initial"}
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
									ref={mergedCardRef}
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
