# math-viz

**math-viz** is an interactive, exploratory React + Vite application for visualizing mathematical concepts. It combines creative sketching, declarative graphing, and formula rendering into a single toolkit to help build rich math-driven experiences.

## Key Features

- **p5.js** (via `@p5-wrapper/react`): Embeddable creative coding sketches for dynamic visuals.
- **Mafs**: Declarative coordinate-system graphs and math visualizations.
- **mathjs**: Runtime evaluation and manipulation of mathematical expressions.
- **KaTeX**: High-performance LaTeX rendering for inline and block math.
- **Radix UI Themes**: Themeable, accessible UI primitives with token-based styling.
- **Vanilla Extract (VE)**: Utility CSS (`sprinkles`), custom style variants, and global theme contracts for advanced styling needs.

## Styling & Code Patterns

1. **Radix Theme Props**: Preferred for layout, spacing, typography, colors, and radii on Radix components.
2. **VE `.css.ts` Files**: Used when Radix props fall short (complex selectors, keyframes, reusable style variants).
3. **Sprinkles**: Utility-style composition of design tokens across components.
4. **Global CSS**: Limited to external imports (fonts, third-party CSS) and minimal resets (`index.css`, `App.css`).

For more details on styling patterns, see [docs/code-patterns.md](docs/code-patterns.md).

## Project Structure

```
src/
  assets/           # Static images, media, and other assets
  components/       # Reusable React components
  utils/            # Helper functions & utilities

  main.jsx          # Application entry point (mounts React)
  App.jsx & App.css # Top-level App component + styles
  Layout.jsx &      # Default app layout component + VE styles
    Layout.css.ts

  theme.css.ts      # VE theme contract & global style definitions
  sprinkles.css.ts  # VE sprinkles for design-token utilities
  index.css         # Global CSS imports & minimal resets
```

## Getting Started

Ensure you have Node.js (v16+) installed, then:

```bash
npm install
npm run dev
```

Open <http://localhost:5173> in your browser to explore.

## Further Reading

- **Tools**: [docs/tools.md](docs/tools.md)
- **Code Patterns**: [docs/code-patterns.md](docs/code-patterns.md)

---

*This project is in active, greenfield development—expect rapid iteration!*
