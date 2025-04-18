import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";

const decorativeElementBase = style([
	sprinkles({
		position: "absolute",
		borderRadius: "pill",
		zIndex: "0",
		border: "1px solid",
	}),
	{
		pointerEvents: "none",
		// Apply the animation defined in App.css
		animationName: "float",
		animationDuration: "8s",
		animationTimingFunction: "ease-in-out",
		animationIterationCount: "infinite",
	},
]);

export const decorativeElement = styleVariants({
	element1: [
		decorativeElementBase,
		sprinkles({ borderColor: "accent2" }),
		{
			opacity: 0.2,
			right: "5%",
			bottom: "10%",
			width: "150px",
			height: "150px",
		},
	],
	element2: [
		decorativeElementBase,
		sprinkles({ borderColor: "accent1" }),
		{
			opacity: 0.15,
			right: "10%",
			bottom: "15%",
			width: "100px",
			height: "100px",
			animationDelay: "2s",
		},
	],
});
