import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

// Wrapper for the entire coordinate grid container
export const wrapper = style([
	sprinkles({
		borderRadius: "lg",
	}),
	{
		background: "rgba(0, 0, 0, 0.2)",
		backdropFilter: "blur(10px)",
		boxShadow: "0 4px 30px rgba(135, 94, 255, 0.15)",
		border: "1px solid rgba(255, 255, 255, 0.1)",
	},
]);

// Container for the canvas with hidden overflow
export const canvasContainer = style([
	sprinkles({
		overflow: "hidden",
	}),
]);

// Styles for the zoom controls container
export const controls = style([
	{
		background: "rgba(18, 18, 18, 0.8)",
		borderTop: "1px solid rgba(255, 255, 255, 0.1)",
	},
]);

export const controlContent = style({
	color: "rgba(255, 255, 255, 0.7)",
});
