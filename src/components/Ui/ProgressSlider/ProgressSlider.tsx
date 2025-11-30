import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface ProgressSliderProps {
	className?: string;
	variant?: 'default' | 'small';
}

const MIN_PROGRESS = 1;
const MAX_PROGRESS = 100;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const PRICE_PER_MINUTE = 0.02;
const INITIAL_PROGRESS = 15;
const KEYBOARD_STEP = 5;

export default function ProgressSlider({ className = '', variant = 'default' }: ProgressSliderProps) {
	const [displayedMinutes, setDisplayedMinutes] = useState(10);
	const [displayedPrice, setDisplayedPrice] = useState("$0.20");
	const isSmallVariant = variant === 'small';

	const progress = useMotionValue(INITIAL_PROGRESS);
	const springProgress = useSpring(progress, { stiffness: 600, damping: 40 });
	const clampedProgress = useTransform(springProgress, value => Math.max(MIN_PROGRESS, Math.min(MAX_PROGRESS, value)));
	const trackWidth = useTransform(clampedProgress, value => `${value}%`);
	const minutes = useTransform(clampedProgress, [MIN_PROGRESS, MAX_PROGRESS], [MIN_MINUTES, MAX_MINUTES]);

	const handleMinutesChange = useCallback((latest: number) => {
		const mins = Math.round(latest);
		setDisplayedMinutes(mins);
		const priceValue = (mins * PRICE_PER_MINUTE).toFixed(2);
		setDisplayedPrice(`$${priceValue}`);
	}, []);

	useEffect(() => {
		return minutes.on("change", handleMinutesChange);
	}, [minutes, handleMinutesChange]);
	
	const barRef = useRef<HTMLDivElement>(null);
	const [dragging, setDragging] = useState(false);

	const updateProgressFromClientX = useCallback((clientX: number) => {
		if (!barRef.current) return;
		const rect = barRef.current.getBoundingClientRect();
		const newX = clientX - rect.left;
		const newProgress = (newX / rect.width) * MAX_PROGRESS;
		progress.set(Math.max(MIN_PROGRESS, Math.min(MAX_PROGRESS, newProgress)));
	}, [progress]);

	const updateProgress = useCallback((delta: number) => {
		const currentProgress = progress.get();
		const newProgress = currentProgress + delta;
		progress.set(Math.max(MIN_PROGRESS, Math.min(MAX_PROGRESS, newProgress)));
	}, [progress]);

	const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
		(e.currentTarget as HTMLDivElement).setPointerCapture?.(e.pointerId);
		setDragging(true);
		updateProgressFromClientX(e.clientX);
	}, [updateProgressFromClientX]);

	const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
		if (!dragging) return;
		updateProgressFromClientX(e.clientX);
	}, [dragging, updateProgressFromClientX]);

	const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
		setDragging(false);
		(e.currentTarget as HTMLDivElement).releasePointerCapture?.(e.pointerId);
	}, []);

	const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		switch (e.key) {
			case "ArrowLeft":
			case "ArrowDown":
				e.preventDefault();
				updateProgress(-KEYBOARD_STEP);
				break;
			case "ArrowRight":
			case "ArrowUp":
				e.preventDefault();
				updateProgress(KEYBOARD_STEP);
				break;
			case "Home":
				e.preventDefault();
				progress.set(MIN_PROGRESS);
				break;
			case "End":
				e.preventDefault();
				progress.set(MAX_PROGRESS);
				break;
		}
	}, [updateProgress, progress]);
	
	return (
		<div className={clsx("w-full", isSmallVariant ? 'py-0' : 'py-[30px]', className)}>
			<div
				className={clsx(
					"relative mb-[15px] cursor-pointer touch-action-none bg-[var(--color-blue)]",
					isSmallVariant ? 'h-[6px] rounded-[999px]' : 'h-1 rounded-[4px]'
				)}
				ref={barRef}
				role="slider"
				aria-valuemin={MIN_MINUTES}
				aria-valuemax={MAX_MINUTES}
				aria-valuenow={displayedMinutes}
				aria-label="Select minutes to play"
				tabIndex={0}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onKeyDown={handleKeyDown}
			>
				<motion.div 
					className={clsx(
						'h-full bg-[var(--color-gold)]',
						isSmallVariant ? 'rounded-[999px]' : 'rounded-[4px]'
					)} 
					style={{ width: trackWidth }}
				/>
				<motion.div
					className={clsx(
						'absolute top-1/2 rounded-full bg-[var(--color-gold)]',
						isSmallVariant ? 'h-[14px] w-[14px]' : 'h-4 w-4 md:h-[13px] md:w-[13px]'
					)}
					style={{ left: trackWidth, transform: 'translateY(-50%) translateX(-2px)' }}
				/>
			</div>
			<div className="flex items-end justify-between">
				<div className="flex flex-col">
					<p
						className={clsx(
							'font-normal text-[14px] leading-[18px] mb-1',
							' text-[var(--color-violet)]',
						)}
					>
						For every
					</p>
					<div className="flex items-baseline gap-[6px]">
						<span
							className={clsx(
								'font-bold',
								isSmallVariant ? 'text-[28px] leading-[36px] text-[var(--color-violet)]' : 'text-[32px] leading-[48px] text-[var(--color-violet)]',
							)}
						>
							{displayedMinutes} mins
						</span>
						<span
							className={clsx(
								'font-normal',
								' text-[16px] leading-[20px] text-[var(--color-violet)]',
							)}
						>
							you play
						</span>
					</div>
				</div>
				<div className="flex flex-col items-end">
					<p
						className={clsx(
							'font-normal text-[14px] leading-[18px] mb-1',
							' text-[var(--color-violet)]',
						)}
					>
						You only pay
					</p>
					<span
						className={clsx(
							'font-bold',
							isSmallVariant ? 'text-[28px] leading-[36px] text-[var(--color-violet)]' : 'text-[32px] leading-[48px] text-[var(--color-violet)]',
						)}
					>
						{displayedPrice}
					</span>
				</div>
			</div>
		</div>
	);
}
