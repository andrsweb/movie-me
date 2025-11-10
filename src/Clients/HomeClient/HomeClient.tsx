import Hero from "@/components/Sections/Hero/Hero";
import s from './HomeClient.module.scss'

export default function HomeClient() {
	return (
		<div className={s.page}>
			<Hero/>
		</div>
	)
}
