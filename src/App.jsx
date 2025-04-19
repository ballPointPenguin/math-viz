import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout.jsx";
import Home from "./components/Home.tsx";
import { MafsHello } from "./components/pages/MafsHello.jsx";
import { MafsTrigFunctions } from "./components/pages/MafsTrigFunctions.jsx";
import { MafsUnitCircleSine } from "./components/pages/MafsUnitCircleSine.jsx";
import MathVizDemo from "./components/pages/MathVizDemo.jsx";
import { P5Demo } from "./components/pages/P5Demo.jsx";
import { RightTrianglePlayground } from "./components/pages/RightTrianglePlayground.jsx";
import { SineCosine } from "./components/pages/SineCosine.jsx";
import { SineCosineInteractive } from "./components/pages/SineCosineInteractive.jsx";
import { TangentExplorer } from "./components/pages/TangentExplorer.jsx";
import { UnitCircle } from "./components/pages/UnitCircle.jsx";
import { VectorAddition } from "./components/pages/VectorAddition.jsx";
import { VectorDotProduct } from "./components/pages/VectorDotProduct.jsx";
import { VectorOperations } from "./components/pages/VectorOperations.jsx";

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
					<Route path="vector-dot-product" element={<VectorDotProduct />} />
					{/* Demos & Utilities */}
					<Route path="p5-demo" element={<P5Demo />} />
					<Route path="mafs-hello" element={<MafsHello />} />
					{/* Component Library Demo */}
					<Route path="math-viz-demo" element={<MathVizDemo />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
