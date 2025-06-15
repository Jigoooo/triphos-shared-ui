import type { HTMLAttributes, ReactNode, RefObject } from 'react';

export type TypographyProps = HTMLAttributes<HTMLSpanElement> & {
  ref?: RefObject<HTMLSpanElement | null>;
  children?: ReactNode;
};
