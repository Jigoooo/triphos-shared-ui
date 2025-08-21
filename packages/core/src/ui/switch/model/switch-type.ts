import type { CSSProperties } from 'react';

export interface SwitchDimensions {
  width: number;
  height: number;
  padding: number;
  circleSize: number;
  borderRadius: number;
}

export type SwitchProps = {
  isActiveAnimation?: boolean;
  animationDelay?: number;
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
