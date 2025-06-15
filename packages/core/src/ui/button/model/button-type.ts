import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import type { MotionProps } from 'framer-motion';

export enum ButtonStyle {
  SOLID = 'solid',
  OUTLINED = 'outlined',
}

export type ButtonProps = MotionProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonStyle?: ButtonStyle;
    disabledStyle?: CSSProperties;
    animationColor?: string;
    customVariants?: {
      hover?: any;
      tap?: any;
    };
    children: ReactNode;
  };
