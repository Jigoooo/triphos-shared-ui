import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Textarea, type TextareaProps } from '../src';

const meta = {
  title: 'Design/Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile textarea component with focus effects, keyboard handling, and customizable styling built with Framer Motion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the textarea',
    },
    value: {
      control: 'text',
      description: 'Current value of the textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    isFocusEffect: {
      control: 'boolean',
      description: 'Enable focus animation effect',
    },
    focusWidth: {
      control: 'number',
      description: 'Width of focus outline in pixels',
    },
    focusColor: {
      control: 'color',
      description: 'Custom color for focus outline',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text lines',
    },
    cols: {
      control: 'number',
      description: 'Visible width of textarea',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum number of characters',
    },
    style: {
      control: 'object',
      description: 'Custom CSS styles for the textarea',
    },
    disabledStyle: {
      control: 'object',
      description: 'Custom styles when disabled',
    },
  },
} satisfies Meta<TextareaProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
    isFocusEffect: true,
    focusWidth: 2,
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is a sample text content in the textarea component.',
    placeholder: 'Enter your text here...',
    isFocusEffect: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 'This textarea is disabled and cannot be edited.',
    disabled: true,
    placeholder: 'Disabled textarea',
  },
};

export const NoFocusEffect: Story = {
  args: {
    placeholder: 'No focus animation on this textarea',
    isFocusEffect: false,
  },
};

export const CustomFocusWidth: Story = {
  args: {
    placeholder: 'Custom focus width (4px)',
    isFocusEffect: true,
    focusWidth: 4,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <Textarea {...args} />
      <Textarea placeholder='Normal focus width (2px)' isFocusEffect={true} focusWidth={2} />
    </div>
  ),
};

export const CustomFocusColor: Story = {
  args: {
    placeholder: 'Focus to see custom colors',
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Default Focus Color
        </h4>
        <Textarea placeholder='Default blue focus' isFocusEffect={true} focusWidth={2} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Red Focus
        </h4>
        <Textarea
          placeholder='Red focus color'
          isFocusEffect={true}
          focusWidth={2}
          focusColor='#dc2626'
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Green Focus
        </h4>
        <Textarea
          placeholder='Green focus color'
          isFocusEffect={true}
          focusWidth={2}
          focusColor='#16a34a'
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Purple Focus
        </h4>
        <Textarea
          placeholder='Purple focus color'
          isFocusEffect={true}
          focusWidth={2}
          focusColor='#9333ea'
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Thick Orange Focus
        </h4>
        <Textarea
          placeholder='Thick orange focus'
          isFocusEffect={true}
          focusWidth={4}
          focusColor='#ea580c'
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Thin Pink Focus
        </h4>
        <Textarea
          placeholder='Thin pink focus'
          isFocusEffect={true}
          focusWidth={1}
          focusColor='#ec4899'
        />
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  args: {
    placeholder: 'Default size',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Small (3 rows)
        </h4>
        <Textarea placeholder='Small textarea with 3 rows' rows={3} style={{ height: '4.5rem' }} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Default (5 rows)
        </h4>
        <Textarea placeholder='Default textarea height' rows={5} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Large (8 rows)
        </h4>
        <Textarea placeholder='Large textarea with 8 rows' rows={8} style={{ height: '12rem' }} />
      </div>
    </div>
  ),
};

export const CustomStyles: Story = {
  args: {
    placeholder: 'Custom styled textarea',
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Rounded Corners
        </h4>
        <Textarea
          placeholder='Rounded corners textarea'
          style={{
            borderRadius: '0.75rem',
            border: '0.125rem solid #e2e8f0',
            boxShadow: 'none',
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Colored Border
        </h4>
        <Textarea
          placeholder='Blue border textarea'
          style={{
            border: '0.125rem solid #3b82f6',
            boxShadow: 'none',
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Background
        </h4>
        <Textarea
          placeholder='Light background textarea'
          style={{
            backgroundColor: '#f8fafc',
            border: '0.0625rem solid #cbd5e1',
            boxShadow: 'none',
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>No Resize</h4>
        <Textarea
          placeholder='Non-resizable textarea'
          style={{
            resize: 'none',
          }}
        />
      </div>
    </div>
  ),
};

export const WithCharacterCount: Story = {
  args: {
    placeholder: 'Type your message (max 200 characters)',
    maxLength: 200,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div style={{ width: '100%' }}>
        <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />
        <div
          style={{
            textAlign: 'right',
            fontSize: '0.75rem',
            color: '#6b7280',
            marginTop: '0.25rem',
          }}
        >
          {value.length} / {args.maxLength}
        </div>
      </div>
    );
  },
};

export const ResizeOptions: Story = {
  args: {
    placeholder: 'Try resizing these textareas',
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        width: '100%',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Vertical Resize (default)
        </h4>
        <Textarea placeholder='Resize vertically only' style={{ resize: 'vertical' }} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Horizontal Resize
        </h4>
        <Textarea placeholder='Resize horizontally only' style={{ resize: 'horizontal' }} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Both Directions
        </h4>
        <Textarea placeholder='Resize in both directions' style={{ resize: 'both' }} />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>No Resize</h4>
        <Textarea placeholder='Cannot be resized' style={{ resize: 'none' }} />
      </div>
    </div>
  ),
};

export default meta;
