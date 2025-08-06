import type { RefObject } from 'react';
import { useEffect } from 'react';

import { detectDeviceTypeAndOS } from '@/lib';

const { isMobile } = detectDeviceTypeAndOS();

export function useModalController({
  modalRef,
  isOpen,
  onClose,
}: {
  modalRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const addQueryParam = (key: string, value: string) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState(null, '', newUrl);
    };

    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      addQueryParam('modal', 'true');

      timeoutId = setTimeout(() => {
        window.history.pushState({ modal: true }, '');
      }, 0);
    }

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          const isModalFocused =
            modalRef.current?.contains(document.activeElement as Node) ||
            !document.activeElement ||
            document.activeElement === document.body;

          if (isModalFocused) {
            event.preventDefault();
            event.stopPropagation();
            onClose();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown, {
        capture: true,
        passive: false,
      });
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, modalRef, onClose]);
}
