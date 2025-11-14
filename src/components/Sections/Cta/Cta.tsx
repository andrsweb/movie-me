"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import s from './Cta.module.scss'
import Container from '@/components/Common/Container/Container'
import Image from "next/image";
import Link from "next/link";

export default function Cta() {
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
			className={s.cta}
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
				<div className={s.ctaInner}>
					<h3><em>100,000+</em> users,
						plus you</h3>
					<p>
						It only takes a few minutes to get started
					</p>
					<div className={s.ctaLinks}>
						<Link href="https://play.google.com/store/apps/details?id=com.movieme.app&hl=en" target="_blank" rel="noopener noreferrer">
							<Image src="/img/svg/app-store.svg" width={159} height={46} alt="Apple store logo" />
						</Link>
						<Link href="https://apps.apple.com/in/app/movieme/id6445994785" target="_blank" rel="noopener noreferrer">
							<Image src="/img/svg/google-play.svg" width={159} height={46} alt="Google Play store logo" />
						</Link>
					</div>
				</div>
			</Container>
		</motion.section>
	)
}
