import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import * as styles from "./VectorInput.css.ts";

export const VectorInput = ({ label, vector, onChange }) => {
	return (
		<Box>
			<Text as="p" size="2" weight="bold" mb="2">
				{label}
			</Text>
			<Flex align="center" gap="2">
				<Box>
					<Text as="label" size="2" mr="1">
						x:
					</Text>
					<input
						type="number"
						value={vector[0]}
						onChange={(e) => onChange(0, Number(e.target.value))}
						className={styles.input}
					/>
				</Box>
				<Box>
					<Text as="label" size="2" mr="1">
						y:
					</Text>
					<input
						type="number"
						value={vector[1]}
						onChange={(e) => onChange(1, Number(e.target.value))}
						className={styles.input}
					/>
				</Box>
			</Flex>
		</Box>
	);
};
