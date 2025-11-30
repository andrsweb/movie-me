import {Metadata} from 'next'

import moviesData from '@/data/movies.json'
import type {Movie} from '@/types/movie'
import GenresClient from '@/Clients/GenresClient/GenresClient'

export const metadata: Metadata = {
	title: 'Categories | MovieMe',
	description: 'Browse all movie genres',
}

export default function CategoriesPage() {
	const genreMap = (moviesData as Movie[]).reduce(
		(acc, movie) => {
			const current = acc.get(movie.genre)
			if (!current) {
				acc.set(movie.genre, {
					name: movie.genre,
					slug: movie.genre.toLowerCase(),
					count: 1,
				})
				return acc
			}
			current.count += 1
			return acc
		},
		new Map<
			string,
			{
				name: string
				slug: string
				count: number
			}
		>()
	)

	const genres = Array.from(genreMap.values()).sort((a, b) => b.count - a.count)

	const breadcrumbs = [
		{label: 'Play', href: '/'},
		{label: 'Genres'},
	]

	return <GenresClient genres={genres} breadcrumbs={breadcrumbs} />
}
