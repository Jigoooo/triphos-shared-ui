import { RadioGroupContext } from '../model/radio-group-context.ts';
import type { RadioGroupProps } from '../model/radio-type.ts';

export function RadioGroup({
  name,
  selectedRadio,
  handleSelectedRadio,
  groupDisabled = false,
  children,
}: RadioGroupProps) {
  return (
    <RadioGroupContext value={{ name, selectedRadio, handleSelectedRadio, groupDisabled }}>
      {children}
    </RadioGroupContext>
  );
}
