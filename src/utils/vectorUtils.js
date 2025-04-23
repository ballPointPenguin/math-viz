export function addVectors([x1, y1], [x2, y2]) {
	return [x1 + x2, y1 + y2];
}

export function magnitude([x, y]) {
	return Math.hypot(x, y);
}

export function dotProduct([x1, y1], [x2, y2]) {
	return x1 * x2 + y1 * y2;
}

export function angleBetween([x1, y1], [x2, y2]) {
	const dot = dotProduct([x1, y1], [x2, y2]);
	const mag1 = magnitude([x1, y1]);
	const mag2 = magnitude([x2, y2]);
	const cos = dot / (mag1 * mag2);
	const clampedCos = Math.max(-1, Math.min(1, cos));
	return (Math.acos(clampedCos) * 180) / Math.PI;
}

export function directionDegrees([x, y]) {
	return (Math.atan2(y, x) * 180) / Math.PI;
}

export function getQuadrant([x, y]) {
	if (x > 0 && y > 0) return "I (top-right)";
	if (x < 0 && y > 0) return "II (top-left)";
	if (x < 0 && y < 0) return "III (bottom-left)";
	if (x > 0 && y < 0) return "IV (bottom-right)";
	if (x === 0 && y > 0) return "Positive y-axis";
	if (x === 0 && y < 0) return "Negative y-axis";
	if (y === 0 && x > 0) return "Positive x-axis";
	if (y === 0 && x < 0) return "Negative x-axis";
	return "Origin";
}

export function crossProduct([x1, y1], [x2, y2]) {
	// In 2D, cross product returns scalar magnitude of the z-component
	return x1 * y2 - y1 * x2;
}

export function scalarProjection([x1, y1], [x2, y2]) {
	// Scalar projection of vector A onto vector B: (A · B) / |B|
	const dot = dotProduct([x1, y1], [x2, y2]);
	const magB = magnitude([x2, y2]);
	return dot / magB;
}

export function vectorProjection([x1, y1], [x2, y2]) {
	// Vector projection of A onto B: (A · B / (B · B)) * B
	const dot = dotProduct([x1, y1], [x2, y2]);
	const magBSq = x2 * x2 + y2 * y2;
	return [(x2 * dot) / magBSq, (y2 * dot) / magBSq];
}
