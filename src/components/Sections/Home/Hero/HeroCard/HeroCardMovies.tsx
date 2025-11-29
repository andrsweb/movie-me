"use client"

import type { RefObject } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import MaskText from "@/components/Ui/MaskText/MaskText"
import { getStaggerContainerVariants } from "@/lib/animations"
import type { Movie } from "@/types/movie"

interface HeroCardMoviesProps {
	movies: Movie[]
	isExpanded: boolean
	cardsRef: RefObject<HTMLDivElement | null>
}

function HeroCardList({ data, start, end }: { data: Movie[]; start: number; end: number }) {
	return data.slice(start, end).map(item => (
		<motion.div
			key={item.id}
			className="flex-shrink-0 w-[92px] h-[140px] md:w-[150px] md:h-[226px] relative transition-transform ease-in-out duration-[200ms] group"
		>
			<Link href={`/movie/${item.slug}?id=${item.id}`} className="w-full h-full block">
				<Image src={item.src} width={150} height={226} alt={item.title} className="w-full h-full object-cover rounded-[5px]" />
				<div className="absolute top-0 left-0 w-full h-full flex items-end justify-center p-[10px_10px_20px_10px] opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-[200ms]" style={{background: "linear-gradient(to top, rgb(13, 19, 15), rgba(13, 19, 40, 1), rgba(13, 19, 35, 0.8), rgba(13, 19, 35, 0.3), rgba(13, 19, 35, 0), rgba(13, 19, 35, 0))"}}>
					<span className="font-bold text-[10px] leading-[18px] text-center text-[var(--color-gold)] md:text-[14px]">Less than ${item.price}</span>
				</div>
			</Link>
		</motion.div>
	))
}

export default function HeroCardMovies({ movies, isExpanded, cardsRef }: HeroCardMoviesProps) {
	return (
		<div className="w-full">
			<motion.div
				ref={cardsRef}
				className="w-screen -ml-[50vw] pl-[50vw] px-[20px] flex items-stretch gap-[8px] md:gap-[20px] opacity-0 whitespace-nowrap relative min-h-[139px] md:min-h-[226px] justify-center"
				variants={getStaggerContainerVariants("right")}
				initial="hidden"
				whileInView="visible"
				viewport={{ amount: 0.2, once: false }}
			>
				{movies.length > 0 && <HeroCardList data={movies} start={0} end={24} />}
			</motion.div>
			<motion.div
				className="w-full flex flex-col items-center gap-[10px] px-[20px] py-[20px]"
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "0px 0px -200px 0px" }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				<MaskText
					as="h3"
					show={isExpanded}
					className="w-full text-center font-bold text-[32px] leading-[37px] text-[var(--color-white)] md:text-[32px] md:leading-[37px] lg:text-[64px] lg:leading-[70px]"
				>
					With MovieMe there are <br />
					<span>
						no monthly fees
					</span>
				</MaskText>
				<MaskText
					as="h3"
					show={isExpanded}
					className="w-full text-center font-bold text-[32px] leading-[37px] text-[var(--color-white)] md:text-[32px] md:leading-[37px] lg:text-[64px] lg:leading-[70px]"
					delay={1}
				>
					<br />
					<em>
						Just pay for the
					</em>
					<br />
					<em>
						movies you watch.
					</em>
				</MaskText>
			</motion.div>
		</div>
	)
}
