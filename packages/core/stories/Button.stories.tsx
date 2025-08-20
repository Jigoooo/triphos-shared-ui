import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';

import { Button } from '../src';

const meta = {
  title: 'Design/Atoms/Button',
  component: Button.Solid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    style: { backgroundColor: 'color' },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  render: (args) => <Button.Solid {...args}>Button</Button.Solid>,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));

    await expect(
      canvas.getByText(
        'Everything is perfect. Your account is ready and we should probably get you started!',
      ),
    ).toBeInTheDocument();
  },
  args: {
    children: 'Button',
  },
};

export const Outlined: Story = {
  render: (args) => <Button.Outlined {...args}>Button</Button.Outlined>,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));

    await expect(
      canvas.getByText(
        'Everything is perfect. Your account is ready and we should probably get you started!',
      ),
    ).toBeInTheDocument();
  },
  args: {
    children: 'Button',
  },
};
