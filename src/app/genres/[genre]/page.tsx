import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import moviesData from '@/data/movies.json'
import Breadcrumbs from '@/components/Ui/Breadcrumbs/Breadcrumbs'

interface CategoryPageProps {
  params: Promise<{
    genre: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { genre } = await params
  const genreTitle = genre.charAt(0).toUpperCase() + genre.slice(1)
  
  return {
    title: `${genreTitle} Movies | MovieMe`,
    description: `Browse ${genreTitle.toLowerCase()} movies on MovieMe`
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { genre } = await params
  // Filter movies by genre
  const movies = moviesData.filter((movie) => 
    movie.genre.toLowerCase() === genre.toLowerCase()
  )
  
  if (movies.length === 0) {
    notFound()
  }

  const genreTitle = genre.charAt(0).toUpperCase() + genre.slice(1)

  return (
    <div className="min-h-screen bg-[var(--color-dark)]">
      {/* Breadcrumbs */}
      <div className="px-4 pt-8">
        <Breadcrumbs items={[
          { label: 'Play', href: '/' },
          { label: 'Genres', href: '/genres' },
          { label: genreTitle }
        ]} />
      </div>

      {/* Category Header */}
      <div className="py-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-2">{genreTitle}</h1>
        <p className="text-gray-300 mb-2">Browse {genreTitle.toLowerCase()} movies</p>
        <p className="text-sm text-gray-400">{movies.length} movies</p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pb-8">
        {movies.map((movie) => (
          <a 
            key={movie.id} 
            href={`/movie/${movie.slug}?id=${movie.id}`}
            className="block bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
          >
            <div className="aspect-video relative">
              <img 
                src={movie.src} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold truncate">{movie.title}</h3>
              <p className="text-gray-400 text-sm">{movie.year}</p>
              <p className="text-yellow-400 font-bold">${movie.price}/min</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
