"use client"

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { getTrailContainerVariants, getTrailContentVariants, getTrailGhostVariants, trailTransition,
	trailContentDelayOffset, type TrailDirection } from '@/lib/animations'
import s from './TrailText.module.scss'

interface TrailTextProps {
	children: React.ReactNode
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'em'
	show: boolean
	delay?: number
	className?: string
	containerDirection?: TrailDirection
	trailDirection?: TrailDirection
	mode?: 'show' | 'hide'
	highlighted?: boolean
}

export default function TrailText({
	children,
	as = 'span',
	show,
	delay = 0,
	className = '',
	containerDirection = 'bottom',
	trailDirection = 'right',
	mode = 'show',
	highlighted = false
}: TrailTextProps) {
	const shouldAnimate = mode === 'hide' ? !show : show
	const initialState = mode === 'hide' ? 'visible' : 'hidden'
	const prefersReducedMotion = useReducedMotion()
	const Component = as

	const containerVariants = React.useMemo(
		() => getTrailContainerVariants(containerDirection),
		[containerDirection]
	)
	const contentVariants = React.useMemo(
		() => getTrailContentVariants(trailDirection),
		[trailDirection]
	)
	const ghostVariants = React.useMemo(
		() => getTrailGhostVariants(trailDirection),
		[trailDirection]
	)

	return (
		<motion.div
			className={s.trailWrapper}
			initial={initialState}
			animate={shouldAnimate ? "visible" : "hidden"}
			variants={prefersReducedMotion ? {} : containerVariants}
			transition={prefersReducedMotion ? {} : { ...trailTransition, delay }}
		>
			<Component className={`${s.trailText} ${highlighted ? s.highlighted : ''} ${className}`}>
				<motion.span
					className={s.trailGhost}
					initial={initialState}
					animate={shouldAnimate ? "visible" : "hidden"}
					variants={prefersReducedMotion ? {} : ghostVariants}
					transition={prefersReducedMotion ? {} : { ...trailTransition, delay }}
					aria-hidden="true"
				>
					{children}
				</motion.span>
				<motion.span
					className={s.trailContent}
					initial={initialState}
					animate={shouldAnimate ? "visible" : "hidden"}
					variants={prefersReducedMotion ? {} : contentVariants}
					transition={prefersReducedMotion ? {} : { ...trailTransition, delay: delay + trailContentDelayOffset }}
				>
					{children}
				</motion.span>
			</Component>
		</motion.div>
	)
}
