import Container from "@/components/Common/Container/Container"
import GenreCollectionCard from "@/components/Sections/Genre/GenreCollectionCard/GenreCollectionCard"

interface GenreSummary {
	name: string
	slug: string
	count: number
}

interface GenreGridProps {
	genres: GenreSummary[]
}

export default function GenreGrid({ genres }: GenreGridProps) {
	return (
		<section className="w-full">
			<Container maxWidth={1380} className="pb-[60px] md:pb-[80px]">
				<div className="flex w-full flex-wrap gap-[10px] md:gap-[20px]">
					{genres.map((genre) => (
						<GenreCollectionCard
							key={genre.slug}
							href={`/genres/${genre.slug}`}
							title={`${genre.name} Movies`}
							subtitle={`${genre.count} items`}
							className="basis-full md:w-[calc((100%-20px)/2)] md:basis-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] lg:basis-[calc((100%-40px)/3)] xxl:w-[calc((100%-60px)/4)] xxl:basis-[calc((100%-60px)/4)]"
						/>
					))}
				</div>
			</Container>
		</section>
	)
}
