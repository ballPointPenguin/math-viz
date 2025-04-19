import React from "react";

/**
 * Visualizes the scalar projection of one vector onto another
 *
 * @param {Object} props
 * @param {Object} props.p5 - The p5 instance
 * @param {Object} props.vectorA - The first vector {x, y}
 * @param {Object} props.vectorB - The second vector (to project onto) {x, y}
 * @param {Object} props.origin - The origin point {x, y} (default: {x: 0, y: 0})
 * @param {string} props.projectionColor - The color of the projection line
 * @param {number} props.strokeWeight - The thickness of the projection line
 * @param {boolean} props.showValue - Whether to show the scalar projection value
 * @param {string} props.label - Optional label for the projection
 */
const ScalarProjection = ({
	p5,
	vectorA,
	vectorB,
	origin = { x: 0, y: 0 },
	projectionColor = "#ef47ee",
	strokeWeight = 2,
	showValue = false,
	label = "",
}) => {
	if (!p5 || !vectorA || !vectorB) return null;

	// Calculate the dot product
	const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;

	// Calculate the magnitude of vectorB
	const magnitudeB = Math.sqrt(vectorB.x * vectorB.x + vectorB.y * vectorB.y);

	// Calculate the scalar projection
	const scalarProj = dotProduct / magnitudeB;

	// Calculate the unit vector in the direction of vectorB
	const unitB = {
		x: vectorB.x / magnitudeB,
		y: vectorB.y / magnitudeB,
	};

	// Calculate the end point of the projection line
	const projEndX = origin.x + unitB.x * scalarProj;
	const projEndY = origin.y + unitB.y * scalarProj;

	// Draw the projection line
	p5.push();
	p5.stroke(projectionColor);
	p5.strokeWeight(strokeWeight);
	p5.line(origin.x, origin.y, projEndX, projEndY);

	// Calculate perpendicular line ending at vectorA endpoint
	const perpEndX = origin.x + vectorA.x;
	const perpEndY = origin.y + vectorA.y;

	// Draw perpendicular line with visual differentiation
	const perpLineColor = p5.color(projectionColor);
	perpLineColor.setAlpha(150);
	p5.stroke(perpLineColor);
	p5.strokeWeight(0.5);
	p5.line(projEndX, projEndY, perpEndX, perpEndY);

	// Show the scalar projection value
	if (showValue) {
		p5.push();
		p5.noStroke();
		p5.fill(projectionColor);
		p5.textAlign(p5.LEFT, p5.CENTER);
		p5.text(`Scalar Proj: ${scalarProj.toFixed(2)}`, projEndX + 10, projEndY);
		p5.pop();
	}

	// Draw label if provided
	if (label) {
		p5.push();
		p5.noStroke();
		p5.fill(projectionColor);
		p5.textAlign(p5.CENTER, p5.CENTER);
		const labelX = origin.x + (projEndX - origin.x) / 2;
		const labelY = origin.y + (projEndY - origin.y) / 2 - 10;
		p5.text(label, labelX, labelY);
		p5.pop();
	}

	p5.pop();

	return null; // No actual DOM output, this is for P5 rendering only
};

export default ScalarProjection;
