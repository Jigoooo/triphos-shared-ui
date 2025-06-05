import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { Divider, FlexColumn, FlexRow, Typography } from '@/ui/view';
import type { AccordionItemProps } from '../model/accordion-type';

export function AccordionItem({
  title,
  style,
  isOpen,
  toggleAccordion,
  children,
}: AccordionItemProps) {
  // const { type } = useAccordionGroupContext();

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen]);

  return (
    <FlexColumn>
      <FlexRow
        style={{
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBlock: '2rem',
          ...style,
        }}
        onClick={toggleAccordion}
      >
        <Typography>{title}</Typography>
        <FlexRow
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <MdOutlineKeyboardArrowDown style={{ fontSize: '1.4rem' }} />
        </FlexRow>
      </FlexRow>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: contentHeight }}
            exit={{ height: 0 }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div ref={contentRef}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <Divider style={{ backgroundColor: '#dddddd' }} />
    </FlexColumn>
  );
}
