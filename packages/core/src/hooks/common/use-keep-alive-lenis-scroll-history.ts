import { useEffect, useRef } from 'react';
import { useEffectOnActive } from 'keepalive-for-react';
import { useLenis } from 'lenis/react';

export function useKeepAliveLenisScrollHistory({
  enabled,
  delay = 0,
}: { enabled?: boolean; delay?: number } = {}) {
  const lenis = useLenis();
  // const location = useLocation();
  const scrollHistoryMap = useRef<Map<string, number>>(new Map());

  const activeKey = location.pathname + location.search;

  useEffectOnActive(() => {
    if (!lenis || !enabled) return;

    const storedValue = scrollHistoryMap.current.get(activeKey) || 0;

    // lenis.resize();
    // if (lenis?.limit > 0) {
    //   setTimeout(() => {
    //     lenis.scrollTo(storedValue, { immediate: true });
    //   }, 200);
    // }

    const timeoutId = setTimeout(() => {
      lenis.scrollTo(storedValue, { immediate: true });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lenis, activeKey, enabled]);

  useEffect(() => {
    if (!lenis || !enabled) return;

    const timeoutId = setTimeout(() => {
      const storedValue = scrollHistoryMap.current.get(activeKey) || 0;
      lenis.scrollTo(storedValue, { immediate: true });
    }, delay);

    const handleScroll = ({ scroll }: { scroll: number }) => {
      scrollHistoryMap.current.set(activeKey, scroll);
    };

    lenis.on('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      lenis.off('scroll', handleScroll);
    };
  }, [lenis, activeKey, delay, enabled]);
}
