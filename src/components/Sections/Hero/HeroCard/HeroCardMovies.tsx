"use client"

import type { RefObject } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import MaskText from "@/components/Ui/MaskText/MaskText"
import type { Movie } from "@/types/movie"
import s from "./HeroCard.module.scss"

interface HeroCardMoviesProps {
	movies: Movie[]
	isExpanded: boolean
	cardsRef: RefObject<HTMLDivElement | null>
}

function HeroCardList({ data, start, end }: { data: Movie[]; start: number; end: number }) {
	return data.slice(start, end).map(item => (
		<div key={item.id} className={s.heroCardItem}>
			<Link href={`/movie/${item.id}`}>
				<Image src={item.src} width={150} height={226} alt={item.title} />
				<div className={s.itemPrice}><span>Less than ${item.price}</span></div>
			</Link>
		</div>
	))
}

export default function HeroCardMovies({ movies, isExpanded, cardsRef }: HeroCardMoviesProps) {
	return (
		<>
			<motion.div
				ref={cardsRef}
				className={s.heroCardItems}
			>
				{movies.length > 0 && <HeroCardList data={movies} start={0} end={24} />}
			</motion.div>
			<motion.div
				className={s.heroCardItemsText}
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "0px 0px -200px 0px" }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				<MaskText
					as="h3"
					show={isExpanded}
					className={s.heroCardItemsTextTitle}
				>
					With MovieMe there are <br />
					<span>
						no monthly fees
					</span>
				</MaskText>
				<MaskText
					as="h3"
					show={isExpanded}
					className={s.heroCardItemsTextSubtitle}
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
			<motion.div
				className={s.heroCardItems}
			>
				{movies.length > 0 && <HeroCardList data={movies} start={24} end={48} />}
			</motion.div>
		</>
	)
}
