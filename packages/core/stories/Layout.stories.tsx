import { type Meta, type StoryObj } from '@storybook/react-vite';
import { motion } from 'framer-motion';
import { type CSSProperties, type ReactNode } from 'react';

import { FlexRow, FlexColumn, type FlexRowProps } from '../src';

const meta = {
  title: 'Design/Layout/Flex',
  component: FlexRow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Flexible layout components for creating responsive and aligned layouts using flexbox.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<FlexRowProps<'div'>>;

type Story = StoryObj<typeof meta>;

// Helper component for demo boxes
const DemoBox = ({
  children,
  color = '#007bff',
  style,
  ...props
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
  [key: string]: any;
}) => (
  <div
    style={{
      padding: '1rem',
      backgroundColor: color,
      color: 'white',
      borderRadius: '0.25rem',
      textAlign: 'center',
      fontWeight: 'bold',
      minWidth: '3.75rem',
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const FlexRowBasic: Story = {
  name: 'FlexRow - Basic',
  render: () => (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Basic FlexRow</h3>
      <FlexRow style={{ gap: '0.75rem', padding: '16px', border: '0.125rem dashed #ccc' }}>
        <DemoBox>Item 1</DemoBox>
        <DemoBox color='#28a745'>Item 2</DemoBox>
        <DemoBox color='#dc3545'>Item 3</DemoBox>
      </FlexRow>
    </div>
  ),
};

export const FlexRowAlignment: Story = {
  name: 'FlexRow - Alignment',
  render: () => (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Justify Content: flex-start (default)</h4>
          <FlexRow
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              height: '5rem',
            }}
          >
            <DemoBox>1</DemoBox>
            <DemoBox color='#28a745'>2</DemoBox>
            <DemoBox color='#dc3545'>3</DemoBox>
          </FlexRow>
        </div>

        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Justify Content: center</h4>
          <FlexRow
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              height: '5rem',
              justifyContent: 'center',
            }}
          >
            <DemoBox>1</DemoBox>
            <DemoBox color='#28a745'>2</DemoBox>
            <DemoBox color='#dc3545'>3</DemoBox>
          </FlexRow>
        </div>

        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Justify Content: space-between</h4>
          <FlexRow
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              height: '5rem',
              justifyContent: 'space-between',
            }}
          >
            <DemoBox>1</DemoBox>
            <DemoBox color='#28a745'>2</DemoBox>
            <DemoBox color='#dc3545'>3</DemoBox>
          </FlexRow>
        </div>

        <div>
          <h4 style={{ marginBottom: '0.5rem' }}>Align Items: center</h4>
          <FlexRow
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              height: '7.5rem',
              alignItems: 'center',
            }}
          >
            <DemoBox style={{ height: '2.5rem' }}>Short</DemoBox>
            <DemoBox color='#28a745' style={{ height: '3.75rem' }}>
              Medium
            </DemoBox>
            <DemoBox color='#dc3545' style={{ height: '5rem' }}>
              Tall
            </DemoBox>
          </FlexRow>
        </div>
      </div>
    </div>
  ),
};

export const FlexColumnBasic: Story = {
  name: 'FlexColumn - Basic',
  render: () => (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Basic FlexColumn</h3>
      <FlexColumn
        style={{
          gap: '0.75rem',
          padding: '1rem',
          border: '0.125rem dashed #ccc',
          height: '18.75rem',
        }}
      >
        <DemoBox>Item 1</DemoBox>
        <DemoBox color='#28a745'>Item 2</DemoBox>
        <DemoBox color='#dc3545'>Item 3</DemoBox>
      </FlexColumn>
    </div>
  ),
};

