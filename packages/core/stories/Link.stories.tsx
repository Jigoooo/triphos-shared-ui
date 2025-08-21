import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Link, type LinkProps } from '../src';

const meta = {
  title: 'Design/Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile link component with multiple variants, loading states, and accessibility features built on top of HTML anchor elements.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: 'Click me',
    href: '#',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Content of the link (supports ReactNode)',
    },
    href: {
      control: 'text',
      description: 'URL or path for the link',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'danger', 'ghost'],
      description: 'Visual style variant of the link',
    },
    size: {
      control: 'number',
      description: 'Size of the link text (in pixels, converted to rem)',
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description: 'When to show underline decoration',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the link is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading spinner',
    },
    external: {
      control: 'boolean',
      description: 'Whether to show external link icon',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Where to open the link',
    },
    style: {
      control: 'object',
      description: 'Custom CSS styles',
    },
  },
} satisfies Meta<LinkProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '#',
  },
};

export const Variants: Story = {
  args: {
    children: 'Link variants',
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Link href='#' variant='default'>
        Default Link
      </Link>
      <Link href='#' variant='primary'>
        Primary Link
      </Link>
      <Link href='#' variant='secondary'>
        Secondary Link
      </Link>
      <Link href='#' variant='danger'>
        Danger Link
      </Link>
      <Link href='#' variant='ghost'>
        Ghost Link
      </Link>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Different sizes',
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Link href='#' size={14}>
        Small Link (14px)
      </Link>
      <Link href='#' size={16}>
        Medium Link (16px - default)
      </Link>
      <Link href='#' size={18}>
        Large Link (18px)
      </Link>
      <Link href='#' size={24}>
        Extra Large Link (24px)
      </Link>
      <Link href='#' size='1.5rem'>
        CSS Size (1.5rem)
      </Link>
    </div>
  ),
};

export const UnderlineOptions: Story = {
  args: {
    children: 'Underline options',
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Link href='#' underline='always'>
        Always Underlined
      </Link>
      <Link href='#' underline='hover'>
        Hover to Underline
      </Link>
      <Link href='#' underline='none'>
        Never Underlined
      </Link>
    </div>
  ),
};

export const States: Story = {
  args: {
    children: 'Link states',
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Link href='#'>Normal Link</Link>
      <Link href='#' disabled>
        Disabled Link
      </Link>
      <Link href='#' loading>
        Loading Link
      </Link>
      <Link href='#' loading disabled>
        Loading + Disabled
      </Link>
    </div>
  ),
};

export const ExternalLinks: Story = {
  args: {
    children: 'External links',
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Link href='https://example.com' external>
        External Website
      </Link>
      <Link href='https://example.com' external target='_blank'>
        Open in New Tab
      </Link>
      <Link href='https://example.com' external variant='primary'>
        Primary External
      </Link>
      <Link href='https://example.com' external size={18}>
        Large External
      </Link>
    </div>
  ),
};

export const LoadingStates: Story = {
  args: {
    children: 'Loading states',
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Link href='#' loading size={14} variant='primary'>
        Small Loading
      </Link>
      <Link href='#' loading size={16} variant='secondary'>
        Medium Loading
      </Link>
      <Link href='#' loading size={18} variant='danger'>
        Large Loading
      </Link>
      <Link href='#' loading external>
        Loading External (no icon)
      </Link>
    </div>
  ),
};

export const CustomStyles: Story = {
  args: {
    children: 'Custom styling',
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Link
        href='#'
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.375rem',
          border: '0.0625rem solid #d1d5db',
        }}
      >
        Button-like Link
      </Link>

      <Link
        href='#'
        variant='primary'
        style={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Bold Uppercase
      </Link>

      <Link
        href='#'
        style={{
          background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}
      >
        Gradient Text
      </Link>
    </div>
  ),
};

export const ReactNodeChildren: Story = {
  args: {
    children: 'ReactNode support',
  },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    >
      <Link href='#'>
        <strong>Bold Text</strong> with regular text
      </Link>

      <Link href='#' variant='primary'>
        <span style={{ color: '#dc2626' }}>🔥</span> Hot Link{' '}
        <span style={{ color: '#dc2626' }}>🔥</span>
      </Link>

      <Link href='#' external>
        Visit{' '}
        <code
          style={{
            backgroundColor: '#f3f4f6',
            padding: '0.125rem 0.25rem',
            borderRadius: '0.25rem',
            fontSize: '0.875em',
          }}
        >
          example.com
        </code>
      </Link>

      <Link href='#' variant='ghost'>
        <span style={{ marginRight: '0.5rem' }}>📱</span>
        Mobile App Download
      </Link>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  args: {
    children: 'Interactive demo',
  },
  render: () => {
    const [variant, setVariant] = useState<
      'default' | 'primary' | 'secondary' | 'danger' | 'ghost'
    >('primary');
    const [size, setSize] = useState(16);
    const [underline, setUnderline] = useState<'always' | 'hover' | 'none'>('hover');
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [external, setExternal] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Variant:
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as typeof variant)}
              style={{ width: '100%', padding: '0.25rem' }}
            >
              <option value='default'>Default</option>
              <option value='primary'>Primary</option>
              <option value='secondary'>Secondary</option>
              <option value='danger'>Danger</option>
              <option value='ghost'>Ghost</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Size:
            </label>
            <input
              type='number'
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              style={{ width: '100%', padding: '0.25rem' }}
              min='8'
              max='48'
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Underline:
            </label>
            <select
              value={underline}
              onChange={(e) => setUnderline(e.target.value as typeof underline)}
              style={{ width: '100%', padding: '0.25rem' }}
            >
              <option value='always'>Always</option>
              <option value='hover'>On Hover</option>
              <option value='none'>Never</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <input
                type='checkbox'
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>

            <label
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <input
                type='checkbox'
                checked={loading}
                onChange={(e) => setLoading(e.target.checked)}
              />
              Loading
            </label>

            <label
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <input
                type='checkbox'
                checked={external}
                onChange={(e) => setExternal(e.target.checked)}
              />
              External
            </label>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            border: '0.0625rem solid #e2e8f0',
          }}
        >
          <Link
            href='#'
            variant={variant}
            size={size}
            underline={underline}
            disabled={disabled}
            loading={loading}
            external={external}
          >
            Interactive Link Example
          </Link>
        </div>

        <div
          style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            padding: '0.75rem',
            backgroundColor: '#f1f5f9',
            borderRadius: '0.375rem',
          }}
        >
          Current configuration: variant={variant}, size={size}, underline={underline}
          {disabled && ', disabled'}
          {loading && ', loading'}
          {external && ', external'}
        </div>
      </div>
    );
  },
};

export default meta;
