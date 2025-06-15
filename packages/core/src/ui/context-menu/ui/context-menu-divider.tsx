import { Divider } from '@/ui/divider';
import type { ContextMenuDividerProps } from '../model/context-menu-type.ts';

export function ContextMenuDivider({ style, direction = 'horizontal' }: ContextMenuDividerProps) {
  return (
    <Divider
      direction={direction}
      style={{ backgroundColor: '#e4e4e4', marginBlock: '0.2rem', ...style }}
    />
  );
}
