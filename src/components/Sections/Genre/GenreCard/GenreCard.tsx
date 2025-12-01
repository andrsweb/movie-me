import Link from "next/link"
import Image from "next/image"
import type {Movie} from "@/types/movie"

interface GenreCardProps {
    genre: {
        name: string
        slug: string
        posters: Movie[]
    }
    className?: string
}

const baseClasses = "flex w-full flex-col gap-[10px] rounded-[10px] bg-[#162542] p-[20px] !pr-0 transition-opacity duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-50 md:w-[calc((100%-20px)/2)] md:gap-[20px] md:p-[30px]"

export default function GenreCard({genre, className}: GenreCardProps) {
    const combinedClassName = className ? `${baseClasses} ${className}` : baseClasses

    return (
        <Link
            href={`/genres/${genre.slug}`}
            className={combinedClassName}
            prefetch={false}
        >
            <h3 className="text-[18px] font-bold leading-[22px] text-[var(--color-pop-corn)] md:text-[32px] md:leading-[48px]">
                {genre.name} Movies
            </h3>
            <div className="relative flex w-full overflow-hidden">
                <div className="-mr-[36px] flex items-center gap-[8px] whitespace-nowrap">
                    {genre.posters.map((poster) => (
                        <div
                            key={poster.id}
                            className="relative h-[121px] w-[81px] flex-shrink-0 rounded-[2px] md:h-[176px] md:w-[119px]"
                        >
                            <Image
                                fill
                                src={poster.src}
                                alt={poster.title}
                                className="h-full w-full rounded-[2px] object-cover"
                                sizes="(max-width: 767px) 81px, 119px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}
