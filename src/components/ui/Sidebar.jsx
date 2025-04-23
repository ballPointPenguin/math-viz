import { CaretDownIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Box, Heading, Text } from "@radix-ui/themes";
import { clsx } from "clsx";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as styles from "./Sidebar.css";

// Navigation structure data to make the code more DRY
const navigationData = [
	{
		id: "trigonometry",
		label: "Trigonometry",
		links: [
			{ to: "/unit-circle", label: "Unit Circle" },
			{ to: "/sine-cosine", label: "Sine & Cosine" },
			{ to: "/sine-cosine-interactive", label: "Sine & Cosine Interactive" },
			{ to: "/tangent-explorer", label: "Tangent Explorer" },
			{ to: "/right-triangle-playground", label: "Right Triangle Playground" },
			{ to: "/mafs-unit-circle-sine", label: "Unit Circle → Sine Wave" },
			{ to: "/mafs-trig-functions", label: "Trig Functions Explorer" },
		],
	},
	{
		id: "linearAlgebra",
		label: "Linear Algebra",
		links: [
			{ to: "/vector-addition", label: "Vector Addition" },
			{ to: "/vector-operations", label: "Vector Operations" },
			{ to: "/vector-dot-product", label: "Vector Dot Product" },
			{ to: "/vector-basis", label: "Vector Basis" },
			{ to: "/matrix-transform", label: "Matrix Transform" },
		],
	},
	{
		id: "demos",
		label: "Demos & Utilities",
		links: [
			{ to: "/p5-demo", label: "P5 Demo" },
			{ to: "/mafs-hello", label: "Mafs Hello" },
			{ to: "/math-viz-demo", label: "Component Library" },
		],
	},
];

// Custom Link component to handle both NavLink and NavigationMenu.Link
const CustomLink = ({ to, children }) => {
	const location = useLocation();
	const isActive = location.pathname === to;

	// Combine base link class, hover class, and active class conditionally
	const linkClassName = clsx(
		styles.link,
		styles.linkHover, // Apply hover styles
		styles.linkHoverTransformDesktop, // Apply desktop hover transform
		isActive && styles.activeLink, // Apply active styles conditionally
	);

	return (
		<NavigationMenu.Link asChild active={isActive}>
			<NavLink to={to} className={linkClassName}>
				{children}
			</NavLink>
		</NavigationMenu.Link>
	);
};

export default function Sidebar({ isVisible }) {
	// Use Radix Box for the sidebar container
	return (
		<Box
			as="aside"
			className={clsx(
				styles.sidebarContainer,
				isVisible && styles.sidebarVisible,
			)}
		>
			{/* Sidebar Header */}
			<Box
				className="sidebar-header"
				mb="3"
				px="3"
				pt="3"
				pb="3" // Added bottom padding for symmetry
				// Background is inherited or set on main container
			>
				<Heading
					align="center"
					size="6"
					// Keep gradient text style
					style={{
						background:
							"linear-gradient(90deg, var(--accent-9), var(--cyan-9))", // Use Radix vars
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
				>
					Math Viz
				</Heading>
				{/* Underline */}
				<Box
					height="2px"
					mx="auto"
					mt="2"
					width="80px" // Keep fixed width or use responsive prop
					style={{
						background:
							"linear-gradient(90deg, var(--accent-9), var(--cyan-9))",
					}} // Use Radix vars
				/>
			</Box>

			{/* Scrollable Navigation Area */}
			<Box
				px="3"
				flexGrow="1"
				overflowY="auto"
				// Background inherited
			>
				<NavigationMenu.Root orientation="vertical" className={styles.root}>
					<NavigationMenu.List className={styles.list}>
						{/* Render navigation sections from data */}
						{navigationData.map((section) => (
							<NavigationMenu.Item key={section.id} value={section.id}>
								<NavigationMenu.Trigger
									className={clsx(styles.trigger, styles.triggerHoverFocus)}
								>
									{section.label}
									<CaretDownIcon className={styles.caretDown} aria-hidden />
								</NavigationMenu.Trigger>

								<NavigationMenu.Content className={styles.content}>
									<nav className={styles.linkList}>
										{section.links.map((link) => (
											<CustomLink key={link.to} to={link.to}>
												{link.label}
											</CustomLink>
										))}
									</nav>
								</NavigationMenu.Content>
							</NavigationMenu.Item>
						))}

						{/* Home Link - Special case */}
						<NavigationMenu.Item>
							<CustomLink to="/">Home</CustomLink>
						</NavigationMenu.Item>
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</Box>

			{/* Footer for sidebar */}
			<Box
				mt="auto"
				p="3"
				display="flex"
				alignitems="center"
				gap="2" // Use Radix gap
				style={{
					borderTop: "1px solid var(--border)",
					fontSize: "var(--font-size-1)", // Use Radix font size variable
					color: "var(--gray-11)", // Use Radix color variable
				}}
			>
				<InfoCircledIcon />
				<Text as="span" size="1">
					Math Viz v0.1
				</Text>{" "}
				{/* Use Radix size prop */}
			</Box>
		</Box>
	);
}
