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

    const stateId = `${type}_${Date.now()}`;
    let hasModalHistory = false;

    const currentState = window.history.state;
    if (currentState?.hasModalHistory) {
      hasModalHistory = true;
      const newState = {
        ...currentState,
        currentModalId: stateId,
        hasModalHistory: true,
      };
      window.history.replaceState(newState, '');
      console.log(`[${type}] Updated existing modal state:`, newState);
    } else {
      const newState = {
        originalState: currentState,
        currentModalId: stateId,
        hasModalHistory: true,
      };
      window.history.pushState(newState, '');
    }

    const handlePopState = () => {
      const state = window.history.state;
      console.log(`[${type}] popstate - My stateId: ${stateId}, Current state:`, state);

      if (!state?.hasModalHistory || state?.currentModalId !== stateId) {
        console.log(`[${type}] Closing due to popstate`);
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      const state = window.history.state;
      if (state?.currentModalId === stateId && state?.hasModalHistory) {
        if (hasModalHistory) {
          const updatedState = {
            ...state,
            currentModalId: null,
          };
          window.history.replaceState(updatedState, '');
        } else {
          setTimeout(() => {
            if (
              window.history.state?.hasModalHistory &&
              window.history.state?.currentModalId === stateId
            ) {
              window.history.back();
            }
          }, 0);
        }
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
