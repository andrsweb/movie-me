"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import s from './AnimatedText.module.scss'
import Container from "@/components/Common/Container/Container"
import { getAnimatedTextVariants, animatedTextTransition } from '@/lib/animations'

export default function AnimatedText() {
	const sectionRef = useRef<HTMLElement>(null)
	const firstTitleRef = useRef<HTMLHeadingElement>(null)
	const secondTitleRef = useRef<HTMLHeadingElement>(null)
	
	const isFirstTitleInView = useInView(firstTitleRef, { 
		once: true, 
		margin: "-150px 0px -150px 0px"
	})
	
	const isSecondTitleInView = useInView(secondTitleRef, { 
		once: true, 
		margin: "-150px 0px -150px 0px"
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
						ref={firstTitleRef}
						variants={getAnimatedTextVariants('left')}
						initial="hidden"
						animate={isFirstTitleInView ? "visible" : "hidden"}
						transition={animatedTextTransition}
					>
						For Cinephiles
					</motion.h3>
					<motion.h3
						ref={secondTitleRef}
						variants={getAnimatedTextVariants('right')}
						initial="hidden"
						animate={isSecondTitleInView ? "visible" : "hidden"}
						transition={{
							...animatedTextTransition,
							delay: 1
						}}
					>
						By Cinephiles
					</motion.h3>
				</div>
			</Container>
		</motion.section>
	)
}