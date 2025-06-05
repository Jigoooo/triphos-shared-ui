import type { KeyboardEvent, ReactNode, Ref, TextareaHTMLAttributes } from 'react';
import type { MotionProps } from 'framer-motion';

export type ExtendedTextareaProps = MotionProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref?: Ref<HTMLTextAreaElement> | null;
    startDecorator?: ReactNode;
    endDecorator?: ReactNode;
    isFocusEffect?: boolean;
    onEnter?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  };
