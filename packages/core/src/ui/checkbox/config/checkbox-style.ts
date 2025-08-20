import { type CSSProperties } from 'react';

export const getCheckboxStyle = ({
  checkboxStyle,
  checkboxSize,
  disabled,
  checked,
  checkboxCheckedColor,
  checkboxColor = '#ffffff',
}: {
  checkboxStyle?: CSSProperties;
  checkboxSize?: string | number;
  disabled?: boolean;
  checked: boolean;
  checkboxCheckedColor?: string;
  checkboxColor?: string;
}): CSSProperties => {
  return {
    justifyContent: 'center',
    alignItems: 'center',
    width: checkboxSize,
    height: checkboxSize,
    border: `1px solid ${!disabled && checked ? checkboxCheckedColor : '#cccccc'}`,
    borderRadius: '0.25rem',
    backgroundColor: disabled ? '#f5f5f5' : checked ? checkboxCheckedColor : checkboxColor,
    ...checkboxStyle,
  };
};

export const checkboxIconWrapperStyle: CSSProperties = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const getCheckboxPartialStyle = (checkboxCheckedColor: string): CSSProperties => {
  return { width: '0.625rem', height: '0.625rem', backgroundColor: checkboxCheckedColor };
};
