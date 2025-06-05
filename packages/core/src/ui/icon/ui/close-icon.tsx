import { FlexRow } from '@/ui';
import { motion } from 'framer-motion';
import { LuX } from 'react-icons/lu';

export function CloseIcon({ close }: { close: () => void }) {
  return (
    <FlexRow
      as={motion.div}
      style={{
        width: '1.8rem',
        height: '1.8rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0.375rem',
        cursor: 'pointer',
      }}
      whileTap={{ border: '0.1rem solid #aaaaaa' }}
      transition={{ duration: 0.04 }}
      onPointerDown={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
        close();
      }}
    >
      <LuX style={{ fontSize: '1.3rem', color: '#212121' }} />
    </FlexRow>
  );
}
