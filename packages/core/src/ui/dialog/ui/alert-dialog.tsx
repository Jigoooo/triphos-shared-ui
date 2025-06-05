import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import { FloatingOverlay, FloatingPortal } from '@floating-ui/react';

import {
  Button,
  dialog,
  DialogType,
  useDialogInfos,
  useDialogOpen,
  FlexColumn,
  FlexRow,
  Typography,
  useModalController,
} from '@/ui';
import { colors, zIndex } from '@/constants';
import type { DialogInfoStates } from '../model/dialog-type.ts';

const dialogColors: Record<DialogType, string> = {
  [DialogType.INFO]: colors.primary[400],
  [DialogType.SUCCESS]: colors.success[400],
  [DialogType.WARNING]: colors.warning[500],
  [DialogType.ERROR]: colors.error[400],
} as const;

export function AlertDialog() {
  const dialogOpen = useDialogOpen();
  const dialogInfos = useDialogInfos();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useModalController({
    modalRef,
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
      if (e.key === 'Enter' && dialogInfos.onConfirm && !ignoreEnterRef.current) {
        dialogInfos.onConfirm();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [dialogOpen, dialogInfos]);

  return (
    <FloatingPortal>
      <div ref={modalRef} tabIndex={-1} />

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
                title={dialogInfos.title}
                isEmptyContents={!dialogInfos.contents}
              />
              <AlertDialogContents contents={dialogInfos.contents} />
              <AlertDialogActions dialogInfos={dialogInfos} />
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

function AlertDialogHeader({
  title,
  isEmptyContents,
}: {
  title?: string;
  isEmptyContents: boolean;
}) {
  return (
    <FlexRow
      style={{
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: isEmptyContents ? '0.5rem' : 0,
      }}
    >
      <Typography style={{ fontSize: '1rem', fontWeight: 700, whiteSpace: 'pre-line' }}>
        {title}
      </Typography>
    </FlexRow>
  );
}

function AlertDialogContents({ contents }: { contents?: ReactNode }) {
  return (
    <>
      {contents ? (
        <FlexColumn
          style={{
            paddingTop: 8,
            paddingBottom: 24,
            whiteSpace: 'pre-line',
            overflowY: 'auto',
            marginBottom: 10,
          }}
        >
          {typeof contents === 'string' ? (
            <Typography style={{ fontSize: '0.92rem', paddingRight: 12 }}>{contents}</Typography>
          ) : (
            contents
          )}
        </FlexColumn>
      ) : (
        <div style={{ height: 10 }}></div>
      )}
    </>
  );
}

function AlertDialogActions({ dialogInfos }: { dialogInfos: DialogInfoStates }) {
  const dialogColor = dialogColors[dialogInfos.dialogType as DialogType];

  return (
    <FlexRow
      style={{
        gap: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {dialogInfos.withCancel && (
        <Button.Outlined
          style={{
            minWidth: '4rem',
            color: '#bbbbbb',
            borderColor: '#bbbbbb',
          }}
          onClick={() => {
            dialogInfos?.onCancel?.();

            if (isMobile) {
              window.history.back();
            }
          }}
        >
          <Typography style={{ color: '#555555', fontSize: '0.9rem', fontWeight: 500 }}>
            {dialogInfos.cancelText}
          </Typography>
        </Button.Outlined>
      )}
      <Button.Solid
        style={{
          minWidth: '4rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          backgroundColor: dialogColor,
        }}
        onClick={() => {
          if (isMobile) {
            window.history.back();
          }

          setTimeout(() => dialogInfos?.onConfirm?.(), 10);
        }}
      >
        {dialogInfos.confirmText}
      </Button.Solid>
    </FlexRow>
  );
}
