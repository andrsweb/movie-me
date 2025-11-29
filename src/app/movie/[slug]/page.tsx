import MovieSingleClient from "@/Clients/MovieSingleClient/MovieSingleClient";
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import moviesData from '@/data/movies.json'

interface MoviePageProps {
    params: Promise<{
        slug: string
    }>
    searchParams: Promise<{
        id?: string
    }>
}

export async function generateMetadata({params, searchParams}: MoviePageProps): Promise<Metadata> {
    const {slug} = await params
    const {id} = await searchParams
    const movie = moviesData.find((m) => m.slug === slug && m.id === parseInt(id || '0'))

    if (!movie) {
        return {
            title: 'MovieMe | Movie not found'
        }
    }

    return {
        title: `${movie.title} | MovieMe`,
        description: movie.description
    }
}

export default async function MoviePage({params, searchParams}: MoviePageProps) {
    const {slug} = await params
    const {id} = await searchParams
    const movie = moviesData.find((m) => m.slug === slug && m.id === parseInt(id || '0'))

    if (!movie) notFound()

    return <MovieSingleClient movie={movie}/>
}
