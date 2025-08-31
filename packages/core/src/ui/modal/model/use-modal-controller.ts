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
  const pushedStatesRef = useRef<Map<string, boolean>>(new Map());

  useEffect(() => {
    // 새로 추가된 모달에 대해 history state 추가
    modalIds.forEach((id) => {
      if (!pushedStatesRef.current.has(id)) {
        const state = { __layer: 'modal', modalId: id };
        window.history.pushState(state, '');
        pushedStatesRef.current.set(id, true);
      }
    });

    // 제거된 모달 추적 정리
    const currentIds = new Set(modalIds);
    Array.from(pushedStatesRef.current.keys()).forEach((id) => {
      if (!currentIds.has(id)) {
        pushedStatesRef.current.delete(id);
      }
    });

    if (modalIds.length === 0) {
      pushedStatesRef.current.clear();
      return;
    }

    const handlePopState = (e: PopStateEvent) => {
      const currentState = e.state;

      // 현재 state가 modal이 아니거나, 우리가 추적하는 모달이 아닌 경우
      if (!currentState || currentState.__layer !== 'modal') {
        // 가장 최근 모달 닫기
        const lastModalId = modalIds[modalIds.length - 1];
        if (lastModalId && pushedStatesRef.current.has(lastModalId)) {
          pushedStatesRef.current.delete(lastModalId);
          onClose(lastModalId);
        }
      } else {
        // 특정 모달 state로 돌아간 경우, 그 이후의 모달들 닫기
        const targetId = currentState.modalId;
        const targetIndex = modalIds.indexOf(targetId);

        if (targetIndex >= 0) {
          // targetIndex 이후의 모든 모달 닫기
          for (let i = modalIds.length - 1; i > targetIndex; i--) {
            const modalId = modalIds[i];
            if (pushedStatesRef.current.has(modalId)) {
              pushedStatesRef.current.delete(modalId);
              onClose(modalId);
            }
          }
        } else {
          // 추적하지 않는 state인 경우 가장 최근 모달 닫기
          const lastModalId = modalIds[modalIds.length - 1];
          if (lastModalId && pushedStatesRef.current.has(lastModalId)) {
            pushedStatesRef.current.delete(lastModalId);
            onClose(lastModalId);
          }
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [modalIds, onClose]);

  useEffect(() => {
    if (modalIds.length > 0) {
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
            // 가장 최근 모달 닫기
            const lastModalId = modalIds[modalIds.length - 1];
            if (lastModalId) {
              window.history.back();
            }
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
  }, [modalIds, modalRef]);
}
