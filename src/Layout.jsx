import { CaretDownIcon, HamburgerMenuIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { theme, debugOutline } from "./theme.css.ts";
import "./App.css";

export default function Layout({ children }) {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true);
	const [openMenus, setOpenMenus] = useState({
		trigonometry: false,
		linearAlgebra: false,
		demos: false
	});

	const toggleMenu = (menuName) => {
		setOpenMenus(prev => ({
			...prev,
			[menuName]: !prev[menuName]
		}));
	};

	const toggleSidebar = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};

	return (
		<div
			className={`${theme} mainBg debug-outline`}
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
				{/* Sidebar toggle button for mobile/collapsed view */}
				<div 
					className="sidebar-toggle" 
					onClick={toggleSidebar}
					style={{ 
						left: isSidebarVisible ? "300px" : "20px",
					}}
				>
					<HamburgerMenuIcon />
				</div>
				
				{/* Sidebar */}
				<aside className={`sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
					<div className="sidebar-header" style={{ marginBottom: "1.5rem", padding: "1.5rem 1rem 0" }}>
						<h1 style={{ 
							fontSize: "1.5rem", 
							margin: "0", 
							fontFamily: "var(--fonts-heading)",
							background: "linear-gradient(90deg, var(--colors-accent1), var(--colors-accent2))",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							textAlign: "center"
						}}>
							Math Viz
						</h1>
						<div style={{ 
							height: "2px", 
							background: "linear-gradient(90deg, var(--colors-accent1), var(--colors-accent2))",
							margin: "8px auto 0",
							width: "80px"
						}} />
					</div>
					
					<div style={{ padding: "0 1rem", overflowY: "auto", flex: 1 }}>
						<NavigationMenu.Root orientation="vertical" className="SidebarNavRoot">
							<NavigationMenu.List className="SidebarNavList">
								{/* Trigonometry Group */}
								<NavigationMenu.Item>
									<NavigationMenu.Trigger 
										className="SidebarNavTrigger" 
										onClick={() => toggleMenu('trigonometry')}
										data-state={openMenus.trigonometry ? 'open' : 'closed'}
									>
										Trigonometry <CaretDownIcon style={{ 
											marginLeft: 4,
											transform: openMenus.trigonometry ? 'rotate(-180deg)' : 'rotate(0)',
											transition: 'transform 0.3s ease'
										}} />
									</NavigationMenu.Trigger>
									<NavigationMenu.Content 
										className="SidebarNavContent" 
										data-state={openMenus.trigonometry ? 'open' : 'closed'}
									>
										<nav
											style={{ display: "flex", flexDirection: "column", gap: 8 }}
										>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/unit-circle"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Unit Circle
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/sine-cosine"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Sine & Cosine
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/sine-cosine-interactive"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Sine & Cosine Interactive
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/tangent-explorer"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Tangent Explorer
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/right-triangle-playground"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Right Triangle Playground
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/mafs-unit-circle-sine"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Unit Circle → Sine Wave
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/mafs-trig-functions"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Trig Functions Explorer
												</NavLink>
											</NavigationMenu.Link>
										</nav>
									</NavigationMenu.Content>
								</NavigationMenu.Item>
								{/* Linear Algebra Group */}
								<NavigationMenu.Item>
									<NavigationMenu.Trigger 
										className="SidebarNavTrigger"
										onClick={() => toggleMenu('linearAlgebra')}
										data-state={openMenus.linearAlgebra ? 'open' : 'closed'}
									>
										Linear Algebra <CaretDownIcon style={{ 
											marginLeft: 4,
											transform: openMenus.linearAlgebra ? 'rotate(-180deg)' : 'rotate(0)',
											transition: 'transform 0.3s ease' 
										}} />
									</NavigationMenu.Trigger>
									<NavigationMenu.Content 
										className="SidebarNavContent"
										data-state={openMenus.linearAlgebra ? 'open' : 'closed'}
									>
										<nav
											style={{ display: "flex", flexDirection: "column", gap: 8 }}
										>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/vector-addition"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Vector Addition
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/vector-operations"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Vector Operations
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/cosine-dot-product"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Cosine & Dot Product
												</NavLink>
											</NavigationMenu.Link>
										</nav>
									</NavigationMenu.Content>
								</NavigationMenu.Item>
								{/* Demos & Utilities Group */}
								<NavigationMenu.Item>
									<NavigationMenu.Trigger 
										className="SidebarNavTrigger"
										onClick={() => toggleMenu('demos')}
										data-state={openMenus.demos ? 'open' : 'closed'}
									>
										Demos & Utilities <CaretDownIcon style={{ 
											marginLeft: 4,
											transform: openMenus.demos ? 'rotate(-180deg)' : 'rotate(0)',
											transition: 'transform 0.3s ease'
										}} />
									</NavigationMenu.Trigger>
									<NavigationMenu.Content 
										className="SidebarNavContent"
										data-state={openMenus.demos ? 'open' : 'closed'}
									>
										<nav
											style={{ display: "flex", flexDirection: "column", gap: 8 }}
										>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/p5-demo"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													P5 Demo
												</NavLink>
											</NavigationMenu.Link>
											<NavigationMenu.Link asChild>
												<NavLink
													to="/mafs-hello"
													className={({ isActive }) =>
														isActive ? "navLink activeNavLink" : "navLink"
													}
												>
													Mafs Hello
												</NavLink>
											</NavigationMenu.Link>
										</nav>
									</NavigationMenu.Content>
								</NavigationMenu.Item>
								{/* Home Link */}
								<NavigationMenu.Item>
									<NavigationMenu.Link asChild>
										<NavLink
											to="/"
											className={({ isActive }) =>
												isActive ? "navLink activeNavLink" : "navLink"
											}
										>
											Home
										</NavLink>
									</NavigationMenu.Link>
								</NavigationMenu.Item>
							</NavigationMenu.List>
						</NavigationMenu.Root>
					</div>
					
					{/* Footer for sidebar */}
					<div style={{ 
						marginTop: "auto", 
						padding: "1rem", 
						borderTop: "1px solid var(--colors-border)", 
						fontSize: "0.8rem",
						color: "var(--colors-textMuted)",
						display: "flex",
						alignItems: "center",
						gap: "8px" 
					}}>
						<InfoCircledIcon />
						<span>Math Viz v0.1</span>
					</div>
				</aside>
				
				{/* Main content area */}
				<main style={{ backgroundColor: 'var(--colors-background)' }}>
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
