import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface ProgressSliderProps {
	className?: string;
}

const MIN_PROGRESS = 1;
const MAX_PROGRESS = 100;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const PRICE_PER_MINUTE = 0.02;
const INITIAL_PROGRESS = 15;
const KEYBOARD_STEP = 5;

export default function ProgressSlider({ className = '' }: ProgressSliderProps) {
	const [displayedMinutes, setDisplayedMinutes] = useState(10);
	const [displayedPrice, setDisplayedPrice] = useState("$0.20");

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
		<div className={clsx("w-full py-[30px]", className)}>
			<div
				className="relative h-1 bg-[var(--color-blue)] rounded-1 mb-[15px] cursor-pointer touch-none"
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
					className="h-full bg-[var(--color-gold)] rounded-1" 
					style={{ width: trackWidth }}
				/>
				<motion.div
					className="absolute top-1/2 w-4 h-4 bg-[var(--color-gold)] rounded-full md:w-[13px] md:h-[13px]"
					style={{ left: trackWidth, transform: 'translateY(-50%) translateX(-2px)' }}
				/>
			</div>
			<div className="flex justify-between items-end text-white">
				<div className="flex flex-col">
					<p className="font-normal text-[14px] leading-[18px] text-[var(--color-violet)] mb-1">For every</p>
					<div className="flex items-center gap-1">
						<span className="font-bold text-[32px] leading-[48px] text-[var(--color-violet)]">
							{displayedMinutes} mins
						</span> 
						<span className="font-normal text-[16px] leading-[20px] text-[var(--color-violet)]">you play</span>
					</div>
				</div>
				<div className="flex flex-col">
					<p className="font-normal text-[14px] leading-[18px] text-[var(--color-violet)] mb-1">You only pay</p>
					<span className="font-bold text-[32px] leading-[48px] text-[var(--color-violet)]">{displayedPrice}</span>
				</div>
			</div>
		</div>
	);
}
