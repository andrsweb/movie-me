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

const TRAIL_OFFSET = 12
const TRAIL_CONTAINER_OFFSET = 16

export type TrailDirection = 'left' | 'right' | 'top' | 'bottom'

export const getTrailContainerVariants = (direction: TrailDirection = 'bottom') => {
	const offsets = {
		left: { x: -TRAIL_CONTAINER_OFFSET, y: 0 },
		right: { x: TRAIL_CONTAINER_OFFSET, y: 0 },
		top: { y: -TRAIL_CONTAINER_OFFSET, x: 0 },
		bottom: { y: TRAIL_CONTAINER_OFFSET, x: 0 }
	}
	
	return {
		hidden: {
			opacity: 0,
			pointerEvents: 'none' as const,
			zIndex: -100,
			...offsets[direction]
		},
		visible: {
			opacity: 1,
			pointerEvents: 'auto' as const,
			zIndex: 0,
			x: 0,
			y: 0
		}
	}
}

export const getTrailContentVariants = (direction: TrailDirection = 'right') => {
	const offsets = {
		left: { x: -TRAIL_OFFSET },
		right: { x: TRAIL_OFFSET },
		top: { y: -TRAIL_OFFSET },
		bottom: { y: TRAIL_OFFSET }
	}
	
	return {
		hidden: {
			opacity: 0,
			...offsets[direction]
		},
		visible: {
			opacity: 1,
			x: 0,
			y: 0
		}
	}
}

export const getTrailGhostVariants = (direction: TrailDirection = 'right') => {
	const ghostOffset = TRAIL_OFFSET * 2
	const offsets = {
		left: { x: -ghostOffset },
		right: { x: ghostOffset },
		top: { y: -ghostOffset },
		bottom: { y: ghostOffset }
	}
	
	return {
		hidden: {
			opacity: 0.6,
			...offsets[direction]
		},
		visible: {
			opacity: 0,
			x: 0,
			y: 0
		}
	}
}

export const trailTransition = {
	duration: 1.5,
	ease: [0.25, 0.46, 0.45, 0.94] as const
}

export const trailContentDelayOffset = 0.4
