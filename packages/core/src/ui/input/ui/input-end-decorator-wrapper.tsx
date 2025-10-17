import { type ReactNode, Children, isValidElement, type CSSProperties } from 'react';

import { zIndex } from '@/constants';

function hasInteractiveChildren(children: ReactNode): boolean {
  const checkChild = (child: ReactNode): boolean => {
    if (!isValidElement(child)) return false;

    // 커스텀 컴포넌트(함수/클래스 컴포넌트)는 interactive로 간주
    const isCustomComponent = typeof child.type === 'function';

    // 버튼 태그 또는 interactive props 확인
    const props = child.props as any;
    const hasInteractiveProps =
      child.type === 'button' ||
      typeof props.onClick === 'function' ||
      typeof props.onMouseDown === 'function' ||
      typeof props.onPointerDown === 'function' ||
      props.role === 'button' ||
      props.tabIndex !== undefined;

    // 현재 요소가 interactive하면 true
    if (isCustomComponent || hasInteractiveProps) return true;

    // 자식 요소를 재귀적으로 확인
    if (props.children) {
      return hasInteractiveChildren(props.children);
    }

    return false;
  };

  return Children.toArray(children).some(checkChild);
}

export function InputEndDecoratorWrapper({
  children,
  style,
  ref,
  offset,
  allowFocusLoss,
}: {
  children: ReactNode;
  style?: CSSProperties;
  ref?: (element: HTMLElement | null) => void;
  offset: string | number;
  allowFocusLoss: boolean;
}) {
  const isInteractive = hasInteractiveChildren(children);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!allowFocusLoss && isInteractive) {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        right: offset,
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: isInteractive ? 'auto' : 'none',
        zIndex: zIndex.base,
        ...style,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
}
