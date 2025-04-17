/* eslint-disable no-unused-vars */
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useState } from "react";
import "./CosineDotProduct.css";

// Main vector visualization sketch
function vectorSketch(p5) {
	let vector1 = { x: 100, y: 0 };
	let vector2 = { x: 70, y: 70 };
	let isAngleLocked;
	let lockedAngle;
	let centerX;
	let centerY;
	let onVectorChange;

	p5.setup = () => {
		const canvas = p5.createCanvas(400, 400);
		centerX = p5.width / 2;
		centerY = p5.height / 2;
	};

	p5.updateWithProps = (props) => {
		if (props.vector1) vector1 = props.vector1;
		if (props.vector2) vector2 = props.vector2;
		if (props.isAngleLocked !== undefined) isAngleLocked = props.isAngleLocked;
		if (props.lockedAngle !== undefined) lockedAngle = props.lockedAngle;
		if (props.onVectorChange) onVectorChange = props.onVectorChange;
	};

	p5.draw = () => {
		p5.background(240);

		// Draw the coordinate system
		p5.stroke(200);
		p5.line(0, centerY, p5.width, centerY);
		p5.line(centerX, 0, centerX, p5.height);

		// Draw the vectors
		drawVector(vector1, p5.color(255, 0, 0));
		drawVector(vector2, p5.color(0, 0, 255));

		// Draw the angle between vectors
		drawAngle(getAngleBetweenVectors(vector1, vector2));

		// Draw dot product info
		const dotProduct = calculateDotProduct(vector1, vector2);
		const v1Mag = calculateMagnitude(vector1);
		const v2Mag = calculateMagnitude(vector2);
		const cosineValue = dotProduct / (v1Mag * v2Mag);
		const angleDegrees =
			(getAngleBetweenVectors(vector1, vector2) * 180) / Math.PI;

		p5.noStroke();
		p5.fill(0);
		p5.textSize(14);
		p5.text(`Dot Product: ${dotProduct.toFixed(2)}`, 10, 20);
		p5.text(`|v1| = ${v1Mag.toFixed(2)}, |v2| = ${v2Mag.toFixed(2)}`, 10, 40);
		p5.text(`cos(θ) = ${cosineValue.toFixed(2)}`, 10, 60);
		p5.text(`θ = ${angleDegrees.toFixed(2)}°`, 10, 80);
	};

	function drawVector(vector, color) {
		p5.push();
		p5.translate(centerX, centerY);
		p5.stroke(color);
		p5.strokeWeight(2);
		p5.line(0, 0, vector.x, -vector.y); // Note: y is flipped in p5.js

		// Draw arrowhead
		const arrowAngle = Math.atan2(-vector.y, vector.x);
		const arrowSize = 10;
		p5.translate(vector.x, -vector.y);
		p5.rotate(arrowAngle);
		p5.line(0, 0, -arrowSize, -arrowSize / 2);
		p5.line(0, 0, -arrowSize, arrowSize / 2);

		p5.pop();
	}

	function drawAngle(angle) {
		const radius = 40;
		p5.push();
		p5.translate(centerX, centerY);
		p5.noFill();
		p5.stroke(100, 100, 100, 150);
		p5.arc(
			0,
			0,
			radius,
			radius,
			-Math.atan2(-vector1.y, vector1.x),
			-Math.atan2(-vector2.y, vector2.x),
		);
		p5.pop();
	}

	function calculateDotProduct(v1, v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}

	function calculateMagnitude(v) {
		return Math.sqrt(v.x * v.x + v.y * v.y);
	}

	function getAngleBetweenVectors(v1, v2) {
		const dotProduct = calculateDotProduct(v1, v2);
		const v1Mag = calculateMagnitude(v1);
		const v2Mag = calculateMagnitude(v2);
		return Math.acos(dotProduct / (v1Mag * v2Mag));
	}
}

