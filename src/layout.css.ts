import { style } from "@vanilla-extract/css";

export const layoutContainer = style({
	zIndex: "2",
	backgroundImage: [
		"linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.05))",
		'url("../assets/orbs.svg")',
	].join(","),
});

// Overlay styles (kept separate as it's conditionally rendered in Layout)
export const sidebarOverlay = style({
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.7)",
	zIndex: 90,
	opacity: 0,
	transition: "opacity 0.3s ease",
	backdropFilter: "blur(3px)",
	pointerEvents: "none",
	display: "none",

	"@media": {
		"screen and (max-width: 767px)": {
			selectors: {
				"&.visible": {
					opacity: 1,
					pointerEvents: "auto",
					display: "block",
				},
			},
		},
	},
});
