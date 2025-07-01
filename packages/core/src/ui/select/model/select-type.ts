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
