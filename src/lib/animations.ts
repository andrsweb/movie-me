export const maskTextVariants = {
	hidden: {
		opacity: 0,
		maskImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
		maskSize: '100% 200%',
		WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)',
		WebkitMaskSize: '100% 200%',
		maskPosition: '0 0',
		WebkitMaskPosition: '0 0',
	},
	visible: {
		opacity: 1,
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
