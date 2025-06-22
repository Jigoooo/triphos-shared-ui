import { useEffect, useRef, type RefObject, useCallback } from 'react';

// 🔧 포커스 가능한 요소들의 셀렉터
const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"]):not([disabled])',
  '[contenteditable="true"]',
  'iframe',
  'object',
  'embed',
  'area[href]',
  'audio[controls]',
  'video[controls]',
  '[draggable="true"]',
].join(',');

interface UseFocusTrapOptions {
  /**
   * 포커스 트랩이 활성화될지 여부
   */
  enabled: boolean;

  /**
   * 포커스 트랩 컨테이너 요소의 ref
   */
  containerRef: RefObject<HTMLElement | null>;

  /**
   * 포커스 트랩이 비활성화될 때 포커스를 복원할 요소
   */
  restoreFocus?: boolean;

  /**
   * 초기 포커스를 설정할 요소의 인덱스 또는 ref
   */
  initialFocus?: number | RefObject<HTMLElement>;

  /**
   * 포커스 트랩 활성화 지연 시간 (ms)
   */
  activationDelay?: number;

  /**
   * 포커스 복원 지연 시간 (ms)
   */
  restorationDelay?: number;

  /**
   * 모달 관련 요소를 식별하는 추가 셀렉터
   */
  modalSelectors?: string[];
}

