import CheckSolid from '/images/check-solid.svg?react';

import { FlexRow } from '@/ui/view';

export function NoAnimatedCheckbox({
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
