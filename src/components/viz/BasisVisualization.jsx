import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Box, Flex, Slider, Switch, Text } from "@radix-ui/themes";
import { all, create } from "mathjs/number";
import React, { useState, useCallback } from "react";

import * as styles from "./BasisVisualization.css";
import Vector from "./Vector";

// Configure mathjs - using only number implementation for better performance
const MATH = create(all);

/**
 * A sketch to visualize basis vectors and their linear combinations
 */
const BasisSketch = ({
	basis1 = { x: 1, y: 0 },
	basis2 = { x: 0, y: 1 },
	targetVector = { x: 2, y: 1.5 },
	width = 400,
	height = 400,
	showCoordinates = true,
	showGrid = true,
	gridSize = 20,
	scale = 40,
	useStandardBasis = true,
}) => {
	return ({ p5 }) => {
		// Setup the canvas
		p5.setup = () => {
			p5.createCanvas(width, height);
		};

		p5.draw = () => {
			p5.background(30);

			// Center coordinate system
			const originX = width / 2;
			const originY = height / 2;
			const origin = { x: originX, y: originY };

			// Draw grid
			if (showGrid) {
				p5.stroke(60);
				p5.strokeWeight(1);

				// Draw grid lines
				for (let x = 0; x <= width; x += gridSize) {
					p5.line(x, 0, x, height);
				}
				for (let y = 0; y <= height; y += gridSize) {
					p5.line(0, y, width, y);
				}
			}

			// Draw axes
			p5.stroke(100);
			p5.strokeWeight(2);
			p5.line(0, originY, width, originY); // x-axis
			p5.line(originX, 0, originX, height); // y-axis

			// Scale the vectors for display
			const scaledBasis1 = { x: basis1.x * scale, y: basis1.y * scale };
			const scaledBasis2 = { x: basis2.x * scale, y: basis2.y * scale };

			// Draw basis vectors
			Vector({
				p5,
				vector: scaledBasis1,
				origin,
				color: "#FF6B6B",
				label: "e₁",
				showComponents: false,
				strokeWeight: 3,
			});

			Vector({
				p5,
				vector: scaledBasis2,
				origin,
				color: "#4ECDC4",
				label: "e₂",
				showComponents: false,
				strokeWeight: 3,
			});

			// Calculate coordinates in terms of the basis vectors
			let coordinates;
			let scaledTarget;

			if (useStandardBasis) {
				// Standard basis - just use the target vector components directly
				coordinates = { x: targetVector.x, y: targetVector.y };
				scaledTarget = {
					x: targetVector.x * scale,
					y: targetVector.y * scale,
				};
			} else {
				// Non-standard basis - solve the linear system:
				// targetVector = a * basis1 + b * basis2
				// We need to solve for a and b

				// Create the coefficient matrix [basis1.x, basis2.x; basis1.y, basis2.y]
				const det = basis1.x * basis2.y - basis1.y * basis2.x;

				if (Math.abs(det) < 1e-10) {
					// Determinant is zero, basis vectors are linearly dependent
					p5.fill(255, 0, 0);
					p5.noStroke();
					p5.textSize(16);
					p5.text("Error: Basis vectors are linearly dependent!", 10, 30);
					return;
				}

				// Solve for coordinates in this basis
				const a = (targetVector.x * basis2.y - targetVector.y * basis2.x) / det;
				const b = (basis1.x * targetVector.y - basis1.y * targetVector.x) / det;

				coordinates = { x: a, y: b };

				// Calculate the target vector as a linear combination of basis vectors
				scaledTarget = {
					x: a * scaledBasis1.x + b * scaledBasis2.x,
					y: a * scaledBasis1.y + b * scaledBasis2.y,
				};
			}

			// Draw the target vector
			Vector({
				p5,
				vector: scaledTarget,
				origin,
				color: "#F3DE2C",
				label: "v",
				strokeWeight: 3,
			});

			// Draw the decomposed vector components along basis vectors
			if (!useStandardBasis) {
				// First basis component
				Vector({
					p5,
					vector: {
						x: coordinates.x * scaledBasis1.x,
						y: coordinates.x * scaledBasis1.y,
					},
					origin,
					color: "#FF6B6B",
					label: `${coordinates.x.toFixed(1)}e₁`,
					strokeWeight: 2,
					showComponents: false,
				});

				// Second basis component (from the end of first component)
				Vector({
					p5,
					vector: {
						x: coordinates.y * scaledBasis2.x,
						y: coordinates.y * scaledBasis2.y,
					},
					origin: {
						x: origin.x + coordinates.x * scaledBasis1.x,
						y: origin.y + coordinates.x * scaledBasis1.y,
					},
					color: "#4ECDC4",
					label: `${coordinates.y.toFixed(1)}e₂`,
					strokeWeight: 2,
					showComponents: false,
				});
			}

			// Display the coordinates
			if (showCoordinates) {
				p5.push();
				p5.fill(255);
				p5.noStroke();
				p5.textSize(16);

				if (useStandardBasis) {
					p5.text(
						`v = (${targetVector.x.toFixed(1)}, ${targetVector.y.toFixed(1)})`,
						10,
						30,
					);
				} else {
					const basisText = `v = ${coordinates.x.toFixed(1)}e₁ + ${coordinates.y.toFixed(1)}e₂`;
					p5.text(basisText, 10, 30);
					p5.text(
						`Where: e₁ = (${basis1.x.toFixed(1)}, ${basis1.y.toFixed(1)}), e₂ = (${basis2.x.toFixed(1)}, ${basis2.y.toFixed(1)})`,
						10,
						55,
					);
				}
				p5.pop();
			}
		};
	};
};

