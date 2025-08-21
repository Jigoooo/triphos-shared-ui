import { offset, useFloating, useHover, useInteractions } from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { getTooltipStyle } from '../config/tooltip-style.ts';
import type { TooltipProps } from '../model/tooltip-type.ts';

export function Tooltip({ style, placement, children, content, disabled = false }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  // const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement,
    onOpenChange: setIsOpen,
    transform: false,
    middleware: [
      // arrow({
      //   element: arrowRef,
      // }),
      offset({
        mainAxis: placement.includes('top') || placement.includes('bottom') ? 10 : 6,
        crossAxis: -3,
      }),
    ],
  });

  const hover = useHover(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const tooltipStyle = getTooltipStyle({ style, floatingStyles });

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            key='tooltip'
            ref={refs.setFloating}
            // initial={{ opacity: 0, scale: 0.9 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0.9 }}
            // transition={{ type: 'spring', stiffness: 600, damping: 20, duration: 0.04 }}
            style={tooltipStyle}
            {...getFloatingProps()}
          >
            {/*<FloatingArrow*/}
            {/*  ref={arrowRef}*/}
            {/*  context={context}*/}
            {/*  width={10}*/}
            {/*  height={8}*/}
            {/*  tipRadius={2}*/}
            {/*  fill={'#414141'}*/}
            {/*  stroke={'#414141'}*/}
            {/*/>*/}
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
