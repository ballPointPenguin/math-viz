import React from 'react';
import { Box, Grid, Heading, Text } from "@radix-ui/themes";
import { LightningBoltIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import FeatureCard from "./ui/FeatureCard";
import * as styles from "./home.css";

// Define local SVG icons (Consider extracting to separate files later)
function WaveformIcon() {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2 12H4C4.55 12 5 11.55 5 11V7C5 6.45 4.55 6 4 6H2C1.45 6 1 6.45 1 7V11C1 11.55 1.45 12 2 12Z" fill="currentColor" />
			<path d="M6 18H8C8.55 18 9 17.55 9 17V13C9 12.45 8.55 12 8 12H6C5.45 12 5 12.45 5 13V17C5 17.55 5.45 18 6 18Z" fill="currentColor" />
			<path d="M10 21H12C12.55 21 13 20.55 13 20V4C13 3.45 12.55 3 12 3H10C9.45 3 9 3.45 9 4V20C9 20.55 9.45 21 10 21Z" fill="currentColor" />
			<path d="M14 18H16C16.55 18 17 17.55 17 17V7C17 6.45 16.55 6 16 6H14C13.45 6 13 6.45 13 7V17C13 17.55 13.45 18 14 18Z" fill="currentColor" />
			<path d="M18 13H20C20.55 13 21 12.55 21 12V11C21 10.45 20.55 10 20 10H18C17.45 10 17 10.45 17 11V12C17 12.55 17.45 13 18 13Z" fill="currentColor" />
		</svg>
	);
}

function VectorIcon() {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 2L4 6V12M12 2L20 6V12M12 2V8M4 12L12 16L20 12M4 12V18L12 22M20 12V18L12 22M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
}

export default function Home() {
	return (
		<Box className={styles.homeContainer}>
			<Heading as="h1" size="8" mb="3" className={styles.gradientHeading}>
				Welcome to Math Visualizations
			</Heading>
			
			<Text as="p" size="4" className={styles.introText}>
				Explore mathematical concepts through interactive visualizations and guided examples.
				This project combines the beauty of mathematics with the power of visual understanding.
			</Text>
			
			<Grid 
				columns={{ initial: '1', sm: '2', md: '3' }}
				gap="4"
				width="100%"
				mt="5"
			>
				{/* Featured Section Cards */}
				<FeatureCard 
					title="Trigonometry" 
					description="Explore the unit circle, sine, cosine, and other trigonometric functions."
					icon={<WaveformIcon />} 
					linkPath="/unit-circle" 
				/>
				
				<FeatureCard 
					title="Linear Algebra" 
					description="Understand vectors, operations, and dot products through visualization."
					icon={<VectorIcon />} 
					linkPath="/vector-addition" 
				/>
				
				<FeatureCard 
					title="Interactive Demos" 
					description="Experiment with dynamic, interactive models of mathematical concepts."
					icon={<LightningBoltIcon />} 
					linkPath="/sine-cosine-interactive" 
				/>
				
				<FeatureCard 
					title="Component Library" 
					description="Explore our collection of visualization components for math education."
					icon={<PlusCircledIcon />} 
					linkPath="/math-viz-demo" 
				/>
			</Grid>
			
			{/* Decorative elements - Use VE styles */}
			<div className={styles.decorativeElement.element1} />
			<div className={styles.decorativeElement.element2} />
		</Box>
	);
}
