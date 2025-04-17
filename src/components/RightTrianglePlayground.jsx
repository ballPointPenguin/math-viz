import React, { useRef, useState } from "react";
import { BlockMath } from "./KaTeX.jsx";
import { round, sqrt, pi } from "mathjs";

function toDeg(rad) {
  return (rad * 180) / pi;
}

const WIDTH = 400;
const HEIGHT = 350;
const ORIGIN = { x: 80, y: 270 };
const MAX_X = 320;
const MAX_Y = 80;

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function RightTrianglePlayground() {
  // The draggable point (B) is the top-right vertex
  const [B, setB] = useState({ x: 300, y: 120 });
  const svgRef = useRef(null);
  const dragging = useRef(false);

  // Calculate side lengths
  const a = sqrt((B.x - ORIGIN.x) ** 2 + (ORIGIN.y - ORIGIN.y) ** 2); // base
  const b = sqrt((B.x - B.x) ** 2 + (B.y - ORIGIN.y) ** 2); // height
  const c = sqrt((B.x - ORIGIN.x) ** 2 + (B.y - ORIGIN.y) ** 2); // hypotenuse

  // Calculate angle at origin (A)
  const theta = Math.atan2(ORIGIN.y - B.y, B.x - ORIGIN.x); // in radians

  // Trig values
  const sinVal = (c === 0) ? 0 : (b / c);
  const cosVal = (c === 0) ? 1 : (a / c);
  const tanVal = (a === 0) ? 0 : (b / a);

  // Drag logic
  function onMouseDown() {
    dragging.current = true;
  }
  function onMouseUp() {
    dragging.current = false;
  }
  function onMouseMove(e) {
    if (!dragging.current) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
    // Clamp to bounds
    const x = clamp(cursorpt.x, ORIGIN.x + 40, MAX_X);
    const y = clamp(cursorpt.y, MAX_Y, ORIGIN.y - 40);
    setB({ x, y });
  }

  return (
    <div style={{ maxWidth: WIDTH, margin: "0 auto" }}>
      <h2>Right Triangle Playground</h2>
      <p>
        Drag the top-right point to change the triangle. See how the side lengths and trigonometric ratios update in real time!
      </p>
      <svg
        ref={svgRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ border: "1px solid #eee", background: "#fcfcfc" }}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Triangle */}
        <polygon
          points={`${ORIGIN.x},${ORIGIN.y} ${B.x},${B.y} ${B.x},${ORIGIN.y}`}
          fill="#e0f7fa"
          stroke="#0097a7"
          strokeWidth={3}
        />
        {/* Sides */}
        <line x1={ORIGIN.x} y1={ORIGIN.y} x2={B.x} y2={ORIGIN.y} stroke="#1976d2" strokeWidth={2} />
        <line x1={B.x} y1={ORIGIN.y} x2={B.x} y2={B.y} stroke="#d32f2f" strokeWidth={2} />
        <line x1={ORIGIN.x} y1={ORIGIN.y} x2={B.x} y2={B.y} stroke="#388e3c" strokeWidth={2} />
        {/* Right angle marker */}
        <rect x={B.x - 18} y={ORIGIN.y - 18} width={16} height={16} fill="#fff" stroke="#bbb" strokeWidth={1} />
        {/* Draggable point */}
        <circle
          cx={B.x}
          cy={B.y}
          r={10}
          fill="#ffb300"
          stroke="#f57c00"
          strokeWidth={2}
          style={{ cursor: "pointer" }}
          onMouseDown={onMouseDown}
        />
        {/* Labels */}
        <text x={(ORIGIN.x + B.x) / 2} y={ORIGIN.y + 18} fontSize={16} fill="#1976d2">a</text>
        <text x={B.x + 10} y={(ORIGIN.y + B.y) / 2} fontSize={16} fill="#d32f2f">b</text>
        <text x={(ORIGIN.x + B.x) / 2 - 10} y={(ORIGIN.y + B.y) / 2 - 10} fontSize={16} fill="#388e3c">c</text>
        {/* Angle arc at origin */}
        <path
          d={`M${ORIGIN.x},${ORIGIN.y} L${ORIGIN.x + 40},${ORIGIN.y} A40,40 0 0,1 ${ORIGIN.x + 40 * Math.cos(theta)},${ORIGIN.y - 40 * Math.sin(theta)}`}
          fill="none"
          stroke="#8888ff"
          strokeWidth={2}
        />
        <text x={ORIGIN.x + 30} y={ORIGIN.y - 10} fontSize={15} fill="#333">θ</text>
      </svg>
      <div style={{ marginTop: 16 }}>
        <BlockMath math={`a = ${round(a, 2)}`} />
        <BlockMath math={`b = ${round(b, 2)}`} />
        <BlockMath math={`c = ${round(c, 2)}`} />
        <BlockMath math={`\\theta = ${round(toDeg(theta), 2)}^\\circ = ${round(theta, 3)}\\text{ rad}`}/>
        <BlockMath math={`\\sin(\\theta) = ${round(sinVal, 4)}`} />
        <BlockMath math={`\\cos(\\theta) = ${round(cosVal, 4)}`} />
        <BlockMath math={`\\tan(\\theta) = ${round(tanVal, 4)}`} />
      </div>
      <div style={{ marginTop: 8, color: "#888", fontSize: 13 }}>
        <span>Tip: Drag the yellow point. The right angle is always at the bottom right.</span>
      </div>
    </div>
  );
} 