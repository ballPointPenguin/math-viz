import { Coordinates, Line, Mafs, Plot, Point, Theme } from "mafs";
import * as React from "react";
import "mafs/core.css";

const RADIUS = 1;
const WAVE_X_START = 2.5;
const WAVE_X_END = 8.5;

export function MafsUnitCircleSine() {
	const [theta, setTheta] = React.useState(Math.PI / 4);
	const [isDragging, setIsDragging] = React.useState(false);

	// Animation
	React.useEffect(() => {
		if (!isDragging) {
			const id = setInterval(() => {
				setTheta((t) => (t + 0.01) % (2 * Math.PI));
			}, 16);
			return () => clearInterval(id);
		}
	}, [isDragging]);

	// Unit circle point
	const x = Math.cos(theta);
	const y = Math.sin(theta);
	// Sine wave point
	const waveX = WAVE_X_START + theta;
	const waveY = Math.sin(theta);

	// Drag handler for the circle point
	function handleDrag([px, py]) {
		setIsDragging(true);
		const angle = Math.atan2(py, px);
		setTheta((angle + 2 * Math.PI) % (2 * Math.PI));
	}
	function handleDragEnd() {
		setIsDragging(false);
	}

	return (
		<div style={{ maxWidth: 800, margin: "0 auto" }}>
			<h2>Unit Circle to Sine Wave Mapping</h2>
			<p>
				Drag the point on the unit circle or let it animate. The vertical
				position of the point is mapped to the sine wave on the right. This
				shows how the unit circle generates the sine function.
			</p>
			<div style={{ display: "flex", gap: 32 }}>
				{/* Unit Circle SVG */}
				<svg
					width={220}
					height={220}
					viewBox="-1.2 -1.2 2.4 2.4"
					style={{ background: "#f9f9f9", border: "1px solid #eee" }}
				>
					<title>Unit Circle</title>
					{/* Axes */}
					<line
						x1={-1.1}
						y1={0}
						x2={1.1}
						y2={0}
						stroke="#bbb"
						strokeWidth={0.01}
					/>
					<line
						x1={0}
						y1={-1.1}
						x2={0}
						y2={1.1}
						stroke="#bbb"
						strokeWidth={0.01}
					/>
					{/* Circle */}
					<circle
						cx={0}
						cy={0}
						r={RADIUS}
						fill="#e3f2fd"
						stroke="#1976d2"
						strokeWidth={0.03}
					/>
					{/* Radius */}
					<line
						x1={0}
						y1={0}
						x2={x}
						y2={y}
						stroke="#1976d2"
						strokeWidth={0.03}
					/>
					{/* Point */}
					<circle
						cx={x}
						cy={y}
						r={0.06}
						fill="#1976d2"
						stroke="#0d47a1"
						strokeWidth={0.02}
						style={{ cursor: "pointer" }}
						onPointerDown={(e) => {
							setIsDragging(true);
							e.target.setPointerCapture(e.pointerId);
						}}
						onPointerMove={(e) => {
							if (isDragging && e.buttons) {
								// Convert SVG coords
								const rect = e.target.ownerSVGElement.getBoundingClientRect();
								const px = ((e.clientX - rect.left) / rect.width) * 2.4 - 1.2;
								const py = ((e.clientY - rect.top) / rect.height) * 2.4 - 1.2;
								const r = Math.sqrt(px * px + py * py);
								if (r > 0.5) handleDrag([px / r, py / r]);
							}
						}}
						onPointerUp={handleDragEnd}
						onPointerLeave={handleDragEnd}
					/>
					{/* Projection line to sine wave */}
					<line
						x1={x}
						y1={y}
						x2={1.15}
						y2={y}
						stroke="#ff7043"
						strokeDasharray="0.03 0.03"
						strokeWidth={0.02}
					/>
					{/* Label theta */}
					<text
						x={0.15 * Math.cos(theta / 2)}
						y={0.15 * Math.sin(theta / 2)}
						fontSize={0.09}
						fill="#333"
					>
						θ
					</text>
				</svg>
				{/* Mafs Sine Wave */}
				<div style={{ flex: 1 }}>
					<Mafs
						height={220}
						viewBox={{
							x: [WAVE_X_START - 0.5, WAVE_X_END + 0.5],
							y: [-1.2, 1.2],
						}}
					>
						<Coordinates.Cartesian
							xAxis={{ label: "θ" }}
							yAxis={{ label: "sin(θ)" }}
						/>
						<Plot.OfX y={Math.sin} color={Theme.blue} />
						{/* Moving point on the wave */}
						<Point x={waveX} y={waveY} color={Theme.red} />
						{/* Vertical line from circle to wave */}
						<Line.Segment
							point1={[1.15, y]}
							point2={[waveX, waveY]}
							color={Theme.red}
						/>
					</Mafs>
				</div>
			</div>
		</div>
	);
}
