import { useState, useId } from 'react';

import { RadioGroupContext } from '../model/radio-group-context.ts';
import type { RadioGroupProps } from '../model/radio-type.ts';

export function RadioGroup({
  children,
  defaultValue,
  value,
  onChange,
  disabled = false,
  style,
}: RadioGroupProps) {
  const autoName = useId();
  const groupName = `radio-group-${autoName}`;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');

  const currentValue = isControlled ? value : internalValue;
  const currentOnChange = isControlled ? onChange : setInternalValue;

  return (
    <div role='radiogroup' style={style}>
      <RadioGroupContext.Provider
        value={{
          name: groupName,
          selectedRadio: currentValue,
          handleSelectedRadio: currentOnChange!,
          groupDisabled: disabled,
        }}
      >
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
}
