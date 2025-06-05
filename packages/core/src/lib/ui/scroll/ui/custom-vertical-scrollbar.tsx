import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';

import { useKeepAliveScrollHistoryRef } from '@/lib/hooks';
import { handleTrackMouseDown } from '@/lib/ui';

type CustomVerticalScrollbarProps = {
  ref: RefObject<HTMLDivElement | null>;
  isTimeoutHiding?: boolean;
  totalContentHeight: number;
  border?: string;
  backgroundColor?: string;
};

export function CustomVerticalScrollbar({
  ref,
  isTimeoutHiding = false,
  totalContentHeight,
  border = '1px solid #bdc3c7',
  backgroundColor = '#f1f1f1',
}: CustomVerticalScrollbarProps) {
  const { scrollYProgress, scrollY } = useScroll({ container: ref });
  const effectiveProgress = useMotionValue(0);

  const bodyScrollHistoryRef = useKeepAliveScrollHistoryRef({
    ref,
    scrollResetAction: (scrollValue) => {
      if (scrollValue === 0) {
        setTimeout(() => {
          if (bodyScrollHistoryRef.current) {
            bodyScrollHistoryRef.current.scrollTop = 0;
          }

          effectiveProgress.set(0);
        }, 50);
      }
    },
  });

  const [containerHeight, setContainerHeight] = useState(0);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialScrollTop = useRef(0);

  useEffect(() => {
    if (bodyScrollHistoryRef.current) {
      setContainerHeight(bodyScrollHistoryRef.current.clientHeight);
    }
  }, [bodyScrollHistoryRef]);

  useEffect(() => {
    if (!bodyScrollHistoryRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    resizeObserver.observe(bodyScrollHistoryRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [bodyScrollHistoryRef]);

  useEffect(() => {
    if (!isTimeoutHiding) {
      setShowScrollbar(true);
      return;
    }

    const container = bodyScrollHistoryRef.current;
    if (!container) return;

    const handleScroll = () => {
      // 컨테이너의 스크롤 이벤트가 발생하면 스크롤바를 보임
      setShowScrollbar(true);

      // 기존 타임아웃이 있다면 클리어
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      // 1초 후에 스크롤바 숨김
      hideTimeoutRef.current = setTimeout(() => {
        setShowScrollbar(false);
      }, 2000);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [bodyScrollHistoryRef]);

  // 컨테이너 높이가 총 컨텐츠 높이보다 크면 스크롤바가 필요없으므로 숨김
  const isScrollbarNeeded = totalContentHeight > containerHeight;

  // thumb 높이 계산: 컨테이너 높이 * (컨테이너 높이 / 컨텐츠 전체 높이)
  const minThumbHeight = 14;
  const computedThumbHeight = containerHeight * (containerHeight / totalContentHeight);
  const safeThumbHeight =
    isNaN(computedThumbHeight) || computedThumbHeight === Infinity
      ? minThumbHeight
      : Math.max(minThumbHeight, computedThumbHeight);

  // const thumbHeight = containerHeight * (containerHeight / totalContentHeight);
  // const safeThumbHeight = isNaN(thumbHeight) || thumbHeight === Infinity ? 1 : thumbHeight;

  const prevTotalContentHeight = useRef(totalContentHeight);

  useMotionValueEvent(scrollYProgress, 'change', (latestValue) => {
    if (isScrollbarNeeded) {
      effectiveProgress.set(latestValue);
    } else {
      effectiveProgress.set(0);
    }
  });

  useEffect(() => {
    if (prevTotalContentHeight.current !== totalContentHeight) {
      if (bodyScrollHistoryRef.current) {
        bodyScrollHistoryRef.current.scrollTop = 0;
      }
      setTimeout(() => {
        effectiveProgress.set(0);
      }, 0);
      prevTotalContentHeight.current = totalContentHeight;
    }
  }, [totalContentHeight]);

  const thumbTop = useTransform(effectiveProgress, [0, 1], [0, containerHeight - safeThumbHeight]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: 14,
        height: containerHeight,
        backgroundColor,
        display: isScrollbarNeeded && showScrollbar ? 'initial' : 'none',
        pointerEvents: isScrollbarNeeded && showScrollbar ? 'auto' : 'none',
        borderLeft: border,
      }}
      onMouseDown={(event) => {
        handleTrackMouseDown({
          event,
          ref: bodyScrollHistoryRef,
          containerHeight,
        });
      }}
    >
      <motion.div
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onPointerDown={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
        onDragStart={(event) => {
          event.stopPropagation();
          initialScrollTop.current = scrollY.get();
        }}
        onDrag={(event, info) => {
          event.stopPropagation();
          if (bodyScrollHistoryRef.current) {
            const container = bodyScrollHistoryRef.current;
            const scrollableHeight = container.scrollHeight - container.clientHeight;
            const scrollbarMovableDistance = containerHeight - safeThumbHeight;
            const scrollRatio = scrollableHeight / scrollbarMovableDistance;
            const newScrollTop = initialScrollTop.current + info.offset.y * scrollRatio;

            container.scrollTop = Math.max(0, Math.min(newScrollTop, scrollableHeight));
          }
        }}
        style={{
          position: 'absolute',
          left: 2.8,
          width: 8,
          height: safeThumbHeight,
          backgroundColor: '#cccccc',
          borderRadius: 4,
          top: thumbTop,
          cursor: 'pointer',
          transition: 'top 0.2s ease-out',
        }}
        whileDrag={{ backgroundColor: '#999999' }}
      />
    </motion.div>
  );
}
