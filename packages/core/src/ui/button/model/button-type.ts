import type { MotionProps, Variant, Transition } from 'framer-motion';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export enum ButtonType {
  SOLID = 'SOLID',
  OUTLINED = 'OUTLINED',
}

export type ButtonProps = MotionProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonType?: ButtonType;
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
