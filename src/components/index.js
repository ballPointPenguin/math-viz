// Math Visualization Component Library
// Export all available components

// Interactive Visualization Components
export { default as CoordinateGrid } from './CoordinateGrid';
export { default as InteractiveCircle } from './InteractiveCircle';
export { default as VectorVisualization } from './VectorVisualization';

// Demo Components
export { default as MathVizDemo } from './MathVizDemo';

// Info about the component library
export const MATH_VIZ_INFO = {
  version: '0.1.0',
  description: 'A collection of interactive math visualization components with dark academia and vaporwave aesthetics',
  author: 'ballPointPenguin',
  components: [
    {
      name: 'CoordinateGrid',
      description: 'Interactive coordinate plane with panning and zooming',
      tags: ['p5.js', 'coordinates', 'grid', 'interactive']
    },
    {
      name: 'InteractiveCircle',
      description: 'Unit circle visualization with interactive points',
      tags: ['p5.js', 'trigonometry', 'circle', 'interactive']
    },
    {
      name: 'VectorVisualization',
      description: 'Vector operations visualization (addition, subtraction, dot product)',
      tags: ['p5.js', 'linear algebra', 'vectors', 'interactive']
    }
  ]
};
