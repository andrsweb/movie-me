"use client"

import React,{ useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import Link from "next/link"
import Container from "@/components/Common/Container/Container"

type TabType = 'email' | 'phone'

const tabBackgroundVariants = {
	email: { x: 0 },
	phone: { x: '100%' }
}

const tabTransition = {
	duration: 0.3,
	ease: [0.25, 0.46, 0.45, 0.94] as const
}

const inputVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1
	}
}

const inputTransition = {
	duration: 0.4,
	ease: [0.25, 0.46, 0.45, 0.94] as const
}

export default function Form() {
	const [activeTab, setActiveTab] = useState<TabType>('email')
	const [emailValue, setEmailValue] = useState('')
	const [phoneValue, setPhoneValue] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const value = activeTab === 'email' ? emailValue : phoneValue
	}

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
					
					<form onSubmit={handleSubmit} className="w-full flex flex-col gap-[30px] mr-auto">
						<div className="relative flex rounded-[5px] max-w-[152px]" style={{
							'--after-content': '""',
							'--after-position': 'absolute',
							'--after-bottom': '0',
							'--after-left': '0',
							'--after-width': 'calc(100% - 1px)',
							'--after-height': 'calc(100% - 1px)',
							'--after-border-radius': '5px',
							'--after-outline': '1px solid #29406D'
						} as React.CSSProperties}>
							<div className="absolute bottom-0 left-0 w-[calc(100%-1px)] h-[calc(100%-1px)] rounded-[5px] border border-[#29406D] pointer-events-none" />
							<motion.div 
								className="absolute top-0 left-0 w-1/2 h-[calc(100%+1px)] bg-[var(--color-violet)] rounded-[8px] z-[2]"
								variants={tabBackgroundVariants}
								animate={activeTab}
								transition={tabTransition}
							/>
							<button 
								type="button"
								className={clsx("flex items-center justify-center relative py-[10px] px-[20px] bg-transparent rounded-[5px] w-[76px] border-0 min-h-[40px] font-semibold text-[14px] leading-[18px] cursor-pointer transition-colors ease-in-out z-[2] hover:text-[var(--color-white)]", activeTab === 'email' ? "text-[var(--color-black)]" : "text-[#7A7A7A]")}
								onClick={() => setActiveTab('email')}
							>
								Email
							</button>
							<button 
								type="button"
								className={clsx("flex items-center justify-center relative py-[10px] px-[20px] bg-transparent rounded-[5px] w-[76px] border-0 min-h-[40px] font-semibold text-[14px] leading-[18px] cursor-pointer transition-colors ease-in-out z-[2] hover:text-[var(--color-white)]", activeTab === 'phone' ? "text-[var(--color-black)]" : "text-[#7A7A7A]")}
								onClick={() => setActiveTab('phone')}
							>
								Phone
							</button>
						</div>

						<div className="relative max-w-[350px]">
							<AnimatePresence mode="wait">
								{activeTab === 'email' && (
									<motion.div
										key="email"
										variants={inputVariants}
										initial="hidden"
										animate="visible"
										exit="hidden"
										transition={inputTransition}
										className="flex flex-col gap-[12px]"
									>
										<label htmlFor="email" className="font-normal text-[14px] leading-[18px] text-[var(--color-white)] text-left">
											Email ID
										</label>
										<div className="relative flex items-center">
											<input
												id="email"
												type="email"
												value={emailValue}
												onChange={(e) => setEmailValue(e.target.value)}
												placeholder="Enter Your Email ID"
												className="w-full py-[16px] pr-[60px] pl-[20px] bg-transparent border-0 border-b border-[var(--color-white)] font-normal text-[16px] text-[var(--color-white)] backdrop-blur-[10px] transition-all ease-in-out placeholder:text-[var(--color-white)] placeholder:opacity-70 focus:outline-none focus:border-[var(--color-violet)] focus:bg-white/10 focus:rounded-[5px]"
												required
											/>
											<button type="submit" className="absolute right-0 top-1/2 w-[40px] h-[40px] bg-[var(--color-violet)] border-0 rounded-[8px] text-[var(--color-black)] cursor-pointer flex items-center justify-center transition-all ease-in-out hover:bg-[#6B5FD8] hover:scale-105" style={{ transform: 'translateY(-50%)' }}>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
													<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												</svg>
											</button>
										</div>
									</motion.div>
								)}

								{activeTab === 'phone' && (
									<motion.div
										key="phone"
										variants={inputVariants}
										initial="hidden"
										animate="visible"
										exit="hidden"
										transition={inputTransition}
										className="flex flex-col gap-[12px]"
									>
										<label htmlFor="phone" className="font-normal text-[14px] leading-[18px] text-[var(--color-white)] text-left">
											Phone Number
										</label>
										<div className="relative flex items-center">
											<input
												id="phone"
												type="tel"
												value={phoneValue}
												onChange={(e) => setPhoneValue(e.target.value)}
												placeholder="Enter Your Phone Number"
												className="w-full py-[16px] pr-[60px] pl-[20px] bg-transparent border-0 border-b border-[var(--color-white)] font-normal text-[16px] text-[var(--color-white)] backdrop-blur-[10px] transition-all ease-in-out placeholder:text-[var(--color-white)] placeholder:opacity-70 focus:outline-none focus:border-[var(--color-violet)] focus:bg-white/10 focus:rounded-[5px]"
												required
											/>
											<button type="submit" className="absolute right-0 top-1/2 w-[40px] h-[40px] bg-[var(--color-violet)] border-0 rounded-[8px] text-[var(--color-black)] cursor-pointer flex items-center justify-center transition-all ease-in-out hover:bg-[#6B5FD8] hover:scale-105" style={{ transform: 'translateY(-50%)' }}>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
													<path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
												</svg>
											</button>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</form>

					<Link href="#" className="w-full max-w-[350px] font-bold text-[18px] leading-[22px] py-[15px] px-[30px] border border-[#4F77C5] text-[#4F77C5] mr-auto rounded-[5px] transition-all ease-in-out hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] md:py-[20px]">
						I&#39;ll Browse First
					</Link>
				</div>
			</Container>
		</section>
	)
}