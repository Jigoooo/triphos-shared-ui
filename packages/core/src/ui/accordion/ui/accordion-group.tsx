import { FlexColumn } from '@/ui/view';
import { AccordionGroupContext } from '../model/accordion-group-context.ts';
import type { AccordionGroupProps } from '../model/accordion-type.ts';

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
