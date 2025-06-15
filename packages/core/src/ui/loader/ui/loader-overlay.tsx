import { FloatingOverlay } from '@floating-ui/react';
import { motion } from 'framer-motion';

import { zIndex } from '@/constants';

export function LoaderOverlay() {
  return (
    <motion.div
      key='overlay'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.14 }}
    >
      <FloatingOverlay
        lockScroll
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: zIndex.loading,
        }}
      />
    </motion.div>
  );
}
