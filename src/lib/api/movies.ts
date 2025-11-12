import type { Movie } from '@/types/movie'

export async function fetchMovies(limit: number = 48): Promise<Movie[]> {
	try {
		const response = await fetch(`/api/movies?limit=${limit}`)
		if (!response.ok) {
			throw new Error('Failed to fetch movies')
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching movies:', error)
		return []
	}
}
