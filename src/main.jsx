import { Theme } from "@radix-ui/themes";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Theme
			appearance="dark"
			accentColor="plum"
			grayColor="gray"
			radius="medium"
		>
			<App />
		</Theme>
	</React.StrictMode>,
);
