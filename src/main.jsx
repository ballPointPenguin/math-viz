import { Theme } from "@radix-ui/themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Theme appearance="dark">
			<App />
		</Theme>
	</StrictMode>,
);
