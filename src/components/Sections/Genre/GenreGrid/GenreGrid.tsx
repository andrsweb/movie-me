import Container from "@/components/Common/Container/Container"
import GenreCard from "@/components/Sections/Genre/GenreCard/GenreCard"
import moviesData from "@/data/movies.json"
import type { Movie } from "@/types/movie"

interface GenreSummary {
	name: string
	slug: string
	count: number
}

interface GenreGridProps {
	genres: GenreSummary[]
}

export default function GenreGrid({ genres }: GenreGridProps) {
	const movies = moviesData as Movie[]
	
	return (
		<section className="w-full">
			<Container maxWidth={1540} className="pb-[60px] md:pb-[80px]">
				<div className="flex w-full flex-wrap gap-[10px] md:gap-[20px]">
					{genres.map((genre) => {
						const genreMovies = movies.filter(movie => movie.genre === genre.name).slice(0, 10)//Change this num to set images/items in card
						
						return (
							<GenreCard
								key={genre.slug}
								genre={{
									name: genre.name,
									slug: genre.slug,
									posters: genreMovies
								}}
								className="basis-full md:w-[calc((100%-20px)/2)] md:basis-[calc((100%-20px)/2)] xl:w-[calc((100%-40px)/3)] xl:basis-[calc((100%-40px)/3)]"
							/>
						)
					})}
				</div>
			</Container>
		</section>
	)
}
