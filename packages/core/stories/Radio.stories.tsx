import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Radio, RadioGroup, type RadioProps } from '../src';

const meta = {
  title: 'Design/Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable radio component with smooth animations and theme support, designed to work within RadioGroup context.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'Option 1',
    value: 'option1',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed next to the radio button',
    },
    value: {
      control: 'text',
      description: 'Value of the radio option',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    size: {
      control: 'number',
      description: 'Size of the radio button in rem',
    },
    radioColor: {
      control: 'color',
      description: 'Custom color for the radio when selected',
    },
    labelColor: {
      control: 'color',
      description: 'Color of the label text',
    },
    style: {
      control: 'object',
      description: 'Custom CSS styles for the radio container',
    },
    iconStyle: {
      control: 'object',
      description: 'Custom CSS styles for the radio icon',
    },
    dotStyle: {
      control: 'object',
      description: 'Custom CSS styles for the selected dot',
    },
  },
} satisfies Meta<RadioProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    value: 'option1',
  },
  render: (args) => (
    <RadioGroup defaultValue='option1'>
      <Radio {...args} />
    </RadioGroup>
  ),
};

export const BasicGroup: Story = {
  args: {
    label: 'Choose an option',
  },
  render: () => (
    <RadioGroup defaultValue='option2'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Radio label='First Option' value='option1' />
        <Radio label='Second Option' value='option2' />
        <Radio label='Third Option' value='option3' />
      </div>
    </RadioGroup>
  ),
};

export const HorizontalGroup: Story = {
  args: {
    label: 'Horizontal layout',
  },
  render: () => (
    <RadioGroup defaultValue='medium'>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Radio label='Small' value='small' />
        <Radio label='Medium' value='medium' />
        <Radio label='Large' value='large' />
      </div>
    </RadioGroup>
  ),
};

export const DisabledStates: Story = {
  args: {
    label: 'Disabled states',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Individual Disabled
        </h4>
        <RadioGroup defaultValue='enabled'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Radio label='Enabled Option' value='enabled' />
            <Radio label='Disabled Option' value='disabled' disabled />
            <Radio label='Another Enabled' value='enabled2' />
          </div>
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Group Disabled
        </h4>
        <RadioGroup defaultValue='option1' disabled>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Radio label='Option 1' value='option1' />
            <Radio label='Option 2' value='option2' />
            <Radio label='Option 3' value='option3' />
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const CustomSizes: Story = {
  args: {
    label: 'Different sizes',
  },
  render: () => (
    <RadioGroup defaultValue='medium'>
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
      >
        <Radio label='Small (1rem)' value='small' size={1} />
        <Radio label='Default (1.4rem)' value='medium' size={1.4} />
        <Radio label='Large (1.8rem)' value='large' size={1.8} />
        <Radio label='Extra Large (2.2rem)' value='xl' size={2.2} />
      </div>
    </RadioGroup>
  ),
};

export const CustomColors: Story = {
  args: {
    label: 'Custom colors',
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
        <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Radio Colors
        </h4>
        <RadioGroup defaultValue='red'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Radio label='Red Radio' value='red' radioColor='#dc2626' />
            <Radio label='Green Radio' value='green' radioColor='#16a34a' />
            <Radio label='Purple Radio' value='purple' radioColor='#9333ea' />
            <Radio label='Orange Radio' value='orange' radioColor='#ea580c' />
          </div>
        </RadioGroup>
      </div>

      <div>
        <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
          Custom Label Colors
        </h4>
        <RadioGroup defaultValue='blue'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Radio label='Blue Label' value='blue' labelColor='#1d4ed8' />
            <Radio label='Emerald Label' value='emerald' labelColor='#059669' />
            <Radio label='Rose Label' value='rose' labelColor='#e11d48' />
            <Radio label='Amber Label' value='amber' labelColor='#d97706' />
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const CustomStyles: Story = {
  args: {
    label: 'Custom styling',
  },
  render: () => (
    <RadioGroup defaultValue='styled'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Radio
          label='Custom Container Style'
          value='styled'
          style={{
            padding: '0.75rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            border: '0.0625rem solid #e2e8f0',
          }}
        />

        <Radio
          label='Custom Icon Style'
          value='icon'
          iconStyle={{
            border: '0.1875rem solid #3b82f6',
            backgroundColor: '#eff6ff',
          }}
        />

        <Radio
          label='Custom Dot Style'
          value='dot'
          radioColor='#8b5cf6'
          dotStyle={{
            borderRadius: '0.125rem',
          }}
        />
      </div>
    </RadioGroup>
  ),
};

export const ControlledExample: Story = {
  args: {
    label: 'Controlled component',
  },
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option2');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div
          style={{
            padding: '0.75rem',
            backgroundColor: '#f1f5f9',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
          }}
        >
          Selected value: <strong>{selectedValue || 'None'}</strong>
        </div>

        <RadioGroup value={selectedValue} onChange={setSelectedValue}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Radio label='First Option' value='option1' />
            <Radio label='Second Option' value='option2' />
            <Radio label='Third Option' value='option3' />
            <Radio label='Fourth Option' value='option4' />
          </div>
        </RadioGroup>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setSelectedValue('option1')}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
          >
            Select Option 1
          </button>
          <button
            onClick={() => setSelectedValue('')}
            style={{
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
          >
            Clear Selection
          </button>
        </div>
      </div>
    );
  },
};

export const FormIntegration: Story = {
  args: {
    label: 'Form integration',
  },
  render: () => {
    const [formData, setFormData] = useState({
      size: 'medium',
      priority: 'normal',
      notification: 'email',
    });

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '30rem' }}>
        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Size Preference
          </label>
          <RadioGroup
            value={formData.size}
            onChange={(value) => setFormData((prev) => ({ ...prev, size: value }))}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Radio label='Small' value='small' />
              <Radio label='Medium' value='medium' />
              <Radio label='Large' value='large' />
            </div>
          </RadioGroup>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Priority Level
          </label>
          <RadioGroup
            value={formData.priority}
            onChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Radio label='Low Priority' value='low' radioColor='#10b981' />
              <Radio label='Normal Priority' value='normal' radioColor='#3b82f6' />
              <Radio label='High Priority' value='high' radioColor='#f59e0b' />
              <Radio label='Critical Priority' value='critical' radioColor='#ef4444' />
            </div>
          </RadioGroup>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              marginBottom: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Notification Method
          </label>
          <RadioGroup
            value={formData.notification}
            onChange={(value) => setFormData((prev) => ({ ...prev, notification: value }))}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Radio label='Email notifications' value='email' />
              <Radio label='SMS notifications' value='sms' />
              <Radio label='Push notifications' value='push' />
              <Radio label='No notifications' value='none' />
            </div>
          </RadioGroup>
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            border: '0.0625rem solid #e2e8f0',
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 600 }}>
            Form Data:
          </h4>
          <pre
            style={{
              margin: 0,
              fontSize: '0.75rem',
              color: '#4b5563',
              whiteSpace: 'pre-wrap',
            }}
          >
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    );
  },
};

