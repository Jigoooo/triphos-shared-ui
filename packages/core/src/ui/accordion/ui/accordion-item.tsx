import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import { useAccordionGroupContext } from '../model/accordion-group-context';
import type { AccordionItemProps } from '../model/accordion-type';
import { FlexColumn, FlexRow } from '@/ui/layout';
import { Typography } from '@/ui/typography';

export function AccordionItem({ title, style, children, index = 0 }: AccordionItemProps) {
  const { openItems, toggleItem } = useAccordionGroupContext();
  const isOpen = openItems.includes(index);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [hover, setHover] = useState(false);

  // 콘텐츠 높이 자동 측정 (ResizeObserver 지원 + fallback)
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setContentHeight(el.scrollHeight);

    // 최초 측정
    measure();

    // 동적 콘텐츠 대응
    let observer: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      observer = new ResizeObserver(measure);
      observer.observe(el);
    } else {
      const id = setInterval(measure, 200);
      return () => clearInterval(id);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [children, isOpen]);

  const handleToggle = () => toggleItem(index);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const headerStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem',

      padding: '0.875rem 1rem',
      borderRadius: '12px',

      background: isOpen ? '#F8FAFF' : hover ? '#FBFCFE' : '#FFFFFF',
      border: isOpen ? '1px solid #E1E8FF' : '1px solid #ECEEF3',
      boxShadow: isOpen || hover ? '0 4px 14px rgba(20, 29, 58, 0.06)' : '0 0 0 rgba(0,0,0,0)',

      transition:
        'background 160ms ease, box-shadow 160ms ease, border-color 160ms ease, transform 120ms ease',
      cursor: 'pointer',

      // 외부 전달 스타일 병합
      ...style,
    }),
    [hover, isOpen, style],
  );

  const iconCapsuleStyle = useMemo<React.CSSProperties>(
    () => ({
      width: 28,
      height: 28,
      minWidth: 28,
      borderRadius: 999,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      background: isOpen ? '#EEF2FF' : hover ? '#F3F5F9' : 'transparent',
      border: isOpen ? '1px solid #DDE5FF' : '1px solid transparent',
      transition: 'background 160ms ease, transform 200ms ease, border-color 160ms ease',
      transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
    }),
    [hover, isOpen],
  );

  return (
    <FlexColumn>
      {/* 헤더 */}
      <FlexRow
        role='button'
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={headerStyle}
      >
        <Typography
          style={{
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: '#1F2430',
            userSelect: 'none',
          }}
        >
          {title}
        </Typography>

        {/* 아이콘 캡슐 */}
        <FlexRow aria-hidden style={iconCapsuleStyle}>
          <MdOutlineKeyboardArrowDown style={{ fontSize: '1.3rem', color: '#3A3F4B' }} />
        </FlexRow>
      </FlexRow>

      {/* 콘텐츠 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: contentHeight, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <div
              ref={contentRef}
              style={{
                padding: '0.5rem 0',
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FlexColumn>
  );
}
