import { createContext, use } from 'react';

import type { RadioGroupContextType } from '../model/radio-type.ts';

export const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export function useRadioGroupContext() {
  const context = use(RadioGroupContext);
  if (!context) {
    throw new Error('Radio must be used within a RadioGroup');
  }
  return context;
}
