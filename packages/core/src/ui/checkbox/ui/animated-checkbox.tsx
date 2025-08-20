import { AnimatePresence, motion } from 'framer-motion';

import { CheckIcon } from './check-icon.tsx';
import type { AnimatedCheckboxProps } from '../model/checkbox-type.ts';
import {
  checkboxIconWrapperStyle,
  getCheckboxPartialStyle,
  getCheckboxStyle,
} from '@/ui/checkbox/config/checkbox-style.ts';
import { FlexRow } from '@/ui/layout';

export function AnimatedCheckbox({
  checkboxStyle,
  isPartial,
  checkboxSize,
  checkIconSize,
  disabled,
  checked,
  checkboxCheckedColor,
  checkboxColor = '#ffffff',
  checkIconColor,
}: AnimatedCheckboxProps) {
  const applyCheckboxStyle = getCheckboxStyle({
    checkboxStyle,
    checkboxSize,
    disabled,
    checked,
    checkboxCheckedColor,
    checkboxColor,
  });

  const checkboxPartialStyle = getCheckboxPartialStyle(checkboxCheckedColor);

  return (
    <FlexRow
      as={motion.div}
      style={applyCheckboxStyle}
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
            style={checkboxIconWrapperStyle}
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
            style={checkboxIconWrapperStyle}
          >
            <div style={checkboxPartialStyle} />
          </FlexRow>
        )}
      </AnimatePresence>
    </FlexRow>
  );
}
