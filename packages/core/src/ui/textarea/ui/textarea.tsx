import { motion } from 'framer-motion';
import type { KeyboardEvent } from 'react';

import { colors } from '@/constants';
import type { ExtendedTextareaProps } from '../model/textarea-type.ts';
import { defaultTextareaStyle, textareaDisabledStyle } from '../lib/textarea-styles.ts';
import { useCompositionRef } from '@/hooks';

export function Textarea({
  ref,
  style,
  isFocusEffect,
  onEnter,
  onKeyDown,
  ...props
}: Readonly<ExtendedTextareaProps>) {
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

  return (
    <motion.textarea
      ref={ref}
      className='selection-none'
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      style={{
        ...defaultTextareaStyle,
        ...(props.disabled ? textareaDisabledStyle : {}),
        ...style,
      }}
      variants={{
        focus: {
          boxShadow: `inset 0 0 0 2px ${colors.primary[400]}`,
        },
        none: {},
      }}
      whileFocus={isFocusEffect ? 'focus' : 'none'}
      transition={{ duration: 0.1 }}
      {...props}
    />
  );
}
