import type { Meta, StoryObj } from '@storybook/react-vite';

import { AccordionGroup, AccordionItem } from '../src';
import type { AccordionGroupProps } from '../src/ui/accordion/model/accordion-type';

const meta = {
  title: 'Design/Molecules/Accordion',
  component: AccordionGroup,
  parameters: {
    layout: 'padded',
    docs: {},
  },
  tags: ['autodocs'],
  args: {
    type: 'single',
    defaultOpenItems: [],
    style: {},
    children: (
      <>
        <AccordionItem title='What is React?'>
          <div style={{ padding: '1rem 0' }}>
            React is a JavaScript library for building user interfaces. It lets you compose complex
            UIs from small and isolated pieces of code called components.
          </div>
        </AccordionItem>
        <AccordionItem title='What is TypeScript?'>
          <div style={{ padding: '1rem 0' }}>
            TypeScript is a programming language developed and maintained by Microsoft. It is a
            strict syntactical superset of JavaScript and adds optional static type checking to the
            language.
          </div>
        </AccordionItem>
        <AccordionItem title='What is Framer Motion?'>
          <div style={{ padding: '1rem 0' }}>
            Framer Motion is a production-ready motion library for React. It brings declarative
            animations, effortless layout transitions and gestures while maintaining HTML and SVG
            semantics.
          </div>
        </AccordionItem>
      </>
    ),
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description:
        'Accordion expansion behavior - single allows only one open item, multiple allows multiple',
      table: {
        type: { summary: 'AccordionType' },
        defaultValue: { summary: 'single' },
      },
    },
    defaultOpenItems: {
      control: 'object',
      description:
        'Array of item indices that should be open by default (0-based). Example: [0, 1, 2]',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
    },
    style: {
      control: 'object',
      description: 'Custom CSS styles to override default styling',
      table: {
        type: { summary: 'CSSProperties' },
      },
    },
    onItemChange: {
      control: false,
      description: 'Callback fired when open items change',
      table: {
        type: { summary: '(openItems: number[]) => void' },
      },
    },
    children: {
      control: false,
      description: 'AccordionItem components - automatically indexed by position',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<AccordionGroupProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <AccordionGroup {...args}>
      <AccordionItem title='What is React?'>
        <div style={{ padding: '1rem 0' }}>
          React is a JavaScript library for building user interfaces. It lets you compose complex
          UIs from small and isolated pieces of code called components.
        </div>
      </AccordionItem>
      <AccordionItem title='What is TypeScript?'>
        <div style={{ padding: '1rem 0' }}>
          TypeScript is a programming language developed and maintained by Microsoft. It is a strict
          syntactical superset of JavaScript and adds optional static type checking to the language.
        </div>
      </AccordionItem>
      <AccordionItem title='What is Framer Motion?'>
        <div style={{ padding: '1rem 0' }}>
          Framer Motion is a production-ready motion library for React. It brings declarative
          animations, effortless layout transitions and gestures while maintaining HTML and SVG
          semantics.
        </div>
      </AccordionItem>
    </AccordionGroup>
  ),
  args: {
    type: 'multiple',
  },
};

export const Single: Story = {
  render: (args) => (
    <AccordionGroup {...args} type='single' defaultOpenItems={[0]}>
      <AccordionItem title='Getting Started'>
        <div style={{ padding: '1rem 0' }}>
          <h4>Installation</h4>
          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
            npm install @jigoooo/shared-ui
          </pre>
          <p>Import the components you need and start building!</p>
        </div>
      </AccordionItem>
      <AccordionItem title='API Reference'>
        <div style={{ padding: '1rem 0' }}>
          <p>
            <strong>AccordionGroup Props:</strong>
          </p>
          <ul>
            <li>
              <code>type</code>: single | multiple
            </li>
            <li>
              <code>style</code>: CSSProperties
            </li>
            <li>
              <code>children</code>: ReactNode
            </li>
          </ul>
        </div>
      </AccordionItem>
      <AccordionItem title='Examples'>
        <div style={{ padding: '1rem 0' }}>
          <p>Check out our comprehensive examples in the playground section.</p>
        </div>
      </AccordionItem>
    </AccordionGroup>
  ),
  args: {
    type: 'single',
  },
};

