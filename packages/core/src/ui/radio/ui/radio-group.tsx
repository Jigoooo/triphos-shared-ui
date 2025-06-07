import type { ReactNode } from 'react';

import { RadioGroupContext } from '../model/radio-group-context.ts';

export function RadioGroup({
  name,
  selectedRadio,
  handleSelectedRadio,
  groupDisabled = false,
  children,
}: {
  name: string;
  selectedRadio: string;
  handleSelectedRadio: (value: string) => void;
  groupDisabled?: boolean;
  children: ReactNode;
}) {
  return (
    <RadioGroupContext value={{ name, selectedRadio, handleSelectedRadio, groupDisabled }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </RadioGroupContext>
  );
}
