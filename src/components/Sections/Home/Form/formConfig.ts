export type TabType = 'email' | 'phone'

export const tabBackgroundVariants = {
    email: { x: 0 },
    phone: { x: '100%' },
} as const

export const tabTransition = {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
}

export const inputVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
} as const

export const inputTransition = {
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
}
