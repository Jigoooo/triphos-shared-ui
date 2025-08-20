import { createContext, use } from 'react';

import type { AccordionGroupContextType } from './accordion-type.ts';

export const AccordionGroupContext = createContext<AccordionGroupContextType | null>(null);

export function useAccordionGroupContext() {
  const context = use(AccordionGroupContext);
  if (!context) {
    throw new Error('AccordionItem must be used within a AccordionGroup');
  }
  return context;
}
