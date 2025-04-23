import { ReactP5Wrapper } from "@p5-wrapper/react";
import { MinusIcon, PlusIcon, ResetIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React, { useRef } from "react";
import * as styles from "./CoordinateGrid.css";

// Customizable grid component with dark academia + vaporwave aesthetic
export const CoordinateGrid = ({
	width = 600,
	height = 600,
	backgroundColor = "#121212",
	gridColor = "rgba(163, 119, 255, 0.2)",
	accentColor = "rgba(255, 105, 180, 0.8)",
	axisColor = "rgba(255, 255, 255, 0.6)",
	fullWidth = false,
	interactive = true,
	showZoomControls = true,
	initialZoom = 1,
	maxZoom = 5,
	minZoom = 0.5,
	showAxes = true,
	showGridLines = true,
	gridDensity = 2, // 1 = sparse, 2 = regular, 3 = dense
	axisLabels = { x: "x", y: "y" },
	onPointSelect = null,
}) => {
	const zoomRef = useRef(initialZoom);
	const panRef = useRef({ x: 0, y: 0 });
	const draggingRef = useRef(false);
	const lastMousePosRef = useRef({ x: 0, y: 0 });

	const sketch = (p) => {
		// Setup the canvas
		p.setup = () => {
			const canvas = p.createCanvas(width, height);
			if (interactive) {
				// Scroll-wheel zoom removed; zoom only via buttons
				canvas.mousePressed(() => {
					if (
						p.mouseX > 0 &&
						p.mouseX < width &&
						p.mouseY > 0 &&
						p.mouseY < height
					) {
						draggingRef.current = true;
						lastMousePosRef.current = { x: p.mouseX, y: p.mouseY };
					}
				});

				canvas.mouseReleased(() => {
					draggingRef.current = false;

					// Handle point selection if callback provided
					if (
						onPointSelect &&
						p.mouseX > 0 &&
						p.mouseX < width &&
						p.mouseY > 0 &&
						p.mouseY < height
					) {
						// Convert screen coordinates to grid coordinates
						const gridX =
							(p.mouseX - width / 2 - panRef.current.x) /
							(50 * zoomRef.current);
						const gridY =
							-(p.mouseY - height / 2 - panRef.current.y) /
							(50 * zoomRef.current);
						onPointSelect({ x: gridX, y: gridY });
					}
				});
			}
		};

		// Draw the canvas
		p.draw = () => {
			p.background(backgroundColor);

			// Handle panning
			if (draggingRef.current) {
				const dx = p.mouseX - lastMousePosRef.current.x;
				const dy = p.mouseY - lastMousePosRef.current.y;
				panRef.current.x += dx;
				panRef.current.y += dy;
				lastMousePosRef.current = { x: p.mouseX, y: p.mouseY };
			}

			// Calculate grid parameters
			const zoom = zoomRef.current;
			const gridSize = 50 * zoom; // Base grid size in pixels
			const centerX = width / 2 + panRef.current.x;
			const centerY = height / 2 + panRef.current.y;

			// Draw grid lines
			if (showGridLines) {
				p.stroke(gridColor);
				p.strokeWeight(0.5);

				// Determine grid density
				const step =
					gridSize / (gridDensity === 3 ? 2 : gridDensity === 1 ? 2 : 1);

				// Vertical lines
				for (let x = centerX % step; x < width; x += step) {
					p.line(x, 0, x, height);
				}

				// Horizontal lines
				for (let y = centerY % step; y < height; y += step) {
					p.line(0, y, width, y);
				}
			}

			// Draw axes
			if (showAxes) {
				p.stroke(axisColor);
				p.strokeWeight(1.5);

				// X-axis
				p.line(0, centerY, width, centerY);

				// Y-axis
				p.line(centerX, 0, centerX, height);

				// Draw ticks and labels
				p.textSize(10);
				p.fill(axisColor);
				p.strokeWeight(0);

				// X-axis ticks
				for (
					let x = Math.ceil((0 - centerX) / gridSize) * gridSize;
					x < width;
					x += gridSize
				) {
					const xPos = centerX + x;
					if (xPos >= 0 && xPos <= width) {
						p.line(xPos, centerY - 5, xPos, centerY + 5);
						const value = Math.round(x / gridSize);
						if (value !== 0) {
							// Don't label the origin
							p.text(value, xPos - 5, centerY + 20);
						}
					}
				}

				// Y-axis ticks
				for (
					let y = Math.ceil((0 - centerY) / gridSize) * gridSize;
					y < height;
					y += gridSize
				) {
					const yPos = centerY + y;
					if (yPos >= 0 && yPos <= height) {
						p.line(centerX - 5, yPos, centerX + 5, yPos);
						const value = -Math.round(y / gridSize); // Y increases upwards in mathematics
						if (value !== 0) {
							// Don't label the origin
							p.text(value, centerX + 10, yPos + 5);
						}
					}
				}

				// Origin label
				p.text("0", centerX + 8, centerY + 15);

				// Axis labels
				p.textSize(14);
				p.text(axisLabels.x, width - 20, centerY - 10);
				p.text(axisLabels.y, centerX + 10, 20);

				// Draw axes arrows
				p.strokeWeight(1.5);
				p.stroke(axisColor);

				// X-axis arrow
				p.line(width - 10, centerY, width - 5, centerY - 5);
				p.line(width - 10, centerY, width - 5, centerY + 5);

				// Y-axis arrow
				p.line(centerX, 10, centerX - 5, 15);
				p.line(centerX, 10, centerX + 5, 15);
			}

			// Dramatic vaporwave grid effect
			p.stroke(accentColor);
			p.strokeWeight(0.75);
			for (let i = 0; i < 5; i++) {
				const offset = (p.frameCount * 0.5 + i * 10) % 100;
				// Horizontal gradient lines
				p.stroke(`rgba(255, 105, 180, ${0.2 - i * 0.04})`);
				p.line(0, offset, width, offset);
				p.line(0, height - offset, width, height - offset);

				// Vertical gradient lines
				p.stroke(`rgba(163, 119, 255, ${0.2 - i * 0.04})`);
				p.line(offset, 0, offset, height);
				p.line(width - offset, 0, width - offset, height);
			}
		};
	};

	// Reset view function
	const resetView = () => {
		zoomRef.current = initialZoom;
		panRef.current = { x: 0, y: 0 };
	};

	// Zoom control functions
	const zoomIn = () => {
		zoomRef.current = Math.min(maxZoom, zoomRef.current + 0.2);
	};

	const zoomOut = () => {
		zoomRef.current = Math.max(minZoom, zoomRef.current - 0.2);
	};

	return (
		<Box
			className={styles.wrapper}
			width={fullWidth ? "100%" : `${width}px`}
			mx="auto"
		>
			{/* Canvas container */}
			<Box
				className={styles.canvasContainer}
				width={fullWidth ? "100%" : `${width}px`}
				height={`${height}px`}
			>
				<ReactP5Wrapper sketch={sketch} />
			</Box>

			{showZoomControls && (
				<Flex
					justify="between"
					align="center"
					p="2"
					className={styles.controls}
					width={fullWidth ? "100%" : `${width}px`}
				>
					<Flex align="center" gap="2">
						<Button
							variant="ghost"
							onClick={zoomOut}
							className={styles.controlContent}
						>
							<MinusIcon />
						</Button>

						<Text size="1" className={styles.controlContent}>
							Zoom: {Math.round(zoomRef.current * 100)}%
						</Text>

						<Button
							variant="ghost"
							onClick={zoomIn}
							className={styles.controlContent}
						>
							<PlusIcon />
						</Button>
					</Flex>

					<Button
						variant="ghost"
						onClick={resetView}
						className={styles.controlContent}
					>
						<ResetIcon />
						<Text size="1" ml="1" className={styles.controlContent}>
							Reset View
						</Text>
					</Button>
				</Flex>
			)}
		</Box>
	);
};

export default CoordinateGrid;
