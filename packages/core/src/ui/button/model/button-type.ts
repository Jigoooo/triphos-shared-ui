import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { MotionProps } from 'framer-motion';

export enum ButtonStyle {
  SOLID = 'solid',
  OUTLINED = 'outlined',
}

export type ButtonProps = MotionProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonStyle?: ButtonStyle;
    animationColor?: string;
    customVariants?: {
      hover?: any;
      tap?: any;
    };
    children: ReactNode;
  };
