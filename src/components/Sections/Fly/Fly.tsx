"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import s from './Fly.module.scss'
import Container from "@/components/Common/Container/Container"

const logoPositions = [
	{ id: 1, top: '10%', left: '8%' },
	{ id: 2, top: '8%', left: '25%' },
	{ id: 3, top: '12%', right: '15%' },
	{ id: 4, top: '35%', left: '45%' },
	{ id: 5, top: '15%', right: '8%' },
	{ id: 6, top: '45%', right: '25%' },
	{ id: 7, bottom: '35%', left: '12%' },
	{ id: 8, bottom: '25%', left: '28%' },
	{ id: 9, bottom: '30%', right: '35%' },
	{ id: 10, bottom: '15%', right: '12%' },
	{ id: 11, top: '60%', left: '18%' },
	{ id: 12, top: '55%', right: '45%' }
]

export default function Fly() {
	const sectionRef = useRef<HTMLElement>(null)
	const [isAnimated, setIsAnimated] = useState(false)
	const isInView = useInView(sectionRef, { margin: "0px 0px -200px 0px" })

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	})

	const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
	const sectionY = useTransform(scrollYProgress, [0, 0.5], [100, 0])

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest >= 0.2 && !isAnimated) {
			setIsAnimated(true)
		}
	})

	return (
		<motion.section 
			ref={sectionRef} 
			className={s.fly}
			style={{ 
				opacity: sectionOpacity,
				y: sectionY
			}}
		>
			{logoPositions.map((logo) => (
				<motion.div
					key={logo.id}
					className={s.flyLogo}
					style={{
						position: 'absolute',
						top: logo.top,
						left: logo.left,
						right: logo.right,
						bottom: logo.bottom
					}}
					initial={{ 
						y: -200, 
						opacity: 0,
						rotate: 0
					}}
					animate={isAnimated && isInView ? {
						y: [0, -10, 0],
						opacity: 1,
						rotate: [0, 5, -5, 0]
					} : isAnimated ? {
						y: 0,
						opacity: 1,
						rotate: 0
					} : {
						y: -200,
						opacity: 0
					}}
					transition={{
						delay: logo.id * 0.1,
						duration: 0.8,
						y: isInView ? {
							repeat: Infinity,
							repeatType: "reverse",
							duration: 2 + (logo.id % 3) * 0.5
						} : {
							duration: 0.3
						},
						rotate: isInView ? {
							repeat: Infinity,
							repeatType: "reverse",
							duration: 3 + (logo.id % 4) * 0.3
						} : {
							duration: 0.3
						}
					}}
				>
					<Image 
						src={`/img/svg/${logo.id}.svg`} 
						width={40} 
						height={40} 
						alt={`Logo ${logo.id}`}
					/>
				</motion.div>
			))}

			<Container maxWidth={1540}>
				<h2 className="sr-only">
					MovieMe shows you exactly where something is streaming
				</h2>
				<div className={s.flyWrapper}>
					<div className={s.flyInfo}>
						<h3>If it&#39;s out there, <br/> you&#39;ll find it here.</h3>
						<p>
							<em>MovieMe</em> shows you exactly <br/> where something is streaming
						</p>
					</div>
				</div>
			</Container>
		</motion.section>
	)
}