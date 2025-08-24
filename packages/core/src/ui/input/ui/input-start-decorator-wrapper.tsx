import { type CSSProperties, type ReactNode } from 'react';

import { zIndex } from '@/constants';
import { InputType } from '@/ui/input/model/input-type.ts';

export function InputStartDecoratorWrapper({
  ref,
  inputType,
  children,
  style,
}: {
  ref: (element: HTMLDivElement | null) => void;
  inputType: InputType;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        left: inputType === InputType.UNDERLINE ? '0.375rem' : '0.5rem',
        top: inputType === InputType.UNDERLINE ? '40%' : '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: zIndex.base,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
