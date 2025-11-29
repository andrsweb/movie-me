"use client";

import { motion, useReducedMotion, useInView } from 'framer-motion';
import React,{ useEffect, useState, useRef } from 'react';

interface PieChartProps {
	sliceAngle?: number;
	mainColor?: string;
	sliceColor?: string;
	flyAngle?: number;
	className?: string;
	animationDuration?: number;
	step1Duration?: number;
	step2Duration?: number;
	returnDelay?: number;
	returnDuration?: number;
	cyclePause?: number;
	initialDelay?: number;
	step1Offset?: number;
	step2Offset?: number;
	sliceDistance1?: number;
	sliceDistance2?: number;
}

export default function PieChart({
	sliceAngle = 60,
	mainColor = '#3C588F',
	sliceColor = '#29406D',
	flyAngle = -45,
	className = '',
	animationDuration = 4000,
	step1Duration = 800,
	step2Duration = 1600,
	returnDelay = 3200,
	returnDuration = 800,
	cyclePause = 2000,
	initialDelay = 1000,
	step1Offset = 10,
	step2Offset = 20,
	sliceDistance1 = 15,
	sliceDistance2 = 30
}: PieChartProps) {
	const chartRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(chartRef, { margin: "0px 0px -100px 0px" });
	const [showHole, setShowHole] = useState(false);
	const [animationStep, setAnimationStep] = useState(0);
	const prefersReducedMotion = useReducedMotion();

	const radius = 100;
	const center = 150;

	const startAngle = flyAngle;
	const endAngle = startAngle + sliceAngle;
	
	const startRad = (startAngle * Math.PI) / 180;
	const endRad = (endAngle * Math.PI) / 180;

	const x1 = center + radius * Math.cos(startRad);
	const y1 = center + radius * Math.sin(startRad);
	const x2 = center + radius * Math.cos(endRad);
	const y2 = center + radius * Math.sin(endRad);

	const largeArc = sliceAngle > 180 ? 1 : 0;

	const slicePath = `
		M ${center} ${center}
		L ${x1} ${y1}
		A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
		Z
	`;

	const mainPath = `
		M ${center} ${center}
		L ${x2} ${y2}
		A ${radius} ${radius} 0 ${largeArc === 1 ? 0 : 1} 1 ${x1} ${y1}
		Z
	`;

	useEffect(() => {
		if (!isInView || prefersReducedMotion) return;
		
		const timeouts: NodeJS.Timeout[] = [];
		
		const startAnimation = () => {
			const t1 = setTimeout(() => {
				setShowHole(true);
				setAnimationStep(1);
			}, step1Duration);
			timeouts.push(t1);
			
			const t2 = setTimeout(() => setAnimationStep(2), step2Duration);
			timeouts.push(t2);
			
			const t3 = setTimeout(() => {
				setAnimationStep(0);
			}, returnDelay);
			timeouts.push(t3);
			
			const t4 = setTimeout(() => {
				setShowHole(false);
				const t5 = setTimeout(startAnimation, cyclePause);
				timeouts.push(t5);
			}, animationDuration);
			timeouts.push(t4);
		};

		const timeout = setTimeout(startAnimation, initialDelay);
		timeouts.push(timeout);
		
		return () => {
			timeouts.forEach(t => clearTimeout(t));
		};
	}, [animationDuration, step1Duration, step2Duration, returnDelay, cyclePause, initialDelay, isInView, prefersReducedMotion]);

	const getSlicePosition = () => {
		const circleOffset = getCircleOffset();
		const sliceCenterAngle = (startAngle + endAngle) / 2;
		const centerAngleRad = (sliceCenterAngle * Math.PI) / 180;
		
		switch (animationStep) {
			case 1: return { 
				x: sliceDistance1 * Math.cos(centerAngleRad), 
				y: sliceDistance1 * Math.sin(centerAngleRad) + circleOffset 
			};   
			case 2: return { 
				x: sliceDistance2 * Math.cos(centerAngleRad), 
				y: sliceDistance2 * Math.sin(centerAngleRad) + circleOffset 
			};   
			default: return { x: 0, y: circleOffset };
		}
	};

	const getCircleOffset = () => {
		switch (animationStep) {
			case 1: return step1Offset;
			case 2: return step2Offset;
			default: return 0;
		}
	};

	const slicePos = getSlicePosition();
	const circleOffset = getCircleOffset();

	return (
		<div ref={chartRef} className={`flex items-start justify-center will-change-transform overflow-visible absolute right-0 top-[15%] z-[-1] xs:top-[5%] md:relative md:top-auto md:right-auto ${className}`}>
			<svg className="block overflow-visible w-[230px] h-[230px] md:w-[300px] md:h-[300px]" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges" overflow="visible">
				<motion.g
					style={{ willChange: 'transform' }}
					animate={{ y: circleOffset }}
					transition={{
						duration: prefersReducedMotion ? 0.1 : returnDuration / 1000,
						ease: [0.42, 0, 0.58, 1],
						type: 'tween'
					}}
				>
					{!showHole && (
						<circle
							cx={center}
							cy={center}
							r={radius}
							fill={mainColor}
						/>
					)}
					{showHole && (
						<path
							d={mainPath}
							fill={mainColor}
						/>
					)}
				</motion.g>

				<motion.path
					d={slicePath}
					style={{ willChange: 'transform, fill' }}
					animate={{
						fill: animationStep > 0 ? sliceColor : mainColor,
						x: slicePos.x,
						y: slicePos.y
					}}
					transition={{
						duration: prefersReducedMotion ? 0.1 : returnDuration / 1000,
						ease: [0.42, 0, 0.58, 1],
						type: 'tween'
					}}
				/>
			</svg>
		</div>
	);
}
