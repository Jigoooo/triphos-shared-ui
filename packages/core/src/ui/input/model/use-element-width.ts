import { useCallback, useRef, useState } from 'react';

/**
 * ResizeObserver를 사용하여 요소의 너비를 효율적으로 측정하는 훅
 * useEffect + offsetWidth보다 성능이 좋고 동적 크기 변화를 감지할 수 있음
 */
export function useElementWidth() {
  const [width, setWidth] = useState(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const elementRef = useCallback((element: HTMLElement | null) => {
    // 기존 observer 정리
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }

    if (element) {
      // 새로운 ResizeObserver 생성
      resizeObserverRef.current = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setWidth(entry.contentRect.width);
        }
      });

      // 요소 관찰 시작
      resizeObserverRef.current.observe(element);

      // 초기 너비 설정 (ResizeObserver는 초기값을 즉시 제공하지 않음)
      setWidth(element.offsetWidth);
    } else {
      // element가 null이면 width 초기화
      setWidth(0);
    }
  }, []);

  return [width, elementRef] as const;
}
