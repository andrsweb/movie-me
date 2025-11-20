"use client"

import { useEffect, useRef, useState } from 'react'
import s from './Dropdowns.module.scss'
import Container from "@/components/Common/Container/Container"
import Image from "next/image"
import clsx from 'clsx'

type DropdownItem = {
	id: number;
	title: string;
	content: string;
}

const dropdownItems: DropdownItem[] = [
	{ 
		id: 1, 
		title: "What is MovieMe?", 
		content: "MovieMe is a smart streaming guide and transactional video-on-demand (TVOD) platform that brings personalized recommendations, OTT search tools, and a unique pay-per-minute model — all into one easy-to-use app. Whether you're into international thrillers, Hollywood blockbusters, K-dramas, Bollywood Movies or daily sitcoms — MovieMe helps you:\n\n- Discover what to watch based on your interests\n- Find where it's streaming across 10+ OTT platforms\n- Pay only for the minutes you watch — no subscription required\n- Let's you enjoy an ad free experience\n- Manage a universal playlist\n- Get alerts when new episodes or trending titles go live\n- Track your watch history so you never lose your place\n\nNo subscriptions. No bundles. No Ads. Just pay for the minutes you see."
	},
	{ 
		id: 2, 
		title: "Who is it for?",
		content: "MovieMe is perfect for:\n - Movie and TV show enthusiasts who want personalized recommendations \n - Viewers who are tired of multiple streaming subscriptions \n - People who want to pay only for what they watch \n - Users looking for a unified platform to discover content across multiple streaming services \n - Anyone who wants an ad-free viewing experience without monthly commitments"
	},
	{ 
		id: 3, 
		title: "Why MovieMe?",
		content: "MovieMe offers a unique solution to modern streaming challenges: \n - No monthly subscriptions - pay only for the minutes you watch \n - Unified search across 10+ streaming platforms \n - Personalized recommendations based on your viewing preferences \n - Ad-free experience without the monthly cost \n - Universal playlist management across all platforms \n - Never lose your place with comprehensive watch history tracking \n - Get alerts for new episodes and trending content"
	},
]

export default function Dropdowns() {
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
	const contentRefs = useRef<(HTMLDivElement | null)[]>([])
	const [contentHeights, setContentHeights] = useState<number[]>([])

	const toggleDropdown = (id: number) => {
		if (activeDropdown === id) {
			setActiveDropdown(null)
		} else {
			setActiveDropdown(id)
		}
	}

	useEffect(() => {
		const nextHeights = dropdownItems.map((_, index) => {
			const element = contentRefs.current[index]
			return element ? element.scrollHeight : 0
		})
		setContentHeights(nextHeights)
	}, [activeDropdown])

	const handleMouseEnter = (id: number) => {
		setActiveDropdown(id)
	}

	const handleMouseLeave = () => {
		setActiveDropdown(null)
	}

	return (
		<section className={s.dropdowns}>
			<Container maxWidth={1400}>
				<div className={s.dropdownsItems}>
					{dropdownItems.map((item, index) => {
						const isActive = activeDropdown === item.id
						const contentRef = (element: HTMLDivElement | null) => {
							contentRefs.current[index] = element
						}
						const contentHeight = isActive
							? `${contentHeights[index] ?? 0}px`
							: "0px"

						return (
							<div 
								key={item.id}
								onClick={() => toggleDropdown(item.id)}
								onMouseEnter={() => handleMouseEnter(item.id)}
								onMouseLeave={handleMouseLeave}
								className={clsx(s.dropdownsItem, {
									[s.active]: isActive
								})}
							>
								<button 
									className={s.dropdownsHeader}
								>
									<div className={s.dropdownsArrow}>
										<Image
											src="/img/svg/step-arrow.svg"
											width={30}
											height={15}
											alt="Arrow"
										/>
									</div>
									<h3>{item.title}</h3>
								</button>
								<div
									className={s.dropdownsContent}
									style={{ height: contentHeight }}
								>
									<div
										ref={contentRef}
										className={s.dropdownsText}
									>
										{item.content}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</Container>
		</section>
	)
}