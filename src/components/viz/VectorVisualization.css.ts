import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

// Wrapper for the vector visualization container
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
export const canvasContainer = style([
	sprinkles({ overflow: "hidden" }),
	{
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: "0 auto",
	},
]);

// Container for the controls section
export const controls = style({
	background: "rgba(18, 18, 18, 0.8)",
	borderTop: "1px solid rgba(255, 255, 255, 0.1)",
});

// Text color for control labels
export const controlContent = style({
	color: "rgba(255, 255, 255, 0.8)",
});

// Subtle text color for secondary labels
export const controlSubContent = style({
	color: "rgba(255, 255, 255, 0.6)",
});

// Custom width for sliders
export const slider = style({
	// ensure sliders have consistent width and prevent shrinking
	width: "80px",
	minWidth: "80px",
	flexShrink: 0,
});

// Dynamic color indicator for each vector
export const colorBox = style({
	width: "12px",
	height: "12px",
	borderRadius: vars.radii.pill,
	backgroundColor: "var(--bg)",
});

// Dynamic text color for vector label
export const vectorLabel = style({
	color: "var(--fg)",
});

// Container for the result display, replacing inline borderTop and paddingTop
export const resultContainer = style({
	borderTop: "1px solid rgba(255, 255, 255, 0.1)",
	paddingTop: "10px",
	marginTop: vars.space[3], // equivalent to mt="3"
});

// Prevent specified elements from shrinking in flex layouts
export const noShrink = style({
	flexShrink: 0,
});
