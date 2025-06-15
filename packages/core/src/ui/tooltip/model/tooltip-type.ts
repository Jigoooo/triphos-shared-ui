import type { CSSProperties, ReactNode } from 'react';
import type { Placement } from '@floating-ui/react';

export type TooltipProps = {
  style?: CSSProperties;
  placement: Placement;
  children: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};
