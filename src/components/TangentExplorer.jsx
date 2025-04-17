import { ReactP5Wrapper } from "@p5-wrapper/react";
import React from "react";
import { BlockMath } from "./KaTeX.jsx";

function sketch(p) {
  let angle = 0;
  let points = [];
  let graphLength = 300;

  p.setup = () => {
    p.createCanvas(750, 400);
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

    // Draw radius
    p.stroke(0, 120);
    p.line(0, 0, x, y);

    // Draw tangent line at point
    let tanVal = Math.tan(angle);
    let tangentLength = 120;
    // The tangent line is perpendicular to the radius at (x, y)
    let dx = -Math.sin(angle);
    let dy = Math.cos(angle);
    p.stroke(255, 140, 0);
    p.line(
      x - dx * tangentLength,
      y - dy * tangentLength,
      x + dx * tangentLength,
      y + dy * tangentLength
    );

    // Draw tangent value as segment on x=100 (right of circle)
    p.stroke(255, 0, 0);
    p.line(100, 0, 100, tanVal * 100);
    p.fill(255, 0, 0);
    p.ellipse(100, tanVal * 100, 7, 7);
    p.noStroke();
    p.textAlign(p.LEFT, p.CENTER);
    p.text("tan(θ)", 110, tanVal * 100);

    // Draw angle arc
    p.stroke(100, 100, 255);
    p.noFill();
    p.arc(0, 0, 40, 40, 0, angle, p.OPEN);
    p.noStroke();
    p.fill(0);
    p.text("θ", 25 * Math.cos(angle / 2), 25 * Math.sin(angle / 2));

    // Store points for tangent graph
    if (points.length > graphLength) points.shift();
    points.push({ tan: tanVal });

    // Draw tangent graph
    p.push();
    p.translate(250, 0);
    p.stroke(255, 140, 0);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < points.length; i++) {
      let v = points[i].tan;
      // Clamp for display
      if (Math.abs(v) > 3) v = NaN;
      p.vertex(i, v * 60);
    }
    p.endShape();
    p.fill(255, 140, 0);
    p.text("tan(θ)", graphLength + 10, 0);
    p.pop();

    // Animate angle
    angle += 0.018;
    if (angle > 2 * Math.PI) angle = 0;
  };
}

export function TangentExplorer() {
  return (
    <div>
      <h2>Tangent Function Explorer</h2>
      <p>
        See how the tangent function relates to the unit circle. The orange line is the tangent at the moving point, and the red segment shows the tangent value as a length outside the circle. The graph on the right shows tan(θ) as θ increases.
      </p>
      <ReactP5Wrapper sketch={sketch} />
      <div style={{ marginTop: "1rem" }}>
        <BlockMath
          math={String.raw`\begin{aligned}
            \tan(\theta) = \frac{\sin(\theta)}{\cos(\theta)}
          \end{aligned}`}
        />
      </div>
    </div>
  );
} 