export const Multiple: Story = {
  render: (args) => (
    <AccordionGroup {...args} type='multiple' defaultOpenItems={[0, 2]}>
      <AccordionItem title='Frontend Technologies'>
        <div style={{ padding: '1rem 0' }}>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Next.js</li>
          </ul>
        </div>
      </AccordionItem>
      <AccordionItem title='Backend Technologies'>
        <div style={{ padding: '1rem 0' }}>
          <ul>
            <li>Node.js</li>
            <li>Express</li>
            <li>PostgreSQL</li>
            <li>Redis</li>
          </ul>
        </div>
      </AccordionItem>
      <AccordionItem title='DevOps Tools'>
        <div style={{ padding: '1rem 0' }}>
          <ul>
            <li>Docker</li>
            <li>Kubernetes</li>
            <li>GitHub Actions</li>
            <li>AWS</li>
          </ul>
        </div>
      </AccordionItem>
    </AccordionGroup>
  ),
  args: {
    type: 'multiple',
  },
};

export const PreExpanded: Story = {
  render: (args) => (
    <AccordionGroup {...args} type='single' defaultOpenItems={[0]}>
      <AccordionItem title='Frequently Asked Question'>
        <div style={{ padding: '1rem 0' }}>
          <p>
            <strong>Q: How do I customize the accordion styles?</strong>
          </p>
          <p>
            A: You can pass custom styles through the style prop on both AccordionGroup and
            individual AccordionItem components.
          </p>
        </div>
      </AccordionItem>
      <AccordionItem title='Advanced Usage'>
        <div style={{ padding: '1rem 0' }}>
          <p>
            For advanced use cases, you can create your own controlled accordion logic using the
            base components.
          </p>
        </div>
      </AccordionItem>
    </AccordionGroup>
  ),
  args: {
    defaultOpenItems: [0],
  },
};

export const CustomContent: Story = {
  render: (args) => (
    <AccordionGroup {...args}>
      <AccordionItem title='Rich Content Example'>
        <div style={{ padding: '1.5rem 0' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Component Features</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Animation</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Smooth height transitions</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Accessibility</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Keyboard navigation support</p>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Customization</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Flexible styling options</p>
            </div>
          </div>
        </div>
      </AccordionItem>
      <AccordionItem title='Code Example'>
        <div style={{ padding: '1rem 0' }}>
          <pre
            style={{
              background: '#282c34',
              color: '#abb2bf',
              padding: '1rem',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '0.875rem',
            }}
          >
            {`<AccordionGroup type="single" defaultOpenItems={[0]}>
  <AccordionItem title="Example Title">
    <p>Your content here</p>
  </AccordionItem>
  <AccordionItem title="Another Item">
    <p>More content</p>
  </AccordionItem>
</AccordionGroup>`}
          </pre>
        </div>
      </AccordionItem>
    </AccordionGroup>
  ),
};

export const CustomStyles: Story = {
  render: (args) => (
    <AccordionGroup
      {...args}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
      }}
    >
      <AccordionItem title='Styled Accordion Item'>
        <div
          style={{
            padding: '1.5rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            color: 'white',
            margin: '0.5rem 0',
          }}
        >
          <p>
            This accordion has custom styling applied to demonstrate the flexibility of the
            component.
          </p>
        </div>
      </AccordionItem>
      <AccordionItem title='Another Custom Item'>
        <div style={{ padding: '1rem 2rem' }}>
          <p>You can style each accordion item individually or apply global styles to the group.</p>
        </div>
      </AccordionItem>
    </AccordionGroup>
  ),
  args: {
    style: {
      gap: '0.5rem',
    },
  },
};

export const CustomHeader: Story = {
  render: (args) => (
    <AccordionGroup {...args}>
      <AccordionItem
        renderHeader={({ isOpen, toggle }) => (
          <div
            role='button'
            tabIndex={0}
            aria-expanded={isOpen}
            onClick={toggle}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              background: isOpen ? '#E8F4FD' : '#FFFFFF',
              border: `2px solid ${isOpen ? '#2196F3' : '#E0E0E0'}`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: isOpen ? '#2196F3' : '#F5F5F5',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  transition: 'all 200ms ease',
                }}
              >
                🚀
              </div>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: isOpen ? '#1976D2' : '#333',
                }}
              >
                커스텀 헤더 예시
              </span>
            </div>
            <div
              style={{
                fontSize: '18px',
                transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease',
                color: isOpen ? '#2196F3' : '#666',
              }}
            >
              ▼
            </div>
          </div>
        )}
      >
        <div style={{ padding: '1rem 0' }}>
          <p>
            이것은 renderHeader prop을 사용한 완전히 커스텀된 헤더입니다. 원하는 디자인과
            애니메이션을 자유롭게 구현할 수 있습니다.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title='기본 헤더'>
        <div style={{ padding: '1rem 0' }}>
          <p>비교를 위한 기본 헤더 스타일입니다.</p>
        </div>
      </AccordionItem>
    </AccordionGroup>
  ),
  args: {
    type: 'single',
    defaultOpenItems: [0],
  },
};
