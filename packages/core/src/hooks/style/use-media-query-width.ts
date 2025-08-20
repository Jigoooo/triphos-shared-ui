import { useState, useEffect } from 'react';

export function useMediaQueryWidth(threshold: number, type: 'min' | 'max' = 'max') {
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    if (window === undefined || !window.matchMedia) return;

    const mediaQueryList = window.matchMedia(`(${type}-width: ${threshold}px)`);

    const listener = (event: MediaQueryListEvent) => {
      setIsMatched(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    setIsMatched(mediaQueryList.matches);

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [threshold, type]);

  return isMatched;
}
