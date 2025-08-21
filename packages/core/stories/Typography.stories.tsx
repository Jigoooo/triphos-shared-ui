import { type Meta, type StoryObj } from '@storybook/react-vite';

import { Typography, type TypographyProps } from '../src';

const meta = {
  title: 'Design/Atoms/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible typography component for consistent text styling across the application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The text content to display',
    },
    style: {
      control: 'object',
      description: 'CSS styles to apply to the typography',
    },
  },
} satisfies Meta<TypographyProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Typography Text',
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Typography style={{ fontSize: '0.75rem' }}>Extra Small (12px)</Typography>
      <Typography style={{ fontSize: '0.875rem' }}>Small (14px)</Typography>
      <Typography style={{ fontSize: '1rem' }}>Medium (16px)</Typography>
      <Typography style={{ fontSize: '1.125rem' }}>Large (18px)</Typography>
      <Typography style={{ fontSize: '1.5rem' }}>Extra Large (24px)</Typography>
      <Typography style={{ fontSize: '2rem' }}>XXL (32px)</Typography>
      <Typography style={{ fontSize: '3rem' }}>Display (48px)</Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}
    >
      <Typography style={{ fontWeight: 300 }}>Light (300)</Typography>
      <Typography style={{ fontWeight: 400 }}>Regular (400)</Typography>
      <Typography style={{ fontWeight: 500 }}>Medium (500)</Typography>
      <Typography style={{ fontWeight: 600 }}>Semi Bold (600)</Typography>
      <Typography style={{ fontWeight: 700 }}>Bold (700)</Typography>
      <Typography style={{ fontWeight: 900 }}>Black (900)</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}
    >
      <Typography style={{ color: '#000000' }}>Black Text</Typography>
      <Typography style={{ color: '#666666' }}>Gray Text</Typography>
      <Typography style={{ color: '#007bff' }}>Primary Blue</Typography>
      <Typography style={{ color: '#28a745' }}>Success Green</Typography>
      <Typography style={{ color: '#ffc107' }}>Warning Yellow</Typography>
      <Typography style={{ color: '#dc3545' }}>Danger Red</Typography>
      <Typography style={{ color: '#6f42c1' }}>Purple Text</Typography>
    </div>
  ),
};

export const TextStyles: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}
    >
      <Typography style={{ fontStyle: 'normal' }}>Normal Text</Typography>
      <Typography style={{ fontStyle: 'italic' }}>Italic Text</Typography>
      <Typography style={{ textDecoration: 'underline' }}>Underlined Text</Typography>
      <Typography style={{ textDecoration: 'line-through' }}>Strikethrough Text</Typography>
      <Typography style={{ textTransform: 'uppercase' }}>UPPERCASE TEXT</Typography>
      <Typography style={{ textTransform: 'lowercase' }}>LOWERCASE TEXT</Typography>
      <Typography style={{ textTransform: 'capitalize' }}>Capitalized Text</Typography>
      <Typography style={{ letterSpacing: '0.125rem' }}>Letter Spaced Text</Typography>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Typography style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.2 }}>
        H1 Heading
      </Typography>
      <Typography style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.3 }}>
        H2 Heading
      </Typography>
      <Typography style={{ fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4 }}>
        H3 Heading
      </Typography>
      <Typography style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.5 }}>
        H4 Heading
      </Typography>
      <Typography style={{ fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.6 }}>
        H5 Heading
      </Typography>
      <Typography style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.7 }}>
        H6 Heading
      </Typography>
    </div>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <div style={{ maxWidth: '37.5rem' }}>
      <Typography style={{ fontSize: '1rem', lineHeight: 1.6, color: '#333333' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '25rem' }}>
      <Typography
        style={{
          display: 'block',
          textAlign: 'left',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        Left Aligned Text
      </Typography>
      <Typography
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        Center Aligned Text
      </Typography>
      <Typography
        style={{
          display: 'block',
          textAlign: 'right',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        Right Aligned Text
      </Typography>
      <Typography
        style={{
          display: 'block',
          textAlign: 'justify',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        Justified text alignment creates even edges on both left and right sides by adjusting the
        spacing between words.
      </Typography>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '18.75rem' }}>
      <Typography
        style={{
          display: 'block',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        This is a very long text that will be truncated with ellipsis when it overflows
      </Typography>
      <Typography
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '0.5rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        This is a multi-line text that will be truncated after two lines. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </Typography>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}
    >
      <Typography
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #007bff, #6f42c1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Gradient Text
      </Typography>
      <Typography
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#ffffff',
          backgroundColor: '#007bff',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
        }}
      >
        Badge Style
      </Typography>
      <Typography
        style={{
          fontSize: '1.125rem',
          textShadow: '0.125rem 0.125rem 0.25rem rgba(0,0,0,0.3)',
        }}
      >
        Text with Shadow
      </Typography>
      <Typography
        style={{
          fontSize: '1rem',
          border: '0.125rem solid #007bff',
          padding: '0.5rem 0.75rem',
          borderRadius: '0.5rem',
        }}
      >
        Bordered Text
      </Typography>
    </div>
  ),
};

export const CodeBlock: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Typography
        style={{
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          backgroundColor: '#f5f5f5',
          padding: '0.125rem 0.375rem',
          borderRadius: '0.1875rem',
        }}
      >
        const example = &apos;inline code&apos;;
      </Typography>
      <Typography
        style={{
          display: 'block',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          padding: '1rem',
          borderRadius: '0.5rem',
          whiteSpace: 'pre',
        }}
      >
        {`function HelloWorld() {
  return <div>Hello, World!</div>;
}`}
      </Typography>
    </div>
  ),
};

export const Links: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}
    >
      <Typography
        style={{
          color: '#007bff',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => console.log('Link clicked!')}
      >
        Clickable Link
      </Typography>
      <Typography
        style={{
          color: '#007bff',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'text-decoration 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.textDecoration = 'underline';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.textDecoration = 'none';
        }}
      >
        Hover to Underline
      </Typography>
      <Typography
        style={{
          color: '#6c757d',
          textDecoration: 'line-through',
          cursor: 'not-allowed',
        }}
      >
        Disabled Link
      </Typography>
    </div>
  ),
};

export default meta;
