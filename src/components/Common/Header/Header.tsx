"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../Ui/Button/Button';
import Container from '../Container/Container';

const SCROLL_THRESHOLD = 50;

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const shouldBeScrolled = window.scrollY > SCROLL_THRESHOLD;
			setIsScrolled(shouldBeScrolled);
		};

		handleScroll();

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const headerButtonClasses = isScrolled
		? 'fixed flex right-1/2 bottom-[30px] translate-x-1/2 text-center transition-all ease-in-out duration-[200ms] xl:hidden'
		: 'fixed flex right-[20px] bottom-[calc(100%-66px)] md:right-[50px] md:bottom-[calc(100%-76px)] text-center transition-all ease-in-out duration-[200ms] xl:hidden';

	return (
		<header className="w-full absolute left-0 top-0 py-[30px] z-[100]">
			<Container maxWidth={1540}>
				<div className="flex items-center justify-between gap-[30px]">
					<Link className="block w-[110px] md:w-[176px]" href="/">
						<Image src="/img/svg/logo.svg" width={176} height={50} alt="Vector logotype MovieMe" />
					</Link>
					<div className={headerButtonClasses}>
						<Button color="violet" href="/download">Download App</Button>
					</div>
					<Button className="!hidden xl:!flex" color="violet" type="button">Sign in</Button>
				</div>
			</Container>
		</header>
	)
}