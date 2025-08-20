import { AccordionGroupContext } from '../model/accordion-group-context.ts';
import type { AccordionGroupProps } from '../model/accordion-type.ts';
import { FlexColumn } from '@/ui/layout';

export function AccordionGroup({ type = 'single', style, children }: AccordionGroupProps) {
  return (
    <AccordionGroupContext value={{ type }}>
      <FlexColumn
        style={{
          userSelect: 'none',
          gap: '1rem',
          ...style,
        }}
      >
        {children}
      </FlexColumn>
    </AccordionGroupContext>
  );
}
