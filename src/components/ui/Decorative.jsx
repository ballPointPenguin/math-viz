import * as styles from "./decorative.css";

export function DecorativeSphere() {
	return (
		<div
			className="decorative-sphere"
			style={{
				position: "fixed",
				top: "20%",
				right: "10%",
				width: "300px",
				height: "300px",
				borderRadius: "50%",
				background:
					"radial-gradient(circle at 30% 30%, rgba(135, 94, 255, 0.6), rgba(31, 17, 56, 0.1))",
				filter: "blur(40px)",
				zIndex: "-1",
			}}
		/>
	);
}

export function DecorativeSquare() {
	return (
		<div
			className="decorative-square"
			style={{
				position: "fixed",
				bottom: "15%",
				left: "15%",
				width: "200px",
				height: "200px",
				background:
					"linear-gradient(135deg, rgba(100, 43, 115, 0.6), rgba(0, 212, 255, 0.1))",
				transform: "rotate(45deg)",
				filter: "blur(30px)",
				zIndex: "-1",
			}}
		/>
	);
}

export function DecorativeGrid() {
	return (
		// Decorative grid - subtle lines in the background
		<div
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundImage: `
                  linear-gradient(to right, var(--gray-a2) 1px, transparent 1px),
                  linear-gradient(to bottom, var(--gray-a2) 1px, transparent 1px)
                `,
				backgroundSize: "50px 50px",
				pointerEvents: "none",
				zIndex: -1,
			}}
		/>
	);
}

export function DecorativeBoxes() {
	return (
		<>
			{/* Decorative elements - Use VE styles */}
			<div className={styles.decorativeElement.element1} />
			<div className={styles.decorativeElement.element2} />
		</>
	);
}
