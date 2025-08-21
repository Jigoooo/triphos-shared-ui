import type { ReactNode, CSSProperties } from 'react';

export type RadioGroupContextType = {
  name: string;
  selectedRadio: string;
  handleSelectedRadio: (value: string) => void;
  groupDisabled: boolean;
};

export type RadioGroupProps = {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: CSSProperties;
};

export type RadioProps = {
  label: string;
  value: string;
  disabled?: boolean;
  size?: number;
  radioColor?: string;
  labelColor?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
  dotStyle?: CSSProperties;
};
