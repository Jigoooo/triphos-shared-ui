import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
import { useEffectOnActive } from 'keepalive-for-react';

export function useKeepAliveScrollHistoryRef<T extends HTMLElement>({
  ref,
  axis = 'vertical',
  delay = 0,
  scrollResetAction,
}: {
  ref: RefObject<T | null>;
  axis?: 'vertical' | 'horizontal';
  delay?: number;
  scrollResetAction?: (scrollValue: number) => void;
}) {
  // const location = useLocation();
  const scrollHistoryMap = useRef<Map<string, number>>(new Map());

  const activeKey = location.pathname + location.search;

  useEffectOnActive(() => {
    const storedValue = scrollHistoryMap.current.get(activeKey) || 0;
    scrollResetAction?.(storedValue);
  }, [activeKey]);

  useEffect(() => {
    const dom = ref?.current;
    if (!dom) return;

    setTimeout(() => {
      const storedValue = scrollHistoryMap.current.get(activeKey) || 0;
      if (axis === 'vertical') {
        dom.scrollTo(0, storedValue);
      } else {
        dom.scrollTo(storedValue, 0);
      }
    }, delay);

    const onScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (axis === 'vertical') {
        scrollHistoryMap.current.set(activeKey, target.scrollTop || 0);
      } else {
        scrollHistoryMap.current.set(activeKey, target.scrollLeft || 0);
      }
    };

    dom.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      dom.removeEventListener('scroll', onScroll);
    };
  }, [activeKey, axis, delay, ref]);

  return ref;
}
