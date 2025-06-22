import type { ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
} from '@floating-ui/react';

import { FlexRow } from '@/ui/layout';
import { ModalContext } from '../model/modal-context.ts';
import { useModalController } from '../model/use-modal-controller.ts';
import { zIndex } from '@/constants';
import type { ModalRenderProps, ModalItem, IsPossibleOverlayClose } from '../model/modal-type.ts';
import { detectDeviceTypeAndOS } from '@/lib';

const { isMobile } = detectDeviceTypeAndOS();

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

  const close = (id: string) => {
    setModalList((prev) => prev.filter((item) => item.id !== id));
  };

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
    [modalIds],
  );

  const { context } = useFloating();

  return (
    <ModalContext value={contextValue}>
      {children}

      <FloatingPortal>
        <div ref={modalRef} />
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
                <FloatingFocusManager
                  context={context}
                  modal={true}
                  restoreFocus={true}
                  returnFocus={true}
                  guards={true}
                  closeOnFocusOut={false}
                  order={['floating']}
                >
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
                  >
                    {modal.render({
                      overlayRef: overlayRef,
                      isOpen: true,
                      close: () => {
                        close(modal.id);

                        if (isMobile) {
                          window.history.back();
                        }
                      },
                    })}
                  </FlexRow>
                </FloatingFocusManager>

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
                >
                  <FloatingOverlay
                    lockScroll
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                    onClick={() => {
                      if (isPossibleOverlayClose !== null && isPossibleOverlayClose[modal.id]) {
                        close(modal.id);

                        if (isMobile) {
                          window.history.back();
                        }
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
