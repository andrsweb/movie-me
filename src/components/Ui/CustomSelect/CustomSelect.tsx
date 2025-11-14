'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useClickOutside } from '@/hooks/useClickOutside'
import s from './CustomSelect.module.scss'

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
		<div className={s.customSelect} ref={selectRef}>
			<button
				className={s.selectButton}
				onClick={() => setIsOpen(!isOpen)}
				type="button"
			>
				<span className={s.selectedValue}>{selectedValue}</span>
				<motion.div
					className={s.arrowWrapper}
					variants={arrowVariants}
					animate={isOpen ? 'open' : 'closed'}
					transition={{ duration: 0.2, ease: 'easeInOut' }}
				>
					<Image src="/img/svg/step-arrow.svg" alt="Arrow" width={20} height={20} />
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={s.dropdown}
						variants={dropdownVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.2, ease: 'easeOut' }}
					>
						{options.map((option) => (
							<button
								key={option}
								className={s.option}
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
