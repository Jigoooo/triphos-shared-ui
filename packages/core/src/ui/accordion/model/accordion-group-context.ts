import { createContext } from 'react';

import type { AccordionGroupContextType } from './accordion-type.ts';

export const AccordionGroupContext = createContext<AccordionGroupContextType>({});

// function useAccordionGroupContext() {
//   const context = use(AccordionGroupContext);
//   if (!context) {
//     throw new Error('Accordion must be used within a AccordionGroup');
//   }
//   return context;
// }
