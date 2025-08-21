import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type LinkVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'ghost';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  disabled?: boolean;
  children: ReactNode;
  variant?: LinkVariant;
  underline?: 'always' | 'hover' | 'none';
  size?: number | string;
  loading?: boolean;
  external?: boolean;
};
