import type { MotionProps, Variant, Transition } from 'framer-motion';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export enum ButtonStyle {
  SOLID = 'solid',
  OUTLINED = 'outlined',
}

export type ButtonProps = MotionProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonStyle?: ButtonStyle;
    disabledStyle?: CSSProperties;
    animationBackgroundColor?: string;
    customVariants?: {
      hover: Variant;
      tap: Variant;
      none: Variant;
    };
    customTransition?: Transition;
    children: ReactNode;
  };
