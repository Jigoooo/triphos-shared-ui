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

export const FormIntegration: Story = {
  args: {
    placeholder: 'Enter your message',
  },
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '30rem' }}>
      <div>
        <label
          htmlFor='subject'
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          Subject
        </label>
        <input
          id='subject'
          type='text'
          placeholder='Enter subject'
          style={{
            width: '100%',
            padding: '0.625rem 0.5rem',
            border: 'none',
            outline: 'none',
            borderRadius: '0.25rem',
            fontSize: '0.94rem',
            boxShadow: 'inset 0 0 0 0.8px rgba(0,27,55,0.3)',
          }}
        />
      </div>

      <div>
        <label
          htmlFor='message'
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          Message
        </label>
        <Textarea
          id='message'
          placeholder='Enter your detailed message here...'
          rows={6}
          required
        />
      </div>

      <div>
        <label
          htmlFor='notes'
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          Additional Notes (Optional)
        </label>
        <Textarea
          id='notes'
          placeholder='Any additional notes or comments...'
          rows={3}
          style={{ height: '4.5rem' }}
        />
      </div>

      <button
        type='submit'
        style={{
          alignSelf: 'flex-start',
          padding: '0.625rem 1.25rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Send Message
      </button>
    </form>
  ),
};

export const InteractiveDemo: Story = {
  args: {
    placeholder: 'Interactive demo - try different states',
  },
  render: () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [focusEffect, setFocusEffect] = useState(true);
    const [focusWidth, setFocusWidth] = useState(2);
    const [value, setValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type='checkbox'
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
            />
            Disabled
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type='checkbox'
              checked={focusEffect}
              onChange={(e) => setFocusEffect(e.target.checked)}
            />
            Focus Effect
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Focus Width:
            <input
              type='range'
              min='1'
              max='8'
              value={focusWidth}
              onChange={(e) => setFocusWidth(Number(e.target.value))}
              style={{ width: '5rem' }}
            />
            {focusWidth}px
          </label>
        </div>

        <Textarea
          placeholder='Interactive textarea - adjust settings above'
          disabled={isDisabled}
          isFocusEffect={focusEffect}
          focusWidth={focusWidth}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
        />

        {value && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              padding: '0.5rem',
              backgroundColor: '#f1f5f9',
              borderRadius: '0.25rem',
            }}
          >
            Characters: {value.length} | Words:{' '}
            {value.trim() ? value.trim().split(/\s+/).length : 0}
          </div>
        )}
      </div>
    );
  },
};

export default meta;
