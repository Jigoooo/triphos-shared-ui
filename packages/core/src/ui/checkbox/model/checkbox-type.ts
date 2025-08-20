import type { CSSProperties, MouseEventHandler } from 'react';

export type CheckboxLabelProps = {
  label: string;
  labelStyle?: CSSProperties;
  disabled?: boolean;
};

export type AnimatedCheckboxProps = {
  checkboxStyle?: CSSProperties;
  isPartial: boolean;
  checkboxSize?: string | number;
  checkIconSize?: string | number;
  disabled?: boolean;
  checked: boolean;
  checkboxCheckedColor: string;
  checkboxColor?: string;
  checkIconColor?: string;
  checkboxBorderWidth: number;
};

export type NoAnimatedCheckboxProps = AnimatedCheckboxProps;

export type CheckboxProps = {
  checkIconColor?: string;
  checkboxSize?: string | number;
  checkIconSize?: string | number;
  label?: string;
  labelStyle?: CSSProperties;
  labelPosition?: 'left' | 'right';
  checked: boolean;
  checkboxCheckedColor?: string;
  checkboxColor?: string;
  isPartial?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  isActiveAnimation?: boolean;
  wrapperStyle?: CSSProperties;
  checkboxStyle?: CSSProperties;
  checkboxBorderWidth?: number;
};

export type CheckboxIconProps = {
  checkIconSize?: string | number;
  checkIconColor?: string;
  disabled?: boolean;
};
