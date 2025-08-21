import { type Transition } from 'framer-motion';
import type { CSSProperties } from 'react';

import type { SwitchDimensions } from '../model/switch-type.ts';

export const getSwitchContainerStyle = ({
  disabled,
  containerStyle,
}: {
  disabled: boolean;
  containerStyle?: CSSProperties;
}): CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.25rem',
  cursor: disabled ? 'default' : 'pointer',
  ...containerStyle,
});

export const getSwitchBarStyle = ({
  dimensions,
  disabled,
  isOn,
  barColor,
}: {
  dimensions: SwitchDimensions;
  disabled: boolean;
  isOn: boolean;
  barColor: string;
}): CSSProperties => ({
  display: 'flex',
  width: dimensions.width,
  height: dimensions.height,
  borderRadius: dimensions.borderRadius,
  backgroundColor: disabled ? '#e0e0e0' : isOn ? barColor : '#e4e4e4',
  padding: dimensions.padding,
  cursor: disabled ? 'default' : 'pointer',
  justifyContent: isOn ? 'flex-end' : 'flex-start',
  alignItems: 'center',
});

export const getSwitchThumbStyle = (dimensions: SwitchDimensions): CSSProperties => ({
  width: dimensions.circleSize,
  height: dimensions.circleSize,
  backgroundColor: 'white',
  borderRadius: '50%',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.06)',
});

export const getSwitchLabelStyle = ({
  disabled,
  labelStyle,
}: {
  disabled: boolean;
  labelStyle?: CSSProperties;
}): CSSProperties => ({
  userSelect: 'none',
  fontSize: '0.9rem',
  color: disabled ? '#9f9f9f' : '#666666',
  ...labelStyle,
});

export const defaultSwitchTransition: Transition = { type: 'spring', stiffness: 700, damping: 35 };
export const defaultSwitchDisableTransition: Transition = { duration: 0 };
