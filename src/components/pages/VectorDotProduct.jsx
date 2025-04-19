import { Box, Card, Flex, Grid, Heading, Tabs, Text } from "@radix-ui/themes";
import React from "react";
import MathFormula, { MathExplanation } from "../ui/MathFormula";
import DotProductVisualization from "../viz/DotProductVisualization";
import * as styles from "./VectorDotProduct.css";

export const VectorDotProduct = () => {
	// Math explanation steps for the dot product
	const dotProductSteps = [
		{
			description: "The dot product of two vectors A and B is defined as:",
			formula: "\\vec{A} \\cdot \\vec{B} = |A||B|\\cos{\\theta}",
		},
		{
			description:
				"Where θ is the angle between the vectors. Alternatively, using components:",
			formula: "\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y",
		},
		{
			description:
				"This can also be visualized as the projection of one vector onto another, multiplied by the length of the other vector:",
			formula:
				"\\vec{A} \\cdot \\vec{B} = |A|\\cdot|B|\\cos{\\theta} = |A|\\cdot\\text{proj}_{B}A",
		},
	];

	// Math explanation steps for the geometric interpretation
	const geometricSteps = [
		{
			description: "The dot product can be interpreted geometrically as:",
			formula: "\\vec{A} \\cdot \\vec{B} = |B| \\cdot \\text{proj}_{B}A",
		},
		{
			description:
				"Where proj_B A is the scalar projection of vector A onto vector B. This is calculated as:",
			formula: "\\text{proj}_{B}A = |A|\\cos{\\theta}",
		},
		{
			description:
				"Meaning the dot product is also the product of the length of B and the length of A's projection onto B:",
			formula: "\\vec{A} \\cdot \\vec{B} = |B| \\cdot |A|\\cos{\\theta}",
		},
	];

	// Math explanation steps for the algebraic properties
	const propertiesSteps = [
		{
			description: "The dot product is commutative:",
			formula: "\\vec{A} \\cdot \\vec{B} = \\vec{B} \\cdot \\vec{A}",
		},
		{
			description: "The dot product is distributive over addition:",
			formula:
				"\\vec{A} \\cdot (\\vec{B} + \\vec{C}) = \\vec{A} \\cdot \\vec{B} + \\vec{A} \\cdot \\vec{C}",
		},
		{
			description: "Scalar multiplication:",
			formula: "(c\\vec{A}) \\cdot \\vec{B} = c(\\vec{A} \\cdot \\vec{B})",
		},
		{
			description: "Dot product of perpendicular vectors is zero:",
			formula:
				"\\text{If } \\vec{A} \\perp \\vec{B}, \\text{ then } \\vec{A} \\cdot \\vec{B} = 0",
		},
	];

	// Applications of dot products
	const applications = [
		{
			id: "work",
			title: "Work in Physics",
			description:
				"Calculating work done by a force moving an object along a vector",
		},
		{
			id: "projection",
			title: "Projection",
			description:
				"Finding the component of one vector in the direction of another",
		},
		{
			id: "angle",
			title: "Angle Calculation",
			description: "Determining the angle between two vectors",
		},
		{
			id: "orthogonality",
			title: "Orthogonality",
			description: "Testing if two vectors are perpendicular to each other",
		},
	];

	return (
		<Box className={styles.container}>
			<Heading size="6" mb="4">
				Vector Dot Products
			</Heading>

			<Tabs.Root defaultValue="explanation">
				<Tabs.List>
					<Tabs.Trigger value="explanation">Explanation</Tabs.Trigger>
					<Tabs.Trigger value="visualization">
						Interactive Visualization
					</Tabs.Trigger>
					<Tabs.Trigger value="applications">Applications</Tabs.Trigger>
				</Tabs.List>

				{/* Tab content */}
				<Box className={styles.tabContent} mt="4">
					<Tabs.Content value="explanation">
						<Grid columns={{ initial: "1", md: "2" }} gap="4">
							<Box>
								<Card>
									<Heading size="3" mb="2">
										What is the Dot Product?
									</Heading>
									<Text as="p" mb="3">
										The dot product (or scalar product) is an operation that
										takes two vectors and returns a scalar value. It has
										numerous applications in mathematics, physics, and computer
										science.
									</Text>

									<MathExplanation
										steps={dotProductSteps}
										title="Mathematical Definition"
										boxProps={{ mb: "4" }}
									/>

									<MathExplanation
										steps={geometricSteps}
										title="Geometric Interpretation"
										boxProps={{ mb: "4" }}
									/>

									<MathExplanation steps={propertiesSteps} title="Properties" />
								</Card>
							</Box>

							<Box>
								<Card>
									<Heading size="3" mb="3">
										Basic Example
									</Heading>
									<Text as="p" mb="3">
										Let's compute the dot product of two vectors:
									</Text>
									<Box mb="3">
										<MathFormula
											formula="\vec{A} = (3, 4) \\ \\ \text{and} \\ \\ \vec{B} = (2, -1)"
											display={true}
										/>
									</Box>

									<Box mb="3">
										<Text as="p" mb="2">
											Using the component formula:
										</Text>
										<MathFormula
											formula="\vec{A} \cdot \vec{B} = A_x B_x + A_y B_y = 3 \cdot 2 + 4 \cdot (-1) = 6 - 4 = 2"
											display={true}
										/>
									</Box>

									<Box mb="3">
										<Text as="p" mb="2">
											Using the angle formula:
										</Text>
										<MathFormula
											formula="\begin{align*} 
											|\vec{A}| &= \sqrt{3^2 + 4^2} = 5 \\
											|\vec{B}| &= \sqrt{2^2 + (-1)^2} = \sqrt{5} \\
											\cos{\theta} &= \frac{\vec{A} \cdot \vec{B}}{|\vec{A}||\vec{B}|} = \frac{2}{5\sqrt{5}} = \frac{2}{5\sqrt{5}} \\
											\theta &= \cos^{-1}\left(\frac{2}{5\sqrt{5}}\right) \approx 79.7^{\circ}
											\end{align*}"
											display={true}
										/>
									</Box>

									<Box>
										<DotProductVisualization
											initialVectorA={{ x: 3, y: 4 }}
											initialVectorB={{ x: 2, y: -1 }}
											height={300}
											width={300}
											interactive={false}
										/>
									</Box>
								</Card>
							</Box>
						</Grid>
					</Tabs.Content>

					<Tabs.Content value="visualization">
						<Box>
							<Card className={styles.visualizationCard}>
								<Heading size="3" mb="3">
									Interactive Dot Product Visualization
								</Heading>
								<Text as="p" mb="4">
									Adjust the vectors using the sliders to see how the dot
									product changes. The dot product is shown in the top left
									corner of the visualization. The projection (shown in pink)
									represents the scalar projection of vector A onto vector B.
								</Text>

								<Flex direction="column" align="center">
									<DotProductVisualization
										height={500}
										width={500}
										interactive={true}
									/>
								</Flex>
							</Card>
						</Box>
					</Tabs.Content>

					<Tabs.Content value="applications">
						<Box>
							<Card>
								<Heading size="3" mb="3">
									Applications of Dot Products
								</Heading>
								<Text as="p" mb="4">
									The dot product is used in many fields for various purposes.
									Here are some of the most common applications:
								</Text>

								<Grid columns={{ initial: "1", sm: "2" }} gap="4">
									{applications.map((app) => (
										<Card key={app.id}>
											<Heading size="2" mb="2">
												{app.title}
											</Heading>
											<Text as="p">{app.description}</Text>
										</Card>
									))}
								</Grid>

								<Box mt="4">
									<Heading size="3" mb="3">
										Work Calculation Example
									</Heading>
									<Text as="p" mb="3">
										In physics, work is calculated as the dot product of the
										force vector and the displacement vector:
									</Text>
									<MathFormula
										formula="W = \vec{F} \cdot \vec{d} = |F||d|\cos{\theta}"
										display={true}
									/>

									<Box mt="3">
										<Text as="p" mb="2">
											If a force of 10N is applied at an angle of 30° to move an
											object 5 meters, the work done is:
										</Text>
										<MathFormula
											formula="W = 10 \cdot 5 \cdot \cos{30^{\circ}} = 50 \cdot 0.866 = 43.3 \text{ joules}"
											display={true}
										/>
									</Box>
								</Box>
							</Card>
						</Box>
					</Tabs.Content>
				</Box>
			</Tabs.Root>
		</Box>
	);
};

export default VectorDotProduct;
