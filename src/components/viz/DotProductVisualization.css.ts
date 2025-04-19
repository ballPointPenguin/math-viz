import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

export const canvasContainer = style([
	sprinkles({
		borderRadius: "md",
		overflow: "hidden",
		border: "1px solid",
		borderColor: "gray6",
	}),
	{
		boxShadow: vars.shadows.md,
		transition: "box-shadow 0.3s ease",
		":hover": {
			boxShadow: vars.shadows.glow,
		},
	},
]);

export const controls = style([
	sprinkles({
		padding: "3",
		borderRadius: "md",
		backgroundColor: "gray3",
	}),
	{
		boxShadow: vars.shadows.sm,
	},
]);

// Style for the vector sliders
export const vectorSlider = style({
	width: "100%",
});

// Animated controls section
export const animatedControls = style({
	position: "relative",
	":before": {
		content: "",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: vars.radii.md,
		borderLeft: `2px solid ${vars.colors.accent1}`,
		borderRight: `2px solid ${vars.colors.accent2}`,
		opacity: 0.4,
		pointerEvents: "none",
	},
});
