import { FloatingPortal } from '@floating-ui/react';
import { AnimatePresence, motion, type PanInfo, useDragControls } from 'framer-motion';
import { type ReactNode, useCallback, useRef, useState } from 'react';

import { BottomSheetGrab } from './bottom-sheet-grab.tsx';
import { BottomSheetOverlay } from './bottom-sheet-overlay.tsx';
import { getBottomSheetContainerStyle, getBottomSheetStyle } from '../config/bottom-sheet-style.ts';
import { BottomSheetContext } from '../model/bottom-sheet-context.ts';
import {
  type BottomSheetConfig,
  type BottomSheetItem,
  type BottomSheetRenderProps,
} from '../model/bottom-sheet-type.ts';
import { useBottomSheetController } from '../model/use-bottom-sheet-controller.ts';
import { useThresholdInPixels } from '../model/use-threshold-in-pixels.ts';

export function BottomSheetProvider({ children }: { children: ReactNode }) {
  const [activeSheet, setActiveSheet] = useState<BottomSheetItem | null>(null);
  const [sheetConfig, setSheetConfig] = useState<BottomSheetConfig>({
    maxHeight: 'auto',
    dragThreshold: 80,
    bottomInset: 0,
    showGrab: true,
  });

  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const bottomSheetContainerStyle = getBottomSheetContainerStyle({
    maxHeight: sheetConfig.maxHeight ?? 'auto',
  });
  const bottomSheetStyle = getBottomSheetStyle({ bottomInset: sheetConfig.bottomInset ?? 0 });

  const thresholdPx = useThresholdInPixels(sheetConfig.dragThreshold ?? 80, sheetRef.current);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > thresholdPx) {
      window.history.back();
    }
  };

  const open = useCallback(
    (
      id: string,
      render: (props: BottomSheetRenderProps) => ReactNode,
      config?: BottomSheetConfig,
    ) => {
      setActiveSheet({ id, render });
      setSheetConfig((prevState) => ({ ...prevState, ...config }));
    },
    [],
  );

  const close = () => {
    setActiveSheet(null);
  };

  useBottomSheetController({
    modalRef: sheetRef,
    isOpen: !!activeSheet,
    onClose: close,
  });

  const contextValue = {
    open,
    close,
  };

  return (
    <BottomSheetContext value={contextValue}>
      {children}

      <FloatingPortal>
        <AnimatePresence initial={false}>
          {!!activeSheet && <BottomSheetOverlay isClosing={!activeSheet} />}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {!!activeSheet && (
            <motion.div
              ref={sheetRef}
              role='dialog'
              aria-modal='true'
              aria-label='Bottom sheet'
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                duration: 0.54,
                ease: [0.32, 0.72, 0, 1],
              }}
              drag='y'
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              dragSnapToOrigin={true}
              onDrag={(_, info) => {
                if (info.offset.y < 0) {
                  dragControls.stop();
                }
              }}
              onDragStart={(_, info) => {
                if (info.delta.y < 0) {
                  dragControls.stop();
                }
              }}
              onDragEnd={handleDragEnd}
              style={bottomSheetContainerStyle}
            >
              {sheetConfig.showGrab && (
                <BottomSheetGrab
                  grabContainerStyle={sheetConfig.grabContainerStyle}
                  grabStyle={sheetConfig.grabStyle}
                  dragControls={dragControls}
                />
              )}

              <div role='document' style={bottomSheetStyle}>
                {activeSheet.render({
                  isOpen: true,
                  close: () => {
                    window.history.back();
                  },
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </BottomSheetContext>
  );
}
