import { type RefObject, useEffect, useRef } from 'react';

export function useDialogController({
  modalRef,
  isOpen,
  onClose,
}: {
  modalRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const myIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const modalId = `modal_${Date.now()}_${Math.random()}`;
    myIdRef.current = modalId;

    const state = { __layer: 'modal', modalId };
    window.history.pushState(state, '');

    const handlePopState = (e: PopStateEvent) => {
      const active = e.state && e.state.__layer === 'modal' ? e.state : null;
      const activeId = active?.modalId ?? null;

      if (activeId !== myIdRef.current) {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (myIdRef.current === modalId) myIdRef.current = null;
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
