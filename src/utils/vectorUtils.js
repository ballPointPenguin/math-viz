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
