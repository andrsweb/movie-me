import Hero from "@/components/Sections/Hero/Hero";
import MoviePreview from "@/components/Sections/MoviePreview/MoviePreview";
import s from './HomeClient.module.scss'

export default function HomeClient() {
	return (
		<div className={s.page}>
			<Hero/>
			<MoviePreview/>
		</div>
	)
}
