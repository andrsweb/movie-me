"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import s from "./HeroDesc.module.scss";

export default function HeroDesc() {
	const ref = useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "30vh start"]
	})

	const opacity = useTransform(scrollYProgress, [0.3, 1], [1, 0])
	const x = useTransform(scrollYProgress, [0.1, 1], [0, 100])
	const y = useTransform(scrollYProgress, [0.1, 1], [0, 100])

	return (
		<motion.div
			ref={ref}
			className={s.heroDesc}
			style={{ opacity, x, y }}
		>
			<p>Subscriptions are a trap</p>
			<h2>Curated cinema, on your terms</h2>
		</motion.div>
	)
}