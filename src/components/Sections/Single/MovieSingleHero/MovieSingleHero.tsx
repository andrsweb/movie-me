'use client'

import { useState, useEffect, useRef } from 'react';
import { Movie } from '@/types/movie';
import Container from "@/components/Common/Container/Container";
import Breadcrumbs from "@/components/Ui/Breadcrumbs/Breadcrumbs";
import FullscreenSpinner from "@/components/Ui/FullscreenSpinner/FullscreenSpinner";
import Image from 'next/image';

interface MovieSingleHeaderProps {
    movie: Movie
}

export default function MovieSingleHero({ movie }: MovieSingleHeaderProps) {
    const [movieData, setMovieData] = useState<Movie | null>(() => movie)
    const [isMuted, setIsMuted] = useState(true)
    const [isDesktop, setIsDesktop] = useState(false)
    const desktopVideoRef = useRef<HTMLVideoElement | null>(null)
    const mobileVideoRef = useRef<HTMLVideoElement | null>(null)

    useEffect(() => {
        setMovieData(movie)
    }, [movie])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 992px)')
        const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsDesktop(event.matches)
        }
        handleChange(mediaQuery)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    useEffect(() => {
        const activeVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current
        const inactiveVideo = isDesktop ? mobileVideoRef.current : desktopVideoRef.current
        if (activeVideo) {
            activeVideo.muted = isMuted
            const playPromise = activeVideo.play()
            if (playPromise !== undefined) {
                playPromise.catch(() => {})
            }
        }
        if (inactiveVideo) {
            inactiveVideo.pause()
        }
    }, [isDesktop, isMuted])

    if (!movieData) {
        return <FullscreenSpinner />
    }

    const handleToggleMute = () => {
        const nextMuted = !isMuted
        setIsMuted(nextMuted)
    }

    return (
        <section className="relative lg:min-h-screen">
            <div className="hidden lg:block absolute inset-0 w-full h-full">
                <video
                    src={movieData.trailer}
                    autoPlay={isDesktop}
                    muted={isMuted}
                    loop
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover"
                    ref={desktopVideoRef}
                />
                <div
                    className="pointer-events-none absolute z-3 inset-x-0 bottom-0 h-[220px]"
                    style={{ background: 'var(--gradient-dark-bottom)' }}
                />
                <button
                    type="button"
                    onClick={handleToggleMute}
                    aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
                    className="absolute z-30 bottom-[20px] right-[20px] md:bottom-[120px] md:right-[60px] lg:bottom-[120px] lg:right-[60px] flex items-center justify-center cursor-pointer w-[20px] h-[20px] md:w-10 md:h-10"
                >
                    <Image
                        src={isMuted ? '/img/sound-off.svg' : '/img/sound-on.svg'}
                        alt=""
                        width={40}
                        height={40}
                        className="w-full h-full"
                    />
                </button>
            </div>

            <Container
                maxWidth={1540}
                className="lg:absolute inset-0 z-10 flex h-full flex-col justify-between pt-[110px] lg:pb-[70px]"
            >
                <Breadcrumbs items={[
                    { label: 'Play', href: '/' },
                    { label: 'Genres', href: '/genres' },
                    { label: movieData.genre, href: `/genres/${movieData.genre}` },
                    { label: movieData.title }
                ]} />
                <div className="lg:hidden relative w-[100vw] ml-[calc(50%-50vw)] md:min-h-[400px] bg-black">
                    <video
                        src={movieData.trailer}
                        autoPlay={!isDesktop}
                        muted={isMuted}
                        loop
                        playsInline
                        controls={false}
                        className="w-full h-full object-cover"
                        ref={mobileVideoRef}
                    />
                    <div
                        className="pointer-events-none absolute z-3 inset-x-0 bottom-0 h-[180px]"
                        style={{ background: 'var(--gradient-dark-bottom)' }}
                    />
                    <button
                        type="button"
                        onClick={handleToggleMute}
                        aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
                        className="absolute bottom-[20px] right-[20px] z-30 flex items-center justify-center cursor-pointer w-[20px] h-[20px]"
                    >
                        <Image
                            src={isMuted ? '/img/sound-off.svg' : '/img/sound-on.svg'}
                            alt=""
                            width={20}
                            height={20}
                            className="w-full h-full"
                        />
                    </button>
                </div>
                <div className="mt-0 lg:mt-10">
                    <h1 className="text-[32px] mb-[10px] leading-[48px] md:text-[48px] lg:text-[60px] lg:leading-[90px] font-bold text-[var(--color-pop-corn)] lg:mb-[20px]">
                        {movieData.title}
                    </h1>
                    <p className="text-[18px] leading-[22px] md:text-[20px] lg:text-[32px] lg:leading-[48px] font-semibold text-[var(--color-violet)]">
                        Watch for less than ${movieData.price.toFixed(2)}
                    </p>
                </div>
            </Container>
        </section>
    )
}