import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Search, User, Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';

import { Input, type InputProps } from '../src';
import { InputType } from '../src/ui/input';

const meta = {
  title: 'Design/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component with multiple variants, decorators, and animations built with Framer Motion.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text...',
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
      description: 'HTML input type',
    },
    inputType: {
      control: 'select',
      options: ['OUTLINED', 'SOFT', 'UNDERLINE'],
      description: 'Visual variant of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    isFocusEffect: {
      control: 'boolean',
      description: 'Whether to show focus animation effect',
    },
    outlinedFocusWidth: {
      control: 'number',
      description: 'Focus border width for outlined variant (px)',
    },
    underlineFocusWidth: {
      control: 'number',
      description: 'Focus border width for underline variant (px)',
    },
    focusColor: {
      control: 'color',
      description: 'Custom focus color',
    },
    startDecorator: {
      control: 'object',
      description: 'Element to display at the start of the input',
    },
    endDecorator: {
      control: 'object',
      description: 'Element to display at the end of the input',
    },
    style: {
      control: 'object',
      description: 'Custom CSS styles',
    },
  },
} satisfies Meta<InputProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Default input',
  },
};

export const Variants: Story = {
  args: {
    placeholder: 'Input variants',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Outlined (Default)
        </h4>
        <Input placeholder='Outlined input' />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Soft</h4>
        <Input.Soft placeholder='Soft input' />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Underline</h4>
        <Input.Underline placeholder='Underline input' />
      </div>
    </div>
  ),
};

export const WithDecorators: Story = {
  args: {
    placeholder: 'Input with decorators',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Start Decorator
        </h4>
        <Input
          placeholder='Search...'
          startDecorator={<Search size={16} style={{ color: '#6b7280' }} />}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          End Decorator
        </h4>
        <Input
          placeholder='Username'
          endDecorator={<User size={16} style={{ color: '#6b7280' }} />}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Both Decorators
        </h4>
        <Input
          placeholder='Search users...'
          startDecorator={<Search size={16} style={{ color: '#6b7280' }} />}
          endDecorator={<User size={16} style={{ color: '#6b7280' }} />}
        />
      </div>
    </div>
  ),
};

export const InputTypes: Story = {
  args: {
    placeholder: 'Different input types',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
      <Input type='text' placeholder='Text input' />
      <Input type='email' placeholder='Email input' />
      <Input type='password' placeholder='Password input' />
      <Input type='number' placeholder='Number input' />
      <Input type='search' placeholder='Search input' />
    </div>
  ),
};

export const States: Story = {
  args: {
    placeholder: 'Input states',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Normal</h4>
        <Input placeholder='Normal input' />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>Disabled</h4>
        <Input placeholder='Disabled input' disabled />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          No Focus Effect
        </h4>
        <Input placeholder='No focus animation' isFocusEffect={false} />
      </div>
    </div>
  ),
};

export const FocusCustomization: Story = {
  args: {
    placeholder: 'Focus customization',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Focus Color
        </h4>
        <Input placeholder='Red focus color' focusColor='#dc2626' />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Focus Width (Outlined)
        </h4>
        <Input placeholder='Thick focus border' outlinedFocusWidth={4} focusColor='#7c3aed' />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Focus Width (Underline)
        </h4>
        <Input.Underline
          placeholder='Thick underline focus'
          underlineFocusWidth={4}
          focusColor='#059669'
        />
      </div>
    </div>
  ),
};

export const PasswordToggle: Story = {
  args: {
    placeholder: 'Password toggle example',
  },
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div style={{ minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Password with Toggle
        </h4>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Enter password'
          endDecorator={
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {showPassword ? (
                <EyeOff size={16} style={{ color: '#6b7280' }} />
              ) : (
                <Eye size={16} style={{ color: '#6b7280' }} />
              )}
            </button>
          }
        />
      </div>
    );
  },
};

export const ClearableInput: Story = {
  args: {
    placeholder: 'Clearable input example',
  },
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ minWidth: '300px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Input with Clear Button
        </h4>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Type something...'
          startDecorator={<Search size={16} style={{ color: '#6b7280' }} />}
          endDecorator={
            value && (
              <button
                type='button'
                onClick={() => setValue('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={16} style={{ color: '#6b7280' }} />
              </button>
            )
          }
        />
      </div>
    );
  },
};

