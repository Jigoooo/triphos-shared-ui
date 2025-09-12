import { useState, useId } from 'react';

import { RadioGroupContext } from '../model/radio-group-context.ts';
import {
  type ExtendedValue,
  type RadioGroupContextType,
  type RadioGroupProps,
} from '../model/radio-type.ts';

export function RadioGroup<Value extends ExtendedValue>({
  children,
  defaultValue,
  value,
  onChange,
  disabled = false,
  style,
}: RadioGroupProps<Value>) {
  const autoName = useId();
  const groupName = `radio-group-${autoName}`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<Value | undefined>(defaultValue);

  const currentValue = isControlled ? value : internalValue;
  const currentOnChange = isControlled ? onChange : setInternalValue;

  const contextValue: RadioGroupContextType<Value> = {
    name: groupName,
    selectedRadio: currentValue,
    handleSelectedRadio: currentOnChange,
    groupDisabled: disabled,
  };

  return (
    <div role='radiogroup' style={style}>
      <RadioGroupContext value={contextValue}>{children}</RadioGroupContext>
    </div>
  );
}