// Cosine graph sketch
function cosineGraphSketch(p5) {
	const cosValues = [];
	let currentAngle = 0;

	p5.setup = () => {
		p5.createCanvas(400, 200);
		// Initialize the cosine graph with values
		for (let i = 0; i <= 360; i++) {
			cosValues.push(Math.cos((i * Math.PI) / 180));
		}
	};

	p5.updateWithProps = (props) => {
		if (props.angle !== undefined) {
			currentAngle = (props.angle * 180) / Math.PI;
		}
	};

	p5.draw = () => {
		p5.background(240);

		// Draw x and y axes
		p5.stroke(200);
		p5.line(0, p5.height / 2, p5.width, p5.height / 2);
		p5.line(0, 0, 0, p5.height);

		// Draw cosine graph
		p5.stroke(0, 0, 255);
		p5.noFill();
		p5.beginShape();
		for (let i = 0; i <= 360; i++) {
			const x = (i / 360) * p5.width;
			const y = p5.height / 2 - cosValues[i] * (p5.height / 2 - 20);
			p5.vertex(x, y);
		}
		p5.endShape();

		// Draw current angle marker
		const markerX = (currentAngle / 360) * p5.width;
		p5.stroke(255, 0, 0);
		p5.line(markerX, 0, markerX, p5.height);

		const currentCosValue = Math.cos((currentAngle * Math.PI) / 180);
		const markerY = p5.height / 2 - currentCosValue * (p5.height / 2 - 20);
		p5.fill(255, 0, 0);
		p5.ellipse(markerX, markerY, 8, 8);

		// Label
		p5.fill(0);
		p5.noStroke();
		p5.textSize(12);
		p5.text(
			`cos(${currentAngle.toFixed(0)}°) = ${currentCosValue.toFixed(2)}`,
			10,
			20,
		);
	};
}

