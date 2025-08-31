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
  const modalStackRef = useRef<string[]>([]);
  const hasHistoryStateRef = useRef(false);

  useEffect(() => {
    // 모달이 모두 닫힌 경우
    if (modalIds.length === 0) {
      modalStackRef.current = [];
      hasHistoryStateRef.current = false;
      return;
    }

    // 첫 모달이 열릴 때만 history state 추가
    if (modalIds.length === 1 && !hasHistoryStateRef.current) {
      window.history.pushState({ __layer: 'modal' }, '');
      hasHistoryStateRef.current = true;
    }

    // 내부 스택을 현재 모달들과 동기화
    modalStackRef.current = [...modalIds];

    const handlePopState = (e: PopStateEvent) => {
      const currentState = e.state;

      // 모달 상태가 아닌 곳으로 돌아간 경우 (뒤로가기)
      if (!currentState || currentState.__layer !== 'modal') {
        // 가장 최근 모달부터 하나씩 닫기
        if (modalStackRef.current.length > 0) {
          const lastModalId = modalStackRef.current[modalStackRef.current.length - 1];
          modalStackRef.current.pop();

          // 마지막 모달이면 history state도 제거
          if (modalStackRef.current.length === 0) {
            hasHistoryStateRef.current = false;
          }

          onClose(lastModalId);
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
