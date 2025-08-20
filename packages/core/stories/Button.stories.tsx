import type { Meta, StoryObj } from '@storybook/react-vite';

import { LuImage, LuPower } from 'react-icons/lu';

import { Button, ButtonType } from '../src';
import type { ButtonProps } from '../src/ui/button/model/button-type';
import { BaseButton } from '../src/ui/button/ui/button';

const meta = {
  title: 'Design/Atoms/Button',
  component: BaseButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    disabled: false,
    style: {},
    disabledStyle: {},
    buttonType: ButtonType.SOLID,
    animationBackgroundColor: undefined,
  },
  argTypes: {
    children: {
      control: false,
      description: 'Button content (text or ReactNode like icons)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
    style: {
      control: 'object',
      description: 'Custom CSS styles to override default styling',
      table: {
        type: { summary: 'CSSProperties' },
      },
    },
    buttonType: {
      control: 'select',
      options: [ButtonType.SOLID, ButtonType.OUTLINED, ButtonType.PLAIN],
      description: 'Button type variant',
      table: {
        type: { summary: 'ButtonType' },
        defaultValue: { summary: 'theme.components.button.type' },
      },
    },
    animationBackgroundColor: {
      control: 'color',
      description: 'Color for hover/tap animations',
      table: {
        type: { summary: 'string' },
      },
    },
    disabledStyle: {
      control: 'object',
      description:
        'Additional custom styles applied when disabled (merged with default: cursor: default, opacity: 0.5)',
      table: {
        type: { summary: 'CSSProperties' },
        defaultValue: { summary: '{ cursor: "default", opacity: 0.5 }' },
      },
    },
    customVariants: {
      control: false,
      description:
        'Custom Framer Motion animation variants. Example: { hover: { scale: 1.05 }, tap: { scale: 0.95 }, none: {} }',
      table: {
        type: { summary: '{ hover: Variant; tap: Variant; none: Variant }' },
        defaultValue: {
          summary:
            '{ hover: { backgroundColor: "..." }, tap: { backgroundColor: "...", scale: 0.96 }, none: {} }',
        },
      },
    },
    customTransition: {
      control: false,
      description:
        'Custom Framer Motion transition configuration. Example: { type: "spring", stiffness: 300, damping: 20 }',
      table: {
        type: { summary: 'Transition' },
        defaultValue: {
          summary: '{ type: "tween", duration: 0.15, ease: "easeOut" }',
        },
      },
    },
    ref: {
      table: { disable: true },
    },
  },
} satisfies Meta<ButtonProps>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <BaseButton {...args}>{args.children}</BaseButton>,
};

export const Solid: Story = {
  render: (args) => <Button.Solid {...args}>{args.children}</Button.Solid>,
  args: {
    children: 'Button',
  },
};

export const Outlined: Story = {
  render: (args) => <Button.Outlined {...args}>{args.children}</Button.Outlined>,
  args: {
    children: 'Button',
  },
};

export const Plain: Story = {
  render: (args) => <Button.Plain {...args}>{args.children}</Button.Plain>,
  args: {
    children: 'Button',
  },
};

export const SolidWithIcon: Story = {
  render: (args) => <Button.Solid {...args}>{args.children}</Button.Solid>,
  args: {
    style: { paddingInline: '0.6rem' },
    children: <LuImage size={16} />,
  },
};

export const OutlinedWithIcon: Story = {
  render: (args) => <Button.Outlined {...args}>{args.children}</Button.Outlined>,
  args: {
    style: { paddingInline: '0.6rem' },
    children: <LuImage size={16} />,
  },
};

export const PlainWithIcon: Story = {
  render: (args) => <Button.Plain {...args}>{args.children}</Button.Plain>,
  args: {
    style: { paddingInline: '0.6rem' },
    children: <LuImage size={16} />,
  },
};

export const SolidWithIconAndText: Story = {
  render: (args) => (
    <Button.Solid {...args}>
      <LuImage />
      Button
    </Button.Solid>
  ),
};

export const OutlinedWithIconAndText: Story = {
  render: (args) => (
    <Button.Outlined {...args}>
      <LuImage />
      Button
    </Button.Outlined>
  ),
};

export const PlainWithIconAndText: Story = {
  render: (args) => (
    <Button.Plain {...args}>
      <LuImage />
      Button
    </Button.Plain>
  ),
};

export const SolidDisabled: Story = {
  render: (args) => <Button.Solid {...args}>{args.children}</Button.Solid>,
  args: {
    disabled: true,
    children: 'Button',
  },
};

export const OutlinedDisabled: Story = {
  render: (args) => <Button.Outlined {...args}>{args.children}</Button.Outlined>,
  args: {
    disabled: true,
    children: 'Button',
  },
};

export const PlainDisabled: Story = {
  render: (args) => <Button.Plain {...args}>{args.children}</Button.Plain>,
  args: {
    disabled: true,
    children: 'Button',
  },
};

export const CustomAnimation: Story = {
  render: (args) => (
    <Button.Plain {...args}>
      <LuPower size={24} />
    </Button.Plain>
  ),
  args: {
    style: {
      padding: '0.2rem',
    },
    customVariants: {
      hover: { scale: 1 },
      tap: { scale: 0.9 },
      none: {},
    },
    customTransition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
    children: 'Button',
  },
};

export default meta;
