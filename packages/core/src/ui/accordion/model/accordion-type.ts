import type { CSSProperties, ReactNode } from 'react';

export type AccordionType = 'single' | 'multiple';

export type AccordionGroupContextType = {
  type?: AccordionType;
};

export type AccordionGroupProps = {
  type?: AccordionType;
  style?: CSSProperties;
  children: ReactNode;
};

export type AccordionItemProps = {
  title?: string;
  style?: CSSProperties;
  isOpen: boolean;
  toggleAccordion: () => void;
  children: ReactNode;
};
