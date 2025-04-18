# Code Patterns

## Better Practices

### Responsive Design

Based on the documentation and industry practices, here's the recommended approach for handling responsive styles with Radix-UI and vanilla-extract in React.

Key recommendations:

1. Use Radix's responsive props for layout components
2. Use vanilla-extract media queries for complex responsive styles
3. Create a sprinkles configuration for design token consistency
4. Avoid mixing Radix's object syntax with vanilla-extract's CSS-in-JS

#### Canonical Approach

The recommended pattern is to use Radix's built-in responsive props with their theme components rather than mixing with vanilla-extract's CSS-in-JS approach directly.

example

```jsx
// Update your vanilla-extract styles to use media queries directly
import { style, media } from '@vanilla-extract/css';

export const trigger = style({
  padding: '8px 12px',
  fontSize: '15px',
  [media('md')]: {
    padding: '12px 16px',
    fontSize: '16px'
  }
});
```

#### Component-Level Styles

```jsx
// Use Radix's responsive props directly in JSX
<Box
  padding={{ initial: '2', sm: '3', md: '4' }}
  margin={{ sm: '1', md: '2' }}
>
```

#### Gobal Styles

```jsx
// Use vanilla-extract media queries with Sprinkles
import { sprinkles } from './sprinkles.css.ts';

export const responsiveClass = sprinkles({
  padding: {
    mobile: '2',
    tablet: '3',
    desktop: '4'
  }
});
```

#### Implementation Example

```jsx
// sprinkles.css.ts
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' }
  },
  defaultCondition: 'mobile',
  properties: {
    padding: {
      '0': '0',
      '1': '4px',
      '2': '8px',
      '3': '12px',
      '4': '16px'
    },
    // Add other properties as needed
  }
});

export const sprinkles = createSprinkles(responsiveProperties);
```

#### Further Reading

- <https://vanilla-extract.style/documentation/packages/sprinkles/>
- <https://vanilla-extract.style/documentation/packages/recipes/>
- <https://vanilla-extract.style/documentation/packages/dynamic/>
- <https://www.radix-ui.com/colors/docs/overview/usage#vanilla-extract>
- <https://www.radix-ui.com/themes/docs/components/theme>
- <https://www.radix-ui.com/themes/docs/theme/breakpoints>

### Hierarchy of Styling Methods (General Recommendation)

1. Radix Themes Props (e.g., m, p, color, width, height on `<Box>`, `<Text>` etc.):
   - Use For: Layout, spacing, basic typography, applying theme colors directly to Radix components. These props are designed to work seamlessly with the Radix theme tokens and responsive system. They often generate utility classes behind the scenes.
   - When: Your primary tool when working directly with Radix components (Box, Grid, Flex, Text, Heading, etc.) for common layout and theme-based styling.
2. Component-Specific .css.ts Files (using style, sprinkles, styleVariants):
   - Use For: Defining the specific styles for your custom components (like FeatureCard, Home, Sidebar) or applying more complex styles/overrides to Radix components that props don't cover. This includes:
     - Combining multiple sprinkle properties (sprinkles({...})).
     - Adding custom styles alongside sprinkles (style([sprinkles({...}), { custom styles }])).
     - Defining complex selectors (pseudo-classes like :hover, :focus, descendant/child selectors).
     - Creating variants of a component (styleVariants).
     - Animations (@keyframes imported and used).
     - Styles tightly coupled to the component's structure or unique visual appearance.
   - When: This should be your go-to for styling any non-trivial component logic or appearance. It keeps styles co-located with the component using them.
3. Theme File (theme.css.ts):
   - Use For:
     - Defining the theme contract (createTheme, vars). This is its main job.
     - Defining truly global styles that are fundamental to the theme (using globalStyle). Examples: base body font/color/background, ::selection styles, maybe base a tag styles if not handled by Radix Themes defaults.
   - When: Only for defining the theme and the most basic, theme-dependent global resets/defaults. Avoid defining component-specific styles here, even using globalStyle.
4. Global CSS Files (App.css, index.css):
   - Use For: Styles that are global but not directly part of the theme contract or component logic.
     - @import or @font-face for fonts.
     - Third-party CSS library imports (like katex.min.css).
     - Global animations (@keyframes float {}).
     - Very minimal resets if needed beyond what Radix/theme provides.
     - Maybe CSS for elements outside your main React app structure (if any).
   - When: For global setup and things not tied to components or the dynamic theme. Strongly avoid defining styles for specific components or classes used within components here.
5. Inline Styles (style={{...}}):
   - Use For: Highly dynamic styles based on runtime JavaScript calculations that cannot be reasonably achieved with CSS variables or pre-defined classes.
   - When: RARELY. Almost always prefer one of the above methods. Overusing inline styles bypasses the benefits of your design system, hurts performance, and makes overriding/managing styles difficult.
