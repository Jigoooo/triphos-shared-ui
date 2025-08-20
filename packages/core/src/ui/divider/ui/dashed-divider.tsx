import type { DashedDividerProps } from '../model/divider-type.ts';
import { FlexRow } from '@/ui/layout';

export function DashedDivider({ style, strokeColor = '#888888', ...props }: DashedDividerProps) {
  return (
    <FlexRow
      style={{
        ...{ height: 1 },
        ...style,
      }}
    >
      <svg
        style={{
          ...{ width: '100%', height: '100%' },
        }}
        {...props}
      >
        <line
          x1='0'
          y1='0'
          x2='100%'
          y2='0'
          stroke={strokeColor}
          strokeWidth='2'
          strokeDasharray='4, 4'
        />
      </svg>
    </FlexRow>
  );
}
