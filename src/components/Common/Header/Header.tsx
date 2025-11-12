"use client"

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import s from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../Ui/Button/Button';
import Container from '../Container/Container';

const SCROLL_THRESHOLD = 50;

export default function Header()
{
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

	return (
		<header className={s.header}>
			<Container maxWidth={1540}>
				<div className={s.headerWrapper}>
					<Link className={s.headerLogo} href="/">
						<Image src="/img/svg/logo.svg" width={176} height={50} alt="Vector logotype MovieMe"/>
					</Link>
					<div className={clsx(s.headerButton, isScrolled && s.scrolled)}>
						<Button color="violet" href="/download">Download App</Button>
					</div>
					<Button className={s.headerLink} color="violet" type="button">Sign in</Button>
				</div>
			</Container>
		</header>
	)
}