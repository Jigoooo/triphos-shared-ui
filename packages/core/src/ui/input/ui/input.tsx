import { motion } from 'framer-motion';
import type { KeyboardEvent } from 'react';

import { InputEndDecoratorWrapper } from './input-end-decorator-wrapper.tsx';
import { InputStartDecoratorWrapper } from './input-start-decorator-wrapper.tsx';
import { defaultInputTransition, getInputStyle } from '../config/input-styles.ts';
import { type InputProps, InputType } from '../model/input-type.ts';
import { useElementWidth } from '../model/use-element-width.ts';
import { OutlinedInput } from '../variant/outlined-input.tsx';
import { SoftInput } from '../variant/soft-input.tsx';
import { UnderlineInput } from '../variant/underline-input.tsx';
import { useCompositionRef } from '@/hooks';
import { useThemeContext } from '@/theme';

export function BaseInput({
  ref,
  style,
  type = 'text',
  inputType = InputType.OUTLINED,
  disabledStyle,
  startDecorator,
  startDecoratorStyle,
  startDecoratorOffset = '0.8rem',
  endDecorator,
  endDecoratorStyle,
  endDecoratorOffset = '1rem',
  endDecoratorAllowFocusLoss = false,
  isFocusEffect = true,
  outlinedFocusWidth = 2.4,
  underlineFocusWidth = 2,
  focusColor,
  onClick,
  customTransition,
  disabled = false,
  onKeyDown,
  onEnter,
  ...props
}: InputProps) {
  const { theme } = useThemeContext();
  const { isComposingRef, handleCompositionStart, handleCompositionEnd } = useCompositionRef();

  const applyFocusColor = focusColor ?? theme.colors.primary[300];

  const [startDecoratorWidth, startDecoratorRef] = useElementWidth();
  const [endDecoratorWidth, endDecoratorRef] = useElementWidth();

  const applyInputStyle = getInputStyle({
    style,
    inputType,
    hasStartDecorator: !!startDecorator,
    hasEndDecorator: !!endDecorator,
    startDecoratorWidth,
    endDecoratorWidth,
    disabled,
    disabledStyle,
    startDecoratorOffset,
    endDecoratorOffset,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isComposingRef.current) return;
      e.preventDefault();
      onEnter?.(e);
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: style?.width || 'auto',
      }}
    >
      {startDecorator && (
        <InputStartDecoratorWrapper
          ref={startDecoratorRef}
          inputType={inputType}
          style={startDecoratorStyle}
          offset={startDecoratorOffset}
        >
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
            boxShadow: `inset 0 -${underlineFocusWidth}px 0 0 ${applyFocusColor}`,
          },
          none: {},
        }}
        whileFocus={
          !isFocusEffect ? 'none' : inputType === InputType.UNDERLINE ? 'focusUnderline' : 'focus'
        }
        transition={customTransition ?? defaultInputTransition}
        style={applyInputStyle}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        disabled={disabled}
        {...props}
      />
      {endDecorator && (
        <InputEndDecoratorWrapper
          ref={endDecoratorRef}
          style={endDecoratorStyle}
          offset={endDecoratorOffset}
          allowFocusLoss={endDecoratorAllowFocusLoss}
        >
          {endDecorator}
        </InputEndDecoratorWrapper>
      )}
    </div>
  );
}

export const Input = Object.assign(BaseInput, {
  Soft: SoftInput,
  Outlined: OutlinedInput,
  Underline: UnderlineInput,
});
