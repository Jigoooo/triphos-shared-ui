import type { CSSProperties } from 'react';

export type SwitchProps = {
  isActiveAnimation?: boolean;
  containerStyle?: CSSProperties;
  label?: string;
  labelStyle?: CSSProperties;
  labelDirection?: 'left' | 'right';
  isOn: boolean;
  onClick: () => void;
  width?: string | number;
  height?: string | number;
  barColor?: string;
  disabled?: boolean;
};
