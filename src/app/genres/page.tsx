import { Metadata } from 'next'
import Link from 'next/link'
import moviesData from '@/data/movies.json'

export const metadata: Metadata = {
  title: 'Categories | MovieMe',
  description: 'Browse all movie genres'
}

export default function CategoriesPage() {
  // Get unique genres from movies data
  const genres = Array.from(new Set(moviesData.map((movie) => movie.genre)))
    .map(genre => ({
      name: genre,
      slug: genre.toLowerCase(),
      count: moviesData.filter((m) => m.genre === genre).length
    }))
    .sort((a, b) => b.count - a.count)
  
  return (
    <div className="min-h-screen bg-[var(--color-dark)] py-8 px-4">
      <h1 className="text-4xl font-bold text-white mb-8">Browse Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {genres.map((genre) => (
          <Link 
            key={genre.slug} 
            href={`/genres/${genre.slug}`}
            className="block bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <h2 className="text-xl font-bold text-white mb-2">{genre.name}</h2>
            <p className="text-gray-400">{genre.count} movies</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
