import CheckSolid from '../../../../public/images/check-solid.svg?react';

import { FlexRow } from '@/ui/layout';
import type { NoAnimatedCheckboxProps } from '../model/checkbox-type.ts';

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
      {!disabled && checked && (
        <FlexRow
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
