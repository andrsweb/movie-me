"use client"

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import TrailText from '@/components/Ui/TrailText/TrailText'
import s from "./HeroDesc.module.scss";

export default function HeroDesc() {
	const ref = useRef<HTMLDivElement>(null)
	const [hideText, setHideText] = useState(false)
	const [isFullyHidden, setIsFullyHidden] = useState(false)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "30vh start"]
	})

	const x = useTransform(scrollYProgress, [0.1, 1], [0, 50])
	const y = useTransform(scrollYProgress, [0.1, 1], [0, 50])

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest >= 0.3 && !hideText) {
			setHideText(true)
		} else if (latest < 0.3 && hideText) {
			setHideText(false)
			setIsFullyHidden(false)
		}
	})

	const handleAnimationComplete = () => {
		if (hideText) {
			setIsFullyHidden(true)
		}
	}

	return (
		<motion.div
			ref={ref}
			className={s.heroDesc}
			style={{ 
				x, 
				y,
				zIndex: isFullyHidden ? -100 : 50,
				pointerEvents: isFullyHidden ? 'none' : 'auto'
			}}
			onAnimationComplete={handleAnimationComplete}
		>
			<TrailText 
				as="p"
				show={hideText}
				mode="hide"
				trailDirection="right"
				containerDirection="bottom"
			>
				Subscriptions are a trap
			</TrailText>
			<TrailText 
				as="h2"
				show={hideText}
				mode="hide"
				delay={0.1}
				trailDirection="left"
				containerDirection="bottom"
			>
				Curated cinema, <br/> on your terms
			</TrailText>
		</motion.div>
	)
}