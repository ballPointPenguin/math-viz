import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ExternalLinkIcon, LightningBoltIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import "./App.css";
import "katex/dist/katex.min.css";
import Layout from "./Layout.jsx";
import CosineDotProduct from "./components/CosineDotProduct";
import { MafsHello } from "./components/MafsHello.jsx";
import { MafsTrigFunctions } from "./components/MafsTrigFunctions.jsx";
import { MafsUnitCircleSine } from "./components/MafsUnitCircleSine.jsx";
import { P5Demo } from "./components/P5Demo.jsx";
import { RightTrianglePlayground } from "./components/RightTrianglePlayground.jsx";
import { SineCosine } from "./components/SineCosine.jsx";
import { SineCosineInteractive } from "./components/SineCosineInteractive.jsx";
import { TangentExplorer } from "./components/TangentExplorer.jsx";
import { UnitCircle } from "./components/UnitCircle.jsx";
import { VectorAddition } from "./components/VectorAddition.jsx";
import { VectorOperations } from "./components/VectorOperations.jsx";

function Home() {
	return (
		<div>
			<h1 style={{ 
				fontSize: "2.5rem",
				background: "linear-gradient(90deg, var(--colors-accent1), var(--colors-accent2))",
				WebkitBackgroundClip: "text",
				WebkitTextFillColor: "transparent",
			}}>
				Welcome to Math Visualizations
			</h1>
			
			<p style={{ 
				fontSize: "1.1rem", 
				maxWidth: "800px", 
				marginBottom: "2rem",
				color: "var(--colors-textMuted)"
			}}>
				Explore mathematical concepts through interactive visualizations and guided examples.
				This project combines the beauty of mathematics with the power of visual understanding.
			</p>
			
			<div style={{ 
				display: "grid", 
				gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
				gap: "1.5rem",
				marginTop: "2rem" 
			}}>
				{/* Featured Section Cards */}
				<FeatureCard 
					title="Trigonometry" 
					description="Explore the unit circle, sine, cosine, and other trigonometric functions."
					icon={<WaveformIcon />} 
					linkPath="/unit-circle" 
				/>
				
				<FeatureCard 
					title="Linear Algebra" 
					description="Understand vectors, operations, and dot products through visualization."
					icon={<VectorIcon />} 
					linkPath="/vector-addition" 
				/>
				
				<FeatureCard 
					title="Interactive Demos" 
					description="Experiment with dynamic, interactive models of mathematical concepts."
					icon={<LightningBoltIcon />} 
					linkPath="/sine-cosine-interactive" 
				/>
				
				<FeatureCard 
					title="Learn More" 
					description="Discover how visualization can enhance mathematical understanding."
					icon={<ExternalLinkIcon />} 
					linkPath="/" 
					isExternal
				/>
			</div>
			
			{/* Decorative elements */}
			<div className="home-decorative-element" style={{
				position: "absolute",
				right: "5%",
				bottom: "10%",
				width: "150px",
				height: "150px",
				borderRadius: "50%",
				border: "1px solid var(--colors-accent2)",
				opacity: 0.2,
				pointerEvents: "none",
				zIndex: 0
			}} />
			
			<div className="home-decorative-element" style={{
				position: "absolute",
				right: "10%",
				bottom: "15%",
				width: "100px",
				height: "100px",
				borderRadius: "50%",
				border: "1px solid var(--colors-accent1)",
				opacity: 0.15,
				pointerEvents: "none",
				zIndex: 0
			}} />
		</div>
	);
}

// Feature card component
function FeatureCard({ title, description, icon, linkPath, isExternal = false }) {
	return (
		<a 
			href={linkPath} 
			style={{
				textDecoration: "none",
				color: "inherit"
			}}
			target={isExternal ? "_blank" : "_self"}
			rel={isExternal ? "noopener noreferrer" : ""}
		>
			<div style={{
				padding: "1.5rem",
				borderRadius: "8px",
				background: "var(--colors-surface)",
				border: "1px solid var(--colors-border)",
				transition: "all 0.3s ease",
				height: "100%",
				position: "relative",
				overflow: "hidden",
			}}>
				<div style={{
					marginBottom: "1rem",
					color: "var(--colors-accent2)",
					fontSize: "1.5rem"
				}}>
					{icon}
				</div>
				<h3 style={{
					margin: "0 0 0.75rem 0",
					color: "var(--colors-text)",
					fontSize: "1.25rem"
				}}>
					{title}
				</h3>
				<p style={{
					margin: 0,
					color: "var(--colors-textMuted)",
					fontSize: "0.9rem",
					lineHeight: 1.5
				}}>
					{description}
				</p>
				
				{/* Hover effect gradient */}
				<div className="card-hover-effect" style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: "4px",
					background: "linear-gradient(90deg, var(--colors-accent1), var(--colors-accent2))",
					opacity: 0,
					transition: "opacity 0.3s ease",
				}} />
			</div>
		</a>
	);
}

// Custom SVG icons
function WaveformIcon() {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2 12H4C4.55 12 5 11.55 5 11V7C5 6.45 4.55 6 4 6H2C1.45 6 1 6.45 1 7V11C1 11.55 1.45 12 2 12Z" fill="currentColor" />
			<path d="M6 18H8C8.55 18 9 17.55 9 17V13C9 12.45 8.55 12 8 12H6C5.45 12 5 12.45 5 13V17C5 17.55 5.45 18 6 18Z" fill="currentColor" />
			<path d="M10 21H12C12.55 21 13 20.55 13 20V4C13 3.45 12.55 3 12 3H10C9.45 3 9 3.45 9 4V20C9 20.55 9.45 21 10 21Z" fill="currentColor" />
			<path d="M14 18H16C16.55 18 17 17.55 17 17V7C17 6.45 16.55 6 16 6H14C13.45 6 13 6.45 13 7V17C13 17.55 13.45 18 14 18Z" fill="currentColor" />
			<path d="M18 13H20C20.55 13 21 12.55 21 12V11C21 10.45 20.55 10 20 10H18C17.45 10 17 10.45 17 11V12C17 12.55 17.45 13 18 13Z" fill="currentColor" />
		</svg>
	);
}

function VectorIcon() {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12 2L4 6V12M12 2L20 6V12M12 2V8M4 12L12 16L20 12M4 12V18L12 22M20 12V18L12 22M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	);
}

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					{/* Trigonometry */}
					<Route path="unit-circle" element={<UnitCircle />} />
					<Route path="sine-cosine" element={<SineCosine />} />
					<Route
						path="sine-cosine-interactive"
						element={<SineCosineInteractive />}
					/>
					<Route path="tangent-explorer" element={<TangentExplorer />} />
					<Route
						path="right-triangle-playground"
						element={<RightTrianglePlayground />}
					/>
					<Route
						path="mafs-unit-circle-sine"
						element={<MafsUnitCircleSine />}
					/>
					<Route path="mafs-trig-functions" element={<MafsTrigFunctions />} />
					{/* Linear Algebra */}
					<Route path="vector-addition" element={<VectorAddition />} />
					<Route path="vector-operations" element={<VectorOperations />} />
					<Route path="cosine-dot-product" element={<CosineDotProduct />} />
					{/* Demos & Utilities */}
					<Route path="p5-demo" element={<P5Demo />} />
					<Route path="mafs-hello" element={<MafsHello />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
