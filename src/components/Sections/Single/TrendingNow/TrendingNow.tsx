"use client"

import Image from 'next/image'
import Link from 'next/link'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import Container from '@/components/Common/Container/Container'

interface TrendingItem {
    title: string
    href: string
    image: string
}

interface TrendingNowProps {
    title?: string
    containerWidth?: number
}

const TRENDING_ITEMS: TrendingItem[] = [
    {
        title: 'A Kid Like Jake',
        href: '/movie/goodfellas?id=9',
        image: '/img/tr1.jpg',
    },
    {
        title: 'Ambush',
        href: '/movie/the-usual-suspects?id=23',
        image: '/img/tr2.jpg',
    },
    {
        title: 'Bar Fight',
        href: '/movie/the-godfather?id=38',
        image: '/img/tr3.jpg',
    },
]

export default function TrendingNow({title = 'Trending on MovieMe now', containerWidth=1540}: TrendingNowProps) {
    if (TRENDING_ITEMS.length === 0) return null

    return (
        <section className="w-full py-[15px] lg:py-[40px]">
            <h2 className="sr-only">{title}</h2>
            <Container maxWidth={containerWidth}>
                <h3 className="text-[16px] leading-[20px] font-normal text-[var(--color-pop-corn)] md:text-[26px] lg:text-[32px] lg:leading-[48px]">
                    {title}
                </h3>

                <div className="group/slider relative mt-[20px]">
                    <Swiper
                        slidesPerView={1.2}
                        spaceBetween={20}
                        breakpoints={{
                            480: {slidesPerView: 1.6},
                            768: {slidesPerView: 2.2},
                            992: {slidesPerView: 3},
                        }}
                        className="!m-0 !overflow-visible"
                    >
                        {TRENDING_ITEMS.map((movie) => (
                            <SwiperSlide key={movie.href} className="!h-auto">
                                <Link
                                    href={movie.href}
                                    className="group/card relative block h-full overflow-hidden rounded-[4px]"
                                    aria-label={`Trending movie ${movie.title}`}
                                >
                                    <div className="relative aspect-[16/9] w-full">
                                        <Image
                                            src={movie.image}
                                            alt={movie.title}
                                            fill
                                            className="object-cover rounded-[4px]"
                                            sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                                            priority={false}
                                        />
                                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(9,12,20,0.96)] via-[rgba(13,19,35,0.7)] to-transparent p-[18px] opacity-90 transition-opacity duration-200 group-hover/card:opacity-100">
                                            <p className="text-[16px] font-semibold text-white md:text-[18px] lg:text-[20px]">
                                                {movie.title}
                                            </p>
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
