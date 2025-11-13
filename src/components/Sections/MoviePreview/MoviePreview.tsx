"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Track from "@/components/Ui/Track/Track"
import s from './MoviePreview.module.scss'

export default function MoviePreview() {
	const sectionRef = useRef<HTMLElement>(null)

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start center", "center center"]
	})
	
	const sectionOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
	

	return (
		<motion.section 
			ref={sectionRef}
			className={s.moviePreview}
			style={{ opacity: sectionOpacity }}
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
	)
}