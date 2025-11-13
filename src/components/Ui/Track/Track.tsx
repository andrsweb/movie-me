"use client"

import { useState, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
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
	const [animatedTime, setAnimatedTime] = useState(0)

	useEffect(() => {
		if (isInView) {
			const duration = 3000
			const startTime = Date.now()
			
			const animate = () => {
				const elapsed = Date.now() - startTime
				const progress = Math.min(elapsed / duration, 1)
				const currentTime = progress * 1800
				
				setAnimatedTime(currentTime)
				
				if (progress < 1) {
					requestAnimationFrame(animate)
				} else {
					setShowPayment(true)
				}
			}
			
			animate()
		}
	}, [isInView])

	return (
		<div ref={trackRef} className={clsx(s.track, className)}>
			<div className={s.trackProgress}>
				<div className={s.trackBar}>
					<div 
						className={s.trackWatched}
						style={{ 
							width: `${(animatedTime / totalTime) * 100}%`
						}}
					/>
					<div 
						className={s.trackFill}
						style={{ 
							width: `${(animatedTime / totalTime) * 100}%`
						}}
					/>
					<div 
						className={s.trackThumb}
						style={{ 
							left: `${(animatedTime / totalTime) * 100}%`
						}}
					>
						<PaymentInfo 
							isVisible={showPayment}
							watchedMinutes={30}
							pricePerMinute={0.15}
						/>
					</div>
				</div>
				
				<div className={s.trackTime}>
					<span className={s.trackCurrent}>
						{formatTime(Math.round(animatedTime))}
					</span>
					<span className={s.trackTotal}>{formatTime(totalTime)}</span>
				</div>
			</div>
		</div>
	)
}
