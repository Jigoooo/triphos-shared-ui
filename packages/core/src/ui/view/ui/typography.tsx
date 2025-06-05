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
  return (
    <span
      ref={ref}
      style={{
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
