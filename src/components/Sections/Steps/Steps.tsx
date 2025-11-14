"use client"

import { useState } from 'react'
import s from './Steps.module.scss'
import Image from "next/image"
import Container from "@/components/Common/Container/Container"
import clsx from 'clsx'

const steps = [
	{ id: 1, title: "Add your card. ₹0 now.", imageUrl: "/img/s4.png" },
	{ id: 2, title: "Press Play. The meter starts.", imageUrl: "/img/s3.png" },
	{ id: 3, title: "Pause or exit. The meter stops.", imageUrl: "/img/s2.png" },
	{ id: 4, title: "Billed monthly. Automatically.", imageUrl: "/img/s1.png" },
]

export default function Steps() {
	const [activeStep, setActiveStep] = useState(1)

	return (
		<section className={s.steps}>
			<h2 className="sr-only">How MovieMe works</h2>
			<Container maxWidth={1400}>
				<div className={s.stepsWrapper}>
					<div className={s.stepsItems}>
						{steps.map((step) => (
							<div 
								key={step.id}
								className={clsx(s.stepsItem, {
									[s.active]: activeStep === step.id
								})}
								onMouseEnter={() => setActiveStep(step.id)}
								onClick={() => setActiveStep(step.id)}
							>
								<h3>{step.title}</h3>
								<div className={s.stepsArrow}>
									<Image 
										src="/img/svg/step-arrow.svg" 
										width={30} 
										height={15} 
										alt="Arrow"
									/>
								</div>
							</div>
						))}
					</div>
					<div className={s.stepsImages}>
						{steps.map((step) => (
							<div 
								key={step.id}
								className={clsx(s.stepsImage, {
									[s.active]: activeStep === step.id
								})}
							>
								<Image 
									src={step.imageUrl} 
									width={466} 
									height={588} 
									alt={`Step ${step.id}`}
									priority={step.id === 1}
								/>
							</div>
						))}
					</div>
				</div>
			</Container>
		</section>
	)
}
