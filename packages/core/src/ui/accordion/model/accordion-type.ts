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

export type AccordionItemHeaderRenderProps = {
  isOpen: boolean;
  toggle: () => void;
};

export type AccordionItemProps = {
  title?: string;
  headerStyle?: CSSProperties;
  children: ReactNode;
  renderHeader?: (props: AccordionItemHeaderRenderProps) => ReactNode;
  index?: number;
};
