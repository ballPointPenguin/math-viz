import { style } from "@vanilla-extract/css";

export const layoutContainer = style({
	zIndex: "0",
	backgroundImage: ['url("./assets/orbs.svg")'].join(","),
});

export const mainContent = style({});

// Overlay styles (kept separate as it's conditionally rendered in Layout)
export const sidebarOverlay = style({
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.7)",
	zIndex: 1,
	opacity: 0,
	transition: "opacity 0.3s ease",
	backdropFilter: "blur(3px)",
	pointerEvents: "none",
	display: "none",

	selectors: {
		"&.visible": {
			opacity: 0,
			pointerEvents: "auto",
			display: "block",
		},
	},

	"@media": {
		"screen and (max-width: 767px)": {
			// No need for extra selectors, handled above
		},
	},
});
