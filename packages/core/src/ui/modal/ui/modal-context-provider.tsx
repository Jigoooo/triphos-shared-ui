import { FloatingOverlay, FloatingPortal } from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { type ReactNode, useCallback, useRef, useState } from 'react';

import { getModalAnimation } from '../config/modal-animation.ts';
import { ModalContext } from '../model/modal-context.ts';
import {
  type ModalRenderProps,
  type ModalItem,
  type IsPossibleOverlayClose,
  type ModalContextType,
  type ModalConfig,
} from '../model/modal-type.ts';
import { useModalController } from '../model/use-modal-controller.ts';
import { zIndex } from '@/constants';
import { FlexRow } from '@/ui/layout';

export function ModalContextProvider({
  safeAreaInsets = {
    top: 0,
    bottom: 0,
  },
  children,
}: {
  safeAreaInsets?: {
    top: number;
    bottom: number;
  };
  children: ReactNode;
}) {
  const modalAnimation = getModalAnimation(safeAreaInsets);

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const popWaitersRef = useRef<Array<() => void>>([]);

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

  const open = (
    id: string,
    render: (props: ModalRenderProps) => ReactNode,
    config?: ModalConfig,
  ) => {
    setModalList((prevState) => [...prevState, { id, render, order: prevState.length, config }]);
  };

  const closeAsync = useCallback(() => {
    return new Promise<void>((resolve) => {
      popWaitersRef.current.push(resolve);
      window.history.back();
    });
  }, []);

  const modalIds = modalList.map((modal) => ({ id: modal.id }));

  useModalController({
    modalRef,
    isOpen: modalList.length > 0,
    onClose: () => {
      if (modalList.length > 0) {
        const top = modalList.find((m) => m.order === modalList.length - 1);
        if (top) {
          setModalList((prev) => prev.filter((item) => item.id !== top.id));

          queueMicrotask(() => {
            const resolve = popWaitersRef.current.shift();
            resolve?.();
          });
        }
      }
    },
  });

  const contextValue: ModalContextType = {
    modalIds,
    open,
    closeAsync,
    handleIsPossibleOverlayClose,
  };

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
            const animationConfig = modal.config?.animation
              ? modalAnimation[modal.config.animation]
              : modalAnimation['slide-up'];

            return (
              <div key={modal.id}>
                <FlexRow
                  as={motion.div}
                  initial={animationConfig.initial}
                  animate={animationConfig.animate}
                  exit={animationConfig.exit}
                  transition={animationConfig.transition}
                  style={{
                    position: 'fixed',
                    userSelect: 'none',
                    display: 'flex',
                    zIndex: zIndex.modal + index,
                    ...animationConfig.style,
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
                    closeAsync: () => closeAsync(),
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
