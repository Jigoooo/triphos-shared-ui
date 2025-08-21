import { type ReactNode, type RefObject } from 'react';

import { zIndex } from '@/constants';
import { InputType } from '@/ui/input/model/input-type.ts';

export function InputStartDecoratorWrapper({
  ref,
  inputType,
  children,
}: {
  ref: RefObject<HTMLDivElement | null>;
  inputType: InputType;
  children: ReactNode;
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
      }}
    >
      {children}
    </div>
  );
}
