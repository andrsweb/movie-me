"use client"

import Container from "@/components/Common/Container/Container"
import GenreGrid from "@/components/Sections/Genre/GenreGrid/GenreGrid"
import GenreHero from "@/components/Sections/Genre/GenreHero/GenreHero"

interface GenreSummary {
	name: string
	slug: string
	count: number
}

type BreadcrumbItem = {
	label: string
	href?: string
}

interface GenresClientProps {
	genres: GenreSummary[]
	breadcrumbs: BreadcrumbItem[]
}

export default function GenresClient({ genres, breadcrumbs }: GenresClientProps) {
	return (
		<div className="w-full bg-[var(--color-dark)]">
			<GenreHero breadcrumbs={breadcrumbs} title="Browse Genres" />
			<GenreGrid genres={genres} />
		</div>
	)
}
