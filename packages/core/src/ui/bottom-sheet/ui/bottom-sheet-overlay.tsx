import { motion } from 'framer-motion';

import { bottomSheetOverlayStyle } from '../config/bottom-sheet-style.ts';

export function BottomSheetOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={bottomSheetOverlayStyle}
    />
  );
}
