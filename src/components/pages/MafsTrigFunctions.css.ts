import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

// Container for the entire page
export const container = style([
	sprinkles({ paddingY: "4", paddingX: "4" }),
	{ maxWidth: "1000px", margin: "0 auto" },
]);

// Margin for headings
export const headingMargin = style([sprinkles({ marginBottom: "4" })]);

// Controls (buttons and slider)
export const controls = style([
	sprinkles({
		display: "flex",
		gap: "4",
		alignItems: "center",
		marginBottom: "4",
	}),
]);

// Row for mafs canvases
export const canvasRow = style([
	sprinkles({ display: "flex", gap: "4" }),
	{ flexWrap: "wrap" },
]);

// Values display section
export const valuesSection = style([
	sprinkles({ marginTop: "4", padding: "4" }),
	{ backgroundColor: vars.colors.surface, borderRadius: vars.radii.md },
]);

// Formulas section
export const formulasSection = style([sprinkles({ marginTop: "4" })]);
