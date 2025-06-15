import type { AnchorHTMLAttributes } from 'react';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  disabled?: boolean;
  children: string;
};
