import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FloatingOverlay, FloatingPortal } from '@floating-ui/react';

import { zIndex } from '@/constants';
import { detectDeviceTypeAndOS } from '@/lib';
import { dialog, useDialogConfig, useDialogOpen } from '../model/dialog-store.ts';
import { useModalController } from '@/ui/modal';
import { FlexColumn } from '@/ui/view';
import { AlertDialogHeader } from './alert-dialog-header.tsx';
import { AlertDialogContents } from './alert-dialog-contents.tsx';
import { AlertDialogActions } from './alert-dialog-actions.tsx';

const { isMobile } = detectDeviceTypeAndOS();

export function AlertDialog() {
  const dialogOpen = useDialogOpen();
  const dialogConfig = useDialogConfig();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useModalController({
    modalRef: dialogRef,
    isOpen: dialogOpen,
    onClose: dialog.close,
  });

  const ignoreEnterRef = useRef(true);

  useEffect(() => {
    if (dialogOpen) {
      ignoreEnterRef.current = true;
      const timer = setTimeout(() => {
        ignoreEnterRef.current = false;
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (!dialogOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dialog.close();
      }
      if (e.key === 'Enter' && dialogConfig.onConfirm && !ignoreEnterRef.current) {
        dialogConfig.onConfirm();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [dialogOpen, dialogConfig]);

  return (
    <FloatingPortal>
      <div ref={dialogRef} tabIndex={-1} />

      <AnimatePresence initial={false}>
        {dialogOpen && (
          <>
            <FlexColumn
              as={motion.div}
              initial={{ opacity: 0.6, scale: 0.94, x: '-50%', y: '-40%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0.2, scale: 0.98, x: '-50%', y: '-45%' }}
              transition={{ duration: 0.1 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                zIndex: zIndex.dialog,
                minWidth: '21.875rem',
                maxWidth: '37.5rem',
                maxHeight: '25rem',
                background: '#ffffff',
                paddingInline: '1rem',
                paddingBlock: '1rem',
                borderRadius: '0.5rem',
                justifyContent: 'space-between',
                outline: 'none',
                userSelect: 'none',
              }}
            >
              <AlertDialogHeader
                title={dialogConfig.title}
                isEmptyContents={!dialogConfig.contents}
              />
              <AlertDialogContents contents={dialogConfig.contents} />
              <AlertDialogActions dialogInfos={dialogConfig} />
            </FlexColumn>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.01 }}
              style={{
                zIndex: zIndex.dialogOverlay,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <FloatingOverlay
                lockScroll
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                onClick={() => {
                  dialog.close();

                  if (isMobile) {
                    window.history.back();
                  }
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}
