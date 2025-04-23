import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { BlockMath } from "../KaTeX.jsx";
import { VectorInput } from "../ui/VectorInput.jsx";
import * as styles from "./VectorMatrixTransform.css.ts";

export const VectorMatrixTransform = () => {
	// State for basis vectors (columns of the transform matrix) and vector r
	const [e1, setE1] = useState([1, 0]);
	const [e2, setE2] = useState([0, 1]);
	const [r, setR] = useState([3, 2]);

	// Compute A * r = r_x * e1 + r_y * e2
	const Ar = [e1[0] * r[0] + e2[0] * r[1], e1[1] * r[0] + e2[1] * r[1]];

	// p5 sketch to draw the grid and vectors
	const sketch = (p) => {
		const width = 600;
		const height = 600;
		const scale = 40; // pixels per unit

		p.setup = () => {
			p.createCanvas(width, height);
		};

		p.draw = () => {
			p.background("#121212");

			// Move origin to center
			p.push();
			p.translate(width / 2, height / 2);

			// Draw grid lines
			p.stroke(80);
			p.strokeWeight(1);
			for (let x = -width; x <= width; x += scale) {
				p.line(x, -height, x, height);
			}
			for (let y = -height; y <= height; y += scale) {
				p.line(-width, y, width, y);
			}

			// Draw axes
			p.stroke(200);
			p.strokeWeight(2);
			p.line(-width, 0, width, 0);
			p.line(0, -height, 0, height);

			// Helper to draw a vector from origin
			const drawVec = (v, col) => {
				p.stroke(col);
				p.strokeWeight(4);
				p.line(0, 0, v[0] * scale, -v[1] * scale);
			};

			// Original unit basis in orange
			drawVec([1, 0], "#FFA500");
			drawVec([0, 1], "#FFA500");

			// Original vector r in pink
			drawVec(r, "#FF69B4");

			// Transformed basis vectors (columns) in green and cyan
			drawVec(e1, "#00FF00");
			drawVec(e2, "#00FFFF");

			// Transformed vector A * r in yellow
			drawVec(Ar, "#FFFF00");

			p.pop();
		};
	};

	return (
		<Box className={styles.container}>
			<Box className={styles.card}>
				<Heading size="6" mb="4">
					Matrix Transformation Demo
				</Heading>
				<Box className={styles.matrix}>
					<BlockMath
						math={`\\begin{bmatrix} ${e1[0]} & ${e2[0]} \\\\ ${e1[1]} & ${e2[1]} \\end{bmatrix}`}
					/>
				</Box>
				<Flex className={styles.controls}>
					<Box css={{ width: "120px" }}>
						<Text as="p" mb="2">
							Basis e1′ (column 1)
						</Text>
						<VectorInput
							label=""
							vector={e1}
							onChange={(idx, val) => {
								const u = [...e1];
								u[idx] = val;
								setE1(u);
							}}
						/>
					</Box>
					<Box css={{ width: "120px" }}>
						<Text as="p" mb="2">
							Basis e2′ (column 2)
						</Text>
						<VectorInput
							label=""
							vector={e2}
							onChange={(idx, val) => {
								const u = [...e2];
								u[idx] = val;
								setE2(u);
							}}
						/>
					</Box>
					<Box css={{ width: "120px" }}>
						<Text as="p" mb="2">
							Vector r
						</Text>
						<VectorInput
							label=""
							vector={r}
							onChange={(idx, val) => {
								const u = [...r];
								u[idx] = val;
								setR(u);
							}}
						/>
					</Box>
				</Flex>
				<Box mt="4">
					<ReactP5Wrapper sketch={sketch} />
				</Box>
			</Box>
		</Box>
	);
};
