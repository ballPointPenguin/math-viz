import { style } from "@vanilla-extract/css";

export const layoutContainer = style({
	zIndex: "2",
	backgroundImage: [
		"linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.01))",
		'url("./assets/orbs.svg")',
	].join(","),
});
