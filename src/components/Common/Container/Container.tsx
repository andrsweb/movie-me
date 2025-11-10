'use client'

import React from 'react'
import clsx from 'clsx'
import s from './Container.module.scss'

interface ContainerProps {
	children: React.ReactNode
	maxWidth: number
	className?: string
}

export default function Container({ children, maxWidth, className }: ContainerProps) {
	const classes = clsx(s.container, className)

	return (
		<div className={classes} style={{ maxWidth: `${maxWidth}px`}}>
			{children}
		</div>
	)
}
