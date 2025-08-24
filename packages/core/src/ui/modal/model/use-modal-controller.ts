import { type RefObject, useEffect } from 'react';

export function useModalController({
  modalRef,
  isOpen,
  onClose,
  type = 'modal',
}: {
  modalRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
  type?: 'modal' | 'dialog';
}) {
  useEffect(() => {
    if (!isOpen) return;

    const state = { [type]: true, timestamp: Date.now(), type };
    window.history.pushState(state, '');

    const handlePopState = (event: PopStateEvent) => {
      if (!event.state || event.state.type !== type) {
        if (!event.state?.[type]) {
          onClose();
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      // Clean up history state when closing programmatically
      if (window.history.state?.[type] && window.history.state?.timestamp === state.timestamp) {
        window.history.back();
      }
    };
  }, [isOpen, onClose, type]);

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
