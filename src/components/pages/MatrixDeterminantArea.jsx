import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Box, Flex, Heading, Slider, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { BlockMath, InlineMath } from "../KaTeX.jsx";
import { VectorInput } from "../ui/VectorInput.jsx";
import * as styles from "./MatrixDeterminantArea.css.ts";

export const MatrixDeterminantArea = () => {
	// State for the 2x2 transformation matrix
	const [a, setA] = useState(3);
	const [b, setB] = useState(1);
	const [c, setC] = useState(1);
	const [d, setD] = useState(2);

	// Calculate the determinant
	const determinant = a * d - b * c;

	// p5 sketch to draw the parallelogram and explain the area
	const sketch = (p) => {
		const width = 600;
		const height = 600;
		const scale = 40; // pixels per unit
		const origin = { x: width / 2, y: height / 2 };

		// Animation variables
		const currentValues = { a, b, c, d };
		let targetValues = { a, b, c, d };
		const animationSpeed = 0.1; // Adjust for faster/slower animation

		p.setup = () => {
			p.createCanvas(width, height);
		};

		p.updateWithProps = (props) => {
			// Update target values when props change
			targetValues = {
				a: props.a,
				b: props.b,
				c: props.c,
				d: props.d,
			};
		};

		p.draw = () => {
			// Smooth animation of values
			currentValues.a += (targetValues.a - currentValues.a) * animationSpeed;
			currentValues.b += (targetValues.b - currentValues.b) * animationSpeed;
			currentValues.c += (targetValues.c - currentValues.c) * animationSpeed;
			currentValues.d += (targetValues.d - currentValues.d) * animationSpeed;

			const { a, b, c, d } = currentValues;

			p.background("#121212");
			p.push();
			p.translate(origin.x, origin.y);

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

			// Draw the unit square (in purple with low opacity)
			p.fill(163, 119, 255, 50);
			p.strokeWeight(1);
			p.stroke(163, 119, 255, 150);
			p.beginShape();
			p.vertex(0, 0);
			p.vertex(scale, 0);
			p.vertex(scale, -scale);
			p.vertex(0, -scale);
			p.endShape(p.CLOSE);

			// Draw the transformed parallelogram (in pink)
			p.fill(255, 105, 180, 100);
			p.strokeWeight(2);
			p.stroke(255, 105, 180);
			p.beginShape();
			p.vertex(0, 0); // Origin
			p.vertex(a * scale, -c * scale); // First column vector
			p.vertex((a + b) * scale, -(c + d) * scale); // First + Second column vector
			p.vertex(b * scale, -d * scale); // Second column vector
			p.endShape(p.CLOSE);

			// Draw vectors as arrows
			const drawArrow = (x1, y1, x2, y2, color) => {
				p.strokeWeight(2);
				p.stroke(color);
				p.line(x1, y1, x2, y2);

				// Arrow head
				const angle = p.atan2(y2 - y1, x2 - x1);
				const arrowSize = 8;
				p.push();
				p.translate(x2, y2);
				p.rotate(angle);
				p.line(0, 0, -arrowSize, -arrowSize / 2);
				p.line(0, 0, -arrowSize, arrowSize / 2);
				p.pop();
			};

			// Draw column vectors
			drawArrow(0, 0, a * scale, -c * scale, "#00FF00"); // First column vector in green
			drawArrow(0, 0, b * scale, -d * scale, "#00FFFF"); // Second column vector in cyan

			// Label the areas
			p.fill(255);
			p.noStroke();
			p.textSize(14);

			// Unit square label
			p.text("Unit Square", scale / 2, -scale - 10);

			// Current determinant
			const currentDet = a * d - b * c;

			// Parallelogram area label
			p.text(
				`Area = ${Math.abs(currentDet).toFixed(2)}`,
				((a + b) * scale) / 2,
				(-(c + d) * scale) / 2,
			);

			// Vector labels
			p.textSize(12);
			p.text(
				`(${a.toFixed(1)}, ${c.toFixed(1)})`,
				a * scale + 5,
				-c * scale + 5,
			);
			p.text(
				`(${b.toFixed(1)}, ${d.toFixed(1)})`,
				b * scale + 5,
				-d * scale + 5,
			);

			p.pop();
		};
	};

	return (
		<Box className={styles.container}>
			<Box className={styles.card}>
				<Heading size="6" mb="4">
					Matrix Determinant & Area Visualization
				</Heading>

				<Text as="p" size="3" mb="4">
					This visualization shows how a 2×2 matrix transforms the unit square
					into a parallelogram. The absolute value of the determinant equals the
					area of this parallelogram.
				</Text>

				<Box className={styles.matrix}>
					<BlockMath
						math={`A = \\begin{bmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{bmatrix}`}
					/>
				</Box>

				<Box mt="4" mb="4">
					<BlockMath
						math={`\\det(A) = ${a} \\cdot ${d} - ${b} \\cdot ${c} = ${determinant}`}
					/>
					<Text as="p" size="3" mt="2">
						The area of the parallelogram is{" "}
						<InlineMath math={`|\\det(A)| = ${Math.abs(determinant)}`} />
					</Text>
				</Box>

				<Text as="p" size="3" mb="2" weight="bold">
					Matrix Values:
				</Text>

				<Flex className={styles.controls}>
					<Box width="120px">
						<Text as="p" mb="2">
							Element a:
						</Text>
						<input
							type="number"
							value={a}
							onChange={(e) => setA(Number(e.target.value))}
							className={styles.input}
							step="0.5"
							min="-10"
							max="10"
						/>
					</Box>
					<Box width="120px">
						<Text as="p" mb="2">
							Element b:
						</Text>
						<input
							type="number"
							value={b}
							onChange={(e) => setB(Number(e.target.value))}
							className={styles.input}
							step="0.5"
							min="-10"
							max="10"
						/>
					</Box>
					<Box width="120px">
						<Text as="p" mb="2">
							Element c:
						</Text>
						<input
							type="number"
							value={c}
							onChange={(e) => setC(Number(e.target.value))}
							className={styles.input}
							step="0.5"
							min="-10"
							max="10"
						/>
					</Box>
					<Box width="120px">
						<Text as="p" mb="2">
							Element d:
						</Text>
						<input
							type="number"
							value={d}
							onChange={(e) => setD(Number(e.target.value))}
							className={styles.input}
							step="0.5"
							min="-10"
							max="10"
						/>
					</Box>
				</Flex>

				<Box mt="4" className={styles.canvasContainer}>
					<ReactP5Wrapper sketch={sketch} a={a} b={b} c={c} d={d} />
				</Box>
			</Box>
		</Box>
	);
};

export default MatrixDeterminantArea;
