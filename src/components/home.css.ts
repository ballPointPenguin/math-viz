import { style } from "@vanilla-extract/css";
import { sprinkles } from "../sprinkles.css";

export const homeContainer = style({
	// Base container styles if needed, otherwise Box handles it
});

export const gradientHeading = style({
	background: "linear-gradient(90deg, var(--accent-9), var(--cyan-9))",
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
});

export const introText = style([
	sprinkles({
		color: "textMuted",
		marginBottom: "5",
	}),
	{
		maxWidth: "800px",
	},
]);

export const sectionHeading = style({
	borderBottom: "1px solid var(--accent-5)",
	paddingBottom: "8px",
	color: "var(--violet-11)",
});
