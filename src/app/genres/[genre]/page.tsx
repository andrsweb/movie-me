import {Metadata} from 'next'
import {notFound} from 'next/navigation'

import moviesData from '@/data/movies.json'
import GenreClient from '@/Clients/GenreClient/GenreClient'

interface CategoryPageProps {
    params: Promise<{
        genre: string
    }>
}

export async function generateMetadata({params}: CategoryPageProps): Promise<Metadata> {
    const {genre} = await params
    const genreTitle = genre.charAt(0).toUpperCase() + genre.slice(1)

    return {
        title: `${genreTitle} Movies | MovieMe`,
        description: `Browse ${genreTitle.toLowerCase()} movies on MovieMe`
    }
}

export default async function CategoryPage({params}: CategoryPageProps) {
    const {genre} = await params
    const normalizedGenre = genre.toLowerCase()
    const movies = moviesData.filter((movie) =>
        movie.genre.toLowerCase() === normalizedGenre
    )

    if (movies.length === 0) {
        notFound()
    }

    const genreTitle = genre.charAt(0).toUpperCase() + genre.slice(1)
    const topThirtyMovies = movies.slice(0, 30)
    const relatedGenres = Array.from(new Set(moviesData.map((movie) => movie.genre)))
        .filter((genreName) => genreName.toLowerCase() !== normalizedGenre)
        .slice(0, 4)
        .map((genreName) => {
            const posters = moviesData
                .filter((movie) => movie.genre === genreName)
                .slice(0, 5)

            return {
                name: genreName,
                slug: genreName.toLowerCase(),
                posters,
            }
        })

    const breadcrumbs = [
        {label: 'Play', href: '/'},
        {label: 'Genres', href: '/genres'},
        {label: genreTitle},
    ]

    return (
        <GenreClient
            title={genreTitle}
            movieCount={movies.length}
            movies={topThirtyMovies}
            relatedGenres={relatedGenres}
            breadcrumbs={breadcrumbs}
        />
    )
}
