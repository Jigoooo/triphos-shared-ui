import { type Transition, type Variants } from 'framer-motion';
import { darken, rgba } from 'polished';
import type { CSSProperties } from 'react';

import { ButtonType } from '../model/button-type.ts';
import type { Theme } from '@/theme';

export const defaultButtonStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingInline: '0.8rem',
  paddingBlock: '0.4rem',
  borderRadius: '0.3rem',
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
  gap: '0.3rem',
} as CSSProperties;

export function getButtonWithTypeStyles(theme: Theme): Record<ButtonType, CSSProperties> {
  return {
    [ButtonType.SOLID]: {
      backgroundColor: theme.colors.primaryColor,
      color: 'white',
      border: 'none',
      opacity: 1,
    },
    [ButtonType.OUTLINED]: {
      backgroundColor: 'rgba(255,255,255,0)',
      color: theme.colors.primaryColor,
      border: `1px solid ${theme.colors.primaryColor}`,
      opacity: 1,
    },
    [ButtonType.PLAIN]: {
      backgroundColor: 'rgba(255,255,255,0)',
      color: theme.colors.primaryColor,
      border: 'none',
      opacity: 1,
    },
  };
}

export const buttonDisabledStyle: Record<ButtonType, CSSProperties> = {
  [ButtonType.SOLID]: {
    cursor: 'default',
    opacity: 0.5,
  },
  [ButtonType.OUTLINED]: {
    cursor: 'default',
    opacity: 0.5,
  },
  [ButtonType.PLAIN]: {
    cursor: 'default',
    opacity: 0.5,
  },
} as const;

export const getButtonAnimationBackgroundColor = (
  buttonStyle: ButtonType,
  animationColor: string,
): { hoverBackgroundColor: string; tapBackgroundColor: string } => {
  switch (buttonStyle) {
    case ButtonType.SOLID: {
      return {
        hoverBackgroundColor: darken(0.08, animationColor),
        tapBackgroundColor: darken(0.15, animationColor),
      };
    }
    case ButtonType.OUTLINED: {
      return {
        hoverBackgroundColor: rgba(animationColor, 0.08),
        tapBackgroundColor: rgba(animationColor, 0.12),
      };
    }
    case ButtonType.PLAIN: {
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
      scale: 0.96,
    },
    none: {},
  };
};

export const getDefaultButtonTransition: () => Transition = () => {
  return {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut',
  };
};
