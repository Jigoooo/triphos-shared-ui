import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

import {
  defaultInputStyle,
  inputWithTypeStyles,
  inputDisabledStyles,
} from '../lib/input-styles.ts';
import { type InputProps, InputStyle } from '../model/input-type.ts';
import { OutlinedInput } from '../variant/outlined-input.tsx';
import { SoftInput } from '../variant/soft-input.tsx';
import { UnderlineInput } from '../variant/underline-input.tsx';
import { colors, zIndex } from '@/constants';
import { useCompositionRef } from '@/hooks';

const EXTRA_PADDING = '2rem';
const DECORATOR_SPACING = '0.5rem';

export function BaseInput({
  ref,
  style,
  type = 'text',
  inputStyle = InputStyle.OUTLINED,
  disabledStyle,
  startDecorator,
  endDecorator,
  isFocusEffect = true,
  outlinedFocusWidth = 2.4,
  underlineFocusWidth = 2,
  focusColor = colors.primary[300],
  onClick,
  ...props
}: InputProps) {
  const { handleCompositionStart, handleCompositionEnd } = useCompositionRef();
  const startDecoratorRef = useRef<HTMLDivElement>(null);
  const [startDecoratorWidth, setStartDecoratorWidth] = useState(0);

  useEffect(() => {
    if (startDecoratorRef.current) {
      const width = startDecoratorRef.current.offsetWidth;
      setStartDecoratorWidth(width);
    }
  }, [startDecorator]);

  return (
    <div
      style={{
        position: 'relative',
        width: style?.width || 'auto',
      }}
    >
      {startDecorator && (
        <div
          ref={startDecoratorRef}
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            left: inputStyle === InputStyle.UNDERLINE ? '0.375rem' : '0.5rem',
            top: inputStyle === InputStyle.UNDERLINE ? '40%' : '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: zIndex.base,
          }}
        >
          {startDecorator}
        </div>
      )}
      <motion.input
        ref={ref}
        type={type}
        variants={{
          focus: {
            boxShadow: `inset 0 0 0 ${outlinedFocusWidth}px ${focusColor}`,
          },
          focusUnderline: {
            // borderBottom: `2px solid ${colors.primary[400]}`,
            boxShadow: `inset 0 -${underlineFocusWidth}px 0 0 ${focusColor}`,
          },
          none: {},
        }}
        whileFocus={
          !isFocusEffect ? 'none' : inputStyle === InputStyle.UNDERLINE ? 'focusUnderline' : 'focus'
        }
        transition={{ duration: 0.14 }}
        style={{
          ...defaultInputStyle,
          ...inputWithTypeStyles[inputStyle],
          paddingLeft: startDecorator
            ? `calc(${startDecoratorWidth}px + ${inputStyle === InputStyle.UNDERLINE ? '0.375rem' : '0.5rem'} + ${DECORATOR_SPACING})`
            : defaultInputStyle.paddingInline,
          paddingRight: endDecorator ? EXTRA_PADDING : defaultInputStyle.paddingInline,
          ...style,
          ...(props.disabled ? { ...inputDisabledStyles[inputStyle], ...disabledStyle } : {}),
        }}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
      />
      {endDecorator && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            zIndex: zIndex.base,
          }}
        >
          {endDecorator}
        </div>
      )}
    </div>
  );
}

export const Input = Object.assign(BaseInput, {
  Soft: SoftInput,
  Outlined: OutlinedInput,
  Underline: UnderlineInput,
});
