'use client'

import React from 'react'
import clsx from 'clsx'

interface ContainerProps {
	children: React.ReactNode
	maxWidth: number
}

export default function Container({ children, maxWidth }: ContainerProps) {
    const classes = clsx('w-full mx-auto px-[20px] md:px-[50px]')

	return (
		<div className={classes} style={{ maxWidth: `${maxWidth}px` }}>
			{children}
		</div>
	)
}
