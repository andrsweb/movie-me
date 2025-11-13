import Hero from "@/components/Sections/Hero/Hero";
import MoviePreview from "@/components/Sections/MoviePreview/MoviePreview";
import About from "@/components/Sections/About/About";
import Bill from "@/components/Sections/Bill/Bill";
import s from './HomeClient.module.scss'

export default function HomeClient() {
	return (
		<div className={s.page}>
			<Hero/>
			<MoviePreview/>
			<About/>
			<Bill/>
		</div>
	)
}
