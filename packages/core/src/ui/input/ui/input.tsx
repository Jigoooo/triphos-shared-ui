import { motion } from 'framer-motion';

import type { ExtendedInputProps } from '../model/input-type.ts';
import { useCompositionRef } from '@/hooks';
import { InputStyle } from '../model/input-type.ts';
import { colors, zIndex } from '@/constants';
import { SoftInput } from '../variant/soft-input.tsx';
import { OutlinedInput } from '../variant/outlined-input.tsx';
import { UnderlineInput } from '../variant/underline-input.tsx';
import {
  defaultInputStyle,
  inputWithTypeStyles,
  inputDisabledStyles,
} from '../lib/input-styles.ts';

const EXTRA_PADDING = '2rem';

export function BaseInput({
  ref,
  style,
  type = 'text',
  inputStyle = InputStyle.OUTLINED,
  startDecorator,
  endDecorator,
  isFocusEffect = true,
  onClick,
  ...props
}: ExtendedInputProps) {
  const { handleCompositionStart, handleCompositionEnd } = useCompositionRef();

  return (
    <div
      style={{
        position: 'relative',
        width: style?.width || 'auto',
      }}
    >
      {startDecorator && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            left: inputStyle === InputStyle.UNDERLINE ? 6 : 8,
            top: inputStyle === InputStyle.UNDERLINE ? '40%' : '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            height: '100%',
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
            boxShadow: `inset 0 0 0 2.4px ${colors.primary[300]}`,
          },
          focusUnderline: {
            // borderBottom: `2px solid ${colors.primary[400]}`,
            boxShadow: `inset 0 -2px 0 0 ${colors.primary[300]}`,
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
          paddingLeft: startDecorator ? EXTRA_PADDING : defaultInputStyle.paddingInline,
          paddingRight: endDecorator ? EXTRA_PADDING : defaultInputStyle.paddingInline,
          ...style,
          ...(props.disabled ? inputDisabledStyles[inputStyle] : {}),
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
            height: '100%',
            position: 'absolute',
            right: 8,
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
