import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import {
	angleBetween,
	crossProduct,
	dotProduct,
	magnitude,
	scalarProjection,
	vectorProjection,
} from "../../utils/vectorUtils.js";
import { BlockMath, InlineMath } from "../KaTeX.jsx";
import * as styles from "./VectorOperations.css.ts";

function sketch(p) {
	const width = 600;
	const height = 500;

	let vecA;
	let vecB;

	p.setup = () => {
		// Create canvas with explicit dimensions
		const canvas = p.createCanvas(width, height);

		// Force canvas size after creation
		const canvasElt = canvas.elt;
		canvasElt.style.width = `${width}px`;
		canvasElt.style.height = `${height}px`;
	};

	p.updateWithProps = ({ vectorA, vectorB }) => {
		vecA = vectorA;
		vecB = vectorB;
	};

	p.draw = () => {
		if (!vecA || !vecB) return;

		// Convert to p5.Vector objects
		const pVecA = p.createVector(vecA.x, vecA.y);
		const pVecB = p.createVector(vecB.x, vecB.y);

		p.background(255);
		p.translate(width / 2, height / 2);

		// Draw grid and axes
		drawGrid(p);

		// Draw vectors
		drawVector(p, pVecA, p.color(220, 50, 50), "A");
		drawVector(p, pVecB, p.color(50, 50, 220), "B");

		// Draw projection
		drawProjection(p, pVecA, pVecB);
	};
}

function drawGrid(p) {
	const width = p.width;
	const height = p.height;
	const scale = 50;

	p.stroke(200);
	p.strokeWeight(1);

	// Draw grid lines
	for (let x = -width / 2; x <= width / 2; x += scale) {
		p.line(x, -height / 2, x, height / 2);
	}
	for (let y = -height / 2; y <= height / 2; y += scale) {
		p.line(-width / 2, y, width / 2, y);
	}

	// Draw axes
	p.stroke(100);
	p.strokeWeight(2);
	p.line(-width / 2, 0, width / 2, 0);
	p.line(0, -height / 2, 0, height / 2);

	// Add ticks with numbers
	p.textSize(12);
	p.textAlign(p.CENTER, p.CENTER);
	p.fill(100);
	for (let x = -5; x <= 5; x++) {
		if (x !== 0) {
			p.text(x, x * scale, 20);
		}
	}
	for (let y = -4; y <= 4; y++) {
		if (y !== 0) {
			p.text(-y, -20, y * scale);
		}
	}

	// Origin
	p.text("0", -10, 20);
}

function drawVector(p, v, color, label) {
	const scale = 50;

	p.push();
	p.stroke(color);
	p.strokeWeight(3);
	p.fill(color);

	// Draw the vector line
	p.line(0, 0, v.x * scale, -v.y * scale);

	// Draw the arrowhead
	const arrowSize = 10;
	p.translate(v.x * scale, -v.y * scale);
	const angle = p.atan2(-v.y, v.x);
	p.rotate(angle);
	p.triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);

	// Add label
	p.rotate(-angle);
	p.textSize(16);
	p.text(label, 15, -15);

	p.pop();
}

function drawProjection(p, vecA, vecB) {
	const scale = 50;

	// Calculate the dot product
	const dotProduct = vecA.dot(vecB);

	// Calculate the vector projection of B onto A using p5 methods
	const scalarProjection = dotProduct / vecA.magSq();
	// Create a new vector in direction of A but scaled by the projection
	const vecProj = vecA.copy().mult(scalarProjection);

	// Draw the projection line (from origin to projection point)
	p.push();
	p.stroke(100, 180, 100);
	p.strokeWeight(3);
	p.line(0, 0, vecProj.x * scale, -vecProj.y * scale);

	// Draw the orthogonal line (from B to projection)
	p.stroke(180, 100, 180);
	p.strokeWeight(2);
	p.line(
		vecB.x * scale,
		-vecB.y * scale,
		vecProj.x * scale,
		-vecProj.y * scale,
	);

	// Label the projection
	p.fill(100, 180, 100);
	p.textSize(14);
	p.text("proj", (vecProj.x * scale) / 2, (-vecProj.y * scale) / 2 - 10);

	p.pop();
}

