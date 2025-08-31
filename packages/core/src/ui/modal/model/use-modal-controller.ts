import { type RefObject, useEffect, useRef } from 'react';

export function useModalController({
  modalRef,
  modalIds,
  onClose,
}: {
  modalRef: RefObject<HTMLDivElement | null>;
  modalIds: string[]; // ✅ 모달 id 배열로 변경
  onClose: (id: string) => void; // ✅ 어떤 모달을 닫을지 id 전달
}) {
  // 히스토리에 쌓아둔 모달 id 스택(가장 끝이 top)
  const historyStackRef = useRef<string[]>([]);

  // 새로 열린 모달에 대해 history state 푸시
  useEffect(() => {
    // 새로 추가된 ids
    const newIds = modalIds.filter((id) => !historyStackRef.current.includes(id));
    newIds.forEach((id) => {
      window.history.pushState({ __layer: 'modal', modalId: id }, '');
      historyStackRef.current.push(id);
    });

    // (방어) 외부에서 강제 제거된 경우 스택도 동기화
    historyStackRef.current = historyStackRef.current.filter((id) => modalIds.includes(id));
  }, [modalIds]);

  useEffect(() => {
    if (modalIds.length === 0) {
      // 모든 모달 닫힘 → 스택 초기화
      historyStackRef.current = [];
      return;
    }

    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      const isModalState = state && state.__layer === 'modal';

      // 현재 열린 모달이 하나도 없으면(안전망)
      if (historyStackRef.current.length === 0) return;

      if (!isModalState) {
        // 브라우저가 모달 state가 아닌 곳으로 이동하려 함 → 우리가 top 하나 닫아서 가로챔
        const toClose = historyStackRef.current.pop();
        if (toClose) onClose(toClose);

        // 아직 모달 남았으면 센티넬 재무장
        const top = historyStackRef.current[historyStackRef.current.length - 1];
        if (top) {
          window.history.pushState({ __layer: 'modal', modalId: top }, '');
        }
        return;
      }

      // modal state로 이동한 경우: targetId 이후의 모달들만 정리
      const targetId: string = state.modalId;
      const idx = historyStackRef.current.indexOf(targetId);

      if (idx === -1) {
        // 모르는 state면 동일하게 top 하나 닫고 재무장
        const toClose = historyStackRef.current.pop();
        if (toClose) onClose(toClose);
        const top = historyStackRef.current[historyStackRef.current.length - 1];
        if (top) {
          window.history.pushState({ __layer: 'modal', modalId: top }, '');
        }
        return;
      }

      // target 위에 쌓인 것들만 닫기 (역순으로)
      const toCloseList = historyStackRef.current.slice(idx + 1).reverse();
      historyStackRef.current = historyStackRef.current.slice(0, idx + 1);
      toCloseList.forEach((id) => onClose(id));

      // target(=새 top) 위로 센티넬 재무장
      const top = historyStackRef.current[historyStackRef.current.length - 1];
      if (top) {
        window.history.pushState({ __layer: 'modal', modalId: top }, '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [modalIds, onClose]);

  // ESC로 top 모달 닫기 + 포커스
  useEffect(() => {
    if (modalIds.length === 0) return;

    // 포커스(약간의 레이턴시 허용)
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

          // top 하나 닫고, 남아있으면 센티넬 재무장
          const toClose = historyStackRef.current.pop();
          if (toClose) onClose(toClose);

          const top = historyStackRef.current[historyStackRef.current.length - 1];
          if (top) {
            window.history.pushState({ __layer: 'modal', modalId: top }, '');
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true, passive: false });
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalIds, modalRef, onClose]);
}
