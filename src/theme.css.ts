import {
	blueDark,
	cyanDark,
	indigoDark,
	plumDark,
	purpleDark,
	tealDark,
	violetDark,
	blackA,
	whiteA,
	mauveDark,
	gray,
	grayDark,
} from "@radix-ui/colors";
import { createTheme, globalStyle, style } from "@vanilla-extract/css";

// Add debug styles to make elements more visible
export const debugOutline = style({
	outline: '1px solid rgba(255, 0, 0, 0.5)',
});

// Vaporwave meets Dark Academic theme
export const [theme, vars] = createTheme({
	colors: {
		// Base colors - making background slightly lighter to ensure visibility
		background: grayDark.gray2, // Changed from blackA.blackA2 for better visibility
		backgroundAlt: grayDark.gray3,
		text: whiteA.whiteA12,
		textMuted: whiteA.whiteA10,
		
		// Primary vaporwave colors
		primary: purpleDark.purple9,
		primaryLight: purpleDark.purple8,
		primaryDark: purpleDark.purple10,
		
		// Secondary colors
		secondary: tealDark.teal9,
		secondaryLight: tealDark.teal8,
		secondaryDark: tealDark.teal10,
		
		// Accent colors
		accent1: plumDark.plum9,    // Pink/purple
		accent2: cyanDark.cyan9,    // Cyan
		accent3: violetDark.violet9,  // Violet
		accent4: indigoDark.indigo9,  // Indigo
		
		// UI element colors
		surface: grayDark.gray3,
		surfaceHover: grayDark.gray4,
		surfaceActive: grayDark.gray5,
		border: grayDark.gray6,
		
		// Semantic colors
		success: tealDark.teal10,
		error: plumDark.plum10,
		warning: mauveDark.mauve9,
		info: blueDark.blue9,
		
		// Keep original Radix colors for components that need them
		...grayDark,
		...purpleDark,
		...mauveDark,
		...tealDark,
		...cyanDark,
		...violetDark,
		...indigoDark,
		...blueDark,
		...plumDark,
	},
	fonts: {
		body: "'Space Mono', 'Input Mono', 'IBM Plex Mono', monospace",
		heading: "'Libre Baskerville', 'Garamond', serif",
	},
	space: {
		1: "4px",
		2: "8px",
		3: "16px",
		4: "24px",
		5: "32px",
		6: "48px",
	},
	radii: {
		sm: "2px",
		md: "4px",
		lg: "8px",
		pill: "9999px",
	},
	shadows: {
		sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
		md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
		lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
		glow: "0 0 15px rgba(174, 129, 255, 0.5)",
		neon: "0 0 10px rgba(239, 71, 238, 0.6), 0 0 20px rgba(239, 71, 238, 0.3)",
	},
});

// Global styles
globalStyle("body", {
	margin: 0,
	padding: 0,
	fontFamily: vars.fonts.body,
	backgroundColor: vars.colors.background,
	color: vars.colors.text,
});

globalStyle("#root", {
	backgroundColor: vars.colors.background,
	color: vars.colors.text,
});

globalStyle(".mainBg", {
	backgroundColor: vars.colors.background,
	color: vars.colors.text,
});

globalStyle("h1, h2, h3, h4, h5, h6", {
	fontFamily: vars.fonts.heading,
	color: vars.colors.text,
});

globalStyle("a", {
	color: vars.colors.accent2,
	textDecoration: "none",
	transition: "color 0.2s ease",
});

globalStyle("a:hover", {
	color: vars.colors.accent1,
	textShadow: vars.shadows.glow,
});

globalStyle("::selection", {
	backgroundColor: vars.colors.accent1,
	color: vars.colors.background,
});
