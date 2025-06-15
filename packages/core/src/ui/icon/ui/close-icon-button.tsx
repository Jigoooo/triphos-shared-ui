import { motion } from 'framer-motion';

import { LuX } from 'react-icons/lu';

import { FlexRow } from '@/ui/layout';
import type { CloseIconButtonProps } from '../model/icon-type.ts';

export function CloseIconButton({
  close,
  size = '1.8rem',
  color = '#212121',
  iconSize = '1.3rem',
  style,
}: CloseIconButtonProps) {
  return (
    <FlexRow
      as={motion.div}
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        ...style,
      }}
      whileTap={{ border: '0.1rem solid #aaaaaa' }}
      transition={{ duration: 0.04 }}
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        close();
      }}
    >
      <LuX size={iconSize} style={{ color }} />
    </FlexRow>
  );
}
