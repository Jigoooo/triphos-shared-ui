import { AnimatePresence, motion } from 'framer-motion';

import CheckSolid from '../../../../public/images/check-solid.svg?react';

import { FlexRow } from '@/ui/view';

export function AnimatedCheckbox({
  isPartial,
  checkboxSize,
  checkIconSize,
  disabled,
  checked,
  color,
}: {
  isPartial: boolean;
  checkboxSize?: string | number;
  checkIconSize?: string | number;
  disabled?: boolean;
  checked: boolean;
  color?: string;
}) {
  return (
    <FlexRow
      as={motion.div}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: checkboxSize,
        height: checkboxSize,
        border: `1px solid ${!disabled && checked ? color : '#cccccc'}`,
        borderRadius: '0.25rem',
        backgroundColor: disabled ? '#f5f5f5' : checked ? color : '#ffffff',
      }}
      variants={{
        hover: {
          borderColor: color,
          backgroundColor: '#ffffff',
        },
        none: {},
      }}
      whileHover={checked ? 'none' : 'hover'}
      transition={{
        duration: 0.2,
      }}
    >
      <AnimatePresence mode={'wait'}>
        {!disabled && checked && (
          <FlexRow
            as={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CheckSolid
              style={{
                width: checkIconSize,
                height: checkIconSize,
                fill: '#ffffff',
                stroke: '#ffffff',
                strokeWidth: '1.875rem',
              }}
            />
          </FlexRow>
        )}
        {isPartial && (
          <FlexRow
            as={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ width: '0.625rem', height: '0.625rem', backgroundColor: color }} />
          </FlexRow>
        )}
      </AnimatePresence>
    </FlexRow>
  );
}
