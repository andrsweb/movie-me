"use client"

import { useRef, useState, useEffect, useLayoutEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Container from "@/components/Common/Container/Container"
import MaskText from "@/components/Ui/MaskText/MaskText"

export default function HeroDesc() {
	const ref = useRef<HTMLDivElement>(null)
	const [hideText, setHideText] = useState(false)
	const [isFullyHidden, setIsFullyHidden] = useState(false)

	const { scrollY } = useScroll()

	useLayoutEffect(() => {
		if (window.scrollY > 0) {
			setHideText(true)
			setIsFullyHidden(true)
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

	const containerClasses = `fixed top-0 left-1/2 h-screen w-full -translate-x-1/2 pointer-events-none transition-opacity duration-500 ${
		isFullyHidden ? "opacity-0 z-[-100]" : "opacity-100 z-[2]"
	}`

	return (
		<div className={containerClasses}>
			<Container
				maxWidth={1540}
				className={containerClasses}
			>
				<motion.div
					ref={ref}
					className="absolute left-0 bottom-[45%] flex w-full max-w-[600px] flex-col items-start gap-[10px] pl-[20px] md:bottom-[10%] md:gap-[20px] md:pl-[50px]"
					style={{
						zIndex: isFullyHidden ? -100 : 50,
						pointerEvents: "none"
					}}
				>
					<MaskText
						as="p"
						show={!hideText}
						className="mb-0 font-normal text-[18px] leading-[22px] text-[var(--color-white)] md:text-[32px] md:leading-[48px]"
					>
						Subscriptions are a trap
					</MaskText>
					<MaskText
						as="h2"
						show={!hideText}
						className="font-bold text-[32px] leading-[37px] text-[var(--color-white)] lg:text-[64px] lg:leading-[70px]"
					>
						Curated cinema, <br />
						on your terms
					</MaskText>
				</motion.div>
			</Container>
		</div>
	)
}