/**
 * An interactive visualization for vector basis concepts
 */
const BasisVisualization = ({
	initialBasis1 = { x: 1, y: 0 },
	initialBasis2 = { x: 0, y: 1 },
	initialTargetVector = { x: 2, y: 1.5 },
	width = 400,
	height = 400,
	interactive = true,
}) => {
	const [basis1, setBasis1] = useState(initialBasis1);
	const [basis2, setBasis2] = useState(initialBasis2);
	const [targetVector, setTargetVector] = useState(initialTargetVector);
	const [useStandardBasis, setUseStandardBasis] = useState(true);
	const [showCoordinates, setShowCoordinates] = useState(true);

	// Handle basis1 changes
	const handleBasis1Change = useCallback((axis, value) => {
		setBasis1((prev) => ({
			...prev,
			[axis]: value,
		}));
	}, []);

	// Handle basis2 changes
	const handleBasis2Change = useCallback((axis, value) => {
		setBasis2((prev) => ({
			...prev,
			[axis]: value,
		}));
	}, []);

	// Handle target vector changes
	const handleTargetChange = useCallback((axis, value) => {
		setTargetVector((prev) => ({
			...prev,
			[axis]: value,
		}));
	}, []);

	// Reset to standard basis
	const resetToStandardBasis = useCallback(() => {
		setBasis1({ x: 1, y: 0 });
		setBasis2({ x: 0, y: 1 });
	}, []);

	// Calculate the determinant of the basis vectors
	const determinant = basis1.x * basis2.y - basis1.y * basis2.x;
	const isValidBasis = Math.abs(determinant) > 1e-10;

	return (
		<Flex direction="column" gap="3">
			<Box height={height} width={width} className={styles.canvasContainer}>
				<ReactP5Wrapper
					sketch={BasisSketch}
					basis1={basis1}
					basis2={basis2}
					targetVector={targetVector}
					width={width}
					height={height}
					showCoordinates={showCoordinates}
					useStandardBasis={useStandardBasis}
				/>
			</Box>

			{interactive && (
				<Flex direction="column" gap="3" className={styles.controls}>
					<Flex gap="4" align="center" justify="between">
						<Flex gap="2" align="center">
							<Text size="2">Standard Basis</Text>
							<Switch
								checked={useStandardBasis}
								onCheckedChange={setUseStandardBasis}
							/>
						</Flex>

						<Flex gap="2" align="center">
							<Text size="2">Show Coordinates</Text>
							<Switch
								checked={showCoordinates}
								onCheckedChange={setShowCoordinates}
							/>
						</Flex>
					</Flex>

					{!useStandardBasis && (
						<>
							<Box>
								<Flex gap="2" align="center">
									<Text size="2" weight="bold">
										First Basis Vector (e₁)
									</Text>
									{!isValidBasis && (
										<Text size="1" color="red">
											Basis vectors are linearly dependent!
										</Text>
									)}
								</Flex>
								<Flex gap="2" align="center">
									<Text size="1">x:</Text>
									<Slider
										defaultValue={[initialBasis1.x]}
										min={-2}
										max={2}
										step={0.1}
										value={[basis1.x]}
										onValueChange={([value]) => handleBasis1Change("x", value)}
									/>
									<Text size="1" width="30px">
										{basis1.x.toFixed(1)}
									</Text>
								</Flex>
								<Flex gap="2" align="center">
									<Text size="1">y:</Text>
									<Slider
										defaultValue={[initialBasis1.y]}
										min={-2}
										max={2}
										step={0.1}
										value={[basis1.y]}
										onValueChange={([value]) => handleBasis1Change("y", value)}
									/>
									<Text size="1" width="30px">
										{basis1.y.toFixed(1)}
									</Text>
								</Flex>
							</Box>

							<Box>
								<Text size="2" weight="bold">
									Second Basis Vector (e₂)
								</Text>
								<Flex gap="2" align="center">
									<Text size="1">x:</Text>
									<Slider
										defaultValue={[initialBasis2.x]}
										min={-2}
										max={2}
										step={0.1}
										value={[basis2.x]}
										onValueChange={([value]) => handleBasis2Change("x", value)}
									/>
									<Text size="1" width="30px">
										{basis2.x.toFixed(1)}
									</Text>
								</Flex>
								<Flex gap="2" align="center">
									<Text size="1">y:</Text>
									<Slider
										defaultValue={[initialBasis2.y]}
										min={-2}
										max={2}
										step={0.1}
										value={[basis2.y]}
										onValueChange={([value]) => handleBasis2Change("y", value)}
									/>
									<Text size="1" width="30px">
										{basis2.y.toFixed(1)}
									</Text>
								</Flex>
							</Box>

							<Box>
								<Flex gap="2" justify="end">
									<Box
										className={styles.resetButton}
										onClick={resetToStandardBasis}
									>
										Reset to Standard Basis
									</Box>
								</Flex>
							</Box>
						</>
					)}

					<Box>
						<Text size="2" weight="bold">
							Target Vector (v)
						</Text>
						<Flex gap="2" align="center">
							<Text size="1">x:</Text>
							<Slider
								defaultValue={[initialTargetVector.x]}
								min={-4}
								max={4}
								step={0.1}
								value={[targetVector.x]}
								onValueChange={([value]) => handleTargetChange("x", value)}
							/>
							<Text size="1" width="30px">
								{targetVector.x.toFixed(1)}
							</Text>
						</Flex>
						<Flex gap="2" align="center">
							<Text size="1">y:</Text>
							<Slider
								defaultValue={[initialTargetVector.y]}
								min={-4}
								max={4}
								step={0.1}
								value={[targetVector.y]}
								onValueChange={([value]) => handleTargetChange("y", value)}
							/>
							<Text size="1" width="30px">
								{targetVector.y.toFixed(1)}
							</Text>
						</Flex>
					</Box>
				</Flex>
			)}
		</Flex>
	);
};

export default BasisVisualization;
