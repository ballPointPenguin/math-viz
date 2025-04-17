import { ReactP5Wrapper } from "@p5-wrapper/react";
import React from "react";
import { BlockMath } from "./KaTeX.jsx";

// Optionally import mathjs for future extensions
// import { sin, cos, pi } from "mathjs";

function sketch(p) {
  let angle = 0;
  let points = [];
  let graphLength = 300;

  p.setup = () => {
    p.createCanvas(700, 400);
  };

  p.draw = () => {
    p.background(255);
    p.translate(150, 200);

    // Draw unit circle
    p.stroke(0);
    p.noFill();
    p.ellipse(0, 0, 200, 200);

    // Draw axes
    p.stroke(180);
    p.line(-110, 0, 110, 0);
    p.line(0, -110, 0, 110);

    // Moving point on circle
    let x = 100 * Math.cos(angle);
    let y = 100 * Math.sin(angle);
    p.fill(0);
    p.noStroke();
    p.ellipse(x, y, 10, 10);

    // Projection lines
    p.stroke(0, 0, 255, 120);
    p.line(x, y, x, 0); // cosine
    p.stroke(255, 0, 0, 120);
    p.line(x, y, 0, y); // sine

    // Draw angle arc
    p.stroke(100, 100, 255);
    p.noFill();
    p.arc(0, 0, 40, 40, 0, angle, p.OPEN);

    // Draw labels
    p.noStroke();
    p.fill(0, 0, 255);
    p.text("cos(θ)", x / 2, 15);
    p.fill(255, 0, 0);
    p.text("sin(θ)", -35, y / 2);
    p.fill(0);
    p.text("θ", 25 * Math.cos(angle / 2), 25 * Math.sin(angle / 2));

    // Store points for graph
    if (points.length > graphLength) points.shift();
    points.push({
      sin: y,
      cos: x,
    });

    // Draw sine graph
    p.push();
    p.translate(200, -100);
    p.stroke(255, 0, 0);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < points.length; i++) {
      p.vertex(i, points[i].sin);
    }
    p.endShape();
    p.fill(255, 0, 0);
    p.text("sin(θ)", graphLength + 10, 0);
    p.pop();

    // Draw cosine graph
    p.push();
    p.translate(200, 100);
    p.stroke(0, 0, 255);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < points.length; i++) {
      p.vertex(i, points[i].cos);
    }
    p.endShape();
    p.fill(0, 0, 255);
    p.text("cos(θ)", graphLength + 10, 0);
    p.pop();

    // Animate angle
    angle += 0.02;
    if (angle > 2 * Math.PI) angle = 0;
  };
}

export function SineCosine() {
  return (
    <div>
      <h2>Sine & Cosine Visualization</h2>
      <p>
        Explore how the sine and cosine functions relate to the unit circle. The red and blue lines show the projections of the moving point onto the axes, and the graphs to the right show how these values change as the angle increases.
      </p>
      <ReactP5Wrapper sketch={sketch} />
      <div style={{ marginTop: "1rem" }}>
        <BlockMath
          math={String.raw`\begin{aligned}
            x = \cos(\theta) \\
            y = \sin(\theta)
          \end{aligned}`}
        />
      </div>
    </div>
  );
} 