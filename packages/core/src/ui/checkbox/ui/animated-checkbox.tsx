import { AnimatePresence, motion } from 'framer-motion';

import { CheckIcon } from './check-icon.tsx';
import type { AnimatedCheckboxProps } from '../model/checkbox-type.ts';
import { FlexRow } from '@/ui/layout';

export function AnimatedCheckbox({
  containerStyle,
  isPartial,
  checkboxSize,
  checkIconSize,
  disabled,
  checked,
  checkboxCheckedColor,
  checkboxColor = '#ffffff',
  checkIconColor,
}: AnimatedCheckboxProps) {
  return (
    <FlexRow
      as={motion.div}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: checkboxSize,
        height: checkboxSize,
        border: `1px solid ${!disabled && checked ? checkboxCheckedColor : '#cccccc'}`,
        borderRadius: '0.25rem',
        backgroundColor: disabled ? '#f5f5f5' : checked ? checkboxCheckedColor : checkboxColor,
        ...containerStyle,
      }}
      variants={{
        hover: {
          borderColor: checkboxCheckedColor,
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
        {checked && (
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
            <CheckIcon
              checkIconSize={checkIconSize}
              checkIconColor={checkIconColor}
              disabled={disabled}
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
            <div
              style={{
                width: '0.625rem',
                height: '0.625rem',
                backgroundColor: checkboxCheckedColor,
              }}
            />
          </FlexRow>
        )}
      </AnimatePresence>
    </FlexRow>
  );
}
