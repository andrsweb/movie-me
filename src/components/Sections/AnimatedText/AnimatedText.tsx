"use client"

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import s from './AnimatedText.module.scss'
import Container from "@/components/Common/Container/Container"
import { getAnimatedTextVariants } from '@/lib/animations'

export default function AnimatedText() {
	const sectionRef = useRef<HTMLElement>(null)
	const [showText, setShowText] = useState(false)
	
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start center", "center center"]
	})
	
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest >= 0.5 && !showText) {
			setShowText(true)
		} else if (latest < 0.5 && showText) {
			setShowText(false)
		}
	})

	return (
		<motion.section 
			ref={sectionRef}
			className={s.text}
		>
			<h2 className="sr-only">For Cinephiles By Cinephiles</h2>
			<Container maxWidth={1200}>
				<div className={s.textWrapper}>
					<motion.h3
						variants={getAnimatedTextVariants('left')}
						initial="hidden"
						animate={showText ? "visible" : "hidden"}
						transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
					>
						For Cinephiles
					</motion.h3>
					<motion.h3
						variants={getAnimatedTextVariants('right')}
						initial="hidden"
						animate={showText ? "visible" : "hidden"}
						transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
					>
						By Cinephiles
					</motion.h3>
				</div>
			</Container>
		</motion.section>
	)
}