import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Box, Flex, Slider, Text } from "@radix-ui/themes";
import { all, create } from "mathjs/number";
import React, { useState, useCallback } from "react";

import * as styles from "./DotProductVisualization.css";
import ScalarProjection from "./ScalarProjection";
import Vector from "./Vector";

// Configure mathjs - using only number implementation for better performance
const MATH = create(all);

const DotProductSketch = ({
	vectorA = { x: 100, y: 50 },
	vectorB = { x: 80, y: 120 },
	width = 400,
	height = 400,
	showProjection = true,
	showComponents = true,
	showAngle = true,
	gridSize = 20,
}) => {
	return ({ p5 }) => {
		// Setup the canvas
		p5.setup = () => {
			p5.createCanvas(width, height);
		};

		p5.draw = () => {
			p5.background(30);

			// Draw grid
			p5.stroke(60);
			p5.strokeWeight(1);

			// Draw grid lines
			for (let x = 0; x <= width; x += gridSize) {
				p5.line(x, 0, x, height);
			}
			for (let y = 0; y <= height; y += gridSize) {
				p5.line(0, y, width, y);
			}

			// Center coordinate system
			const originX = width / 2;
			const originY = height / 2;

			// Draw axes
			p5.stroke(100);
			p5.strokeWeight(2);
			p5.line(0, originY, width, originY); // x-axis
			p5.line(originX, 0, originX, height); // y-axis

			// Origin
			const origin = { x: originX, y: originY };

			// Draw vectors
			Vector({
				p5,
				vector: vectorA,
				origin,
				color: "#a377ff",
				label: "A",
				showComponents,
			});

			Vector({
				p5,
				vector: vectorB,
				origin,
				color: "#43ecff",
				label: "B",
				showComponents,
			});

			// Draw the projection if needed
			if (showProjection) {
				ScalarProjection({
					p5,
					vectorA,
					vectorB,
					origin,
					showValue: true,
					label: "proj",
				});
			}

			// Calculate dot product
			const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;

			// Calculate magnitudes
			const magA = Math.sqrt(vectorA.x * vectorA.x + vectorA.y * vectorA.y);
			const magB = Math.sqrt(vectorB.x * vectorB.x + vectorB.y * vectorB.y);

			// Calculate angle between vectors
			const angle = Math.acos(dotProduct / (magA * magB));

			// Display dot product and angle
			p5.push();
			p5.noStroke();
			p5.fill(255);
			p5.textSize(14);
			p5.textAlign(p5.LEFT, p5.TOP);
			p5.text(`Dot Product: ${dotProduct.toFixed(2)}`, 10, 10);
			p5.text(`|A| = ${magA.toFixed(2)}`, 10, 30);
			p5.text(`|B| = ${magB.toFixed(2)}`, 10, 50);

			if (showAngle) {
				p5.text(`Angle: ${((angle * 180) / Math.PI).toFixed(2)}°`, 10, 70);

				// Draw the angle arc
				p5.noFill();
				p5.stroke("#ef47ee");
				p5.strokeWeight(1);
				const arcRadius = 30;
				p5.arc(
					origin.x,
					origin.y,
					arcRadius * 2,
					arcRadius * 2,
					Math.atan2(vectorA.y, vectorA.x),
					Math.atan2(vectorB.y, vectorB.x),
				);
			}
			p5.pop();
		};
	};
};

/**
 * An interactive visualization for vector dot products
 */
const DotProductVisualization = ({
	initialVectorA = { x: 100, y: 50 },
	initialVectorB = { x: 80, y: 120 },
	width = 400,
	height = 400,
	interactive = true,
}) => {
	const [vectorA, setVectorA] = useState(initialVectorA);
	const [vectorB, setVectorB] = useState(initialVectorB);
	const [showProjection, setShowProjection] = useState(true);
	const [showComponents, setShowComponents] = useState(true);
	const [showAngle, setShowAngle] = useState(true);

	// Handle vector A changes
	const handleVectorAChange = useCallback((axis, value) => {
		setVectorA((prev) => ({
			...prev,
			[axis]: value,
		}));
	}, []);

	// Handle vector B changes
	const handleVectorBChange = useCallback((axis, value) => {
		setVectorB((prev) => ({
			...prev,
			[axis]: value,
		}));
	}, []);

	return (
		<Flex direction="column" gap="3">
			<Box height={height} width={width} className={styles.canvasContainer}>
				<ReactP5Wrapper
					sketch={DotProductSketch}
					vectorA={vectorA}
					vectorB={vectorB}
					width={width}
					height={height}
					showProjection={showProjection}
					showComponents={showComponents}
					showAngle={showAngle}
				/>
			</Box>

			{interactive && (
				<Flex direction="column" gap="3" className={styles.controls}>
					<Box>
						<Text size="2" weight="bold">
							Vector A
						</Text>
						<Flex gap="2" align="center">
							<Text size="1">x:</Text>
							<Slider
								defaultValue={[initialVectorA.x]}
								min={-200}
								max={200}
								step={1}
								value={[vectorA.x]}
								onValueChange={([value]) => handleVectorAChange("x", value)}
							/>
							<Text size="1" width="30px">
								{vectorA.x}
							</Text>
						</Flex>
						<Flex gap="2" align="center">
							<Text size="1">y:</Text>
							<Slider
								defaultValue={[initialVectorA.y]}
								min={-200}
								max={200}
								step={1}
								value={[vectorA.y]}
								onValueChange={([value]) => handleVectorAChange("y", value)}
							/>
							<Text size="1" width="30px">
								{vectorA.y}
							</Text>
						</Flex>
					</Box>

					<Box>
						<Text size="2" weight="bold">
							Vector B
						</Text>
						<Flex gap="2" align="center">
							<Text size="1">x:</Text>
							<Slider
								defaultValue={[initialVectorB.x]}
								min={-200}
								max={200}
								step={1}
								value={[vectorB.x]}
								onValueChange={([value]) => handleVectorBChange("x", value)}
							/>
							<Text size="1" width="30px">
								{vectorB.x}
							</Text>
						</Flex>
						<Flex gap="2" align="center">
							<Text size="1">y:</Text>
							<Slider
								defaultValue={[initialVectorB.y]}
								min={-200}
								max={200}
								step={1}
								value={[vectorB.y]}
								onValueChange={([value]) => handleVectorBChange("y", value)}
							/>
							<Text size="1" width="30px">
								{vectorB.y}
							</Text>
						</Flex>
					</Box>

					<Flex gap="4">
						<Flex gap="1" align="center">
							<input
								type="checkbox"
								id="showProjection"
								checked={showProjection}
								onChange={(e) => setShowProjection(e.target.checked)}
							/>
							<Text as="label" htmlFor="showProjection" size="1">
								Show Projection
							</Text>
						</Flex>

						<Flex gap="1" align="center">
							<input
								type="checkbox"
								id="showComponents"
								checked={showComponents}
								onChange={(e) => setShowComponents(e.target.checked)}
							/>
							<Text as="label" htmlFor="showComponents" size="1">
								Show Components
							</Text>
						</Flex>

						<Flex gap="1" align="center">
							<input
								type="checkbox"
								id="showAngle"
								checked={showAngle}
								onChange={(e) => setShowAngle(e.target.checked)}
							/>
							<Text as="label" htmlFor="showAngle" size="1">
								Show Angle
							</Text>
						</Flex>
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default DotProductVisualization;
