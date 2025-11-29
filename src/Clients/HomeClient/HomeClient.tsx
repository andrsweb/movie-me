import Hero from "@/components/Sections/Hero/Hero";
import MoviePreview from "@/components/Sections/MoviePreview/MoviePreview";
import About from "@/components/Sections/About/About";
import Bill from "@/components/Sections/Bill/Bill";
import Fly from "@/components/Sections/Fly/Fly";
// import Steps from "@/components/Sections/Steps/Steps";
import Dropdowns from "@/components/Sections/Dropdowns/Dropdowns";
import Cta from "@/components/Sections/Cta/Cta";
import AnimatedText from "@/components/Sections/AnimatedText/AnimatedText";
import Form from "@/components/Sections/Form/Form";

export default function HomeClient() {
	return (
		<div className="w-full">
			<Hero/>
			<MoviePreview/>
			<About/>
			<Bill/>
			<Fly />
			{/*<Steps />*/}
			<Dropdowns />
			<Cta />
			<AnimatedText />
			<Form />
		</div>
	)
}
