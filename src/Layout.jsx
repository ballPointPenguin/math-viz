import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import clsx from "clsx";
import React, { useState } from "react";
import Sidebar from "./components/ui/Sidebar.jsx";
import { layoutContainer } from "./layout.css";

export default function Layout({ children }) {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	return (
		<Box
			className={clsx(layoutContainer)}
			height="100vh"
			overflow="hidden"
			position="relative"
			p="4"
		>
			{/* Decorative elements */}

			{/* Content container using Box with Flex properties */}
			<Box display="flex" width="100%" height="100%">
				{/* Sidebar toggle button */}
				<Box
					as="button"
					className="sidebar-toggle"
					onClick={toggleSidebar}
					position="fixed"
					top="4"
					left={{
						initial: "4",
						sm: isSidebarVisible ? "calc(280px + var(--space-4))" : "4",
					}}
					style={{
						zIndex: 1000,
						border: "none",
						background: "var(--gray-a3)",
						padding: "var(--space-2)",
						borderRadius: "var(--radius-3)",
					}}
				>
					<HamburgerMenuIcon color="var(--gray-11)" />
				</Box>

				{/* Overlay for mobile - only visible when sidebar is open */}
				{/* <Box
					className={`sidebar-overlay ${isSidebarVisible ? "visible" : ""}`}
					onClick={toggleSidebar}
					display={{
						initial: isSidebarVisible ? "block" : "none",
						sm: "none",
					}}
				/> */}

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
					pt={{ initial: "7", sm: "5" }}
					pb={{ initial: "3", sm: "5" }}
					style={{
						marginLeft: isSidebarVisible ? "280px" : "0px",
						transition: "margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
						position: "relative",
					}}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
