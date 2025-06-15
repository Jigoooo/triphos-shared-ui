import type { ReactNode, CSSProperties } from 'react';

export type RadioGroupContextType = {
  name: string;
  selectedRadio: string;
  handleSelectedRadio: (value: string) => void;
  groupDisabled: boolean;
};

export type RadioGroupProps = RadioGroupContextType & {
  children: ReactNode;
};

export type RadioProps = {
  label: string;
  value: string;
  disabled?: boolean;
  size?: number;
  color?: string;
  labelColor?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
  dotStyle?: CSSProperties;
};
