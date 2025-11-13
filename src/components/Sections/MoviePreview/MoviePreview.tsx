"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion"
import clsx from "clsx"
import Image from "next/image"
import Track from "@/components/Ui/Track/Track"
import s from './MoviePreview.module.scss'

export default function MoviePreview() {
	const containerRef = useRef<HTMLDivElement>(null)
	const sectionRef = useRef<HTMLElement>(null)
	const [isShowed, setIsShowed] = useState(false)
	const [isFinish, setIsFinish] = useState(false)
	const prefersReducedMotion = useReducedMotion()

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

	useMotionValueEvent(shrinkProgress, "change", (latest) => {
		if (latest >= 0.8 && !isFinish) {
			setIsFinish(true)
		} else if (latest < 0.8 && isFinish) {
			setIsFinish(false)
		}
	})

	const sectionScale = useTransform(
		shrinkProgress,
		[0.6, 1],
		[1, 0.85]
	)

	const sectionOpacity = useTransform(
		shrinkProgress,
		[0.8, 1],
		[1, 0.7]
	)

	const entranceOpacity = useTransform(
		scrollYProgress,
		[0, 1],
		[0, 1]
	)

	const entranceY = useTransform(
		scrollYProgress,
		[0, 1],
		[50, 0]
	)
	

	return (
		<div ref={containerRef} className={s.moviePreviewContainer}>
			<motion.section 
				ref={sectionRef}
				className={clsx(s.moviePreview, isShowed && s.showed, isFinish && s.finish)}
				style={prefersReducedMotion ? {} : { 
					scale: sectionScale,
					opacity: isShowed ? sectionOpacity : entranceOpacity,
					y: isShowed ? 0 : entranceY
				}}
			>
				<h2 className="sr-only">
					Watch More, Pay Less - Only for What You Watch
				</h2>
				<div className={s.moviePreviewBg}>
					<Image src="/img/movie--bg.jpg" width={1540} height={500} alt="Movie preview"/>
				</div>
				<h3>Lamborghini</h3>
				<div className={s.moviePreviewInner}>
					<Track 
						totalTime={5067}
					/>
				</div>
			</motion.section>
		</div>
	)
}