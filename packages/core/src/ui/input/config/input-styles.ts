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

  // Check if user provided padding shorthand - if so, we should respect it
  const hasPaddingShorthand = padding !== undefined;

  // If user provided padding shorthand, use it as-is to avoid React warnings
  if (hasPaddingShorthand) {
    // When decorators are present, we need to adjust padding but avoid mixing shorthand with individual properties
    if (hasStartDecorator || hasEndDecorator) {
      // Parse the padding shorthand to get individual values
      const paddingValues = String(padding).split(' ').filter(Boolean);
      let left, right, top, bottom;

      if (paddingValues.length === 1) {
        left = right = top = bottom = paddingValues[0];
      } else if (paddingValues.length === 2) {
        top = bottom = paddingValues[0];
        left = right = paddingValues[1];
      } else if (paddingValues.length === 3) {
        top = paddingValues[0];
        left = right = paddingValues[1];
        bottom = paddingValues[2];
      } else if (paddingValues.length === 4) {
        top = paddingValues[0];
        right = paddingValues[1];
        bottom = paddingValues[2];
        left = paddingValues[3];
      }

      // Apply decorator offsets to individual properties
      const leftPadding = hasStartDecorator
        ? `calc(${startDecoratorWidth}px + ${typeof startDecoratorOffset === 'string' ? startDecoratorOffset : `${startDecoratorOffset}px`} + ${DEFAULT_DECORATOR_SPACING})`
        : left;

      const rightPadding = hasEndDecorator
        ? `calc(${endDecoratorWidth}px + ${typeof endDecoratorOffset === 'string' ? endDecoratorOffset : `${endDecoratorOffset}px`} + ${DEFAULT_DECORATOR_SPACING})`
        : right;

      // Return with individual properties (no shorthand to avoid React warning)
      return {
        ...defaultInputStyle,
        ...inputWithTypeStyles[inputType],
        ...restStyle,
        paddingTop: top,
        paddingBottom: bottom,
        paddingLeft: leftPadding,
        paddingRight: rightPadding,
        ...(disabled ? { ...inputDisabledStyles[inputType], ...disabledStyle } : {}),
      };
    } else {
      // No decorators, just use the padding shorthand as-is
      return {
        ...defaultInputStyle,
        ...inputWithTypeStyles[inputType],
        ...restStyle,
        padding, // Use shorthand as provided
        ...(disabled ? { ...inputDisabledStyles[inputType], ...disabledStyle } : {}),
      };
    }
  }

  // No padding shorthand provided, handle individual properties
  let resolvedPaddingLeft = stylePaddingLeft;
  let resolvedPaddingRight = stylePaddingRight;
  let resolvedPaddingTop = paddingTop;
  let resolvedPaddingBottom = paddingBottom;

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
    ...restStyle,
    paddingLeft: leftPadding,
    paddingRight: rightPadding,
    paddingTop: resolvedPaddingTop || defaultInputStyle.paddingBlock,
    paddingBottom: resolvedPaddingBottom || defaultInputStyle.paddingBlock,
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
