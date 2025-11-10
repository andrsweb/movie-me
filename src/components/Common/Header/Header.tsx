"use client"

import s from './Header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Button  from '../../Ui/Button/Button';
import Container  from '../Container/Container';

export default function Header()
{
    return (
        <header className={s.header}>
	        <Container maxWidth={1540}>
		        <div className={s.headerWrapper}>
			        <Link href="/">
				        <Image src="/img/svg/logo.svg" width={176} height={50} alt="Vector logotype MovieMe"/>
			        </Link>
			        <Button color="violet" type="button">Sign in</Button>
		        </div>
	        </Container>
        </header>
    )
}