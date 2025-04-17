import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import { theme, debugOutline } from "./theme.css.ts";
import "./App.css";

export default function Layout({ children }) {
	const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth > 768);
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

	// Add a listener for screen size changes
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 768;
			setIsMobileView(mobile);
			
			// On desktop, sidebar is always visible by default
			if (!mobile && !isSidebarVisible) {
				setIsSidebarVisible(true);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isSidebarVisible]);

	const toggleSidebar = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	return (
		<div
			className={`${theme} mainBg`}
			style={{ backgroundColor: 'var(--colors-background)' }}
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
					background: "radial-gradient(circle at 30% 30%, rgba(135, 94, 255, 0.2), rgba(31, 17, 56, 0))",
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
					background: "linear-gradient(135deg, rgba(100, 43, 115, 0.1), rgba(0, 212, 255, 0.05))",
					transform: "rotate(45deg)",
					filter: "blur(30px)",
					zIndex: "-1",
				}}
			/>
			
			{/* Content container for proper layout */}
			<div className="content-container">
				{/* Sidebar toggle button */}
				<div 
					className="sidebar-toggle" 
					onClick={toggleSidebar}
					style={{ 
						left: isMobileView ? "20px" : (isSidebarVisible ? "300px" : "20px"),
					}}
				>
					<HamburgerMenuIcon />
				</div>
				
				{/* Overlay for mobile - only visible when sidebar is open */}
				<div 
					className={`sidebar-overlay ${isSidebarVisible && isMobileView ? 'visible' : ''}`} 
					onClick={toggleSidebar}
				/>
				
				{/* Sidebar component */}
				<Sidebar isVisible={isSidebarVisible} onToggleVisibility={toggleSidebar} />
				
				{/* Main content area */}
				<main style={{ 
					backgroundColor: 'var(--colors-background)',
					marginLeft: isMobileView ? 0 : (isSidebarVisible ? '280px' : 0)
				}}>
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
				</main>
			</div>
		</div>
	);
}