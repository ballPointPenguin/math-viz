import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";

// Styles for the numeric input fields in VectorInput
export const input = style([
	sprinkles({
		width: "80px",
		paddingY: "2",
		paddingX: "3",
		border: "1px solid",
		borderColor: "border",
		borderRadius: "md",
	}),
]);
