import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import {
	addVectors,
	angleBetween,
	directionDegrees,
	dotProduct,
	getQuadrant,
	magnitude,
} from "../../utils/vectorUtils.js";
import { BlockMath, InlineMath } from "../KaTeX.jsx";
import { VectorInput } from "../ui/VectorInput.jsx";
import { VectorVisualization } from "../viz/VectorVisualization.jsx";
import * as styles from "./VectorAddition.css.ts";

export const VectorAddition = () => {
	const [vectorA, setVectorA] = useState([3, 2]);
	const [vectorB, setVectorB] = useState([1, 4]);

	const resultVector = addVectors(vectorA, vectorB);
	const magnitudeA = magnitude(vectorA);
	const magnitudeB = magnitude(vectorB);
	const magnitudeSum = magnitude(resultVector);
	const dp = dotProduct(vectorA, vectorB);
	const angle = angleBetween(vectorA, vectorB);
	const direction = directionDegrees(resultVector);
	const quadrant = getQuadrant(resultVector);

	const handleVectorAChange = (index, value) => {
		setVectorA((prev) => {
			const updated = [...prev];
			updated[index] = value;
			return updated;
		});
	};

	const handleVectorBChange = (index, value) => {
		setVectorB((prev) => {
			const updated = [...prev];
			updated[index] = value;
			return updated;
		});
	};

	return (
		<Box className={styles.container}>
			<Heading size="6" mb="4">
				Vector Addition Calculator
			</Heading>

			<Flex className={styles.controls}>
				<VectorInput
					label="Vector A"
					vector={vectorA}
					onChange={handleVectorAChange}
				/>
				<VectorInput
					label="Vector B"
					vector={vectorB}
					onChange={handleVectorBChange}
				/>
			</Flex>

			<Box className={styles.canvasContainer}>
				<VectorVisualization
					defaultVectors={[
						{
							x: vectorA[0],
							y: vectorA[1],
							color: "rgba(255,0,0,0.8)",
							label: "A",
						},
						{
							x: vectorB[0],
							y: vectorB[1],
							color: "rgba(0,0,255,0.8)",
							label: "B",
						},
					]}
					operationMode="add"
					interactive={false}
					showControls={false}
					width={600}
					height={600}
				/>
			</Box>

			<Box className={styles.calculations}>
				<Text as="p">
					<strong>Vector A:</strong>{" "}
					<InlineMath math={`\\vec{A}=(${vectorA[0]},${vectorA[1]})`} />,
					Magnitude: <InlineMath math={`|\\vec{A}|=${magnitudeA.toFixed(2)}`} />
				</Text>
				<Text as="p">
					<strong>Vector B:</strong>{" "}
					<InlineMath math={`\\vec{B}=(${vectorB[0]},${vectorB[1]})`} />,
					Magnitude: <InlineMath math={`|\\vec{B}|=${magnitudeB.toFixed(2)}`} />
				</Text>
				<Text as="p">
					<strong>Result (A + B):</strong>{" "}
					<InlineMath
						math={`\\vec{R}=(${resultVector[0]},${resultVector[1]})`}
					/>
					, Magnitude:{" "}
					<InlineMath math={`|\\vec{R}|=${magnitudeSum.toFixed(2)}`} />
				</Text>
				<Text as="p">
					<strong>Dot Product:</strong>{" "}
					<InlineMath math={`\\vec{A}\\cdot\\vec{B}=${dp.toFixed(2)}`} />
				</Text>
				<Text as="p">
					<strong>Angle between:</strong>{" "}
					<InlineMath math={`\\theta=${angle.toFixed(2)}^\\circ`} />
				</Text>
			</Box>

			<Box className={styles.resultProperties}>
				<Heading size="5" mb="2">
					Result Properties
				</Heading>
				<Text as="p">
					Components: x = {resultVector[0]}, y = {resultVector[1]}
				</Text>
				<Text as="p">Magnitude: {magnitudeSum.toFixed(2)}</Text>
				<Text as="p">Direction: {direction.toFixed(2)}°</Text>
				<Text as="p">Quadrant: {quadrant}</Text>
			</Box>

			<Box className={styles.explanation}>
				<Heading size="5" mb="2">
					How Vector Addition Works
				</Heading>
				<Text as="p">
					Vector addition follows the parallelogram law. When adding vector A to
					vector B, we place the tail of B at the head of A, and draw the
					resultant vector from the tail of A to the head of B.
				</Text>
				<BlockMath
					math={`\\vec{A}+\\vec{B}=(${vectorA[0]}+${vectorB[0]},${vectorA[1]}+${vectorB[1]})=(${resultVector[0]},${resultVector[1]})`}
				/>
				<Text as="p">
					The magnitude of a vector is calculated using the Pythagorean theorem:{" "}
					<InlineMath math="{|\\vec{V}|=\\sqrt{V_x^2+V_y^2}" />
				</Text>
				<Text as="p">
					The dot product between two vectors is calculated as:{" "}
					<InlineMath math="{\\vec{A}\\cdot\\vec{B}=A_xB_x+A_yB_y}" />
				</Text>
				<Text as="p">
					The angle between two vectors can be found using the dot product:{" "}
					<InlineMath math="{\\theta=\\cos^{-1}\\left(\\frac{\\vec{A}\\cdot\\vec{B}}{|\\vec{A}||\\vec{B}|}\\right)" />
				</Text>
			</Box>
		</Box>
	);
};
