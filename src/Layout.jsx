import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import clsx from "clsx";
import React, { useState } from "react";
import Sidebar from "./components/ui/Sidebar.jsx";
import { layoutContainer } from "./layout.css";
import { theme } from "./theme.css.ts";

export default function Layout({ children }) {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	return (
		<Box
			className={clsx(theme, layoutContainer)}
			height="100vh"
			overflow="hidden"
			position="relative"
			p="4"
		>
			{/* Decorative elements */}
			<div
				className="decorative-sphere"
				style={{
					position: "fixed",
					top: "20%",
					right: "10%",
					width: "300px",
					height: "300px",
					borderRadius: "50%",
					background:
						"radial-gradient(circle at 30% 30%, rgba(135, 94, 255, 0.6), rgba(31, 17, 56, 0.1))",
					filter: "blur(40px)",
					zIndex: "-1",
				}}
			/>

			<div
				className="decorative-square"
				style={{
					position: "fixed",
					bottom: "15%",
					left: "15%",
					width: "200px",
					height: "200px",
					background:
						"linear-gradient(135deg, rgba(100, 43, 115, 0.6), rgba(0, 212, 255, 0.1))",
					transform: "rotate(45deg)",
					filter: "blur(30px)",
					zIndex: "-1",
				}}
			/>
			{/* Content container using Box with Flex properties */}
			<Box display="flex" width="100%" height="100%">
				{/* Sidebar toggle button */}
				<Box
					className="sidebar-toggle"
					onClick={toggleSidebar}
					position="fixed"
					top="20px"
					left={{ initial: "20px", sm: isSidebarVisible ? "300px" : "20px" }}
					style={{ zIndex: 1000 }}
				>
					<HamburgerMenuIcon />
				</Box>

				{/* Overlay for mobile - only visible when sidebar is open */}
				<Box
					className={`sidebar-overlay ${isSidebarVisible ? "visible" : ""}`}
					onClick={toggleSidebar}
					display={{
						initial: isSidebarVisible ? "block" : "none",
						sm: "none",
					}}
				/>

				{/* Sidebar component - Conditionally render */}
				{isSidebarVisible && (
					<Sidebar
						isVisible={isSidebarVisible}
						onToggleVisibility={toggleSidebar}
					/>
				)}

				{/* Main content area using Box */}
				<Box
					as="main"
					flexGrow="1"
					overflowY="auto"
					pl={{ initial: "3", sm: "5" }}
					pr={{ initial: "3", sm: "5" }}
					pt={{ initial: "6", sm: "5" }}
					pb={{ initial: "3", sm: "5" }}
					ml={{ initial: "0", sm: isSidebarVisible ? "280px" : "0" }}
					style={{
						transition: "margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
					}}
				>
					{children}

					{/* Decorative grid - subtle lines in the background */}
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundImage: `
								linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
								linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
							`,
							backgroundSize: "50px 50px",
							pointerEvents: "none",
							zIndex: -1,
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
}
