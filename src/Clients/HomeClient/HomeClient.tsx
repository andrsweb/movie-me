import Hero from "@/components/Sections/Home/Hero/Hero";
import MoviePreview from "@/components/Sections/Home/MoviePreview/MoviePreview";
import About from "@/components/Sections/Home/About/About";
import Bill from "@/components/Sections/Home/Bill/Bill";
import Fly from "@/components/Sections/Home/Fly/Fly";
// import Steps from "@/components/Sections/Steps/Steps";
import Dropdowns from "@/components/Sections/Home/Dropdowns/Dropdowns";
import Cta from "@/components/Sections/Home/Cta/Cta";
import AnimatedText from "@/components/Sections/Home/AnimatedText/AnimatedText";
import Form from "@/components/Sections/Home/Form/Form";

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
