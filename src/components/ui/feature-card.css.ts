import { style } from '@vanilla-extract/css';
import { sprinkles } from '../../sprinkles.css.ts';
import { vars } from '../../theme.css.ts';

export const cardLink = style({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  height: '100%', // Ensure link takes full height for clickable area
  selectors: {
    '&:hover': {
      // We apply hover effects to children via descendant selectors below
    }
  }
});

export const cardBox = style([
  sprinkles({
    padding: '4',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 'lg',
    backgroundColor: 'surface',
    border: '1px solid',
    borderColor: 'border',
    transition: 'all 0.3s ease',
  }),
  {
    height: '100%', // Ensure Box takes full height inside link
    selectors: {
      [`${cardLink}:hover &`]: {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        borderColor: vars.colors.border,
        backgroundColor: vars.colors.surfaceHover,
      }
    }
  }
]);

export const iconBox = style([
  sprinkles({
    marginBottom: '3',
    fontSize: '1.5rem', // Using a specific size here, could be added to sprinkles/theme if reused
    color: 'accent2',
    transition: 'all 0.3s ease', // Added transition for icon hover effect
  }),
  {
    selectors: {
      [`${cardLink}:hover &`]: { // Target icon box when the link is hovered
        transform: 'scale(0.9)',
        color: vars.colors.accent1,
        filter: 'drop-shadow(0 0 8px rgba(163, 119, 255, 0.5))', // Consider theme variable for shadow color
      }
    }
  }
]);

export const heading = style([
  sprinkles({
    marginBottom: '2',
    color: 'text',
  }),
  // Radix Heading component handles sizing, so no need to duplicate font-size here
]);

export const description = style([
  sprinkles({
    color: 'textMuted',
    fontSize: '2', // Map to theme font size if needed
    lineHeight: 1.5,
  })
]);

export const hoverEffectGradient = style([
  sprinkles({
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '2px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  }),
  {
    background: `linear-gradient(90deg, ${vars.colors.accent1}, ${vars.colors.accent2})`,
    selectors: {
      [`${cardLink}:hover &`]: {
        opacity: 1,
      }
    }
  }
]); 