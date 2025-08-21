import type { MotionProps, Transition } from 'framer-motion';
import type { CSSProperties, InputHTMLAttributes, ReactNode, Ref } from 'react';

export enum InputType {
  SOFT = 'SOFT',
  OUTLINED = 'OUTLINED',
  UNDERLINE = 'UNDERLINE',
}

export type InputProps = MotionProps &
  InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement> | null;
    inputType?: InputType;
    disabledStyle?: CSSProperties;
    startDecorator?: ReactNode;
    endDecorator?: ReactNode;
    isFocusEffect?: boolean;
    outlinedFocusWidth?: number;
    underlineFocusWidth?: number;
    focusColor?: string;
    customTransition?: Transition;
  };
