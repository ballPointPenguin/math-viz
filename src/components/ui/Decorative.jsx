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
				zIndex: 0,
			}}
		/>
	);
}
