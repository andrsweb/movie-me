"use client"

import { useRef } from "react"
import Image from "next/image"
import PieChart from "@/components/Ui/PieChart/PieChart"
import Container from "@/components/Common/Container/Container"
import ProgressSlider from "@/components/Ui/ProgressSlider/ProgressSlider"

export default function About() {
	const sectionRef = useRef<HTMLElement>(null)

	return (
		<section 
			ref={sectionRef}
			className="py-[100px] bg-[var(--color-dark)] z-[55] relative mt-0 will-change-[transform,opacity] md:-mt-[80px] md:pt-[160px]"
		>
			<h2 className="sr-only">Think of it like ordering pizza, you only pay for the slices you eat.</h2>
			<Container maxWidth={1046}>
				<div className="flex flex-col items-start gap-[60px]">
					<div className="w-full flex flex-col items-start justify-between gap-[30px] sm:flex-row sm:p-0">
						<div className="w-full max-w-[193px] flex flex-col items-start gap-[30px] md:max-w-[521px]">
							<span className="hidden font-normal text-[18px] leading-[22px] text-[var(--color-white)] md:block">
								How It Works
							</span>
							<h3 className="font-bold text-[22px] leading-[30px] text-[var(--color-white)] md:text-[60px] md:leading-[70px]">
								Think of it like ordering pizza,
								you only pay for the slices you eat.
							</h3>
						</div>
						<div className="flex justify-center items-center ml-auto">
							<PieChart
								sliceAngle={55}
								mainColor="#3C588F"
								sliceColor="#29406D"
								flyAngle={-50}
								animationDuration={2000}
								step1Duration={400}
								step2Duration={800}
								returnDelay={1600}
								returnDuration={400}
								cyclePause={1000}
								initialDelay={500}
								step1Offset={10}
								step2Offset={20}
								sliceDistance1={15}
								sliceDistance2={30}
							/>
						</div>
					</div>
					<div className="w-full flex flex-col items-start gap-[60px]">
						<div className="w-full">
							<ProgressSlider />
						</div>
						<div className="w-full flex flex-col items-start gap-[40px] md:flex-row">
							<div className="w-full max-w-[406px] flex flex-col items-start gap-[11px]">
								<p className="font-normal text-[16px] leading-[20px] text-[var(--color-white)] mb-0">
									Add A Payment Method Via
								</p>
								<span className="inline-flex flex-wrap items-center gap-[5px] font-normal text-[16px] leading-[20px] text-[var(--color-white)] mb-0">
									Debit Card, Credit Card etc. Securely Through
									<Image src="/img/svg/stripe.svg" width={65} height={40} alt="Payment image"/>
								</span>
							</div>
							<div className="flex flex-col items-start gap-[11px]">
								<span className="font-normal text-[16px] leading-[20px] text-[var(--color-white)] mb-0">
									Pay Easily With
								</span>
								<div className="flex flex-wrap items-center gap-[10px]">
									<div>
										<Image src="/img/svg/visa.svg" width={65} height={40} alt="Payment image" className="h-[40px] w-auto"/>
									</div>
									<div>
										<Image src="/img/svg/master-card.svg" width={65} height={40} alt="Payment image" className="h-[40px] w-auto"/>
									</div>
									<div>
										<Image src="/img/svg/amex.svg" width={65} height={40} alt="Payment image" className="h-[40px] w-auto"/>
									</div>
									<div>
										<Image src="/img/svg/jcb.svg" width={65} height={40} alt="Payment image" className="h-[40px] w-auto"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}
