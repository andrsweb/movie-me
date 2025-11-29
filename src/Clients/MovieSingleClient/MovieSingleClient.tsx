import MovieSingleHero from "@/components/Sections/Single/MovieSingleHero/MovieSingleHero";
import MovieSingleInfo from "@/components/Sections/Single/MovieSingleInfo/MovieSingleInfo";
import {Movie} from '@/types/movie'

interface MovieSingleClientProps {
    movie: Movie
}

export default function MovieSingleClient({movie}: MovieSingleClientProps) {
    return (
        <div className="w-full">
            <MovieSingleHero movie={movie}/>
            <MovieSingleInfo movie={movie}/>
        </div>
    )
}