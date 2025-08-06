import type { CSSProperties } from 'react';

export type CloseIconButtonProps = {
  size?: string;
  iconSize?: string;
  color?: string;
  style?: CSSProperties;
  close: () => void;
  iconStyle?: CSSProperties;
};
