'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface ButtonProps {
	children: React.ReactNode
	className?: string
	href?: string
	onClick?: () => void
	color: 'violet' | 'transparent' | "border"
	type?: 'button' | 'submit' | 'reset'
}

export default function Button({ children, className, href, onClick, color, type = 'button', }: ButtonProps) {
	const baseClasses = "flex justify-center items-center gap-1 cursor-pointer outline-none appearance-none select-none transition-[transform,background-color] ease-out duration-[0.2s] active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
	
	const colorClasses = {
		violet: "py-[8px] px-[21px] bg-[#B8B6FE] font-normal text-[18px] leading-[22px] text-[#0D1323] rounded-[5px] hover:bg-[#918fe2] md:py-[10px] md:px-[50px]",
		border: "py-[8px] px-[21px] bg-transparent border-[1px] border-[#B8B6FE] font-normal text-[18px] leading-[22px] text-[#B8B6FE] rounded-[5px] hover:bg-[#918fe2] md:py-[10px] md:px-[50px]",
		transparent: "bg-transparent border-transparent"
	}

	const classes = clsx(baseClasses, colorClasses[color], className)

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