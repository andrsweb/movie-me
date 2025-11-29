"use client"

import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react'

import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'

import clsx from 'clsx'
import type { Movie } from '@/types/movie'
import { fetchMovies } from '@/lib/api/movies'
import Image from "next/image";
import Button from "@/components/Ui/Button/Button";
import HeroDesc from "@/components/Sections/Home/Hero/HeroDesc/HeroDesc";
import MaskText from "@/components/Ui/MaskText/MaskText";
import HeroCardMovies from "./HeroCardMovies";

export default function HeroCard() {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const heroBgRef = useRef<HTMLDivElement | null>(null)
	const cardsRef = useRef<HTMLDivElement | null>(null)
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
			heroBgRef.current.classList.add("opacity-0", "invisible", "-z-[100]")
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

	return (
		<div ref={containerRef} className="relative w-full min-h-[400vh]">

			<motion.div
				ref={heroBgRef}
				className={clsx(
					"fixed top-0 left-0 w-full h-[80%] md:h-full -z-10 opacity-100 transition-opacity duration-[200ms] ease-in-out",
					isExpanded && "opacity-0 invisible -z-[100]"
				)}
			>
				<Image
					src="/img/hero-bg.png"
					width={1440}
					height={785}
					alt="Hero image"
					className="w-full h-full object-cover"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.7)] z-[1]"></div>
			</motion.div>
			<HeroDesc />
			<motion.div
				className={clsx(
					"sticky left-0 top-0 w-full bg-[var(--color-dark)] border-2 border-transparent mx-auto rounded-[5px] visible will-change-[opacity]",
					isStart && "overflow-hidden w-full lg:top-[10vh] lg:w-[912px] lg:border-[var(--color-blue)] lg:p-[10px]",
					isFinish && "border-transparent",
					isExpanded && "max-w-[1540px] overflow-visible mx-auto lg:border-transparent"
				)}
				style={{
					transition: "width 1s ease, top 1s ease, padding 1s ease, max-width 1s ease"
				}}
			>
				<motion.div
					ref={imgBlockRef}
					className="relative w-full aspect-[16/9] min-h-[500px] transition-[min-height] ease-linear"
					style={prefersReducedMotion ? {} : {
						transform: `scaleX(${isStart ? 1 : imgScaleX})`,
						transformOrigin: 'center center',
					}}
				>
					<Image src="/img/hero-bg.jpg" width={906} height={514} alt="Hero image" className="absolute top-0 left-0 w-full h-full object-cover rounded-[5px]"/>
					<div className="absolute top-0 left-0 w-full h-full" style={{background: "linear-gradient(to right, rgb(13, 19, 15), rgba(13, 19, 35, 0.88), rgba(13, 19, 35, 0.5), rgba(13, 19, 35, 0.3), rgba(13, 19, 35, 0), rgba(13, 19, 35, 0))"}}></div>
					<MaskText show={showDesc} className="hidden md:flex absolute left-[20px] bottom-[20px] z-[1] max-w-[592px] flex-col items-start gap-[20px]">
						<h2 className="font-bold text-[32px] leading-[37px] text-[var(--color-white)] lg:text-[64px] lg:leading-[70px]">Hating Game</h2>
						<Button color="violet" type="button">Play <b>Me</b></Button>
					</MaskText>
				</motion.div>
				<div ref={cardsRef} className="mx-auto flex w-full h-full max-w-[992px] flex-col items-start gap-[20px] transition-[max-width] ease-linear">
					<MaskText show={showDesc} className="md:hidden mx-auto flex w-full max-w-[266px] flex-col items-center gap-[20px] py-[20px]">
						<h2 className="font-bold text-[32px] leading-[37px] text-[var(--color-white)] lg:text-[64px] lg:leading-[70px]">Hating Game</h2>
						<Button color="violet" type="button">Play <b>Me</b></Button>
					</MaskText>
					<MaskText show={showText} className="flex w-full flex-col items-start gap-[30px] px-[20px] py-[60px] md:flex-row md:items-center md:gap-[70px]">
						<h3 className="w-full max-w-[245px] font-bold text-[32px] leading-[37px] text-[var(--color-white)] md:max-w-[495px] md:text-[32px] md:leading-[37px] lg:text-[64px] lg:leading-[70px]">
							MovieMe is the  <em>un-subscription</em>
						</h3>
						<p className="ml-auto w-full max-w-[220px] text-left text-[18px] leading-[22px] font-bold md:text-[22px] md:leading-[30px]">
							Handpicked films,
							not an endless scroll.
						</p>
					</MaskText>
					<HeroCardMovies
						movies={movies}
						isExpanded={isExpanded}
						cardsRef={cardsRef}
					/>
				</div>
			</motion.div>
		</div>
	)
}