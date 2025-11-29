"use client"

import { useEffect, useRef, useState } from 'react'
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
		<section className="w-full py-[80px] bg-[var(--color-dark)]">
			<Container maxWidth={1400}>
				<div className="w-full flex flex-col items-start gap-[2px] max-w-[900px] mx-auto">
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
								className="w-full bg-[var(--color-dark)] relative"
							>
								<div className="absolute bottom-0 left-0 w-screen h-[1px] bg-[#162542]" style={{ marginLeft: 'calc(50% - 50vw)' }} />
								<button 
									className="w-full flex items-center justify-start gap-[20px] py-[24px] bg-transparent border-none cursor-pointer text-left transition-all ease-in-out relative hover:text-[var(--color-violet)]"
									style={{
										position: 'relative'
									}}
								>
									<div className="absolute top-[-2px] left-0 w-screen h-full bg-[#162542] transition-opacity ease-in-out z-0 pointer-events-none" style={{ marginLeft: 'calc(50% - 50vw)', opacity: isActive ? 1 : 0 }} />
									<div className="w-[40px] h-[40px] flex items-center justify-center transition-[background-color] ease-in-out duration-700 relative z-[1] flex-shrink-0" style={{ backgroundColor: isActive ? 'var(--color-blue)' : 'transparent' }}>
										<Image
											src="/img/svg/step-arrow.svg"
											width={30}
											height={15}
											alt="Arrow"
											className="w-auto h-[10px] transition-transform ease-in-out duration-700 xl:h-[14px]"
											style={{ transform: isActive ? 'rotate(-90deg)' : 'rotate(0deg)' }}
										/>
									</div>
									<h3 className={clsx("font-normal text-[18px] leading-[24px] transition-colors ease-in-out relative z-[1] md:text-[24px] md:leading-[32px] xl:text-[32px] xl:leading-[48px]", {
										"text-[var(--color-violet)]": isActive,
										"text-[var(--color-white)]": !isActive
									})}>{item.title}</h3>
								</button>
								<div
									className="h-0 overflow-hidden transition-[height] ease-in-out duration-1000"
									style={{ height: contentHeight }}
								>
									<div
										ref={contentRef}
										className="font-normal text-[#d1d5db] text-[16px] leading-[24px] whitespace-pre-line pb-[32px] md:text-[18px] md:leading-[28px]"
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