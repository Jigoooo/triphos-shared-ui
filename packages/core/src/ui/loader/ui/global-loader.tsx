import { motion } from 'framer-motion';

import type { GlobalLoaderProps } from '../model/loader-type.ts';
import { zIndex } from '@/constants';
import { Typography } from '@/ui/typography';

export function GlobalLoader({ loaderText }: GlobalLoaderProps) {
  return (
    <motion.div
      key='loader'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: zIndex.loading,
      }}
    >
      <span className={'loader'} />
      <Typography style={{ fontSize: '1.2rem', color: '#f1f1f1', fontWeight: 600 }}>
        {loaderText}
      </Typography>
    </motion.div>
  );
}
