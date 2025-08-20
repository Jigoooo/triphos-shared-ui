import { CheckIcon } from './check-icon.tsx';
import type { NoAnimatedCheckboxProps } from '../model/checkbox-type.ts';
import { FlexRow } from '@/ui/layout';

export function NoAnimatedCheckbox({
  containerStyle,
  isPartial,
  checkboxSize,
  checkIconSize,
  disabled,
  checked,
  checkboxCheckedColor,
  checkboxColor = '#ffffff',
  checkIconColor,
}: NoAnimatedCheckboxProps) {
  return (
    <FlexRow
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
    >
      {checked && (
        <FlexRow
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
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{ width: '0.625rem', height: '0.625rem', backgroundColor: checkboxCheckedColor }}
          />
        </FlexRow>
      )}
    </FlexRow>
  );
}
