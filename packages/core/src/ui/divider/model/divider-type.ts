import type { CSSProperties, SVGProps } from 'react';

export type DividerProps = {
  direction?: 'horizontal' | 'vertical';
  style?: CSSProperties;
};

export type DashedDividerProps = SVGProps<SVGSVGElement> & {
  style?: CSSProperties;
  strokeColor?: string;
};
