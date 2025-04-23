import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";

export const container = style([
	sprinkles({ padding: "4", display: "flex", justifyContent: "center" }),
]);

export const card = style([
	sprinkles({ padding: "4", borderRadius: "md" }),
	{ background: "rgba(255, 255, 255, 0.1)", maxWidth: "900px", width: "100%" },
]);

export const controls = style([
	sprinkles({ display: "flex", gap: "4", justifyContent: "center" }),
	{ flexWrap: "wrap" },
]);

export const matrix = style([sprinkles({ marginTop: "4", marginBottom: "4" })]);
