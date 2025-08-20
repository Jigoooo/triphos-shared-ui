import { CheckIcon } from './check-icon.tsx';
import type { NoAnimatedCheckboxProps } from '../model/checkbox-type.ts';
import {
  checkboxIconWrapperStyle,
  getCheckboxPartialStyle,
  getCheckboxStyle,
} from '@/ui/checkbox/config/checkbox-style.ts';
import { FlexRow } from '@/ui/layout';

export function NoAnimatedCheckbox({
  checkboxStyle,
  isPartial,
  checkboxSize,
  checkIconSize,
  disabled,
  checked,
  checkboxCheckedColor,
  checkboxColor = '#ffffff',
  checkIconColor,
}: NoAnimatedCheckboxProps) {
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
    <FlexRow style={applyCheckboxStyle}>
      {checked && (
        <FlexRow style={checkboxIconWrapperStyle}>
          <CheckIcon
            checkIconSize={checkIconSize}
            checkIconColor={checkIconColor}
            disabled={disabled}
          />
        </FlexRow>
      )}
      {isPartial && (
        <FlexRow style={checkboxIconWrapperStyle}>
          <div style={checkboxPartialStyle} />
        </FlexRow>
      )}
    </FlexRow>
  );
}
