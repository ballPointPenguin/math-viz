import { ReactP5Wrapper } from "@p5-wrapper/react";
import * as math from "mathjs";
import { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "./KaTeX.jsx";

function VectorSketch({ vectorA, vectorB }) {
	// P5 sketch function
	return (p5) => {
		// Canvas setup
		const width = 600;
		const height = 600;
		const gridSize = 50;
		const originX = width / 2;
		const originY = height / 2;
		const scale = 40; // pixels per unit

		// Setup the canvas
		p5.setup = () => {
			p5.createCanvas(width, height);
			p5.textSize(14);
		};

		// Draw function
		p5.draw = () => {
			p5.background(240);
			drawGrid(p5, gridSize, originX, originY);
			drawAxes(p5, originX, originY);

			// Draw vectors
			const vecAStart = [originX, originY];
			const vecAEnd = [
				originX + vectorA[0] * scale,
				originY - vectorA[1] * scale,
			];

			// Draw Vector A
			drawVector(p5, vecAStart, vecAEnd, [255, 0, 0], "A");

			// Draw Vector B starting from end of A for addition visualization
			const vecBEnd = [
				vecAEnd[0] + vectorB[0] * scale,
				vecAEnd[1] - vectorB[1] * scale,
			];
			drawVector(p5, vecAEnd, vecBEnd, [0, 0, 255], "B");

			// Draw the resultant vector C = A + B
			drawVector(p5, vecAStart, vecBEnd, [0, 150, 0], "A + B");

			// Draw vector B from origin (for comparison)
			const vecBFromOrigin = [
				originX + vectorB[0] * scale,
				originY - vectorB[1] * scale,
			];
			drawVector(
				p5,
				[originX, originY],
				vecBFromOrigin,
				[0, 0, 255, 100],
				"B",
				true,
			);

			// Calculate the resultant vector
			const resultVector = math.add(vectorA, vectorB);

			// Display component values on canvas
			p5.fill(0);
			p5.noStroke();
			p5.textSize(16);
			p5.text(
				`Result: (${resultVector[0].toFixed(2)}, ${resultVector[1].toFixed(2)})`,
				20,
				30,
			);
		};
	};
}

// Helper function to draw the grid
function drawGrid(p5, size, originX, originY) {
	p5.stroke(200);
	p5.strokeWeight(1);

	// Vertical lines
	for (let x = originX % size; x < p5.width; x += size) {
		p5.line(x, 0, x, p5.height);
	}

	// Horizontal lines
	for (let y = originY % size; y < p5.height; y += size) {
		p5.line(0, y, p5.width, y);
	}
}

// Helper function to draw the axes
function drawAxes(p5, originX, originY) {
	p5.stroke(0);
	p5.strokeWeight(2);

	// X-axis
	p5.line(0, originY, p5.width, originY);

	// Y-axis
	p5.line(originX, 0, originX, p5.height);

	// Axis labels
	p5.noStroke();
	p5.fill(0);
	p5.text("x", p5.width - 15, originY - 10);
	p5.text("y", originX + 10, 15);

	// Draw axis ticks and values
	p5.strokeWeight(1);
	const scale = 40; // pixels per unit

	// X-axis ticks
	for (let x = originX + scale; x < p5.width; x += scale) {
		p5.stroke(0);
		p5.line(x, originY - 5, x, originY + 5);
		p5.noStroke();
		p5.text((x - originX) / scale, x - 5, originY + 20);
	}

	for (let x = originX - scale; x > 0; x -= scale) {
		p5.stroke(0);
		p5.line(x, originY - 5, x, originY + 5);
		p5.noStroke();
		p5.text((x - originX) / scale, x - 5, originY + 20);
	}

	// Y-axis ticks
	for (let y = originY - scale; y > 0; y -= scale) {
		p5.stroke(0);
		p5.line(originX - 5, y, originX + 5, y);
		p5.noStroke();
		p5.text((originY - y) / scale, originX - 25, y + 5);
	}

	for (let y = originY + scale; y < p5.height; y += scale) {
		p5.stroke(0);
		p5.line(originX - 5, y, originX + 5, y);
		p5.noStroke();
		p5.text((originY - y) / scale, originX - 25, y + 5);
	}
}

// Helper function to draw a vector
function drawVector(p5, start, end, color, label, dashed = false) {
	const vectorX = end[0] - start[0];
	const vectorY = end[1] - start[1];
	// const mag = p5.dist(start[0], start[1], end[0], end[1]);
	const angle = p5.atan2(-vectorY, vectorX); // Negative because y is inverted in canvas

	// Draw the vector line
	p5.stroke(color);
	p5.strokeWeight(2);

	if (dashed) {
		drawDashedLine(p5, start[0], start[1], end[0], end[1]);
	} else {
		p5.line(start[0], start[1], end[0], end[1]);
	}

	// Draw the arrowhead
	const arrowSize = 10;
	p5.push();
	p5.translate(end[0], end[1]);
	p5.rotate(angle);
	p5.fill(color);
	p5.noStroke();
	p5.triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);
	p5.pop();

	// Label the vector
	p5.fill(color);
	p5.noStroke();
	// Position the label at the midpoint of the vector
	const labelX = (start[0] + end[0]) / 2;
	const labelY = (start[1] + end[1]) / 2;
	p5.text(label, labelX + 10, labelY - 10);
}

