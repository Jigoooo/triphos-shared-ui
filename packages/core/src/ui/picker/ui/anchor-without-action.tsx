import { flip, FloatingPortal, offset, size, useFloating } from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { zIndex } from '@/constants';
import type { AnchorWithoutActionProps } from '@/ui/picker';

export function AnchorWithoutAction({
  strategy = 'absolute',
  placement = 'bottom',
  minAxisOffset = 8,
  crossAxis = 0,
  isOpen,
  onClose,
  contents,
  cachedChildren = false,
  useAnimation = true,
  forceUpdateTrigger,
  children,
}: AnchorWithoutActionProps) {
  const wasOpenRef = useRef(isOpen);
  const updateRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      onClose?.();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, onClose]);

  const { refs, floatingStyles, update } = useFloating({
    open: isOpen,
    strategy,
    placement,
    transform: false,
    middleware: [
      offset({ mainAxis: minAxisOffset, crossAxis }),
      flip({ padding: 10 }),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  updateRef.current = update;

  useEffect(() => {
    if (!!forceUpdateTrigger && isOpen && updateRef.current) {
      requestAnimationFrame(() => {
        updateRef.current?.();
      });
    }
  }, [forceUpdateTrigger, isOpen]);

  const floatingContent = (
    <div
      ref={refs.setFloating}
      style={{
        ...floatingStyles,
        zIndex: zIndex.anchor,
        ...(cachedChildren && !useAnimation
          ? {
              visibility: isOpen ? 'visible' : 'hidden',
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? 'auto' : 'none',
              transition: 'opacity 0.1s ease-in-out',
            }
          : {}),
      }}
    >
      {contents}
    </div>
  );

  return (
    <>
      <div ref={refs.setReference}>{children}</div>

      {cachedChildren ? (
        <FloatingPortal>
          {useAnimation ? (
            <motion.div
              ref={refs.setFloating}
              initial={false}
              animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              style={{
                ...floatingStyles,
                zIndex: zIndex.anchor,
                visibility: isOpen ? 'visible' : 'hidden',
                pointerEvents: isOpen ? 'auto' : 'none',
              }}
            >
              {contents}
            </motion.div>
          ) : (
            floatingContent
          )}
        </FloatingPortal>
      ) : useAnimation ? (
        <AnimatePresence>
          {isOpen && (
            <FloatingPortal>
              <motion.div
                ref={refs.setFloating}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.12, ease: 'easeOut' }}
                style={{
                  ...floatingStyles,
                  zIndex: zIndex.anchor,
                }}
              >
                {contents}
              </motion.div>
            </FloatingPortal>
          )}
        </AnimatePresence>
      ) : (
        isOpen && <FloatingPortal>{floatingContent}</FloatingPortal>
      )}
    </>
  );
}
