import type { CSSProperties } from 'react';

import { ButtonStyle } from '../model/button-type.ts';
import { colors } from '@/constants';

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
} as const;

export const buttonStyles: Record<ButtonStyle, CSSProperties> = {
  [ButtonStyle.SOLID]: {
    backgroundColor: colors.primary[400],
    color: 'white',
    border: 'none',
  },
  [ButtonStyle.OUTLINED]: {
    backgroundColor: '#ffffff',
    color: colors.primary[400],
    border: `1px solid ${colors.primary[400]}`,
  },
} as const;

export const buttonDisabledStyle: Record<ButtonStyle, CSSProperties> = {
  [ButtonStyle.SOLID]: {
    cursor: 'not-allowed',
    backgroundColor: '#eeeeee',
    color: '#aaaaaa',
  },
  [ButtonStyle.OUTLINED]: {
    cursor: 'not-allowed',
    backgroundColor: '#eeeeee',
    borderColor: '#bebebe',
    color: '#bbbbbb',
  },
} as const;
