'use client'

import React from 'react'
import clsx from 'clsx'

interface ContainerProps {
	children: React.ReactNode
	maxWidth: number
	className?: string
}

export default function Container({ children, maxWidth, className }: ContainerProps) {
    const classes = clsx(
        'w-full mx-auto px-[20px] md:px-[50px]',
        className,
    )

	return (
		<div className={classes} style={{ maxWidth: `${maxWidth}px` }}>
			{children}
		</div>
	)
}
