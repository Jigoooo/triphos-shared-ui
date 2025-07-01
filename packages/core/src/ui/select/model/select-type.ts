import type { HTMLProps } from 'react';
import type { ReferenceType, VirtualElement } from '@floating-ui/react';

export type SelectOption<ValueType extends string | number> = {
  label: string;
  value: ValueType;
};

export type MultiSelectOption = {
  label: string;
  value: string | number;
};

export type CustomOptionRendererProps<ValueType extends string | number> = {
  option: SelectOption<ValueType>;
  index: number;
  isSelected: boolean;
  isHighlighted: boolean;
  onSelect: (value: ValueType) => void;
};

export type CustomContainerRendererProps = {
  ref?: ((node: ReferenceType | null) => void) & ((node: Element | VirtualElement | null) => void);
  label?: string;
  selectedLabel?: string;
  toggleSelectBox: () => void;
  containerHeight: string | number;
  getReferenceProps: (userProps?: HTMLProps<Element>) => Record<string, unknown>;
  isOpen: boolean;
};