export function useFocusTrap({
  enabled,
  containerRef,
  restoreFocus = true,
  initialFocus,
  activationDelay = 100,
  restorationDelay = 100,
  modalSelectors = [],
}: UseFocusTrapOptions) {
  const previousActiveElement = useRef<Element | null>(null);
  const focusTrapActive = useRef(false);

  // 🔧 모달 관련 요소인지 확인
  const isModalElement = useCallback(
    (element: HTMLElement): boolean => {
      const portalElement = document.querySelector('[data-floating-ui-portal]');
      const isInPortal = portalElement?.contains(element);
      const isInContainer = containerRef.current?.contains(element);

      const isModalBySelector = modalSelectors.some(
        (selector) => element.matches(selector) || element.closest(selector),
      );

      return (
        isInPortal ||
        isInContainer ||
        isModalBySelector ||
        element.hasAttribute('data-floating-ui-portal') ||
        element.hasAttribute('data-floating-ui-focus-guard') ||
        element.closest('[data-floating-ui-portal]') !== null
      );
    },
    [containerRef, modalSelectors],
  );

  // 🔧 모달 외부 요소 비활성화
  const disableOutsideElements = useCallback(() => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
      const htmlElement = element as HTMLElement;

      if (!isModalElement(htmlElement)) {
        if (htmlElement.matches?.(FOCUSABLE_ELEMENTS)) {
          htmlElement.setAttribute('data-focus-trap-disabled', 'true');
          htmlElement.setAttribute('tabindex', '-1');
          htmlElement.setAttribute('aria-hidden', 'true');

          const originalTabIndex = htmlElement.getAttribute('tabindex');
          if (originalTabIndex !== '-1') {
            htmlElement.setAttribute('data-original-tabindex', originalTabIndex || '0');
          }
        }

        if (!htmlElement.hasAttribute('aria-hidden')) {
          htmlElement.setAttribute('aria-hidden', 'true');
          htmlElement.setAttribute('data-focus-trap-aria-hidden', 'true');
        }
      }
    });
  }, [isModalElement]);

  // 🔧 모달 외부 요소 활성화
  const enableOutsideElements = () => {
    const disabledElements = document.querySelectorAll('[data-focus-trap-disabled="true"]');
    disabledElements.forEach((element) => {
      const htmlElement = element as HTMLElement;

      const originalTabIndex = htmlElement.getAttribute('data-original-tabindex');
      if (originalTabIndex) {
        htmlElement.setAttribute('tabindex', originalTabIndex);
        htmlElement.removeAttribute('data-original-tabindex');
      } else {
        htmlElement.removeAttribute('tabindex');
      }

      htmlElement.removeAttribute('data-focus-trap-disabled');
      htmlElement.removeAttribute('aria-hidden');
    });

    const ariaHiddenElements = document.querySelectorAll('[data-focus-trap-aria-hidden="true"]');
    ariaHiddenElements.forEach((element) => {
      element.removeAttribute('aria-hidden');
      element.removeAttribute('data-focus-trap-aria-hidden');
    });
  };

  // 🔧 포커스 설정
  const focusElement = useCallback(
    (target?: number | RefObject<HTMLElement>) => {
      if (!containerRef.current) return;

      let elementToFocus: HTMLElement | null = null;

      if (typeof target === 'number') {
        const focusableElements = containerRef.current.querySelectorAll(FOCUSABLE_ELEMENTS);
        elementToFocus = focusableElements[target] as HTMLElement;
      } else if (target && 'current' in target) {
        elementToFocus = target.current;
      } else {
        const focusableElements = containerRef.current.querySelectorAll(FOCUSABLE_ELEMENTS);
        elementToFocus = focusableElements[0] as HTMLElement;
      }

      if (elementToFocus) {
        elementToFocus.focus();
      } else {
        // 포커스 가능한 요소가 없으면 컨테이너에 포커스
        containerRef.current.setAttribute('tabindex', '-1');
        containerRef.current.focus();
      }
    },
    [containerRef],
  );

  // 🔧 포커스 트랩 활성화/비활성화
  useEffect(() => {
    if (enabled && !focusTrapActive.current) {
      focusTrapActive.current = true;

      if (restoreFocus) {
        previousActiveElement.current = document.activeElement;
      }

      disableOutsideElements();

      setTimeout(() => {
        focusElement(initialFocus);
      }, activationDelay);
    } else if (!enabled && focusTrapActive.current) {
      focusTrapActive.current = false;

      enableOutsideElements();

      if (restoreFocus && previousActiveElement.current) {
        setTimeout(() => {
          if (previousActiveElement.current && 'focus' in previousActiveElement.current) {
            (previousActiveElement.current as HTMLElement).focus();
          }
        }, restorationDelay);
      }
    }
  }, [
    enabled,
    restoreFocus,
    initialFocus,
    activationDelay,
    restorationDelay,
    disableOutsideElements,
    focusElement,
  ]);

  // 🔧 Tab 키 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!focusTrapActive.current || !containerRef.current) return;

      if (event.key === 'Tab') {
        event.preventDefault();

        const focusableElements = containerRef.current.querySelectorAll(FOCUSABLE_ELEMENTS);
        const focusableArray = Array.from(focusableElements) as HTMLElement[];

        if (focusableArray.length === 0) {
          containerRef.current.focus();
          return;
        }

        const currentIndex = focusableArray.indexOf(document.activeElement as HTMLElement);

        if (event.shiftKey) {
          const nextIndex = currentIndex <= 0 ? focusableArray.length - 1 : currentIndex - 1;
          focusableArray[nextIndex].focus();
        } else {
          const nextIndex = currentIndex >= focusableArray.length - 1 ? 0 : currentIndex + 1;
          focusableArray[nextIndex].focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  // 🔧 포커스 이탈 방지
  useEffect(() => {
    const handleFocusOut = (event: FocusEvent) => {
      if (!focusTrapActive.current || !containerRef.current) return;

      const relatedTarget = event.relatedTarget as HTMLElement;

      if (relatedTarget && !containerRef.current.contains(relatedTarget)) {
        event.preventDefault();
        event.stopPropagation();

        setTimeout(() => {
          focusElement(initialFocus);
        }, 0);
      }
    };

    document.addEventListener('focusout', handleFocusOut, { capture: true });

    return () => {
      document.removeEventListener('focusout', handleFocusOut, { capture: true });
    };
  }, [containerRef, focusElement, initialFocus]);

  // 🔧 마우스 클릭으로 인한 포커스 이탈 방지
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!focusTrapActive.current || !containerRef.current) return;

      const target = event.target as HTMLElement;

      if (!containerRef.current.contains(target)) {
        event.preventDefault();

        setTimeout(() => {
          focusElement(initialFocus);
        }, 0);
      }
    };

    document.addEventListener('mousedown', handleMouseDown, { capture: true });

    return () => {
      document.removeEventListener('mousedown', handleMouseDown, { capture: true });
    };
  }, [containerRef, focusElement, initialFocus]);

  // 🔧 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (focusTrapActive.current) {
        enableOutsideElements();
        focusTrapActive.current = false;
      }
    };
  }, []);

  return {
    /**
     * 특정 요소에 포커스 설정
     */
    focusElement,

    /**
     * 포커스 트랩이 현재 활성화되어 있는지 여부
     */
    isActive: focusTrapActive.current,

    /**
     * 수동으로 외부 요소 비활성화
     */
    disableOutsideElements,

    /**
     * 수동으로 외부 요소 활성화
     */
    enableOutsideElements,
  };
}
