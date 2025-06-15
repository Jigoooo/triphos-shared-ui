import type { Placement, Strategy } from '@floating-ui/react';
import type { MouseEvent, ReactNode } from 'react';

export type SelectOption<ValueType extends string | number> = {
  label: string;
  value: ValueType;
};

export type MultiSelectOption = {
  label: string;
  value: string | number;
};

export type TimePart = 'hours' | 'minutes' | 'seconds';

export type AnchorPickerProps = {
  strategy?: Strategy;
  placement?: Placement;
  minAxisOffset?: number;
  crossAxis?: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOverlayClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
  contents: ReactNode;
  cachedChildren?: boolean;
  useAnimation?: boolean;
  children: ReactNode;
};
