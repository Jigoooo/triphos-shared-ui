import type { CSSProperties, InputHTMLAttributes, MouseEventHandler } from 'react';

export type CheckboxLabelProps = {
  label: string;
  labelStyle?: CSSProperties;
  disabled?: boolean;
};

export type AnimatedCheckboxProps = {
  containerStyle?: CSSProperties;
  isPartial: boolean;
  checkboxSize?: string | number;
  checkIconSize?: string | number;
  disabled?: boolean;
  checked: boolean;
  checkboxCheckedColor?: string;
  checkboxColor?: string;
  checkIconColor?: string;
};

export type NoAnimatedCheckboxProps = AnimatedCheckboxProps;

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  checkIconColor?: string;
  checkboxSize?: string | number;
  checkIconSize?: string | number;
  label?: string;
  labelStyle?: CSSProperties;
  checked: boolean;
  checkboxCheckedColor?: string;
  checkboxColor?: string;
  isPartial?: boolean;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  isActiveAnimation?: boolean;
  containerStyle?: CSSProperties;
};

export type CheckboxIconProps = {
  checkIconSize?: string | number;
  checkIconColor?: string;
  disabled?: boolean;
};
