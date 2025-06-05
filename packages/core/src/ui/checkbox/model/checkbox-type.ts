import type { CSSProperties, InputHTMLAttributes, MouseEventHandler } from 'react';

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
