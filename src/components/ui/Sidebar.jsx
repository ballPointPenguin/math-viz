import { CaretDownIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Box, Heading, Text } from "@radix-ui/themes";
import { clsx } from "clsx";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as styles from "./sidebar.css";

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
			{ to: "/cosine-dot-product", label: "Cosine & Dot Product" },
		],
	},
	{
		id: "demos",
		label: "Demos & Utilities",
		links: [
			{ to: "/p5-demo", label: "P5 Demo" },
			{ to: "/mafs-hello", label: "Mafs Hello" },
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

export default function Sidebar() {
	// Use Radix Box for the sidebar container
	return (
		<Box
			as="aside"
			className={styles.sidebarContainer} // Use a simple container class if needed for width/base structure
			width="280px" // Set width explicitly
			display="flex"
			flexDirection="column"
			position="fixed" // Assuming fixed sidebar positioning
			top="0"
			left="0"
			bottom="0"
			// Use Radix theme variable for background
			style={{
				background: "var(--gray-2)", // Example: Use a Radix color variable
				borderRight: "1px solid var(--border)", // Use Radix border variable
				boxShadow: "var(--shadow-4)", // Example Radix shadow
				zIndex: 100, // Keep zIndex
			}}
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
				alignItems="center"
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
