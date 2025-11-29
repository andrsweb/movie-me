import { Movie } from '@/types/movie';
import Container from "@/components/Common/Container/Container";
import formatDuration from '@/lib/utils';

interface MovieSingleInfoProps {
    movie: Movie
}

export default function MovieSingleInfo({ movie }: MovieSingleInfoProps) {
    const language = (movie as { language?: string }).language ?? 'English'
    const categories = movie.categories?.join(' | ')
    const ratingLabel = `${movie.rating.toFixed(1)}`

    const descriptionText = movie.description?.trim() ?? ''
    const highlight = (movie.highlight ?? '').trim() || descriptionText.split('.')[0]?.trim() || movie.title
    const detail = descriptionText

    return (
        <section className="w-full">
            <Container maxWidth={1540}>
                <div className="flex flex-col gap-[30px] lg:gap-[20px]">
                    <div className="flex flex-col gap-[30px] lg:flex-row">
                        <div className="mt-[10px] flex w-full flex-1 flex-col gap-[10px] rounded-[10px] border border-[#29406D] bg-[var(--color-dark)] p-[16px] md:p-[20px] lg:mt-0">
                            <p className="flex flex-wrap items-center gap-[10px] text-[14px] leading-[18px] text-[#7A7A7A] md:text-[18px] md:leading-[24px] lg:text-[22px] lg:leading-[30px] lg:text-[var(--color-pop-corn)]">
                                <span>{formatDuration(movie.duration)}</span>
                                <span className="text-[#7A7A7A] lg:text-white/60">•</span>
                                <span>{movie.year}</span>
                                {language && (
                                    <>
                                        <span className="text-[#7A7A7A] lg:text-white/60">•</span>
                                        <span>{language}</span>
                                    </>
                                )}
                            </p>
                            <p className="flex flex-wrap items-center gap-[10px] text-[14px] leading-[18px] text-[#7A7A7A] md:text-[18px] md:leading-[24px] lg:text-[22px] lg:leading-[30px] lg:text-[var(--color-pop-corn)]">
                                {ratingLabel && (
                                    <>
                                        <span className="uppercase">R{ratingLabel}</span>
                                        {categories && <span className="text-[#7A7A7A] lg:text-white/60">•</span>}
                                    </>
                                )}
                                {categories && (
                                    <span className="text-[#7A7A7A]">{categories}</span>
                                )}
                            </p>
                        </div>

                        <div className="flex flex-1 flex-col gap-[10px] p-[16px] rounded-[10px] border border-[#29406D] bg-[var(--color-dark)] md:p-[20px]">
                            <p className="text-[14px] leading-[18px] text-[#7A7A7A] md:text-[18px] md:leading-[24px] lg:text-[22px] lg:leading-[30px] lg:text-[var(--color-pop-corn)]">
                                {highlight}
                            </p>
                            {detail && (
                                <p className="text-[14px] leading-[18px] text-[#7A7A7A] md:text-[18px] md:leading-[24px] lg:text-[22px] lg:leading-[30px]">
                                    {detail}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 rounded-[10px] border border-[#29406D] bg-[var(--color-dark)] p-[16px] md:p-[20px]">
                        {movie.director && (
                            <div className="flex items-start gap-[10px] text-[14px] leading-[18px] text-[var(--color-pop-corn)] md:text-[18px] md:leading-[24px] lg:text-[22px] lg:leading-[30px]">
                                <span>Director:</span>
                                <span className="flex-1 text-[#7A7A7A]">{movie.director}</span>
                            </div>
                        )}

                        {movie.cast && movie.cast.length > 0 && (
                            <div className="flex items-start gap-[10px] text-[14px] leading-[18px] text-[var(--color-pop-corn)] md:text-[18px] md:leading-[24px] lg:text-[22px] lg:leading-[30px]">
                                <span>Cast:</span>
                                <span className="flex-1 text-[#7A7A7A]">{movie.cast.join(', ')}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    )
}