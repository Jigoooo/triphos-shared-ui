import type { CSSProperties } from 'react';

export type SwitchProps = {
  containerStyle?: CSSProperties;
  label?: string;
  labelStyle?: CSSProperties;
  isOn: boolean;
  onClick: () => void;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
};
