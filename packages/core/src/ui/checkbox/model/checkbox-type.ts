import type { CSSProperties, InputHTMLAttributes, MouseEventHandler } from 'react';

export type CheckboxLabelProps = {
  label: string;
  labelStyle?: CSSProperties;
  disabled?: boolean;
};

export type AnimatedCheckboxProps = {
  isPartial: boolean;
  checkboxSize?: string | number;
  checkIconSize?: string | number;
  disabled?: boolean;
  checked: boolean;
  color?: string;
};

export type NoAnimatedCheckboxProps = AnimatedCheckboxProps;

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  checkboxSize?: string | number;
  checkIconSize?: string | number;
  label?: string;
  labelStyle?: CSSProperties;
  checked: boolean;
  color?: string;
  isPartial?: boolean;
  onClick: MouseEventHandler;
  disabled?: boolean;
  isActiveAnimation?: boolean;
};

export type CheckboxIconProps = {
  checkIconSize?: string | number;
  disabled?: boolean;
};
