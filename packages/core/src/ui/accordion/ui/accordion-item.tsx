import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import {
  accordionItemContentStyle,
  accordionItemIconStyle,
  accordionItemTitleStyle,
  getAccordionItemHeaderStyle,
  getAccordionItemIconStyle,
} from '../config/accordion-style.ts';
import { useAccordionGroupContext } from '../model/accordion-group-context';
import type { AccordionItemProps } from '../model/accordion-type';
import { useAccordionItemContentMeasureHeight } from '../model/use-accordion-item-content-measure-height.ts';
import { FlexColumn, FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function AccordionItem({ title, headerStyle, children, index = 0 }: AccordionItemProps) {
  const { openItems, toggleItem } = useAccordionGroupContext();
  const isOpen = openItems.includes(index);

  const [hover, setHover] = useState(false);

  const { contentRef, contentHeight } = useAccordionItemContentMeasureHeight({ children, isOpen });

  const handleToggle = () => toggleItem(index);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <FlexColumn>
      <FlexRow
        role='button'
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={getAccordionItemHeaderStyle({
          isOpen,
          hover,
          style: headerStyle,
        })}
      >
        <Typography style={accordionItemTitleStyle}>{title}</Typography>

        <FlexRow aria-hidden style={getAccordionItemIconStyle({ isOpen, hover })}>
          <MdOutlineKeyboardArrowDown style={accordionItemIconStyle} />
        </FlexRow>
      </FlexRow>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: contentHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <div ref={contentRef} style={accordionItemContentStyle}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FlexColumn>
  );
}
