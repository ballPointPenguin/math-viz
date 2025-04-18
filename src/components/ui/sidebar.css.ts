import { style, keyframes } from '@vanilla-extract/css';
import { sprinkles } from '../../sprinkles.css.ts';
import { vars } from '../../theme.css.ts';

const slideDown = keyframes({
  from: {
    height: 0,
    opacity: 0
  },
  to: {
    height: 'var(--radix-navigation-menu-content-height)',
    opacity: 1
  }
});

const slideUp = keyframes({
  from: {
    height: 'var(--radix-navigation-menu-content-height)',
    opacity: 1
  },
  to: {
    height: 0,
    opacity: 0
  }
});

export const root = style({
  width: '100%'
});

const listBase = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const list = style([
  listBase,
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: { initial: '2', sm: '2' },
    paddingTop: { initial: '2' },
    paddingBottom: { initial: '2' },
    paddingLeft: { initial: '2' },
    paddingRight: { initial: '2' },
  })
]);

const triggerBase = style({
  all: 'unset',
  boxSizing: 'border-box',
  width: '100%'
});

export const trigger = style([
  triggerBase,
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingX: { initial: '3', sm: '3' },
    paddingY: { initial: '2', sm: '2' },
    fontSize: { initial: '16px', sm: '15px' },
    lineHeight: 1,
    color: 'text',
    backgroundColor: { initial: 'surface', sm: 'surface' },
    borderRadius: { initial: 'lg', sm: 'md' },
    cursor: 'pointer',
  })
]);

export const triggerHoverFocus = style({
  selectors: {
    '&:hover:not([data-state="open"])': {
      backgroundColor: vars.colors.surfaceHover,
    },
    '&[data-state="open"]': {
      backgroundColor: vars.colors.surfaceActive
    }
  }
});

export const caretDown = style({
  color: vars.colors.textMuted,
  transition: 'transform 250ms ease',
  selectors: {
    [`${trigger}[data-state="open"] &`]: {
      transform: 'rotate(-180deg)'
    }
  }
});

const contentBase = style({
  overflow: 'hidden',
  selectors: {
    '&[data-state="open"]': {
      animationName: slideDown,
      animationDuration: '250ms',
      animationTimingFunction: 'ease',
    },
    '&[data-state="closed"]': {
      animationName: slideUp,
      animationDuration: '250ms',
      animationTimingFunction: 'ease',
    }
  }
});

export const content = style([
  contentBase,
  sprinkles({
    paddingTop: { initial: '2', sm: '2' },
    paddingBottom: { initial: '2', sm: '2' },
    paddingRight: { initial: '3', sm: '3' },
    paddingLeft: { initial: '4', sm: '3' },
    backgroundColor: { initial: 'surfaceActive', sm: 'background' },
    borderRadius: { initial: 'lg' },
    marginTop: { initial: '2' }
  })
]);

export const linkList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2']
});

const linkBase = style({
  textDecoration: 'none',
  boxSizing: 'border-box'
});

export const link = style([
  linkBase,
  sprinkles({
    display: 'block',
    paddingX: { initial: '3', sm: '3' },
    paddingY: { initial: '2', sm: '2' },
    fontSize: { initial: '16px', sm: '15px' },
    color: 'textMuted',
    borderRadius: 'md',
    transition: 'all 0.2s ease'
  })
]);

export const linkHover = style({
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.surfaceHover,
      color: vars.colors.accent2,
    }
  }
});

export const linkHoverTransformDesktop = style({
  '@media': {
    'screen and (min-width: 768px)': {
      selectors: {
        '&:hover': {
          transform: 'translateX(3px)'
        }
      }
    }
  }
});

export const activeLink = style({
  backgroundColor: `${vars.colors.surfaceActive} !important`,
  color: `${vars.colors.accent1} !important`,
  borderLeft: `2px solid ${vars.colors.accent1}`,
  boxShadow: vars.shadows.glow,
  selectors: {
    [`&.${link}`]: {
    }
  }
}); 