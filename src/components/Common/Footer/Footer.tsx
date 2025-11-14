import s from './Footer.module.scss'
import Container from '@/components/Common/Container/Container'
import Image from 'next/image'
import Link from 'next/link'
import CustomSelect from '@/components/Ui/CustomSelect/CustomSelect'

export default function Footer() {
	return (
		<footer className={s.footer}>
			<Container maxWidth={1540}>
				<div className={s.footerWrapper}>
					<div className={s.footerTop}>
						<div className={s.topLeft}>
							<Link className={s.footerLogo} href="/">
								<Image src="/img/svg/logo.svg" width={176} height={50} alt="Vector logotype MovieMe"/>
							</Link>
							<div className={s.topLeftSocials}>
								<Link href="#" target="_blank" rel="noopener noreferrer">
									<Image src="/img/svg/instagram.svg" width={33} height={33} alt="Instagram logo" />
								</Link>
								<Link href="#" target="_blank" rel="noopener noreferrer">
									<Image src="/img/svg/linked-in.svg" width={33} height={33} alt="LinkedIn logo" />
								</Link>
							</div>
							<div className={s.topLeftPayments}>
								<span>Pay Securely With</span>
								<div className={s.items}>
									<div className={s.item}>
										<Image src="/img/svg/visa.svg" width={65} height={40} alt="Visa logo" />
									</div>
									<div className={s.item}>
										<Image src="/img/svg/master-card.svg" width={65} height={40} alt="Master card logo" />
									</div>
									<div className={s.item}>
										<Image src="/img/svg/amex.svg" width={65} height={40} alt="Amex logo" />
									</div>
									<div className={s.item}>
										<Image src="/img/svg/jcb.svg" width={65} height={40} alt="Jcb logo" />
									</div>
								</div>
								<div className={s.info}>
									Through <Image src="/img/svg/stripe.svg" width={67} height={31} alt="Stripe logo" />
								</div>
							</div>
						</div>
						<div className={s.topRight}>
							<nav>
								<span>About</span>
								<ul>
									<li>
										<Link href="#">Meet MovieMe</Link>
									</li>
									<li>
										<Link href="#">How It Works</Link>
									</li>
									<li>
										<Link href="#">Browse Movies</Link>
									</li>
									<li>
										<Link href="#">Vision/Mission</Link>
									</li>
									<li>
										<Link href="#">Devices</Link>
									</li>
									<li>
										<Link href="#">Sign In</Link>
									</li>
									<li>
										<Link href="#">Create Account</Link>
									</li>
								</ul>
							</nav>
							<nav>
								<span>Help Center</span>
								<ul>
									<li>
										<Link href="#">How Billing Works</Link>
									</li>
									<li>
										<Link href="#">
											Card & Payment
											Safety
										</Link>
									</li>
									<li>
										<Link href="#">FAQs</Link>
									</li>
									<li>
										<Link href="#">User Agreement</Link>
									</li>
								</ul>
							</nav>
							<nav>
								<span>MovieMe Playlists</span>
								<ul>
									<li>
										<Link href="#">Trending Movies Today</Link>
									</li>
									<li>
										<Link href="#">Indie Movies to Watch Online</Link>
									</li>
									<li>
										<Link href="#">Movies Under $2</Link>
									</li>
									<li>
										<Link href="#">Critically Acclaimed Movies</Link>
									</li>
									<li>
										<Link href="#">Award-Winning Documentaries</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
					<div className={s.footerBottom}>
						<div className={s.footerBottomLeft}>
							<div className={s.sitemap}>
								<div className={s.sitemapDropdown}>
									<CustomSelect
										options={['India', 'USA', 'UK', 'Canada', 'Australia']}
										defaultValue="India"
									/>
									<div className={s.sitemapText}>Sitemap</div>
								</div>
							</div>
							<div className={s.copyright}>
								<p> 2025 Movie Me Pty. Ltd. All rights reserved.</p>
								<span>MOVIEME is a registered trade mark of Movie Me Pty. Ltd.</span>
							</div>
						</div>
						<div className={s.footerBottomRight}>
							<div className={s.footerBottomLinks}>
								<Link href="https://play.google.com/store/apps/details?id=com.movieme.app&hl=en" target="_blank" rel="noopener noreferrer">
									<Image src="/img/svg/app-d.svg" width={249} height={72} alt="Apple store logo" />
								</Link>
								<Link href="https://apps.apple.com/in/app/movieme/id6445994785" target="_blank" rel="noopener noreferrer">
									<Image src="/img/svg/and-d.svg" width={249} height={72} alt="Google Play store logo" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	)
}
