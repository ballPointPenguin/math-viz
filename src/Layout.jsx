import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Box, IconButton } from "@radix-ui/themes";
import clsx from "clsx";
import React, { useState } from "react";
import { DecorativeGrid } from "./components/ui/Decorative.jsx";
import Sidebar from "./components/ui/Sidebar.jsx";
import * as styles from "./layout.css";

export default function Layout({ children }) {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);

	const toggleSidebar = () => {
		console.log("toggleSidebar");
		setIsSidebarVisible(!isSidebarVisible);
	};

	return (
		<Box
			className={styles.layoutContainer}
			height="100%"
			overflow="hidden"
			position="relative"
			p="5"
		>
			<DecorativeGrid />

			{/* Content container using Box with Flex properties */}
			<Box display="flex" width="100%" height="100%">
				{/* Always render Sidebar, control visibility via transform */}
				<Sidebar isVisible={isSidebarVisible} />

				{/* Wrapper Box for positioning the IconButton */}
				<Box position="fixed" top="4" left="4" style={{ zIndex: 2 }}>
					{/* Sidebar toggle button - IconButton */}
					<IconButton
						variant="outline"
						color="gray"
						highContrast
						onClick={toggleSidebar}
						aria-label="Toggle sidebar"
					>
						<HamburgerMenuIcon />
					</IconButton>
				</Box>

				<Box
					className={clsx(styles.sidebarOverlay, isSidebarVisible && "visible")}
					onClick={toggleSidebar}
				/>

				{/* Main content area using Box */}
				<Box
					as="main"
					className={styles.mainContent}
					height="100%"
					flexGrow="1"
					overflowY="auto"
					pl={{ initial: "3", sm: "5" }}
					pr={{ initial: "3", sm: "5" }}
					pt={{ initial: "7", sm: "5" }}
					pb={{ initial: "3", sm: "5" }}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
