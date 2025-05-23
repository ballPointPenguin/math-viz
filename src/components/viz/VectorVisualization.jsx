import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Cross2Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
	Box,
	Button,
	Flex,
	Select,
	Slider,
	Switch,
	Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import * as styles from "./VectorVisualization.css";

// Vector visualization component with dark academia + vaporwave aesthetic
export const VectorVisualization = ({
	width = 500,
	height = 400,
	backgroundColor = "#121212",
	gridColor = "rgba(163, 119, 255, 0.1)",
	axisColor = "rgba(255, 255, 255, 0.5)",
	interactive = true,
	defaultVectors = [],
	showControls = true,
	showResultVector = true,
	showComponents = true,
	showAngles = true,
	showGrid = true,
	showLabels = true,
	operationMode = "add", // add, subtract, dot, cross
	scale = 20, // pixels per unit
	maxVectorMagnitude = 10,
	vectorColors = [
		"rgba(255, 105, 180, 0.8)", // Pink
		"rgba(0, 255, 255, 0.8)", // Cyan
		"rgba(255, 223, 0, 0.8)", // Yellow
		"rgba(138, 43, 226, 0.8)", // Purple
	],
	resultColor = "rgba(0, 255, 127, 0.8)", // Result vector color
}) => {
	const [vectors, setVectors] = useState(
		defaultVectors.length > 0
			? defaultVectors
			: [
					{ x: 3, y: 2, color: vectorColors[0], label: "v₁" },
					{ x: 1, y: 4, color: vectorColors[1], label: "v₂" },
				],
	);
	const [selectedOperation, setSelectedOperation] = useState(operationMode);
	const [draggingVector, setDraggingVector] = useState(null);
	const [showComponentsState, setShowComponentsState] =
		useState(showComponents);
	const [showAnglesState, setShowAnglesState] = useState(showAngles);

	// Calculate result vector based on operation
	const calculateResult = () => {
		if (vectors.length < 2) return null;

		const v1 = vectors[0];
		const v2 = vectors[1];

		switch (selectedOperation) {
			case "add":
				return {
					x: v1.x + v2.x,
					y: v1.y + v2.y,
					color: resultColor,
					label: "v₁ + v₂",
				};
			case "subtract":
				return {
					x: v1.x - v2.x,
					y: v1.y - v2.y,
					color: resultColor,
					label: "v₁ - v₂",
				};
			case "dot": {
				// Dot product is a scalar, not a vector
				const dotProduct = v1.x * v2.x + v1.y * v2.y;
				// Return scaled vector for visualization
				return {
					x:
						((dotProduct / Math.sqrt(v2.x * v2.x + v2.y * v2.y)) * v2.x) /
						Math.sqrt(v2.x * v2.x + v2.y * v2.y),
					y:
						((dotProduct / Math.sqrt(v2.x * v2.x + v2.y * v2.y)) * v2.y) /
						Math.sqrt(v2.x * v2.x + v2.y * v2.y),
					color: resultColor,
					label: "v₁ · v₂",
					value: dotProduct.toFixed(2),
				};
			}
			case "cross": {
				// In 2D, cross product yields a scalar (z-component magnitude)
				const crossProduct = v1.x * v2.y - v1.y * v2.x;
				return {
					value: crossProduct.toFixed(2),
					label: "v₁ × v₂",
					color: resultColor,
				};
			}
			default:
				return null;
		}
	};

	const sketch = (p) => {
		// Setup the canvas
		p.setup = () => {
			const canvas = p.createCanvas(width, height);

			if (interactive) {
				canvas.mousePressed(() => {
					const mouseX = p.mouseX;
					const mouseY = p.mouseY;
					const centerX = width / 2;
					const centerY = height / 2;

					// Check if clicking near the tip of a vector
					vectors.forEach((vector, index) => {
						const screenX = centerX + vector.x * scale;
						const screenY = centerY - vector.y * scale;
						const distance = p.dist(mouseX, mouseY, screenX, screenY);

						if (distance < 10) {
							setDraggingVector(index);
						}
					});
				});

				canvas.mouseReleased(() => {
					setDraggingVector(null);
				});
			}
		};

		// Add global mouseDragged handler
		p.mouseDragged = () => {
			if (draggingVector !== null) {
				const centerX = width / 2;
				const centerY = height / 2;

				// Calculate grid coordinates from mouse position
				const gridX = (p.mouseX - centerX) / scale;
				const gridY = (centerY - p.mouseY) / scale;

				// Constrain to max magnitude
				const magnitude = Math.sqrt(gridX * gridX + gridY * gridY);
				let newX = gridX;
				let newY = gridY;

				if (magnitude > maxVectorMagnitude) {
					newX = (gridX / magnitude) * maxVectorMagnitude;
					newY = (gridY / magnitude) * maxVectorMagnitude;
				}

				// Update vector
				setVectors((prev) => {
					const updated = [...prev];
					updated[draggingVector] = {
						...updated[draggingVector],
						x: Math.round(newX * 10) / 10, // Round to 1 decimal place
						y: Math.round(newY * 10) / 10,
					};
					return updated;
				});
			}
		};

		// Draw the canvas
		p.draw = () => {
			p.background(backgroundColor);

			const centerX = width / 2;
			const centerY = height / 2;

			// Draw grid
			if (showGrid) {
				p.stroke(gridColor);
				p.strokeWeight(0.5);

				// Calculate grid step based on scale
				const gridStep = scale;

				// Vertical lines
				for (let x = centerX % gridStep; x < width; x += gridStep) {
					p.line(x, 0, x, height);
				}

				// Horizontal lines
				for (let y = centerY % gridStep; y < height; y += gridStep) {
					p.line(0, y, width, y);
				}
			}

			// Draw axes
			p.stroke(axisColor);
			p.strokeWeight(1);

			// X-axis
			p.line(0, centerY, width, centerY);

			// Y-axis
			p.line(centerX, 0, centerX, height);

			// Draw axis labels
			if (showLabels) {
				p.fill(axisColor);
				p.noStroke();
				p.textSize(12);
				p.text("x", width - 15, centerY - 5);
				p.text("y", centerX + 5, 15);

				// Draw grid markers
				p.textSize(10);
				for (
					let i = -Math.floor(centerX / scale);
					i <= Math.floor((width - centerX) / scale);
					i++
				) {
					if (i === 0) continue;
					const x = centerX + i * scale;
					p.text(i, x - 3, centerY + 15);
					p.line(x, centerY - 3, x, centerY + 3);
				}

				for (
					let i = -Math.floor(centerY / scale);
					i <= Math.floor((height - centerY) / scale);
					i++
				) {
					if (i === 0) continue;
					const y = centerY - i * scale;
					p.text(i, centerX + 8, y + 4);
					p.line(centerX - 3, y, centerX + 3, y);
				}

				// Origin
				p.text("0", centerX + 5, centerY + 15);
			}

			// Draw vectors
			const result = calculateResult();
			const arrowSize = 10;

			// Draw individual vectors
			vectors.forEach((vector, index) => {
				const endX = centerX + vector.x * scale;
				const endY = centerY - vector.y * scale;

				// Draw vector components
				if (showComponentsState) {
					p.stroke(vector.color);
					p.strokeWeight(1);
					p.line(centerX, centerY, endX, centerY); // X component
					p.line(endX, centerY, endX, endY); // Y component

					// Component labels
					if (showLabels) {
						p.fill(vector.color);
						p.noStroke();
						p.textSize(10);
						p.text(
							`x: ${vector.x}`,
							centerX + (vector.x * scale) / 2 - 10,
							centerY + 15,
						);
						p.text(
							`y: ${vector.y}`,
							endX + 10,
							centerY - (vector.y * scale) / 2,
						);
					}
				}

				// Draw full vector arrow with arrowhead at tip
				const arrowAngle = p.atan2(centerY - endY, endX - centerX);
				p.stroke(vector.color);
				p.strokeWeight(2);
				p.line(centerX, centerY, endX, endY);
				// Draw arrowhead at tip
				p.fill(vector.color);
				p.push();
				p.translate(endX, endY);
				p.rotate(arrowAngle);
				p.triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);
				p.pop();

				// Draw vector label
				if (showLabels) {
					p.fill(vector.color);
					p.noStroke();
					p.textSize(14);
					const labelOffset = 15;
					const labelX = endX + p.cos(arrowAngle) * labelOffset;
					const labelY = endY - p.sin(arrowAngle) * labelOffset;
					p.text(vector.label, labelX, labelY);
				}

				// Show magnitude and angle
				if (showLabels) {
					const magnitude = Math.sqrt(
						vector.x * vector.x + vector.y * vector.y,
					);
					let angleDeg = p.degrees(p.atan2(vector.y, vector.x));
					if (angleDeg < 0) angleDeg += 360;

					p.fill(vector.color);
					p.textSize(12);
					p.text(
						`|${vector.label}| = ${magnitude.toFixed(1)}`,
						10,
						20 + index * 35,
					);

					if (showAnglesState) {
						p.text(
							`∠${vector.label} = ${angleDeg.toFixed(1)}°`,
							10,
							35 + index * 35,
						);

						// Draw angle arc
						p.noFill();
						p.stroke(vector.color);
						p.strokeWeight(1);
						const arcRadius = 20;
						p.arc(
							centerX,
							centerY,
							arcRadius * 2,
							arcRadius * 2,
							0,
							arrowAngle,
						);
					}
				}
			});

			// Draw the result vector
			if (showResultVector && result && selectedOperation !== "cross") {
				// For dot product, we visualize differently
				if (selectedOperation === "dot") {
					// Display dot product value
					p.stroke(resultColor);
					p.noStroke();
					p.textSize(16);
					p.text(`${result.label} = ${result.value}`, 10, height - 30);

					// Visualize projection of v1 onto v2
					const v2 = vectors[1];
					const v2mag = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
					const v2norm = { x: v2.x / v2mag, y: v2.y / v2mag };
					const dotProduct = Number.parseFloat(result.value);
					const projX = centerX + dotProduct * v2norm.x * scale;
					const projY = centerY - dotProduct * v2norm.y * scale;

					p.stroke(resultColor);
					p.strokeWeight(2);
					p.line(centerX, centerY, projX, projY);

					p.fill(resultColor);
					p.noStroke();
					p.ellipse(projX, projY, 8, 8);
				} else {
					// Standard vector representation for add/subtract
					const endX = centerX + result.x * scale;
					const endY = centerY - result.y * scale;

					// Draw translucent components
					if (showComponentsState) {
						p.stroke(result.color);
						p.strokeWeight(1);
						p.line(centerX, centerY, endX, centerY); // X component
						p.line(endX, centerY, endX, endY); // Y component

						// Component labels
						if (showLabels) {
							p.fill(result.color);
							p.noStroke();
							p.textSize(10);
							p.text(
								`x: ${result.x.toFixed(1)}`,
								centerX + (result.x * scale) / 2 - 10,
								centerY + 15,
							);
							p.text(
								`y: ${result.y.toFixed(1)}`,
								endX + 10,
								centerY - (result.y * scale) / 2,
							);
						}
					}

					// Draw visual indicator for add vector (showing the sum)
					if (selectedOperation === "add") {
						const v1 = vectors[0];
						const v2 = vectors[1];
						const v1EndX = centerX + v1.x * scale;
						const v1EndY = centerY - v1.y * scale;

						// Draw v2 starting from the tip of v1 with visual differentiation
						p.stroke(v2.color);
						p.strokeWeight(0.5);
						p.line(v1EndX, v1EndY, endX, endY);
					}

					// Draw full result vector with arrowhead
					const resAngle = p.atan2(centerY - endY, endX - centerX);
					p.stroke(result.color);
					p.strokeWeight(3);
					p.line(centerX, centerY, endX, endY);
					// Arrowhead at tip
					p.fill(result.color);
					p.push();
					p.translate(endX, endY);
					p.rotate(resAngle);
					p.triangle(
						0,
						0,
						-arrowSize,
						arrowSize / 2,
						-arrowSize,
						-arrowSize / 2,
					);
					p.pop();

					// Draw vector label
					if (showLabels) {
						p.fill(result.color);
						p.noStroke();
						p.textSize(16);
						const labelOffset = 20;
						const labelX = endX + labelOffset * p.cos(resAngle);
						const labelY = endY - labelOffset * p.sin(resAngle);
						p.text(result.label, labelX, labelY);

						// Show magnitude and angle
						const magnitude = Math.sqrt(
							result.x * result.x + result.y * result.y,
						);
						let angleDeg = p.degrees(Math.atan2(result.y, result.x));
						if (angleDeg < 0) angleDeg += 360;

						p.text(
							`|${result.label}| = ${magnitude.toFixed(1)}`,
							10,
							height - 30,
						);

						if (showAnglesState) {
							p.text(
								`∠${result.label} = ${angleDeg.toFixed(1)}°`,
								10,
								height - 15,
							);
						}
					}
				}
			} else if (showResultVector && result && selectedOperation === "cross") {
				// For cross product in 2D, just show the scalar value
				p.stroke(resultColor);
				p.noStroke();
				p.textSize(16);
				p.text(`${result.label} = ${result.value}`, 10, height - 30);
			}

			// Show dramatic retro grid effect (vaporwave aesthetic)
			const fadedColor = "rgba(255, 105, 180, 0.05)";
			p.stroke(fadedColor);
			p.strokeWeight(1);

			const numLines = 10;
			const spacing = height / numLines;

			for (let i = 0; i < numLines; i++) {
				const y = i * spacing;
				p.line(0, y, width, y);
			}

			// Vertical perspective lines for the grid
			const vanishingPointX = width / 2;
			const horizonY = height / 3;

			for (let i = 0; i <= width; i += width / 10) {
				p.stroke(`rgba(163, 119, 255, ${0.03 + (i / width) * 0.05})`);
				p.line(vanishingPointX, horizonY, i, height);
			}
		};
	};

	// Handle vector updates
	const updateVector = (index, property, value) => {
		setVectors((prev) => {
			const updated = [...prev];
			updated[index] = {
				...updated[index],
				[property]: value,
			};
			return updated;
		});
	};

	// Add a new vector
	const addVector = () => {
		if (vectors.length < vectorColors.length) {
			setVectors((prev) => [
				...prev,
				{
					x: 1,
					y: 1,
					color: vectorColors[prev.length],
					label: `v${prev.length + 1}₃`,
				},
			]);
		}
	};

	// Remove a vector
	const removeVector = (index) => {
		setVectors((prev) => prev.filter((_, i) => i !== index));
	};

	// Calculate result
	const result = calculateResult();

	return (
		<Box
			className={styles.wrapper}
			width="100%"
			maxWidth={`${width}px`}
			mx="auto"
		>
			<Flex
				className={styles.canvasContainer}
				width={`${width}px`}
				mx="auto"
				height={`${height}px`}
			>
				<ReactP5Wrapper sketch={sketch} />
			</Flex>

			{showControls && (
				<Box p="3" className={styles.controls}>
					<Flex direction="column" gap="3">
						<Flex justify="between" align="center">
							<Text size="2" className={styles.controlContent}>
								Operation
							</Text>
							<Select.Root
								value={selectedOperation}
								onValueChange={setSelectedOperation}
								size="2"
							>
								<Select.Trigger />
								<Select.Content>
									<Select.Item value="add">Addition (v₁ + v₂)</Select.Item>
									<Select.Item value="subtract">
										Subtraction (v₁ - v₂)
									</Select.Item>
									<Select.Item value="dot">Dot Product (v₁ · v₂)</Select.Item>
									<Select.Item value="cross">
										Cross Product (v₁ × v₂)
									</Select.Item>
								</Select.Content>
							</Select.Root>
						</Flex>

						<Flex justify="between" align="center">
							<Flex align="center" gap="2">
								<Switch
									checked={showComponentsState}
									onCheckedChange={setShowComponentsState}
								/>
								<Text size="1" className={styles.controlSubContent}>
									Components
								</Text>
							</Flex>
							<Flex align="center" gap="2">
								<Switch
									checked={showAnglesState}
									onCheckedChange={setShowAnglesState}
								/>
								<Text size="1" className={styles.controlSubContent}>
									Angles
								</Text>
							</Flex>
						</Flex>

						{vectors.length < vectorColors.length && (
							<Button
								variant="ghost"
								onClick={addVector}
								className={styles.controlContent}
							>
								<PlusIcon />
								<Text ml="1" size="1">
									Add Vector
								</Text>
							</Button>
						)}
					</Flex>

					<Box>
						<Text size="2" className={styles.controlContent}>
							Vectors
						</Text>
						{vectors.map((vector, index) => (
							<Flex
								key={vector.label}
								align="center"
								justify="start"
								gap="6"
								py="1"
							>
								<Flex align="center" gap="2">
									<Box
										className={styles.colorBox}
										style={{ "--bg": vector.color }}
									/>
									<Text
										size="2"
										className={styles.vectorLabel}
										style={{ "--fg": vector.color }}
									>
										{vector.label}
									</Text>
								</Flex>

								<Flex align="center" gap="4">
									<Flex align="center" gap="2">
										<Text size="1" className={styles.controlSubContent}>
											x:
										</Text>
										<Slider
											value={[vector.x]}
											min={-maxVectorMagnitude}
											max={maxVectorMagnitude}
											step={0.1}
											onValueChange={(value) =>
												updateVector(index, "x", value[0])
											}
											className={styles.slider}
										/>
										<Text size="1" className={styles.controlSubContent}>
											{vector.x.toFixed(1)}
										</Text>
									</Flex>
									<Flex align="center" gap="2">
										<Text size="1" className={styles.controlSubContent}>
											y:
										</Text>
										<Slider
											value={[vector.y]}
											min={-maxVectorMagnitude}
											max={maxVectorMagnitude}
											step={0.1}
											onValueChange={(value) =>
												updateVector(index, "y", value[0])
											}
											className={styles.slider}
										/>
										<Text size="1" className={styles.controlSubContent}>
											{vector.y.toFixed(1)}
										</Text>
									</Flex>
									{vectors.length > 2 && (
										<Button
											variant="ghost"
											size="1"
											onClick={() => removeVector(index)}
											className={styles.controlContent}
										>
											<Cross2Icon />
										</Button>
									)}
								</Flex>
							</Flex>
						))}
						{result && (
							<Flex align="center" className={styles.resultContainer}>
								<Box
									className={styles.colorBox}
									style={{ "--bg": resultColor }}
								/>
								<Text size="2" className={styles.controlContent}>
									{result.label} ={" "}
								</Text>
								{selectedOperation === "dot" ||
								selectedOperation === "cross" ? (
									<Text size="2" ml="1" className={styles.controlContent}>
										{result.value}
									</Text>
								) : (
									<Text size="2" ml="1" className={styles.controlContent}>
										({result.x.toFixed(1)}, {result.y.toFixed(1)})
									</Text>
								)}
							</Flex>
						)}
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default VectorVisualization;
