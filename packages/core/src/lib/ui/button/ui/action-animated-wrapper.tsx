import type { ReactNode } from 'react';
import { FlexRow } from '@/lib/ui';
import { motion } from 'framer-motion';

export function ActionAnimatedWrapper({
  padding = '0.5rem',
  onClick,
  children,
}: {
  padding?: string | number;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <FlexRow
      as={motion.div}
      tabIndex={-1}
      style={{
        cursor: 'pointer',
        outline: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        padding,
        borderRadius: '50%',
      }}
      initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
      whileHover={{ backgroundColor: '#efefef' }}
      whileTap={{ backgroundColor: '#e5e5e5' }}
      transition={{ duration: 0.04 }}
      onClick={onClick}
    >
      {children}
    </FlexRow>
  );
}
