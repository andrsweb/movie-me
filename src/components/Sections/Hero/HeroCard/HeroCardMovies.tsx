"use client"

import type { RefObject } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import MaskText from "@/components/Ui/MaskText/MaskText"
import { getStaggerContainerVariants } from "@/lib/animations"
import type { Movie } from "@/types/movie"
import s from "./HeroCard.module.scss"

interface HeroCardMoviesProps {
	movies: Movie[]
	isExpanded: boolean
	cardsRef: RefObject<HTMLDivElement | null>
}

function HeroCardList({ data, start, end }: { data: Movie[]; start: number; end: number }) {
	return data.slice(start, end).map(item => (
		<motion.div
			key={item.id}
			className={s.heroCardItem}
		>
			<Link href="#">
				<Image src={item.src} width={150} height={226} alt={item.title} />
				<div className={s.itemPrice}><span>Less than ${item.price}</span></div>
			</Link>
		</motion.div>
	))
}

export default function HeroCardMovies({ movies, isExpanded, cardsRef }: HeroCardMoviesProps) {
	return (
		<div className={s.heroMovies}>
			<motion.div
				ref={cardsRef}
				className={s.heroCardItems}
				variants={getStaggerContainerVariants("right")}
				initial="hidden"
				whileInView="visible"
				viewport={{ amount: 0.2, once: false }}
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
		</div>
	)
}
