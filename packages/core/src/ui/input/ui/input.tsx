import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

import { InputEndDecoratorWrapper } from './input-end-decorator-wrapper.tsx';
import { InputStartDecoratorWrapper } from './input-start-decorator-wrapper.tsx';
import { defaultInputTransition, getInputStyle } from '../config/input-styles.ts';
import { type InputProps, InputType } from '../model/input-type.ts';
import { OutlinedInput } from '../variant/outlined-input.tsx';
import { SoftInput } from '../variant/soft-input.tsx';
import { UnderlineInput } from '../variant/underline-input.tsx';
import { useThemeContext } from '@/theme';

export function BaseInput({
  ref,
  style,
  type = 'text',
  inputType = InputType.OUTLINED,
  disabledStyle,
  startDecorator,
  endDecorator,
  isFocusEffect = true,
  outlinedFocusWidth = 2.4,
  underlineFocusWidth = 2,
  focusColor,
  onClick,
  customTransition,
  disabled = false,
  ...props
}: InputProps) {
  const { theme } = useThemeContext();

  const applyFocusColor = focusColor ?? theme.colors.primary[300];

  const startDecoratorRef = useRef<HTMLDivElement>(null);
  const [startDecoratorWidth, setStartDecoratorWidth] = useState(0);

  useEffect(() => {
    if (startDecoratorRef.current) {
      const width = startDecoratorRef.current.offsetWidth;
      setStartDecoratorWidth(width);
    }
  }, [startDecorator]);

  const applyInputStyle = getInputStyle({
    style,
    inputType,
    hasStartDecorator: !!startDecorator,
    hasEndDecorator: !!endDecorator,
    startDecoratorWidth,
    disabled,
    disabledStyle,
  });

  return (
    <div
      style={{
        position: 'relative',
        width: style?.width || 'auto',
      }}
    >
      {startDecorator && (
        <InputStartDecoratorWrapper ref={startDecoratorRef} inputType={inputType}>
          {startDecorator}
        </InputStartDecoratorWrapper>
      )}
      <motion.input
        type={type}
        ref={ref}
        variants={{
          focus: {
            boxShadow: `inset 0 0 0 ${outlinedFocusWidth}px ${applyFocusColor}`,
          },
          focusUnderline: {
            // borderBottom: `2px solid ${colors.primary[400]}`,
            boxShadow: `inset 0 -${underlineFocusWidth}px 0 0 ${applyFocusColor}`,
          },
          none: {},
        }}
        whileFocus={
          !isFocusEffect ? 'none' : inputType === InputType.UNDERLINE ? 'focusUnderline' : 'focus'
        }
        transition={customTransition ?? defaultInputTransition}
        style={applyInputStyle}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
      />
      {endDecorator && <InputEndDecoratorWrapper>{endDecorator}</InputEndDecoratorWrapper>}
    </div>
  );
}

export const Input = Object.assign(BaseInput, {
  Soft: SoftInput,
  Outlined: OutlinedInput,
  Underline: UnderlineInput,
});
