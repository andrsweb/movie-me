"use client"

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
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
			className="py-[100px]"
		>
			<h2 className="sr-only">For Cinephiles By Cinephiles</h2>
			<Container maxWidth={1200}>
				<div className="w-full max-w-[640px] flex flex-col items-start gap-[30px] mx-auto md:gap-[40px]">
					<motion.h3
						variants={getAnimatedTextVariants('left')}
						initial="hidden"
						animate={showText ? "visible" : "hidden"}
						transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
						className="font-bold text-[32px] leading-[48px] text-[var(--color-violet)] md:text-[60px] md:leading-[70px]"
					>
						For Cinephiles
					</motion.h3>
					<motion.h3
						variants={getAnimatedTextVariants('right')}
						initial="hidden"
						animate={showText ? "visible" : "hidden"}
						transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
						className="font-bold text-[32px] leading-[48px] text-[var(--color-violet)] ml-auto md:text-[60px] md:leading-[70px]"
					>
						By Cinephiles
					</motion.h3>
				</div>
			</Container>
		</motion.section>
	)
}