"use client"

import Image from "next/image"
import Link from "next/link"

import Container from "@/components/Common/Container/Container"
import GenreCard from "@/components/Sections/Genre/GenreCard/GenreCard"
import type { Movie } from "@/types/movie"

type RelatedGenre = {
	name: string
	slug: string
	posters: Movie[]
}

interface GenreItemsProps {
	movies: Movie[]
	related: RelatedGenre[]
}

const movieCardOverlayBackground = 'linear-gradient(to top, rgba(9,12,20,0.96), rgba(13,19,35,0.88), rgba(206,177,130,0.6), rgba(206,177,130,0.08))'

export default function GenreItems({ movies, related }: GenreItemsProps) {
	return (
		<section className="w-full bg-[var(--color-dark)]">
            <h2 className="sr-only">Hidden title for seo</h2>
			<Container maxWidth={1380} className="pb-[60px] md:pb-[80px]">
				<div className="flex w-full flex-col items-center gap-[40px]">
					<section className="flex w-full flex-wrap justify-center gap-[16px]">
						{movies.map((movie) => (
							<Link
								key={movie.id}
								href={`/movie/${movie.slug}?id=${movie.id}`}
								className="group relative block h-[185px] w-[123px] shrink-0 rounded-[4px] bg-[#162542] md:h-[294px] md:w-[196px]"
								prefetch={false}
							>
								<div className="relative h-full w-full">
									<Image
										fill
										src={movie.src}
										alt={movie.title}
										className="h-full w-full rounded-[4px] object-cover"
										sizes="(max-width: 767px) 123px, 196px"
									/>
									<div
										className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-[4px] p-[12px] opacity-0 translate-y-3 transition-all duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0"
										style={{ background: movieCardOverlayBackground }}
									>
										<div className="text-center">
											<p className="text-[13px] font-semibold text-[var(--color-gold)] md:text-[14px] lg:text-[16px]">
												${movie.price.toFixed(2)}/min
											</p>
											<span className="text-[12px] text-[var(--color-pop-corn)] md:text-[13px] lg:text-[14px]">
												{movie.year}
											</span>
										</div>
									</div>
								</div>
							</Link>
						))}
					</section>

					{related.length > 0 && (
						<section className="flex w-full flex-col gap-[24px]">
							<div className="flex w-full flex-wrap gap-[10px] md:gap-[20px]">
								{related.map((genre) => (
									<GenreCard
										key={genre.slug}
										genre={genre}
									/>
								))}
							</div>
						</section>
					)}
				</div>
			</Container>
		</section>
	)
}