function drawDashedLine(p5, x1, y1, x2, y2) {
	const dashLength = 5;
	const gapLength = 5;
	const dx = x2 - x1;
	const dy = y2 - y1;
	const dist = p5.sqrt(dx * dx + dy * dy);
	const dashCount = Math.floor(dist / (dashLength + gapLength));
	const dashDx = dx / dashCount;
	const dashDy = dy / dashCount;

	for (let i = 0; i < dashCount; i++) {
		p5.line(
			x1 + i * dashDx,
			y1 + i * dashDy,
			x1 + i * dashDx + (dashLength * dashDx) / (dashLength + gapLength),
			y1 + i * dashDy + (dashLength * dashDy) / (dashLength + gapLength),
		);
	}
}

export function VectorAddition() {
	const [vectorA, setVectorA] = useState([3, 2]);
	const [vectorB, setVectorB] = useState([1, 4]);
	const [resultVector, setResultVector] = useState(math.add(vectorA, vectorB));
	const [magnitude, setMagnitude] = useState({
		A: math.norm(vectorA),
		B: math.norm(vectorB),
		sum: math.norm(math.add(vectorA, vectorB)),
	});
	const [dotProduct, setDotProduct] = useState(math.dot(vectorA, vectorB));
	const [angle, setAngle] = useState(
		(math.acos(
			math.dot(vectorA, vectorB) / (math.norm(vectorA) * math.norm(vectorB)),
		) *
			180) /
			Math.PI,
	);

	// Update calculations when vectors change
	useEffect(() => {
		const result = math.add(vectorA, vectorB);
		setResultVector(result);
		setMagnitude({
			A: math.norm(vectorA),
			B: math.norm(vectorB),
			sum: math.norm(result),
		});
		setDotProduct(math.dot(vectorA, vectorB));

		const dotProd = math.dot(vectorA, vectorB);
		const magA = math.norm(vectorA);
		const magB = math.norm(vectorB);
		const cosAngle = dotProd / (magA * magB);
		// Handle potential floating point errors that could make cosAngle slightly outside [-1, 1]
		const clampedCosAngle = Math.max(-1, Math.min(1, cosAngle));
		const angleRad = Math.acos(clampedCosAngle);
		const angleDeg = (angleRad * 180) / Math.PI;
		setAngle(angleDeg);
	}, [vectorA, vectorB]);

	// Handler for vector A inputs
	const handleVectorAChange = (index, value) => {
		const newValue = Number.parseFloat(value) || 0;
		const newVector = [...vectorA];
		newVector[index] = newValue;
		setVectorA(newVector);
	};

	// Handler for vector B inputs
	const handleVectorBChange = (index, value) => {
		const newValue = Number.parseFloat(value) || 0;
		const newVector = [...vectorB];
		newVector[index] = newValue;
		setVectorB(newVector);
	};

	return (
		<div className="vector-addition-container">
			<h2>Vector Addition Calculator</h2>

			<div className="controls" style={{ marginBottom: "20px" }}>
				<div>
					<h3>Vector A</h3>
					<label>
						x:
						<input
							type="number"
							value={vectorA[0]}
							onChange={(e) => handleVectorAChange(0, e.target.value)}
							style={{ margin: "0 10px" }}
						/>
					</label>
					<label>
						y:
						<input
							type="number"
							value={vectorA[1]}
							onChange={(e) => handleVectorAChange(1, e.target.value)}
							style={{ margin: "0 10px" }}
						/>
					</label>
				</div>

				<div>
					<h3>Vector B</h3>
					<label>
						x:
						<input
							type="number"
							value={vectorB[0]}
							onChange={(e) => handleVectorBChange(0, e.target.value)}
							style={{ margin: "0 10px" }}
						/>
					</label>
					<label>
						y:
						<input
							type="number"
							value={vectorB[1]}
							onChange={(e) => handleVectorBChange(1, e.target.value)}
							style={{ margin: "0 10px" }}
						/>
					</label>
				</div>
			</div>

			<div className="visualization">
				<ReactP5Wrapper sketch={VectorSketch({ vectorA, vectorB })} />
			</div>

			<div className="calculations" style={{ marginTop: "20px" }}>
				<h3>Vector Calculations</h3>
				<p>
					<strong>Vector A:</strong>{" "}
					<InlineMath math={`\\vec{A} = (${vectorA[0]}, ${vectorA[1]})`} />,
					Magnitude:{" "}
					<InlineMath math={`|\\vec{A}| = ${magnitude.A.toFixed(2)}`} />
				</p>
				<p>
					<strong>Vector B:</strong>{" "}
					<InlineMath math={`\\vec{B} = (${vectorB[0]}, ${vectorB[1]})`} />,
					Magnitude:{" "}
					<InlineMath math={`|\\vec{B}| = ${magnitude.B.toFixed(2)}`} />
				</p>
				<p>
					<strong>Result Vector (A + B):</strong>{" "}
					<InlineMath
						math={`\\vec{R} = (${resultVector[0]}, ${resultVector[1]})`}
					/>
					, Magnitude:{" "}
					<InlineMath math={`|\\vec{R}| = ${magnitude.sum.toFixed(2)}`} />
				</p>
				<p>
					<strong>Dot Product:</strong>{" "}
					<InlineMath
						math={`\\vec{A} \\cdot \\vec{B} = ${dotProduct.toFixed(2)}`}
					/>
				</p>
				<p>
					<strong>Angle between vectors:</strong>{" "}
					<InlineMath math={`\\theta = ${angle.toFixed(2)}^\\circ`} />
				</p>
			</div>

			<div
				className="result-properties"
				style={{
					marginTop: "20px",
					padding: "15px",
					borderRadius: "5px",
				}}
			>
				<h3>Result Vector Properties</h3>
				<p>
					<strong>Components:</strong> x = {resultVector[0]}, y ={" "}
					{resultVector[1]}
				</p>
				<p>
					<strong>Magnitude:</strong> {magnitude.sum.toFixed(2)}
				</p>
				<p>
					<strong>Direction:</strong>{" "}
					{(
						(Math.atan2(resultVector[1], resultVector[0]) * 180) /
						Math.PI
					).toFixed(2)}
					° from positive x-axis
				</p>
				<p>
					<strong>Quadrant:</strong> {getQuadrant(resultVector)}
				</p>
			</div>

			<div className="explanation" style={{ marginTop: "30px" }}>
				<h3>How Vector Addition Works</h3>
				<p>
					Vector addition follows the parallelogram law. When adding vector A to
					vector B, we place the tail of vector B at the head of vector A. The
					resultant vector is drawn from the tail of A to the head of B.
				</p>
				<BlockMath
					math={`\\vec{A} + \\vec{B} = (${vectorA[0]} + ${vectorB[0]}, ${vectorA[1]} + ${vectorB[1]}) = (${vectorA[0] + vectorB[0]}, ${vectorA[1] + vectorB[1]})`}
				/>
				<p>
					The magnitude of a vector is calculated using the Pythagorean theorem:
				</p>
				<BlockMath math={"|\\vec{V}| = \\sqrt{V_x^2 + V_y^2}"} />
				<p>The dot product between two vectors is calculated as:</p>
				<BlockMath
					math={
						"\\vec{A} \\cdot \\vec{B} = |\\vec{A}||\\vec{B}|\\cos(\\theta) = A_x B_x + A_y B_y"
					}
				/>
				<p>
					The angle between two vectors can be found using the dot product
					formula:
				</p>
				<BlockMath
					math={
						"\\theta = \\cos^{-1}\\left(\\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{A}||\\vec{B}|}\\right)"
					}
				/>
			</div>
		</div>
	);
}

// Helper function to determine the quadrant of the result vector
function getQuadrant(vector) {
	const x = vector[0];
	const y = vector[1];

	if (x > 0 && y > 0) return "I (top-right)";
	if (x < 0 && y > 0) return "II (top-left)";
	if (x < 0 && y < 0) return "III (bottom-left)";
	if (x > 0 && y < 0) return "IV (bottom-right)";
	if (x === 0 && y > 0) return "Positive y-axis";
	if (x === 0 && y < 0) return "Negative y-axis";
	if (y === 0 && x > 0) return "Positive x-axis";
	if (y === 0 && x < 0) return "Negative x-axis";
	return "Origin";
}
