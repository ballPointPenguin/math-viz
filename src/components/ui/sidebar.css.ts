import { keyframes, style } from "@vanilla-extract/css";
import { sprinkles } from "../../sprinkles.css";
import { vars } from "../../theme.css";

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
			backgroundColor: vars.colors.gray4,
		},
		'&[data-state="open"]': {
			backgroundColor: vars.colors.gray5,
		},
	},
});

export const caretDown = style({
	color: vars.colors.gray11,
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
	gap: vars.space[2],
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
			backgroundColor: vars.colors.gray4,
			color: vars.colors.cyan9,
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
	backgroundColor: `${vars.colors.gray5} !important`,
	color: `${vars.colors.plum9} !important`,
	fontWeight: "500",
	selectors: {
		[`&.${link}`]: {},
	},
});

// Container for the main sidebar element
export const sidebarContainer = style({
	background: vars.colors.backgroundAlt,
	borderRight: `1px solid ${vars.colors.border}`,
	color: vars.colors.text,
	width: "280px",
	minWidth: "280px",
	display: "flex",
	flexDirection: "column",
	position: "fixed",
	top: 0,
	left: 0,
	bottom: 0,
	height: "100vh",
	boxShadow: "2px 0 15px rgba(0, 0, 0, 0.3)",
	zIndex: 100,
	transform: "translateX(-100%)",
	transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",

	// Grid pattern from App.css
	"::before": {
		content: "",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundImage:
			"linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
		backgroundSize: "20px 20px",
		pointerEvents: "none",
		zIndex: -1, // Behind content
	},
});

// Style to apply when sidebar should be visible
export const sidebarVisible = style({
	transform: "translateX(0)",
});
