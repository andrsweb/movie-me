import s from "./HeroCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Ui/Button/Button";

const imagesData = [
	{ src: "/img/frames/t1.jpg", price: 4.99 },
	{ src: "/img/frames/t2.jpg", price: 3.99 },
	{ src: "/img/frames/t3.jpg", price: 5.49 },
	{ src: "/img/frames/t4.jpg", price: 2.99 },
	{ src: "/img/frames/t5.jpg", price: 6.99 },
	{ src: "/img/frames/t6.jpg", price: 4.49 },
	{ src: "/img/frames/t7.jpg", price: 3.49 },
	{ src: "/img/frames/t8.jpg", price: 5.99 },
	{ src: "/img/frames/t9.jpg", price: 4.79 },
	{ src: "/img/frames/t10.jpg", price: 3.29 },
	{ src: "/img/frames/t11.jpg", price: 6.49 },
	{ src: "/img/frames/t12.jpg", price: 7.99 },
	{ src: "/img/frames/t13.jpg", price: 2.49 },
	{ src: "/img/frames/t14.jpg", price: 4.29 },
	{ src: "/img/frames/t15.jpg", price: 5.79 },
	{ src: "/img/frames/t16.jpg", price: 3.99 }
];

export default function HeroCard() {
	return (
		<div className={s.heroCardContainer}>
			<div className={s.heroCard}>
				<div className={s.heroCardInner}>
					<div className={s.heroCardImg}>
						<Image src="/img/hero-bg.jpg" width={906} height={514} alt="Hero image"/>
						<div className={s.heroCardDesc}>
							<h2>Hating Game</h2>
							<Button color="violet" type="button">Play <b>Me</b></Button>
						</div>
					</div>
					<div className={s.heroCardText}>
						<h3>
							MovieMe is the  <em>un-subscription</em>
						</h3>
						<p>
							Handpicked films,
							not an endless scroll.
						</p>
					</div>
					<div className={s.heroCardItems}>
						{imagesData.slice(0, 8).map((item, index) => (
							<Link href="#" key={index} className={s.heroCardItem}>
								<Image src={item.src} width={150} height={226} alt={`Film cover ${index + 1}`}/>
								<div className={s.itemPrice}><span>Less than ${item.price}</span></div>
							</Link>
						))}
					</div>
					<div className={s.heroCardItemsText}>
						<h3>
							With MovieMe there are <br/>
							no monthly fees
						</h3>
						<em>
							Just pay when you play.
						</em>
					</div>
					<div className={s.heroCardItems}>
						{imagesData.slice(8, 16).map((item, index) => (
							<Link href="#" key={index} className={s.heroCardItem}>
								<Image src={item.src} width={150} height={226} alt={`Film cover ${index + 1}`}/>
								<div className={s.itemPrice}><span>Less than ${item.price}</span></div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}