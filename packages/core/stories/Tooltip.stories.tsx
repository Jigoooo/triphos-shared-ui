import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Button, Tooltip, type TooltipProps } from '../src';

const meta = {
  title: 'Design/Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A floating tooltip component that displays helpful information on hover using @floating-ui.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
      description: 'Placement of the tooltip relative to the trigger element',
    },
    content: {
      control: 'text',
      description: 'Content to display in the tooltip',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tooltip',
    },
    style: {
      control: 'object',
      description: 'Custom CSS styles for the tooltip',
    },
    children: {
      control: false,
      description: 'The element that triggers the tooltip on hover',
    },
  },
} satisfies Meta<TooltipProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placement: 'top',
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Placements: Story = {
  args: { placement: 'top', content: 'Tooltip', children: <Button>Button</Button> },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '3rem',
        padding: '5rem',
      }}
    >
      <Tooltip placement='top-start' content='Top Start'>
        <Button style={{ width: '100%' }}>Top Start</Button>
      </Tooltip>

      <Tooltip placement='top' content='Top'>
        <Button style={{ width: '100%' }}>Top</Button>
      </Tooltip>

      <Tooltip placement='top-end' content='Top End'>
        <Button style={{ width: '100%' }}>Top End</Button>
      </Tooltip>

      <Tooltip placement='left' content='Left'>
        <Button style={{ width: '100%' }}>Left</Button>
      </Tooltip>

      <Tooltip placement='bottom' content='Center tooltip'>
        <Button style={{ width: '100%' }}>Center</Button>
      </Tooltip>

      <Tooltip placement='right' content='Right'>
        <Button style={{ width: '100%' }}>Right</Button>
      </Tooltip>

      <Tooltip placement='bottom-start' content='Bottom Start'>
        <Button style={{ width: '100%' }}>Bottom Start</Button>
      </Tooltip>

      <Tooltip placement='bottom' content='Bottom'>
        <Button style={{ width: '100%' }}>Bottom</Button>
      </Tooltip>

      <Tooltip placement='bottom-end' content='Bottom End'>
        <Button style={{ width: '100%' }}>Bottom End</Button>
      </Tooltip>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    placement: 'top',
    content: 'Long content tooltip',
    children: <Button>Long Tooltip</Button>,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip
        placement='top'
        content='This is a very long tooltip text that contains a lot of information about the element'
      >
        <Button>Long Tooltip</Button>
      </Tooltip>

      <Tooltip
        placement='bottom'
        content={
          <div>
            <strong>Multi-line Content</strong>
            <br />
            Line 1: Some information
            <br />
            Line 2: More details
          </div>
        }
        style={{ whiteSpace: 'normal', maxWidth: '15rem' }}
      >
        <Button>Multi-line</Button>
      </Tooltip>
    </div>
  ),
};

