"use client"

import {useMemo} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type {Movie} from '@/types/movie'
import Container from '@/components/Common/Container/Container'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'

interface MovieCarouselProps {
    currentMovie: Movie
    movies: Movie[]
    title?: string
}

export default function MovieCarousel({currentMovie, movies, title = 'Similar movies on MovieMe'}: MovieCarouselProps) {
    const filteredMovies = useMemo(
        () => movies
            .filter((movie) => movie.id !== currentMovie.id && movie.genre === currentMovie.genre)
            .slice(0, 10),
        [movies, currentMovie.id, currentMovie.genre],
    )

    if (filteredMovies.length === 0) {
        return null
    }

    return (
        <section className="w-full py-[15px] lg:py-[40px]">
            <h2 className="sr-only">Hidden title for screanreaders</h2>
            <Container maxWidth={1540}>
                <h3 className="text-[16px] leading-[20px] font-normal text-[var(--color-pop-corn)] md:text-[26px] lg:text-[32px] lg:leading-[48px]">
                    {title}
                </h3>

                <div className="group relative mt-[10px]">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        breakpoints={{
                            480: {slidesPerView: 2},
                            768: {slidesPerView: 3,spaceBetween: 20}
                        }}
                        className="!overflow-visible w-[120px] sm:w-[250px] md:w-[380px] lg:w-[610px] !m-0"
                    >
                        {filteredMovies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <Link
                                    href={`/movie/${movie.slug}?id=${movie.id}`}
                                    className="group/card relative block h-[180px] w-[120px] flex-shrink-0 lg:h-[286px] lg:w-[190px]"
                                    data-movie-card
                                >
                                    <div
                                        className="relative h-full overflow-hidden rounded-[4px] bg-[var(--color-dark)]"
                                    >
                                        <Image
                                            src={movie.src}
                                            alt={movie.title}
                                            fill
                                            className="object-cover rounded-[4px]"
                                            sizes="(max-width: 768px) 160px, (max-width: 992px) 190px, 190px"
                                            priority={false}
                                        />
                                        <div
                                            className="pointer-events-none absolute inset-0 flex items-end justify-center p-[12px] opacity-0 translate-y-3 transition-all duration-300 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover/card:translate-y-0"
                                            style={{
                                                background: 'linear-gradient(to top, rgba(9,12,20,0.96), rgba(13,19,35,0.88), rgba(206,177,130,0.6), rgba(206,177,130,0.08))'
                                            }}
                                        >
                                            <div className="text-center">
                                                <p className="text-[13px] font-semibold text-[var(--color-gold)]  md:text-[14px] lg:text-[16px]">
                                                    {movie.title}
                                                </p>
                                                <span className="text-[12px] text-[var(--color-pop-corn)] md:text-[13px] lg:text-[14px]">
                                                    {movie.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </section>
    )
}