import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

export const container = style([
	sprinkles({ paddingY: "4", paddingX: "4" }),
	{ maxWidth: "800px", margin: "0 auto" },
]);

export const controls = style([sprinkles({ display: "flex", gap: "4" })]);

export const canvasContainer = style([
	sprinkles({ marginY: "4", display: "flex", justifyContent: "center" }),
]);

export const calculations = style([sprinkles({ marginTop: "4" })]);

export const resultProperties = style([
	sprinkles({
		marginTop: "4",
		padding: "3",
		border: "1px solid",
		borderColor: "border",
		borderRadius: "md",
	}),
]);

export const explanation = style([sprinkles({ marginTop: "4" })]);
