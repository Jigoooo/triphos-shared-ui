import type { ContextMenuWrapperProps } from '../model/context-menu-type.ts';
import { FlexColumn } from '@/ui/layout';

export function ContextMenuWrapper({ style, children }: ContextMenuWrapperProps) {
  return (
    <FlexColumn
      style={{
        backgroundColor: '#fff',
        borderRadius: '0.4rem',
        border: '1px solid #dedede',
        boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
        paddingBlock: '0.2rem',
        ...style,
      }}
    >
      {children}
    </FlexColumn>
  );
}
