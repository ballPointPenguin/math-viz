import { ReactP5Wrapper } from "@p5-wrapper/react";
import React from "react";

function sketch(p5) {
	p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

	p5.draw = () => {
		p5.background(250);
		p5.normalMaterial();
		p5.push();
		p5.rotateZ(p5.frameCount * 0.01);
		p5.rotateX(p5.frameCount * 0.01);
		p5.rotateY(p5.frameCount * 0.01);
		p5.plane(100);
		p5.pop();
	};
}

export function P5Demo() {
	return (
		<div>
			<h2>P5 Demo</h2>
			<ReactP5Wrapper sketch={sketch} />
		</div>
	);
}
