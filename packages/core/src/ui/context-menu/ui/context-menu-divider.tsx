import type { ContextMenuDividerProps } from '../model/context-menu-type.ts';
import { Divider } from '@/ui/divider';

export function ContextMenuDivider({ style, direction = 'horizontal' }: ContextMenuDividerProps) {
  return (
    <Divider
      direction={direction}
      style={{ backgroundColor: '#e4e4e4', marginBlock: '0.2rem', ...style }}
    />
  );
}
