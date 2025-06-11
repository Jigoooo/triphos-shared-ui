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
} as const;

export function getButtonWithTypeStyles(theme: Theme): Record<ButtonStyle, CSSProperties> {
  return {
    [ButtonStyle.SOLID]: {
      backgroundColor: theme.colors.primaryColor,
      color: 'white',
      border: 'none',
    },
    [ButtonStyle.OUTLINED]: {
      backgroundColor: '#ffffff',
      color: theme.colors.primaryColor,
      border: `1px solid ${theme.colors.primaryColor}`,
    },
  };
}

export const buttonDisabledStyle: Record<ButtonStyle, CSSProperties> = {
  [ButtonStyle.SOLID]: {
    // cursor: 'not-allowed',
    backgroundColor: '#eeeeee',
    color: '#aaaaaa',
  },
  [ButtonStyle.OUTLINED]: {
    // cursor: 'not-allowed',
    backgroundColor: '#eeeeee',
    borderColor: '#bebebe',
    color: '#bbbbbb',
  },
} as const;
