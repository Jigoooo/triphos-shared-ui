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
  const isInternalCloseRef = useRef(false);

  useEffect(() => {
    // 새로 추가된 모달 처리
    const newModalIds = modalIds.filter((id) => !historyStackRef.current.includes(id));
    newModalIds.forEach((id) => {
      const state = { __layer: 'modal', modalId: id };
      window.history.pushState(state, '');
      historyStackRef.current.push(id);
    });

    // 제거된 모달 처리 (내부적으로 닫힌 경우)
    const removedIds = historyStackRef.current.filter((id) => !modalIds.includes(id));
    if (removedIds.length > 0 && !isInternalCloseRef.current) {
      // X 버튼으로 닫은 경우 history stack 업데이트
      historyStackRef.current = historyStackRef.current.filter((id) => modalIds.includes(id));
    }
    isInternalCloseRef.current = false;

    if (modalIds.length === 0) {
      historyStackRef.current = [];
      return;
    }

    const handlePopState = (e: PopStateEvent) => {
      const currentState = e.state;

      if (!currentState || currentState.__layer !== 'modal') {
        // modal이 아닌 state로 돌아간 경우
        if (historyStackRef.current.length > 0) {
          const lastModalId = historyStackRef.current[historyStackRef.current.length - 1];
          historyStackRef.current.pop();
          isInternalCloseRef.current = true;
          onClose(lastModalId);
        }
      } else {
        // 특정 modal state로 돌아간 경우
        const targetId = currentState.modalId;
        const currentIndex = historyStackRef.current.indexOf(targetId);

        if (currentIndex >= 0) {
          // 해당 모달 이후의 모든 모달 닫기
          const modalsToClose = historyStackRef.current.slice(currentIndex + 1);
          historyStackRef.current = historyStackRef.current.slice(0, currentIndex + 1);

          // 역순으로 닫기 (가장 최근 것부터)
          modalsToClose.reverse().forEach((id) => {
            isInternalCloseRef.current = true;
            onClose(id);
          });
        } else {
          // 알 수 없는 modal state인 경우 가장 최근 모달 닫기
          if (historyStackRef.current.length > 0) {
            const lastModalId = historyStackRef.current[historyStackRef.current.length - 1];
            historyStackRef.current.pop();
            isInternalCloseRef.current = true;
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
