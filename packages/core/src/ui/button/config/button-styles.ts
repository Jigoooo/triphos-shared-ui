import { type Transition, type Variants } from 'framer-motion';
import { darken, rgba } from 'polished';
import type { CSSProperties } from 'react';

import { ButtonStyle } from '../model/button-type.ts';
import type { Theme } from '@/theme';

export const defaultButtonStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingInline: '0.8rem',
  paddingBlock: '0.4rem',
  borderRadius: '0.4rem',
  cursor: 'pointer',
  fontSize: '0.84rem',
  height: '2rem',
  lineHeight: 1,
  width: 'auto',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  fontWeight: 600,
} as CSSProperties;

export function getButtonWithTypeStyles(theme: Theme): Record<ButtonStyle, CSSProperties> {
  return {
    [ButtonStyle.SOLID]: {
      backgroundColor: theme.colors.primaryColor,
      color: 'white',
      border: 'none',
      opacity: 1,
    },
    [ButtonStyle.OUTLINED]: {
      backgroundColor: '#ffffff',
      color: theme.colors.primaryColor,
      border: `1px solid ${theme.colors.primaryColor}`,
      opacity: 1,
    },
  };
}

export const buttonDisabledStyle: Record<ButtonStyle, CSSProperties> = {
  [ButtonStyle.SOLID]: {
    cursor: 'default',
    opacity: 0.5,
  },
  [ButtonStyle.OUTLINED]: {
    cursor: 'default',
    opacity: 0.5,
  },
} as const;

export const getButtonAnimationBackgroundColor = (
  buttonStyle: ButtonStyle,
  animationColor: string,
): { hoverBackgroundColor: string; tapBackgroundColor: string } => {
  switch (buttonStyle) {
    case ButtonStyle.SOLID: {
      return {
        hoverBackgroundColor: darken(0.08, animationColor),
        tapBackgroundColor: darken(0.15, animationColor),
      };
    }
    case ButtonStyle.OUTLINED: {
      return {
        hoverBackgroundColor: rgba(animationColor, 0.08),
        tapBackgroundColor: rgba(animationColor, 0.12),
      };
    }
    default: {
      return {
        hoverBackgroundColor: darken(0.08, animationColor),
        tapBackgroundColor: darken(0.15, animationColor),
      };
    }
  }
};

export const getDefaultButtonVariants: (
  hoverBackgroundColor: string,
  tapBackgroundColor: string,
) => Variants = (hoverBackgroundColor, tapBackgroundColor) => {
  return {
    hover: { backgroundColor: hoverBackgroundColor },
    tap: {
      backgroundColor: tapBackgroundColor,
      scale: 0.95,
      transition: {
        scale: {
          duration: 0.05,
          ease: 'easeOut',
        },
        backgroundColor: { duration: 0.3, ease: 'easeOut' },
      },
    },
    none: {},
  };
};

export const getDefaultButtonTransition: () => Transition = () => {
  return {
    scale: {
      duration: 0.08,
      ease: 'easeOut',
    },
    backgroundColor: { duration: 0.4, ease: 'easeOut' },
  };
};
