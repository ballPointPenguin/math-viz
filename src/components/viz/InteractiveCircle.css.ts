import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

// Wrapper for the interactive circle container
export const wrapper = style([
	sprinkles({ borderRadius: "lg" }),
	{
		background: "rgba(0, 0, 0, 0.2)",
		overflow: "hidden",
		boxShadow: "0 4px 30px rgba(135, 94, 255, 0.15)",
		border: "1px solid rgba(255, 255, 255, 0.1)",
		backdropFilter: "blur(10px)",
	},
]);

// Container for the p5 canvas
export const canvasContainer = style({});

// Styles for the controls section
export const controls = style({
	background: "rgba(18, 18, 18, 0.8)",
	borderTop: "1px solid rgba(255, 255, 255, 0.1)",
	overflowX: "auto",
});

// Text and icon color for control labels and buttons
export const controlContent = style({
	color: "rgba(255, 255, 255, 0.8)",
});

// Subtle text color for secondary labels
export const controlSubContent = style({
	color: "rgba(255, 255, 255, 0.6)",
});

// Custom width for the slider
export const slider = style({
	width: "100%",
	minWidth: "120px",
	maxWidth: "400px",
});

// Scrollable points list
export const pointsList = style({
	maxHeight: "100px",
});
