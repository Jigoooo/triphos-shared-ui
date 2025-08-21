import { Children, cloneElement, isValidElement, type ReactElement, useState } from 'react';

import { AccordionGroupContext } from '../model/accordion-group-context.ts';
import type { AccordionGroupProps } from '../model/accordion-type.ts';
import { FlexColumn } from '@/ui/layout';

export function AccordionGroup({
  type = 'single',
  defaultOpenItems = [],
  style,
  children,
  onItemChange,
}: AccordionGroupProps) {
  const [openItems, setOpenItems] = useState<number[]>(defaultOpenItems);

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      let newOpenItems: number[];

      if (type === 'single') {
        // single: 클릭한 아이템만 열리고 나머지는 닫힘
        newOpenItems = prev.includes(index) ? [] : [index];
      } else {
        // multiple: 클릭한 아이템을 토글
        newOpenItems = prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index];
      }

      // 외부 콜백 호출
      onItemChange?.(newOpenItems);
      return newOpenItems;
    });
  };

  const contextValue = {
    type,
    openItems,
    toggleItem,
  };

  // children에 index를 전달 - 현대적이고 안전한 방식
  const childrenWithIndex = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<any>, {
        index,
      });
    }
    return child;
  });

  return (
    <AccordionGroupContext value={contextValue}>
      <FlexColumn
        role='region'
        aria-label='Accordion'
        style={{
          userSelect: 'none',
          gap: '0.5rem',
          ...style,
        }}
      >
        {childrenWithIndex}
      </FlexColumn>
    </AccordionGroupContext>
  );
}
