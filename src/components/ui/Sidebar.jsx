import { CaretDownIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import * as styles from './sidebar.css';
import { Box, Text, Heading } from '@radix-ui/themes';
import { clsx } from 'clsx';

// Navigation structure data to make the code more DRY
const navigationData = [
  {
    id: 'trigonometry',
    label: 'Trigonometry',
    links: [
      { to: "/unit-circle", label: "Unit Circle" },
      { to: "/sine-cosine", label: "Sine & Cosine" },
      { to: "/sine-cosine-interactive", label: "Sine & Cosine Interactive" },
      { to: "/tangent-explorer", label: "Tangent Explorer" },
      { to: "/right-triangle-playground", label: "Right Triangle Playground" },
      { to: "/mafs-unit-circle-sine", label: "Unit Circle → Sine Wave" },
      { to: "/mafs-trig-functions", label: "Trig Functions Explorer" },
    ]
  },
  {
    id: 'linearAlgebra',
    label: 'Linear Algebra',
    links: [
      { to: "/vector-addition", label: "Vector Addition" },
      { to: "/vector-operations", label: "Vector Operations" },
      { to: "/cosine-dot-product", label: "Cosine & Dot Product" },
    ]
  },
  {
    id: 'demos',
    label: 'Demos & Utilities',
    links: [
      { to: "/p5-demo", label: "P5 Demo" },
      { to: "/mafs-hello", label: "Mafs Hello" },
    ]
  }
];

// Custom Link component to handle both NavLink and NavigationMenu.Link
const CustomLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  // Combine base link class, hover class, and active class conditionally
  const linkClassName = clsx(
    styles.link, 
    styles.linkHover, // Apply hover styles
    styles.linkHoverTransformDesktop, // Apply desktop hover transform
    isActive && styles.activeLink // Apply active styles conditionally
  );

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <NavLink
        to={to}
        className={linkClassName}
      >
        {children}
      </NavLink>
    </NavigationMenu.Link>
  );
};

export default function Sidebar() {
  // Keep the base class for App.css styles
  const sidebarClassName = 'sidebar'; 

  return (
    <Box 
      as="aside" 
      className={sidebarClassName}
      // zIndex handled by .sidebar class in App.css
    >
      <Box className="sidebar-header" 
        mb="3" // Radix space token
        px="3" // Radix space token
        pt="3" // Radix space token
        // Responsive background using Box props
        style={{
          background: {
            initial: 'var(--colors-backgroundAlt)',
            sm: 'transparent'
          }
        }}
      >
        <Heading 
          align="center" 
          size="6" // Adjust size as needed 
          style={{
            // Keep gradient text style
            background: "linear-gradient(90deg, var(--colors-accent1), var(--colors-accent2))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Math Viz
        </Heading>
        <Box 
          height="2px" 
          mx="auto"
          mt="2"
          style={{
            background: "linear-gradient(90deg, var(--colors-accent1), var(--colors-accent2))",
            // Use responsive width prop
            width: { initial: '120px', sm: '80px' }
          }}
        />
      </Box>
      
      <Box 
        px="3" // Radix space token
        flexGrow="1"
        overflowY="auto"
        style={{
          background: {
            initial: 'var(--colors-backgroundAlt)',
            sm: 'transparent'
          }
        }}
      >
        <NavigationMenu.Root orientation="vertical" className={styles.root}>
          <NavigationMenu.List className={styles.list}>
            {/* Render navigation sections from data */}
            {navigationData.map(section => (
              <NavigationMenu.Item key={section.id} value={section.id}>
                <NavigationMenu.Trigger 
                  className={clsx(styles.trigger, styles.triggerHoverFocus)}
                >
                  {section.label}
                  <CaretDownIcon className={styles.caretDown} aria-hidden />
                </NavigationMenu.Trigger>
                
                <NavigationMenu.Content className={styles.content}>
                  <nav className={styles.linkList}>
                    {section.links.map(link => (
                      <CustomLink
                        key={link.to}
                        to={link.to}
                      >
                        {link.label}
                      </CustomLink>
                    ))}
                  </nav>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ))}

            {/* Home Link - Special case */}
            <NavigationMenu.Item>
              <CustomLink to="/">
                Home
              </CustomLink>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </Box>
      
      {/* Footer for sidebar */}
      <Box 
        mt="auto" 
        p="3" // Radix space token 
        style={{
          borderTop: "1px solid var(--colors-border)", 
          fontSize: "0.8rem",
          color: "var(--colors-textMuted)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: {
            initial: 'var(--colors-backgroundAlt)',
            sm: 'transparent'
          }
        }}
      >
        <InfoCircledIcon />
        <Text as="span">Math Viz v0.1</Text>
      </Box>
    </Box>
  );
}