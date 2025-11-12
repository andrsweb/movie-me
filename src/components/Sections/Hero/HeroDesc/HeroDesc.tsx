"use client"

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import TrailText from '@/components/Ui/TrailText/TrailText'
import s from "./HeroDesc.module.scss";

export default function HeroDesc() {
	const ref = useRef<HTMLDivElement>(null)
	const [hideText, setHideText] = useState(false)
	const [isFullyHidden, setIsFullyHidden] = useState(false)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["center center", "center center"]
	})

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest >= 0.3 && !hideText) {
			setHideText(true)
		} else if (latest < 0.3 && hideText) {
			setHideText(false)
			setIsFullyHidden(false)
		}
	})

	useEffect(() => {
		if (hideText && !isFullyHidden) {
			const timer = setTimeout(() => {
				setIsFullyHidden(true)
			}, 1500)
			return () => clearTimeout(timer)
		}
	}, [hideText, isFullyHidden])

	return (
		<motion.div
			ref={ref}
			className={s.heroDesc}
			style={{ 
				zIndex: isFullyHidden ? -100 : 50,
				pointerEvents: isFullyHidden ? 'none' : 'auto'
			}}
		>
			<div className={s.m}>
				<TrailText
					as="p"
					show={hideText}
					mode="hide"
					trailDirection="right"
					containerDirection="bottom"
				>
					You don’t need <br/> one more subscription
				</TrailText>
			</div>
			<div className={s.d}>
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
					trailDirection="right"
					containerDirection="right"
				>
					Curated cinema, <br/> on your terms
				</TrailText>
			</div>
		</motion.div>
	)
}