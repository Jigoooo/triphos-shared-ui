import type { CSSProperties } from 'react';

import { InputStyle } from '../model/input-type.ts';

export const defaultInputStyle: CSSProperties = {
  width: 'auto',
  paddingInline: '0.5rem',
  paddingBlock: '0.625rem',
  borderRadius: '0.25rem',
  fontSize: '0.9rem',
  fontWeight: 500,
  height: '2rem',
  outline: 'none',
} as const;

export const inputWithTypeStyles: Record<InputStyle, CSSProperties> = {
  [InputStyle.SOFT]: {
    backgroundColor: '#eaeaea',
    border: 'none',
  },
  [InputStyle.OUTLINED]: {
    backgroundColor: '#ffffff',
    boxShadow: `inset 0 0 0 0.8px rgba(0,27,55,0.24)`,
    border: 'none',
  },
  [InputStyle.UNDERLINE]: {
    backgroundColor: '#ffffff',
    borderRadius: 0,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    // borderBottom: `1.4px solid #c4c4c4`,
    border: 'none',
    boxShadow: 'inset 0 -1.4px 0 0 #c4c4c4',
  },
} as const;

export const inputDisabledStyles: Record<InputStyle, CSSProperties> = {
  [InputStyle.SOFT]: {
    backgroundColor: '#f3f3f3',
  },
  [InputStyle.OUTLINED]: {
    boxShadow: `inset 0 0 0 0.8px rgba(0,27,55,0.3)`,
    backgroundColor: '#eaeaea',
  },
  [InputStyle.UNDERLINE]: {
    // borderBottom: `2px solid #e1e1e1`,
    boxShadow: 'inset 0 -2px 0 0 #e1e1e1',
  },
} as const;
