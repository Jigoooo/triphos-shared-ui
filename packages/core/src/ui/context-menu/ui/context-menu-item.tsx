import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';

import { FlexRow, Typography } from '@/ui/view';

export function ContextMenuItem({
  title,
  style,
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: HTMLAttributes<HTMLElement> & {
  title: string;
  style?: CSSProperties;
  icon?: ReactNode;
  onClick?: () => void;
}) {
  const [isHover, setIsHover] = useState(false);
  const Icon = icon;

  return (
    <FlexRow
      style={{
        minWidth: '9rem',
        paddingInline: '0.8rem',
        paddingBlock: '0.34rem',
        cursor: 'pointer',
        fontSize: '0.87rem',
        color: '#111111',
        backgroundColor: isHover ? '#f0f0f0' : 'transparent',
        alignItems: 'center',
        gap: '0.6rem',
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseEnter={(event) => {
        onMouseEnter?.(event);
        setIsHover(true);
      }}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        setIsHover(false);
      }}
      {...props}
    >
      {Icon && Icon}
      <Typography style={{ textAlign: 'left' }}>{title}</Typography>
    </FlexRow>
  );
}
