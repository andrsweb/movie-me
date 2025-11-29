export const maskTextVariants = {
	visible: {
		opacity: 1,
		x: 0,
		y: 0,
		maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)',
		maskSize: '100% 100%',
		WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)',
		WebkitMaskSize: '100% 100%',
		maskPosition: '0 0%',
		WebkitMaskPosition: '0 0%',
	},
	hidden: {
		opacity: 0,
		x: 30,
		y: 10,
		maskImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
		maskSize: '100% 100%',
		WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
		WebkitMaskSize: '100% 100%',
		maskPosition: '0 0%',
		WebkitMaskPosition: '0 0%',
	}
}

export const maskTransition = {
	duration: 0.8,
	ease: [0.42, 0, 0.58, 1] as const
}

export type AnimatedTextDirection = 'left' | 'right' | 'top' | 'bottom'

export const getAnimatedTextVariants = (direction: AnimatedTextDirection = 'left') => {
	const distance = 400
	const offsets = {
		left: { x: -distance, y: 0 },
		right: { x: distance, y: 0 },
		top: { x: 0, y: -distance },
		bottom: { x: 0, y: distance }
	}
	
	return {
		hidden: {
			opacity: 0,
			scale: 0.8,
			...offsets[direction]
		},
		visible: {
			opacity: 1,
			scale: 1,
			x: 0,
			y: 0
		}
	}
}

export type StaggerAxisDirection = 'left' | 'right'

export const getStaggerContainerVariants = (direction: StaggerAxisDirection = 'left') => {
	const offset = direction === 'left' ? -30 : 30
	return {
		hidden: {
			opacity: 0,
			x: offset
		},
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				staggerChildren: 0.03,
				delayChildren: 0.05,
				staggerDirection: direction === 'left' ? 1 : -1,
				ease: [1,1,1,1] as const
			}
		}
	}
}