export const FlexColumnAlignment: Story = {
  name: 'FlexColumn - Alignment',
  render: () => (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Justify Content: flex-start</h4>
          <FlexColumn
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              height: '12.5rem',
            }}
          >
            <DemoBox>1</DemoBox>
            <DemoBox color='#28a745'>2</DemoBox>
            <DemoBox color='#dc3545'>3</DemoBox>
          </FlexColumn>
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Justify Content: center</h4>
          <FlexColumn
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              height: '12.5rem',
              justifyContent: 'center',
            }}
          >
            <DemoBox>1</DemoBox>
            <DemoBox color='#28a745'>2</DemoBox>
            <DemoBox color='#dc3545'>3</DemoBox>
          </FlexColumn>
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Align Items: center</h4>
          <FlexColumn
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              height: '12.5rem',
              alignItems: 'center',
            }}
          >
            <DemoBox style={{ width: '3.75rem' }}>S</DemoBox>
            <DemoBox color='#28a745' style={{ width: '6.25rem' }}>
              Medium
            </DemoBox>
            <DemoBox color='#dc3545' style={{ width: '8.75rem' }}>
              Large Size
            </DemoBox>
          </FlexColumn>
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveLayout: Story = {
  name: 'Responsive Layout',
  render: () => (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Responsive Layout Example</h3>
      <FlexColumn style={{ gap: '1rem' }}>
        {/* Header */}
        <FlexRow
          style={{
            padding: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '0.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Header</div>
          <FlexRow style={{ gap: '0.75rem' }}>
            <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem' }}>
              Menu
            </button>
            <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem' }}>
              Login
            </button>
          </FlexRow>
        </FlexRow>

        {/* Main Content */}
        <FlexRow style={{ gap: '1rem', minHeight: '18.75rem' }}>
          {/* Sidebar */}
          <FlexColumn
            style={{
              flex: '0 0 12.5rem',
              padding: '1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '0.5rem',
              gap: '0.5rem',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Sidebar</h4>
            <DemoBox color='#6c757d' style={{ padding: '0.5rem', fontSize: '0.875rem' }}>
              Nav Item 1
            </DemoBox>
            <DemoBox color='#6c757d' style={{ padding: '0.5rem', fontSize: '0.875rem' }}>
              Nav Item 2
            </DemoBox>
            <DemoBox color='#6c757d' style={{ padding: '0.5rem', fontSize: '0.875rem' }}>
              Nav Item 3
            </DemoBox>
          </FlexColumn>

          {/* Content */}
          <FlexColumn style={{ flex: 1, gap: '1rem' }}>
            <DemoBox color='#28a745' style={{ height: '6.25rem', fontSize: '1rem' }}>
              Main Content Area
            </DemoBox>
            <FlexRow style={{ gap: '1rem' }}>
              <DemoBox color='#ffc107' style={{ flex: 1, height: '7.5rem' }}>
                Card 1
              </DemoBox>
              <DemoBox color='#fd7e14' style={{ flex: 1, height: '7.5rem' }}>
                Card 2
              </DemoBox>
              <DemoBox color='#e83e8c' style={{ flex: 1, height: '7.5rem' }}>
                Card 3
              </DemoBox>
            </FlexRow>
          </FlexColumn>
        </FlexRow>

        {/* Footer */}
        <FlexRow
          style={{
            padding: '1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            borderRadius: '0.5rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>Footer Content</div>
        </FlexRow>
      </FlexColumn>
    </div>
  ),
};

export const FlexProperties: Story = {
  name: 'Flex Properties',
  render: () => (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Flex Grow</h3>
          <FlexRow
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              height: '5rem',
            }}
          >
            <DemoBox style={{ flex: '0 0 6.25rem' }}>Fixed 100px</DemoBox>
            <DemoBox color='#28a745' style={{ flex: 1 }}>
              Flex: 1
            </DemoBox>
            <DemoBox color='#dc3545' style={{ flex: 2 }}>
              Flex: 2
            </DemoBox>
          </FlexRow>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Flex Wrap</h3>
          <FlexRow
            style={{
              gap: '0.5rem',
              padding: '0.75rem',
              border: '0.0625rem solid #ccc',
              flexWrap: 'wrap',
              width: '18.75rem',
            }}
          >
            <DemoBox style={{ width: '5rem' }}>1</DemoBox>
            <DemoBox color='#28a745' style={{ width: '5rem' }}>
              2
            </DemoBox>
            <DemoBox color='#dc3545' style={{ width: '5rem' }}>
              3
            </DemoBox>
            <DemoBox color='#ffc107' style={{ width: '5rem' }}>
              4
            </DemoBox>
            <DemoBox color='#6f42c1' style={{ width: '5rem' }}>
              5
            </DemoBox>
            <DemoBox color='#fd7e14' style={{ width: '5rem' }}>
              6
            </DemoBox>
          </FlexRow>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Gap Variations</h3>
          <FlexColumn style={{ gap: '1rem' }}>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>No Gap</h4>
              <FlexRow style={{ padding: '0.75rem', border: '0.0625rem solid #ccc' }}>
                <DemoBox>1</DemoBox>
                <DemoBox color='#28a745'>2</DemoBox>
                <DemoBox color='#dc3545'>3</DemoBox>
              </FlexRow>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Small Gap (4px)</h4>
              <FlexRow
                style={{ gap: '0.25rem', padding: '0.75rem', border: '0.0625rem solid #ccc' }}
              >
                <DemoBox>1</DemoBox>
                <DemoBox color='#28a745'>2</DemoBox>
                <DemoBox color='#dc3545'>3</DemoBox>
              </FlexRow>
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Large Gap (24px)</h4>
              <FlexRow
                style={{ gap: '1.5rem', padding: '0.75rem', border: '0.0625rem solid #ccc' }}
              >
                <DemoBox>1</DemoBox>
                <DemoBox color='#28a745'>2</DemoBox>
                <DemoBox color='#dc3545'>3</DemoBox>
              </FlexRow>
            </div>
          </FlexColumn>
        </div>
      </div>
    </div>
  ),
};

export const CustomElements: Story = {
  name: 'Custom Elements',
  render: () => (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>FlexRow as different elements</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <FlexRow
              as='header'
              style={{
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#e9ecef',
                borderRadius: '0.25rem',
              }}
            >
              <DemoBox>Header</DemoBox>
              <DemoBox color='#28a745'>Navigation</DemoBox>
            </FlexRow>

            <FlexRow
              as='nav'
              style={{
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.25rem',
              }}
            >
              <DemoBox color='#6c757d'>Home</DemoBox>
              <DemoBox color='#6c757d'>About</DemoBox>
              <DemoBox color='#6c757d'>Contact</DemoBox>
            </FlexRow>

            <FlexRow
              as='section'
              style={{
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#fff3cd',
                borderRadius: '0.25rem',
              }}
            >
              <DemoBox color='#ffc107'>Section</DemoBox>
              <DemoBox color='#fd7e14'>Content</DemoBox>
            </FlexRow>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>FlexColumn as different elements</h3>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <FlexColumn
              as='aside'
              style={{
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: '#d1ecf1',
                borderRadius: '0.25rem',
                flex: 1,
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Aside</h4>
              <DemoBox color='#17a2b8' style={{ padding: '0.5rem', fontSize: '0.875rem' }}>
                Sidebar Item 1
              </DemoBox>
              <DemoBox color='#17a2b8' style={{ padding: '0.5rem', fontSize: '0.875rem' }}>
                Sidebar Item 2
              </DemoBox>
            </FlexColumn>

            <FlexColumn
              as='main'
              style={{
                gap: '0.75rem',
                padding: '1rem',
                backgroundColor: '#d4edda',
                borderRadius: '0.25rem',
                flex: 2,
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0' }}>Main Content</h4>
              <DemoBox color='#28a745'>Article 1</DemoBox>
              <DemoBox color='#28a745'>Article 2</DemoBox>
            </FlexColumn>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithFramerMotion: Story = {
  name: 'With Framer Motion',
  render: () => (
    <div style={{ width: '100%', padding: '1.25rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Animated Layout with Framer Motion</h3>
      <FlexColumn style={{ gap: '1rem' }}>
        <FlexRow
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            gap: '0.75rem',
            padding: '1rem',
            backgroundColor: '#e3f2fd',
            borderRadius: '0.5rem',
          }}
        >
          <DemoBox color='#2196f3'>Animated</DemoBox>
          <DemoBox color='#4caf50'>FlexRow</DemoBox>
          <DemoBox color='#ff9800'>Components</DemoBox>
        </FlexRow>

        <FlexColumn
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            gap: '0.5rem',
            padding: '1rem',
            backgroundColor: '#fce4ec',
            borderRadius: '0.5rem',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Animated FlexColumn</h4>
          <DemoBox color='#e91e63' style={{ padding: '0.5rem' }}>
            Item 1
          </DemoBox>
          <DemoBox color='#9c27b0' style={{ padding: '0.5rem' }}>
            Item 2
          </DemoBox>
          <DemoBox color='#673ab7' style={{ padding: '0.5rem' }}>
            Item 3
          </DemoBox>
        </FlexColumn>
      </FlexColumn>
    </div>
  ),
};

export default meta;
