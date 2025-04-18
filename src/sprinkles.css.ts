import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css"; // Assuming theme variables are exported from theme.css.ts

// Define breakpoints based on Radix Themes
// https://www.radix-ui.com/themes/docs/theme/breakpoints
const breakpoints = {
	xs: "520px",
	sm: "768px",
	md: "1024px",
	lg: "1280px",
	xl: "1640px",
};

const responsiveProperties = defineProperties({
	conditions: {
		initial: {},
		xs: { "@media": `screen and (min-width: ${breakpoints.xs})` },
		sm: { "@media": `screen and (min-width: ${breakpoints.sm})` },
		md: { "@media": `screen and (min-width: ${breakpoints.md})` },
		lg: { "@media": `screen and (min-width: ${breakpoints.lg})` },
		xl: { "@media": `screen and (min-width: ${breakpoints.xl})` },
	},
	defaultCondition: "initial",
	properties: {
		// Layout properties
		display: ["none", "block", "flex", "grid", "inline-block"],
		flexDirection: ["row", "column"],
		alignItems: ["stretch", "flex-start", "center", "flex-end"],
		justifyContent: [
			"stretch",
			"flex-start",
			"center",
			"flex-end",
			"space-between",
		],
		gap: vars.space,
		paddingTop: vars.space,
		paddingBottom: vars.space,
		paddingLeft: vars.space,
		paddingRight: vars.space,
		marginTop: vars.space,
		marginBottom: vars.space,
		marginLeft: vars.space,
		marginRight: vars.space,
		width: ["100%", "auto", "0", "280px", "80px", "120px", "40px"], // Add specific widths used
		height: ["100%", "auto", "0", "2px", "40px"], // Add specific heights used
		minWidth: ["0", "280px"],
		maxWidth: ["320px", "100%"], // Add specific max-widths used
		position: ["relative", "absolute", "fixed"],
		top: ["0", "20px"],
		left: ["0", "20px", "300px"],
		right: ["0"],
		bottom: ["0"],
		overflow: ["hidden", "auto", "visible"],
		overflowY: ["auto", "hidden", "visible"],
		zIndex: ["-1", "0", "1", "2", "10", "90", "100", "1000"], // Add z-indices used

		// Appearance properties
		backgroundColor: vars.colors,
		color: vars.colors,
		border: ["none", "1px solid"],
		borderColor: vars.colors,
		borderRadius: vars.radii,
		fontSize: {
			...vars.space,
			"15px": "15px",
			"16px": "16px",
			"1.75rem": "1.75rem",
			"1.5rem": "1.5rem",
			"0.8rem": "0.8rem",
		}, // Add specific font sizes used
		lineHeight: [1, 1.5],
		textAlign: ["left", "center", "right"],
		textDecoration: ["none", "underline"],
		opacity: [0, 1],
		boxShadow: vars.shadows,
		transform: [
			"translateX(-100%)",
			"translateX(0)",
			"translateX(3px)",
			"rotate(-180deg)",
		], // Add transforms used
		transition: [
			"all 0.2s ease",
			"all 0.3s ease",
			"opacity 0.3s ease",
			"transform 250ms ease",
			"margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
			"transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
		], // Add transitions used
		cursor: ["pointer", "default"],

		// Add other properties used responsively
	},
	shorthands: {
		padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
		paddingX: ["paddingLeft", "paddingRight"],
		paddingY: ["paddingTop", "paddingBottom"],
		margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
		marginX: ["marginLeft", "marginRight"],
		marginY: ["marginTop", "marginBottom"],
		size: ["width", "height"],
	},
});

export const sprinkles = createSprinkles(responsiveProperties);

// Export the type for use in components
export type Sprinkles = Parameters<typeof sprinkles>[0];
