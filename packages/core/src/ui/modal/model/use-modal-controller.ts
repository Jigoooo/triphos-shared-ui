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

    // Store the current state before adding modal/dialog state
    const previousState = window.history.state || {};
    const stateId = `${type}_${Date.now()}`;

    // Create new state that includes all existing modals/dialogs
    const newState = {
      ...previousState,
      [stateId]: {
        type,
        timestamp: Date.now(),
      },
      activeModals: [...(previousState.activeModals || []), stateId],
    };

    // Use replaceState for subsequent modals to avoid stacking history entries
    if (previousState.activeModals?.length > 0) {
      // Replace current state if there are already modals open
      window.history.replaceState(newState, '');
      console.log(`[${type}] Replaced state:`, newState);
    } else {
      // Push new state only for the first modal
      window.history.pushState(newState, '');
      console.log(`[${type}] Pushed state:`, newState);
    }

    const handlePopState = () => {
      const currentState = window.history.state;
      console.log(`[${type}] popstate - My stateId: ${stateId}, Current state:`, currentState);

      // Check if this specific modal should close
      if (!currentState?.activeModals?.includes(stateId)) {
        console.log(`[${type}] Closing because not in active modals`);
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);

      // Clean up state when closing programmatically
      const currentState = window.history.state;
      if (currentState && currentState[stateId]) {
        const updatedActiveModals = (currentState.activeModals || []).filter(
          (id: string) => id !== stateId,
        );
        const { [stateId]: _removed, ...restState } = currentState;

        const updatedState = {
          ...restState,
          activeModals: updatedActiveModals,
        };

        // Use replaceState to update without adding history entry
        window.history.replaceState(updatedState, '');
        console.log(`[${type}] Cleaned up state:`, updatedState);
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
