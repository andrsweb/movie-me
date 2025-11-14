"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import clsx from 'clsx'
import PaymentInfo from '../PaymentInfo/PaymentInfo'
import { formatTime } from '@/lib/utils'
import s from './Track.module.scss'

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
		<div ref={trackRef} className={clsx(s.track, className)}>
			<div className={s.trackProgress}>
				<div className={s.trackBar}>
					<motion.div 
						className={s.trackWatched}
						style={{ width: progressWidth }}
					/>
					<motion.div 
						className={s.trackFill}
						style={{ width: progressWidth }}
					/>
					<motion.div 
						className={s.trackThumb}
						style={{ left: progressWidth }}
					>
						<PaymentInfo 
							isVisible={showPayment}
							watchedMinutes={30}
							pricePerMinute={0.15}
						/>
					</motion.div>
				</div>
				
				<div className={s.trackTime}>
					<span className={s.trackCurrent}>
						{formatTime(currentTime)}
					</span>
					<span className={s.trackTotal}>{formatTime(totalTime)}</span>
				</div>
			</div>
		</div>
	)
}
