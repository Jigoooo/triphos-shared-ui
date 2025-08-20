import type { Meta, StoryObj } from '@storybook/react-vite';

import { LuImage } from 'react-icons/lu';

import { Button } from '../src';
import type { ButtonProps } from '../src/ui/button/model/button-type';

const meta = {
  title: 'Design/Atoms/Button',
  component: Button.Solid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    children: 'Button',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },

    animationBackgroundColor: {
      control: 'color',
      description: 'Color for hover/tap animations',
    },

    // 객체 컨트롤 비활성화로 성능 향상
    disabledStyle: { control: false },
    customVariants: { control: false },
    customTransition: { control: false },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  render: (args) => <Button.Solid {...args}>{args.children}</Button.Solid>,
  args: {
    children: 'Button',
  },
};

export const SolidDisabled: Story = {
  render: (args) => <Button.Solid {...args}>{args.children}</Button.Solid>,
  args: {
    disabled: true,
    children: 'Button',
  },
};

export const Outlined: Story = {
  render: (args) => <Button.Outlined {...args}>{args.children}</Button.Outlined>,
  args: {
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

export const SolidWithIcon: Story = {
  render: (args) => <Button.Solid {...args}>{args.children}</Button.Solid>,
  args: {
    children: <LuImage />,
  },
};

export const OutlinedWithIcon: Story = {
  render: (args) => <Button.Outlined {...args}>{args.children}</Button.Outlined>,
  args: {
    children: <LuImage />,
  },
};
