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

export const resetButton = style([
	sprinkles({
		padding: "2",
		borderRadius: "md",
		backgroundColor: "gray6",
	}),
	{
		cursor: "pointer",
		transition: "all 0.2s ease",
		boxShadow: vars.shadows.sm,
		userSelect: "none",

		":hover": {
			backgroundColor: vars.colors.accent2,
			boxShadow: vars.shadows.glow,
		},

		":active": {
			transform: "translateY(1px)",
		},
	},
]);
