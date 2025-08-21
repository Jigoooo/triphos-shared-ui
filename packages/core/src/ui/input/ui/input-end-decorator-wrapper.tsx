import { type ReactNode } from 'react';

import { zIndex } from '@/constants';

export function InputEndDecoratorWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        right: '0.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: zIndex.base,
      }}
    >
      {children}
    </div>
  );
}
