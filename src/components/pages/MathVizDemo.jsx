import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Tabs, Card, Separator } from '@radix-ui/themes';
import CoordinateGrid from '../viz/CoordinateGrid';
import InteractiveCircle from '../viz/InteractiveCircle';
import VectorVisualization from '../viz/VectorVisualization';

const MathVizDemo = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  
  // Handle point selection in the coordinate grid
  const handlePointSelect = (point) => {
    setSelectedPoint(point);
  };
  
  return (
    <Box p="4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Heading size="6" gradient="to-right" mb="5">
        Math Visualization Components
      </Heading>
      
      <Text mb="5" size="3" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        A collection of interactive mathematical visualization components with a dark academia meets vaporwave aesthetic.
        These components can be used to create engaging, interactive educational experiences for mathematical concepts.
      </Text>

      <Tabs.Root defaultValue="coordinate">
        <Tabs.List>
          <Tabs.Trigger value="coordinate">Coordinate Grid</Tabs.Trigger>
          <Tabs.Trigger value="circle">Unit Circle</Tabs.Trigger>
          <Tabs.Trigger value="vector">Vector Operations</Tabs.Trigger>
          <Tabs.Trigger value="combined">Combined Demo</Tabs.Trigger>
        </Tabs.List>
        
        <Box pt="4">
          <Tabs.Content value="coordinate">
            <Card size="2" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
              <Flex direction="column" gap="4">
                <Heading size="4" mb="2">Interactive Coordinate Grid</Heading>
                <Text mb="3">
                  An interactive coordinate plane with panning and zooming capabilities. 
                  Click and drag to pan, use the mouse wheel to zoom, or use the controls below.
                </Text>
                
                <CoordinateGrid 
                  width={800} 
                  height={500} 
                  fullWidth 
                  onPointSelect={handlePointSelect}
                />
                
                {selectedPoint && (
                  <Box p="3" style={{ 
                    background: 'rgba(163, 119, 255, 0.1)', 
                    borderRadius: '4px',
                    border: '1px solid rgba(163, 119, 255, 0.3)'
                  }}>
                    <Text>
                      Selected point: ({selectedPoint.x.toFixed(2)}, {selectedPoint.y.toFixed(2)})
                    </Text>
                  </Box>
                )}
              </Flex>
            </Card>
          </Tabs.Content>
          
          <Tabs.Content value="circle">
            <Card size="2" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
              <Flex direction="column" gap="4">
                <Heading size="4" mb="2">Interactive Unit Circle</Heading>
                <Text mb="3">
                  An interactive unit circle visualization. Click on the circle to add points and explore 
                  trigonometric relationships. The component displays coordinates in both Cartesian and polar forms.
                </Text>
                
                <InteractiveCircle 
                  width={600} 
                  height={500} 
                  animated={true}
                  fullWidth
                  initialRadius={120}
                  maxRadius={200}
                  fixedPoints={[
                    { angle: Math.PI / 4, x: Math.cos(Math.PI / 4) * 120, y: Math.sin(Math.PI / 4) * 120 },
                    { angle: Math.PI / 2, x: Math.cos(Math.PI / 2) * 120, y: Math.sin(Math.PI / 2) * 120 },
                  ]}
                />
              </Flex>
            </Card>
          </Tabs.Content>
          
          <Tabs.Content value="vector">
            <Card size="2" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
              <Flex direction="column" gap="4">
                <Heading size="4" mb="2">Vector Operations</Heading>
                <Text mb="3">
                  Visualize vector operations including addition, subtraction, dot product, and cross product.
                  Drag the vector endpoints to modify them, or use the sliders for precise control.
                </Text>
                
                <VectorVisualization 
                  width={800} 
                  height={500} 
                  fullWidth
                  showComponents={true}
                  showAngles={true}
                />
              </Flex>
            </Card>
          </Tabs.Content>
          
          <Tabs.Content value="combined">
            <Card size="2" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
              <Flex direction="column" gap="4">
                <Heading size="4" mb="2">Combined Visualization</Heading>
                <Text mb="3">
                  This demo shows how the components can be combined to create more complex visualizations.
                  The example below shows a coordinate grid with a unit circle and vectors.
                </Text>
                
                <Flex gap="4" wrap="wrap">
                  <Box style={{ flex: '1 1 400px' }}>
                    <InteractiveCircle 
                      width={400} 
                      height={400} 
                      fullWidth
                      animated={true}
                      showControls={false}
                      initialRadius={100}
                    />
                  </Box>
                  
                  <Box style={{ flex: '1 1 400px' }}>
                    <VectorVisualization 
                      width={400} 
                      height={400} 
                      fullWidth
                      showControls={false}
                      defaultVectors={[
                        { x: 2, y: 1, color: 'rgba(255, 105, 180, 0.8)', label: 'v₁' },
                        { x: 0, y: 3, color: 'rgba(0, 255, 255, 0.8)', label: 'v₂' },
                      ]}
                    />
                  </Box>
                </Flex>
                
                <Separator size="4" my="3" />
                
                <Box>
                  <Heading size="3" mb="3">Component Properties</Heading>
                  <Text as="p" mb="2">
                    All components share these common customization options:
                  </Text>
                  <ul style={{ color: 'rgba(255, 255, 255, 0.7)', paddingLeft: '20px' }}>
                    <li>Customizable colors for background, grid, axes, and elements</li>
                    <li>Adjustable dimensions (width, height) and fullWidth option</li>
                    <li>Interactive controls that can be hidden if needed</li>
                    <li>Event handlers for integrating with your application</li>
                    <li>Responsive design that works on desktop and mobile</li>
                  </ul>
                </Box>
              </Flex>
            </Card>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
};

export default MathVizDemo;
