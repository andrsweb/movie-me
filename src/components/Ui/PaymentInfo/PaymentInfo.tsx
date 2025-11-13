"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import s from './PaymentInfo.module.scss'

interface PaymentInfoProps {
	isVisible: boolean
	watchedMinutes: number
	pricePerMinute: number
}

export default function PaymentInfo({ 
	isVisible, 
	watchedMinutes, 
}: PaymentInfoProps) {

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div 
					className={s.paymentInfo}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 20 }}
					transition={{ duration: 0.3 }}
				>
					<div className={s.paymentContent}>
						<div className={s.paymentQuestion}>Watched only {watchedMinutes} mins?</div>
						<div className={s.paymentAnswer}>You pay only for {watchedMinutes} mins.</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
