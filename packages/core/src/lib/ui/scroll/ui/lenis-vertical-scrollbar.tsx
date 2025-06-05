import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

import { zIndex } from '@/lib/constants';
import { useKeepAliveLenisScrollHistory } from '@/lib/hooks';
import type Lenis from 'lenis';

export function LenisVerticalScrollbar({
  onScroll = () => {},
  lenisCallback = () => {},
  callbackDeps = [],
  position = 'fixed',
  disabled = false,
  containerTopOffset = 0,
  historyEnabled = true,
}: {
  onScroll?: (scroll: number, limit: number) => void;
  lenisCallback?: (lenis: Lenis) => void;
  callbackDeps?: any[];
  position?: 'fixed' | 'absolute';
  disabled?: boolean;
  containerTopOffset?: string | number;
  historyEnabled?: boolean;
}) {
  // const location = useLocation();
  const lenis = useLenis(lenisCallback, callbackDeps);

  useKeepAliveLenisScrollHistory({ enabled: historyEnabled });

  useEffect(() => {
    if (!lenis) return;

    if (disabled) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [disabled, lenis]);

  const thumbRef = useRef<HTMLDivElement>(null);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const startScrollRef = useRef(0);

  const [visible, setVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   if (!lenis) return;
  //
  //   setTimeout(() => {
  //     lenis.resize();
  //     // lenis.scrollTo(0, { lerp: 0.2 });
  //     lenis.scrollTo(0, { immediate: true });
  //   }, 100);
  // }, [location.pathname, lenis]);

  useEffect(() => {
    const handleWindowBlur = () => {
      if (!isDragging) {
        setIsHover(false);
        setVisible(false);
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    return () => {
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const scrollbarElement = thumbRef.current?.parentElement;
      if (scrollbarElement && !scrollbarElement.contains(e.target as Node)) {
        if (!isDragging) {
          setIsHover(false);
          setVisible(false);
        }
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isDragging]);

  useEffect(() => {
    if (disabled) {
      setVisible(false);
      setThumbHeight(0);
    }
  }, [disabled]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!lenis || disabled) return;

    const handleScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      const containerHeight = lenis ? lenis.dimensions?.height : window.innerHeight;
      const scrollHeight = limit + containerHeight;
      const heightRatio = containerHeight / scrollHeight;
      const thumbH = containerHeight * heightRatio;
      const thumbT = (scroll / limit) * (containerHeight - thumbH);

      setThumbTop(thumbT);
      setThumbHeight(Math.max(30, thumbH));

      setVisible(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setVisible(false), 1000);

      onScroll(isNaN(thumbT) ? 0 : thumbT, lenis.limit);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [lenis,
    // location.pathname,
    disabled, onScroll]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startYRef.current = e.clientY;
    startScrollRef.current = lenis?.scroll ?? 0;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isDragging || !lenis || disabled) return;

    const handleMove = (e: PointerEvent) => {
      const deltaY = e.clientY - startYRef.current;
      const containerHeight = lenis ? lenis.dimensions?.height : window.innerHeight;
      const scrollbarMovable = containerHeight - thumbHeight;
      const scrollableHeight = lenis.limit;
      const scrollRatio = scrollableHeight / scrollbarMovable;
      const newScroll = startScrollRef.current + deltaY * scrollRatio;

      lenis.scrollTo(newScroll, { immediate: true });

      onScroll(newScroll, lenis.limit);
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [disabled, isDragging, thumbHeight, lenis, onScroll]);

  return (
    <div
      role='scrollbar'
      aria-label='페이지 스크롤바'
      aria-orientation='vertical'
      aria-hidden={disabled}
      style={{
        position,
        top: containerTopOffset,
        right: 0,
        height: position === 'absolute' ? '100%' : '100svh',
        paddingBlock: 2,
        paddingRight: 2,
        paddingLeft: isHover ? 6 : 2,
        transition: 'all 0.3s ease',
        opacity: lenis && lenis.limit > 0 && visible ? 1 : 0,
        zIndex: zIndex.scrollbar,
      }}
      onMouseEnter={() => {
        if (lenis && lenis.limit > 0) {
          setVisible(true);
          setIsHover(true);
        }
      }}
      onMouseLeave={() => {
        if (!isDragging) setIsHover(false);
      }}
    >
      <motion.div
        ref={thumbRef}
        onPointerDown={handlePointerDown}
        style={{
          position: 'relative',
          top: thumbTop || 0,
          right: 0,
          width: isHover ? 8 : 4,
          height: thumbHeight || 0,
          borderRadius: 4,
          cursor: lenis && lenis.limit > 0 ? 'pointer' : 'default',
          zIndex: 9999,
          transition: 'width 0.3s ease',
        }}
        initial={{ backgroundColor: '#cccccc' }}
        animate={{ backgroundColor: isDragging ? '#1e84f1' : '#cccccc' }}
      />
    </div>
  );
}
