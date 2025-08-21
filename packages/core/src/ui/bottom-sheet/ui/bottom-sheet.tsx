import { AnimatePresence, motion, type PanInfo, useDragControls } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { BottomSheetGrab } from './bottom-sheet-grab.tsx';
import { BottomSheetOverlay } from './bottom-sheet-overlay.tsx';
import { getBottomSheetContainerStyle, getBottomSheetStyle } from '../config/bottom-sheet-style.ts';
import { type BottomSheetProps } from '../model/bottom-sheet-type.ts';
import { useModalHistory } from '@/hooks';

export function BottomSheet({
  isOpen,
  onClose,
  children,
  maxHeight = 'auto',
  dragThreshold = 80,
  bottomInset = 0,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const bottomSheetContainerStyle = getBottomSheetContainerStyle({ maxHeight });
  const bottomSheetStyle = getBottomSheetStyle({ bottomInset });

  useModalHistory(isOpen, onClose);

  const getThresholdInPixels = (threshold: string | number): number => {
    if (typeof threshold === 'number') return threshold;

    const value = parseFloat(threshold);
    const unit = threshold.replace(/[0-9.-]/g, '');

    if (unit === '%' && sheetRef.current) {
      return (sheetRef.current.offsetHeight * value) / 100;
    } else if (unit === 'rem') {
      return value * 16;
    }

    return value;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = getThresholdInPixels(dragThreshold);
    if (info.offset.y > threshold) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <BottomSheetOverlay />

          <motion.div
            ref={sheetRef}
            role='dialog'
            aria-modal='true'
            aria-label='Bottom sheet'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              duration: 0.6,
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
            <BottomSheetGrab dragControls={dragControls} />

            <div role='document' style={bottomSheetStyle}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
