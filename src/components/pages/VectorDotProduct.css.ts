import { keyframes, style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

// Define the pulse animation using keyframes
const pulseAnimation = keyframes({
	"0%": { opacity: 0.2 },
	"100%": { opacity: 0.4 },
});

export const container = style({
	maxWidth: "1200px",
	margin: "0 auto",
});

export const tabContent = style([
	sprinkles({
		paddingY: "4",
	}),
	{
		minHeight: "400px",
	},
]);

export const visualizationCard = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	position: "relative",

	"::before": {
		content: "",
		position: "absolute",
		top: "-5px",
		left: "-5px",
		right: "-5px",
		bottom: "-5px",
		background: `linear-gradient(120deg, ${vars.colors.accent1}, ${vars.colors.accent2})`,
		borderRadius: `calc(${vars.radii.lg} + 5px)`,
		zIndex: -1,
		opacity: 0.3,
		animation: `${pulseAnimation} 5s infinite alternate ease-in-out`,
	},
});
