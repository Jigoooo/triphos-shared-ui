import type { MotionProps } from 'framer-motion';
import type { CSSProperties, InputHTMLAttributes, ReactNode, Ref } from 'react';

export enum InputStyle {
  SOFT = 'soft',
  OUTLINED = 'outlined',
  UNDERLINE = 'underline',
}

export type InputProps = MotionProps &
  InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement> | null;
    inputStyle?: InputStyle;
    disabledStyle?: CSSProperties;
    startDecorator?: ReactNode;
    endDecorator?: ReactNode;
    isFocusEffect?: boolean;
    outlinedFocusWidth?: number;
    underlineFocusWidth?: number;
    focusColor?: string;
  };
