import { type ReactNode, Children, isValidElement } from 'react';

import { zIndex } from '@/constants';

function hasInteractiveChildren(children: ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement(child)) return false;

    // 버튼 태그 또는 interactive props 확인
    const props = child.props as any;
    return (
      child.type === 'button' ||
      typeof props.onClick === 'function' ||
      typeof props.onMouseDown === 'function' ||
      typeof props.onPointerDown === 'function' ||
      props.role === 'button' ||
      props.tabIndex !== undefined
    );
  });
}

export function InputEndDecoratorWrapper({ children }: { children: ReactNode }) {
  const isInteractive = hasInteractiveChildren(children);

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        right: '0.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: isInteractive ? 'auto' : 'none',
        zIndex: zIndex.base,
      }}
    >
      {children}
    </div>
  );
}
