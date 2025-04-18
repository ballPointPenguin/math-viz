import { Box, Heading, Text } from "@radix-ui/themes";
import * as styles from './feature-card.css';

// Feature card component refactored to use vanilla-extract styles
export default function FeatureCard({ title, description, icon, linkPath, isExternal = false }) {
	return (
		<a 
			href={linkPath} 
			className={styles.cardLink} // Use VE style for link
			target={isExternal ? "_blank" : "_self"}
			rel={isExternal ? "noopener noreferrer" : ""}
		>
			<Box 
				className={styles.cardBox} // Use VE style for card box
				// Removed inline styles
			>
				<Box className={styles.iconBox}> {/* Use VE style for icon box */}
					{icon}
				</Box>
				<Heading as="h3" size="5" className={styles.heading}> {/* Use VE style for heading */}
					{title}
				</Heading>
				<Text as="p" size="2" className={styles.description}> {/* Use VE style for description */}
					{description}
				</Text>
				
				{/* Hover effect gradient - styled via VE */}
				<Box className={styles.hoverEffectGradient} />
			</Box>
		</a>
	);
}