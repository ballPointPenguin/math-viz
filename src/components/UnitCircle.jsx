import { ReactP5Wrapper } from "@p5-wrapper/react";
import React from "react";
import { BlockMath } from "./KaTeX.jsx";

function sketch(p) {
	let angle = 0;
	p.setup = () => {
		p.createCanvas(400, 400);
	};
	p.draw = () => {
		p.background(255);
		p.translate(200, 200);
		p.stroke(0);
		p.noFill();
		p.ellipse(0, 0, 300, 300); // unit circle
		// Draw angle arc
		p.stroke(100, 100, 255);
		p.arc(0, 0, 60, 60, 0, angle, p.OPEN);
		// Draw radius
		p.stroke(255, 0, 0);
		p.line(0, 0, 150 * Math.cos(angle), 150 * Math.sin(angle));
		// Draw projection lines
		p.stroke(0, 200, 0, 120);
		p.line(
			150 * Math.cos(angle),
			150 * Math.sin(angle),
			150 * Math.cos(angle),
			0,
		);
		p.stroke(0, 0, 200, 120);
		p.line(
			150 * Math.cos(angle),
			150 * Math.sin(angle),
			0,
			150 * Math.sin(angle),
		);
		// Draw point on circle
		p.fill(0);
		p.noStroke();
		p.ellipse(150 * Math.cos(angle), 150 * Math.sin(angle), 10, 10);
		// Draw axes
		p.stroke(180);
		p.line(-160, 0, 160, 0);
		p.line(0, -160, 0, 160);
		// Animate angle
		angle += 0.01;
		if (angle > p.TWO_PI) angle = 0;
	};
}

export function UnitCircle() {
	return (
		<div>
			<h2>Unit Circle</h2>
			<p>Explore the unit circle, angles, and coordinates.</p>
			<ReactP5Wrapper sketch={sketch} />
			<div style={{ marginTop: "1rem" }}>
				<BlockMath
					math={String.raw`\begin{aligned}
					\text{On the unit circle:} \\
					x = \cos(\theta), \quad y = \sin(\theta)
					\end{aligned}`}
				/>
			</div>
		</div>
	);
}
