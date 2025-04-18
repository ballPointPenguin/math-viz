import { keyframes, style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";

const slideDown = keyframes({
	from: {
		height: 0,
		opacity: 0,
	},
	to: {
		height: "var(--radix-navigation-menu-content-height)",
		opacity: 1,
	},
});

const slideUp = keyframes({
	from: {
		height: "var(--radix-navigation-menu-content-height)",
		opacity: 1,
	},
	to: {
		height: 0,
		opacity: 0,
	},
});

export const root = style({
	width: "100%",
});

const listBase = style({
	margin: 0,
	padding: 0,
	listStyle: "none",
});

export const list = style([
	listBase,
	sprinkles({
		display: "flex",
		flexDirection: "column",
		gap: { initial: "2", sm: "2" },
		paddingTop: { initial: "2" },
		paddingBottom: { initial: "2" },
		paddingLeft: { initial: "2" },
		paddingRight: { initial: "2" },
	}),
]);

const triggerBase = style({
	all: "unset",
	boxSizing: "border-box",
	width: "100%",
});

export const trigger = style([
	triggerBase,
	sprinkles({
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		paddingX: { initial: "3", sm: "3" },
		paddingY: { initial: "2", sm: "2" },
		fontSize: { initial: "16px", sm: "15px" },
		lineHeight: 1,
		color: "text",
		backgroundColor: { initial: "surface", sm: "surface" },
		borderRadius: { initial: "lg", sm: "md" },
		cursor: "pointer",
	}),
]);

export const triggerHoverFocus = style({
	selectors: {
		'&:hover:not([data-state="open"])': {
			backgroundColor: "var(--gray-4)",
		},
		'&[data-state="open"]': {
			backgroundColor: "var(--gray-5)",
		},
	},
});

export const caretDown = style({
	color: "var(--gray-11)",
	transition: "transform 250ms ease",
	selectors: {
		[`${trigger}[data-state="open"] &`]: {
			transform: "rotate(-180deg)",
		},
	},
});

const contentBase = style({
	overflow: "hidden",
	selectors: {
		'&[data-state="open"]': {
			animationName: slideDown,
			animationDuration: "250ms",
			animationTimingFunction: "ease",
		},
		'&[data-state="closed"]': {
			animationName: slideUp,
			animationDuration: "250ms",
			animationTimingFunction: "ease",
		},
	},
});

export const content = style([
	contentBase,
	sprinkles({
		paddingTop: { initial: "2", sm: "2" },
		paddingBottom: { initial: "2", sm: "2" },
		paddingRight: { initial: "3", sm: "3" },
		paddingLeft: { initial: "4", sm: "3" },
		backgroundColor: { initial: "surfaceActive", sm: "background" },
		borderRadius: { initial: "lg" },
		marginTop: { initial: "2" },
	}),
]);

export const linkList = style({
	display: "flex",
	flexDirection: "column",
	gap: "var(--space-2)",
});

const linkBase = style({
	textDecoration: "none",
	boxSizing: "border-box",
});

export const link = style([
	linkBase,
	sprinkles({
		display: "block",
		paddingX: { initial: "3", sm: "3" },
		paddingY: { initial: "2", sm: "2" },
		fontSize: { initial: "16px", sm: "15px" },
		color: "textMuted",
		borderRadius: "md",
		transition: "all 0.2s ease",
	}),
]);

export const linkHover = style({
	selectors: {
		"&:hover": {
			backgroundColor: "var(--gray-4)",
			color: "var(--cyan-9)",
		},
	},
});

export const linkHoverTransformDesktop = style({
	"@media": {
		"screen and (min-width: 768px)": {
			selectors: {
				"&:hover": {
					transform: "translateX(3px)",
				},
			},
		},
	},
});

export const activeLink = style({
	backgroundColor: "var(--gray-5) !important",
	color: "var(--plum-9) !important",
	borderLeft: "2px solid var(--plum-9)",
	boxShadow: "var(--shadow-3)",
	selectors: {
		[`&.${link}`]: {},
	},
});
