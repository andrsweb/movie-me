"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/Common/Container/Container'
import Image from "next/image";
import Link from "next/link";
import LeadCaptureForm from '@/components/Sections/Home/Form/LeadCaptureForm'

interface CtaProps {
    form?: boolean
}

export default function Cta({form = false}: CtaProps) {
	const sectionRef = useRef<HTMLElement>(null)
	
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	})
	
	const sectionOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
	const sectionY = useTransform(scrollYProgress, [0, 0.5], [100, 0])

	return (
		<motion.section 
			ref={sectionRef}
			className={`w-full py-[60px] md:py-[100px] ${form && "bg-[#7E90B9]"}`}
			style={{ 
				opacity: sectionOpacity,
				y: sectionY
			}}
		>
			<h2 className="sr-only">
				100,000+ users,
				plus you
			</h2>
			<Container maxWidth={1164}>
				<div className="w-full flex flex-col items-center gap-[30px] mx-auto py-[50px] px-[10px] rounded-[40px] bg-[#7E90B9] md:py-[50px] md:px-[50px]">
					<h3 className="font-bold text-[50px] leading-[60px] text-center text-[var(--color-black)] md:text-[100px] md:leading-[120px]">
						<em className="inline-block w-[220px] relative z-[1] md:w-[455px]">
							100,000+
							<span className="absolute left-1/2 bottom-[5%] block w-[101%] h-[15%] opacity-100 bg-[var(--color-blue)] z-[-1] md:h-[20%] md:bottom-[15%]" style={{ transform: 'translateX(-50%)' }} />
						</em> users,
						plus you
					</h3>
					<p className="font-bold text-[18px] leading-[22px] text-center text-[var(--color-black)] md:text-[32px] md:leading-[48px]">
						It only takes a few minutes to get started
					</p>
					{form && (
						<LeadCaptureForm variant="cta" />
					)}
					<div className="flex items-center gap-[20px]">
						<Link href="https://play.google.com/store/apps/details?id=com.movieme.app&hl=en" target="_blank" rel="noopener noreferrer" className="transition-opacity ease-in-out hover:opacity-70">
							<Image src="/img/svg/app-store.svg" width={159} height={46} alt="Apple store logo" />
						</Link>
						<Link href="https://apps.apple.com/in/app/movieme/id6445994785" target="_blank" rel="noopener noreferrer" className="transition-opacity ease-in-out hover:opacity-70">
							<Image src="/img/svg/google-play.svg" width={159} height={46} alt="Google Play store logo" />
						</Link>
					</div>
				</div>
			</Container>
		</motion.section>
	)
}
