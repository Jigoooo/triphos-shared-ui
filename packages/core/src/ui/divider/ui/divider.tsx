import type { DividerProps } from '../model/divider-type.ts';

export function Divider({ direction = 'horizontal', style }: DividerProps) {
  return (
    <div
      style={{
        ...(direction === 'vertical'
          ? { width: 1, height: '100%', backgroundColor: '#cccccc' }
          : { height: 1, width: '100%', backgroundColor: '#cccccc' }),
        ...style,
      }}
    />
  );
}
