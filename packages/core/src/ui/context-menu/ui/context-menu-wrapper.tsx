import type { ReactNode } from 'react';

import { FlexColumn } from '@/ui/view';

export function ContextMenuWrapper({ children }: { children: ReactNode }) {
  return (
    <FlexColumn
      style={{
        backgroundColor: '#fff',
        borderRadius: '0.4rem',
        border: '1px solid #dedede',
        boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.2)',
        paddingBlock: '0.2rem',
      }}
    >
      {children}
    </FlexColumn>
  );
}
