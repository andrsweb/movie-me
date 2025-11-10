"use client"

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import clsx from 'clsx'
import s from "./HeroDesc.module.scss";

export default function HeroDesc() {
	const ref = useRef<HTMLDivElement>(null)
	const [isHidden, setIsHidden] = useState(false)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "30vh start"]
	})

	const opacity = useTransform(scrollYProgress, [0.3, 1], [1, 0])
	const x = useTransform(scrollYProgress, [0.1, 1], [0, 100])
	const y = useTransform(scrollYProgress, [0.1, 1], [0, 100])

	useMotionValueEvent(opacity, "change", (latest) => {
		if (latest <= 0.3 && !isHidden) {
			setIsHidden(true)
		} else if (latest > 0.3 && isHidden) {
			setIsHidden(false)
		}
	})

	return (
		<motion.div 
			ref={ref} 
			className={clsx(s.heroDesc, isHidden && s.hidden)} 
			style={{ opacity, x, y }}
		>
			<p>Subscriptions are a trap</p>
			<h2>Curated cinema, on your terms</h2>
		</motion.div>
	)
}