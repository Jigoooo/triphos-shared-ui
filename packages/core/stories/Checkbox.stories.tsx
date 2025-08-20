import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Checkbox, useThemeContext } from '../src';
import type { CheckboxProps } from '../src/ui/checkbox/model/checkbox-type';

const meta = {
  title: 'Design/Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {},
  },
  tags: ['autodocs'],
  args: {
    checked: false,
    label: 'Checkbox',
    disabled: false,
    isActiveAnimation: true,
    isPartial: false,
    labelPosition: 'right',
    checkboxSize: '1.125rem',
    checkIconSize: '0.65rem',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checkbox의 체크 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Checkbox 라벨 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Checkbox 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isActiveAnimation: {
      control: 'boolean',
      description: '애니메이션 활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    isPartial: {
      control: 'boolean',
      description: '부분 선택 상태 (indeterminate)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '라벨 위치',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: "'right'" },
      },
    },
    checkboxSize: {
      control: 'text',
      description: 'Checkbox 크기 (CSS 단위)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "'1.125rem'" },
      },
    },
    checkIconSize: {
      control: 'text',
      description: '체크 아이콘 크기 (CSS 단위)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: "'0.75rem'" },
      },
    },
    checkboxColor: {
      control: 'color',
      description: '체크박스 배경색',
      table: {
        type: { summary: 'string' },
      },
    },
    checkboxCheckedColor: {
      control: 'color',
      description: '체크된 상태의 배경색',
      table: {
        type: { summary: 'string' },
      },
    },
    checkIconColor: {
      control: 'color',
      description: '체크 아이콘 색상',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: false,
      description: '체크 상태 변경 시 호출되는 함수',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
  },
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    label: '기본 체크박스',
  },
};

// 동그라미 체크박스
export const Circular: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return (
      <Checkbox
        {...args}
        checkIconSize={'0.55rem'}
        checked={checked}
        onChange={setChecked}
        checkboxStyle={{
          borderRadius: '50%',
        }}
      />
    );
  },
  args: {
    label: '동그라미 체크박스',
  },
};

// 비활성화된 체크박스
export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox {...args} checked={false} />
      <Checkbox {...args} checked={true} />
      <Checkbox {...args} checked={false} isPartial={true} />
    </div>
  ),
  args: {
    label: '비활성화된 체크박스',
    disabled: true,
  },
};

// 다양한 크기
export const Sizes: Story = {
  render: (args) => {
    const [checkedStates, setCheckedStates] = useState([false, false, false, false]);

    const handleChange = (index: number, checked: boolean) => {
      const newStates = [...checkedStates];
      newStates[index] = checked;
      setCheckedStates(newStates);
    };

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
      >
        <Checkbox
          {...args}
          checkboxSize='0.875rem'
          checkIconSize='0.4rem'
          label='작은 체크박스 (0.875rem)'
          checked={checkedStates[0]}
          onChange={(checked) => handleChange(0, checked)}
        />
        <Checkbox
          {...args}
          checkboxSize='1.125rem'
          checkIconSize='0.65rem'
          label='기본 체크박스 (1.125rem)'
          checked={checkedStates[1]}
          onChange={(checked) => handleChange(1, checked)}
        />
        <Checkbox
          {...args}
          checkboxSize='1.5rem'
          checkIconSize='0.9rem'
          label='큰 체크박스 (1.5rem)'
          checked={checkedStates[2]}
          onChange={(checked) => handleChange(2, checked)}
        />
        <Checkbox
          {...args}
          checkboxSize='2rem'
          checkIconSize='1.15rem'
          label='매우 큰 체크박스 (2rem)'
          checked={checkedStates[3]}
          onChange={(checked) => handleChange(3, checked)}
        />
      </div>
    );
  },
};

// 라벨 위치
export const LabelPositions: Story = {
  render: (args) => {
    const [checkedStates, setCheckedStates] = useState([false, false]);

    const handleChange = (index: number, checked: boolean) => {
      const newStates = [...checkedStates];
      newStates[index] = checked;
      setCheckedStates(newStates);
    };

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
      >
        <Checkbox
          {...args}
          labelPosition='left'
          label='왼쪽 라벨'
          checked={checkedStates[0]}
          onChange={(checked) => handleChange(0, checked)}
        />
        <Checkbox
          {...args}
          labelPosition='right'
          label='오른쪽 라벨'
          checked={checkedStates[1]}
          onChange={(checked) => handleChange(1, checked)}
        />
      </div>
    );
  },
};

