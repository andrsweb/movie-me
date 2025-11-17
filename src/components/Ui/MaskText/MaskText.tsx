"use client"

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { maskTextVariants, maskTransition } from '@/lib/animations'
import clsx from 'clsx'
import s from './MaskText.module.scss'

interface MaskTextProps {
	children: React.ReactNode
	show: boolean
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
	className?: string
	delay?: number
}

export default function MaskText({ children, show, as = 'div', className, delay = 0 }: MaskTextProps) {
	const prefersReducedMotion = useReducedMotion()
	const Component = motion[as]

	return (
		<Component
			className={clsx(s.maskText, className)}
			initial="hidden"
			animate={show ? "visible" : "hidden"}
			variants={prefersReducedMotion ? {} : maskTextVariants}
			transition={prefersReducedMotion ? {} : { ...maskTransition, delay }}
		>
			{children}
		</Component>
	)
}