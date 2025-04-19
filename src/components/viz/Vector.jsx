import { P5Instance } from "@p5-wrapper/react";
import { Box } from "@radix-ui/themes";
import React from "react";

/**
 * A reusable vector component for drawing/visualizing vectors
 *
 * @param {Object} props
 * @param {P5Instance} props.p5 - The p5 instance
 * @param {Object} props.vector - The vector to draw {x, y}
 * @param {Object} props.origin - The origin point {x, y} (default: {x: 0, y: 0})
 * @param {string} props.color - The color of the vector
 * @param {number} props.arrowSize - The size of the arrow head
 * @param {number} props.strokeWeight - The thickness of the line
 * @param {boolean} props.showComponents - Whether to show x/y components
 * @param {string} props.label - Optional label for the vector
 * @param {string} props.componentsColor - Color for component lines (if shown)
 * @param {Object} props.labelStyle - Additional styling for the label
 */
const Vector = ({
	p5,
	vector,
	origin = { x: 0, y: 0 },
	color = "#a377ff",
	arrowSize = 10,
	strokeWeight = 2,
	showComponents = false,
	label = "",
	componentsColor = "#43ecff",
	labelStyle = {},
}) => {
	if (!p5 || !vector) return null;

	// Draw the vector
	p5.push();
	p5.stroke(color);
	p5.strokeWeight(strokeWeight);

	// Calculate end point
	const endX = origin.x + vector.x;
	const endY = origin.y + vector.y;

	// Draw the main line
	p5.line(origin.x, origin.y, endX, endY);

	// Draw the arrow head
	const angle = Math.atan2(vector.y, vector.x);
	p5.push();
	p5.translate(endX, endY);
	p5.rotate(angle);
	p5.fill(color);
	p5.noStroke();
	p5.triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);
	p5.pop();

	// Draw components if needed
	if (showComponents) {
		p5.stroke(componentsColor);
		p5.strokeWeight(1);
		p5.setLineDash([5, 5]);
		// X component
		p5.line(origin.x, origin.y, endX, origin.y);
		// Y component
		p5.line(endX, origin.y, endX, endY);
		p5.setLineDash([]);
	}

	// Draw label if provided
	if (label) {
		const labelX = origin.x + vector.x / 2;
		const labelY = origin.y + vector.y / 2;
		p5.push();
		p5.noStroke();
		p5.fill(color);
		p5.textAlign(p5.CENTER, p5.CENTER);
		p5.text(label, labelX, labelY);
		p5.pop();
	}

	p5.pop();

	return null; // No actual DOM output, this is for P5 rendering only
};

export default Vector;
