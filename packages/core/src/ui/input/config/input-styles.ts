import { type Transition } from 'framer-motion';
import type { CSSProperties } from 'react';

import { InputType } from '../model/input-type.ts';

const DEFAULT_DECORATOR_SPACING = '0.3rem';

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
  endDecoratorWidth,
  disabled,
  disabledStyle,
  startDecoratorOffset,
  endDecoratorOffset,
}: {
  style?: CSSProperties;
  inputType: InputType;
  hasStartDecorator: boolean;
  hasEndDecorator: boolean;
  startDecoratorWidth: number;
  endDecoratorWidth: number;
  disabled: boolean;
  disabledStyle?: CSSProperties;
  startDecoratorOffset?: string | number;
  endDecoratorOffset?: string | number;
}): CSSProperties => {
  // Extract all padding-related properties to handle them separately
  const {
    padding,
    paddingInline,
    paddingBlock,
    paddingTop,
    paddingBottom,
    paddingLeft: stylePaddingLeft,
    paddingRight: stylePaddingRight,
    ...restStyle
  } = style || {};

  // Handle shorthand padding if provided
  let resolvedPaddingLeft = stylePaddingLeft;
  let resolvedPaddingRight = stylePaddingRight;
  let resolvedPaddingTop = paddingTop;
  let resolvedPaddingBottom = paddingBottom;

  // If padding shorthand is provided, expand it to individual properties
  if (padding !== undefined) {
    const paddingValues = String(padding).split(' ').filter(Boolean);
    if (paddingValues.length === 1) {
      // padding: value -> all sides
      resolvedPaddingLeft = resolvedPaddingLeft ?? paddingValues[0];
      resolvedPaddingRight = resolvedPaddingRight ?? paddingValues[0];
      resolvedPaddingTop = resolvedPaddingTop ?? paddingValues[0];
      resolvedPaddingBottom = resolvedPaddingBottom ?? paddingValues[0];
    } else if (paddingValues.length === 2) {
      // padding: vertical horizontal
      resolvedPaddingLeft = resolvedPaddingLeft ?? paddingValues[1];
      resolvedPaddingRight = resolvedPaddingRight ?? paddingValues[1];
      resolvedPaddingTop = resolvedPaddingTop ?? paddingValues[0];
      resolvedPaddingBottom = resolvedPaddingBottom ?? paddingValues[0];
    } else if (paddingValues.length === 3) {
      // padding: top horizontal bottom
      resolvedPaddingLeft = resolvedPaddingLeft ?? paddingValues[1];
      resolvedPaddingRight = resolvedPaddingRight ?? paddingValues[1];
      resolvedPaddingTop = resolvedPaddingTop ?? paddingValues[0];
      resolvedPaddingBottom = resolvedPaddingBottom ?? paddingValues[2];
    } else if (paddingValues.length === 4) {
      // padding: top right bottom left
      resolvedPaddingLeft = resolvedPaddingLeft ?? paddingValues[3];
      resolvedPaddingRight = resolvedPaddingRight ?? paddingValues[1];
      resolvedPaddingTop = resolvedPaddingTop ?? paddingValues[0];
      resolvedPaddingBottom = resolvedPaddingBottom ?? paddingValues[2];
    }
  }

  // Handle paddingInline and paddingBlock
  if (paddingInline !== undefined) {
    resolvedPaddingLeft = resolvedPaddingLeft ?? paddingInline;
    resolvedPaddingRight = resolvedPaddingRight ?? paddingInline;
  }
  if (paddingBlock !== undefined) {
    resolvedPaddingTop = resolvedPaddingTop ?? paddingBlock;
    resolvedPaddingBottom = resolvedPaddingBottom ?? paddingBlock;
  }

  // Determine left and right padding with decorator offsets
  const leftPadding = hasStartDecorator
    ? `calc(${startDecoratorWidth}px + ${typeof startDecoratorOffset === 'string' ? startDecoratorOffset : `${startDecoratorOffset}px`} + ${DEFAULT_DECORATOR_SPACING})`
    : resolvedPaddingLeft || defaultInputStyle.paddingInline;

  const rightPadding = hasEndDecorator
    ? `calc(${endDecoratorWidth}px + ${typeof endDecoratorOffset === 'string' ? endDecoratorOffset : `${endDecoratorOffset}px`} + ${DEFAULT_DECORATOR_SPACING})`
    : resolvedPaddingRight || defaultInputStyle.paddingInline;

  // Build the final style object with individual padding properties
  const finalStyle: CSSProperties = {
    ...defaultInputStyle,
    ...inputWithTypeStyles[inputType],
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    paddingTop: resolvedPaddingTop || defaultInputStyle.paddingBlock,
    paddingBottom: resolvedPaddingBottom || defaultInputStyle.paddingBlock,
    ...restStyle,
    ...(disabled ? { ...inputDisabledStyles[inputType], ...disabledStyle } : {}),
  };

  // Remove any undefined padding properties
  Object.keys(finalStyle).forEach((key) => {
    if (key.startsWith('padding') && finalStyle[key as keyof CSSProperties] === undefined) {
      delete finalStyle[key as keyof CSSProperties];
    }
  });

  return finalStyle;
};
