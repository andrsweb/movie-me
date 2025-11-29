'use client'

import Link from 'next/link'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="w-full flex items-center justify-center flex-wrap space-x-2 text-md font-normal text-[var(--color-pop-corn)] mb-[20px]">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <span className="mx-2">/</span>
                    )}
                    {index < items.length - 1 ? (
                        <Link
                            href={item.href || '#'}
                            className="hover:opacity-70 transition-opacity duration-200"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-white font-medium mask-text">
                            <em>{item.label}</em>
                        </span>
                    )}
                </div>
            ))}
        </nav>
    )
}