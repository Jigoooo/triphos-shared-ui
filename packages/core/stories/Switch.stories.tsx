import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Switch, type SwitchProps } from '../src';

const meta = {
  title: 'Design/Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component for binary choices with smooth animations and customizable styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOn: {
      control: 'boolean',
      description: 'Current state of the switch',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when switch is clicked',
    },
    label: {
      control: 'text',
      description: 'Optional label text for the switch',
    },
    labelDirection: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch interaction',
    },
    isActiveAnimation: {
      control: 'boolean',
      description: 'Enable/disable switch animation',
    },
    animationDelay: {
      control: 'number',
      description: 'Delay before animation starts (in milliseconds)',
    },
    width: {
      control: 'text',
      description: 'Width of the switch (accepts rem, px, or number)',
    },
    height: {
      control: 'text',
      description: 'Height of the switch (accepts rem, px, or number)',
    },
    barColor: {
      control: 'color',
      description: 'Custom color for the switch bar when active',
    },
    containerStyle: {
      control: 'object',
      description: 'Custom CSS styles for the container',
    },
    labelStyle: {
      control: 'object',
      description: 'Custom CSS styles for the label',
    },
  },
} satisfies Meta<SwitchProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => {
    const [isOn, setIsOn] = useState(false);
    return <Switch isOn={isOn} onClick={() => setIsOn(!isOn)} />;
  },
};

export const WithLabel: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => {
    const [isOn, setIsOn] = useState(false);
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
      >
        <Switch isOn={isOn} onClick={() => setIsOn(!isOn)} label='Enable notifications' />
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='Dark mode'
          labelDirection='left'
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => {
    const [isOn, setIsOn] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'flex-start',
        }}
      >
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='Small'
          width='1.5rem'
          height='0.875rem'
        />
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='Medium (Default)'
          width='2.125rem'
          height='1.25rem'
        />
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='Large'
          width='3rem'
          height='1.75rem'
        />
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='Extra Large'
          width='4rem'
          height='2.25rem'
        />
      </div>
    );
  },
};

export const CustomColors: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => {
    const [settings, setSettings] = useState({
      notifications: false,
      darkMode: true,
      autoSave: false,
      soundEffects: true,
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          alignItems: 'flex-start',
        }}
      >
        <Switch
          isOn={settings.notifications}
          onClick={() => setSettings((prev) => ({ ...prev, notifications: !prev.notifications }))}
          label='Notifications'
          barColor='#10b981'
        />
        <Switch
          isOn={settings.darkMode}
          onClick={() => setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }))}
          label='Dark Mode'
          barColor='#6366f1'
        />
        <Switch
          isOn={settings.autoSave}
          onClick={() => setSettings((prev) => ({ ...prev, autoSave: !prev.autoSave }))}
          label='Auto Save'
          barColor='#f59e0b'
        />
        <Switch
          isOn={settings.soundEffects}
          onClick={() => setSettings((prev) => ({ ...prev, soundEffects: !prev.soundEffects }))}
          label='Sound Effects'
          barColor='#ef4444'
        />
      </div>
    );
  },
};

export const DisabledStates: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-start' }}
    >
      <Switch isOn={false} onClick={() => {}} label='Disabled Off' disabled />
      <Switch isOn={true} onClick={() => {}} label='Disabled On' disabled />
      <Switch
        isOn={false}
        onClick={() => {}}
        label='Disabled with Custom Style'
        disabled
        labelStyle={{ fontWeight: 'bold', color: '#999' }}
        containerStyle={{ opacity: 0.6 }}
      />
    </div>
  ),
};

export const WithoutAnimation: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => {
    const [isOn, setIsOn] = useState(false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          alignItems: 'flex-start',
        }}
      >
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='No Animation'
          isActiveAnimation={false}
        />
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='With Animation (Default)'
          isActiveAnimation={true}
        />
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='Custom Animation Delay'
          isActiveAnimation={true}
          animationDelay={600}
        />
      </div>
    );
  },
};

export const CustomStyling: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => {
    const [isOn, setIsOn] = useState(true);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'flex-start',
        }}
      >
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='Custom Container'
          containerStyle={{
            padding: '0.75rem',
            backgroundColor: '#f8fafc',
            borderRadius: '0.5rem',
            border: '0.0625rem solid #e2e8f0',
          }}
          labelStyle={{
            fontWeight: 'bold',
            color: '#1e293b',
          }}
        />
        <Switch
          isOn={isOn}
          onClick={() => setIsOn(!isOn)}
          label='Gradient Background'
          barColor='linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
          width='3rem'
          height='1.5rem'
          labelStyle={{
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 'bold',
          }}
        />
      </div>
    );
  },
};

export const FormIntegration: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => {
    const [formData, setFormData] = useState({
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      marketingEmails: false,
      securityAlerts: true,
    });

    const handleToggle = (key: keyof typeof formData) => {
      setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          border: '0.0625rem solid #e5e7eb',
          borderRadius: '0.5rem',
          maxWidth: '25rem',
        }}
      >
        <h3
          style={{
            margin: '0 0 1rem 0',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#374151',
          }}
        >
          Notification Preferences
        </h3>

        <Switch
          isOn={formData.emailNotifications}
          onClick={() => handleToggle('emailNotifications')}
          label='Email Notifications'
          barColor='#3b82f6'
        />

        <Switch
          isOn={formData.pushNotifications}
          onClick={() => handleToggle('pushNotifications')}
          label='Push Notifications'
          barColor='#3b82f6'
        />

        <Switch
          isOn={formData.smsNotifications}
          onClick={() => handleToggle('smsNotifications')}
          label='SMS Notifications'
          barColor='#3b82f6'
        />

        <hr style={{ border: 'none', borderTop: '0.0625rem solid #e5e7eb', margin: '0.75rem 0' }} />

        <Switch
          isOn={formData.marketingEmails}
          onClick={() => handleToggle('marketingEmails')}
          label='Marketing Emails'
          barColor='#10b981'
        />

        <Switch
          isOn={formData.securityAlerts}
          onClick={() => handleToggle('securityAlerts')}
          label='Security Alerts'
          barColor='#ef4444'
          labelStyle={{ fontWeight: '600' }}
        />

        <div
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            color: '#6b7280',
          }}
        >
          <pre style={{ margin: 0, fontFamily: 'monospace' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const ResponsiveLayout: Story = {
  args: { isOn: false, onClick: () => {} },
  render: () => {
    const [settings, setSettings] = useState({
      feature1: false,
      feature2: true,
      feature3: false,
      feature4: true,
    });

    const handleToggle = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
          gap: '1.5rem',
          padding: '1rem',
          maxWidth: '50rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
            Basic Features
          </h4>
          <Switch
            isOn={settings.feature1}
            onClick={() => handleToggle('feature1')}
            label='Feature 1'
          />
          <Switch
            isOn={settings.feature2}
            onClick={() => handleToggle('feature2')}
            label='Feature 2'
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
            Advanced Features
          </h4>
          <Switch
            isOn={settings.feature3}
            onClick={() => handleToggle('feature3')}
            label='Feature 3'
            barColor='#8b5cf6'
          />
          <Switch
            isOn={settings.feature4}
            onClick={() => handleToggle('feature4')}
            label='Feature 4'
            barColor='#06b6d4'
          />
        </div>
      </div>
    );
  },
};

export default meta;
