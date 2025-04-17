import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "./KaTeX.jsx";
import "./VectorOperations.css";

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
	const [vectorA, setVectorA] = useState({ x: 2, y: 3 });
	const [vectorB, setVectorB] = useState({ x: 4, y: -1 });
	const [vectorInfo, setVectorInfo] = useState({
		magA: 0,
		magB: 0,
		dotProduct: 0,
		crossProduct: 0,
		angle: 0,
		scalarProj: 0,
		vectorProj: { x: 0, y: 0 },
	});

	// Update calculations when vectors change
	useEffect(() => {
		const magA = Math.sqrt(vectorA.x * vectorA.x + vectorA.y * vectorA.y);
		const magB = Math.sqrt(vectorB.x * vectorB.x + vectorB.y * vectorB.y);
		const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;

		// Calculate cross product (for 2D vectors, returns scalar representing z-component)
		const crossProduct = vectorA.x * vectorB.y - vectorA.y * vectorB.x;

		// Calculate the angle between vectors (in degrees)
		const cosAngle = dotProduct / (magA * magB);
		const clampedCosAngle = Math.max(-1, Math.min(1, cosAngle)); // Avoid floating point errors
		const angle = (Math.acos(clampedCosAngle) * 180) / Math.PI;

		// Calculate projections
		const scalarProj = dotProduct / magA;
		const magASq = magA * magA;
		const vectorProj = {
			x: (vectorA.x * dotProduct) / magASq,
			y: (vectorA.y * dotProduct) / magASq,
		};

		setVectorInfo({
			magA,
			magB,
			dotProduct,
			crossProduct,
			angle,
			scalarProj,
			vectorProj,
		});
	}, [vectorA, vectorB]);

	// Handler for vector A inputs
	const handleVectorAChange = (component, value) => {
		const newValue = Number.parseFloat(value) || 0;
		setVectorA((prev) => ({
			...prev,
			[component]: newValue,
		}));
	};

	// Handler for vector B inputs
	const handleVectorBChange = (component, value) => {
		const newValue = Number.parseFloat(value) || 0;
		setVectorB((prev) => ({
			...prev,
			[component]: newValue,
		}));
	};

	return (
		<div>
			<h1>Vector Operations Explorer</h1>
			<p>
				This interactive tool allows you to explore vector operations like
				modulus (length) and dot product (inner product).
			</p>

			<div className="canvas-container">
				<ReactP5Wrapper sketch={sketch} vectorA={vectorA} vectorB={vectorB} />
			</div>

			<div className="controls">
				<div className="control-group">
					<h2>Vector A</h2>
					<div className="slider-container">
						<label htmlFor="vecAx">x:</label>
						<input
							type="range"
							id="vecAx"
							min="-5"
							max="5"
							step="0.1"
							value={vectorA.x}
							onChange={(e) => handleVectorAChange("x", e.target.value)}
						/>
						<input
							type="number"
							id="vecAxValue"
							value={vectorA.x}
							min="-5"
							max="5"
							step="0.1"
							onChange={(e) => handleVectorAChange("x", e.target.value)}
						/>
					</div>
					<div className="slider-container">
						<label htmlFor="vecAy">y:</label>
						<input
							type="range"
							id="vecAy"
							min="-5"
							max="5"
							step="0.1"
							value={vectorA.y}
							onChange={(e) => handleVectorAChange("y", e.target.value)}
						/>
						<input
							type="number"
							id="vecAyValue"
							value={vectorA.y}
							min="-5"
							max="5"
							step="0.1"
							onChange={(e) => handleVectorAChange("y", e.target.value)}
						/>
					</div>
				</div>

				<div className="control-group">
					<h2>Vector B</h2>
					<div className="slider-container">
						<label htmlFor="vecBx">x:</label>
						<input
							type="range"
							id="vecBx"
							min="-5"
							max="5"
							step="0.1"
							value={vectorB.x}
							onChange={(e) => handleVectorBChange("x", e.target.value)}
						/>
						<input
							type="number"
							id="vecBxValue"
							value={vectorB.x}
							min="-5"
							max="5"
							step="0.1"
							onChange={(e) => handleVectorBChange("x", e.target.value)}
						/>
					</div>
					<div className="slider-container">
						<label htmlFor="vecBy">y:</label>
						<input
							type="range"
							id="vecBy"
							min="-5"
							max="5"
							step="0.1"
							value={vectorB.y}
							onChange={(e) => handleVectorBChange("y", e.target.value)}
						/>
						<input
							type="number"
							id="vecByValue"
							value={vectorB.y}
							min="-5"
							max="5"
							step="0.1"
							onChange={(e) => handleVectorBChange("y", e.target.value)}
						/>
					</div>
				</div>

				<div className="output">
					<div>
						<strong>Vector A:</strong> ({vectorA.x.toFixed(1)},{" "}
						{vectorA.y.toFixed(1)}) | Modulus: |A| ={" "}
						{vectorInfo.magA.toFixed(2)}
					</div>
					<div>
						<strong>Vector B:</strong> ({vectorB.x.toFixed(1)},{" "}
						{vectorB.y.toFixed(1)}) | Modulus: |B| ={" "}
						{vectorInfo.magB.toFixed(2)}
					</div>
					<div>
						<strong>Dot Product:</strong> A · B ={" "}
						{vectorInfo.dotProduct.toFixed(2)}
						<br />
						<strong>Cross Product (z-component):</strong> A × B ={" "}
						{vectorInfo.crossProduct.toFixed(2)}
						<br />
						<strong>Angle between vectors:</strong>{" "}
						{vectorInfo.angle.toFixed(1)}°
						{vectorInfo.angle < 90
							? " (acute)"
							: vectorInfo.angle > 90
								? " (obtuse)"
								: " (right angle)"}
						<br />
						<strong>Scalar Projection of B onto A:</strong>{" "}
						{vectorInfo.scalarProj.toFixed(2)}
						<br />
						<strong>Vector Projection of B onto A:</strong> (
						{vectorInfo.vectorProj.x.toFixed(2)},{" "}
						{vectorInfo.vectorProj.y.toFixed(2)})
					</div>
				</div>
			</div>

			<div className="controls">
				<h2>Key Formulas</h2>
				<p>The formulas used in this visualization are:</p>
				<div className="formula">
					<strong>Modulus (Length):</strong>{" "}
					<InlineMath math={"|\\vec{v}| = \\sqrt{x^2 + y^2}"} />
				</div>
				<div className="formula">
					<strong>Dot Product:</strong>{" "}
					<InlineMath
						math={"\\vec{A} \\cdot \\vec{B} = A_x \\cdot B_x + A_y \\cdot B_y"}
					/>
				</div>
				<div className="formula">
					<strong>Cross Product (2D):</strong>{" "}
					<InlineMath
						math={"\\vec{A} \\times \\vec{B} = A_x \\cdot B_y - A_y \\cdot B_x"}
					/>
				</div>
				<div className="formula">
					<strong>Angle between vectors:</strong>{" "}
					<InlineMath
						math={
							"\\cos(\\theta) = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{A}| \\cdot |\\vec{B}|}"
						}
					/>
				</div>
				<div className="formula">
					<strong>Scalar Projection:</strong>{" "}
					<InlineMath
						math={
							"\\text{proj}_{\\vec{A}}(\\vec{B}) = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{A}|}"
						}
					/>
				</div>
				<div className="formula">
					<strong>Vector Projection:</strong>{" "}
					<InlineMath
						math={
							"\\text{proj}_{\\vec{A}}(\\vec{B}) = \\frac{\\vec{A} \\cdot \\vec{B}}{\\vec{A} \\cdot \\vec{A}} \\cdot \\vec{A}"
						}
					/>
				</div>
			</div>
		</div>
	);
}
