import moviesData from '@/data/movies.json';
import {Movie} from '@/types/movie';
import MovieSingleHero from "@/components/Sections/Single/MovieSingleHero/MovieSingleHero";
import MovieSingleInfo from "@/components/Sections/Single/MovieSingleInfo/MovieSingleInfo";
import MovieCarousel from "@/components/Sections/Single/MovieCarousel/MovieCarousel";
import TrendingNow from "@/components/Sections/Single/TrendingNow/TrendingNow";
import Bill from "@/components/Sections/Home/Bill/Bill";
import Cta from "@/components/Sections/Home/Cta/Cta";
import Blocks from "@/components/Sections/Single/Blocks/Blocks";

interface MovieSingleClientProps {
    movie: Movie
}

export default function MovieSingleClient({movie}: MovieSingleClientProps) {
    const similarMovies = moviesData //Replace this with your api

    return (
        <div className="w-full">
            <MovieSingleHero movie={movie}/>
            <MovieSingleInfo movie={movie}/>
            <MovieCarousel currentMovie={movie} movies={similarMovies} />
            <TrendingNow />
            <Blocks />
            <Bill />
            <Cta form={true} />
        </div>
    )
}