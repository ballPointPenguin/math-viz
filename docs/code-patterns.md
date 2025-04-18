# Code Patterns

## Guiding Principles

Our primary approach is to leverage **Radix UI Themes props and components** for styling whenever possible. This ensures consistency with the Radix ecosystem, utilizes its built-in theming and responsive features effectively, and often leads to cleaner component code.

**Vanilla Extract (VE)**, including `sprinkles`, should be used more selectively for cases where Radix props are insufficient or less suitable. These include:

* Defining complex CSS selectors (e.g., intricate `:hover` states, `:nth-child`, attribute selectors, complex descendant/sibling selectors).
* Implementing custom animations (`@keyframes`).
* Applying styles that are not directly covered by Radix props or require combining multiple properties in a way not easily expressible through props.
* Styling custom non-Radix elements within components.
* Creating highly reusable style variants (`styleVariants`) for custom components.
* Defining the core theme contract (`theme.css.ts`) and necessary global styles (`globalStyle`).

## Styling Hierarchy (Recommended Order of Preference)

1. **Radix Themes Props (e.g., `m`, `p`, `color`, `width`, `height`, `radius` on `<Box>`, `<Text>`, etc.):**
    * **Use For:** Layout, spacing, typography, applying theme colors/radii/shadows directly to Radix components. These props integrate seamlessly with the Radix theme tokens and responsive system.
    * **When:** This is your **default and primary tool** when working with Radix components (`Box`, `Grid`, `Flex`, `Text`, `Heading`, etc.) for common layout, spacing, and theme-based styling.

2. **Component-Specific `.css.ts` Files (using VE: `style`, `sprinkles`, `styleVariants`, `@keyframes`):**
    * **Use For:** Applying styles in the specific scenarios outlined in the *Guiding Principles* above where Radix props are insufficient. This includes complex selectors, custom animations, unique component styles not easily covered by Radix, styling non-Radix elements, or creating reusable style variants for custom components.
    * **When:** Reach for this method **only after** determining that Radix props cannot easily or cleanly achieve the desired styling for a specific component (like `FeatureCard`, `Sidebar`, custom visualization elements).

3. **Theme File (`theme.css.ts`):**
    * **Use For:**
        * Defining the core VE theme contract (`createTheme`, `vars`) if needed for custom VE variables used in exceptional cases.
        * Defining essential global styles (`globalStyle`) that are fundamental to the *overall application appearance* and not handled by Radix Themes defaults (e.g., base body styles, `::selection`, specific resets).
    * **When:** Primarily for setting up the theme contract and minimal, truly global base styles. Avoid defining component-specific styles here.

4. **Global CSS Files (`App.css`, `index.css`):**
    * **Use For:** Styles that are global but outside the VE theme contract or component logic.
        * `@import` or `@font-face` for fonts.
        * Third-party CSS library imports (e.g., `katex.min.css`).
        * Global animations (`@keyframes`) if *not* tied to specific components styled with VE.
        * Minimal resets beyond Radix/theme defaults.
    * **When:** For global setup and external resources. Strongly avoid defining styles for specific components or classes used within components here.

5. **Inline Styles (`style={{...}}`):**
    * **Use For:** Highly dynamic styles based on runtime JavaScript calculations (e.g., element position calculated dynamically) that cannot be reasonably achieved with CSS variables or pre-defined classes.
    * **When:** **RARELY.** This should be a last resort. Overusing inline styles bypasses the design system, can harm performance, and makes overriding/managing styles difficult.

## Responsive Design

Follow the styling hierarchy:

1. **Radix Responsive Props:** Use Radix's object syntax for responsive props (`padding={{ initial: '2', sm: '3' }}`) on Radix components. This is the preferred method.
2. **Vanilla Extract Media Queries:** If styling requires VE (per the hierarchy), use VE's `@media` blocks within your `.css.ts` files or define responsive conditions in `sprinkles` if using sprinkles for those specific styles.

```jsx
// Preferred: Radix Responsive Props
<Box
  padding={{ initial: '2', sm: '3', md: '4' }}
  display={{ initial: 'block', md: 'flex' }}
>
  {/* ... */}
</Box>

// Secondary: VE Media Queries (if using VE for the component's style)
// In component.css.ts
import { style } from '@vanilla-extract/css';

export const customElementStyle = style({
  // Base styles
  color: 'blue',
  
  '@media': {
    'screen and (min-width: 768px)': {
      // Tablet+ styles
      color: 'red',
    },
    'screen and (min-width: 1024px)': {
      // Desktop+ styles
      fontSize: '20px',
    }
  }
});
```

Avoid mixing Radix's responsive object syntax directly within VE `style` definitions.

## Further Reading

* <https://www.radix-ui.com/themes/docs/overview/styling>
* <https://www.radix-ui.com/themes/docs/theme/breakpoints>
* <https://www.radix-ui.com/themes/docs/components/box#layout-props>
* <https://vanilla-extract.style/documentation/styling/>
* <https://vanilla-extract.style/documentation/packages/sprinkles/>
