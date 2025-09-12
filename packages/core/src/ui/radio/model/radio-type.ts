import type { ReactNode, CSSProperties } from 'react';

export type ExtendedValue = string | number;

export type RadioGroupContextType<Value extends ExtendedValue> = {
  name: string;
  selectedRadio?: Value;
  handleSelectedRadio?: (value: Value) => void;
  groupDisabled: boolean;
};

export type RadioGroupProps<Value extends ExtendedValue> = {
  children: ReactNode;
  defaultValue?: Value;
  value?: Value;
  onChange?: (value: Value) => void;
  disabled?: boolean;
  style?: CSSProperties;
};

export type RadioProps<Value extends ExtendedValue> = {
  label: string;
  value: Value;
  disabled?: boolean;
  size?: number;
  radioColor?: string;
  labelColor?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
  dotStyle?: CSSProperties;
};
