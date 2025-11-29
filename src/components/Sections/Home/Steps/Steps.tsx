"use client"

import { useState } from 'react'
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
		<section className="w-full py-[100px] bg-[var(--color-dark)] z-[65]">
			<h2 className="sr-only">How MovieMe works</h2>
			<Container maxWidth={1400}>
				<div className="w-full flex flex-col items-center gap-[30px] lg:flex-row lg:items-center lg:justify-between lg:gap-[60px]">
					<div className="w-full flex flex-col gap-[24px] lg:w-1/2 lg:max-w-[650px]">
						{steps.map((step) => (
							<div 
								key={step.id}
								className={clsx("w-full flex items-center justify-between py-[12px] px-[30px] rounded-full bg-[#162542] gap-[20px] transition-all ease-in-out cursor-pointer hover:bg-[var(--color-blue)] hover:transform hover:-translate-y-[2px] active:bg-[var(--color-blue)] active:transform active:-translate-y-1 xl:py-[20px] xl:px-[40px]", {
									"bg-[var(--color-blue)] transform -translate-y-[2px]": activeStep === step.id
								})}
								onMouseEnter={() => setActiveStep(step.id)}
								onClick={() => setActiveStep(step.id)}
							>
								<h3 className="font-normal text-[18px] leading-[24px] text-[var(--color-white)] max-w-[80%] xl:text-[32px] xl:leading-[48px]">{step.title}</h3>
								<div className="flex items-center transition-transform ease-in-out duration-700" style={{ transform: activeStep === step.id ? 'rotate(-90deg)' : 'rotate(0deg)' }}>
									<Image 
										src="/img/svg/step-arrow.svg" 
										width={30} 
										height={15} 
										alt="Arrow"
										className="w-auto h-[12px] xl:h-[17px]"
									/>
								</div>
							</div>
						))}
					</div>
					<div className="relative w-full max-w-[350px] h-[440px] mt-[20px] md:max-w-[400px] md:h-[500px] lg:w-1/2 lg:max-w-[466px] lg:h-[588px] lg:mt-0">
						{steps.map((step) => (
							<div 
								key={step.id}
								className={clsx("absolute top-0 left-0 w-full h-full opacity-0 visibility-hidden transition-all ease-in-out duration-1000 pointer-events-none", {
									"opacity-100 visibility-visible z-[2]": activeStep === step.id
								})}
							>
								<Image 
									src={step.imageUrl} 
									width={466} 
									height={588} 
									alt={`Step ${step.id}`}
									priority={step.id === 1}
									className="w-full h-full object-contain"
								/>
							</div>
						))}
					</div>
				</div>
			</Container>
		</section>
	)
}
