import { useEffect, useRef, useState } from 'react';

import { type SimpleScrollbarProps } from '../model/scroll-type.ts';
import { zIndex } from '@/constants';

export function SimpleScrollbar({
  scrollElementRef,
  containerRef,
  useAbsolute = false,
}: SimpleScrollbarProps) {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [containerOffset, setContainerOffset] = useState({ top: 0, right: 0 });
  const initialScrollTop = useRef(0);
  const isDragging = useRef(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const showScrollbarWithTimer = () => {
    setIsVisible(true);
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    hideTimer.current = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (!scrollElement) return;

    const updateScrollbar = () => {
      const containerHeight = scrollElement.clientHeight;
      const contentHeight = scrollElement.scrollHeight;
      const scrollTop = scrollElement.scrollTop;

      // 스크롤바 위치 offset 계산
      const rect = scrollElement.getBoundingClientRect();

      if (useAbsolute && containerRef?.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const scrollElementRect = scrollElement.getBoundingClientRect();
        setContainerOffset({
          top: scrollElementRect.top - containerRect.top,
          right: containerRect.right - scrollElementRect.right,
        });
      } else {
        setScrollOffset(rect.top);
      }

      if (contentHeight <= containerHeight) {
        setShowScrollbar(false);
        return;
      }

      setShowScrollbar(true);

      // 스크롤바 높이 계산 (최소 20px)
      const minThumbHeight = 20;
      const thumbHeight = Math.max(
        minThumbHeight,
        (containerHeight / contentHeight) * containerHeight,
      );

      // 스크롤바 위치 계산
      const maxScrollTop = contentHeight - containerHeight;
      const maxThumbTop = containerHeight - thumbHeight;
      const thumbTop = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * maxThumbTop : 0;

      setThumbHeight(thumbHeight);
      setThumbTop(thumbTop);
    };

    const showScrollbarWithTimer = () => {
      setIsVisible(true);
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
      hideTimer.current = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const handleScroll = () => {
      if (!isDragging.current) {
        updateScrollbar();
      }
      showScrollbarWithTimer();
    };

    scrollElement.addEventListener('scroll', handleScroll);
    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(scrollElement);

    const initScrollbar = () => {
      updateScrollbar();

      const hasScrollableContent = scrollElement.scrollHeight > scrollElement.clientHeight;
      if (hasScrollableContent && scrollElement.scrollTop > 0) {
        showScrollbarWithTimer();
      }
    };

    const timeoutId = setTimeout(initScrollbar, 10);

    return () => {
      clearTimeout(timeoutId);
      scrollElement.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, [containerRef, scrollElementRef, useAbsolute]);

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!scrollElementRef.current) return;

    const scrollElement = scrollElementRef.current;
    const startY = e.clientY;
    const containerHeight = scrollElement.clientHeight;

    isDragging.current = true;
    initialScrollTop.current = scrollElement.scrollTop;

    setIsVisible(true);
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollElementRef.current) return;

      const deltaY = e.clientY - startY;
      const scrollableHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
      const scrollbarMovableDistance = containerHeight - thumbHeight;
      const scrollRatio = scrollableHeight / scrollbarMovableDistance;
      const newScrollTop = initialScrollTop.current + deltaY * scrollRatio;

      scrollElement.scrollTop = Math.max(0, Math.min(newScrollTop, scrollableHeight));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      showScrollbarWithTimer();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTrackMouseDown = (e: React.MouseEvent) => {
    if (!scrollElementRef.current) return;

    const scrollElement = scrollElementRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const containerHeight = scrollElement.clientHeight;
    const scrollableHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const scrollbarMovableDistance = containerHeight - thumbHeight;
    const targetThumbTop = clickY - thumbHeight / 2;
    const clampedThumbTop = Math.max(0, Math.min(targetThumbTop, scrollbarMovableDistance));
    const scrollProgress = clampedThumbTop / scrollbarMovableDistance;

    scrollElement.scrollTop = scrollProgress * scrollableHeight;
  };

  if (!showScrollbar || !scrollElementRef.current) return null;

  const containerHeight = scrollElementRef.current.clientHeight;

  return (
    <div
      style={{
        position: useAbsolute ? 'absolute' : 'fixed',
        right: useAbsolute ? containerOffset.right : 0,
        top: useAbsolute ? containerOffset.top : scrollOffset,
        width: 8,
        height: containerHeight,
        backgroundColor: 'transparent',
        zIndex: zIndex.scrollbar,
        paddingRight: 2,
      }}
      onMouseDown={handleTrackMouseDown}
    >
      <div
        onMouseDown={handleThumbMouseDown}
        style={{
          position: 'absolute',
          right: '0.1rem',
          width: '0.3rem',
          height: thumbHeight,
          backgroundColor: '#cccccc',
          borderRadius: 4,
          top: thumbTop,
          cursor: 'pointer',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#999999';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#cccccc';
        }}
      />
    </div>
  );
}
