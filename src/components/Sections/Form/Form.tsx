"use client"

import React,{ useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './Form.module.scss'
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
		console.log(`Submitted ${activeTab}:`, value)
	}

	return (
		<section className={s.form}>
			<h2 className="sr-only">
				No More Subscriptions. Just Stories No Flat Fees. Just the Minutes You Stream.
			</h2>
			<Container maxWidth={1200}>
				<div className={s.formWrapper}>
					<div className={s.formDesc}>
						<h3>
							<em>No More Subscriptions.</em>
							Just Stories.
						</h3>
						<p>No Flat Fees. Just the Minutes You Stream.</p>
					</div>
					
					<form onSubmit={handleSubmit} className={s.formContainer}>
						<div className={s.tabsContainer}>
							<motion.div 
								className={s.tabBackground}
								variants={tabBackgroundVariants}
								animate={activeTab}
								transition={tabTransition}
							/>
							<button 
								type="button"
								className={clsx(s.formButton, activeTab === 'email' && s.formButtonActive)}
								onClick={() => setActiveTab('email')}
							>
								Email
							</button>
							<button 
								type="button"
								className={clsx(s.formButton, activeTab === 'phone' && s.formButtonActive)}
								onClick={() => setActiveTab('phone')}
							>
								Phone
							</button>
						</div>

						<div className={s.inputContainer}>
							<AnimatePresence mode="wait">
								{activeTab === 'email' && (
									<motion.div
										key="email"
										variants={inputVariants}
										initial="hidden"
										animate="visible"
										exit="hidden"
										transition={inputTransition}
										className={s.inputWrapper}
									>
										<label htmlFor="email" className={s.inputLabel}>
											Email ID
										</label>
										<div className={s.inputGroup}>
											<input
												id="email"
												type="email"
												value={emailValue}
												onChange={(e) => setEmailValue(e.target.value)}
												placeholder="Enter Your Email ID"
												className={s.input}
												required
											/>
											<button type="submit" className={s.submitButton}>
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
										className={s.inputWrapper}
									>
										<label htmlFor="phone" className={s.inputLabel}>
											Phone Number
										</label>
										<div className={s.inputGroup}>
											<input
												id="phone"
												type="tel"
												value={phoneValue}
												onChange={(e) => setPhoneValue(e.target.value)}
												placeholder="Enter Your Phone Number"
												className={s.input}
												required
											/>
											<button type="submit" className={s.submitButton}>
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

					<Link href="#" className={s.browseLink}>
						I&#39;ll Browse First
					</Link>
				</div>
			</Container>
		</section>
	)
}