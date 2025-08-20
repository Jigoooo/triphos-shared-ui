import { type ReactNode, useEffect, useRef, useState } from 'react';

export function useAccordionItemContentMeasureHeight({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setContentHeight(el.scrollHeight);

    measure();

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

  return {
    contentRef,
    contentHeight,
  };
}
