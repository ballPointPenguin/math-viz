import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

// Page container
export const container = style([
	sprinkles({ paddingY: "4", paddingX: "4" }),
	{ maxWidth: "800px", margin: "0 auto" },
]);

// Canvas wrapper for P5
export const canvasContainer = style([
	sprinkles({ display: "flex", justifyContent: "center", marginY: "4" }),
]);

// Controls section
export const controls = style([
	sprinkles({ display: "flex", flexDirection: "column", gap: "4" }),
]);

// Grouping for each vector control
export const controlGroup = style([
	sprinkles({ display: "flex", flexDirection: "column", gap: "2" }),
]);

// Container for range and number inputs
export const sliderContainer = style([
	sprinkles({ display: "flex", alignItems: "center", gap: "2" }),
]);

// Output box for results
export const output = style([
	sprinkles({ marginTop: "4", padding: "3" }),
	{
		backgroundColor: vars.colors.surface,
		border: `1px solid ${vars.colors.border}`,
		borderRadius: vars.radii.md,
	},
]);

// Style for formula blocks
export const formula = style([
	sprinkles({ marginY: "2", padding: "3" }),
	{
		backgroundColor: vars.colors.backgroundAlt,
		borderRadius: vars.radii.sm,
		fontFamily: "monospace",
	},
]);

// Miscellaneous text spacing
export const headingMargin = style([sprinkles({ marginBottom: "4" })]);
