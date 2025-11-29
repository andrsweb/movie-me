"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Container from "@/components/Common/Container/Container"

const logoPositions = [
	{ id: 1, top: '10%', left: '8%' },
	{ id: 2, top: '8%', left: '25%' },
	{ id: 3, top: '12%', right: '15%' },
	{ id: 4, top: '55%', left: '45%' },
	{ id: 5, top: '15%', right: '8%' },
	{ id: 6, top: '55%', right: '25%' },
	{ id: 7, bottom: '35%', left: '12%' },
	{ id: 8, bottom: '25%', left: '28%' },
	{ id: 9, bottom: '30%', right: '35%' },
	{ id: 10, bottom: '15%', right: '12%' },
	{ id: 11, top: '60%', left: '18%' },
	{ id: 12, top: '65%', right: '45%' }
]

export default function Fly() {
	const sectionRef = useRef<HTMLElement>(null)
	const isInView = useInView(sectionRef, { margin: "0px 0px -200px 0px" })
	const hasAnimated = useInView(sectionRef, { margin: "0px 0px -200px 0px", once: true })

	return (
		<motion.section 
			ref={sectionRef} 
			className="relative w-full min-h-[400px] py-[50px] bg-[var(--color-dark)] overflow-visible z-[70] md:py-[100px] md:min-h-[641px]"
			initial={{ opacity: 0, y: 50 }}
			animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<motion.div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				}}
			>
				{logoPositions.map((logo) => (
					<motion.div
						key={logo.id}
						className="w-[20px] h-[20px] aspect-square z-[1] pointer-events-none will-change-[transform,opacity] md:w-[40px] md:h-[40px]"
						style={{
							position: 'absolute',
							top: logo.top,
							left: logo.left,
							right: logo.right,
							bottom: logo.bottom
						}}
						initial={{ 
							y: 0, 
							opacity: 0,
							rotate: 0
						}}
						animate={hasAnimated && isInView ? {
							y: [0, -30, 0],
							opacity: 1,
							rotate: [0, 10, -10, 0]
						} : hasAnimated ? {
							y: 0,
							opacity: 1,
							rotate: 0
						} : {
							y: 0,
							opacity: 0
						}}
						transition={{
							delay: logo.id * 0.1,
							duration: 0.8,
							y: isInView ? {
								repeat: Infinity,
								repeatType: "reverse",
								duration: 6 + (logo.id % 3) * 1.2
							} : {
								duration: 0.3
							},
							rotate: isInView ? {
								repeat: Infinity,
								repeatType: "reverse",
								duration: 8 + (logo.id % 4)
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
							className="w-full h-full object-contain"
							style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))' }}
						/>
					</motion.div>
				))}
			</motion.div>

			<Container maxWidth={1540}>
				<h2 className="sr-only">
					MovieMe shows you exactly where something is streaming
				</h2>
				<div className="w-full h-full flex flex-col items-center relative z-[2] mx-auto">
					<div className="w-full flex flex-col items-start gap-[30px] max-w-[800px]">
						<h3 className="text-left mb-[20px] text-[32px] leading-[40px] font-bold text-[var(--color-violet)] md:text-[60px] md:leading-[70px]">If it&#39;s out there, <br/> you&#39;ll find it here.</h3>
						<p className="max-w-[450px] font-normal text-[18px] leading-[28px] text-[#7183AA] ml-auto md:text-[24px] md:leading-[36px]">
							<em className="text-[var(--color-violet)] not-italic font-semibold relative z-[1]" style={{
								position: 'relative'
							}}>
								MovieMe
								<span className="absolute left-1/2 bottom-[5%] block w-[101%] h-[15%] opacity-100 bg-[#29406D] z-[-1] md:h-[20%] md:bottom-[15%]" style={{ transform: 'translateX(-50%)' }} />
							</em> shows you exactly <br/> where something is streaming
						</p>
					</div>
				</div>
			</Container>
		</motion.section>
	)
}