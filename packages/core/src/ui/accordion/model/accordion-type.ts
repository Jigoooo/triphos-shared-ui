import type { CSSProperties, ReactNode } from 'react';

export type AccordionType = 'single' | 'multiple';

export type AccordionGroupContextType = {
  type: AccordionType;
  openItems: number[];
  toggleItem: (index: number) => void;
};

export type AccordionGroupProps = {
  type?: AccordionType;
  defaultOpenItems?: number[];
  style?: CSSProperties;
  children: ReactNode;
  onItemChange?: (openItems: number[]) => void;
};

export type AccordionItemProps = {
  title?: string;
  style?: CSSProperties;
  children: ReactNode;
  // 내부적으로 사용할 props (사용자가 직접 설정하지 않음)
  index?: number;
};
