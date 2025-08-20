import { useCallback, useEffect, useRef } from 'react';

export function useHandleClickOutsideRef<T extends HTMLElement>({
  condition,
  outsideClickAction,
}: {
  condition: boolean;
  outsideClickAction: () => void;
}) {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        outsideClickAction();
      }
    },
    [outsideClickAction],
  );

  useEffect(() => {
    if (condition) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [condition, handleClickOutside, outsideClickAction]);

  return ref;
}
