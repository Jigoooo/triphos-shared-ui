import { motion } from 'framer-motion';
import type { KeyboardEvent } from 'react';

import { getTextareaStyle } from '../lib/textarea-styles.ts';
import type { TextareaProps } from '../model/textarea-type.ts';
import { colors } from '@/constants';
import { useCompositionRef } from '@/hooks';

export function Textarea({
  ref,
  style,
  isFocusEffect = true,
  onEnter,
  onKeyDown,
  focusWidth = 2,
  disabled,
  disabledStyle,
  ...props
}: TextareaProps) {
  const { isComposingRef, handleCompositionStart, handleCompositionEnd } = useCompositionRef();

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (isComposingRef.current) return;
      e.preventDefault();
      onEnter?.(e);
    }

    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const textareaStyle = getTextareaStyle({ style, disabled, disabledStyle });

  return (
    <motion.textarea
      ref={ref}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      style={textareaStyle}
      variants={{
        focus: {
          boxShadow: `inset 0 0 0 ${focusWidth}px ${colors.primary[400]}`,
        },
        none: {},
      }}
      whileFocus={isFocusEffect ? 'focus' : 'none'}
      transition={{ duration: 0.1 }}
      {...props}
    />
  );
}
