import { AnimatePresence, motion, type PanInfo, useDragControls } from 'framer-motion';
import { type ReactNode, useEffect, useRef } from 'react';

import { zIndex } from '@/constants';
import { useModalHistory } from '@/hooks';

export function BottomSheet({
  isOpen,
  onClose,
  children,
  maxHeight = 'auto',
  dragThreshold = 80,
  bottomInset = 0,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxHeight?: string | number;
  dragThreshold?: string | number;
  bottomInset?: string | number;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useModalHistory(isOpen, onClose);

  // Convert drag threshold to pixels
  const getThresholdInPixels = (threshold: string | number): number => {
    if (typeof threshold === 'number') return threshold;

    const value = parseFloat(threshold);
    const unit = threshold.replace(/[0-9.-]/g, '');

    if (unit === '%' && sheetRef.current) {
      return (sheetRef.current.offsetHeight * value) / 100;
    } else if (unit === 'rem') {
      return value * 16; // 1rem = 16px
    }

    return value; // Default to px
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: zIndex.anchorOverlay,
            }}
          />
          <motion.div
            ref={sheetRef}
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
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: maxHeight,
              backgroundColor: 'white',
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem',
              boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
              zIndex: zIndex.anchor,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              onPointerDown={(e) => {
                e.preventDefault();
                dragControls.start(e);
              }}
              style={{
                width: '100%',
                flexShrink: 0,
                cursor: 'grab',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                touchAction: 'none',
              }}
            >
              <div
                style={{
                  width: '3rem',
                  height: '0.25rem',
                  backgroundColor: '#ddd',
                  borderRadius: '0.125rem',
                  margin: '0 auto',
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                overflow: 'hidden',
                minHeight: 0,
                paddingBottom: bottomInset,
              }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
