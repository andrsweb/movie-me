"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PaymentInfoProps {
	isVisible: boolean
	watchedMinutes: number
	pricePerMinute: number
}

export default function PaymentInfo({ 
	isVisible, 
	watchedMinutes, 
}: PaymentInfoProps) {
	const [offsetX, setOffsetX] = useState(-30)

	useEffect(() => {
		const checkMd = () => setOffsetX(window.matchMedia('(min-width: 768px)').matches ? -50 : -30)
		checkMd()
		window.addEventListener('resize', checkMd)
		return () => window.removeEventListener('resize', checkMd)
	}, [])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div 
					className="absolute bottom-[100%] left-1/2 mb-[20px] z-[10] md:mb-[16px]"
					style={{ x: `${offsetX}%` }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
				>
					<div className="bg-[var(--color-dark)] rounded-[20px] py-[16px] px-[16px] w-[300px] md:py-[20px] md:px-[20px] md:w-[436px]">
						<div className="font-normal text-[16px] leading-[20px] text-[var(--color-white)] mb-1 md:text-[22px] md:leading-[30px]">Watched only {watchedMinutes} mins?</div>
						<div className="font-bold text-[22px] leading-[30px] text-[var(--color-white)] md:text-[32px] md:leading-[48px]">You pay only for {watchedMinutes} mins.</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
