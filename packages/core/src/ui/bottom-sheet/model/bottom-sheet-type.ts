import type { CSSProperties, ReactNode } from 'react';

import type { ButtonProps } from '@/ui/button';
import { type InputProps } from '@/ui/input';
import type { SelectOption } from '@/ui/select';

export type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxHeight?: string | number;
  dragThreshold?: string | number;
  bottomInset?: string | number;
  showGrab?: boolean;
  grabContainerStyle?: CSSProperties;
  grabStyle?: CSSProperties;
};

export type BottomSheetDefaultOptionProps<TValue extends string | number> = Omit<
  ButtonProps,
  'children'
> & {
  option: SelectOption<TValue>;
  isSelected: boolean;
};

export type BottomSheetWithInputProps = InputProps & {
  bottomSheetContent: ReactNode | ((props: { close: () => void }) => ReactNode);
  bottomSheetMaxHeight?: string | number;
  bottomSheetDragThreshold?: string | number;
};
