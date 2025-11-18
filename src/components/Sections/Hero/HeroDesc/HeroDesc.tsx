"use client"

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import MaskText from '@/components/Ui/MaskText/MaskText'
import s from "./HeroDesc.module.scss";

export default function HeroDesc() {
	const ref = useRef<HTMLDivElement>(null)
	const [hideText, setHideText] = useState(false)
	const [isFullyHidden, setIsFullyHidden] = useState(false)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "start center"]
	})

	const { scrollY } = useScroll()

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (scrollY.get() === 0) {
			return
		}

		if (latest >= 0.3 && !hideText) {
			setHideText(true)
		} else if (latest < 0.3 && hideText) {
			setHideText(false)
			setIsFullyHidden(false)
		}
	})

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest === 0) {
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
				<MaskText
					as="p"
					show={!hideText}
				>
					Subscriptions are a trap
				</MaskText>
				<MaskText
					as="h2"
					show={!hideText}
				>
					Curated cinema, <br/> on your terms
				</MaskText>
		</motion.div>
	)
}