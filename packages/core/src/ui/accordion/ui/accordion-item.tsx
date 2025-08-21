import { AnimatePresence, motion } from 'framer-motion';
import { useState, type KeyboardEvent } from 'react';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import {
  accordionDefaultTransition,
  accordionItemContentStyle,
  accordionItemIconStyle,
  accordionItemTitleStyle,
  getAccordionItemHeaderStyle,
  getAccordionItemIconStyle,
} from '../config/accordion-style.ts';
import { useAccordionGroupContext } from '../model/accordion-group-context';
import type { AccordionItemProps, AccordionItemHeaderRenderProps } from '../model/accordion-type';
import { useAccordionItemContentMeasureHeight } from '../model/use-accordion-item-content-measure-height.ts';
import { FlexColumn, FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function AccordionItem({
  title,
  headerStyle,
  renderHeader,
  children,
  index = 0,
  customTransition,
}: AccordionItemProps) {
  const { openItems, toggleItem } = useAccordionGroupContext();
  const isOpen = openItems.includes(index);

  const [hover, setHover] = useState(false);

  const { contentRef, contentHeight } = useAccordionItemContentMeasureHeight({ children, isOpen });

  const handleToggle = () => toggleItem(index);
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const headerRenderProps: AccordionItemHeaderRenderProps = {
    isOpen,
    toggle: handleToggle,
  };

  const headerId = `accordion-header-${index}`;
  const panelId = `accordion-panel-${index}`;

  const headerContent = renderHeader ? (
    renderHeader(headerRenderProps)
  ) : (
    <FlexRow
      role='button'
      tabIndex={0}
      id={headerId}
      aria-expanded={isOpen}
      aria-controls={panelId}
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

      <FlexRow aria-hidden='true' style={getAccordionItemIconStyle({ isOpen, hover })}>
        <MdOutlineKeyboardArrowDown style={accordionItemIconStyle} />
      </FlexRow>
    </FlexRow>
  );

  return (
    <FlexColumn>
      {headerContent}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: contentHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
            transition={customTransition ?? accordionDefaultTransition}
          >
            <div
              ref={contentRef}
              id={panelId}
              role='region'
              aria-labelledby={headerId}
              style={accordionItemContentStyle}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FlexColumn>
  );
}
