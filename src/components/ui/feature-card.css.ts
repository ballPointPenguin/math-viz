import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

export const cardLink = style({
	textDecoration: "none",
	color: "inherit",
	display: "block",
	height: "100%",
	selectors: {
		"&:hover": {
			/* Target for hover effects */
		},
	},
});

// Use sprinkles for properties NOT easily set by Radix Box props
// Or for properties where VE theme values are preferred over Radix defaults
export const cardBox = style([
	sprinkles({
		// padding: '4',        // Handled by Box p prop
		// position: 'relative', // Handled by Box position prop
		// overflow: 'hidden',   // Handled by Box overflow prop
		// borderRadius: 'lg', // Handled by Box radius prop
		backgroundColor: "surface", // Keep if VE theme value needed, or remove if Radix default is ok
		border: "1px solid",
		borderColor: "border",
		transition: "all 0.3s ease", // Keep transition
	}),
	{
		// height: '100%', // Handled by Box height prop
		selectors: {
			[`${cardLink}:hover &`]: {
				transform: "translateY(-5px)",
				boxShadow: vars.shadows.lg, // Use theme shadow
				borderColor: vars.colors.gray6, // Use VE vars
				backgroundColor: vars.colors.gray3, // Use VE vars
			},
		},
	},
]);

// iconBox, heading, description, hoverEffectGradient styles remain largely unchanged
// as they handle specific element styling, hover effects, or properties not directly mapped by Box props.

export const iconBox = style([
	sprinkles({
		marginBottom: "3",
		fontSize: "1.5rem",
		color: "accent2", // Keep using VE theme semantic color
		transition: "all 0.3s ease",
	}),
	{
		selectors: {
			[`${cardLink}:hover &`]: {
				transform: "scale(1.1)",
				color: vars.colors.plum9, // Use VE vars
				// Use a theme shadow instead of drop-shadow filter
				// filter: `drop-shadow(0 0 8px ${vars.colors.purpleA6})`, // Incorrect alpha scale reference
				boxShadow: vars.shadows.glow, // Apply glow shadow on icon hover
			},
		},
	},
]);

export const heading = style([
	sprinkles({
		marginBottom: "2",
		color: "text", // Keep using VE theme semantic color
	}),
]);

export const description = style([
	sprinkles({
		color: "textMuted", // Keep using VE theme semantic color
		fontSize: "2",
		lineHeight: 1.5,
	}),
]);

export const hoverEffectGradient = style([
	sprinkles({
		position: "absolute",
		bottom: "0",
		left: "0",
		right: "0",
		height: "2px",
		opacity: 0,
		transition: "opacity 0.3s ease",
	}),
	{
		background: `linear-gradient(90deg, ${vars.colors.accent1}, ${vars.colors.accent2})`, // Keep using VE theme vars
		selectors: {
			[`${cardLink}:hover &`]: {
				opacity: 1,
			},
		},
	},
]);
