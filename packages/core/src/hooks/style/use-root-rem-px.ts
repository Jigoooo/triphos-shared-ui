import { useEffect, useState } from 'react';

import { useIsClient } from '../common/use-is-client';

export function useRootRemPx(ssrFallback: number = 16) {
  const isClient = useIsClient();
  const [remPx, setRemPx] = useState<number>(ssrFallback);

  useEffect(() => {
    if (!isClient) return;

    const root = document.documentElement;

    const compute = () => {
      const cs = getComputedStyle(root);
      const n = parseFloat(cs.fontSize);
      setRemPx(Number.isFinite(n) && n > 0 ? n : ssrFallback);
    };

    const rafId = requestAnimationFrame(compute);

    const ro = new ResizeObserver(() => compute());
    ro.observe(root);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [isClient, ssrFallback]);

  return remPx;
}
