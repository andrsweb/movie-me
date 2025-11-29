"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import clsx from 'clsx'
import PaymentInfo from '../PaymentInfo/PaymentInfo'
import { formatTime } from '@/lib/utils'

interface TrackProps {
	totalTime: number
	className?: string
}

export default function Track({ totalTime, className }: TrackProps) {
	const trackRef = useRef<HTMLDivElement>(null)
	const isInView = useInView(trackRef, { once: true })
	const [showPayment, setShowPayment] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const prefersReducedMotion = useReducedMotion()
	
	const animatedTime = useMotionValue(0)
	const springTime = useSpring(animatedTime, { 
		stiffness: 50, 
		damping: 30,
		duration: prefersReducedMotion ? 0.1 : 3
	})
	const progressWidth = useTransform(springTime, (value) => `${(value / totalTime) * 100}%`)

	useEffect(() => {
		return springTime.on( "change", ( latest ) => {
			setCurrentTime( Math.round( latest ) )
		} )
	}, [springTime])

	useEffect(() => {
		if (isInView) {
			const targetTime = 1800
			animatedTime.set(targetTime)
			
			const timer = setTimeout(() => {
				setShowPayment(true)
			}, prefersReducedMotion ? 100 : 3000)
			
			return () => clearTimeout(timer)
		}
	}, [isInView, animatedTime, prefersReducedMotion])

	return (
		<div ref={trackRef} className={clsx("w-full absolute bottom-0 left-0 p-5 will-change-[transform,opacity] md:pb-[100px] md:px-5 md:pt-5 xl:p-8 xl:pb-8", className)}>
			<div className="w-full">
				<div className="relative w-full h-1 bg-[#0C1828] rounded-[10px] cursor-pointer mb-3 md:h-2 md:rounded-[3px] md:mb-4">
					<motion.div 
						className="absolute top-0 left-0 h-full bg-[rgba(206,177,130,0.6)] rounded-[inherit] transition-[width] ease-in-out duration-200 will-change-width"
						style={{ width: progressWidth }}
					/>
					<motion.div 
						className="absolute top-0 left-0 h-full rounded-[10px] bg-[var(--color-gold)] will-change-width"
						style={{ width: progressWidth }}
					/>
					<motion.div 
						className="absolute top-1/2 w-4 h-4 bg-[var(--color-gold)] rounded-full cursor-pointer opacity-100 will-change-transform md:w-[29px] md:h-[29px]"
						style={{ left: progressWidth, transform: 'translateX(-100%) translateY(-50%)' }}
					>
						<PaymentInfo 
							isVisible={showPayment}
							watchedMinutes={30}
							pricePerMinute={0.15}
						/>
					</motion.div>
				</div>
				
				<div className="flex justify-between items-center font-normal text-[14px] leading-[18px] text-[var(--color-white)] md:text-[22px] md:leading-[30px]">
					<span>
						{formatTime(currentTime)}
					</span>
					<span>{formatTime(totalTime)}</span>
				</div>
			</div>
		</div>
	)
}