export const CustomStyles: Story = {
  args: {
    placeholder: 'Custom styling',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '300px' }}>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Large Input
        </h4>
        <Input
          placeholder='Large input'
          style={{
            height: '3rem',
            fontSize: '1.1rem',
            padding: '0 1rem',
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Rounded Input
        </h4>
        <Input
          placeholder='Rounded input'
          style={{
            borderRadius: '2rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          }}
        />
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Colors
        </h4>
        <Input.Soft
          placeholder='Custom colored input'
          style={{
            backgroundColor: '#ede9fe',
            color: '#6d28d9',
          }}
          focusColor='#8b5cf6'
        />
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  args: {
    placeholder: 'Interactive demo',
  },
  render: () => {
    const [inputType, setInputType] = useState<InputType>(InputType.OUTLINED);
    const [type, setType] = useState<'text' | 'password' | 'email' | 'number'>('text');
    const [disabled, setDisabled] = useState(false);
    const [isFocusEffect, setIsFocusEffect] = useState(true);
    const [focusWidth, setFocusWidth] = useState(2.4);
    const [focusColor, setFocusColor] = useState('#3b82f6');
    const [showStartDecorator, setShowStartDecorator] = useState(false);
    const [showEndDecorator, setShowEndDecorator] = useState(false);

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
              Input Variant:
            </label>
            <select
              value={inputType}
              onChange={(e) => setInputType(e.target.value as typeof inputType)}
              style={{ width: '100%', padding: '0.25rem' }}
            >
              <option value='OUTLINED'>Outlined</option>
              <option value='SOFT'>Soft</option>
              <option value='UNDERLINE'>Underline</option>
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
              Input Type:
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              style={{ width: '100%', padding: '0.25rem' }}
            >
              <option value='text'>Text</option>
              <option value='password'>Password</option>
              <option value='email'>Email</option>
              <option value='number'>Number</option>
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
              Focus Width:
            </label>
            <input
              type='number'
              value={focusWidth}
              onChange={(e) => setFocusWidth(Number(e.target.value))}
              style={{ width: '100%', padding: '0.25rem' }}
              min='1'
              max='10'
              step='0.1'
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
              Focus Color:
            </label>
            <input
              type='color'
              value={focusColor}
              onChange={(e) => setFocusColor(e.target.value)}
              style={{ width: '100%', padding: '0.25rem' }}
            />
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
                checked={isFocusEffect}
                onChange={(e) => setIsFocusEffect(e.target.checked)}
              />
              Focus Effect
            </label>

            <label
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <input
                type='checkbox'
                checked={showStartDecorator}
                onChange={(e) => setShowStartDecorator(e.target.checked)}
              />
              Start Decorator
            </label>

            <label
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <input
                type='checkbox'
                checked={showEndDecorator}
                onChange={(e) => setShowEndDecorator(e.target.checked)}
              />
              End Decorator
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
            minWidth: '300px',
          }}
        >
          <Input
            inputType={inputType}
            type={type}
            placeholder='Interactive demo input'
            disabled={disabled}
            isFocusEffect={isFocusEffect}
            outlinedFocusWidth={focusWidth}
            underlineFocusWidth={focusWidth}
            focusColor={focusColor}
            startDecorator={
              showStartDecorator ? <Search size={16} style={{ color: '#6b7280' }} /> : undefined
            }
            endDecorator={
              showEndDecorator ? <User size={16} style={{ color: '#6b7280' }} /> : undefined
            }
            style={{ width: '100%', maxWidth: '300px' }}
          />
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
          Current configuration: {inputType.toLowerCase()} variant, {type} type, focus width:{' '}
          {focusWidth}
          {disabled && ', disabled'}
          {!isFocusEffect && ', no focus effect'}
          {showStartDecorator && ', with start decorator'}
          {showEndDecorator && ', with end decorator'}
        </div>
      </div>
    );
  },
};

export default meta;