export const CustomStyles: Story = {
  args: { placement: 'top', content: 'Custom style tooltip', children: <Button>Custom</Button> },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip
        placement='top'
        content='Primary Style'
        style={{
          backgroundColor: '#007bff',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        <Button>Primary</Button>
      </Tooltip>

      <Tooltip
        placement='top'
        content='Success Style'
        style={{
          backgroundColor: '#28a745',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        <Button>Success</Button>
      </Tooltip>

      <Tooltip
        placement='top'
        content='Warning Style'
        style={{
          backgroundColor: '#ffc107',
          color: '#000',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        <Button>Warning</Button>
      </Tooltip>

      <Tooltip
        placement='top'
        content='Danger Style'
        style={{
          backgroundColor: '#dc3545',
          fontSize: '0.875rem',
          fontWeight: 600,
        }}
      >
        <Button>Danger</Button>
      </Tooltip>

      <Tooltip
        placement='top'
        content='Custom Border'
        style={{
          backgroundColor: '#fff',
          color: '#333',
          border: '0.125rem solid #007bff',
          fontSize: '0.875rem',
        }}
      >
        <Button>Bordered</Button>
      </Tooltip>
    </div>
  ),
};

export const DisabledState: Story = {
  args: { placement: 'top', content: 'Disabled tooltip', children: <Button>Disabled</Button> },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Tooltip placement='top' content='This tooltip is enabled' disabled={false}>
        <Button>Enabled Tooltip</Button>
      </Tooltip>

      <Tooltip placement='top' content="This tooltip won't show" disabled={true}>
        <Button>Disabled Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const VariousElements: Story = {
  args: { placement: 'top', content: 'Element tooltip', children: <Button>Element</Button> },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Tooltip placement='top' content='Button tooltip'>
        <Button>Button</Button>
      </Tooltip>

      <Tooltip placement='top' content='Text tooltip'>
        <span style={{ cursor: 'help', textDecoration: 'underline dotted' }}>Hover over text</span>
      </Tooltip>

      <Tooltip placement='top' content='Icon tooltip'>
        <span style={{ fontSize: '1.5rem', cursor: 'pointer' }}>ℹ️</span>
      </Tooltip>

      <Tooltip placement='top' content='Input tooltip'>
        <input
          type='text'
          placeholder='Hover for help'
          style={{
            padding: '0.5rem',
            border: '0.0625rem solid #ccc',
            borderRadius: '0.25rem',
          }}
        />
      </Tooltip>

      <Tooltip placement='top' content='Image tooltip'>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            backgroundColor: '#f0f0f0',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          📷
        </div>
      </Tooltip>
    </div>
  ),
};

export const InteractiveContent: Story = {
  args: {
    placement: 'top',
    content: 'Interactive tooltip',
    children: <Button>Interactive</Button>,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '3rem' }}>
      <Tooltip
        placement='top'
        content={
          <div>
            <strong>User Info</strong>
            <div style={{ marginTop: '0.5rem' }}>
              Name: John Doe
              <br />
              Email: john@example.com
              <br />
              Role: Administrator
            </div>
          </div>
        }
        style={{ whiteSpace: 'normal', padding: '0.75rem' }}
      >
        <Button>User Profile</Button>
      </Tooltip>

      <Tooltip
        placement='right'
        content={
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span>⚠️</span>
            <span>This action cannot be undone</span>
          </div>
        }
        style={{ backgroundColor: '#dc3545', padding: '0.5rem 0.75rem' }}
      >
        <Button style={{ backgroundColor: '#dc3545' }}>Delete</Button>
      </Tooltip>

      <Tooltip
        placement='bottom'
        content={
          <div>
            <div style={{ marginBottom: '0.25rem' }}>Keyboard Shortcut:</div>
            <code
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '0.125rem 0.25rem',
                borderRadius: '0.125rem',
              }}
            >
              Ctrl + S
            </code>
          </div>
        }
        style={{ whiteSpace: 'normal' }}
      >
        <Button>Save</Button>
      </Tooltip>
    </div>
  ),
};

export const FormIntegration: Story = {
  args: { placement: 'right', content: 'Form tooltip', children: <input /> },
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor='username' style={{ minWidth: '5rem' }}>
          Username:
        </label>
        <input
          id='username'
          type='text'
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '0.0625rem solid #ccc',
            borderRadius: '0.25rem',
          }}
        />
        <Tooltip placement='right' content='Must be 3-20 characters'>
          <span style={{ fontSize: '1rem', cursor: 'help' }}>ℹ️</span>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor='password' style={{ minWidth: '5rem' }}>
          Password:
        </label>
        <input
          id='password'
          type='password'
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '0.0625rem solid #ccc',
            borderRadius: '0.25rem',
          }}
        />
        <Tooltip
          placement='right'
          content={
            <div>
              Requirements:
              <ul style={{ margin: '0.25rem 0 0 1rem', padding: 0 }}>
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One number</li>
              </ul>
            </div>
          }
          style={{ whiteSpace: 'normal', maxWidth: '12rem' }}
        >
          <span style={{ fontSize: '1rem', cursor: 'help' }}>ℹ️</span>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor='email' style={{ minWidth: '5rem' }}>
          Email:
        </label>
        <input
          id='email'
          type='email'
          style={{
            flex: 1,
            padding: '0.5rem',
            border: '0.0625rem solid #ccc',
            borderRadius: '0.25rem',
          }}
        />
        <Tooltip placement='right' content="We'll never share your email">
          <span style={{ fontSize: '1rem', cursor: 'help' }}>🔒</span>
        </Tooltip>
      </div>

      <Tooltip placement='top' content='Please fill in all required fields before submitting'>
        <Button type='submit' style={{ alignSelf: 'flex-start' }}>
          Submit Form
        </Button>
      </Tooltip>
    </form>
  ),
};

export default meta;
