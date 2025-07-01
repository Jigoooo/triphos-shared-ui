import type { Placement, Strategy } from '@floating-ui/react';
import type { MouseEvent, ReactNode } from 'react';

export type AnchorWithoutActionProps = {
  strategy?: Strategy;
  placement?: Placement;
  minAxisOffset?: number;
  crossAxis?: number;
  isOpen: boolean;
  onClose?: () => void;
  contents: ReactNode;
  cachedChildren?: boolean;
  useAnimation?: boolean;
  children: ReactNode;
};

export type AnchorPickerProps = AnchorWithoutActionProps & {
  setIsOpen: (isOpen: boolean) => void;
  onOverlayClick?: (e: MouseEvent<HTMLDivElement>) => void;
};
