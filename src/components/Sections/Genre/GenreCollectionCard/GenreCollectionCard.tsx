import Link from "next/link"

interface GenreCollectionCardProps {
	title: string
	href: string
	subtitle?: string
	className?: string
}

const baseClasses =
	"flex w-full flex-col gap-[14px] rounded-[10px] bg-[#162542] p-[24px] transition-opacity duration-300 ease-out md:gap-[20px] md:p-[30px] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-50"

export default function GenreCollectionCard({
	title,
	href,
	subtitle,
	className,
}: GenreCollectionCardProps) {
	const combinedClassName = className ? `${baseClasses} ${className}` : baseClasses

	return (
		<Link href={href} className={combinedClassName}>
			<div className="flex flex-col gap-[12px]">
				<h3 className="text-[18px] font-bold leading-[22px] text-[var(--color-pop-corn)] md:text-[32px] md:leading-[48px]">
					{title}
				</h3>
				{subtitle ? (
					<span className="text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--color-pop-corn)] md:text-[14px]">
						{subtitle}
					</span>
				) : null}
			</div>
		</Link>
	)
}
