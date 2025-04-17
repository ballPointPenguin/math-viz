import { CaretDownIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

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

export default function Sidebar({ isVisible, onToggleVisibility }) {
  const [openMenus, setOpenMenus] = useState({
    trigonometry: false,
    linearAlgebra: false,
    demos: false
  });
  const location = useLocation();

  // Auto-expand the current section when a page within it is active
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which section contains the current path and open it
    for (const section of navigationData) {
      const pathInSection = section.links.some(link => link.to === currentPath);
      if (pathInSection) {
        setOpenMenus(prev => ({ ...prev, [section.id]: true }));
      }
    }
  }, [location.pathname]);

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  // Determine if we're in mobile view (will be used for style adjustments)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Add a listener for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use CSS classes for responsive styling
  const sidebarClasses = `sidebar ${isVisible ? '' : 'hidden'} ${isMobileView ? 'mobile' : ''}`;

  return (
    <aside className={sidebarClasses}>
      <div className="sidebar-header" style={{ 
        marginBottom: "1.5rem", 
        padding: "1.5rem 1rem 0",
        background: isMobileView ? "var(--colors-backgroundAlt)" : "transparent"
      }}>
        <h1 style={{ 
          fontSize: isMobileView ? "1.75rem" : "1.5rem", 
          margin: "0", 
          fontFamily: "var(--fonts-heading)",
          background: "linear-gradient(90deg, var(--colors-accent1), var(--colors-accent2))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center"
        }}>
          Math Viz
        </h1>
        <div style={{ 
          height: "2px", 
          background: "linear-gradient(90deg, var(--colors-accent1), var(--colors-accent2))",
          margin: "8px auto 0",
          width: isMobileView ? "120px" : "80px"
        }} />
      </div>
      
      <div style={{ 
        padding: "0 1rem", 
        overflowY: "auto", 
        flex: 1,
        background: isMobileView ? "var(--colors-backgroundAlt)" : "transparent"
      }}>
        <NavigationMenu.Root orientation="vertical" className="SidebarNavRoot">
          <NavigationMenu.List className={`SidebarNavList ${isMobileView ? 'mobile' : ''}`}>
            {/* Render navigation sections from data */}
            {navigationData.map(section => (
              <NavigationMenu.Item key={section.id}>
                <NavigationMenu.Trigger 
                  className={`SidebarNavTrigger ${isMobileView ? 'mobile' : ''}`}
                  onClick={() => toggleMenu(section.id)}
                  data-state={openMenus[section.id] ? 'open' : 'closed'}
                >
                  {section.label} <CaretDownIcon style={{ 
                    marginLeft: 4,
                    transform: openMenus[section.id] ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }} />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content 
                  className={`SidebarNavContent ${isMobileView ? 'mobile' : ''}`}
                  data-state={openMenus[section.id] ? 'open' : 'closed'}
                >
                  <nav
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {section.links.map(link => (
                      <NavigationMenu.Link asChild key={link.to}>
                        <NavLink
                          to={link.to}
                          className={({ isActive }) =>
                            isActive 
                              ? `navLink activeNavLink ${isMobileView ? 'mobile' : ''}` 
                              : `navLink ${isMobileView ? 'mobile' : ''}`
                          }
                        >
                          {link.label}
                        </NavLink>
                      </NavigationMenu.Link>
                    ))}
                  </nav>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ))}

            {/* Home Link - Special case */}
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive 
                      ? `navLink activeNavLink ${isMobileView ? 'mobile' : ''}` 
                      : `navLink ${isMobileView ? 'mobile' : ''}`
                  }
                >
                  Home
                </NavLink>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
      
      {/* Footer for sidebar */}
      <div style={{ 
        marginTop: "auto", 
        padding: "1rem", 
        borderTop: "1px solid var(--colors-border)", 
        fontSize: "0.8rem",
        color: "var(--colors-textMuted)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: isMobileView ? "var(--colors-backgroundAlt)" : "transparent" 
      }}>
        <InfoCircledIcon />
        <span>Math Viz v0.1</span>
      </div>
    </aside>
  );
}