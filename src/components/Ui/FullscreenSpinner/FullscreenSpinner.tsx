'use client'

import clsx from 'clsx'

interface FullscreenSpinnerProps {
    className?: string
}

export default function FullscreenSpinner({ className }: FullscreenSpinnerProps) {
    return (
        <div className={clsx('fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--color-dark)]', className)}>
            <div className="relative h-16 w-16 md:h-20 md:w-20" role="status" aria-live="polite">
                <div className="absolute inset-0 rounded-full border-[3px] md:border-4 border-[var(--color-violet)] opacity-30" />
                <div
                    className="absolute inset-0 rounded-full border-[3px] md:border-4 border-[var(--color-violet)] animate-spin"
                    style={{ borderTopColor: 'var(--color-pop-corn)' }}
                />
                <span className="sr-only">Loading</span>
            </div>
            <span className="mt-6 text-sm uppercase tracking-[0.3em] text-[var(--color-pop-corn)]">Loading</span>
        </div>
    )
}
