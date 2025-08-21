import { type Meta, type StoryObj } from '@storybook/react-vite';

import { dialog, SolidButton, useThemeContext } from '../src';

const meta = {
  title: 'Design/Molecules/Dialog',
  component: null,
  parameters: {
    layout: 'centered',
    docs: {},
  },
  tags: ['autodocs'],
} satisfies Meta<null>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const openDialog = () => {
      dialog.info({
        title: '기본 다이얼로그',
        content: '이것은 기본 다이얼로그입니다. 확인 버튼만 표시됩니다.',
      });
    };

    return (
      <>
        <SolidButton onClick={openDialog}>기본 Dialog 열기</SolidButton>
      </>
    );
  },
};

export const Success: Story = {
  render: () => {
    const { theme } = useThemeContext();

    const openDialog = () => {
      dialog.success({
        title: '성공 다이얼로그',
        content: '이것은 성공 다이얼로그입니다.',
        withCancel: true,
      });
    };

    return (
      <>
        <SolidButton style={{ backgroundColor: theme.colors.successColor }} onClick={openDialog}>
          성공 Dialog 열기
        </SolidButton>
      </>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const { theme } = useThemeContext();

    const openDialog = () => {
      dialog.warning({
        title: '경고 다이얼로그',
        content: '이것은 경고 다이얼로그입니다.',
        withCancel: true,
      });
    };

    return (
      <>
        <SolidButton style={{ backgroundColor: theme.colors.warningColor }} onClick={openDialog}>
          경고 Dialog 열기
        </SolidButton>
      </>
    );
  },
};

export const Error: Story = {
  render: () => {
    const { theme } = useThemeContext();

    const openDialog = () => {
      dialog.error({
        title: '에러 다이얼로그',
        content: '이것은 에러 다이얼로그입니다.',
        withCancel: true,
      });
    };

    return (
      <>
        <SolidButton style={{ backgroundColor: theme.colors.errorColor }} onClick={openDialog}>
          에러 Dialog 열기
        </SolidButton>
      </>
    );
  },
};

export const WithCancel: Story = {
  render: () => {
    const openDialog = () => {
      dialog.info({
        title: '취소 버튼이 있는 다이얼로그',
        withCancel: true,
        content: '이 다이얼로그는 확인과 취소 버튼이 모두 표시됩니다.',
      });
    };

    return (
      <>
        <SolidButton onClick={openDialog}>취소 버튼 포함 Dialog</SolidButton>
      </>
    );
  },
};

export const OverlayCloseDisabled: Story = {
  render: () => {
    const openDialog = () => {
      dialog.info({
        title: '오버레이 클릭 활성화',
        overlayClose: true,
        content: '이 다이얼로그는 배경을 클릭해도 닫힙니다.',
      });
    };

    return (
      <>
        <SolidButton onClick={openDialog}>오버레이 클릭 활성화</SolidButton>
      </>
    );
  },
};

export default meta;
