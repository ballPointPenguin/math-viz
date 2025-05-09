import {
	Circle,
	Coordinates,
	Line,
	Mafs,
	Text as MafsText,
	Plot,
	Point,
	Theme,
	useMovablePoint,
} from "mafs";
import React, { useState, useEffect, useMemo } from "react";
import "mafs/core.css";
import { Box, Button, Flex, Heading, Slider, Text } from "@radix-ui/themes";
import { BlockMath } from "../KaTeX.jsx";
import * as styles from "./MafsTrigFunctions.css.ts";

// Constants
const RADIUS = 1;
const WAVE_START = 0;
const WAVE_END = 4 * Math.PI;

export function MafsTrigFunctions() {
	const [theta, setTheta] = useState(Math.PI / 4);
	const [initialTheta] = useState(theta);
	const [isPaused, setIsPaused] = useState(false);
	const [speed, setSpeed] = useState(1);

	// Memoize initial point array to avoid infinite updates
	const initialPoint = useMemo(
		() => [Math.cos(initialTheta), Math.sin(initialTheta)],
		[initialTheta],
	);

	// Create a movable point on the unit circle (only on mount)
	const movablePoint = useMovablePoint(initialPoint, {
		constrain: ([x, y]) => {
			// Constrain to unit circle
			const r = Math.sqrt(x * x + y * y);
			return [x / r, y / r];
		},
		onMove: ([x, y]) => {
			setIsPaused(true);
			const angle = Math.atan2(y, x);
			setTheta((angle + 2 * Math.PI) % (2 * Math.PI));
		},
	});

	// Animation effect
	useEffect(() => {
		if (!isPaused) {
			const id = setInterval(() => {
				setTheta((t) => (t + 0.01 * speed) % (2 * Math.PI));
			}, 16);
			return () => clearInterval(id);
		}
	}, [isPaused, speed]);

	// Update movable point when theta changes
	useEffect(() => {
		movablePoint.setPoint([Math.cos(theta), Math.sin(theta)]);
	}, [theta, movablePoint.setPoint]);

	// Trig values
	const x = Math.cos(theta);
	const y = Math.sin(theta);
	const tanValue = Math.tan(theta);

	// Format values with 2 decimal places and handle special cases
	const formatValue = (value) => {
		if (!Number.isFinite(value)) return "undefined";
		return value.toFixed(2);
	};

	// Format angle in degrees and radians
	const formatAngle = () => {
		const degrees = ((theta * 180) / Math.PI) % 360;
		return {
			degrees: `${degrees.toFixed(0)}°`,
			radians: `${(theta % (2 * Math.PI)).toFixed(2)} rad`,
		};
	};

	// Function to determine the quadrant
	const getQuadrant = () => {
		if (x > 0 && y > 0) return "I";
		if (x < 0 && y > 0) return "II";
		if (x < 0 && y < 0) return "III";
		if (x > 0 && y < 0) return "IV";

		// On axes
		if (x === 0 && y > 0) return "positive y-axis";
		if (x === 0 && y < 0) return "negative y-axis";
		if (y === 0 && x > 0) return "positive x-axis";
		if (y === 0 && x < 0) return "negative x-axis";
		return "origin";
	};

	const isEven = (value) => value % 2 === 0;

	return (
		<Box className={styles.container}>
			<Heading as="h2" size="5" className={styles.headingMargin}>
				Interactive Unit Circle with Sine, Cosine, and Tangent
			</Heading>
			<Text as="p" className={styles.headingMargin}>
				Drag the blue point on the unit circle or use the controls to animate.
				Watch how the values of sine, cosine, and tangent change as the angle θ
				varies.
			</Text>

			{/* Controls */}
			<Flex className={styles.controls}>
				<Button onClick={() => setIsPaused((p) => !p)}>
					{isPaused ? "Play Animation" : "Pause Animation"}
				</Button>
				<Flex align="center" gap="2">
					<Text as="label">Speed:</Text>
					<Slider
						style={{ flexGrow: 1, minWidth: "100px" }}
						value={[speed]}
						min={0.5}
						max={3}
						step={0.5}
						onValueChange={([val]) => setSpeed(val)}
					/>
					<Text>{speed}x</Text>
				</Flex>
			</Flex>

			<Flex className={styles.canvasRow}>
				{/* Unit Circle */}
				<Box style={{ flex: 1, minWidth: "400px" }}>
					<Mafs height={400} viewBox={{ x: [-1.5, 1.5], y: [-1.5, 1.5] }}>
						<Coordinates.Cartesian
							xAxis={{
								labels: (value) => value.toFixed(0),
								axis: true,
							}}
							yAxis={{
								labels: (value) => value.toFixed(0),
								axis: true,
							}}
						/>

						{/* Unit Circle */}
						<Circle
							center={[0, 0]}
							radius={1}
							color={Theme.blue}
							fillOpacity={0.1}
						/>

						{/* Radius to point */}
						<Line.Segment
							point1={[0, 0]}
							point2={[x, y]}
							color={Theme.indigo}
							weight={2}
						/>

						{/* Cosine projection on x-axis */}
						<Line.Segment
							point1={[0, 0]}
							point2={[x, 0]}
							color={Theme.red}
							weight={2}
						/>

						{/* Sine projection on y-axis */}
						<Line.Segment
							point1={[0, 0]}
							point2={[0, y]}
							color={Theme.green}
							weight={2}
						/>

						{/* Lines from point to axes */}
						<Line.Segment
							point1={[x, y]}
							point2={[x, 0]}
							color={Theme.green}
							style="dashed"
						/>
						<Line.Segment
							point1={[x, y]}
							point2={[0, y]}
							color={Theme.red}
							style="dashed"
						/>

						{/* Tangent visualization */}
						<Line.Segment
							point1={[1, 0]}
							point2={[1, tanValue]}
							color={Theme.purple}
							weight={2}
							visible={Math.abs(tanValue) < 10} // Hide when tangent value is too large
						/>

						{/* Angle arc */}
						<Plot.Parametric
							t={[0, theta]}
							weight={2}
							color={Theme.yellow}
							xy={(t) => [0.2 * Math.cos(t), 0.2 * Math.sin(t)]}
						/>

						{/* Angle label */}
						<MafsText
							x={0.3 * Math.cos(theta / 2)}
							y={0.3 * Math.sin(theta / 2)}
							size={16}
						>
							θ
						</MafsText>

						{/* Label cosine */}
						<MafsText x={x / 2} y={-0.1} color={Theme.red} size={12}>
							cos(θ)
						</MafsText>

						{/* Label sine */}
						<MafsText x={-0.2} y={y / 2} color={Theme.green} size={12}>
							sin(θ)
						</MafsText>

						{/* Label tangent */}
						<MafsText
							x={1.1}
							y={tanValue / 2}
							color={Theme.purple}
							size={12}
							visible={Math.abs(tanValue) < 5}
						>
							tan(θ)
						</MafsText>

						{/* Points */}
						{movablePoint.element}
						<Point x={x} y={0} color={Theme.red} />
						<Point x={0} y={y} color={Theme.green} />
						<Point
							x={1}
							y={tanValue}
							color={Theme.purple}
							visible={Math.abs(tanValue) < 10}
						/>
					</Mafs>
				</Box>

				{/* Trig function plots */}
				<Box style={{ flex: 1, minWidth: "400px" }}>
					<Mafs
						height={400}
						viewBox={{ x: [WAVE_START, WAVE_END], y: [-1.5, 1.5] }}
					>
						<Coordinates.Cartesian
							xAxis={{
								labels: (value) => (isEven(value) ? value.toFixed(0) : ""),
								axis: true,
							}}
							yAxis={{
								labels: (value) => (isEven(value) ? value.toFixed(0) : ""),
								axis: true,
							}}
						/>

						{/* Sine, Cosine, and Tangent curves */}
						<Plot.OfX y={Math.sin} color={Theme.green} weight={2} />
						<Plot.OfX y={Math.cos} color={Theme.red} weight={2} />
						<Plot.OfX
							y={(x) => Math.tan(x)}
							color={Theme.purple}
							weight={2}
							domain={[WAVE_START, WAVE_END]}
							discontinuities={(x) => Math.abs(Math.cos(x)) < 0.1}
						/>

						{/* Current values as points on the curves */}
						<Point x={theta} y={Math.sin(theta)} color={Theme.green} />
						<Point x={theta} y={Math.cos(theta)} color={Theme.red} />
						<Point
							x={theta}
							y={Math.tan(theta)}
							color={Theme.purple}
							visible={Math.abs(Math.tan(theta)) < 10}
						/>

						{/* Vertical line showing current angle */}
						<Line.Segment
							point1={[theta, -1.5]}
							point2={[theta, 1.5]}
							color={Theme.black}
							style="dashed"
							opacity={0.5}
						/>

						{/* Labels */}
						<MafsText x={WAVE_END - 1.5} y={0.2} color={Theme.green} size={12}>
							sin(θ)
						</MafsText>
						<MafsText x={WAVE_END - 1.5} y={-0.2} color={Theme.red} size={12}>
							cos(θ)
						</MafsText>
						<MafsText x={WAVE_END - 1.5} y={1} color={Theme.purple} size={12}>
							tan(θ)
						</MafsText>
					</Mafs>
				</Box>
			</Flex>

			{/* Values Display */}
			<Box className={styles.valuesSection}>
				<Box>
					<Heading as="h3" size="4" className={styles.headingMargin}>
						Angle θ
					</Heading>
					<Text as="p">
						<strong>Degrees:</strong> {formatAngle().degrees}
						<br />
						<strong>Radians:</strong> {formatAngle().radians}
						<br />
						<strong>Quadrant:</strong> {getQuadrant()}
					</Text>
				</Box>

				<Box>
					<Heading as="h3" size="4" className={styles.headingMargin}>
						Trigonometric Values
					</Heading>
					<Text as="p">
						<Text as="span" style={{ color: Theme.red }}>
							cos(θ) = {formatValue(x)}
						</Text>
						<br />
						<Text as="span" style={{ color: Theme.green }}>
							sin(θ) = {formatValue(y)}
						</Text>
						<br />
						<Text as="span" style={{ color: Theme.purple }}>
							tan(θ) = {formatValue(tanValue)}
						</Text>
					</Text>
				</Box>

				<Box>
					<Heading as="h3" size="4" className={styles.headingMargin}>
						Identities
					</Heading>
					<Text as="p">
						<span>sin²(θ) + cos²(θ) = {formatValue(x * x + y * y)}</span>
						<br />
						<span>tan(θ) = sin(θ) / cos(θ) = {formatValue(y / x)}</span>
					</Text>
				</Box>
			</Box>

			{/* Mathematical expressions with KaTeX */}
			<Box className={styles.formulasSection}>
				<Heading as="h3" size="4" className={styles.headingMargin}>
					Key Trigonometric Formulas
				</Heading>
				<Flex gap="6" style={{ flexWrap: "wrap" }}>
					<div>
						<h4>Pythagorean Identity</h4>
						<BlockMath math="\\sin^2(\\theta) + \\cos^2(\\theta) = 1" />
					</div>

					<div>
						<h4>Tangent Definition</h4>
						<BlockMath math="\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}" />
					</div>

					<div>
						<h4>Periodicity</h4>
						<BlockMath math="\\sin(\\theta + 2\\pi) = \\sin(\\theta)" />
						<BlockMath math="\\cos(\\theta + 2\\pi) = \\cos(\\theta)" />
					</div>
				</Flex>
			</Box>
		</Box>
	);
}
