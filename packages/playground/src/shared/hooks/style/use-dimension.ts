import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';

export const useDimensions = (ref: RefObject<HTMLElement>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref?.current?.offsetWidth ?? 0;
    dimensions.current.height = ref?.current?.offsetHeight ?? 0;
  }, []);

  return dimensions.current;
};
