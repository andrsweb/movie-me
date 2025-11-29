import Container from '@/components/Common/Container/Container'
import Image from 'next/image'
import Link from 'next/link'
import CustomSelect from '@/components/Ui/CustomSelect/CustomSelect'

export default function Footer() {
	return (
		<footer className="relative w-full bg-[var(--color-dark)] pt-[60px] pb-[200px] md:pt-[80px] md:pb-[280px]">
			<Container maxWidth={1540}>
				<div className="flex w-full flex-col gap-[20px] md:gap-[60px]">
					<div className="flex w-full flex-col items-start justify-between gap-[40px] md:flex-row xl:gap-[100px]">
						<div className="flex flex-col items-start">
							<Link className="mb-[15px]" href="/">
								<Image
									className="h-[32px] w-auto lg:h-[64px]"
									src="/img/svg/logo.svg"
									width={176}
									height={50}
									alt="Vector logotype MovieMe"
								/>
							</Link>
							<div className="mb-[20px] flex w-full items-stretch gap-[10px] xl:gap-[30px]">
								<Link
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-[24px] w-[24px] items-center justify-center transition-opacity duration-[300ms] ease-in-out hover:opacity-[var(--opacity-base)] lg:h-[33px] lg:w-[33px]"
								>
									<Image className="h-full w-full" src="/img/svg/instagram.svg" width={33} height={33} alt="Instagram logo" />
								</Link>
								<Link
									href="#"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-[24px] w-[24px] items-center justify-center transition-opacity duration-[300ms] ease-in-out hover:opacity-[var(--opacity-base)] lg:h-[33px] lg:w-[33px]"
								>
									<Image className="h-full w-full" src="/img/svg/linked-in.svg" width={33} height={33} alt="LinkedIn logo" />
								</Link>
							</div>
							<div className="flex w-full flex-col items-start">
								<span className="mb-[12px] text-[16px] leading-[20px] text-[var(--color-white)]">Pay Securely With</span>
								<div className="mb-[20px] flex w-full flex-wrap items-center gap-[20px]">
									<div>
										<Image
											className="h-[30px] w-auto md:h-[40px]"
											src="/img/svg/visa.svg"
											width={65}
											height={40}
											alt="Visa logo"
										/>
									</div>
									<div>
										<Image
											className="h-[30px] w-auto md:h-[40px]"
											src="/img/svg/master-card.svg"
											width={65}
											height={40}
											alt="Master card logo"
										/>
									</div>
									<div>
										<Image
											className="h-[30px] w-auto md:h-[40px]"
											src="/img/svg/amex.svg"
											width={65}
											height={40}
											alt="Amex logo"
										/>
									</div>
									<div>
										<Image
											className="h-[30px] w-auto md:h-[40px]"
											src="/img/svg/jcb.svg"
											width={65}
											height={40}
											alt="Jcb logo"
										/>
									</div>
								</div>
								<div className="mb-[12px] flex items-center gap-[5px] text-[16px] leading-[20px] text-[var(--color-white)]">
									Through <Image src="/img/svg/stripe.svg" width={67} height={31} alt="Stripe logo" />
								</div>
							</div>
						</div>
						<div className="flex flex-1 flex-wrap items-start justify-start gap-[40px] xl:justify-end">
							<nav className="flex flex-col items-start gap-[10px]">
								<span className="text-[20px] leading-[30px] font-bold text-[var(--color-white)]">About</span>
								<ul className="flex w-full list-none flex-col items-start gap-[10px]">
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Meet MovieMe</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">How It Works</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Browse Movies</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Vision/Mission</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Devices</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Sign In</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Create Account</Link>
									</li>
								</ul>
							</nav>
							<nav className="flex flex-col items-start gap-[10px]">
								<span className="text-[20px] leading-[30px] font-bold text-[var(--color-white)]">Help Center</span>
								<ul className="flex w-full list-none flex-col items-start gap-[10px]">
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">How Billing Works</Link>
									</li>
									<li className="w-full">
										<Link
											className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]"
											href="#"
										>
											Card & Payment
											Safety
										</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">FAQs</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">User Agreement</Link>
									</li>
								</ul>
							</nav>
							<nav className="flex flex-col items-start gap-[10px]">
								<span className="text-[20px] leading-[30px] font-bold text-[var(--color-white)]">MovieMe Playlists</span>
								<ul className="flex w-full list-none flex-col items-start gap-[10px]">
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Trending Movies Today</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Indie Movies to Watch Online</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Movies Under $2</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Critically Acclaimed Movies</Link>
									</li>
									<li className="w-full">
										<Link className="text-[16px] leading-[20px] text-[var(--color-white)] transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)] md:text-[20px] md:leading-[30px]" href="#">Award-Winning Documentaries</Link>
									</li>
								</ul>
							</nav>
						</div>
					</div>
					<div className="flex w-full flex-col items-start justify-between gap-[32px] xl:flex-row xl:items-center">
						<div className="flex flex-col">
							<div className="mb-[30px] w-full">
								<div className="flex items-center gap-[20px]">
									<CustomSelect
										options={['India', 'USA', 'UK', 'Canada', 'Australia']}
										defaultValue="India"
									/>
									<div className="text-[18px] leading-[22px] text-[var(--color-white)]">Sitemap</div>
								</div>
							</div>
							<div>
								<p className="mb-[10px] text-[18px] leading-[22px] text-[var(--color-white)]"> 2025 Movie Me Pty. Ltd. All rights reserved.</p>
								<span className="text-[14px] leading-[18px] text-[#7A7A7A]">MOVIEME is a registered trade mark of Movie Me Pty. Ltd.</span>
							</div>
						</div>
						<div className="flex items-center gap-[16px] md:gap-[32px]">
							<Link
								href="https://play.google.com/store/apps/details?id=com.movieme.app&hl=en"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)]"
							>
								<Image src="/img/svg/app-d.svg" width={249} height={72} alt="Apple store logo" />
							</Link>
							<Link
								href="https://apps.apple.com/in/app/movieme/id6445994785"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-opacity duration-[200ms] ease-in-out hover:opacity-[var(--opacity-base)]"
							>
								<Image src="/img/svg/and-d.svg" width={249} height={72} alt="Google Play store logo" />
							</Link>
						</div>
					</div>
				</div>
			</Container>
			<Image
				className="absolute bottom-0 left-1/2 w-full max-w-[1400px] translate-x-[-50%] translate-y-[5%]"
				src="/img/svg/movie-me.svg"
				width={1400}
				height={256}
				alt="MovieMe"
			/>
		</footer>
	)
}
