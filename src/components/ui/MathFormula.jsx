import { Box, Text } from "@radix-ui/themes";
import katex from "katex";
import React, { useEffect, useRef } from "react";
import "katex/dist/katex.min.css";

/**
 * A component for rendering mathematical formulas using KaTeX
 *
 * @param {Object} props
 * @param {string} props.formula - The LaTeX formula to render
 * @param {boolean} props.display - Whether to render in display mode (default: false)
 * @param {string} props.color - Text color (uses theme colors)
 * @param {Object} props.boxProps - Additional props for the containing Box
 */
const MathFormula = ({ formula, display = false, color, boxProps = {} }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		if (containerRef.current && formula) {
			katex.render(formula, containerRef.current, {
				throwOnError: false,
				displayMode: display,
			});
		}
	}, [formula, display]);

	return (
		<Box
			ref={containerRef}
			display="inline-block"
			style={{ overflow: "auto" }}
			color={color}
			{...boxProps}
		/>
	);
};

/**
 * A component for displaying a step-by-step mathematical explanation
 *
 * @param {Object} props
 * @param {Array} props.steps - Array of steps, each with a formula, id and optional description
 * @param {string} props.title - Optional title for the explanation
 * @param {Object} props.boxProps - Additional props for the containing Box
 */
export const MathExplanation = ({ steps = [], title, boxProps = {} }) => {
	return (
		<Box p="3" style={{ overflow: "auto" }} {...boxProps}>
			{title && (
				<Text as="h3" size="3" weight="bold" mb="2">
					{title}
				</Text>
			)}

			{steps.map((step, index) => (
				<Box key={`step-${index}`} mb="3">
					{step.description && (
						<Text as="p" size="2" mb="1">
							{step.description}
						</Text>
					)}
					<MathFormula formula={step.formula} display={true} />
				</Box>
			))}
		</Box>
	);
};

export default MathFormula;
