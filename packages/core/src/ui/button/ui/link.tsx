import type { AnchorHTMLAttributes } from 'react';
import { useState } from 'react';

export function Link({
  style,
  children,
  disabled = false,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean; children: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      onMouseEnter={() => {
        if (disabled) {
          return;
        }

        setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (disabled) {
          return;
        }

        setIsHovered(false);
      }}
      style={{
        ...{
          userSelect: 'none',
          borderBottom: isHovered ? '1px solid currentColor' : '1px solid transparent',
          lineHeight: 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
        ...style,
      }}
      {...props}
    >
      {children}
    </a>
  );
}