export function VectorOperations() {
	// State as [x, y] arrays to leverage vectorUtils
	const [vectorA, setVectorA] = useState([2, 3]);
	const [vectorB, setVectorB] = useState([4, -1]);

	// Derived calculations
	const magA = magnitude(vectorA);
	const magB = magnitude(vectorB);
	const dp = dotProduct(vectorA, vectorB);
	const cp = crossProduct(vectorA, vectorB);
	const angle = angleBetween(vectorA, vectorB);
	const scalarProj = scalarProjection(vectorA, vectorB);
	const [projX, projY] = vectorProjection(vectorA, vectorB);

	// Unified change handler for array-based vectors
	const handleChange = (setter) => (index, value) => {
		setter((prev) => {
			const updated = [...prev];
			updated[index] = Number(value);
			return updated;
		});
	};

	return (
		<Box className={styles.container}>
			<Heading size="6" className={styles.headingMargin}>
				Vector Operations Explorer
			</Heading>
			<Text as="p" className={styles.headingMargin}>
				This interactive tool allows you to explore vector operations like
				modulus (length), dot product, cross product, and projections.
			</Text>

			<Box className={styles.canvasContainer}>
				<ReactP5Wrapper
					sketch={sketch}
					vectorA={{ x: vectorA[0], y: vectorA[1] }}
					vectorB={{ x: vectorB[0], y: vectorB[1] }}
				/>
			</Box>

			<Box className={styles.controls}>
				<Box className={styles.controlGroup}>
					<Text as="h3" size="4" className={styles.headingMargin}>
						Vector A
					</Text>
					<Box className={styles.sliderContainer}>
						<Text as="label">x:</Text>
						<input
							type="range"
							min="-5"
							max="5"
							step="0.1"
							value={vectorA[0]}
							onChange={(e) => handleChange(setVectorA)(0, e.target.value)}
						/>
						<input
							type="number"
							min="-5"
							max="5"
							step="0.1"
							value={vectorA[0]}
							onChange={(e) => handleChange(setVectorA)(0, e.target.value)}
						/>
					</Box>
					<Box className={styles.sliderContainer}>
						<Text as="label">y:</Text>
						<input
							type="range"
							min="-5"
							max="5"
							step="0.1"
							value={vectorA[1]}
							onChange={(e) => handleChange(setVectorA)(1, e.target.value)}
						/>
						<input
							type="number"
							min="-5"
							max="5"
							step="0.1"
							value={vectorA[1]}
							onChange={(e) => handleChange(setVectorA)(1, e.target.value)}
						/>
					</Box>
				</Box>

				<Box className={styles.controlGroup}>
					<Text as="h3" size="4" className={styles.headingMargin}>
						Vector B
					</Text>
					<Box className={styles.sliderContainer}>
						<Text as="label">x:</Text>
						<input
							type="range"
							min="-5"
							max="5"
							step="0.1"
							value={vectorB[0]}
							onChange={(e) => handleChange(setVectorB)(0, e.target.value)}
						/>
						<input
							type="number"
							min="-5"
							max="5"
							step="0.1"
							value={vectorB[0]}
							onChange={(e) => handleChange(setVectorB)(0, e.target.value)}
						/>
					</Box>
					<Box className={styles.sliderContainer}>
						<Text as="label">y:</Text>
						<input
							type="range"
							min="-5"
							max="5"
							step="0.1"
							value={vectorB[1]}
							onChange={(e) => handleChange(setVectorB)(1, e.target.value)}
						/>
						<input
							type="number"
							min="-5"
							max="5"
							step="0.1"
							value={vectorB[1]}
							onChange={(e) => handleChange(setVectorB)(1, e.target.value)}
						/>
					</Box>
				</Box>

				<Box className={styles.output}>
					<Text as="p">
						<strong>Vector A:</strong> ({vectorA[0].toFixed(1)},{" "}
						{vectorA[1].toFixed(1)}) | Modulus: {magA.toFixed(2)}
					</Text>
					<Text as="p">
						<strong>Vector B:</strong> ({vectorB[0].toFixed(1)},{" "}
						{vectorB[1].toFixed(1)}) | Modulus: {magB.toFixed(2)}
					</Text>
					<Text as="p">
						<strong>Dot Product:</strong> {dp.toFixed(2)}
					</Text>
					<Text as="p">
						<strong>Cross Product (z-component):</strong> {cp.toFixed(2)}
					</Text>
					<Text as="p">
						<strong>Angle between:</strong> {angle.toFixed(1)}°
					</Text>
					<Text as="p">
						<strong>Scalar Projection of B onto A:</strong>{" "}
						{scalarProj.toFixed(2)}
					</Text>
					<Text as="p">
						<strong>Vector Projection of B onto A:</strong> ({projX.toFixed(2)},{" "}
						{projY.toFixed(2)})
					</Text>
				</Box>
			</Box>

			<Box className={styles.controls}>
				<Text as="h3" size="4" className={styles.headingMargin}>
					Key Formulas
				</Text>
				<Box className={styles.formula}>
					<InlineMath math="|\\vec{v}|=\\sqrt{x^2+y^2}" />
				</Box>
				<Box className={styles.formula}>
					<InlineMath math="\\vec{A}\\cdot\\vec{B}=A_xB_x+A_yB_y" />
				</Box>
				<Box className={styles.formula}>
					<InlineMath math="\\vec{A}\\times\\vec{B}=A_xB_y-A_yB_x" />
				</Box>
				<Box className={styles.formula}>
					<InlineMath math="\\theta=\\cos^{-1}\\left(\\frac{\\vec{A}\\cdot\\vec{B}}{|\\vec{A}||\\vec{B}|}\\right)" />
				</Box>
				<Box className={styles.formula}>
					<InlineMath math="\\text{proj}_{A}(B)=(\\vec{A}\\cdot\\vec{B})/|\\vec{A}|" />
				</Box>
				<Box className={styles.formula}>
					<InlineMath math="\\text{projVec}_{A}(B)=(\\frac{\\vec{A}\\cdot\\vec{B}}{\\vec{A}\\cdot\\vec{A}})\\vec{A}" />
				</Box>
			</Box>
		</Box>
	);
}
