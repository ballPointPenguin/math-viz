import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Cross2Icon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
	Box,
	Button,
	Flex,
	RadioGroup,
	Slider,
	Switch,
	Text,
} from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";

// Customizable interactive circle component with dark academia + vaporwave aesthetic
export const InteractiveCircle = ({
	width = 400,
	height = 400,
	backgroundColor = "#121212",
	circleColor = "rgba(163, 119, 255, 0.8)",
	accentColor = "rgba(255, 105, 180, 0.7)",
	pointColor = "rgba(255, 255, 255, 0.9)",
	fullWidth = false,
	initialRadius = 100,
	minRadius = 20,
	maxRadius = 150,
	showControls = true,
	showPoints = true,
	showRadii = true,
	showCoordinates = true,
	interactive = true,
	animated = false,
	animationSpeed = 0.02,
	onPointSelect = null,
	fixedPoints = [],
}) => {
	const canvasRef = useRef(null);
	const [radius, setRadius] = useState(initialRadius);
	const [points, setPoints] = useState(fixedPoints);
	const animationRef = useRef(0);

	const sketch = (p) => {
		// Setup the canvas
		p.setup = () => {
			const canvas = p.createCanvas(width, height);
			canvas.parent(canvasRef.current);

			if (interactive) {
				canvas.mouseClicked(() => {
					// Check if click is within canvas bounds
					if (
						p.mouseX > 0 &&
						p.mouseX < width &&
						p.mouseY > 0 &&
						p.mouseY < height
					) {
						// Calculate click position relative to circle center
						const centerX = width / 2;
						const centerY = height / 2;
						const x = p.mouseX - centerX;
						const y = centerY - p.mouseY; // Invert y to match mathematical convention

						// Calculate distance from center
						const distance = p.sqrt(x * x + y * y);

						// Check if click is near the circle
						const onCircle = p.abs(distance - radius) < 10;

						if (onCircle) {
							// Calculate angle
							const angle = p.atan2(y, x);

							// Add point to state
							const newPoint = {
								angle,
								x: p.cos(angle) * radius,
								y: p.sin(angle) * radius,
							};

							setPoints((prev) => [...prev, newPoint]);

							// Call point select callback if provided
							if (onPointSelect) {
								onPointSelect(newPoint);
							}
						}
					}
				});
			}
		};

		// Draw the canvas
		p.draw = () => {
			p.background(backgroundColor);

			// Center reference
			const centerX = width / 2;
			const centerY = height / 2;

			// Draw coordinates
			if (showCoordinates) {
				p.stroke("rgba(255, 255, 255, 0.2)");
				p.strokeWeight(1);

				// X-axis
				p.line(0, centerY, width, centerY);

				// Y-axis
				p.line(centerX, 0, centerX, height);

				// Draw axis labels
				p.fill("rgba(255, 255, 255, 0.5)");
				p.noStroke();
				p.textSize(10);
				p.text("0", centerX + 4, centerY + 12);
				p.text("+x", width - 15, centerY - 5);
				p.text("+y", centerX + 5, 15);
			}

			// Calculate animation offset
			let animOffset = 0;
			if (animated) {
				animationRef.current += animationSpeed;
				animOffset = p.sin(animationRef.current) * 10;
			}

			// Draw main circle
			p.stroke(circleColor);
			p.strokeWeight(2);
			p.noFill();
			p.circle(centerX, centerY, (radius + animOffset) * 2);

			// Draw pulse effect
			if (animated) {
				for (let i = 1; i <= 3; i++) {
					const pulseOffset = ((animationRef.current * 100) % 50) * i;
					p.stroke(`rgba(163, 119, 255, ${0.2 - i * 0.05})`);
					p.strokeWeight(1);
					p.circle(centerX, centerY, (radius + pulseOffset) * 2);
				}
			}

			// Draw points and radii
			if (showPoints && points.length > 0) {
				points.forEach((point, index) => {
					// Calculate screen coordinates
					const screenX = centerX + point.x;
					const screenY = centerY - point.y; // Invert y to match screen coordinates

					// Draw radius line
					if (showRadii) {
						p.stroke(accentColor);
						p.strokeWeight(1);
						p.line(centerX, centerY, screenX, screenY);

						// Show angle label
						const angleDeg = Math.round((point.angle * 180) / Math.PI);
						const textRadius = radius / 2;
						const textX = centerX + p.cos(point.angle) * textRadius;
						const textY = centerY - p.sin(point.angle) * textRadius;

						p.fill(accentColor);
						p.noStroke();
						p.textSize(10);
						p.text(`${angleDeg}°`, textX - 10, textY);
					}

					// Draw point
					p.noStroke();
					p.fill(pointColor);
					p.circle(screenX, screenY, 8);

					// Draw label
					p.fill(pointColor);
					p.textSize(12);
					let labelText = `P${index + 1}`;
					if (showCoordinates) {
						const normalizedX = Math.round((point.x / radius) * 100) / 100;
						const normalizedY = Math.round((point.y / radius) * 100) / 100;
						labelText += ` (${normalizedX}, ${normalizedY})`;
					}

					p.text(labelText, screenX + 10, screenY);
				});
			}

			// Draw unit circle references
			if (showCoordinates) {
				p.stroke("rgba(255, 255, 255, 0.15)");
				p.strokeWeight(1);

				// Unit circle markers
				const markers = [
					{ angle: 0, label: "0" },
					{ angle: Math.PI / 6, label: "π/6" },
					{ angle: Math.PI / 4, label: "π/4" },
					{ angle: Math.PI / 3, label: "π/3" },
					{ angle: Math.PI / 2, label: "π/2" },
					{ angle: (2 * Math.PI) / 3, label: "2π/3" },
					{ angle: (3 * Math.PI) / 4, label: "3π/4" },
					{ angle: (5 * Math.PI) / 6, label: "5π/6" },
					{ angle: Math.PI, label: "π" },
					{ angle: (7 * Math.PI) / 6, label: "7π/6" },
					{ angle: (5 * Math.PI) / 4, label: "5π/4" },
					{ angle: (4 * Math.PI) / 3, label: "4π/3" },
					{ angle: (3 * Math.PI) / 2, label: "3π/2" },
					{ angle: (5 * Math.PI) / 3, label: "5π/3" },
					{ angle: (7 * Math.PI) / 4, label: "7π/4" },
					{ angle: (11 * Math.PI) / 6, label: "11π/6" },
				];

				markers.forEach((marker) => {
					// Draw reference lines
					const markerX = centerX + p.cos(marker.angle) * radius;
					const markerY = centerY - p.sin(marker.angle) * radius;
					p.line(centerX, centerY, markerX, markerY);

					// Draw small tick on circle
					const tickSize = 5;
					const tickX1 = centerX + p.cos(marker.angle) * (radius - tickSize);
					const tickY1 = centerY - p.sin(marker.angle) * (radius - tickSize);
					const tickX2 = centerX + p.cos(marker.angle) * (radius + tickSize);
					const tickY2 = centerY - p.sin(marker.angle) * (radius + tickSize);

					p.stroke("rgba(255, 255, 255, 0.3)");
					p.line(tickX1, tickY1, tickX2, tickY2);

					// Draw labels outside circle
					const labelX = centerX + p.cos(marker.angle) * (radius + 20);
					const labelY = centerY - p.sin(marker.angle) * (radius + 20);

					p.fill("rgba(255, 255, 255, 0.4)");
					p.noStroke();
					p.textSize(10);
					p.text(marker.label, labelX - 10, labelY + 5);
				});
			}
		};
	};

	// Update radius when it changes in the control
	useEffect(() => {
		// Scale points when radius changes
		if (points.length > 0) {
			const scaleFactor = radius / initialRadius;

			setPoints((prev) =>
				prev.map((point) => ({
					angle: point.angle,
					x: Math.cos(point.angle) * radius,
					y: Math.sin(point.angle) * radius,
				})),
			);
		}
	}, [radius, initialRadius]);

	// Handle removing a point
	const removePoint = (index) => {
		setPoints((prev) => prev.filter((_, i) => i !== index));
	};

	// Clear all points
	const clearPoints = () => {
		setPoints([]);
	};

	return (
		<Box
			style={{
				width: fullWidth ? "100%" : width,
				background: "rgba(0, 0, 0, 0.2)",
				borderRadius: "8px",
				overflow: "hidden",
				boxShadow: "0 4px 30px rgba(135, 94, 255, 0.15)",
				border: "1px solid rgba(255, 255, 255, 0.1)",
				backdropFilter: "blur(10px)",
			}}
		>
			<div
				ref={canvasRef}
				style={{
					width: "100%",
					height,
				}}
			/>

			{showControls && (
				<Box
					p="3"
					style={{
						background: "rgba(18, 18, 18, 0.8)",
						borderTop: "1px solid rgba(255, 255, 255, 0.1)",
					}}
				>
					<Flex direction="column" gap="3">
						<Flex align="center" justify="between">
							<Text size="2" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
								Circle Radius
							</Text>
							<Flex align="center" gap="2">
								<Text size="1" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
									{radius}px
								</Text>
								<Slider
									value={[radius]}
									min={minRadius}
									max={maxRadius}
									step={1}
									onValueChange={(value) => setRadius(value[0])}
									style={{ width: "180px" }}
								/>
							</Flex>
						</Flex>

						{points.length > 0 && (
							<Box>
								<Flex justify="between" align="center" mb="2">
									<Text size="2" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
										Points
									</Text>
									<Button
										variant="ghost"
										onClick={clearPoints}
										style={{ color: "rgba(255, 105, 180, 0.8)" }}
									>
										Clear All
									</Button>
								</Flex>

								<Box style={{ maxHeight: "100px", overflowY: "auto" }}>
									{points.map((point, index) => {
										const angleDeg = Math.round((point.angle * 180) / Math.PI);
										const normalizedX =
											Math.round((point.x / radius) * 100) / 100;
										const normalizedY =
											Math.round((point.y / radius) * 100) / 100;

										return (
											<Flex key={index} justify="between" align="center" py="1">
												<Text
													size="1"
													style={{ color: "rgba(255, 255, 255, 0.8)" }}
												>
													P{index + 1}: {angleDeg}° ({normalizedX},{" "}
													{normalizedY})
												</Text>
												<Button
													variant="ghost"
													size="1"
													onClick={() => removePoint(index)}
												>
													<Cross2Icon />
												</Button>
											</Flex>
										);
									})}
								</Box>
							</Box>
						)}
					</Flex>
				</Box>
			)}
		</Box>
	);
};

export default InteractiveCircle;
