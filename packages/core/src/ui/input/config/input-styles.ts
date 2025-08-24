import { type Transition } from 'framer-motion';
import type { CSSProperties } from 'react';

import { InputType } from '../model/input-type.ts';

const EXTRA_PADDING = '2rem';
const DECORATOR_SPACING = '0.5rem';

export const defaultInputStyle: CSSProperties = {
  width: '100%',
  paddingInline: '0.5rem',
  paddingBlock: '0.625rem',
  borderRadius: '0.25rem',
  fontSize: '0.9rem',
  height: '2rem',
  outline: 'none',
} as const;

export const inputWithTypeStyles: Record<InputType, CSSProperties> = {
  [InputType.SOFT]: {
    backgroundColor: '#f3f3f3',
    border: 'none',
  },
  [InputType.OUTLINED]: {
    backgroundColor: '#ffffff',
    boxShadow: `inset 0 0 0 0.8px rgba(0,27,55,0.24)`,
    border: 'none',
  },
  [InputType.UNDERLINE]: {
    backgroundColor: '#ffffff',
    borderRadius: 0,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    border: 'none',
    boxShadow: 'inset 0 -1.4px 0 0 #c4c4c4',
  },
} as const;

export const inputDisabledStyles: Record<InputType, CSSProperties> = {
  [InputType.SOFT]: {
    backgroundColor: '#f9f9f9',
  },
  [InputType.OUTLINED]: {
    boxShadow: `inset 0 0 0 0.8px rgba(0,27,55,0.24)`,
    backgroundColor: '#f2f2f2',
  },
  [InputType.UNDERLINE]: {
    boxShadow: 'inset 0 -2px 0 0 #e1e1e1',
  },
} as const;

export const defaultInputTransition: Transition = { duration: 0.14 };

export const getInputStyle = ({
  style,
  inputType,
  hasStartDecorator,
  hasEndDecorator,
  startDecoratorWidth,
  disabled,
  disabledStyle,
}: {
  style?: CSSProperties;
  inputType: InputType;
  hasStartDecorator: boolean;
  hasEndDecorator: boolean;
  startDecoratorWidth: number;
  disabled: boolean;
  disabledStyle?: CSSProperties;
}): CSSProperties => {
  // Extract paddingInline from style to handle it separately
  const {
    paddingInline,
    paddingLeft: stylePaddingLeft,
    paddingRight: stylePaddingRight,
    ...restStyle
  } = style || {};

  // Determine left and right padding
  const leftPadding = hasStartDecorator
    ? `calc(${startDecoratorWidth}px + ${inputType === InputType.UNDERLINE ? '0.375rem' : '0.5rem'} + ${DECORATOR_SPACING})`
    : stylePaddingLeft || paddingInline || defaultInputStyle.paddingInline;

  const rightPadding = hasEndDecorator
    ? EXTRA_PADDING
    : stylePaddingRight || paddingInline || defaultInputStyle.paddingInline;

  return {
    ...defaultInputStyle,
    ...inputWithTypeStyles[inputType],
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    ...restStyle,
    ...(disabled ? { ...inputDisabledStyles[inputType], ...disabledStyle } : {}),
  };
};
