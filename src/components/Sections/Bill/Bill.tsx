"use client"

import { useRef } from "react"
import Image from 'next/image'
import Container from "@/components/Common/Container/Container"
import MaskText from "@/components/Ui/MaskText/MaskText"
import Button from "@/components/Ui/Button/Button"

export default function Bill() {
	const sectionRef = useRef<HTMLElement>(null)

	return (
		<section 
			ref={sectionRef}
			className="w-full py-[100px] relative bg-[var(--color-dark)] z-[60] will-change-[transform,opacity]"
		>
			<Container maxWidth={1520}>
				<h2 className="sr-only">Freedom and Control You decide your bill.</h2>
				<div className="w-full flex flex-col items-center gap-[40px] xl:gap-[80px]">
					<MaskText as="div" show={true} className="w-full flex flex-col items-center gap-[10px]">
						<h3 className="text-[var(--color-violet)] text-[32px] leading-[40px] md:text-[60px] md:leading-[70px] font-bold">Freedom and Control</h3>
						<span className="font-normal text-[28px] leading-[32px] text-[var(--color-violet)] md:text-[40px] md:leading-[70px]">You decide your bill.</span>
					</MaskText>
					<div className="w-full flex flex-col items-stretch gap-[20px] xl:flex-row">
						<div className="w-full flex flex-row items-end relative rounded-[20px] bg-[#162542] py-[50px] px-[30px] pt-[90px] xl:w-1/2 xl:py-[50px] xl:pt-[20px]">
							<div className="w-full max-w-full flex flex-col items-start gap-[20px] md:max-w-[70%]">
								<div className="flex flex-col items-start gap-[10px]">
									<h4 className="font-bold text-[32px] leading-[48px] text-[var(--color-white)] md:text-[44px] md:leading-[48px]">Prepaid</h4>
									<p className="font-normal text-[14px] leading-[18px] text-[#7183AA] md:text-[22px] md:leading-[30px]">Your time, your terms.</p>
								</div>
								<div className="flex flex-col items-start gap-[10px]">
									<h5 className="font-bold text-[22px] leading-[30px] text-[var(--color-white)] md:text-[32px] md:leading-[48px]">
										Load minutes once. <br/>
										Watch whenever.
									</h5>
									<p className="font-normal text-[14px] leading-[18px] text-[#7183AA] md:text-[22px] md:leading-[30px]">Your minutes never expire.</p>
								</div>
								<div className="w-full flex flex-col items-center justify-start gap-[10px] whitespace-nowrap sm:flex-row">
									<Button color="violet" href="#">Get <b>Prepaid</b></Button>
									<Button color="border" href="#"><b>Learn More</b></Button>
								</div>
							</div>
							<div className="absolute right-0 top-[20px] max-w-[150px] xs:right-[20px] sm:max-w-[230px] md:max-w-[248px]">
								<Image src="/img/wallet.gif" unoptimized width={210} height={184} alt="Wallet" className="w-full h-auto" />
							</div>
						</div>
						<div className="w-full flex flex-row items-end relative rounded-[20px] bg-[#162542] py-[50px] px-[30px] pt-[90px] xl:w-1/2 xl:py-[50px] xl:pt-[20px]">
							<div className="w-full max-w-full flex flex-col items-start gap-[20px] md:max-w-[70%]">
								<div className="flex flex-col items-start gap-[10px]">
									<h4 className="font-bold text-[32px] leading-[48px] text-[var(--color-white)] md:text-[44px] md:leading-[48px]">Postpaid</h4>
									<p className="font-normal text-[14px] leading-[18px] text-[#7183AA] md:text-[22px] md:leading-[30px]">Watch now. Pay later.</p>
								</div>
								<div className="flex flex-col items-start gap-[10px]">
									<h5 className="font-bold text-[22px] leading-[30px] text-[var(--color-white)] md:text-[32px] md:leading-[48px]">
										Enjoy the film first, <br/>
										we&#39;ll handle the math after.
									</h5>
									<p className="font-normal text-[14px] leading-[18px] text-[#7183AA] md:text-[22px] md:leading-[30px]">Only the minutes you watch count.</p>
								</div>
								<div className="w-full flex flex-col items-center justify-start gap-[10px] whitespace-nowrap sm:flex-row">
									<Button color="violet" href="#">Get <b>Postpaid</b></Button>
									<Button color="border" href="#"><b>Learn More</b></Button>
								</div>
							</div>
							<div className="absolute right-0 top-[20px] max-w-[150px] xs:right-[20px] sm:max-w-[230px] md:max-w-[248px]">
								<Image src="/img/card.gif" unoptimized width={248} height={135} alt="Laptop" className="w-full h-auto" />
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}