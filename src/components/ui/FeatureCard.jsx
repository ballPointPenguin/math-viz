import { Box, Heading, Text } from "@radix-ui/themes";
import * as styles from "./feature-card.css";

// Feature card component refactored to use vanilla-extract styles + Radix props
export default function FeatureCard({
	title,
	description,
	icon,
	linkPath,
	isExternal = false,
}) {
	return (
		<a
			href={linkPath}
			className={styles.cardLink} // VE style for link behavior (hover target)
			target={isExternal ? "_blank" : "_self"}
			rel={isExternal ? "noopener noreferrer" : ""}
		>
			<Box
				// Apply Radix props for base layout/appearance
				p="4"
				position="relative"
				overflow="hidden"
				radius="lg" // Use Radix prop for border-radius
				// Use Radix theme variables directly for background/border
				// Note: Radix doesn't have direct props for all theme colors/borders easily
				// Keeping VE class for hover effects and potentially complex base styles might be easier
				className={styles.cardBox} // Keep VE style for transition, complex styles, and hover targets
				height="100%"
			>
				<Box className={styles.iconBox}>
					{" "}
					{/* Keep VE style for icon box specific + hover */}
					{icon}
				</Box>
				<Heading as="h3" size="5" className={styles.heading}>
					{" "}
					{/* Keep VE style for color from sprinkles */}
					{title}
				</Heading>
				<Text as="p" size="2" className={styles.description}>
					{" "}
					{/* Keep VE style for color from sprinkles */}
					{description}
				</Text>

				{/* Hover effect gradient - styled via VE */}
				<Box className={styles.hoverEffectGradient} />
			</Box>
		</a>
	);
}