export const InteractiveDemo: Story = {
  args: {
    label: 'Interactive demo',
  },
  render: () => {
    const [selectedOption, setSelectedOption] = useState('option2');
    const [isGroupDisabled, setIsGroupDisabled] = useState(false);
    const [radioSize, setRadioSize] = useState(1.4);
    const [radioColor, setRadioColor] = useState('#3b82f6');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
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
              checked={isGroupDisabled}
              onChange={(e) => setIsGroupDisabled(e.target.checked)}
            />
            Group Disabled
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Size:
            <input
              type='range'
              min='1'
              max='3'
              step='0.2'
              value={radioSize}
              onChange={(e) => setRadioSize(Number(e.target.value))}
              style={{ width: '5rem' }}
            />
            {radioSize.toFixed(1)}rem
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Color:
            <input
              type='color'
              value={radioColor}
              onChange={(e) => setRadioColor(e.target.value)}
            />
          </label>
        </div>

        <RadioGroup value={selectedOption} onChange={setSelectedOption} disabled={isGroupDisabled}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Radio
              label='Interactive Option 1'
              value='option1'
              size={radioSize}
              radioColor={radioColor}
            />
            <Radio
              label='Interactive Option 2'
              value='option2'
              size={radioSize}
              radioColor={radioColor}
            />
            <Radio
              label='Interactive Option 3'
              value='option3'
              size={radioSize}
              radioColor={radioColor}
            />
            <Radio
              label='Interactive Option 4 (Individual Disabled)'
              value='option4'
              size={radioSize}
              radioColor={radioColor}
              disabled
            />
          </div>
        </RadioGroup>

        {selectedOption && (
          <div
            style={{
              fontSize: '0.875rem',
              color: '#4b5563',
              padding: '0.75rem',
              backgroundColor: '#f1f5f9',
              borderRadius: '0.375rem',
            }}
          >
            Currently selected: <strong>{selectedOption}</strong>
          </div>
        )}
      </div>
    );
  },
};

export default meta;
