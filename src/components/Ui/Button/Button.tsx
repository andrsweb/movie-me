'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import s from './Button.module.scss'

interface ButtonProps {
	children: React.ReactNode
	className?: string
	href?: string
	onClick?: () => void
	color: 'violet' | 'transparent' | "border"
	type?: 'button' | 'submit' | 'reset'
}

export default function Button({ children, className, href, onClick, color, type = 'button', }: ButtonProps) {
	const classes = clsx(s.button, s[color], className)

	if (href) {
		return (
			<Link href={href} className={classes}>
				{children}
			</Link>
		)
	}

	return (
		<button type={type} onClick={onClick} className={classes}>
			{children}
		</button>
	)
}