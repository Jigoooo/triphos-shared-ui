import { motion } from 'framer-motion';
import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type RefObject,
  type ChangeEvent,
  useCallback,
} from 'react';

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
  focusColor,
  disabled,
  disabledStyle,
  autoHeight = false,
  autoMaxHeight,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const { isComposingRef, handleCompositionStart, handleCompositionEnd } = useCompositionRef();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const combinedRef = ref || textareaRef;

  const adjustHeight = useCallback(() => {
    const textarea = ref ? (ref as RefObject<HTMLTextAreaElement>).current : textareaRef.current;
    if (textarea && autoHeight) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;

      if (autoMaxHeight) {
        const maxHeightStr =
          typeof autoMaxHeight === 'number' ? `${autoMaxHeight}px` : autoMaxHeight;

        // maxHeight를 픽셀로 변환
        let maxHeightInPx: number;
        if (maxHeightStr.includes('rem')) {
          const remValue = parseFloat(maxHeightStr);
          const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
          maxHeightInPx = remValue * rootFontSize;
        } else if (maxHeightStr.includes('em')) {
          const emValue = parseFloat(maxHeightStr);
          const elementFontSize = parseFloat(getComputedStyle(textarea).fontSize);
          maxHeightInPx = emValue * elementFontSize;
        } else {
          maxHeightInPx = parseFloat(maxHeightStr);
        }

        if (scrollHeight > maxHeightInPx) {
          textarea.style.height = maxHeightStr;
          textarea.style.overflowY = 'auto';
        } else {
          textarea.style.height = `${scrollHeight}px`;
          textarea.style.overflowY = 'hidden';
        }
      } else {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [ref, autoHeight, autoMaxHeight]);

  useEffect(() => {
    adjustHeight();
  }, [value, defaultValue, adjustHeight]);

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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    adjustHeight();
  };

  const textareaStyle = getTextareaStyle({
    style: {
      ...style,
      ...(autoHeight && {
        resize: 'none',
        overflow: 'hidden',
        minHeight: style?.minHeight || '6.25rem',
      }),
    },
    disabled,
    disabledStyle,
  });
  const applyFocusColor = focusColor ? focusColor : colors.primary[400];

  return (
    <motion.textarea
      ref={combinedRef as any}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      style={textareaStyle}
      variants={{
        focus: {
          boxShadow: `inset 0 0 0 ${focusWidth}px ${applyFocusColor}`,
        },
        none: {},
      }}
      whileFocus={isFocusEffect ? 'focus' : 'none'}
      transition={{ duration: 0.1 }}
      {...props}
    />
  );
}
