import { FlexRow } from '@/ui/layout';
import type { NoAnimatedCheckboxProps } from '../model/checkbox-type.ts';
import { CheckIcon } from './check-icon.tsx';

export function NoAnimatedCheckbox({
  isPartial,
  checkboxSize,
  checkIconSize,
  disabled,
  checked,
  color,
}: NoAnimatedCheckboxProps) {
  return (
    <FlexRow
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: checkboxSize,
        height: checkboxSize,
        border: `1px solid ${!disabled && checked ? color : '#cccccc'}`,
        borderRadius: '0.25rem',
        backgroundColor: disabled ? '#f5f5f5' : checked ? color : '#ffffff',
      }}
    >
      {checked && (
        <FlexRow
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CheckIcon checkIconSize={checkIconSize} disabled={disabled} />
        </FlexRow>
      )}
      {isPartial && (
        <FlexRow
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '0.625rem', height: '0.625rem', backgroundColor: color }} />
        </FlexRow>
      )}
    </FlexRow>
  );
}
