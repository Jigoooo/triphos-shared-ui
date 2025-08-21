import type { CSSProperties } from 'react';

import type { LinkVariant } from '../model/link-type.ts';

export const defaultLinkSize = 16;
export const defaultLinkVariant: LinkVariant = 'default';
export const defaultUnderline = 'hover';

const convertSizeToRem = (size: number | string, remPx: number): string => {
  if (typeof size === 'string') {
    return size;
  }
  return `${size / remPx}rem`;
};

export const getLinkBaseStyle = ({
  disabled,
  variant,
  size,
  underline,
  style,
  remPx,
}: {
  disabled: boolean;
  variant: LinkVariant;
  size: number | string;
  underline: 'always' | 'hover' | 'none';
  style?: CSSProperties;
  remPx: number;
}): CSSProperties => {
  const fontSize = convertSizeToRem(size, remPx);
  const lineHeight = typeof size === 'number' ? 1.5 : 'normal';

  const variantStyles = {
    default: {
      color: 'currentColor',
      textDecoration: 'none',
    },
    primary: {
      color: '#3b82f6',
      textDecoration: 'none',
    },
    secondary: {
      color: '#6b7280',
      textDecoration: 'none',
    },
    danger: {
      color: '#dc2626',
      textDecoration: 'none',
    },
    ghost: {
      color: 'inherit',
      textDecoration: 'none',
      opacity: 0.7,
    },
  };

  const underlineStyles = {
    always: { textDecoration: 'underline' },
    hover: { textDecoration: 'none' },
    none: { textDecoration: 'none' },
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
    outline: 'none',
    transition: 'all 0.15s ease-in-out',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    fontSize,
    lineHeight,
    ...variantStyles[variant],
    ...underlineStyles[underline],
    ...style,
  };
};

export const getLinkHoverStyle = (
  variant: LinkVariant,
  underline: 'always' | 'hover' | 'none',
): CSSProperties => {
  const hoverColors = {
    default: { color: '#374151' },
    primary: { color: '#2563eb' },
    secondary: { color: '#4b5563' },
    danger: { color: '#b91c1c' },
    ghost: { opacity: 1 },
  };

  const baseHover = {
    ...hoverColors[variant],
  };

  if (underline === 'hover') {
    return {
      ...baseHover,
      textDecoration: 'underline',
    };
  }

  return baseHover;
};

export const getLinkFocusStyle = (): CSSProperties => ({
  outline: '0.125rem solid #3b82f6',
  outlineOffset: '0.125rem',
});

export const getExternalIconStyle = (size: number | string, remPx: number): CSSProperties => {
  const iconSize = convertSizeToRem(size, remPx);

  return {
    flexShrink: 0,
    width: iconSize,
    height: iconSize,
  };
};

export const getLoadingSpinnerStyle = (size: number | string, remPx: number): CSSProperties => {
  const spinnerSize = convertSizeToRem(size, remPx);

  return {
    display: 'inline-block',
    border: '0.125rem solid transparent',
    borderTop: '0.125rem solid currentColor',
    borderRadius: '50%',
    width: spinnerSize,
    height: spinnerSize,
  };
};
