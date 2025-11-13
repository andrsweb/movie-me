"use client"

import s from "./About.module.scss"
import Image from "next/image";
import PieChart from "@/components/Ui/PieChart/PieChart";
import Container from "@/components/Common/Container/Container";
import ProgressSlider from "@/components/Ui/ProgressSlider/ProgressSlider";


export default function About() {
	return (
		<section className={s.about}>
			<h2 className="sr-only">Think of it like ordering pizza, you only pay for the slices you eat.</h2>
			<Container maxWidth={846}>
				<div className={s.aboutWrapper}>
					<div className={s.aboutTop}>
						<div className={s.aboutTopLeft}>
							<span>
								How It Works
							</span>
							<h3>
								Think of it like ordering pizza,
								you only pay for the slices you eat.
							</h3>
						</div>
						<div className={s.aboutTopRight}>
							<PieChart
								size="sm"
								sliceAngle={55}
								mainColor="#3C588F"
								sliceColor="#29406D"
								flyAngle={-50}
								animationDuration={2000}
								step1Duration={400}
								step2Duration={800}
								returnDelay={1600}
								returnDuration={400}
								cyclePause={1000}
								initialDelay={500}
								step1Offset={10}
								step2Offset={20}
								sliceDistance1={15}
								sliceDistance2={30}
							/>
						</div>
					</div>
					<div className={s.aboutBottom}>
						<div className={s.aboutBottomUp}>
							<ProgressSlider />
						</div>
						<div className={s.aboutBottomDown}>
							<div className={s.downInfo}>
								<p>
									Add A Payment Method Via
								</p>
								<span>
									Debit Card, Credit Card etc. Securely Through
									<Image src="/img/svg/stripe.svg" width={65} height={40} alt="Payment image"/>
								</span>
							</div>
							<div className={s.downPayment}>
								<span>
									Pay Easily With
								</span>
								<div className={s.downImages}>
									<div className={s.downImage}>
										<Image src="/img/svg/visa.svg" width={65} height={40} alt="Payment image"/>
									</div>
									<div className={s.downImage}>
										<Image src="/img/svg/master-card.svg" width={65} height={40} alt="Payment image"/>
									</div>
									<div className={s.downImage}>
										<Image src="/img/svg/amex.svg" width={65} height={40} alt="Payment image"/>
									</div>
									<div className={s.downImage}>
										<Image src="/img/svg/jcb.svg" width={65} height={40} alt="Payment image"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
			{/*If you want to change delay - please * or / proportionally */}

		</section>
	)
}
