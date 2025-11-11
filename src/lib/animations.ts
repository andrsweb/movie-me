export const maskTextVariants = {
	visible: {
		opacity: 1,
	},
	hidden: {
		opacity: 0,
		maskImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
		maskSize: '100% 200%',
		WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
		WebkitMaskSize: '100% 200%',
		maskPosition: '0 100%',
		WebkitMaskPosition: '0 100%',
	}
}

export const maskTransition = {
	duration: 0.8,
	ease: [0.42, 0, 0.58, 1] as const
}

const TRAIL_OFFSET_X = 6 
const TRAIL_OFFSET_Y = 16

export const trailContainerVariants = {
	hidden: {
		opacity: 0,
		y: TRAIL_OFFSET_Y
	},
	visible: {
		opacity: 1,
		y: 0
	}
}

export const trailContentVariants = {
	hidden: {
		opacity: 0,
		x: TRAIL_OFFSET_X
	},
	visible: {
		opacity: 1,
		x: 0
	}
}

export const trailGhostVariants = {
	hidden: {
		opacity: 0.6,
		x: TRAIL_OFFSET_X
	},
	visible: {
		opacity: 0,
		x: 0
	}
}

export const trailTransition = {
	duration: 1.5,
	ease: [0.25, 0.46, 0.45, 0.94] as const
}

export const trailContentDelayOffset = 0.4
