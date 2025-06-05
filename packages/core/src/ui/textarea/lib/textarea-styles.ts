import type { CSSProperties } from 'react';

export const defaultTextareaStyle: CSSProperties = {
  resize: 'vertical',
  paddingInline: '0.5rem',
  paddingBlock: '0.625rem',
  width: '100%',
  height: '6.25rem',
  borderRadius: '0.25rem',
  fontSize: '0.94rem',
  fontWeight: 500,
  boxShadow: `inset 0 0 0 0.8px rgba(0,27,55,0.3)`,
  border: 'none',
  outline: 'none',
} as const;

export const textareaDisabledStyle: CSSProperties = {
  backgroundColor: '#fafafa',
};
