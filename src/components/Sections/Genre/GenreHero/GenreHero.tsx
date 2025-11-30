"use client"

import Container from "@/components/Common/Container/Container"
import Breadcrumbs from "@/components/Ui/Breadcrumbs/Breadcrumbs"

type BreadcrumbItem = {
	label: string
	href?: string
}

interface GenreHeroProps {
	breadcrumbs: BreadcrumbItem[]
	title: string
}

export default function GenreHero({ breadcrumbs, title }: GenreHeroProps) {
	return (
		<section className="w-full bg-[var(--color-dark)]">
            <h1 className="sr-only">Title for seo</h1>
			<Container
				maxWidth={1540}
				className="flex flex-col items-center gap-[24px] pt-[110px] pb-[60px] md:pb-[70px]"
			>
				<Breadcrumbs items={breadcrumbs} />
				<div className="flex flex-col items-center gap-[12px] text-center">
					<h2 className="text-[28px] leading-[36px] font-bold text-[var(--color-pop-corn)] md:text-[44px] md:leading-[52px]">
						{title}
					</h2>
				</div>
			</Container>
		</section>
	)
}
