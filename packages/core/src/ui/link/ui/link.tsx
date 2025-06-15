import { useState } from 'react';

import type { LinkProps } from '../model/link-type.ts';

export function Link({ style, children, disabled = false, ...props }: LinkProps) {
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
          cursor: disabled ? 'default' : 'pointer',
        },
        ...style,
      }}
      {...props}
    >
      {children}
    </a>
  );
}
