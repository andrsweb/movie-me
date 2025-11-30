"use client"

import Link from "next/link"
import Container from "@/components/Common/Container/Container"
import LeadCaptureForm from "./LeadCaptureForm"

export default function Form() {
	return (
		<section className="w-full py-[100px] bg-[var(--color-dark)]">
			<h2 className="sr-only">
				No More Subscriptions. Just Stories No Flat Fees. Just the Minutes You Stream.
			</h2>
			<Container maxWidth={1200}>
				<div className="w-full max-w-[707px] flex flex-col items-center gap-[30px] text-center mx-auto md:gap-[70px]">
					<div className="flex flex-col gap-[20px]">
						<h3 className="flex flex-col font-bold text-[32px] leading-[48px] text-[var(--color-white)] md:text-[60px] md:leading-[60px]">
							<em className="relative z-[1]" style={{ fontStyle: 'normal' }}>
								No More Subscriptions.
								<span className="absolute left-1/2 bottom-[5%] block w-[105%] h-[15%] opacity-100 bg-[var(--color-blue)] z-[-1] md:h-[20%] md:bottom-[15%]" style={{ transform: 'translateX(-50%)' }} />
							</em>
							Just Stories.
						</h3>
						<p className="font-normal text-[16px] leading-[20px] text-[var(--color-white)] md:text-[22px] md:leading-[30px]">No Flat Fees. Just the Minutes You Stream.</p>
					</div>

					<LeadCaptureForm />

					<Link href="#" className="w-full max-w-[350px] font-bold text-[18px] leading-[22px] py-[15px] px-[30px] border border-[#4F77C5] text-[#4F77C5] mr-auto rounded-[5px] transition-all ease-in-out hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] md:py-[20px]">
						I&#39;ll Browse First
					</Link>
				</div>
			</Container>
		</section>
	)
}