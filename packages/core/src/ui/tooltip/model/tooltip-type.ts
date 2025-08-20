import type { Placement } from '@floating-ui/react';
import type { CSSProperties, ReactNode } from 'react';

export type TooltipProps = {
  style?: CSSProperties;
  placement: Placement;
  children: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};
