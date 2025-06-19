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
  lineHeight: 0,
  width: 'auto',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  fontWeight: 600,
} as const;

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
    // cursor: 'default',
    opacity: 0.5,
  },
  [ButtonStyle.OUTLINED]: {
    // cursor: 'default',
    opacity: 0.5,
  },
} as const;
