"use client"

import type { Movie } from "@/types/movie";

import GenreHero from "@/components/Sections/Genre/GenreHero/GenreHero";
import GenreItems from "@/components/Sections/Genre/GenreItems/GenreItems";
import TrendingNow from "@/components/Sections/Single/TrendingNow/TrendingNow";

type BreadcrumbItem = {
	label: string
	href?: string
}

type RelatedGenre = {
	name: string
	slug: string
	posters: Movie[]
}

interface GenreClientProps {
	title: string
	movieCount: number
	movies: Movie[]
	relatedGenres: RelatedGenre[]
	breadcrumbs: BreadcrumbItem[]
}

export default function GenreClient({
	title,
	movies,
	relatedGenres,
	breadcrumbs,
}: GenreClientProps) {
	return (
		<div className="w-full bg-[var(--color-dark)]">
			<GenreHero
				breadcrumbs={breadcrumbs}
				title={`${title} Movies`}
			/>
			<GenreItems movies={movies} related={relatedGenres} />
            <TrendingNow containerWidth={1380} />
		</div>
	)
}
