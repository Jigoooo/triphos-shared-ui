import { FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { ModalContext } from '../model/modal-context.ts';
import type { ModalRenderProps, ModalItem, IsPossibleOverlayClose } from '../model/modal-type.ts';
import { useModalController } from '../model/use-modal-controller.ts';
import { zIndex } from '@/constants';
import { FlexRow } from '@/ui/layout';

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [modalList, setModalList] = useState<ModalItem[]>([]);
  const [isPossibleOverlayClose, setIsPossibleOverlayClose] =
    useState<IsPossibleOverlayClose | null>(null);

  const handleIsPossibleOverlayClose = (id: string, possible: boolean) => {
    setIsPossibleOverlayClose((prevState) => {
      if (prevState) {
        return { ...prevState, [id]: possible };
      }
      return { [id]: possible };
    });
  };

  const open = (id: string, render: (props: ModalRenderProps) => ReactNode) => {
    setModalList((prevState) => [...prevState, { id, render, order: prevState.length }]);
  };

  const close = useCallback((id: string) => {
    setModalList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const modalIds = modalList.map((modal) => ({ id: modal.id }));

  useModalController({
    modalRef,
    isOpen: modalList.length > 0,
    onClose: () => {
      if (modalList.length > 0) {
        const findLastOrderModal = modalList.find((modal) => modal.order === modalList.length - 1);

        if (findLastOrderModal) {
          close(findLastOrderModal.id);
        }
      }
    },
  });

  const contextValue = useMemo(
    () => ({ modalIds, open, close, handleIsPossibleOverlayClose }),
    [modalIds, close],
  );

  return (
    <ModalContext value={contextValue}>
      {children}

      <FloatingPortal>
        <div ref={modalRef} data-modal-content />
        {modalList.length > 0 && (
          <div
            ref={overlayRef}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        )}

        <AnimatePresence initial={false}>
          {modalList.map((modal, index) => {
            return (
              <div key={modal.id}>
                <FlexRow
                  as={motion.div}
                  initial={{ opacity: 0, x: '-50%', y: '-45%' }}
                  animate={{ opacity: 1, x: '-50%', y: '-50%' }}
                  exit={{ opacity: 0, x: '-50%', y: '-45%' }}
                  transition={{
                    duration: 0.1,
                  }}
                  style={{
                    userSelect: 'none',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: zIndex.modal + index,
                  }}
                  onClick={(e) => e.stopPropagation()}
                  data-modal-content
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby={`modal-title-${modal.id}`}
                  aria-describedby={`modal-description-${modal.id}`}
                >
                  {modal.render({
                    overlayRef: overlayRef,
                    isOpen: true,
                    close: () => {
                      window.history.back();
                    },
                  })}
                </FlexRow>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    zIndex: zIndex.modalOverlay + index,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  className='modal-overlay'
                >
                  <FloatingOverlay
                    lockScroll
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={() => {
                      if (isPossibleOverlayClose !== null && isPossibleOverlayClose[modal.id]) {
                        window.history.back();
                      }
                    }}
                  />
                </motion.div>
              </div>
            );
          })}
        </AnimatePresence>
      </FloatingPortal>
    </ModalContext>
  );
}
