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

    // Store the state with a unique identifier
    const stateId = `${type}_${Date.now()}`;
    const state = {
      [type]: true,
      stateId,
      type,
    };
    // Push history state for mobile back button support
    window.history.pushState(state, '');

    const handlePopState = () => {
      // Check if we still have our specific state
      setTimeout(() => {
        const currentState = window.history.state;

        // Only close if our specific state is gone
        if (currentState?.stateId !== stateId) {
          onClose();
        }
      }, 0);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      // Only go back if our specific state is still current
      const currentState = window.history.state;
      if (currentState?.stateId === stateId) {
        console.log('currentState: ', currentState);
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
