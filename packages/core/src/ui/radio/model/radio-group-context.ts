import { createContext, use } from 'react';

import type { ExtendedValue, RadioGroupContextType } from '../model/radio-type.ts';

export const RadioGroupContext = createContext<RadioGroupContextType<any> | null>(null);

export function useRadioGroupContext<Value extends ExtendedValue>(): RadioGroupContextType<Value> {
  const context = use(RadioGroupContext);
  if (!context) {
    throw new Error('Radio must be used within a RadioGroup');
  }
  return context as RadioGroupContextType<Value>;
}
