"use client"

import { useRef } from "react"
import Image from "next/image"

import Container from "@/components/Common/Container/Container"
import ProgressSlider from "@/components/Ui/ProgressSlider/ProgressSlider"

interface AboutProps {
	small?: boolean
}

export default function About({ small = false }: AboutProps) {
	const sectionRef = useRef<HTMLElement>(null)

	if (small) {
		return (
			<section
				ref={sectionRef}
				className="relative z-[55] w-full mt-0 bg-[#162542] rounded-[20px] p-[30px] lg:p-[40px] will-change-[transform,opacity]"
			>
				<h2 className="sr-only">Think of it like ordering pizza, you only pay for the slices you eat.</h2>
                <div className="flex w-full flex-col items-center lg:items-start">
                    <div className="w-full rounded-[24px] bg-[var(--color-blue-soft)]">
                        <AboutSmallContent />
                    </div>
                </div>
			</section>
		)
	}

	return (
		<section
			ref={sectionRef}
			className="relative z-[55] mt-0 bg-[var(--color-dark)] py-[100px] will-change-[transform,opacity] md:-mt-[80px] md:pt-[160px]"
		>
			<h2 className="sr-only">Think of it like ordering pizza, you only pay for the slices you eat.</h2>
			<Container maxWidth={1046}>
				<div className="flex flex-col items-start gap-[60px]">
					<div className="flex w-full flex-col items-start justify-between gap-[30px] sm:flex-row sm:p-0">
						<div className="flex w-full max-w-[193px] flex-col items-start gap-[30px] sm:max-w-[293px] md:max-w-[521px]">
							<span className="hidden text-[18px] font-normal leading-[22px] text-[var(--color-white)] md:block">
								How It Works
							</span>
							<h3 className="text-[22px] font-bold leading-[30px] text-[var(--color-white)] md:text-[60px] md:leading-[70px]">
								Think of it like ordering pizza,
								you only pay for the slices you eat.
							</h3>
						</div>
						<div className="absolute right-0 top-0 z-[-1] ml-auto flex shrink-0 items-center justify-center sm:right-[6%] md:relative md:h-[300px] md:w-[300px] md:right-auto md:top-auto">
							<Image className="h-full w-full" unoptimized src="/img/circle.gif" alt="circle.gif" width={220} height={220} />
						</div>
					</div>
					<div className="flex w-full flex-col items-start gap-[60px]">
						<div className="w-full">
							<ProgressSlider />
						</div>
						<div className="flex w-full flex-col items-start gap-[40px] md:flex-row">
							<div className="flex w-full max-w-[406px] flex-col items-start gap-[11px]">
								<p className="mb-0 text-[16px] font-normal leading-[20px] text-[var(--color-white)]">
									Add A Payment Method Via
								</p>
								<span className="mb-0 inline-flex flex-wrap items-center gap-[5px] text-[16px] font-normal leading-[20px] text-[var(--color-white)]">
									Debit Card, Credit Card etc. Securely Through
									<Image src="/img/svg/stripe.svg" width={65} height={40} alt="Payment image" />
								</span>
							</div>
							<div className="flex flex-col items-start gap-[11px]">
								<span className="mb-0 text-[16px] font-normal leading-[20px] text-[var(--color-white)]">
									Pay Easily With
								</span>
								<div className="flex flex-wrap items-center gap-[10px]">
									<div>
										<Image src="/img/svg/visa.svg" width={65} height={40} alt="Payment image" className="h-[40px] w-auto" />
									</div>
									<div>
										<Image src="/img/svg/master-card.svg" width={65} height={40} alt="Payment image" className="h-[40px] w-auto" />
									</div>
									<div>
										<Image src="/img/svg/amex.svg" width={65} height={40} alt="Payment image" className="h-[40px] w-auto" />
									</div>
									<div>
										<Image src="/img/svg/jcb.svg" width={65} height={40} alt="Payment image" className="h-[40px] w-auto" />
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

function AboutSmallContent() {
	return (
		<div className="flex w-full flex-col gap-[190px] md:gap-[100px] lg:gap-[150px]">
			<div className="flex flex-col gap-[24px] lg:flex-row lg:items-end lg:justify-between relative">
				<p className="max-w-[320px] text-[22px] font-bold leading-[30px] text-[var(--color-pop-corn)] md:text-[32px] md:leading-[48px]">
					Think of it like ordering pizza,
					you only pay for the slices you eat.
				</p>
				<div className="absolute right-[-5%] top-[70%] md:right-[-5%] md:top-[30%] lg:top-[60%] xl:top-[40%] flex items-center justify-center h-[200px] w-[200px] lg:h-[220px] lg:w-[220px] xl:h-[250px] xl:w-[250px]">
					<Image className="w-full h-full" unoptimized src="/img/circle.gif" alt="circle.gif" width={180} height={180} />
				</div>
			</div>
			<ProgressSlider variant="small" />
		</div>
	)
}
