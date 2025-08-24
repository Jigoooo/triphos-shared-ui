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
    console.log(`[${type}] useEffect triggered - isOpen:`, isOpen);
    if (!isOpen) return;

    const stateId = `${type}_${Date.now()}`;
    let hasModalHistory = false;

    const currentState = window.history.state;
    console.log(`[${type}] Current state:`, currentState);

    if (currentState?.hasModalHistory) {
      hasModalHistory = true;
      // Add to modal stack instead of replacing
      const modalStack = currentState.modalStack || [];
      const newState = {
        ...currentState,
        currentModalId: stateId,
        modalStack: [...modalStack, stateId],
        hasModalHistory: true,
      };
      window.history.replaceState(newState, '');
      console.log(`[${type}] Added to modal stack:`, newState);
    } else {
      const newState = {
        originalState: currentState,
        currentModalId: stateId,
        modalStack: [stateId],
        hasModalHistory: true,
      };
      window.history.pushState(newState, '');
      console.log(`[${type}] Created new modal stack:`, newState);
    }

    const handlePopState = () => {
      const state = window.history.state;
      console.log(`[${type}] popstate - My stateId: ${stateId}, Current state:`, state);

      // Only close if we're not in the modal history anymore
      // OR if we're the topmost modal in the stack
      if (!state?.hasModalHistory) {
        console.log(`[${type}] Closing due to no modal history`);
        onClose();
      } else {
        // Check if this modal should close based on stack position
        const modalStack = state.modalStack || [];
        const currentIndex = modalStack.indexOf(stateId);

        if (currentIndex === -1) {
          // Not in stack anymore, should close
          console.log(`[${type}] Closing - not in stack`);
          onClose();
        } else if (currentIndex === modalStack.length - 1) {
          // This is the topmost modal, should close on back button
          console.log(`[${type}] Closing - topmost modal`);
          onClose();
        }
        // If not topmost, don't close (let the topmost handle it)
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      const state = window.history.state;
      if (state?.hasModalHistory && state.modalStack?.includes(stateId)) {
        const modalStack = state.modalStack || [];
        const updatedStack = modalStack.filter((id: string) => id !== stateId);

        if (updatedStack.length === 0) {
          // Last modal closing
          if (!hasModalHistory) {
            // This was the first modal, go back
            setTimeout(() => {
              const currentState = window.history.state;
              if (currentState?.hasModalHistory && currentState.modalStack?.length === 0) {
                window.history.back();
              }
            }, 0);
          } else {
            // Clear modal history
            const updatedState = {
              ...state,
              currentModalId: null,
              modalStack: [],
              hasModalHistory: false,
            };
            window.history.replaceState(updatedState, '');
          }
        } else {
          // Update stack and set new current modal
          const newCurrentModalId = updatedStack[updatedStack.length - 1];
          const updatedState = {
            ...state,
            currentModalId: newCurrentModalId,
            modalStack: updatedStack,
          };
          window.history.replaceState(updatedState, '');
          console.log(`[${type}] Updated stack after close:`, updatedState);
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
