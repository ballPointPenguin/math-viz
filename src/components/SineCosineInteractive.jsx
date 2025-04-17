import React, { useState } from "react";
import { BlockMath } from "./KaTeX.jsx";
import { pi, round } from "mathjs";

function toPiString(rad) {
  // Express the angle as a multiple of pi if possible
  const frac = rad / pi;
  if (Math.abs(frac - Math.round(frac)) < 1e-6) {
    if (Math.round(frac) === 0) return "0";
    if (Math.round(frac) === 1) return "π";
    if (Math.round(frac) === -1) return "-π";
    return `${Math.round(frac)}π`;
  }
  // Try to show as a simple fraction
  const denominators = [2, 3, 4, 6, 8, 12];
  for (let d of denominators) {
    if (Math.abs(frac * d - Math.round(frac * d)) < 1e-6) {
      const n = Math.round(frac * d);
      if (n === 0) return "0";
      if (n === d) return `π`;
      if (n === -d) return `-π`;
      return `\frac{${n}}{${d}}π`;
    }
  }
  return rad.toFixed(3);
}

export function SineCosineInteractive() {
  const [angleDeg, setAngleDeg] = useState(30);
  const angleRad = (angleDeg * pi) / 180;
  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2>Sine & Cosine Interactive</h2>
      <p>
        Adjust the angle using the slider or input fields. See the corresponding values for sine and cosine, and how the angle is represented in degrees, radians, and as a multiple of \(\pi\).
      </p>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label>
            Angle (degrees):
            <input
              type="number"
              min={-360}
              max={360}
              value={angleDeg}
              onChange={e => setAngleDeg(Number(e.target.value))}
              style={{ width: 70, marginLeft: 8 }}
            />
          </label>
          <input
            type="range"
            min={-360}
            max={360}
            value={angleDeg}
            onChange={e => setAngleDeg(Number(e.target.value))}
            style={{ width: 200, marginLeft: 8 }}
          />
          <div style={{ marginTop: 8 }}>
            <label>
              Angle (radians):
              <input
                type="number"
                step={0.01}
                min={(-2 * pi).toFixed(2)}
                max={(2 * pi).toFixed(2)}
                value={round(angleRad, 4)}
                onChange={e => setAngleDeg(Number(e.target.value) * 180 / pi)}
                style={{ width: 90, marginLeft: 8 }}
              />
            </label>
          </div>
        </div>
        <svg width={250} height={250} viewBox="0 0 250 250">
          <circle cx={125} cy={125} r={100} fill="#f9f9f9" stroke="#bbb" strokeWidth={2} />
          {/* Axes */}
          <line x1={25} y1={125} x2={225} y2={125} stroke="#ddd" strokeWidth={1} />
          <line x1={125} y1={25} x2={125} y2={225} stroke="#ddd" strokeWidth={1} />
          {/* Angle arc */}
          <path
            d={`M125,125 L${125 + 60 * Math.cos(0)},${125 + 60 * Math.sin(0)} A60,60 0 ${angleRad > pi ? 1 : 0},${angleRad >= 0 ? 1 : 0} ${125 + 60 * Math.cos(angleRad)},${125 + 60 * Math.sin(angleRad)}`}
            fill="none"
            stroke="#8888ff"
            strokeWidth={2}
          />
          {/* Point on circle */}
          <circle cx={125 + 100 * cosVal} cy={125 + 100 * sinVal} r={7} fill="#222" />
          {/* Cosine projection (x) */}
          <line x1={125} y1={125} x2={125 + 100 * cosVal} y2={125} stroke="#3366ff" strokeWidth={2} />
          {/* Sine projection (y) */}
          <line x1={125 + 100 * cosVal} y1={125} x2={125 + 100 * cosVal} y2={125 + 100 * sinVal} stroke="#ff3333" strokeWidth={2} />
          {/* Dots for projections */}
          <circle cx={125 + 100 * cosVal} cy={125} r={4} fill="#3366ff" />
          <circle cx={125 + 100 * cosVal} cy={125 + 100 * sinVal} r={4} fill="#ff3333" />
        </svg>
        <div>
          <div style={{ marginBottom: 8 }}>
            <BlockMath math={`\\theta = ${angleDeg}^\\circ = ${round(angleRad, 3)}\\text{ rad} = ${toPiString(angleRad)}`} />
          </div>
          <BlockMath math={`\\sin(\\theta) = ${round(sinVal, 4)}`} />
          <BlockMath math={`\\cos(\\theta) = ${round(cosVal, 4)}`} />
        </div>
      </div>
    </div>
  );
} 