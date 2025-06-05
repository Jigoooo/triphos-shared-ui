import { useWindowsStyle } from '@/lib/hooks';
import type { HTMLAttributes, ReactNode, RefObject } from 'react';

export function Typography({
  ref,
  style,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  ref?: RefObject<HTMLSpanElement | null>;
  children?: ReactNode;
}) {
  const windowsStyle = useWindowsStyle();

  return (
    <span
      ref={ref}
      style={{
        ...windowsStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
