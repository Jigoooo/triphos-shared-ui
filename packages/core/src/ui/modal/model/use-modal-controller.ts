// use-modal-controller.ts
import { type RefObject, useEffect, useRef } from 'react';

export function useModalController({
  modalRef,
  modalIds,
  onClose,
}: {
  modalRef: RefObject<HTMLDivElement | null>;
  modalIds: string[];
  onClose: (id: string) => void;
}) {
  const historyStackRef = useRef<string[]>([]);
  const isClosingRef = useRef(false);

  // 모달 오픈 시마다 pushState
  useEffect(() => {
    // 새로 추가된 모달들만 감지
    const newIds = modalIds.filter((id) => !historyStackRef.current.includes(id));
    newIds.forEach((id) => {
      const state = { __layer: 'modal', modalId: id };
      window.history.pushState(state, '');
      historyStackRef.current.push(id);
    });

    // 모달이 모두 닫힘 → 스택 초기화
    if (modalIds.length === 0) {
      historyStackRef.current = [];
    }
  }, [modalIds]);

  // popstate로 닫기(뒤로가기/overlay 등)
  useEffect(() => {
    if (modalIds.length === 0) return;

    const handlePopState = (e: PopStateEvent) => {
      if (isClosingRef.current) return;

      const state = e.state;
      const topId = historyStackRef.current[historyStackRef.current.length - 1];

      // state가 모달이 아니거나, 현재 topId와 불일치면 "가장 최근 모달 하나" 닫기
      if (!state || state.__layer !== 'modal' || state.modalId !== topId) {
        if (topId) {
          isClosingRef.current = true;
          onClose(topId);
          // onClose가 모달을 실제로 제거하면, 다음 렌더에서 스택이 sync됨
          queueMicrotask(() => {
            isClosingRef.current = false;
          });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [modalIds, onClose]);

  // ESC로 top 모달 닫기
  useEffect(() => {
    if (modalIds.length === 0) return;

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
          const topId = historyStackRef.current[historyStackRef.current.length - 1];
          if (topId) {
            isClosingRef.current = true;
            onClose(topId);
            queueMicrotask(() => {
              isClosingRef.current = false;
            });
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true, passive: false });
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalIds, modalRef, onClose]);
}
