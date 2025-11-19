"use client"

import { useRef, useState, useEffect, useLayoutEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Container from "@/components/Common/Container/Container"
import MaskText from "@/components/Ui/MaskText/MaskText"
import s from "./HeroDesc.module.scss"

export default function HeroDesc() {
	const ref = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [hideText, setHideText] = useState(false)
	const [isFullyHidden, setIsFullyHidden] = useState(false)

	const { scrollY } = useScroll()

	useLayoutEffect(() => {
		if (window.scrollY > 0 && containerRef.current) {
			containerRef.current.classList.add(s.hidden)
		}
	}, [])

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest === 0) {
			setHideText(false)
			setIsFullyHidden(false)
			return
		}

		if (latest > 0 && !hideText) {
			setHideText(true)
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
		<div
			ref={containerRef}
			className={`${s.heroDescContainer} ${isFullyHidden && s.hidden}`}
		>
			<Container maxWidth={1540} className={s.heroDescContainer}>
				<motion.div
					ref={ref}
					className={s.heroDesc}
					style={{
						zIndex: isFullyHidden ? -100 : 50,
						pointerEvents: "none"
					}}
				>
					<MaskText as="p" show={!hideText}>
						Subscriptions are a trap
					</MaskText>
					<MaskText as="h2" show={!hideText}>
						Curated cinema, <br />
						on your terms
					</MaskText>
				</motion.div>
			</Container>
		</div>
	)
}
