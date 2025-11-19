"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import s from './Bill.module.scss'
import Image from 'next/image'
import Container from "@/components/Common/Container/Container"
import MaskText from "@/components/Ui/MaskText/MaskText"
import Button from "@/components/Ui/Button/Button"

export default function Bill() {
	const sectionRef = useRef<HTMLElement>(null)

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	})
	
	const sectionOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])
	const sectionY = useTransform(scrollYProgress, [0, 0.6], [200, 0])

	return (
		<motion.section 
			ref={sectionRef}
			className={s.bill}
			style={{ 
				opacity: sectionOpacity,
				y: sectionY
			}}
		>
			<Container maxWidth={1520}>
				<h2 className="sr-only">Freedom and Control You decide your bill.</h2>
				<div className={s.billWrapper}>
					<MaskText as="div" show={true} className={s.billHeading}>
						<h3>Freedom and Control</h3>
						<span>You decide your bill.</span>
					</MaskText>
					<div className={s.billCards}>
						<div className={s.billCard}>
							<div className={s.billCardInfo}>
								<div className={s.billCardGroup}>
									<h4>Prepaid</h4>
									<p>Your time, your terms.</p>
								</div>
								<div className={s.billCardGroup}>
									<h5>
										Load minutes once. <br/>
										Watch whenever.
									</h5>
									<p>Your minutes never expire.</p>
								</div>
								<div className={s.billCardButtons}>
									<Button color="violet" href="#">Get <b>Prepaid</b></Button>
									<Button color="border" href="#"><b>Learn More</b></Button>
								</div>
							</div>
							<div className={s.billCardImg}>
								<Image src="/img/svg/wallet.svg" width={210} height={182}  alt="Wallet" />
							</div>
						</div>
						<div className={s.billCard}>
							<div className={s.billCardInfo}>
								<div className={s.billCardGroup}>
									<h4>Postpaid</h4>
									<p>Watch now. Pay later.</p>
								</div>
								<div className={s.billCardGroup}>
									<h5>
										Enjoy the film first, <br/>
										we’ll handle the math after.
									</h5>
									<p>Only the minutes you watch count.</p>
								</div>
								<div className={s.billCardButtons}>
									<Button color="violet" href="#">Get <b>Postpaid</b></Button>
									<Button color="border" href="#"><b>Learn More</b></Button>
								</div>
							</div>
							<div className={s.billCardImg}>
								<Image src="/img/svg/laptop.svg" width={248} height={135} alt="Wallet" />
							</div>
						</div>
					</div>
				</div>
			</Container>
		</motion.section>
		)
}