// Main component
export default function CosineDotProduct() {
	const [vector1, setVector1] = useState({ x: 100, y: 0 });
	const [vector2, setVector2] = useState({ x: 70, y: 70 });
	const [isAngleLocked, setIsAngleLocked] = useState(false);
	const [lockedAngle, setLockedAngle] = useState(0);
	const [angleDegrees, setAngleDegrees] = useState(45);

	const handleVectorChange = (vectorId, v1, v2) => {
		if (vectorId === 1) {
			setVector1({ ...v1 });
			if (isAngleLocked) {
				// Adjust vector2 to maintain the locked angle
				const magnitude = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
				const angle1 = Math.atan2(v1.y, v1.x);
				const newAngle = angle1 + lockedAngle;
				setVector2({
					x: magnitude * Math.cos(newAngle),
					y: magnitude * Math.sin(newAngle),
				});
			}
		} else if (vectorId === 2) {
			setVector2({ ...v2 });
			if (isAngleLocked) {
				// Adjust vector1 to maintain the locked angle
				const magnitude = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
				const angle2 = Math.atan2(v2.y, v2.x);
				const newAngle = angle2 - lockedAngle;
				setVector1({
					x: magnitude * Math.cos(newAngle),
					y: magnitude * Math.sin(newAngle),
				});
			}
		}
	};

	const toggleAngleLock = () => {
		if (!isAngleLocked) {
			// Calculate and store the current angle when locking
			const angle1 = Math.atan2(vector1.y, vector1.x);
			const angle2 = Math.atan2(vector2.y, vector2.x);
			setLockedAngle(angle2 - angle1);
		}
		setIsAngleLocked(!isAngleLocked);
	};

	// Handle slider/number input for Vector A
	const handleVector1Change = (axis, value) => {
		const newValue = Number.parseFloat(value);
		const newVector = { ...vector1, [axis]: newValue };
		setVector1(newVector);

		if (isAngleLocked) {
			// Maintain angle with Vector B
			const magnitude = Math.sqrt(
				vector2.x * vector2.x + vector2.y * vector2.y,
			);
			const angle1 = Math.atan2(newVector.y, newVector.x);
			const newAngle = angle1 + lockedAngle;
			setVector2({
				x: magnitude * Math.cos(newAngle),
				y: magnitude * Math.sin(newAngle),
			});
		}
	};

	// Handle slider/number input for Vector B
	const handleVector2Change = (axis, value) => {
		const newValue = Number.parseFloat(value);
		const newVector = { ...vector2, [axis]: newValue };
		setVector2(newVector);

		if (isAngleLocked) {
			// Maintain angle with Vector A
			const magnitude = Math.sqrt(
				vector1.x * vector1.x + vector1.y * vector1.y,
			);
			const angle2 = Math.atan2(newVector.y, newVector.x);
			const newAngle = angle2 - lockedAngle;
			setVector1({
				x: magnitude * Math.cos(newAngle),
				y: magnitude * Math.sin(newAngle),
			});
		}
	};

	// Handle angle slider/input
	const handleAngleChange = (value) => {
		const newAngle = Number.parseFloat(value);
		setAngleDegrees(newAngle);

		if (isAngleLocked) {
			// Adjust vectors to match the angle
			const radians = (newAngle * Math.PI) / 180;
			setLockedAngle(radians);

			// Maintain Vector A, adjust Vector B
			const magnitude = Math.sqrt(
				vector2.x * vector2.x + vector2.y * vector2.y,
			);
			const angle1 = Math.atan2(vector1.y, vector1.x);
			const newAdjustedAngle = angle1 + radians;

			setVector2({
				x: magnitude * Math.cos(newAdjustedAngle),
				y: magnitude * Math.sin(newAdjustedAngle),
			});
		}
	};

	// Calculate the angle between vectors for the cosine graph
	// eslint-disable-next-line no-unused-vars
	const angle = Math.acos(
		(vector1.x * vector2.x + vector1.y * vector2.y) /
			(Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y) *
				Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y)),
	);

	// Calculate vector magnitudes and dot product for display
	const v1Mag = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
	const v2Mag = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
	const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
	const cosineValue = dotProduct / (v1Mag * v2Mag);
	const angleRadians = Math.acos(Math.max(-1, Math.min(1, cosineValue)));
	const calculatedAngleDegrees = (angleRadians * 180) / Math.PI;

	return (
		<div className="cosine-dot-product-container">
			<h1>Cosine and Dot Product Visualization</h1>

			<div className="visualization-container">
				<div className="vector-canvas">
					<h2>Vector Visualization</h2>
					<ReactP5Wrapper
						sketch={vectorSketch}
						vector1={vector1}
						vector2={vector2}
						isAngleLocked={isAngleLocked}
						lockedAngle={lockedAngle}
						onVectorChange={handleVectorChange}
					/>

					<div className="vectors-control">
						<div className="vector-controls">
							<h3>Vector A (Red)</h3>
							<div className="slider-container">
								<label htmlFor="vecAx">x:</label>
								<input
									type="range"
									id="vecAx"
									min="-5"
									max="5"
									step="0.1"
									value={vector1.x / 50}
									onChange={(e) =>
										handleVector1Change("x", e.target.value * 50)
									}
								/>
								<input
									type="number"
									id="vecAxValue"
									min="-5"
									max="5"
									step="0.1"
									value={(vector1.x / 50).toFixed(1)}
									onChange={(e) =>
										handleVector1Change("x", e.target.value * 50)
									}
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
									value={vector1.y / 50}
									onChange={(e) =>
										handleVector1Change("y", e.target.value * 50)
									}
								/>
								<input
									type="number"
									id="vecAyValue"
									min="-5"
									max="5"
									step="0.1"
									value={(vector1.y / 50).toFixed(1)}
									onChange={(e) =>
										handleVector1Change("y", e.target.value * 50)
									}
								/>
							</div>
						</div>

						<div className="vector-controls">
							<h3>Vector B (Blue)</h3>
							<div className="slider-container">
								<label htmlFor="vecBx">x:</label>
								<input
									type="range"
									id="vecBx"
									min="-5"
									max="5"
									step="0.1"
									value={vector2.x / 50}
									onChange={(e) =>
										handleVector2Change("x", e.target.value * 50)
									}
								/>
								<input
									type="number"
									id="vecBxValue"
									min="-5"
									max="5"
									step="0.1"
									value={(vector2.x / 50).toFixed(1)}
									onChange={(e) =>
										handleVector2Change("x", e.target.value * 50)
									}
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
									value={vector2.y / 50}
									onChange={(e) =>
										handleVector2Change("y", e.target.value * 50)
									}
								/>
								<input
									type="number"
									id="vecByValue"
									min="-5"
									max="5"
									step="0.1"
									value={(vector2.y / 50).toFixed(1)}
									onChange={(e) =>
										handleVector2Change("y", e.target.value * 50)
									}
								/>
							</div>
						</div>
					</div>

					<div className="angle-control">
						<h3>Angle Between Vectors:</h3>
						<input
							type="range"
							id="angleSlider"
							min="0"
							max="180"
							value={calculatedAngleDegrees.toFixed(0)}
							onChange={(e) => handleAngleChange(e.target.value)}
							disabled={!isAngleLocked}
						/>
						<input
							type="number"
							id="angleValue"
							min="0"
							max="180"
							value={calculatedAngleDegrees.toFixed(0)}
							onChange={(e) => handleAngleChange(e.target.value)}
							disabled={!isAngleLocked}
						/>
						°
						<button
							type="button"
							onClick={toggleAngleLock}
							className={`lock-button ${isAngleLocked ? "locked" : ""}`}
						>
							{isAngleLocked ? "Unlock Angle" : "Lock Angle"}
						</button>
					</div>

					<div className="vector-info">
						<h3>Calculations</h3>
						<div>
							<strong>Vector A:</strong> ({(vector1.x / 50).toFixed(1)},{" "}
							{(vector1.y / 50).toFixed(1)}) | Modulus: |A| ={" "}
							{(v1Mag / 50).toFixed(2)}
						</div>
						<div>
							<strong>Vector B:</strong> ({(vector2.x / 50).toFixed(1)},{" "}
							{(vector2.y / 50).toFixed(1)}) | Modulus: |B| ={" "}
							{(v2Mag / 50).toFixed(2)}
						</div>
						<div>
							<strong>Angle between vectors:</strong>{" "}
							{calculatedAngleDegrees.toFixed(1)}° (
							{calculatedAngleDegrees < 90
								? "acute"
								: calculatedAngleDegrees > 90
									? "obtuse"
									: "right angle"}
							)
						</div>
						<div>
							<strong>Cosine of angle:</strong> cos(
							{calculatedAngleDegrees.toFixed(1)}°) = {cosineValue.toFixed(4)}
						</div>
						<div>
							<strong>Dot Product:</strong> A · B = {dotProduct.toFixed(2)}
						</div>
						<div>
							<strong>|A|·|B|·cos(θ):</strong> {(v1Mag / 50).toFixed(2)} ×{" "}
							{(v2Mag / 50).toFixed(2)} × {cosineValue.toFixed(4)} ={" "}
							{((v1Mag * v2Mag * cosineValue) / 2500).toFixed(2)}
						</div>
						<div>
							<em>
								* Note that A · B = |A|·|B|·cos(θ) as shown in the formula
							</em>
						</div>
					</div>
				</div>

				<div className="cosine-graph">
					<h2>Cosine Function</h2>
					<ReactP5Wrapper sketch={cosineGraphSketch} angle={angle} />
				</div>
			</div>

			<div className="explanation">
				<h2>The Relationship Between Dot Product and Cosine</h2>
				<p>
					The dot product of two vectors <b>a</b> and <b>b</b> is defined as:
				</p>
				<div className="formula">
					<b>a</b> · <b>b</b> = |<b>a</b>| |<b>b</b>| cos(θ)
				</div>
				<p>
					Where θ is the angle between the vectors, |<b>a</b>| is the magnitude
					of vector <b>a</b>, and |<b>b</b>| is the magnitude of vector <b>b</b>
					.
				</p>
				<p>
					This relationship is fundamental in linear algebra and has many
					applications:
				</p>
				<ul>
					<li>
						When vectors are perpendicular (90°), cos(90°) = 0, so the dot
						product is 0.
					</li>
					<li>
						When vectors point in the same direction (0°), cos(0°) = 1, so the
						dot product equals the product of their magnitudes.
					</li>
					<li>
						When vectors point in opposite directions (180°), cos(180°) = -1, so
						the dot product is negative.
					</li>
				</ul>
			</div>

			<div className="instructions">
				<h3>How to Use This Visualization:</h3>
				<ol>
					<li>
						Use the sliders or number inputs to adjust the x and y components of
						vectors A and B.
					</li>
					<li>
						Observe how the dot product and cosine value change as you adjust
						the vectors.
					</li>
					<li>
						Use the "Lock Angle" button to maintain a constant angle between the
						vectors as you adjust them.
					</li>
					<li>
						When angle is locked, you can use the angle slider to set a specific
						angle between vectors.
					</li>
					<li>
						Notice the relationship between the angle and the position on the
						cosine curve.
					</li>
				</ol>
			</div>
		</div>
	);
}