// 부분 선택 상태 (Indeterminate)
export const Indeterminate: Story = {
  render: (args) => {
    const [subItems, setSubItems] = useState([false, false, false]);

    const isIndeterminate = subItems.some((item) => item) && !subItems.every((item) => item);
    const isAllChecked = subItems.every((item) => item);

    const handleMainChange = (checked: boolean) => {
      // 전체선택을 클릭했을 때: 모든 항목을 체크하거나 해제
      setSubItems(subItems.map(() => checked));
    };

    const handleSubItemChange = (index: number, checked: boolean) => {
      const newSubItems = [...subItems];
      newSubItems[index] = checked;
      setSubItems(newSubItems);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          alignItems: 'flex-start',
        }}
      >
        <Checkbox
          {...args}
          label='전체 선택'
          checked={isAllChecked}
          isPartial={isIndeterminate}
          onChange={handleMainChange}
        />
        <div
          style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          {subItems.map((checked, index) => (
            <Checkbox
              key={index}
              {...args}
              label={`항목 ${index + 1}`}
              checked={checked}
              onChange={(checked) => handleSubItemChange(index, checked)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// 커스텀 색상
export const CustomColors: Story = {
  render: (args) => {
    const [checkedStates, setCheckedStates] = useState([false, false, false]);

    const handleChange = (index: number, checked: boolean) => {
      const newStates = [...checkedStates];
      newStates[index] = checked;
      setCheckedStates(newStates);
    };

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
      >
        <Checkbox
          {...args}
          label='빨간색 체크박스'
          checkboxCheckedColor='#ef4444'
          checkIconColor='white'
          checked={checkedStates[0]}
          onChange={(checked) => handleChange(0, checked)}
        />
        <Checkbox
          {...args}
          label='초록색 체크박스'
          checkboxCheckedColor='#10b981'
          checkIconColor='white'
          checked={checkedStates[1]}
          onChange={(checked) => handleChange(1, checked)}
        />
        <Checkbox
          {...args}
          label='보라색 체크박스'
          checkboxCheckedColor='#8b5cf6'
          checkIconColor='white'
          checked={checkedStates[2]}
          onChange={(checked) => handleChange(2, checked)}
        />
      </div>
    );
  },
};

// 애니메이션 없는 체크박스
export const NoAnimation: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    return <Checkbox {...args} checked={checked} onChange={setChecked} isActiveAnimation={false} />;
  },
  args: {
    label: '애니메이션 없는 체크박스',
  },
};

// 다양한 모양의 체크박스
export const Shapes: Story = {
  render: (args) => {
    const [checkedStates, setCheckedStates] = useState([false, false, false]);

    const handleChange = (index: number, checked: boolean) => {
      const newStates = [...checkedStates];
      newStates[index] = checked;
      setCheckedStates(newStates);
    };

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
      >
        <Checkbox
          {...args}
          label='기본 모양 (둥근 모서리)'
          checked={checkedStates[0]}
          onChange={(checked) => handleChange(0, checked)}
        />
        <Checkbox
          {...args}
          label='동그라미 모양'
          checkboxStyle={{ borderRadius: '50%' }}
          checked={checkedStates[1]}
          onChange={(checked) => handleChange(1, checked)}
        />
        <Checkbox
          {...args}
          label='사각형 모양'
          checkboxStyle={{ borderRadius: '0px' }}
          checked={checkedStates[2]}
          onChange={(checked) => handleChange(2, checked)}
        />
      </div>
    );
  },
};

export const EmptyBackground: Story = {
  render: (args) => {
    const { theme } = useThemeContext();
    const [checked, setChecked] = useState(args.checked);

    return (
      <Checkbox
        {...args}
        label='배경 색상 없는 체크박스'
        checked={checked}
        onChange={setChecked}
        checkboxColor='transparent'
        checkboxStyle={{ backgroundColor: '#ffffff' }}
        checkboxCheckedColor={theme.colors.primaryColor}
        checkIconColor={theme.colors.primaryColor}
        checkboxBorderWidth={1.6}
      />
    );
  },
};
