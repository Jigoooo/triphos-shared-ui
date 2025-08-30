import { FloatingOverlay } from '@floating-ui/react';
import { motion } from 'framer-motion';

import { bottomSheetOverlayStyle } from '../config/bottom-sheet-style.ts';

export function BottomSheetOverlay({ isClosing }: { isClosing: boolean }) {
  return (
    <motion.div
      role='presentation'
      aria-hidden='true'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'tween',
        duration: 0.2,
      }}
      style={bottomSheetOverlayStyle}
    >
      <FloatingOverlay
        lockScroll
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onClick={() => {
          if (!isClosing) {
            window.history.back();
          }
        }}
      />
    </motion.div>
  );
}
