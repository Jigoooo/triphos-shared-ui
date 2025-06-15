import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';

import { FlexRow } from '@/ui/layout';
import type { ActionsAnimatedProps } from '../model/etc-type.ts';

export function ActionAnimatedWrapper({
  padding = '0.5rem',
  onClick,
  children,
}: ActionsAnimatedProps) {
  const handleDoubleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (e.detail > 1) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

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
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
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
