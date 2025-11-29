'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useClickOutside } from '@/hooks/useClickOutside'

interface CustomSelectProps {
	options: string[]
	defaultValue: string
	onSelect?: (value: string) => void
}

const dropdownVariants = {
	hidden: {
		opacity: 0,
		y: -10,
		scale: 0.95
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1
	}
}

const arrowVariants = {
	closed: { rotate: 0 },
	open: { rotate: 180 }
}

export default function CustomSelect({ options, defaultValue, onSelect }: CustomSelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState(defaultValue)
	const selectRef = useRef<HTMLDivElement>(null)

	useClickOutside(selectRef, () => setIsOpen(false))

	const handleSelect = (value: string) => {
		setSelectedValue(value)
		setIsOpen(false)
		onSelect?.(value)
	}

	return (
		<div
			className="relative inline-block"
			ref={selectRef}
		>
			<button
				className="flex min-w-[100px] cursor-pointer items-center justify-center gap-[12px] rounded-[10px] border-0 bg-[var(--color-blue)] px-[20px] py-[12px] text-[16px] leading-[20px] text-[var(--color-white)] backdrop-blur-[10px] transition-all duration-200 ease-in-out hover:opacity-[var(--opacity-base)] md:min-w-[140px] md:py-[16px] md:text-[18px] md:leading-[22px]"
				onClick={() => setIsOpen(!isOpen)}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				type="button"
			>
				<span className="text-left">{selectedValue}</span>
				<motion.div
					className="flex h-[14px] w-[14px] items-center justify-center"
					variants={arrowVariants}
					animate={isOpen ? 'open' : 'closed'}
					transition={{ duration: 0.2, ease: 'easeInOut' }}
				>
					<Image
						className="h-full w-full"
						src="/img/svg/step-arrow.svg"
						alt="Arrow"
						width={20}
						height={20}
					/>
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="absolute left-0 right-0 top-[calc(100%+8px)] z-[1000] overflow-hidden rounded-[12px] border border-[rgba(255,255,255,0.2)] bg-[rgba(13,19,35,0.95)] backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
						variants={dropdownVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.2, ease: 'easeOut' }}
					>
						{options.map((option) => (
							<button
								key={option}
								className="w-full border-b border-b-[rgba(255,255,255,0.1)] bg-transparent px-[20px] py-[14px] text-left text-[16px] leading-[20px] text-[var(--color-white)] transition-all duration-150 ease-in-out last:border-b-0 hover:bg-[rgba(184,182,254,0.1)] hover:text-[var(--color-violet)]"
								onClick={() => handleSelect(option)}
								type="button"
							>
								{option}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
