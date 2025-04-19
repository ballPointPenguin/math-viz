import { Box, Card, Flex, Grid, Heading, Tabs, Text } from "@radix-ui/themes";
import React from "react";
import MathFormula, { MathExplanation } from "../ui/MathFormula";
import BasisVisualization from "../viz/BasisVisualization";
import * as styles from "./VectorBasis.css";

export const VectorBasis = () => {
	// Math explanation steps for basis definition
	const basisDefinitionSteps = [
		{
			id: "def1",
			description:
				"A basis of a vector space V is a set of linearly independent vectors that span V:",
			formula: "\\{\\vec{e}_1, \\vec{e}_2, \\ldots, \\vec{e}_n\\}",
		},
		{
			id: "def2",
			description:
				"Linear independence means no vector in the basis can be written as a linear combination of the others:",
			formula:
				"c_1\\vec{e}_1 + c_2\\vec{e}_2 + \\ldots + c_n\\vec{e}_n = \\vec{0} \\iff c_1 = c_2 = \\ldots = c_n = 0",
		},
		{
			id: "def3",
			description:
				"The span property means any vector in the space can be written as a linear combination of basis vectors:",
			formula:
				"\\forall \\vec{v} \\in V, \\exists a_1, a_2, \\ldots, a_n \\in \\mathbb{R} \\text{ such that } \\vec{v} = a_1\\vec{e}_1 + a_2\\vec{e}_2 + \\ldots + a_n\\vec{e}_n",
		},
	];

	// Math explanation steps for standard basis in R²
	const standardBasisSteps = [
		{
			id: "std1",
			description:
				"The standard basis in R² consists of two unit vectors along the coordinate axes:",
			formula: "\\vec{e}_1 = (1,0) \\quad \\vec{e}_2 = (0,1)",
		},
		{
			id: "std2",
			description: "Any vector v in R² can be written uniquely as:",
			formula: "\\vec{v} = (v_x, v_y) = v_x\\vec{e}_1 + v_y\\vec{e}_2",
		},
	];

	// Math explanation steps for non-standard basis
	const nonStandardBasisSteps = [
		{
			id: "nonstd1",
			description: "A different basis for R² could be:",
			formula: "\\vec{e}'_1 = (1,1) \\quad \\vec{e}'_2 = (-1,1)",
		},
		{
			id: "nonstd2",
			description:
				"To express a vector v in terms of this basis, we solve the system:",
			formula:
				"\\vec{v} = a\\vec{e}'_1 + b\\vec{e}'_2 = a(1,1) + b(-1,1) = (a-b, a+b)",
		},
		{
			id: "nonstd3",
			description: "For a vector v = (v_x, v_y), we get the coordinates:",
			formula: "a = \\frac{v_x + v_y}{2} \\quad b = \\frac{v_y - v_x}{2}",
		},
	];

	// Math explanation steps for change of basis
	const changeBasisSteps = [
		{
			id: "change1",
			description:
				"To change from standard coordinates to coordinates in another basis B, we use the change of basis matrix:",
			formula: "[T]_B = [\\vec{e}_1 | \\vec{e}_2 | \\ldots | \\vec{e}_n]",
		},
		{
			id: "change2",
			description:
				"For our non-standard basis example, the change of basis matrix would be:",
			formula: "[T]_B = \\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix}",
		},
		{
			id: "change3",
			description: "The coordinates in the new basis can be found by solving:",
			formula:
				"\\begin{bmatrix} v_x \\\\ v_y \\end{bmatrix} = [T]_B \\begin{bmatrix} a \\\\ b \\end{bmatrix} \\implies \\begin{bmatrix} a \\\\ b \\end{bmatrix} = [T]_B^{-1} \\begin{bmatrix} v_x \\\\ v_y \\end{bmatrix}",
		},
	];

	// Properties of bases
	const propertiesItems = [
		{
			id: "prop1",
			title: "Dimension",
			description:
				"All bases of a vector space have the same number of elements, called the dimension of the space",
		},
		{
			id: "prop2",
			title: "Uniqueness of Representation",
			description:
				"Any vector in the space can be represented uniquely as a linear combination of basis vectors",
		},
		{
			id: "prop3",
			title: "Coordinate Isomorphism",
			description:
				"A basis establishes an isomorphism between the vector space and R^n",
		},
		{
			id: "prop4",
			title: "Multiple Bases",
			description:
				"A vector space has infinitely many different bases, related by invertible linear transformations",
		},
	];

	// Examples of bases in different contexts
	const examplesItems = [
		{
			id: "example1",
			title: "Polynomial Basis",
			description:
				"The set {1, x, x², x³, ...} forms a basis for the vector space of all polynomials",
		},
		{
			id: "example2",
			title: "Matrix Basis",
			description:
				"The set of elementary matrices forms a basis for the vector space of all n×n matrices",
		},
		{
			id: "example3",
			title: "Function Basis",
			description:
				"The set {sin(nx), cos(nx)} for n=0,1,2,... forms a basis for periodic functions (Fourier basis)",
		},
		{
			id: "example4",
			title: "Orthogonal Basis",
			description:
				"A basis where all vectors are perpendicular to each other, like the standard basis in R²",
		},
	];

	return (
		<Box className={styles.container}>
			<Heading size="6" mb="4">
				Vector Basis Concepts
			</Heading>

			<Tabs.Root defaultValue="explanation">
				<Tabs.List>
					<Tabs.Trigger value="explanation">Understanding Basis</Tabs.Trigger>
					<Tabs.Trigger value="visualization">
						Interactive Visualization
					</Tabs.Trigger>
					<Tabs.Trigger value="applications">
						Applications & Examples
					</Tabs.Trigger>
				</Tabs.List>

				{/* Tab content */}
				<Box className={styles.tabContent} mt="4">
					<Tabs.Content value="explanation">
						<Grid columns={{ initial: "1", md: "2" }} gap="4">
							<Box>
								<Card>
									<Heading size="3" mb="2">
										What is a Vector Basis?
									</Heading>
									<Text as="p" mb="3">
										A basis is a set of vectors that allows us to uniquely
										represent any vector in a vector space as a linear
										combination of these basis vectors. The basis vectors must
										be linearly independent and span the entire space.
									</Text>

									<MathExplanation
										steps={basisDefinitionSteps}
										title="Definition"
										boxProps={{ mb: "4" }}
									/>

									<MathExplanation
										steps={standardBasisSteps}
										title="Standard Basis in R²"
										boxProps={{ mb: "4" }}
									/>

									<MathExplanation
										steps={nonStandardBasisSteps}
										title="Non-Standard Basis Example"
									/>
								</Card>
							</Box>

							<Box>
								<Card>
									<Heading size="3" mb="3">
										Change of Basis
									</Heading>
									<Text as="p" mb="3">
										Different bases can be used to represent the same vector
										space. We can convert between coordinates in different bases
										using change of basis transformations.
									</Text>

									<MathExplanation
										steps={changeBasisSteps}
										title="Changing Coordinate Systems"
										boxProps={{ mb: "4" }}
									/>

									<Heading size="3" mb="2">
										Properties of Bases
									</Heading>
									<Box mb="4">
										{propertiesItems.map((item) => (
											<Box key={item.id} mb="3">
												<Text as="p" size="2" weight="bold">
													{item.title}
												</Text>
												<Text as="p" size="2">
													{item.description}
												</Text>
											</Box>
										))}
									</Box>
								</Card>
							</Box>
						</Grid>
					</Tabs.Content>

					<Tabs.Content value="visualization">
						<Box>
							<Card className={styles.visualizationCard}>
								<Heading size="3" mb="3">
									Interactive Basis Visualization
								</Heading>
								<Text as="p" mb="4">
									Explore how vectors can be represented in different bases.
									Toggle between the standard basis and a custom basis to see
									how the coordinates change. Any vector can be expressed as a
									linear combination of the basis vectors.
								</Text>

								<Box mb="3">
									<Text as="p" size="2" mb="2">
										Key concepts demonstrated:
									</Text>
									<Flex direction="column" gap="1" mb="3">
										<Text as="p" size="2">
											• Vector coordinates are relative to the chosen basis
										</Text>
										<Text as="p" size="2">
											• Different bases can represent the same vector
										</Text>
										<Text as="p" size="2">
											• Linear independence is required for a valid basis
										</Text>
										<Text as="p" size="2">
											• A basis in R² always consists of exactly 2 vectors
										</Text>
									</Flex>
								</Box>

								<Flex direction="column" align="center">
									<BasisVisualization
										height={500}
										width={500}
										interactive={true}
										initialTargetVector={{ x: 3, y: 2 }}
									/>
								</Flex>
							</Card>
						</Box>
					</Tabs.Content>

					<Tabs.Content value="applications">
						<Box>
							<Card>
								<Heading size="3" mb="3">
									Applications of Vector Bases
								</Heading>
								<Text as="p" mb="4">
									Vector bases are fundamental concepts in linear algebra with
									widespread applications across mathematics, physics, computer
									graphics, engineering, and data science.
								</Text>

								<Grid columns={{ initial: "1", sm: "2" }} gap="4" mb="4">
									{examplesItems.map((item) => (
										<Card key={item.id}>
											<Heading size="2" mb="2">
												{item.title}
											</Heading>
											<Text as="p">{item.description}</Text>
										</Card>
									))}
								</Grid>

								<Box mb="4">
									<Heading size="3" mb="3">
										Practical Applications
									</Heading>

									<Text as="p" weight="bold" size="2" mb="1">
										Computer Graphics
									</Text>
									<Text as="p" mb="3">
										In 3D computer graphics, objects are typically modeled in a
										local coordinate system (using a local basis), then
										transformed into world coordinates, camera coordinates, and
										finally screen coordinates. Each transformation involves a
										change of basis.
									</Text>

									<Text as="p" weight="bold" size="2" mb="1">
										Quantum Mechanics
									</Text>
									<Text as="p" mb="3">
										Quantum states are represented as vectors in a Hilbert
										space. Different bases correspond to different observable
										properties (position, momentum, energy, etc.).
									</Text>

									<Text as="p" weight="bold" size="2" mb="1">
										Signal Processing
									</Text>
									<Text as="p">
										Fourier analysis decomposes signals into a sum of sinusoids,
										effectively changing from the time basis to the frequency
										basis. Similarly, wavelet transforms use a different basis
										to represent signals that have localized features in both
										time and frequency.
									</Text>
								</Box>
							</Card>
						</Box>
					</Tabs.Content>
				</Box>
			</Tabs.Root>
		</Box>
	);
};

export default VectorBasis;
